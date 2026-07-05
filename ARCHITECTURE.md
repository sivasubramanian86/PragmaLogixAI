# Architecture Blueprint — PragmaLogixAI

> Aligns with the **Google Cloud Well-Architected Framework** pillars: Security, Reliability, Performance, Cost Optimisation, and Operational Excellence.

---

## Table of Contents

1. [System Topology & Data Flow](#1-system-topology--data-flow)
2. [Frontend Layer](#2-frontend-layer-nextjs-15-app-router)
3. [Backend Layer](#3-backend-layer-fastapi-on-cloud-run)
4. [Agent Mesh Design](#4-agent-mesh-design)
5. [Life Knowledge Graph (GraphRAG)](#5-life-knowledge-graph-graphrag)
6. [Multimodal Pipeline](#6-multimodal-pipeline)
7. [Data Layer](#7-data-layer)
8. [Semantic Cache](#8-semantic-cache)
9. [Plan Linting](#9-plan-linting-aider-style)
10. [i18n Architecture](#10-i18n-architecture)
11. [Well-Architected Framework Pillars](#11-well-architected-framework-pillars)
12. [API Surface](#12-api-surface)
13. [Deployment Topology](#13-deployment-topology)

---

## 1. System Topology & Data Flow

```
Browser (HTTPS)
      │
      ▼
Firebase Hosting  ──rewrite──▶  Cloud Run: pragmalogixai-frontend
(pragmalogixai-app.web.app)     (Next.js 15 · Port 3000)
                                        │
                                 REST/JSON (HTTPS)
                                        │
                                        ▼
                           Cloud Run: pragmalogixai-backend
                           (FastAPI · Port 8080 · IAM-auth)
                           ┌─────────────────────────────┐
                           │  POST /api/v1/ingest         │
                           │  POST /api/v1/plan/tomorrow  │
                           │  POST /api/v1/plan/month     │
                           │  POST /api/v1/plan/home      │
                           │  GET  /api/v1/multimodal/*   │
                           │  GET  /health  GET /ready    │
                           └────────┬──────────┬──────────┘
                                    │          │
                      SQLAlchemy    │          │  vertexai SDK (ADC)
                      async/pgvector│          │
                                    ▼          ▼
                           ┌──────────┐   ┌──────────────────────┐
                           │PostgreSQL│   │     Vertex AI         │
                           │+ pgvector│   │  Gemini 2.5 Flash-L   │
                           │(GraphRAG)│   │  Gemini 2.5 Pro       │
                           └──────────┘   │  text-embedding-004   │
                                    │     │  Imagen 3             │
                                    │     │  Cloud TTS (Chirp HD) │
                                    │     │  Veo 2                │
                                    │     └──────────────────────┘
                                    │
                           google-cloud-bigquery
                                    │
                                    ▼
                           ┌──────────────────┐
                           │    BigQuery       │
                           │  life_events      │
                           │  daily_scores     │
                           └──────────────────┘

                  Object Store: Cloud Storage (multimodal staging)
                  Secrets:      Secret Manager (DATABASE_URL)
                  Registry:     Artifact Registry (Docker images)
```

---

## 2. Frontend Layer (Next.js 15 App Router)

### Layout & Theme
- **3-column CSS grid:** Left sidebar (290px) · Center panel (1fr) · Right panel (340px)
- **OKLCH color system:** All colors expressed as `oklch(L% C H)` — perceptually uniform, device-independent
- **Glassmorphism cards:** `backdrop-filter: blur(16px) saturate(160%)` + subtle `inset` border glow
- **Ambient gradients:** Two radial gradient blobs (`pulse-glow` animation, 8s and 12s cycles) behind all content
- **Typography:** Inter (body) + JetBrains Mono (code/logs), loaded from Google Fonts

### Component Map

```
page.tsx  (root client component — owns all pipeline state)
  ├── UploadSection       Profile picker · Language switcher · File input · Generate button
  ├── PlanSection         Journey tabs · Plan results · Multimodal player · Specialist reports
  │   └── MetricDashboard KPI cards · Knowledge graph stats · Decision templates
  ├── AgentVisualizer     Mesh topology · ADK console log (right panel)
  ├── FeaturesSection     6-feature capability grid
  ├── AboutSection        Architecture narrative + cognitive flow diagram
  ├── FAQSection          Accordion FAQ
  ├── HelpSection         4-step onboarding guide
  └── SettingsSection     Sandbox controls (fallback mode, glassmorphism intensity)
```

### i18n
22-language pure-TypeScript translation lookup (`translations.ts`). No i18next or external library. Language state is a React `useState` hook in `page.tsx` — switching re-renders the entire `t` object immediately with zero network round-trips. Translated fields: title, subtitle, nav labels, upload text, journey tab names, plan section headers, profile labels, and ingest summary.

### Responsiveness
- Below 1100px: sidebar and right panel hidden via CSS media query — single-column mobile layout
- `isSimpleMode` flag (`profile === "senior" || profile === "student"`) scales font sizes and padding throughout

### Accessibility
- Skip-to-content link (`<a href="#main" className="sr-only">`) in root layout
- `role="tablist"` + `aria-selected` on journey tabs
- `role="alert"` on error messages
- `aria-busy` on the processing button
- `aria-label` on all `<aside>` regions
- Focus ring via `.focus-ring:focus-visible` utility class

---

## 3. Backend Layer (FastAPI on Cloud Run)

### Application Structure

```
backend/app/
├── main.py          FastAPI factory: CORS, lifespan hooks (init_vertex + create_db_engine)
├── db.py            AsyncEngine + async_sessionmaker + get_db() dependency
├── models/
│   ├── graph_models.py    GraphNode + GraphEdge SQLAlchemy ORM (UUID PKs, JSONB metadata)
│   └── ingestion.py       Pydantic v2 schemas: NodeSchema, EdgeSchema, EventSchema, IngestionResult
├── routers/
│   ├── ingest.py          POST /api/v1/ingest — multipart file upload
│   ├── plan.py            POST /api/v1/plan/{tomorrow|month|home} + legacy /plan
│   ├── multimodal.py      GET /api/v1/multimodal/{image|audio|video}
│   └── probes.py          GET /health, GET /ready (Cloud Run liveness/readiness)
└── services/
    ├── vertex_client.py        vertexai.init() singleton + @lru_cache model getters
    ├── ingestion.py            GCS upload → Gemini extraction → PostgreSQL upsert → BigQuery write
    ├── graphrag.py             text-embedding-004 → pgvector cosine search → Markdown context
    ├── multimodal_generator.py Imagen 3 · Cloud TTS Chirp HD · Veo 2 (with fallbacks)
    ├── summarization.py        Episodic context compression (Gemini Flash-Lite)
    └── cache.py                Semantic plan cache (in-memory dict, Redis-ready)
```

### Request Lifecycle (Plan)

```
POST /api/v1/plan/tomorrow
  │
  ├─ Build payload (inject journey="tomorrow", defaults)
  ├─ Check semantic cache → if hit, return cached plan (cache_hit=true)
  ├─ coordinator_agent.run(payload)
  │    ├─ ParallelSpecialistsMesh.run()  ← asyncio.gather (5 agents concurrent)
  │    │    ├─ HealthEnergyAgent.run()   → Flash-Lite call + default fallback
  │    │    ├─ MindFocusAgent.run()
  │    │    ├─ FinanceWorkAgent.run()
  │    │    ├─ LogisticsHomeAgent.run()
  │    │    └─ ProfessionalCareerAgent.run()
  │    ├─ Merge findings → JSON
  │    ├─ _synthesise_with_pro()   ← Gemini 2.5 Pro + journey prompt template
  │    │    └─ Falls back to _DEFAULT_PLANS[journey][age_group] if Pro unavailable
  │    └─ _run_lint(daily_plan)    ← energy budget + duplicate slot checks
  ├─ Inject multimodal_outcomes URLs
  ├─ Store in semantic cache
  └─ Return plan dict (cache_hit=false)
```

### Database Connectivity
- `create_async_engine` with `pool_pre_ping=True` and `pool_recycle=3600`
- SQLite in-memory fallback when `DATABASE_URL` is not set (tests only)
- `postgres://` → `postgresql+asyncpg://` normalisation for SQLAlchemy 2.x

---

## 4. Agent Mesh Design

### ADKBaseAgent

All specialist agents inherit from `ADKBaseAgent` (`agents/base_agent.py`), which provides:

- `_get_model()` — returns the Vertex AI Flash-Lite singleton or `None` (test-safe)
- `_call_model(user_context, extra_instruction)` — assembles the prompt, calls `generate_content`, returns text or `""` on failure
- `run(input_data)` — override point for each specialist

Each specialist agent follows the same pattern:
1. Extract `age_group` and `query` from `input_data`
2. Select `default_findings` from a deterministic 3×3 matrix (`adult/senior/student`)
3. Call `_call_model()` for richer, context-aware LLM findings
4. Return `{"agent": name, "status": "SUCCESS", "findings": findings}`

### Coordinator Pipeline

```python
# agents/coordinator_agent.py (simplified)

class CoordinatorAgent:
    async def run(self, input_data):
        # 1. Parallel specialists
        specialist_results = await self.mesh.run(input_data)  # asyncio.gather

        # 2. Merge
        merged = {r["agent"]: r["findings"] for r in specialist_results}

        # 3. Pro synthesis
        plan = await self._synthesise_with_pro(merged, age_group, journey)

        # 4. Lint
        warnings = self._run_lint(plan["daily_plan"])

        return {
            "status": "SUCCESS",
            "daily_plan": plan["daily_plan"],
            "friction_budget_actions": plan["friction_budget_actions"],
            "life_diffs": plan["life_diffs"],
            "lint_warnings": warnings,
            "specialist_reports": merged,
            ...
        }
```

### Journey Prompt Templates

Three journey-specific prompts drive Gemini 2.5 Pro synthesis:

| Journey | Output Focus |
|---------|-------------|
| `tomorrow` | `daily_plan` (hour + task + energy_cost), `friction_budget_actions`, `life_diffs` |
| `month` | `friction_budget_actions` (3–5 items), `life_diffs`, empty `daily_plan` |
| `home` | `daily_plan` (routine check-ins), `friction_budget_actions`, `life_diffs` |

---

## 5. Life Knowledge Graph (GraphRAG)

### Schema

```sql
-- graph_nodes: entities extracted from life signals
CREATE TABLE graph_nodes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label       VARCHAR(50) NOT NULL,   -- Habit | Pain | Event | Outcome | Task
  name        VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  metadata    JSONB,
  embedding   vector(768),            -- text-embedding-004 embeddings
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON graph_nodes USING hnsw (embedding vector_cosine_ops);

-- graph_edges: relationships between entities
CREATE TABLE graph_edges (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id    UUID REFERENCES graph_nodes(id) ON DELETE CASCADE,
  target_id    UUID REFERENCES graph_nodes(id) ON DELETE CASCADE,
  relationship VARCHAR(50) NOT NULL,  -- TRIGGERS | LEADS_TO | IMPACTS | BLOCKS
  weight       NUMERIC(3,2) DEFAULT 1.0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### Ingestion Pipeline

```
File upload (audio/image/video/text)
  │
  ├─ GCS staging (best-effort, non-blocking)
  ├─ Gemini 2.5 Flash-Lite: INGESTION_PROMPT → JSON extraction
  │   Output: {nodes: [...], edges: [...], events: [...]}
  ├─ SQLAlchemy async upsert: GraphNode + GraphEdge (skip duplicates by name)
  └─ BigQuery insert: life_events rows (non-blocking, errors logged not raised)
```

### Retrieval (GraphRAG Query)

```
query string
  │
  ├─ text-embedding-004 → 768-dim vector
  ├─ pgvector: SELECT ... WHERE 1-(embedding<=>:vec) >= 0.65 ORDER BY distance LIMIT 5
  ├─ Fetch connecting edges for retrieved node IDs
  └─ Format as Markdown → injected into agent prompts as grounding context
```

---

## 6. Multimodal Pipeline

### Imagen 3

```python
model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")
images = model.generate_images(
    prompt=f"Decision intelligence diagram: {prompt}. Premium futuristic neon HUD...",
    number_of_images=1,
    aspect_ratio="16:9",
    language="auto",
)
return images[0]._image_bytes   # PNG
# Fallback: futuristic SVG HUD with prompt text embedded
```

### Chirp TTS (Cloud Text-to-Speech)

```python
client = texttospeech.TextToSpeechClient()
voice = VoiceSelectionParams(language_code="en-US", name="en-US-Journey-F")  # Chirp HD
audio_config = AudioConfig(audio_encoding=AudioEncoding.LINEAR16)
response = client.synthesize_speech(input=SynthesisInput(text=summary[:500]), ...)
return response.audio_content   # WAV
# Fallback: 44-byte silent WAV header
```

### Veo 2

```python
model = VideoGenerationModel.from_pretrained("veo-2.0-generate-001")
operation = model.generate_video(
    prompt="Futuristic life planning dashboard with glowing agent nodes...",
    duration_seconds=3,
    aspect_ratio="16:9",
)
# Poll with 60s timeout, return videos[0].video_bytes (WebM)
# Fallback: 16-byte WebM container placeholder
```

---

## 7. Data Layer

### PostgreSQL + pgvector (Life Knowledge Graph)
- Managed via Cloud SQL (PostgreSQL 15, `db-g1-small`)
- Private IP only (no public endpoint in production)
- `DATABASE_URL` injected via Secret Manager at Cloud Run startup
- HNSW index on `graph_nodes.embedding` for sub-millisecond cosine search

### BigQuery (Analytics)

| Table | Partition | Schema |
|-------|-----------|--------|
| `pragmalogix.life_events` | `timestamp` | event_id, timestamp, user_id, category, description, value, metadata |
| `pragmalogix.daily_scores` | `date` | score_id, date, user_id, energy_score, focus_score, friction_score, updated_at |

### Google Cloud Storage (Multimodal Staging)
- Bucket: `pragmalogixai-staging`
- Files uploaded to `uploads/{filename}` before Gemini processing
- GCS URIs passed to Gemini as `Input Signal` context

---

## 8. Semantic Cache

```python
# Current: in-memory dict (process-scoped)
_semantic_cache: Dict[str, Any] = {}
cache_key = f"{journey}:{query.lower().strip()}:{user_id}"

# Production upgrade path:
# Redis (Cloud Memorystore) or AlloyDB pgvector similarity search
# with configurable TTL and semantic distance threshold
```

Cache hit rate is surfaced as `cache_hit: bool` in every plan API response.

---

## 9. Plan Linting (Aider-Style)

Two deterministic rules run on every compiled `daily_plan` before delivery:

```python
def _run_lint(self, daily_plan: List[Dict]) -> List[str]:
    warnings = []

    # Rule A: Total energy cost must not exceed 9
    total = sum(t.get("energy_cost", 0) for t in daily_plan)
    if total > 9:
        warnings.append(f"LINT WARNING: Total energy cost ({total}) exceeds budget of 9.")

    # Rule B: No duplicate time slots
    hours = [t.get("hour") for t in daily_plan if t.get("hour")]
    if len(hours) != len(set(hours)):
        warnings.append("LINT WARNING: Duplicate time slots detected.")

    return warnings
```

Student tomorrow plans (energy: 4+2+4=10) always trigger Rule A, demonstrating the linter's age-group sensitivity.

---

## 10. i18n Architecture

```
frontend/src/lib/translations.ts
  │
  ├─ Strings interface (TypeScript)  — 14 top-level keys + nav (6 sub-keys) + profiles + languages
  ├─ baseEn: Strings                 — English baseline
  ├─ translations: Record<Language, Strings>
  │    ├─ en: baseEn
  │    ├─ hi: { ...baseEn, title: "प्राग्मालोगिक्स एआई", ... }
  │    ├─ ta: { ...baseEn, ... }
  │    └─ ... (22 languages total)
  └─ useTranslations(lang): Strings  — pure lookup, no async

Language state lives in page.tsx React useState.
Switching language re-renders the entire t object — zero network round-trips.
Unsupported languages fall back to baseEn via || operator.
```

Translated surfaces: page title/subtitle, nav labels, upload section text, journey tab names, plan section headers, profile option labels, ingest summary, all button labels.

---

## 11. Well-Architected Framework Pillars

### Security

| Control | Implementation |
|---------|---------------|
| No raw API keys | `vertexai.init()` uses ADC automatically; no key params |
| Secret management | `DATABASE_URL` in Secret Manager → Cloud Run `--set-secrets` |
| Least-privilege IAM | `pragmalogixai-backend` SA: aiplatform.user, bigquery.dataEditor, storage.objectAdmin, secretmanager.secretAccessor only |
| PII protection | Anonymised tactical IDs only (`user_adult`, `user_senior`); no PII in logs |
| CORS | Configurable `ALLOWED_ORIGINS` env var; defaults `*` in dev, restricted in prod |
| gitignore | `.env`, `.env.local`, `*.pem`, `*.key`, `service-account-key.json` all excluded |

### Reliability

| Control | Implementation |
|---------|---------------|
| Graceful degradation | Every Vertex AI call has a deterministic fallback (default plans, SVG, silent WAV) |
| DB connection health | `pool_pre_ping=True`, `pool_recycle=3600` |
| Liveness/readiness probes | `GET /health`, `GET /ready` — Cloud Run health check endpoints |
| Plan linting | Two lint rules prevent invalid plans from reaching the user |
| Error propagation | `ValueError` → 422, unexpected exceptions → 500 with logged traceback |

### Performance Efficiency

| Control | Implementation |
|---------|---------------|
| Parallel agent execution | `asyncio.gather` — all 5 specialists run concurrently |
| Semantic cache | Identical queries served from memory without LLM invocation |
| GraphRAG grounding | pgvector cosine search returns only top-5 relevant nodes; no full history in prompt |
| Context compression | `summarize_context()` compresses history before token budget exhaustion |
| Model tier selection | Flash-Lite for fast domain analysis; Pro only for final synthesis |

### Cost Optimisation

| Control | Implementation |
|---------|---------------|
| Min instances = 0 | Cloud Run scales to zero when idle |
| Flash-Lite for agents | ~10× cheaper per token than Pro; used for all 5 specialist agents |
| Cache-first routing | Cached plans skip all LLM calls entirely |
| Token-narrow prompts | Agent prompts are domain-restricted single sentences; no full history |

### Operational Excellence

| Control | Implementation |
|---------|---------------|
| CI/CD | Cloud Build `cloudbuild-backend.yaml` + `frontend/cloudbuild.yaml` |
| Structured logging | Python `logging` module; Cloud Run aggregates to Cloud Logging |
| Test isolation | `conftest.py` `autouse` fixture patches all Vertex AI calls offline |
| OpenAPI docs | FastAPI auto-generates Swagger UI at `/docs` and ReDoc at `/redoc` |

---

## 12. API Surface

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | None | Liveness probe |
| `GET` | `/ready` | None | Readiness probe |
| `POST` | `/api/v1/ingest` | IAM | Ingest multimodal life signal |
| `POST` | `/api/v1/plan/tomorrow` | IAM | Daily Energy & Focus plan |
| `POST` | `/api/v1/plan/month` | IAM | Monthly Friction Budget |
| `POST` | `/api/v1/plan/home` | IAM | Home & Logistics Radar |
| `POST` | `/api/v1/plan` | IAM | Legacy unified endpoint (→ tomorrow) |
| `GET` | `/api/v1/multimodal/image` | None | Imagen 3 decision diagram |
| `GET` | `/api/v1/multimodal/audio` | None | Chirp TTS voice summary |
| `GET` | `/api/v1/multimodal/video` | None | Veo 2 outcome preview |

The backend Cloud Run service uses `--no-allow-unauthenticated`. The frontend proxies all `/api/*` calls server-side via Next.js rewrites, so the browser never needs an IAM token.

---

## 13. Deployment Topology

```
GitHub (sivasubramanian86/PragmaLogixAI)
    │
    ├─ Cloud Build: cloudbuild-backend.yaml
    │    └─ docker build -f backend/Dockerfile .
    │    └─ push → us-central1-docker.pkg.dev/genai-apac-2026-491004/pragmalogixai/backend:latest
    │    └─ gcloud run deploy pragmalogixai-backend
    │         --no-allow-unauthenticated
    │         --service-account=pragmalogixai-backend@...
    │         --set-env-vars=GOOGLE_CLOUD_PROJECT,BIGQUERY_DATASET,GCS_STAGING_BUCKET
    │
    └─ Cloud Build: frontend/cloudbuild.yaml
         └─ docker build frontend/ --build-arg NEXT_PUBLIC_API_BASE_URL=...
         └─ push → .../pragmalogixai/frontend:latest
         └─ gcloud run deploy pragmalogixai-frontend
              --allow-unauthenticated
              --port=3000

Firebase Hosting (pragmalogixai-app.web.app)
    └─ firebase.json rewrite: "**" → pragmalogixai-frontend Cloud Run service
    └─ Public CDN + HTTPS termination → Cloud Run
```

GCP Project: `genai-apac-2026-491004` | Region: `us-central1`
