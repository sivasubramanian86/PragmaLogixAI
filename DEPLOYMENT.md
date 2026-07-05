# PragmaLogixAI — Deployment & Operations Guide

> **Hackathon:** Gen AI APAC Hack2Skill 2026  
> **Platform:** Google Cloud (Vertex AI + Cloud Run + PostgreSQL + BigQuery)  
> **Auth model:** Application Default Credentials (ADC) — no raw API keys

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Environment Variables](#2-environment-variables)
3. [Local Development](#3-local-development)
4. [Cloud Run Deployment](#4-cloud-run-deployment)
5. [Service Account & IAM Setup](#5-service-account--iam-setup)
6. [Vertex AI Model Access](#6-vertex-ai-model-access)
7. [Database Setup](#7-database-setup)
8. [Running Tests](#8-running-tests)
9. [Architecture Overview](#9-architecture-overview)

---

## 1. Prerequisites

| Tool | Minimum Version | Install |
|---|---|---|
| Python | 3.12 | [python.org](https://python.org) |
| Node.js | 20 LTS | [nodejs.org](https://nodejs.org) |
| Docker | 24+ | [docker.com](https://docker.com) |
| gcloud CLI | 470+ | `curl https://sdk.cloud.google.com | bash` |
| psql (optional) | 15+ | For manual DB inspection |

**Enable GCP APIs** (one-time):
```bash
gcloud services enable \
  run.googleapis.com artifactregistry.googleapis.com \
  bigquery.googleapis.com sqladmin.googleapis.com \
  secretmanager.googleapis.com storage.googleapis.com \
  aiplatform.googleapis.com --project=YOUR_GCP_PROJECT
```

---

## 2. Environment Variables

### Backend
| Variable | Description | Default |
|---|---|---|
| `GOOGLE_CLOUD_PROJECT` | GCP Project ID | `YOUR_GCP_PROJECT` |
| `GOOGLE_CLOUD_LOCATION` | Vertex AI region | `us-central1` |
| `DATABASE_URL` | Async PostgreSQL URL (`postgresql+asyncpg://...`) | SQLite fallback (tests only) |
| `BIGQUERY_DATASET` | BigQuery dataset name | `pragmalogix` |
| `GCS_STAGING_BUCKET` | GCS bucket for multimodal file staging | `pragmalogixai-staging` |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | `*` (restrict in prod) |
| `PORT` | HTTP port for uvicorn | `8080` |

> [!IMPORTANT]  
> **Never** commit `DATABASE_URL`, service account keys, or any secrets to the repo.  
> In Cloud Run, inject via Secret Manager volume mounts or `--set-secrets` flag.

### Frontend (`.env.local`)
| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Backend Cloud Run URL | `https://pragmalogixai-backend-xxx-uc.a.run.app` |

Copy `frontend/.env.local.example` → `frontend/.env.local` and fill in values.

---

## 3. Local Development

### Quick Start (Docker Compose — Recommended)
```bash
# 1. Set your GCP project
export GOOGLE_CLOUD_PROJECT=your-project-id
export GOOGLE_APPLICATION_CREDENTIALS_PATH=~/.config/gcloud/application_default_credentials.json

# 2. Start PostgreSQL + backend
docker compose up

# 3. In a new terminal, start the frontend
cd frontend
npm install
npm run dev
```

Application available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **API Docs:** http://localhost:8080/docs

### Manual Backend Start (without Docker)
```bash
# 1. Activate the venv
.venv\Scripts\activate      # Windows
# or: source .venv/bin/activate  # Linux/macOS

# 2. Set environment variables
set DATABASE_URL=postgresql+asyncpg://pragmalogix:devpassword@localhost:5432/pragmalogix
set GOOGLE_CLOUD_PROJECT=your-project-id

# 3. Start uvicorn
uvicorn PragmaLogixAI.backend.app.main:app --reload --port 8080
```

### Manual Frontend Start
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local: set NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
npm run dev
```

---

## 4. Cloud Run Deployment

### One-Command Deploy
```bash
export GOOGLE_CLOUD_PROJECT=your-project-id
export GOOGLE_CLOUD_LOCATION=us-central1
bash deploy/deploy.sh
```

The script performs all 8 steps automatically:
1. Enables required APIs
2. Creates Artifact Registry repository
3. Provisions BigQuery dataset + tables
4. Creates GCS staging bucket
5. Builds + pushes backend Docker image
6. Deploys backend to Cloud Run
7. Builds + pushes frontend Docker image (with backend URL injected)
8. Deploys frontend to Cloud Run

### Manual Steps (if script fails)
```bash
# Build backend
docker build -t LOCATION-docker.pkg.dev/PROJECT/pragmalogixai/backend:latest \
  -f backend/Dockerfile .
docker push LOCATION-docker.pkg.dev/PROJECT/pragmalogixai/backend:latest

# Deploy backend
gcloud run deploy pragmalogixai-backend \
  --image=LOCATION-docker.pkg.dev/PROJECT/pragmalogixai/backend:latest \
  --region=LOCATION --port=8080 \
  --set-env-vars="GOOGLE_CLOUD_PROJECT=PROJECT" \
  --no-allow-unauthenticated
```

---

## 5. Service Account & IAM Setup

Create a dedicated service account with least-privilege IAM:
```bash
# Create service account
gcloud iam service-accounts create pragmalogixai-backend \
  --display-name="PragmaLogixAI Backend" --project=YOUR_GCP_PROJECT

SA="pragmalogixai-backend@YOUR_GCP_PROJECT.iam.gserviceaccount.com"

# Vertex AI — model inference
gcloud projects add-iam-policy-binding YOUR_GCP_PROJECT \
  --member="serviceAccount:${SA}" --role="roles/aiplatform.user"

# BigQuery — event writes
gcloud projects add-iam-policy-binding YOUR_GCP_PROJECT \
  --member="serviceAccount:${SA}" --role="roles/bigquery.dataEditor"

# Cloud Storage — multimodal staging
gcloud projects add-iam-policy-binding YOUR_GCP_PROJECT \
  --member="serviceAccount:${SA}" --role="roles/storage.objectAdmin"

# Secret Manager — read DB credentials
gcloud projects add-iam-policy-binding YOUR_GCP_PROJECT \
  --member="serviceAccount:${SA}" --role="roles/secretmanager.secretAccessor"
```

Store the `DATABASE_URL` in Secret Manager:
```bash
echo -n "postgresql+asyncpg://USER:PASS@HOST:5432/pragmalogix" | \
  gcloud secrets create pragmalogixai-db-url --data-file=- --project=YOUR_GCP_PROJECT

# Mount in Cloud Run deployment
gcloud run deploy pragmalogixai-backend \
  --set-secrets="DATABASE_URL=pragmalogixai-db-url:latest" ...
```

---

## 6. Vertex AI Model Access

PragmaLogixAI uses two Gemini models — **no raw API keys required**:

| Model | Usage | ID |
|---|---|---|
| Gemini 2.5 Flash-Lite | Ingestion, routing, specialist agents | `gemini-2.5-flash-lite-preview-06-17` |
| Gemini 2.5 Pro | Coordinator synthesis, deep planning | `gemini-2.5-pro-preview-06-05` |
| text-embedding-004 | GraphRAG vector embeddings | `text-embedding-004` |

Auth flow: `vertexai.init(project=PROJECT, location=LOCATION)` → picks up ADC from:
1. `GOOGLE_APPLICATION_CREDENTIALS` env var (local with service account key)
2. Cloud Run service account (production — automatic, no setup needed)
3. `gcloud auth application-default login` (local developer)

---

## 7. Database Setup

### Cloud SQL (Production)
```bash
# Create PostgreSQL 15 instance
gcloud sql instances create pragmalogixai-db \
  --database-version=POSTGRES_15 \
  --region=us-central1 \
  --tier=db-g1-small \
  --no-assign-ip \
  --enable-private-ip \
  --project=YOUR_GCP_PROJECT

# Create database + user
gcloud sql databases create pragmalogix --instance=pragmalogixai-db
gcloud sql users create pragmalogix --instance=pragmalogixai-db --password=SECURE_PASSWORD

# Run schema migration
gcloud sql connect pragmalogixai-db --database=pragmalogix
# Then paste contents of graph/schema.sql
```

### Local (Docker Compose)
```bash
docker compose up postgres
# Schema is auto-applied from graph/schema.sql via init script
```

---

## 8. Running Tests

```bash
# Activate venv
.venv\Scripts\activate   # Windows

# Run all tests with verbose output
python -m pytest tests/ -v --tb=short

# Run specific test files
python -m pytest tests/test_journey_routing.py -v
python -m pytest tests/test_api_endpoints.py -v

# Run with coverage report
python -m pytest tests/ --cov=PragmaLogixAI --cov-report=term-missing
```

Expected output: **11+ tests, 0 failures**.

No real GCP credentials are needed for unit tests — all Vertex AI and BigQuery calls are mocked.

---

## 9. Architecture Overview

```
┌─────────────────────────────────────────┐
│      Next.js 15 Frontend (Cloud Run)    │  ← OKLCH dark-mode, 4-lang i18n, 3 profiles
└──────────────────┬──────────────────────┘
                   │ REST API (HTTPS)
                   ▼
┌─────────────────────────────────────────┐
│    FastAPI Backend (Cloud Run)          │
│  POST /api/v1/ingest                    │
│  POST /api/v1/plan/tomorrow             │
│  POST /api/v1/plan/month                │
│  POST /api/v1/plan/home                 │
└──────┬──────────────────┬───────────────┘
       │ ADK Multi-Agent  │ Vertex AI
       ▼ Mesh (Parallel)  ▼
┌──────────────┐  ┌──────────────────────┐
│ PostgreSQL   │  │  Vertex AI           │
│ + pgvector   │  │  Gemini 2.5 Flash-L  │ ← Ingestion / Specialist agents
│ (GraphRAG)   │  │  Gemini 2.5 Pro      │ ← Coordinator synthesis
└──────────────┘  │  text-embedding-004  │ ← GraphRAG embeddings
                  └──────────────────────┘
       │ Event writes
       ▼
┌──────────────┐
│  BigQuery    │  ← life_events, daily_scores
└──────────────┘
```

**ADK Multi-Agent Mesh:**
```
Signal Ingestion Agent (Flash-Lite)
        ↓ (parallel)
Health Agent │ Mind Agent │ Finance Agent │ Logistics Agent │ Professional Agent
        ↓ (gather + synthesise)
Coordinator Agent (Gemini 2.5 Pro) → Journey Plan + Life Diffs + Lint Warnings
```
