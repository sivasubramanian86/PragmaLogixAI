"""
Coordinator agent: orchestrates the ADK multi-agent mesh and synthesises results.

Pipeline (Aider-inspired prompt → delegate → synthesize → lint):
    1. Run all specialist agents in parallel (asyncio.gather).
    2. Merge specialist findings into a structured JSON context.
    3. Call Gemini 2.5 Pro with the merged context + journey prompt to synthesise
       a structured life plan (daily schedule, friction actions, life diffs).
    4. Run Aider-style plan linting (energy budget + time-slot conflict checks).
    5. Return the validated plan.

Journey routing:
    - ``tomorrow``  → Daily Energy & Focus schedule
    - ``month``     → Monthly Friction Budget audit
    - ``home``      → Home & Logistics Radar

Token optimisation:
    - Specialist contexts are kept domain-narrow (parallel, small).
    - Coordinator synthesis uses only the merged findings JSON, not raw history.
    - Cache is checked upstream in the API layer before this agent is invoked.
"""
from __future__ import annotations

import json
import logging
from typing import Any, Dict, List

import asyncio

from PragmaLogixAI.agents.health_agent import health_agent
from PragmaLogixAI.agents.mind_agent import mind_agent
from PragmaLogixAI.agents.finance_agent import finance_agent
from PragmaLogixAI.agents.logistics_agent import logistics_agent
from PragmaLogixAI.agents.professional_agent import professional_agent

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Journey-specific coordinator prompts (kept short — delegate, not repeat)
# ---------------------------------------------------------------------------
_TOMORROW_PROMPT = """You are the PragmaLogixAI Coordinator.
Given the specialist agent findings below, produce a JSON life plan for TODAY with:
- daily_plan: list of {{"hour": "...", "task": "...", "energy_cost": 1-5}} items (3-5 items)
- friction_budget_actions: list of 1-3 actionable friction reduction steps
- life_diffs: list of 2-3 Aider-style diff strings (prefix: +, -, or ~)

Return ONLY valid JSON — no markdown fences.
Specialist findings: {findings_json}
Age group: {age_group}"""

_MONTH_PROMPT = """You are the PragmaLogixAI Coordinator.
Given the specialist findings, produce a JSON monthly friction budget with:
- friction_budget_actions: list of 3-5 financial and attention leak reduction actions
- life_diffs: list of 3-5 Aider-style diff strings showing monthly changes
- daily_plan: empty list (not applicable for monthly view)

Return ONLY valid JSON — no markdown fences.
Specialist findings: {findings_json}
Age group: {age_group}"""

_HOME_PROMPT = """You are the PragmaLogixAI Coordinator.
Given the specialist findings, produce a JSON home logistics radar with:
- daily_plan: list of {{"hour": "...", "task": "...", "energy_cost": 1-5}} routine check-in items (2-4)
- friction_budget_actions: list of 2-3 home maintenance or logistics actions
- life_diffs: list of 2-3 Aider-style diff strings for routine changes

Return ONLY valid JSON — no markdown fences.
Specialist findings: {findings_json}
Age group: {age_group}"""

_JOURNEY_PROMPTS = {
    "tomorrow": _TOMORROW_PROMPT,
    "month": _MONTH_PROMPT,
    "home": _HOME_PROMPT,
}

