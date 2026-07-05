from typing import Dict
from fastapi import APIRouter

router = APIRouter(tags=["probes"])

@router.get("/health")
async def health_check() -> Dict[str, str]:
    """Liveness probe — returns 200 when the process is running."""
    return {"status": "healthy"}

@router.get("/ready")
async def readiness_check() -> Dict[str, str]:
    """Readiness probe — returns 200 when the app is ready to serve traffic."""
    return {"status": "ready"}
