import pytest
from unittest.mock import AsyncMock, patch
from fastapi.testclient import TestClient
from PragmaLogixAI.backend.app.main import app

client = TestClient(app)

# ---------------------------------------------------------------------------
# Deterministic coordinator result used across plan endpoint tests
# ---------------------------------------------------------------------------
_MOCK_PLAN_RESULT = {
    "task_id": "INC-2026-TEST-01",
    "status": "SUCCESS",
    "age_group": "adult",
    "journey": "tomorrow",
    "daily_plan": [
        {"hour": "09:00", "task": "Focus deep work block", "energy_cost": 5},
        {"hour": "14:00", "task": "Mails & logistics triage", "energy_cost": 2},
    ],
    "friction_budget_actions": ["Cancel low-value streaming subscription"],
    "life_diffs": ["- Cancelled duplicate SaaS trial account (-$14.99/mo)"],
    "lint_warnings": [],
    "specialist_reports": {
        "HealthEnergyAgent": "Health: tracked sleep metrics.",
        "MindFocusAgent": "Mind: mapped focus blocks.",
        "FinanceWorkAgent": "Finance: detected subscription leak.",
        "LogisticsHomeAgent": "Logistics: auto-routed appliance repair tasks.",
        "ProfessionalCareerAgent": "Professional: set up technical certification paths.",
    },
}


def test_health_check_endpoint():
    """Test that /health returns 200 OK and healthy status."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_readiness_check_endpoint():
    """Test that /ready returns 200 OK and ready status."""
    response = client.get("/ready")
    assert response.status_code == 200
    assert response.json() == {"status": "ready"}


def test_generate_plan_endpoint_cached_miss():
    """Test that /api/v1/plan returns a valid coordinated plan response (cache miss then hit)."""
    payload = {
        "user_id": "test_user_main",
        "query": "Unique plan test query for cached miss endpoint test",
    }
    with patch(
        "PragmaLogixAI.backend.app.routers.plan.coordinator_agent.run",
        new_callable=AsyncMock,
        return_value=_MOCK_PLAN_RESULT,
    ):
        response = client.post("/api/v1/plan", json=payload)
        assert response.status_code == 200

        data = response.json()
        assert data["status"] == "SUCCESS"
        assert "daily_plan" in data
        assert "specialist_reports" in data
        assert data["cache_hit"] is False

        # Second call should be a cache hit (no coordinator invocation needed)
        response_cached = client.post("/api/v1/plan", json=payload)
        assert response_cached.status_code == 200
        assert response_cached.json()["cache_hit"] is True