# Deterministic plan templates — used when Pro model is unavailable
_DEFAULT_PLANS: Dict[str, Dict[str, Any]] = {
    "tomorrow": {
        "adult": {
            "daily_plan": [
                {"hour": "09:00", "task": "Focus deep work block", "energy_cost": 5},
                {"hour": "14:00", "task": "Mails & logistics triage", "energy_cost": 2},
                {"hour": "17:00", "task": "Exercise & gym workout", "energy_cost": 3},
            ],
            "friction_budget_actions": ["Cancel low-value streaming subscription"],
            "life_diffs": [
                "- Cancelled duplicate SaaS cloud trial account (-$14.99/mo)",
                "+ Activated daily focus window (10:00–12:00)",
                "~ Reduced administrative meeting load from 3 to 1 daily",
            ],
        },
        "senior": {
            "daily_plan": [
                {"hour": "09:00", "task": "Moderate exercise & stretching", "energy_cost": 2},
                {"hour": "11:00", "task": "Cognitive memory training", "energy_cost": 3},
                {"hour": "15:00", "task": "Health checkup review", "energy_cost": 2},
            ],
            "friction_budget_actions": [
                "Verify medication schedule updates",
                "Audit duplicate senior utility charges",
            ],
            "life_diffs": [
                "- Removed active chore load of cleaning lawn (high physical risk)",
                "+ Added auto-checkin safety routine via smart lock",
                "~ Decreased weekly chore commitment by 2 hours",
            ],
        },
        "student": {
            "daily_plan": [
                {"hour": "09:00", "task": "Math study block", "energy_cost": 4},
                {"hour": "11:00", "task": "Outdoor active play", "energy_cost": 2},
                {"hour": "16:00", "task": "Internship prep & coding course", "energy_cost": 4},
            ],
            "friction_budget_actions": ["Set daily screen-time blocks on gaming console"],
            "life_diffs": [
                "+ Added Technical Coding course schedule (focus priority)",
                "- Pruned social distraction window by 45 mins",
                "~ Increased academic study target to 4 hours/day",
            ],
        },
    },
    "month": {
        "adult": {
            "daily_plan": [],
            "friction_budget_actions": [
                "Cancel 3 overlapping SaaS trial subscriptions (-$44.97/mo)",
                "Renegotiate broadband contract (est. -$15/mo)",
                "Consolidate streaming services to 1 family plan",
            ],
            "life_diffs": [
                "- Removed 3 unused SaaS subscriptions (-$44.97/mo)",
                "+ Set up automated savings transfer on pay day",
                "~ Reduced food delivery orders from 12 to 6 per month (-$90)",
            ],
        },
        "senior": {
            "daily_plan": [],
            "friction_budget_actions": [
                "Review pension payout schedule for discrepancies",
                "Consolidate utility bills to single provider",
            ],
            "life_diffs": [
                "- Cancelled redundant landline bundle (-$18/mo)",
                "+ Set up auto-pay for essential utilities (zero late fees)",
                "~ Reduced energy consumption via smart meter review (-$25/mo)",
            ],
        },
        "student": {
            "daily_plan": [],
            "friction_budget_actions": [
                "Track weekly pocket money vs. savings target",
                "Use student discount codes for education subscriptions",
            ],
            "life_diffs": [
                "+ Opened a student savings account (5% APY)",
                "- Stopped impulse buying on gaming marketplace (-$30/mo)",
                "~ Shifted 10% of allowance into course fund",
            ],
        },
    },
    "home": {
        "adult": {
            "daily_plan": [
                {"hour": "08:00", "task": "Morning appliance checklist (5 min)", "energy_cost": 1},
                {"hour": "19:00", "task": "Grocery inventory & meal prep", "energy_cost": 2},
                {"hour": "21:00", "task": "Evening home security check", "energy_cost": 1},
            ],
            "friction_budget_actions": [
                "Schedule AC filter replacement (overdue by 14 days)",
                "Auto-route grocery order for weekly staples",
            ],
            "life_diffs": [
                "+ Set recurring AC filter reminder (every 90 days)",
                "- Removed manual grocery trip (switched to delivery)",
                "~ Reduced average home maintenance time by 1.5 hrs/week",
            ],
        },
        "senior": {
            "daily_plan": [
                {"hour": "09:00", "task": "Medication check & morning log", "energy_cost": 1},
                {"hour": "12:00", "task": "Prescription delivery confirmation", "energy_cost": 1},
                {"hour": "20:00", "task": "Smart-lock safety check-in", "energy_cost": 1},
            ],
            "friction_budget_actions": [
                "Automate monthly prescription refill order",
                "Schedule community check-in call Tuesdays 10 AM",
            ],
            "life_diffs": [
                "+ Automated prescription delivery (monthly)",
                "- Removed high-effort garden maintenance task",
                "~ Delegated lawn care to community service",
            ],
        },
        "student": {
            "daily_plan": [
                {"hour": "08:30", "task": "Study room quick tidy (10 min)", "energy_cost": 1},
                {"hour": "18:00", "task": "Shared-space cleaning rotation", "energy_cost": 2},
            ],
            "friction_budget_actions": [
                "Assign weekly chore roster with flatmates",
                "Set reminder for laundry every 4 days",
            ],
            "life_diffs": [
                "+ Created shared chore roster (fair distribution)",
                "- Reduced study clutter by weekly desk reset",
                "~ Shared grocery bulk-buying with flatmates (-30% cost)",
            ],
        },
    },
}


