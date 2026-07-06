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
                model="gemini-2.5-flash",
                contents=[prompt],
            )
            return response.text.strip()
        except Exception as exc:
            logger.warning("%s: model call failed — %s", self.name, exc)
            return ""

    async def execute_tools(self, input_data: Dict[str, Any]) -> str:
        """Execute registered tools to collect grounding context.

        Args:
            input_data: Dict containing query, user_id, journey etc.

        Returns:
            A formatted string of tool findings.
        """
        if not self.tools:
            return ""

        findings_list = []
        
        category_map = {
            "HealthEnergyAgent": "HEALTH",
            "FinanceWorkAgent": "FINANCE",
            "MindFocusAgent": "MIND",
            "LogisticsHomeAgent": "LOGISTICS"
        }
        category = category_map.get(self.name, "HEALTH")
        user_id = input_data.get("user_id", "default_user")
        query = input_data.get("query", "")

        for tool_name in self.tools:
            if tool_name == "graph_rag_tool":
                try:
                    from PragmaLogixAI.backend.app.db import create_db_engine
                    from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession
                    from PragmaLogixAI.agents.tools import graph_rag_tool

                    engine = create_db_engine()
                    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
                    async with session_factory() as session:
                        model = self._get_model()
                        subgraph_context = await graph_rag_tool(
                            query=query,
                            db_session=session,
                            gemini_client=model
                        )
                        if subgraph_context:
                            findings_list.append(subgraph_context)
                except Exception as exc:
                    logger.warning("%s: Failed to execute graph_rag_tool: %s", self.name, exc)

            elif tool_name == "bigquery_metrics_tool":
                try:
                    from PragmaLogixAI.agents.tools import bigquery_metrics_tool
                    metrics_context = await bigquery_metrics_tool(
                        user_id=user_id,
                        category=category,
                        days=30
                    )
                    if metrics_context:
                        findings_list.append(metrics_context)
                except Exception as exc:
                    logger.warning("%s: Failed to execute bigquery_metrics_tool: %s", self.name, exc)

        if not findings_list:
            return ""

        return "\n\n=== GROUNDING TOOL DATA ===\n" + "\n\n".join(findings_list) + "\n===========================\n"

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
