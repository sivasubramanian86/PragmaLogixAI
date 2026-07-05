"""
Semantic cache service for caching generated decisions and schedules to reduce tokens.
"""
from typing import Optional, Dict, Any

# Simple in-memory semantic cache mapping query/state hashes to previous plans.
# In a production environment, this is backed by Redis (Cloud Memorystore) or AlloyDB pgvector.
_semantic_cache: Dict[str, Any] = {}

def get_cached_plan(query: str, user_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieves a cached plan if a semantically similar query/state has been processed recently.

    Args:
        query: User input query.
        user_id: User identifier.

    Returns:
        The cached plan data if present, else None.
    """
    cache_key = f"{user_id}:{query.lower().strip()}"
    return _semantic_cache.get(cache_key)

def set_cached_plan(query: str, user_id: str, plan_data: Dict[str, Any]) -> None:
    """
    Stores a generated plan in the semantic cache.

    Args:
        query: User input query.
        user_id: User identifier.
        plan_data: The output plan dictionary to cache.
    """
    cache_key = f"{user_id}:{query.lower().strip()}"
    _semantic_cache[cache_key] = plan_data
