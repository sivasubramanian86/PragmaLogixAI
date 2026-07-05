"""
Base agent definition for PragmaLogixAI ADK-style multi-agent mesh.

All specialist agents inherit from ``ADKBaseAgent``.  The base class:
- Holds agent metadata (name, instruction, tool registry).
- Provides a ``_call_model()`` helper that routes to the Vertex AI Flash-Lite
  model (or an injected mock for testing).
- Defines the ``run()`` interface returning a standard ``AgentResult`` dict.

Design mirrors Google ADK ``LlmAgent`` semantics without requiring the
``google-adk`` package (which may not be pip-installable in all environments).
"""
from __future__ import annotations

import json
import logging
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


class ADKBaseAgent:
    """Base class for all PragmaLogixAI specialist sub-agents.

    Args:
        name: Unique agent identifier used in coordinator result maps.
        instruction: System-level instruction describing the agent's role.
        tools: List of callable tool functions available to the agent.
        model_override: Optional Vertex AI GenerativeModel override (for tests).
    """

    def __init__(
        self,
        name: str,
        instruction: str,
        tools: Optional[List[Any]] = None,
        model_override: Optional[Any] = None,
    ) -> None:
        self.name = name
        self.instruction = instruction
        self.tools = tools or []
        self._model_override = model_override

    def _get_model(self) -> Any:
        """Resolve the LLM to use for this agent.

        Returns:
            A ``GenerativeModel`` from the Vertex AI singleton, or ``None``
            if unavailable (callers should handle ``None`` gracefully).
        """
        if self._model_override is not None:
            return self._model_override
        try:
            from PragmaLogixAI.backend.app.services.vertex_client import get_flash_lite_model
            return get_flash_lite_model()
        except Exception as exc:
            logger.debug("Flash-Lite model unavailable for %s: %s", self.name, exc)
            return None

    async def _call_model(
        self,
        user_context: str,
        extra_instruction: str = "",
    ) -> str:
        """Call the Vertex AI Flash-Lite model with the agent's system prompt.

        Args:
            user_context: Domain-specific context assembled from the input payload.
            extra_instruction: Optional additional instruction appended to the system prompt.

        Returns:
            The model's text response, or an empty string on failure.
        """
        model = self._get_model()
        if model is None:
            return ""

        prompt = (
            f"SYSTEM: {self.instruction}\n"
            f"{extra_instruction}\n"
            f"USER CONTEXT:\n{user_context}\n\n"
            "Respond with a single concise sentence of actionable findings."
        )
        try:
            if hasattr(model, "generate_content"):
                response = model.generate_content(prompt)
                return response.text.strip()
            # Legacy mock path
            response = model.models.generate_content(
                model="gemini-2.5-flash-lite-preview-06-17",
                contents=[prompt],
            )
            return response.text.strip()
        except Exception as exc:
            logger.warning("%s: model call failed — %s", self.name, exc)
            return ""

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute the agent and return a standard result dict.

        Subclasses override this to add domain logic.  The base implementation
        returns a generic success message (used as a safe fallback).

        Args:
            input_data: Request context dict containing at minimum
                ``age_group``, ``query``, ``journey``.

        Returns:
            Dict with keys ``agent``, ``status``, ``findings``.
        """
        return {
            "agent": self.name,
            "status": "SUCCESS",
            "findings": f"Analysis completed by {self.name}.",
        }
