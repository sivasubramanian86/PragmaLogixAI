#!/usr/bin/env bash
# ==============================================================
# PragmaLogixAI — Cloud Run Deployment Script
#
# Usage:
#   export GOOGLE_CLOUD_PROJECT=your-gcp-project-id
#   export GOOGLE_CLOUD_LOCATION=us-central1
#   bash deploy/deploy.sh
#
# Prerequisites:
#   - gcloud CLI installed and authenticated (gcloud auth login)
#   - Docker installed and running
#   - APIs enabled: Cloud Run, Artifact Registry, BigQuery, Cloud SQL, Secret Manager
# ==============================================================
set -euo pipefail

# ── Configuration (override via env vars) ──────────────────
PROJECT="${GOOGLE_CLOUD_PROJECT:-genai-apac-2026-491004}"
LOCATION="${GOOGLE_CLOUD_LOCATION:-us-central1}"
ARTIFACT_REGISTRY="${LOCATION}-docker.pkg.dev/${PROJECT}/pragmalogixai"
BQ_DATASET="${BIGQUERY_DATASET:-pragmalogix}"
GCS_BUCKET="${GCS_STAGING_BUCKET:-pragmalogixai-staging}"
BACKEND_SERVICE="pragmalogixai-backend"
FRONTEND_SERVICE="pragmalogixai-frontend"

echo "============================================================"
echo "PragmaLogixAI Deployment"
echo "Project  : ${PROJECT}"
echo "Location : ${LOCATION}"
echo "============================================================"

# ── Step 1: Enable required APIs ───────────────────────────
echo "[1/8] Enabling required GCP APIs..."
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  bigquery.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  storage.googleapis.com \
  aiplatform.googleapis.com \
  --project="${PROJECT}" --quiet

# ── Step 2: Create Artifact Registry repository ────────────
echo "[2/8] Creating Artifact Registry repository..."
gcloud artifacts repositories create pragmalogixai \
  --repository-format=docker \
  --location="${LOCATION}" \
  --description="PragmaLogixAI container images" \
  --project="${PROJECT}" \
  --quiet 2>/dev/null || echo "  (repository already exists)"

# ── Step 3: Provision BigQuery dataset and tables ──────────
echo "[3/8] Provisioning BigQuery dataset..."
bq --project_id="${PROJECT}" mk --dataset \
  --description="PragmaLogixAI analytics" \
  "${PROJECT}:${BQ_DATASET}" 2>/dev/null || echo "  (dataset already exists)"

bq --project_id="${PROJECT}" mk --table \
  --schema="event_id:STRING,timestamp:TIMESTAMP,user_id:STRING,category:STRING,description:STRING,value:FLOAT64,metadata:STRING" \
  --time_partitioning_field=timestamp \
  "${PROJECT}:${BQ_DATASET}.life_events" 2>/dev/null || echo "  (life_events table already exists)"

bq --project_id="${PROJECT}" mk --table \
  --schema="score_id:STRING,date:DATE,user_id:STRING,energy_score:FLOAT64,focus_score:FLOAT64,friction_score:FLOAT64,updated_at:TIMESTAMP" \
  --time_partitioning_field=date \
  "${PROJECT}:${BQ_DATASET}.daily_scores" 2>/dev/null || echo "  (daily_scores table already exists)"

# ── Step 4: Create GCS staging bucket ─────────────────────
echo "[4/8] Creating GCS staging bucket..."
gcloud storage buckets create "gs://${GCS_BUCKET}" \
  --location="${LOCATION}" \
  --uniform-bucket-level-access \
  --project="${PROJECT}" 2>/dev/null || echo "  (bucket already exists)"

# ── Step 5: Build and push backend Docker image ────────────
echo "[5/8] Building and pushing backend image..."
BACKEND_IMAGE="${ARTIFACT_REGISTRY}/backend:latest"
gcloud auth configure-docker "${LOCATION}-docker.pkg.dev" --quiet

docker build \
  -t "${BACKEND_IMAGE}" \
  -f backend/Dockerfile \
  .

docker push "${BACKEND_IMAGE}"

# ── Step 6: Deploy backend to Cloud Run ───────────────────
echo "[6/8] Deploying backend to Cloud Run..."
gcloud run deploy "${BACKEND_SERVICE}" \
  --image="${BACKEND_IMAGE}" \
  --platform=managed \
  --region="${LOCATION}" \
  --port=8080 \
  --memory=1Gi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --set-env-vars="GOOGLE_CLOUD_PROJECT=${PROJECT},GOOGLE_CLOUD_LOCATION=${LOCATION},BIGQUERY_DATASET=${BQ_DATASET},GCS_STAGING_BUCKET=${GCS_BUCKET}" \
  --no-allow-unauthenticated \
  --service-account="pragmalogixai-backend@${PROJECT}.iam.gserviceaccount.com" \
  --project="${PROJECT}" \
  --quiet

BACKEND_URL=$(gcloud run services describe "${BACKEND_SERVICE}" \
  --region="${LOCATION}" --project="${PROJECT}" --format="value(status.url)")
echo "  Backend deployed: ${BACKEND_URL}"

# ── Step 7: Build and push frontend Docker image ──────────
echo "[7/8] Building and pushing frontend image..."
FRONTEND_IMAGE="${ARTIFACT_REGISTRY}/frontend:latest"

docker build \
  -t "${FRONTEND_IMAGE}" \
  -f frontend/Dockerfile \
  --build-arg "NEXT_PUBLIC_API_BASE_URL=${BACKEND_URL}" \
  frontend/

docker push "${FRONTEND_IMAGE}"

# ── Step 8: Deploy frontend to Cloud Run ──────────────────
echo "[8/8] Deploying frontend to Cloud Run..."
gcloud run deploy "${FRONTEND_SERVICE}" \
  --image="${FRONTEND_IMAGE}" \
  --platform=managed \
  --region="${LOCATION}" \
  --port=3000 \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=5 \
  --allow-unauthenticated \
  --project="${PROJECT}" \
  --quiet

FRONTEND_URL=$(gcloud run services describe "${FRONTEND_SERVICE}" \
  --region="${LOCATION}" --project="${PROJECT}" --format="value(status.url)")

echo ""
echo "============================================================"
echo "Deployment Complete!"
echo "  Frontend : ${FRONTEND_URL}"
echo "  Backend  : ${BACKEND_URL}"
echo "============================================================"
