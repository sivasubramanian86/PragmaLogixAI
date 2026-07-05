import pytest
from PragmaLogixAI.backend.app.services.cache import get_cached_plan, set_cached_plan

def test_semantic_cache_get_and_set():
    """
    Test that the semantic cache correctly stores and retrieves plan data.
    """
    # Arrange
    query = "Optimize my afternoon schedule"
    user_id = "user-abc"
    plan_data = {"status": "SUCCESS", "plan": "Hour 1: Rest"}

    # Act
    set_cached_plan(query, user_id, plan_data)
    cached = get_cached_plan(query, user_id)

    # Assert
    assert cached is not None
    assert cached["plan"] == "Hour 1: Rest"

    # Test miss
    assert get_cached_plan("unrelated query", user_id) is None
