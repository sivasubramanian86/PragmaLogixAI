"""
FastAPI application entrypoint for PragmaLogixAI.

Thin application factory that configures CORS, lifespan hooks,
and mounts modular endpoint routers from the routers/ package.
"""
from __future__ import annotations

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from PragmaLogixAI.backend.app.db import create_db_engine
from PragmaLogixAI.backend.app.services.vertex_client import init_vertex
from PragmaLogixAI.backend.app.routers import probes, ingest, plan, multimodal

@asynccontextmanager
async def lifespan(app: FastAPI):  # type: ignore[type-arg]
    """Initialise Vertex AI and DB engine once at startup; clean up on shutdown."""
    init_vertex()           # sets up GCP project + location for all model calls
    create_db_engine()      # warms the connection pool
    yield

app = FastAPI(
    title="PragmaLogixAI API",
    description=(
        "Backend API for PragmaLogixAI — Life Decision OS. "
        "Powered by Google Vertex AI and ADK multi-agent orchestration."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Mount modular routers
app.include_router(probes.router)
app.include_router(ingest.router)
app.include_router(plan.router)
app.include_router(multimodal.router)
