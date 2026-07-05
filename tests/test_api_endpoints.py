"""
API endpoint integration tests for new routes added in S5.

Tests cover:
- POST /api/v1/ingest (multipart file upload)
- POST /api/v1/plan/tomorrow
- POST /api/v1/plan/month
- POST /api/v1/plan/home
- Backward-compat POST /api/v1/plan
"""
import io
import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi.testclient import TestClient
from PragmaLogixAI.backend.app.main import app

client = TestClient(app)

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

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _mock_ingest_result():
    """Return a mock IngestionResult with one node, one edge, one event."""
    from PragmaLogixAI.backend.app.models.ingestion import (
        IngestionResult, NodeSchema, EdgeSchema, EventSchema
    )
    return IngestionResult(
        nodes=[NodeSchema(label="Habit", name="Morning Run", description="Daily jog")],
        edges=[],
        events=[EventSchema(category="HEALTH", description="Morning jog logged", value=1.0)],
    )


# ---------------------------------------------------------------------------
# /api/v1/ingest tests
# ---------------------------------------------------------------------------
def test_ingest_endpoint_success():
    """POST /api/v1/ingest accepts a text file and returns extraction counts."""
    file_content = b"Woke up at 6am, went for a 30-min run, felt energised."
    mock_result = _mock_ingest_result()

    with patch(
        "PragmaLogixAI.backend.app.routers.ingest.ingest_multimodal_signal",
        new_callable=AsyncMock,
        return_value=mock_result,
    ):
        response = client.post(
            "/api/v1/ingest",
            files={"file": ("morning_log.txt", io.BytesIO(file_content), "text/plain")},
            data={"user_id": "test_ingest_user"},
        )

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["nodes_extracted"] == 1
    assert data["events_extracted"] == 1
    assert "Morning Run" in data["node_names"]


def test_ingest_endpoint_no_file():
    """POST /api/v1/ingest without a file returns 422 (validation error)."""
    response = client.post("/api/v1/ingest", data={"user_id": "test"})
    assert response.status_code == 422  # FastAPI validation error for missing File


# ---------------------------------------------------------------------------
# /api/v1/plan/* journey route tests
# ---------------------------------------------------------------------------
@pytest.mark.parametrize("journey_path,expected_journey", [
    ("/api/v1/plan/tomorrow", "tomorrow"),
    ("/api/v1/plan/month", "month"),
    ("/api/v1/plan/home", "home"),
])
def test_plan_journey_routes_success(journey_path: str, expected_journey: str):
    """Journey plan routes return structured plan with correct journey field."""
    payload = {
        "user_id": "test_plan_user",
        "query": "Optimise my schedule",
        "age_group": "adult",
    }
    mock_res = dict(_MOCK_PLAN_RESULT)
    mock_res["journey"] = expected_journey

    with patch(
        "PragmaLogixAI.backend.app.routers.plan.coordinator_agent.run",
        new_callable=AsyncMock,
        return_value=mock_res,
    ):
        response = client.post(journey_path, json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["journey"] == expected_journey
    assert "daily_plan" in data
    assert "life_diffs" in data
    assert "specialist_reports" in data
    assert data["cache_hit"] is False


def test_plan_journey_cache_hit():
    """Second identical plan request returns cache_hit=True."""
    payload = {
        "user_id": "cache_test_user",
        "query": "Unique cache test query for tomorrow plan endpoint",
        "age_group": "adult",
    }
    
    with patch(
        "PragmaLogixAI.backend.app.routers.plan.coordinator_agent.run",
        new_callable=AsyncMock,
        return_value=_MOCK_PLAN_RESULT,
    ):
        r1 = client.post("/api/v1/plan/tomorrow", json=payload)
        assert r1.status_code == 200
        assert r1.json()["cache_hit"] is False

        r2 = client.post("/api/v1/plan/tomorrow", json=payload)
        assert r2.status_code == 200
        assert r2.json()["cache_hit"] is True


def test_plan_missing_query_returns_400():
    """Plan endpoint returns 400 when query is empty."""
    response = client.post("/api/v1/plan/tomorrow", json={"user_id": "u", "age_group": "adult", "query": ""})
    assert response.status_code == 400


def test_legacy_plan_endpoint_compat():
    """Deprecated /api/v1/plan still returns a valid tomorrow plan."""
    payload = {
        "user_id": "legacy_user",
        "query": "Legacy plan test",
        "age_group": "senior",
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
    assert data["journey"] == "tomorrow"