class ParallelSpecialistsMesh:
    """Orchestrates concurrent execution of all specialist agents.

    Args:
        sub_agents: List of specialist agent instances.
    """

    def __init__(self, sub_agents: List[Any]) -> None:
        self.sub_agents = sub_agents

    async def run(self, input_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Run all specialist agents concurrently.

        Args:
            input_data: Shared input payload forwarded to every agent.

        Returns:
            List of agent result dicts (one per agent).
        """
        tasks = [agent.run(input_data) for agent in self.sub_agents]
        return await asyncio.gather(*tasks)


class CoordinatorAgent:
    """Main coordinator agent.

    Aggregates specialist findings into a unified life plan using
    Gemini 2.5 Pro synthesis.  Falls back to deterministic plans if the
    model is unavailable.

    Args:
        name: Human-readable agent name.
        mesh: Configured ``ParallelSpecialistsMesh`` instance.
    """

    def __init__(self, name: str, mesh: ParallelSpecialistsMesh) -> None:
        self.name = name
        self.mesh = mesh

    def _get_pro_model(self) -> Any:
        """Return the Gemini 2.5 Pro model singleton, or ``None`` on failure."""
        try:
            from PragmaLogixAI.backend.app.services.vertex_client import get_pro_model
            return get_pro_model()
        except Exception as exc:
            logger.debug("Pro model unavailable in coordinator: %s", exc)
            return None

    async def _synthesise_with_pro(
        self,
        merged_findings: Dict[str, str],
        age_group: str,
        journey: str,
    ) -> Dict[str, Any]:
        """Call Gemini 2.5 Pro to synthesise a structured plan from specialist findings.

        Args:
            merged_findings: Agent name → findings string dict.
            age_group: User age group (``adult`` | ``senior`` | ``student``).
            journey: Journey key (``tomorrow`` | ``month`` | ``home``).

        Returns:
            Parsed plan dict with ``daily_plan``, ``friction_budget_actions``,
            ``life_diffs`` — or the deterministic fallback if model fails.
        """
        model = self._get_pro_model()
        fallback = _DEFAULT_PLANS.get(journey, _DEFAULT_PLANS["tomorrow"]).get(
            age_group, _DEFAULT_PLANS["tomorrow"]["adult"]
        )

        if model is None:
            logger.info("Using deterministic plan fallback (Pro model unavailable).")
            return fallback

        prompt_template = _JOURNEY_PROMPTS.get(journey, _TOMORROW_PROMPT)
        prompt = prompt_template.format(
            findings_json=json.dumps(merged_findings, indent=2),
            age_group=age_group,
        )

        try:
            if hasattr(model, "generate_content"):
                response = model.generate_content(prompt)
                raw_text = response.text
            else:
                response = model.models.generate_content(
                    model="gemini-2.5-pro-preview-06-05", contents=[prompt]
                )
                raw_text = response.text

            clean_text = (
                raw_text.strip()
                .removeprefix("```json")
                .removeprefix("```")
                .removesuffix("```")
            )
            plan = json.loads(clean_text)
            # Ensure required keys are always present
            plan.setdefault("daily_plan", [])
            plan.setdefault("friction_budget_actions", [])
            plan.setdefault("life_diffs", [])
            return plan

        except Exception as exc:
            logger.warning("Pro model synthesis failed (%s) — using deterministic fallback.", exc)
            return fallback

    def _run_lint(self, daily_plan: List[Dict[str, Any]]) -> List[str]:
        """Run Aider-style plan consistency checks on the compiled schedule.

        Checks:
        - Rule A: Total energy cost must not exceed 9 (burnout threshold).
        - Rule B: No duplicate time slots in the same day.

        Args:
            daily_plan: List of ``{hour, task, energy_cost}`` dicts.

        Returns:
            List of lint warning strings (empty if plan is valid).
        """
        warnings: List[str] = []

        total_energy = sum(t.get("energy_cost", 0) for t in daily_plan)
        if total_energy > 9:
            warnings.append(
                f"LINT WARNING: Planned schedule total energy cost ({total_energy}) "
                "exceeds daily budget of 9 — risk of burnout."
            )

        hours = [t.get("hour") for t in daily_plan if t.get("hour")]
        if len(hours) != len(set(hours)):
            warnings.append(
                "LINT WARNING: Duplicate time slots detected in the schedule — "
                "resolve overlapping tasks before committing the plan."
            )

        return warnings

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute the full coordinator pipeline.

        Steps:
        1. Run all specialist agents in parallel.
        2. Merge findings into a dict keyed by agent name.
        3. Synthesise a structured plan with Gemini 2.5 Pro (or deterministic fallback).
        4. Run plan linting.
        5. Return the unified result.

        Args:
            input_data: Payload dict with at minimum:
                ``task_id``, ``user_id``, ``query``, ``age_group``, ``journey``.

        Returns:
            Unified plan dict with keys: ``task_id``, ``status``, ``age_group``,
            ``journey``, ``daily_plan``, ``friction_budget_actions``, ``life_diffs``,
            ``lint_warnings``, ``specialist_reports``.
        """
        age_group = input_data.get("age_group", "adult")
        journey = input_data.get("journey", "tomorrow")

        # 1. Parallel specialist execution
        specialist_results = await self.mesh.run(input_data)

        # 2. Merge findings
        merged_reports: Dict[str, str] = {}
        for result in specialist_results:
            merged_reports[result["agent"]] = result["findings"]

        # 3. Pro model synthesis
        plan = await self._synthesise_with_pro(merged_reports, age_group, journey)

        daily_plan = plan.get("daily_plan", [])
        friction_actions = plan.get("friction_budget_actions", [])
        life_diffs = plan.get("life_diffs", [])

        # 4. Plan linting
        lint_warnings = self._run_lint(daily_plan)

        return {
            "task_id": input_data.get("task_id", "INC-2026-IN-01"),
            "status": "SUCCESS",
            "age_group": age_group,
            "journey": journey,
            "daily_plan": daily_plan,
            "friction_budget_actions": friction_actions,
            "life_diffs": life_diffs,
            "lint_warnings": lint_warnings,
            "specialist_reports": merged_reports,
        }


# ---------------------------------------------------------------------------
# Module-level singletons (used by main.py and tests)
# ---------------------------------------------------------------------------
specialist_mesh = ParallelSpecialistsMesh([
    health_agent,
    mind_agent,
    finance_agent,
    logistics_agent,
    professional_agent,
])

coordinator_agent = CoordinatorAgent(
    name="PragmaLogixCoordinator",
    mesh=specialist_mesh,
)
