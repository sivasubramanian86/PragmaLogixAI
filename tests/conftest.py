"""Shared test isolation for external AI services."""
from __future__ import annotations

import pytest


@pytest.fixture(autouse=True)
def disable_live_vertex_models(monkeypatch: pytest.MonkeyPatch) -> None:
    """Keep the test suite offline unless a test injects its own model mock."""
    monkeypatch.setattr(
        "PragmaLogixAI.agents.base_agent.ADKBaseAgent._get_model",
        lambda self: None,
    )