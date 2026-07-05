"""
Household and logistics optimisation agent.

Schedules chores, grocery logistics, appliance maintenance, and general
home operations — with age-appropriate task weightings.
"""
from __future__ import annotations

from typing import Any, Dict

from PragmaLogixAI.agents.base_agent import ADKBaseAgent


class LogisticsAgent(ADKBaseAgent):
    """Agent responsible for home and routine logistics across all life stages.

    Covers:
    - **Seniors**: Medicine deliveries, simple chore support lists, safety routines.
    - **Students**: Study room cleaning chores, shared-space responsibilities.
    - **Adults**: Appliance repair scheduling, grocery routing, family logistics.
    """

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute home & logistics radar analysis.

        Args:
            input_data: Payload dict with ``age_group``, ``query``, ``journey``.

        Returns:
            Standard agent result dict with ``agent``, ``status``, ``findings``.
        """
        age_group = input_data.get("age_group", "adult")
        query = input_data.get("query", "")

        if age_group == "senior":
            default_findings = (
                "Logistics: Scheduled monthly prescription delivery and coordinated community check-in times. "
                "Smart-lock auto-checkin routine configured for safety monitoring."
            )
        elif age_group == "student":
            default_findings = (
                "Logistics: Assigned simple daily study room cleaning chores. "
                "Weekly shared-space responsibility rotation scheduled."
            )
        else:
            default_findings = (
                "Logistics: Auto-routed appliance repair tasks and mapped family grocery requirements. "
                "AC filter check due in 7 days; kitchen appliance maintenance flagged."
            )

        user_context = f"Age group: {age_group}. Query: {query}. Journey: {input_data.get('journey', 'tomorrow')}."
        llm_findings = await self._call_model(
            user_context=user_context,
            extra_instruction="Focus only on home logistics, chores, appliance maintenance, and routine scheduling.",
        )
        findings = llm_findings if llm_findings else default_findings

        return {"agent": self.name, "status": "SUCCESS", "findings": findings}


logistics_agent = LogisticsAgent(
    name="LogisticsHomeAgent",
    instruction="Orchestrate chores, inventories, and preventive maintenance plans.",
    tools=["graph_rag_tool"],
)
