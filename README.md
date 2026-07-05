# PragmaLogixAI — Life Decision Intelligence OS

> **Gen AI APAC Hack2Skill 2026** · Built on Google Cloud · Vertex AI · ADK Multi-Agent Mesh

[![Cloud Run](https://img.shields.io/badge/Cloud%20Run-Backend-4285F4?logo=google-cloud)](https://pragmalogixai-backend-eah62ip3iq-uc.a.run.app)
[![Firebase Hosting](https://img.shields.io/badge/Firebase-Frontend-FFCA28?logo=firebase)](https://pragmalogixai-app.web.app)
[![GitHub](https://img.shields.io/badge/GitHub-PragmaLogixAI-181717?logo=github)](https://github.com/sivasubramanian86/PragmaLogixAI)

---

## What Is PragmaLogixAI?

PragmaLogixAI is a role-aware **Life Decision Operating System** that reduces everyday friction across career, health, mind, money, and home logistics. It uses a parallel multi-agent mesh powered by Google Vertex AI (Gemini 2.5 Pro + Flash-Lite), a pgvector Life Knowledge Graph (GraphRAG), and Aider-inspired state diffing to produce personalised, linted life plans in real time.

Think of it as a personal chief-of-staff that reads your life signals (voice notes, invoices, daily logs), queries your habit graph, dispatches five specialist AI agents in parallel, and synthesises the results into an actionable schedule — with energy-budget linting, multimodal output (Imagen 3, Chirp TTS, Veo 2), and 22-language support.

---

## Live Deployments

| Surface | URL |
|---------|-----|
| **Frontend (Firebase Hosting → Cloud Run)** | https://pragmalogixai-app.web.app |
| **Frontend (Cloud Run direct)** | https://pragmalogixai-frontend-967518492968.us-central1.run.app |
| **Backend API (Cloud Run)** | https://pragmalogixai-backend-eah62ip3iq-uc.a.run.app |
| **API Docs (Swagger UI)** | https://pragmalogixai-backend-eah62ip3iq-uc.a.run.app/docs |
| **GitHub Repo** | https://github.com/sivasubramanian86/PragmaLogixAI |

---

## Three Life Journeys

### 1. Daily Energy & Focus Journey (`/api/v1/plan/tomorrow`)
Maps your sleep data, cognitive load signals, and calendar conflicts into an hourly schedule that aligns tasks with your predicted energy peaks. Output includes a time-blocked plan, energy-cost ratings per task, and conflict lint warnings.

### 2. Financial & Attention Budget Journey (`/api/v1/plan/month`)
Audits subscription leaks, duplicate SaaS trials, screen-time drains, and recurring billing anomalies. Produces Aider-style life diffs (`-` cancelled, `+` activated, `~` reduced) and a monthly friction reduction roadmap.

### 3. Home & Logistics Radar (`/api/v1/plan/home`)
Monitors appliance maintenance schedules, grocery routines, chore rosters, prescription deliveries, and safety check-ins. Surfaces preventative actions before they become urgent problems.

---

## Role-Aware Profiles

| Profile | Focus Areas | UX Adjustments |
|---------|------------|----------------|
| **Kids / Students** | Study blocks, screen-time locks, internship deadlines, coding courses | Larger fonts, traffic-light energy signals, simplified language |
| **Working Professionals** | Deep-work blocks, subscription audits, certification paths, meeting load | Compact dashboard, Gantt-style plans, developer mode |
| **Elderly / Retired** | Medication schedules, gentle activity, cognitive puzzles, community check-ins | Bold text, icon-driven nav, voice-first ingestion, audio summaries |

---

## Multi-Agent Architecture

```
User uploads Life Signal (voice note / invoice / checklist)
          │
          ▼
┌─────────────────────────────┐
│   Signal Ingestion Service  │  Gemini 2.5 Flash-Lite
│   Entity extraction → JSON  │  GCS staging → PostgreSQL upsert
│   Nodes + Edges + Events    │  BigQuery event write
└─────────────┬───────────────┘
              │  asyncio.gather (parallel)
    ┌─────────┴──────────────────────────────────┐
    │         │           │           │           │
    ▼         ▼           ▼           ▼           ▼
Health    Mind       Finance    Logistics  Professional
Agent     Agent      Agent       Agent      Agent
Flash-L   Flash-L    Flash-L    Flash-L    Flash-L
    │         │           │           │           │
    └─────────┴───────────┴───────────┴───────────┘
              │  Merged findings JSON
              ▼
┌─────────────────────────────┐
│     Coordinator Agent       │  Gemini 2.5 Pro
│  Journey-specific synthesis │  + deterministic fallback
│  Plan Linter (energy/slots) │
│  Life Diffs + Lint Warnings │
└─────────────┬───────────────┘
              │
    ┌─────────┴──────────────┐
    │                        │
    ▼                        ▼
Semantic Cache           Multimodal Synthesis
(in-memory, Redis-ready)  Imagen 3 · Chirp TTS · Veo 2
```

### Specialist Agents

| Agent | Domain | Gemini Model | Key Tools |
|-------|--------|-------------|-----------|
| `HealthEnergyAgent` | Sleep, energy peaks, medication | Flash-Lite | `graph_rag_tool`, `bigquery_metrics_tool` |
| `MindFocusAgent` | Screen time, focus blocks, cognitive load | Flash-Lite | `graph_rag_tool` |
| `FinanceWorkAgent` | Subscription leaks, billing anomalies, savings | Flash-Lite | `bigquery_metrics_tool` |
| `LogisticsHomeAgent` | Chores, appliances, grocery, maintenance | Flash-Lite | `graph_rag_tool` |
| `ProfessionalCareerAgent` | Certifications, internships, career milestones | Flash-Lite | `graph_rag_tool` |

All five run concurrently via `asyncio.gather`. The `CoordinatorAgent` uses Gemini 2.5 Pro to synthesise their findings into a structured JSON plan, then runs two lint rules: total energy cost ≤ 9 and no duplicate time slots.

---

## Multimodal Synthesis

| Output | Model | Endpoint | Fallback |
|--------|-------|---------|---------|
| Decision diagram image | Imagen 3 (`imagen-3.0-generate-002`) | `GET /api/v1/multimodal/image?prompt=...` | Futuristic HUD SVG |
| Voice-over audio summary | Cloud TTS Chirp HD (`en-US-Journey-F`) | `GET /api/v1/multimodal/audio?summary=...` | Silent WAV |
| Life-plan preview video | Veo 2 (`veo-2.0-generate-001`) | `GET /api/v1/multimodal/video` | WebM stub |

All three endpoints are called automatically after plan generation and rendered inline in the plan output panel.

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 (App Router) · TypeScript · OKLCH glassmorphism theme |
| **Backend** | FastAPI · Python 3.12 · Uvicorn · Cloud Run |
| **AI Models** | Gemini 2.5 Pro (synthesis) · Gemini 2.5 Flash-Lite (agents) · text-embedding-004 (GraphRAG) |
| **Multimodal** | Imagen 3 (image) · Cloud TTS Chirp HD (audio) · Veo 2 (video) |
| **Graph DB** | PostgreSQL 15 + pgvector (Life Knowledge Graph, cosine similarity search) |
| **Analytics** | BigQuery (`pragmalogix.life_events`, `pragmalogix.daily_scores`) |
| **Object Store** | Google Cloud Storage (multimodal file staging) |
| **Auth** | Application Default Credentials (ADC) · No raw API keys anywhere |
| **Secrets** | GCP Secret Manager (DATABASE_URL injection) |
| **Registry** | Artifact Registry (`pragmalogixai` Docker repo, `us-central1`) |
| **Hosting** | Firebase Hosting → Cloud Run rewrite · HTTPS everywhere |
| **i18n** | 22 languages: EN · ES · FR · DE · IT · JA · ZH · PT · RU · KO · HI · TA · KN · TE · AR · TR · NL · SV · PL · VI · TH · ID |

---

## Life Knowledge Graph (GraphRAG)

```
Nodes  →  Habit | Pain | Event | Outcome | Task
Edges  →  TRIGGERS | LEADS_TO | IMPACTS | BLOCKS
```

On every file upload, Gemini 2.5 Flash-Lite extracts entities and writes them to PostgreSQL via SQLAlchemy async. At plan time, GraphRAG embeds the query with `text-embedding-004` and runs a pgvector cosine-distance search to retrieve the top-k most relevant nodes and edges, injecting them as grounding context into each specialist agent prompt. This replaces raw conversation history, keeping token budgets tight.

---

## Aider-Style Life Diffs & Plan Linting

Inspired by [Aider](https://aider.chat), life state changes are expressed as surgical diffs:

```diff
- Cancelled duplicate SaaS cloud trial account (-$14.99/mo)
+ Activated daily focus window (10:00–12:00)
~ Reduced administrative meeting load from 3 to 1 daily
```

The Coordinator's built-in linter checks every compiled schedule before delivery:
- **Rule A — Energy Budget:** Total energy cost of all tasks must not exceed 9 (prevents burnout).
- **Rule B — Time Conflicts:** No duplicate time slots in the same day.

Any violations are surfaced as `lint_warnings` in the plan response.

---

## Semantic Cache

Repeated queries for the same `(journey, query, user_id)` triplet are served from an in-memory semantic cache (Redis / AlloyDB-ready for production), bypassing the full agent pipeline. The `cache_hit` field in every plan response indicates whether the cache was used.

---

## Repository Structure

```
PragmaLogixAI/
├── agents/                         # ADK-style multi-agent mesh
│   ├── base_agent.py               # ADKBaseAgent base class
│   ├── coordinator_agent.py        # CoordinatorAgent + ParallelSpecialistsMesh
│   ├── health_agent.py             # HealthEnergyAgent
│   ├── mind_agent.py               # MindFocusAgent
│   ├── finance_agent.py            # FinanceWorkAgent
│   ├── logistics_agent.py          # LogisticsHomeAgent
│   ├── professional_agent.py       # ProfessionalCareerAgent
│   ├── sub_agents.py               # Re-export of coordinator_agent
│   └── tools.py                   # graph_rag_tool, bigquery_metrics_tool
│
├── backend/
│   └── app/
│       ├── main.py                 # FastAPI app factory + CORS + lifespan
│       ├── db.py                   # Async SQLAlchemy engine + session factory
│       ├── models/
│       │   ├── graph_models.py     # GraphNode + GraphEdge SQLAlchemy models
│       │   └── ingestion.py        # Pydantic schemas (NodeSchema, IngestionResult, …)
│       ├── routers/
│       │   ├── ingest.py           # POST /api/v1/ingest
│       │   ├── plan.py             # POST /api/v1/plan/{tomorrow|month|home}
│       │   ├── multimodal.py       # GET /api/v1/multimodal/{image|audio|video}
│       │   └── probes.py           # GET /health, GET /ready
│       └── services/
│           ├── vertex_client.py    # Vertex AI SDK init + model singletons
│           ├── ingestion.py        # Multimodal ingestion pipeline
│           ├── graphrag.py         # pgvector cosine similarity search
│           ├── multimodal_generator.py  # Imagen 3 / Chirp TTS / Veo 2
│           ├── summarization.py    # Episodic context compression
│           └── cache.py            # Semantic plan cache
│
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── layout.tsx          # Root layout + Inter/JetBrains Mono fonts
│       │   ├── page.tsx            # Main dashboard (3-column grid)
│       │   └── globals.css         # OKLCH tokens + glassmorphism + animations
│       ├── components/
│       │   ├── AgentVisualizer.tsx # Right panel: mesh topology + ADK console log
│       │   ├── PlanSection.tsx     # Center: journey plans + multimodal outputs
│       │   ├── UploadSection.tsx   # Left sidebar: profile + lang + file upload
│       │   ├── MetricDashboard.tsx # KPI cards + knowledge graph stats + templates
│       │   ├── FeaturesSection.tsx # Capabilities overview
│       │   ├── AboutSection.tsx    # Architecture narrative
│       │   ├── FAQSection.tsx      # Accordion FAQ (5 questions)
│       │   ├── HelpSection.tsx     # 4-step user guide
│       │   └── SettingsSection.tsx # Sandbox controls (fallback mode, theme)
│       ├── hooks/
│       │   └── usePipeline.ts      # Pipeline state machine hook
│       └── lib/
│           ├── api.ts              # Typed backend API client
│           ├── translations.ts     # 22-language i18n (pure TS, no i18next)
│           └── types.ts            # Shared TypeScript types
│
├── graph/
│   └── schema.sql                  # PostgreSQL + pgvector schema migrations
│
├── tests/                          # Pytest suite (no live GCP credentials needed)
│   ├── conftest.py                 # autouse fixture: disables live Vertex AI
│   ├── test_api_endpoints.py       # FastAPI TestClient integration tests
│   ├── test_cache.py               # Semantic cache unit tests
│   ├── test_graphrag.py            # GraphRAG retrieval unit tests
│   ├── test_ingestion.py           # Multimodal ingestion unit tests
│   ├── test_journey_routing.py     # Journey routing + lint integration tests
│   ├── test_main.py                # Health/ready probe + plan endpoint tests
│   ├── test_sub_agents.py          # Coordinator + specialist agent tests
│   ├── test_summarization.py       # Context summarization unit tests
│   └── test_vertex_client.py       # Vertex AI client init unit tests
│
├── deploy/
│   └── deploy.sh                   # Full 8-step Cloud Run deployment script
├── cloudbuild-backend.yaml         # Cloud Build config for backend image
├── cloudbuild-frontend.yaml        # Cloud Build config for frontend image
├── docker-compose.yml              # Local dev: PostgreSQL + backend
├── firebase.json                   # Firebase Hosting → Cloud Run rewrite
├── .firebaserc                     # Firebase project: genai-apac-2026-491004
├── requirements.txt                # Python dependencies (pinned)
├── README.md                       # This file
├── ARCHITECTURE.md                 # Detailed architecture + Well-Architected pillars
├── DEPLOYMENT.md                   # Step-by-step deployment guide
└── SECURITY.md                     # Security policy + threat model
```

---

## Quick Start — Local Development

### Prerequisites

| Tool | Version |
|------|---------|
| Python | 3.12+ |
| Node.js | 20 LTS |
| Docker | 24+ |
| gcloud CLI | 470+ |

### 1. Clone & install

```bash
git clone https://github.com/sivasubramanian86/PragmaLogixAI.git
cd PragmaLogixAI

# Python deps
python -m venv .venv
source .venv/bin/activate        # Linux/macOS
# .venv\Scripts\activate         # Windows
pip install -r requirements.txt

# Frontend deps
cd frontend && npm install && cd ..
```

### 2. Authenticate with GCP

```bash
gcloud auth login
gcloud auth application-default login
gcloud config set project genai-apac-2026-491004
```

### 3. Start with Docker Compose (recommended)

```bash
export GOOGLE_CLOUD_PROJECT=genai-apac-2026-491004
export GOOGLE_APPLICATION_CREDENTIALS_PATH=~/.config/gcloud/application_default_credentials.json
docker compose up
```

### 4. Start frontend (separate terminal)

```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local → set NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
npm run dev
```

App is now running at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger docs: http://localhost:8080/docs

---

## Running Tests

```bash
# From project root with venv activated
python -m pytest tests/ -v --tb=short

# With coverage
python -m pytest tests/ --cov=PragmaLogixAI --cov-report=term-missing
```

All tests run fully offline — no GCP credentials required. The `conftest.py` `autouse` fixture patches out all Vertex AI model calls.

Expected: **22+ tests, 0 failures**.

---

## API Reference

### `POST /api/v1/ingest`
Ingest a multimodal life signal and update the Life Knowledge Graph.

**Request:** `multipart/form-data`
- `file` — audio/image/video/text file
- `user_id` — anonymised user tactical ID (optional, default: `default_user`)

**Response:**
```json
{
  "status": "SUCCESS",
  "user_id": "user_adult",
  "nodes_extracted": 3,
  "edges_extracted": 2,
  "events_extracted": 1,
  "node_names": ["Morning Coffee", "Acid Reflux", "Sleep Log"]
}
```

---

### `POST /api/v1/plan/tomorrow`
Generate a Daily Energy & Focus plan.

**Request:**
```json
{
  "user_id": "user_adult",
  "query": "Optimise my day tomorrow",
  "age_group": "adult"
}
```

**Response:**
```json
{
  "task_id": "INC-2026-IN-01",
  "status": "SUCCESS",
  "age_group": "adult",
  "journey": "tomorrow",
  "daily_plan": [
    { "hour": "09:00", "task": "Focus deep work block", "energy_cost": 5 }
  ],
  "friction_budget_actions": ["Cancel duplicate SaaS subscription"],
  "life_diffs": ["- Cancelled duplicate SaaS trial (-$14.99/mo)"],
  "lint_warnings": [],
  "specialist_reports": { "HealthEnergyAgent": "...", "MindFocusAgent": "..." },
  "cache_hit": false,
  "multimodal_outcomes": {
    "image_url": "/api/v1/multimodal/image?prompt=tomorrow_plan_diagram",
    "audio_url": "/api/v1/multimodal/audio?summary=Decision_plan_for_journey",
    "video_url": "/api/v1/multimodal/video"
  }
}
```

Same shape for `POST /api/v1/plan/month` and `POST /api/v1/plan/home`.

---

### Multimodal Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/multimodal/image?prompt=...` | Imagen 3 decision diagram (PNG or SVG fallback) |
| `GET` | `/api/v1/multimodal/audio?summary=...` | Chirp TTS voice summary (WAV) |
| `GET` | `/api/v1/multimodal/video` | Veo 2 outcome preview (WebM) |

---

## Deploying to GCP

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete step-by-step guide.

**One-command Cloud Build deploy:**
```bash
# Backend
gcloud builds submit . --config=cloudbuild-backend.yaml --project=genai-apac-2026-491004

# Frontend
gcloud builds submit frontend --config=frontend/cloudbuild.yaml --project=genai-apac-2026-491004
```

**Firebase Hosting:**
```bash
firebase deploy --only hosting --project=genai-apac-2026-491004
```

---

## Security

- No raw API keys anywhere in the codebase
- All model access via Vertex AI ADC / service account
- `DATABASE_URL` stored in Secret Manager, injected at Cloud Run startup
- `.env`, `.env.local`, `service-account-key.json`, `*.pem`, `*.key` are all gitignored
- Dedicated `pragmalogixai-backend` service account with least-privilege IAM roles only

See [SECURITY.md](./SECURITY.md) for the full threat model.

---

## Contributing

This is a hackathon project. For issues or improvements, open a GitHub issue or PR at https://github.com/sivasubramanian86/PragmaLogixAI.

---

*Built with ❤️ for Gen AI APAC Hack2Skill 2026 · Google Cloud · Vertex AI · Gemini*
