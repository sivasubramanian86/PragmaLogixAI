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

try:
    from vertexai.preview.caching import CachedContent
    caching_available = True
except ImportError:
    caching_available = False

# ---------------------------------------------------------------------------
# Model identifiers (pinned for hackathon reproducibility)
# ---------------------------------------------------------------------------
_FLASH_LITE_MODEL = "gemini-2.5-flash"   # Fast ingestion / routing
_PRO_MODEL = "gemini-2.5-pro"                 # Deep reasoning / synthesis


@lru_cache(maxsize=1)
def get_gcp_project() -> str:
    """Resolve the GCP project ID with metadata auto-detection and env fallback."""
    env_project = os.environ.get("GOOGLE_CLOUD_PROJECT")
    if not env_project or env_project == "YOUR_GCP_PROJECT":
        try:
            import urllib.request
            req = urllib.request.Request(
                "http://metadata.google.internal/computeMetadata/v1/project/project-id",
                headers={"Metadata-Flavor": "Google"}
            )
            with urllib.request.urlopen(req, timeout=1.0) as conn:
                detected_project = conn.read().decode("utf-8").strip()
                if detected_project:
                    logger.info("Auto-detected GCP project from metadata server: %s", detected_project)
                    return detected_project
        except Exception as exc:
            logger.debug("GCP metadata server project-id lookup failed/skipped: %s", exc)
    return env_project or "genai-apac-2026-491004"


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
    resolved_project = project or get_gcp_project()
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


def create_context_cache(
    system_instruction: str,
    contents: list,
    ttl_minutes: int = 60,
) -> Optional[str]:
    """Create a Vertex AI Context Cache for large system instructions or grounding data.

    Note: The total token count of system_instruction and contents must exceed
    the Vertex AI minimum threshold (typically 32,768 tokens) to be cached.

    Args:
        system_instruction: The system prompt to cache.
        contents: Supporting documents, datasets, or context parts to cache.
        ttl_minutes: Time-to-live for the cache in minutes (default: 60).

    Returns:
        The resource name of the CachedContent (e.g. 'cachedContents/12345'),
        or None if caching is unavailable or credentials are not configured.
    """
    if not caching_available:
        logger.warning("Vertex AI context caching SDK not available in preview namespace.")
        return None

    try:
        from datetime import timedelta
        project = get_gcp_project()
        location = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")
        init_vertex(project, location)

        logger.info("Creating CachedContent on Vertex AI (TTL: %d mins)...", ttl_minutes)
        cache = CachedContent.create(
            model_name=_FLASH_LITE_MODEL,
            system_instruction=system_instruction,
            contents=contents,
            ttl=timedelta(minutes=ttl_minutes),
        )
        logger.info("Created context cache successfully: %s", cache.name)
        return cache.name
    except Exception as exc:
        logger.warning("Context cache creation bypassed/failed: %s", exc)
        return None
