import logging
from typing import Any, Dict
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from PragmaLogixAI.backend.app.db import get_db
from PragmaLogixAI.backend.app.services.ingestion import ingest_multimodal_signal

logger = logging.getLogger(__name__)
router = APIRouter(tags=["ingestion"])

@router.post("/api/v1/ingest")
async def ingest_signal(
    file: UploadFile = File(..., description="Multimodal file: audio/image/video/text"),
    user_id: str = Form("default_user", description="Anonymised user tactical ID"),
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    """Ingest a multimodal life signal and update the Life Knowledge Graph.

    Accepts audio notes, receipt images, video clips, or plain-text entries.
    Extracts life entities (nodes/edges) via Gemini 2.5 Flash-Lite and writes
    tabular events to BigQuery.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided.")

    mime_type = file.content_type or "application/octet-stream"
    supported_prefixes = ("audio/", "image/", "video/", "text/")
    if not any(mime_type.startswith(p) for p in supported_prefixes):
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported MIME type: {mime_type}. Expected audio/*, image/*, video/*, or text/*.",
        )

    try:
        file_bytes = await file.read()
        result = await ingest_multimodal_signal(
            file_path=file.filename,
            mime_type=mime_type,
            db_session=db,
            gemini_client=None,   # uses Vertex AI singleton
            user_id=user_id,
            file_bytes=file_bytes,
        )
        return {
            "status": "SUCCESS",
            "user_id": user_id,
            "nodes_extracted": len(result.extracted_nodes),
            "edges_extracted": len(result.extracted_edges),
            "events_extracted": len(result.extracted_events),
            "node_names": [n.name for n in result.extracted_nodes],
        }
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Ingestion failed for user %s: %s", user_id, exc)
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {exc}") from exc
