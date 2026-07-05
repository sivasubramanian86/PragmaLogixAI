"""
Vertex AI client singleton factory for PragmaLogixAI.

Initialises the Vertex AI SDK once at application startup using the GCP
project and location from environment variables (or defaults).  All agent
and service modules import the helper getters here instead of calling
``vertexai.init`` independently.

Auth: relies entirely on Application Default Credentials (ADC) or the
Cloud Run service account — no raw API key is required or accepted.
"""
from __future__ import annotations

import logging
import os
from functools import lru_cache
from typing import Optional

import vertexai
from vertexai.generative_models import GenerativeModel, GenerationConfig

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Model identifiers (pinned for hackathon reproducibility)
# ---------------------------------------------------------------------------
_FLASH_LITE_MODEL = "gemini-2.5-flash"   # Fast ingestion / routing
_PRO_MODEL = "gemini-2.5-pro"                 # Deep reasoning / synthesis


def init_vertex(
    project: Optional[str] = None,
    location: Optional[str] = None,
) -> None:
    """Initialise the Vertex AI SDK with project and location.

    Safe to call multiple times — ``vertexai.init`` is idempotent.

    Args:
        project: GCP project ID.  Falls back to ``GOOGLE_CLOUD_PROJECT`` env var.
        location: GCP region (e.g. ``us-central1``).  Falls back to
            ``GOOGLE_CLOUD_LOCATION`` env var or ``us-central1``.
    """
    resolved_project = project or os.environ.get("GOOGLE_CLOUD_PROJECT", "genai-apac-2026-491004")
    resolved_location = location or os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")

    vertexai.init(project=resolved_project, location=resolved_location)
    logger.info(
        "Vertex AI initialised: project=%s, location=%s", resolved_project, resolved_location
    )


@lru_cache(maxsize=1)
def get_flash_lite_model() -> GenerativeModel:
    """Return a cached ``GenerativeModel`` configured for Gemini 2.5 Flash-Lite.

    Used by:
    - Signal Ingestion Agent (multimodal parsing)
    - Summarization service (context compression)
    - Specialist sub-agents (domain analysis)

    Returns:
        A ``GenerativeModel`` instance with JSON-friendly generation config.
    """
    return GenerativeModel(
        model_name=_FLASH_LITE_MODEL,
        generation_config=GenerationConfig(
            temperature=0.2,       # deterministic enough for structured extraction
            max_output_tokens=4096,
        ),
    )


@lru_cache(maxsize=1)
def get_pro_model() -> GenerativeModel:
    """Return a cached ``GenerativeModel`` configured for Gemini 2.5 Pro.

    Used by:
    - Coordinator Agent (synthesis of specialist reports into final life plan)
    - GraphRAG-grounded reasoning passes

    Returns:
        A ``GenerativeModel`` instance with higher token budget for deep planning.
    """
    return GenerativeModel(
        model_name=_PRO_MODEL,
        generation_config=GenerationConfig(
            temperature=0.4,       # some creativity in plan narratives
            max_output_tokens=8192,
        ),
    )
