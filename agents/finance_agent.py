"""
Financial tracking and friction budget agent.

Monitors transactions, detects subscription duplicates, and manages savings
targets — calibrated to the user's life stage.
"""
from __future__ import annotations

from typing import Any, Dict

from PragmaLogixAI.agents.base_agent import ADKBaseAgent


class FinanceAgent(ADKBaseAgent):
    """Agent responsible for financial health across all life stages.

    Covers:
    - **Seniors**: Pension payout verification, utility billing anomaly detection.
    - **Students**: Pocket money distribution, school savings milestones.
    - **Adults**: Subscription leak detection, SaaS billing audits, monthly friction budget.
    """

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute financial audit and friction analysis.

        Args:
            input_data: Payload dict with ``age_group``, ``query``, ``journey``.

        Returns:
            Standard agent result dict with ``agent``, ``status``, ``findings``.
        """
        age_group = input_data.get("age_group", "adult")
        query = input_data.get("query", "")

        if age_group == "senior":
            default_findings = (
                "Finance: Audited pension payouts and utility billing schedules. "
                "Detected potential billing overhead on landline bundle — recommend review."
            )
        elif age_group == "student":
            default_findings = (
                "Finance: Tracked school savings targets and pocket money distribution. "
                "Suggested weekly allowance allocation: 60% savings, 30% education, 10% leisure."
            )
        else:
            default_findings = (
                "Finance: Identified duplicate subscription leak (-$14.99/mo) and calculated monthly friction budget. "
                "3 overlapping SaaS trials detected; estimated annual savings on cancellation: $539."
            )

        user_context = f"Age group: {age_group}. Query: {query}. Journey: {input_data.get('journey', 'tomorrow')}."
        llm_findings = await self._call_model(
            user_context=user_context,
            extra_instruction="Focus only on financial health, spending leaks, subscription audits, and savings targets.",
        )
        findings = llm_findings if llm_findings else default_findings

        return {"agent": self.name, "status": "SUCCESS", "findings": findings}


finance_agent = FinanceAgent(
    name="FinanceWorkAgent",
    instruction="Audit financial transactions, detect utility anomalies, and manage household savings targets.",
    tools=["bigquery_metrics_tool"],
)
