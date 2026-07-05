# ============================================================
# PragmaLogixAI Backend — Cloud Run Dockerfile
# ============================================================
# Multi-stage build:
#   Stage 1 (builder): Install Python deps in a venv
#   Stage 2 (runtime): Copy only the venv + source — minimal image
# ============================================================

# ── Stage 1: Dependency builder ─────────────────────────────
FROM python:3.12-slim AS builder

WORKDIR /build

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# System build deps (asyncpg / pgvector native extensions)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps into an isolated venv
COPY requirements.txt .
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r requirements.txt

# ── Stage 2: Minimal runtime image ──────────────────────────
FROM python:3.12-slim AS runtime

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH" \
    PYTHONPATH="/app" \
    PORT=8080

# Runtime system deps only (libpq for asyncpg)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy venv from builder
COPY --from=builder /opt/venv /opt/venv

# Preserve the package directory expected by imports such as
# PragmaLogixAI.backend.app.main when building from the repository root.
COPY . /app/PragmaLogixAI

# Non-root user for least-privilege execution (ARCHITECTURE.md §security)
RUN adduser --disabled-password --gecos "" appuser && \
    chown -R appuser:appuser /app
USER appuser

EXPOSE ${PORT}

# Uvicorn binds to $PORT — required for Cloud Run (ARCHITECTURE.md §reliability)
CMD ["sh", "-c", "uvicorn PragmaLogixAI.backend.app.main:app --host 0.0.0.0 --port ${PORT} --workers 1 --log-level info"]
