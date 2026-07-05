import pytest
from PragmaLogixAI.agents.sub_agents import coordinator_agent

@pytest.mark.asyncio
async def test_coordinator_agent_graph_execution():
    """
    Test that the coordinator agent coordinates execution of parallel sub-agents
    including the new ProfessionalCareerAgent and validates age-group outputs.
    """
    # Test Adult/Worker
    user_input = {
        "task_id": "INC-2026-IN-01",
        "user_id": "user-123",
        "query": "Optimize my day tomorrow",
        "age_group": "adult"
    }

    result = await coordinator_agent.run(user_input)

    assert result["status"] == "SUCCESS"
    assert result["age_group"] == "adult"
    assert "daily_plan" in result
    assert any(w in result["daily_plan"][0]["task"].lower() for w in ["work", "focus", "deep"])
    assert "certification" in result["specialist_reports"]["ProfessionalCareerAgent"]
    assert "life_diffs" in result
    assert "lint_warnings" in result

    # Test Senior
    senior_input = {
        "task_id": "INC-2026-IN-02",
        "user_id": "user-456",
        "query": "Optimize schedule",
        "age_group": "senior"
    }
    senior_result = await coordinator_agent.run(senior_input)
    assert senior_result["age_group"] == "senior"
    assert "advisory" in senior_result["specialist_reports"]["ProfessionalCareerAgent"]
    assert len(senior_result["lint_warnings"]) == 0  # 2 + 3 + 2 = 7 energy cost (below threshold 9)

    # Test Student/Child
    student_input = {
        "task_id": "INC-2026-IN-03",
        "user_id": "user-789",
        "query": "Study planning",
        "age_group": "student"
    }
    student_result = await coordinator_agent.run(student_input)
    assert student_result["age_group"] == "student"
    assert "internship" in student_result["specialist_reports"]["ProfessionalCareerAgent"]
    assert len(student_result["lint_warnings"]) > 0  # 4 + 2 + 4 = 10 energy cost (exceeds threshold 9)
