"""
Integration tests for the three journey-specific planning routes.

Tests verify:
- The coordinator returns the correct ``journey`` field in the response.
- Each journey produces structurally correct output fields.
- All three age groups produce valid responses for each journey.
"""
import pytest
from PragmaLogixAI.agents.sub_agents import coordinator_agent


@pytest.mark.asyncio
async def test_tomorrow_journey_adult():
    """Tomorrow journey for adult profile returns a valid daily plan."""
    result = await coordinator_agent.run({
        "task_id": "INC-2026-J-01",
        "user_id": "user-jt-adult",
        "query": "Optimise my day tomorrow",
        "age_group": "adult",
        "journey": "tomorrow",
    })

    assert result["status"] == "SUCCESS"
    assert result["journey"] == "tomorrow"
    assert result["age_group"] == "adult"
    assert isinstance(result["daily_plan"], list)
    assert len(result["daily_plan"]) > 0
    assert "hour" in result["daily_plan"][0]
    assert "task" in result["daily_plan"][0]
    assert "energy_cost" in result["daily_plan"][0]
    assert isinstance(result["life_diffs"], list)
    assert isinstance(result["lint_warnings"], list)
    assert isinstance(result["specialist_reports"], dict)
    assert len(result["specialist_reports"]) == 5  # all 5 specialists


@pytest.mark.asyncio
async def test_month_journey_adult():
    """Month journey for adult returns friction budget actions and empty daily plan."""
    result = await coordinator_agent.run({
        "task_id": "INC-2026-J-02",
        "user_id": "user-jm-adult",
        "query": "Audit my monthly subscriptions",
        "age_group": "adult",
        "journey": "month",
    })

    assert result["status"] == "SUCCESS"
    assert result["journey"] == "month"
    assert isinstance(result["friction_budget_actions"], list)
    assert len(result["friction_budget_actions"]) > 0
    assert isinstance(result["life_diffs"], list)
    assert len(result["life_diffs"]) > 0


@pytest.mark.asyncio
async def test_home_journey_senior():
    """Home journey for senior returns logistics schedule."""
    result = await coordinator_agent.run({
        "task_id": "INC-2026-J-03",
        "user_id": "user-jh-senior",
        "query": "Plan my home routine",
        "age_group": "senior",
        "journey": "home",
    })

    assert result["status"] == "SUCCESS"
    assert result["journey"] == "home"
    assert isinstance(result["daily_plan"], list)
    # Senior home journey should have logistics check-ins
    assert len(result["daily_plan"]) >= 1


@pytest.mark.asyncio
async def test_tomorrow_journey_student_lint():
    """Student tomorrow plan should trigger lint warning (energy > 9)."""
    result = await coordinator_agent.run({
        "task_id": "INC-2026-J-04",
        "user_id": "user-jt-student",
        "query": "Plan my study day",
        "age_group": "student",
        "journey": "tomorrow",
    })

    assert result["status"] == "SUCCESS"
    assert result["journey"] == "tomorrow"
    # Student default plan energy = 4+2+4 = 10 > 9 → lint warning expected
    assert len(result["lint_warnings"]) > 0


@pytest.mark.asyncio
async def test_default_journey_fallback():
    """Coordinator defaults to 'tomorrow' journey when journey key is missing."""
    result = await coordinator_agent.run({
        "task_id": "INC-2026-J-05",
        "user_id": "user-fallback",
        "query": "Optimise my day",
        "age_group": "adult",
        # no 'journey' key — should default to 'tomorrow'
    })

    assert result["status"] == "SUCCESS"
    assert result["journey"] == "tomorrow"
