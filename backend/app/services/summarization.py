"""
Summarization service: compress long conversation history into structured episodic summaries.

Called by the Coordinator Agent when the accumulated context approaches token-budget
limits.  Uses Gemini 2.5 Flash-Lite (fast, cost-efficient) via the Vertex AI SDK.

The output is a structured JSON object preserving decisions, facts, and open items —
discarding pleasantries and intermediate reasoning to minimise future token usage.
"""
from __future__ import annotations

import json
import logging
from typing import Any, Dict, List

logger = logging.getLogger(__name__)

SUMMARIZER_PROMPT = """The conversation history below is too long.
Produce a concise JSON summary preserving:
1. decisions — all decisions made
2. facts — all facts established as true
3. open_items — unresolved questions or pending tasks
4. task_state — current task status in one sentence

Discard: pleasantries, redundant details, intermediate reasoning steps.

Return ONLY valid JSON (no markdown fences):
{"decisions": [...], "facts": [...], "open_items": [...], "task_state": "..."}"""


def _resolve_model(gemini_client: Any) -> Any:
    """Return the best available Gemini model for summarization.

    Priority:
    1. Injected ``gemini_client`` (used in unit tests).
    2. Vertex AI Flash-Lite singleton from ``vertex_client``.

    Args:
        gemini_client: Caller-supplied client (may be ``None``).

    Returns:
        A model object with a ``generate_content`` method, or the raw client.
    """
    if gemini_client is not None:
        return gemini_client
    try:
        from PragmaLogixAI.backend.app.services.vertex_client import get_flash_lite_model
        return get_flash_lite_model()
    except Exception as exc:
        logger.warning("Could not load Vertex AI model for summarization: %s", exc)
        return None


async def summarize_context(
    history: List[Dict[str, str]],
    gemini_client: Any,
) -> Dict[str, Any]:
    """Compress conversation history into a structured episodic summary.

    Args:
        history: List of message dicts with ``role`` and ``content`` keys.
        gemini_client: Gemini / Vertex AI client (or ``None`` to use the
            singleton from ``vertex_client``).

    Returns:
        Dictionary with keys ``decisions``, ``facts``, ``open_items``,
        ``task_state``.  Returns a safe fallback dict on any error.
    """
    model = _resolve_model(gemini_client)
    if model is None:
        return {
            "summary": "Summarization unavailable — Vertex AI model not initialised.",
            "decisions": [],
            "facts": [],
            "open_items": [],
        }

    history_text = "\n".join(
        f"{m['role'].capitalize()}: {m['content']}" for m in history
    )
    contents = [SUMMARIZER_PROMPT, f"History to summarise:\n{history_text}"]

    try:
        if hasattr(model, "generate_content"):
            # Vertex AI GenerativeModel path
            response = model.generate_content(contents)
            raw_text = response.text
        else:
            # Legacy mock client path (unit tests)
            response = model.models.generate_content(
                model="gemini-2.5-flash-lite-preview-06-17",
                contents=contents,
            )
            raw_text = response.text

        # Strip markdown fences if present
        clean_text = raw_text.strip().removeprefix("```json").removeprefix("```").removesuffix("```")

        try:
            return json.loads(clean_text)
        except json.JSONDecodeError:
            return {
                "summary": raw_text,
                "decisions": [],
                "facts": [],
                "open_items": [],
            }

    except Exception as exc:
        logger.error("summarize_context failed: %s", exc)
        return {
            "summary": f"Fallback summary: extraction failed — {exc}",
            "decisions": [],
            "facts": [],
            "open_items": [],
        }
