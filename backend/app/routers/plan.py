import logging
from typing import Any, Dict
from fastapi import APIRouter, HTTPException

from PragmaLogixAI.backend.app.services.cache import get_cached_plan, set_cached_plan
from PragmaLogixAI.agents.sub_agents import coordinator_agent

logger = logging.getLogger(__name__)
router = APIRouter(tags=["planning"])

def _build_plan_payload(payload: Dict[str, Any], journey: str) -> Dict[str, Any]:
    """Inject the journey discriminator and default values into the request payload."""
    payload.setdefault("user_id", "default_user")
    payload.setdefault("age_group", "adult")
    payload.setdefault("task_id", "INC-2026-IN-01")
    payload["journey"] = journey
    return payload

async def _run_plan(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Core plan execution: check cache → run agent graph → store in cache."""
    user_id = payload.get("user_id", "default_user")
    query = payload.get("query", "")
    journey = payload.get("journey", "tomorrow")

    if not query:
        raise HTTPException(status_code=400, detail="'query' field cannot be empty.")

    cache_key = f"{journey}:{query}"
    cached = get_cached_plan(cache_key, user_id)
    if cached:
        cached["cache_hit"] = True
        cached.setdefault("multimodal_outcomes", {
            "image_url": f"/api/v1/multimodal/image?prompt={journey}_plan_diagram",
            "audio_url": f"/api/v1/multimodal/audio?summary=Decision_plan_for_journey",
            "video_url": "/api/v1/multimodal/video"
        })
        return cached

    try:
        plan_result = await coordinator_agent.run(payload)
        plan_result["multimodal_outcomes"] = {
            "image_url": f"/api/v1/multimodal/image?prompt={journey}_plan_diagram",
            "audio_url": f"/api/v1/multimodal/audio?summary=Decision_plan_for_journey",
            "video_url": "/api/v1/multimodal/video"
        }
        set_cached_plan(cache_key, user_id, plan_result)
        plan_result["cache_hit"] = False
        return plan_result
    except Exception as exc:
        logger.exception("Coordinator agent failed for journey=%s user=%s: %s", journey, user_id, exc)
        raise HTTPException(status_code=500, detail=str(exc)) from exc

@router.post("/api/v1/plan/tomorrow")
async def plan_tomorrow(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Daily Energy & Focus Journey — generate tomorrow's optimised hourly plan."""
    return await _run_plan(_build_plan_payload(payload, "tomorrow"))

@router.post("/api/v1/plan/month")
async def plan_month(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Monthly Friction Budget Journey — audit financial & attention leaks over a month."""
    return await _run_plan(_build_plan_payload(payload, "month"))

@router.post("/api/v1/plan/home")
async def plan_home(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Home & Logistics Radar Journey — routine monitoring for chores, maintenance, wellness."""
    return await _run_plan(_build_plan_payload(payload, "home"))

@router.post("/api/v1/plan", deprecated=True)
async def generate_plan(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Legacy unified planning endpoint — prefer /api/v1/plan/tomorrow."""
    return await _run_plan(_build_plan_payload(payload, "tomorrow"))
