# PragmaLogixAI — Deployment & Operations Guide

> **GCP Project:** `genai-apac-2026-491004` · **Region:** `us-central1`  
> **Auth model:** Application Default Credentials (ADC) — no raw API keys anywhere

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [GCP Project Setup (one-time)](#2-gcp-project-setup-one-time)
3. [Service Account & IAM](#3-service-account--iam)
4. [Secret Manager](#4-secret-manager)
5. [Environment Variables](#5-environment-variables)
6. [Local Development](#6-local-development)
7. [Cloud Build — Backend](#7-cloud-build--backend)
8. [Cloud Build — Frontend](#8-cloud-build--frontend)
9. [Firebase Hosting](#9-firebase-hosting)
10. [Cloud Run Services](#10-cloud-run-services)
11. [Database Setup (Cloud SQL)](#11-database-setup-cloud-sql)
12. [BigQuery & GCS Setup](#12-bigquery--gcs-setup)
13. [Vertex AI Model Access](#13-vertex-ai-model-access)
14. [Running Tests](#14-running-tests)
15. [Rollback & Troubleshooting](#15-rollback--troubleshooting)

---

## 1. Prerequisites

| Tool | Min Version | Install |
|------|-------------|---------|
| Python | 3.12 | [python.org](https://python.org) |
| Node.js | 20 LTS | [nodejs.org](https://nodejs.org) |
| Docker Desktop | 24+ | [docker.com](https://docker.com) — only needed for local compose |
| gcloud CLI | 470+ | `curl https://sdk.cloud.google.com \| bash` |
| Firebase CLI | 13+ | `npm install -g firebase-tools` |
| psql (optional) | 15+ | For manual DB inspection |

---

## 2. GCP Project Setup (one-time)

```bash
# Authenticate
gcloud auth login
gcloud auth application-default login
gcloud config set project genai-apac-2026-491004

# Enable all required APIs
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  bigquery.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  storage.googleapis.com \
  aiplatform.googleapis.com \
  texttospeech.googleapis.com \
  firebasehosting.googleapis.com \
  --project=genai-apac-2026-491004

# Create Artifact Registry repository
gcloud artifacts repositories create pragmalogixai \
  --repository-format=docker \
  --location=us-central1 \
  --description="PragmaLogixAI container images" \
  --project=genai-apac-2026-491004
```

---

## 3. Service Account & IAM

```bash
# Create dedicated backend service account
gcloud iam service-accounts create pragmalogixai-backend \
  --display-name="PragmaLogixAI Backend" \
  --project=genai-apac-2026-491004

SA="pragmalogixai-backend@genai-apac-2026-491004.iam.gserviceaccount.com"

# Grant least-privilege roles
gcloud projects add-iam-policy-binding genai-apac-2026-491004 \
  --member="serviceAccount:${SA}" --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding genai-apac-2026-491004 \
  --member="serviceAccount:${SA}" --role="roles/bigquery.dataEditor"

gcloud projects add-iam-policy-binding genai-apac-2026-491004 \
  --member="serviceAccount:${SA}" --role="roles/storage.objectAdmin"

gcloud projects add-iam-policy-binding genai-apac-2026-491004 \
  --member="serviceAccount:${SA}" --role="roles/secretmanager.secretAccessor"

gcloud projects add-iam-policy-binding genai-apac-2026-491004 \
  --member="serviceAccount:${SA}" --role="roles/run.invoker"
```

> **Note:** Cloud Run service account authentication is automatic — no JSON key file needed.

---

## 4. Secret Manager

Store the PostgreSQL connection string so it never appears in environment variable plaintext:

```bash
# Create the secret
echo -n "postgresql+asyncpg://pragmalogix:SECURE_PASSWORD@/pragmalogix?host=/cloudsql/genai-apac-2026-491004:us-central1:pragmalogixai-db" \
  | gcloud secrets create pragmalogixai-db-url \
    --data-file=- \
    --project=genai-apac-2026-491004

# Grant the backend SA access to read it
gcloud secrets add-iam-policy-binding pragmalogixai-db-url \
  --member="serviceAccount:${SA}" \
  --role="roles/secretmanager.secretAccessor" \
  --project=genai-apac-2026-491004
```

The secret is injected into Cloud Run via `--set-secrets=DATABASE_URL=pragmalogixai-db-url:latest`.

---

## 5. Environment Variables

### Backend (Cloud Run)

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_CLOUD_PROJECT` | GCP Project ID | `genai-apac-2026-491004` |
| `GOOGLE_CLOUD_LOCATION` | Vertex AI region | `us-central1` |
| `DATABASE_URL` | Async PostgreSQL URL (via Secret Manager) | SQLite fallback (tests only) |
| `BIGQUERY_DATASET` | BigQuery dataset name | `pragmalogix` |
| `GCS_STAGING_BUCKET` | GCS bucket for multimodal file staging | `pragmalogixai-staging` |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | `*` |
| `PORT` | Uvicorn listen port | `8080` |

> **Never** commit `DATABASE_URL` or any secret. Use Secret Manager in production.

### Frontend (`.env.local`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend Cloud Run URL | `https://pragmalogixai-backend-eah62ip3iq-uc.a.run.app` |

Copy template: `cp frontend/.env.local.example frontend/.env.local`

---

## 6. Local Development

### Option A — Docker Compose (recommended)

```bash
# 1. Set required env vars
export GOOGLE_CLOUD_PROJECT=genai-apac-2026-491004
export GOOGLE_APPLICATION_CREDENTIALS_PATH=~/.config/gcloud/application_default_credentials.json

# 2. Start PostgreSQL 16 (pgvector) + FastAPI backend
docker compose up

# 3. In a separate terminal — start Next.js frontend
cd frontend
cp .env.local.example .env.local
# Edit .env.local: NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
npm install
npm run dev
```

Services available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Swagger UI:** http://localhost:8080/docs
- **ReDoc:** http://localhost:8080/redoc

### Option B — Manual (no Docker)

```bash
# Terminal 1: PostgreSQL (skip if using Cloud SQL)
# Start your local PostgreSQL 15+ with pgvector extension

# Terminal 2: FastAPI backend
source .venv/bin/activate                   # Linux/macOS
# .venv\Scripts\activate                    # Windows

export DATABASE_URL=postgresql+asyncpg://pragmalogix:devpassword@localhost:5432/pragmalogix
export GOOGLE_CLOUD_PROJECT=genai-apac-2026-491004
uvicorn PragmaLogixAI.backend.app.main:app --reload --port 8080

# Terminal 3: Next.js frontend
cd frontend
npm run dev
```

---

## 7. Cloud Build — Backend

The backend Dockerfile performs a two-stage build: Python deps in a venv (stage 1) → minimal runtime image (stage 2).

```bash
# Submit backend build to Cloud Build (no local Docker required)
gcloud builds submit . \
  --config=cloudbuild-backend.yaml \
  --project=genai-apac-2026-491004
```

The `cloudbuild-backend.yaml` builds from the repo root using `-f backend/Dockerfile` and tags as:
`us-central1-docker.pkg.dev/genai-apac-2026-491004/pragmalogixai/backend:latest`

After the image is pushed, deploy to Cloud Run:

```bash
gcloud run deploy pragmalogixai-backend \
  --image="us-central1-docker.pkg.dev/genai-apac-2026-491004/pragmalogixai/backend:latest" \
  --platform=managed \
  --region=us-central1 \
  --port=8080 \
  --memory=1Gi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --no-allow-unauthenticated \
  --service-account="pragmalogixai-backend@genai-apac-2026-491004.iam.gserviceaccount.com" \
  --set-env-vars="GOOGLE_CLOUD_PROJECT=genai-apac-2026-491004,GOOGLE_CLOUD_LOCATION=us-central1,BIGQUERY_DATASET=pragmalogix,GCS_STAGING_BUCKET=pragmalogixai-staging" \
  --set-secrets="DATABASE_URL=pragmalogixai-db-url:latest" \
  --project=genai-apac-2026-491004
```

---

## 8. Cloud Build — Frontend

The frontend Dockerfile performs a three-stage build: `npm ci` (all deps for TypeScript build) → `next build` with `output: standalone` → minimal runtime image.

```bash
# Submit frontend build to Cloud Build
# The frontend/ directory is used as the build context
gcloud builds submit frontend \
  --config=frontend/cloudbuild.yaml \
  --project=genai-apac-2026-491004
```

Builds and pushes: `us-central1-docker.pkg.dev/genai-apac-2026-491004/pragmalogixai/frontend:latest`

> The `NEXT_PUBLIC_API_BASE_URL` build arg is hardcoded in `frontend/cloudbuild.yaml` to the backend Cloud Run URL. Update it if the backend URL changes.

Deploy frontend to Cloud Run:

```bash
gcloud run deploy pragmalogixai-frontend \
  --image="us-central1-docker.pkg.dev/genai-apac-2026-491004/pragmalogixai/frontend:latest" \
  --platform=managed \
  --region=us-central1 \
  --port=3000 \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=5 \
  --allow-unauthenticated \
  --project=genai-apac-2026-491004
```

---

## 9. Firebase Hosting

Firebase Hosting acts as a CDN + HTTPS termination layer. All requests are rewritten to the Cloud Run frontend service.

```bash
# Log in to Firebase
firebase login

# Deploy hosting config (no static files — everything is Cloud Run)
firebase deploy --only hosting --project=genai-apac-2026-491004
```

The `firebase.json` configuration:
```json
{
  "hosting": {
    "site": "pragmalogixai-app",
    "public": ".firebase-public",
    "rewrites": [
      {
        "source": "**",
        "run": { "serviceId": "pragmalogixai-frontend", "region": "us-central1" }
      }
    ]
  }
}
```

**Live URL:** https://pragmalogixai-app.web.app

---

## 10. Cloud Run Services

| Service | URL | Auth | Memory | Max Instances |
|---------|-----|------|--------|---------------|
| `pragmalogixai-backend` | `...eah62ip3iq-uc.a.run.app` | IAM (no unauth) | 1Gi | 10 |
| `pragmalogixai-frontend` | `...967518492968.us-central1.run.app` | Public | 512Mi | 5 |

Check service status:
```bash
gcloud run services list --region=us-central1 --project=genai-apac-2026-491004
gcloud run services describe pragmalogixai-backend --region=us-central1 --project=genai-apac-2026-491004
```

View logs:
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=pragmalogixai-backend" \
  --project=genai-apac-2026-491004 \
  --limit=50 \
  --format="table(timestamp,textPayload)"
```

---

## 11. Database Setup (Cloud SQL)

### Create Instance

```bash
gcloud sql instances create pragmalogixai-db \
  --database-version=POSTGRES_15 \
  --region=us-central1 \
  --tier=db-g1-small \
  --no-assign-ip \
  --enable-private-ip \
  --project=genai-apac-2026-491004

# Create database and user
gcloud sql databases create pragmalogix --instance=pragmalogixai-db --project=genai-apac-2026-491004
gcloud sql users create pragmalogix \
  --instance=pragmalogixai-db \
  --password=SECURE_PASSWORD_HERE \
  --project=genai-apac-2026-491004
```

### Apply Schema

```bash
# Connect and apply schema
gcloud sql connect pragmalogixai-db \
  --database=pragmalogix \
  --project=genai-apac-2026-491004

# Once connected, paste the contents of graph/schema.sql
# Or pipe directly:
# psql "host=... dbname=pragmalogix user=pragmalogix" < graph/schema.sql
```

The schema creates `graph_nodes` (with pgvector embedding column + HNSW index), `graph_edges`, and helper indexes.

### Local Development (Docker Compose)

`docker compose up postgres` starts `pgvector/pgvector:pg16` and auto-applies `graph/schema.sql` via the init script volume mount. No manual setup needed.

---

## 12. BigQuery & GCS Setup

### BigQuery

```bash
# Create dataset
bq --project_id=genai-apac-2026-491004 mk \
  --dataset --description="PragmaLogixAI analytics" \
  "genai-apac-2026-491004:pragmalogix"

# Create life_events table
bq --project_id=genai-apac-2026-491004 mk --table \
  --schema="event_id:STRING,timestamp:TIMESTAMP,user_id:STRING,category:STRING,description:STRING,value:FLOAT64,metadata:STRING" \
  --time_partitioning_field=timestamp \
  "genai-apac-2026-491004:pragmalogix.life_events"

# Create daily_scores table
bq --project_id=genai-apac-2026-491004 mk --table \
  --schema="score_id:STRING,date:DATE,user_id:STRING,energy_score:FLOAT64,focus_score:FLOAT64,friction_score:FLOAT64,updated_at:TIMESTAMP" \
  --time_partitioning_field=date \
  "genai-apac-2026-491004:pragmalogix.daily_scores"
```

### Cloud Storage

```bash
gcloud storage buckets create gs://pragmalogixai-staging \
  --location=us-central1 \
  --uniform-bucket-level-access \
  --project=genai-apac-2026-491004
```

---

## 13. Vertex AI Model Access

PragmaLogixAI uses five Vertex AI models — all via ADC, no raw API keys:

| Model | ID | Usage |
|-------|----|-------|
| Gemini 2.5 Flash-Lite | `gemini-2.5-flash-lite-preview-06-17` | Signal ingestion, specialist agents, summarization |
| Gemini 2.5 Pro | `gemini-2.5-pro` | Coordinator synthesis (deep planning) |
| text-embedding-004 | `text-embedding-004` | GraphRAG cosine similarity embeddings |
| Imagen 3 | `imagen-3.0-generate-002` | Decision diagram image generation |
| Veo 2 | `veo-2.0-generate-001` | Life-plan outcome video preview |

Cloud TTS (Chirp HD) is accessed via the separate `google-cloud-texttospeech` client (not Vertex AI):
- Voice: `en-US-Journey-F` (Chirp HD)

**Auth flow:**
1. **Cloud Run (production):** Service account attached to the Cloud Run service — credentials are automatic.
2. **Local development:** `gcloud auth application-default login` sets up ADC at `~/.config/gcloud/application_default_credentials.json`.
3. **CI/tests:** `conftest.py` patches out all model calls — no credentials needed.

---

## 14. Running Tests

```bash
# Activate virtual environment
source .venv/bin/activate    # Linux/macOS
# .venv\Scripts\activate     # Windows

# Run full test suite (no GCP credentials required)
python -m pytest tests/ -v --tb=short

# Run specific test files
python -m pytest tests/test_journey_routing.py -v
python -m pytest tests/test_api_endpoints.py -v
python -m pytest tests/test_sub_agents.py -v

# Run with coverage report
python -m pytest tests/ --cov=PragmaLogixAI --cov-report=term-missing
```

**Expected output:** 22+ tests, 0 failures.

All Vertex AI model calls are patched offline by the `autouse` fixture in `conftest.py`:
```python
@pytest.fixture(autouse=True)
def disable_live_vertex_models(monkeypatch):
    monkeypatch.setattr(
        "PragmaLogixAI.agents.base_agent.ADKBaseAgent._get_model",
        lambda self: None,
    )
```

---

## 15. Rollback & Troubleshooting

### Roll back a Cloud Run revision

```bash
# List revisions
gcloud run revisions list \
  --service=pragmalogixai-backend \
  --region=us-central1 \
  --project=genai-apac-2026-491004

# Route 100% traffic to a specific revision
gcloud run services update-traffic pragmalogixai-backend \
  --to-revisions=pragmalogixai-backend-00001-xft=100 \
  --region=us-central1 \
  --project=genai-apac-2026-491004
```

### Common Issues

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Backend returns 500 on plan requests | Vertex AI ADC not configured | Check service account IAM: `roles/aiplatform.user` |
| `DATABASE_URL not set` warning | Secret not mounted | Verify `--set-secrets` flag in Cloud Run deploy command |
| Imagen endpoint returns SVG | Vertex AI vision models not available in region | Normal fallback — SVG is intentional |
| Audio endpoint returns empty/silent WAV | Cloud TTS quota exceeded or API not enabled | Enable `texttospeech.googleapis.com`; check SA roles |
| Firebase deploy error: site not found | Firebase project not linked | Run `firebase hosting:sites:create pragmalogixai-app` first |
| Frontend build fails: `standalone` output missing | `output: 'standalone'` not in next.config.ts | Already fixed in latest commit |
| Tests collect 0 items | Running from wrong directory | Run from project root: `python -m pytest tests/` |
