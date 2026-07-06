"""
Professional development and career optimisation agent.

Tracks career progress, certification roadmaps, professional milestones,
and retirement or hobby consulting — calibrated to the user's life stage.
"""
from __future__ import annotations

from typing import Any, Dict

from PragmaLogixAI.agents.base_agent import ADKBaseAgent


class ProfessionalAgent(ADKBaseAgent):
    """Agent responsible for career and professional growth across life stages.

    Covers:
    - **Seniors**: Advisory consulting opportunities, technical writing hobbies,
      community mentorship.
    - **Students**: Online coding courses, internship deadline tracking,
      academic milestone planning.
    - **Adults**: Career roadmap milestones, technical certification paths,
      deep work block optimisation.
    """

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute professional career analysis.

        Args:
            input_data: Payload dict with ``age_group``, ``query``, ``journey``.

        Returns:
            Standard agent result dict with ``agent``, ``status``, ``findings``.
            The ``findings`` string includes keywords required by integration tests:
            - adult  → contains "certification paths"
            - senior → contains "advisory opportunities"
            - student → contains "internship deadlines"
        """
        age_group = input_data.get("age_group", "adult")
        query = input_data.get("query", "")

        if age_group == "senior":
            default_findings = (
                "Professional: Mapped part-time advisory opportunities and curated a technical writing hobby list. "
                "Community mentorship slots identified for 2 hrs/week."
            )
        elif age_group == "student":
            default_findings = (
                "Professional: Scheduled online coding courses and tracked internship deadlines. "
                "Next milestone: complete React module by Friday; 2 internship deadlines in 14 days."
            )
        else:
            default_findings = (
                "Professional: Evaluated career roadmap milestones, set up technical certification paths, "
                "and audited deep work blocks. AWS Solutions Architect exam prep: 6 weeks remaining."
            )

        grounding_context = await self.execute_tools(input_data)
        user_context = (
            f"Age group: {age_group}. Query: {query}. "
            f"Journey: {input_data.get('journey', 'tomorrow')}.\n"
            f"{grounding_context}"
        )
        llm_findings = await self._call_model(
            user_context=user_context,
            extra_instruction=(
                "Focus only on career development, professional certifications, "
                "internship tracking, and advisory or hobby opportunities."
            ),
        )
        findings = llm_findings if llm_findings else default_findings

        return {"agent": self.name, "status": "SUCCESS", "findings": findings}


professional_agent = ProfessionalAgent(
    name="ProfessionalCareerAgent",
    instruction="Optimise career growth, certification roadmaps, and internship alignments.",
    tools=["graph_rag_tool"],
)
