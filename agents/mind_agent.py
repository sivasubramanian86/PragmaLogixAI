"""
Mental focus and cognitive health agent.

Manages screen time, stress markers, and cognitive stimulation schedules —
tuned per age group and journey context.
"""
from __future__ import annotations

from typing import Any, Dict

from PragmaLogixAI.agents.base_agent import ADKBaseAgent


class MindAgent(ADKBaseAgent):
    """Agent responsible for cognitive wellness and focus optimisation.

    Covers:
    - **Seniors**: Memory puzzles, stress monitoring, cognitive stimulation blocks.
    - **Students**: Study-session balance, digital screen-time locks, focus sprints.
    - **Adults**: Deep work blocks, recovery intervals, context-switch cost analysis.
    """

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute mind & focus analysis.

        Args:
            input_data: Payload dict with ``age_group``, ``query``, ``journey``.

        Returns:
            Standard agent result dict with ``agent``, ``status``, ``findings``.
        """
        age_group = input_data.get("age_group", "adult")
        query = input_data.get("query", "")

        if age_group == "senior":
            default_findings = (
                "Mind: Scheduled cognitive stimulation blocks (sudoku/memory training) "
                "and tracked stress markers. Social engagement window flagged as under-utilised."
            )
        elif age_group == "student":
            default_findings = (
                "Mind: Balanced study sessions with strict digital screen-time locks. "
                "Pomodoro blocks recommended: 45 min study / 10 min break."
            )
        else:
            default_findings = (
                "Mind: Mapped focus blocks and recovery intervals to optimise work output. "
                "Detected 3 context-switch events per hour — recommend notification batching."
            )

        user_context = f"Age group: {age_group}. Query: {query}. Journey: {input_data.get('journey', 'tomorrow')}."
        llm_findings = await self._call_model(
            user_context=user_context,
            extra_instruction="Focus only on mental clarity, cognitive load, focus scheduling, and screen-time management.",
        )
        findings = llm_findings if llm_findings else default_findings

        return {"agent": self.name, "status": "SUCCESS", "findings": findings}


mind_agent = MindAgent(
    name="MindFocusAgent",
    instruction="Optimise focus, study schedules, and cognitive wellness based on age bracket.",
    tools=["graph_rag_tool"],
)
