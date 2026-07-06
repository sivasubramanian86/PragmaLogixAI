"""
Ingestion service: parse multimodal user inputs and update the Life Knowledge Graph.

Pipeline:
    1. Upload the raw file bytes to GCS (staging bucket for Gemini inline content).
    2. Call Gemini 2.5 Flash-Lite with the INGESTION_PROMPT to extract entities.
    3. Persist extracted nodes/edges to PostgreSQL (pgvector graph).
    4. Write tabular events to BigQuery ``pragmalogix.life_events`` table.
"""
from __future__ import annotations

import json
import logging
import os
from typing import Any, Dict

from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from PragmaLogixAI.backend.app.models.ingestion import IngestionResult, NodeSchema, EdgeSchema, EventSchema
from PragmaLogixAI.backend.app.models.graph_models import GraphNode, GraphEdge

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# System prompt for multimodal entity extraction (kept short — token-efficient)
# ---------------------------------------------------------------------------
INGESTION_PROMPT = """You are an expert entity extraction assistant for a Life Decision Intelligence OS.
Parse the user's input (direct text, image, audio, or video media) and extract:
1. Nodes — core life entities (label: Habit | Pain | Event | Outcome | Task).
2. Edges — how entities relate (TRIGGERS | LEADS_TO | IMPACTS | BLOCKS).
3. Events — quantitative logs (category: HEALTH | MIND | FINANCE | LOGISTICS).

Return ONLY a valid JSON object matching this schema (no markdown fences):
{
  "nodes": [{"label": "...", "name": "...", "description": "...", "metadata": {}}],
  "edges": [{"source_name": "...", "target_name": "...", "relationship": "...", "weight": 1.0}],
  "events": [{"category": "...", "description": "...", "value": 0.0, "metadata": {}}]
}"""


def _build_vertex_gemini_client() -> Any:
    """Return the Gemini 2.5 Flash-Lite model from vertex_client singleton.

    Falls back to returning ``None`` if Vertex AI is unavailable (e.g. in unit
    tests without GCP credentials).  Callers check for ``None`` and use the
    supplied mock instead.

    Returns:
        A ``GenerativeModel`` or ``None``.
    """
    try:
        from PragmaLogixAI.backend.app.services.vertex_client import get_flash_lite_model
        return get_flash_lite_model()
    except Exception as exc:
        logger.warning("Vertex AI model unavailable, falling back to injected client: %s", exc)
        return None


async def _upload_to_gcs(file_bytes: bytes, file_path: str, mime_type: str) -> str:
    """Upload file bytes to the configured GCS staging bucket.

    Args:
        file_bytes: Raw file content.
        file_path: Original file name/path (used as GCS object name).
        mime_type: MIME type of the file.

    Returns:
        GCS URI in the form ``gs://bucket/object``.
    """
    try:
        from google.cloud import storage as gcs

        bucket_name = os.environ.get("GCS_STAGING_BUCKET", "pragmalogixai-staging")
        object_name = f"uploads/{os.path.basename(file_path)}"

        client = gcs.Client()
        bucket = client.bucket(bucket_name)
        blob = bucket.blob(object_name)
        blob.upload_from_string(file_bytes, content_type=mime_type)

        gcs_uri = f"gs://{bucket_name}/{object_name}"
        logger.info("File staged to GCS: %s", gcs_uri)
        return gcs_uri
    except Exception as exc:
        logger.warning("GCS upload failed (non-fatal for local dev): %s", exc)
        return file_path  # fall back to local path reference


async def _write_events_to_bigquery(
    events: list[EventSchema],
    user_id: str,
) -> None:
    """Write extracted life events to the BigQuery ``pragmalogix.life_events`` table.

    Args:
        events: List of validated ``EventSchema`` instances from ingestion.
        user_id: Anonymised user identifier (tactical ID only — no PII).
    """
    if not events:
        return
    try:
        import uuid
        from datetime import datetime, timezone
        from google.cloud import bigquery

        from PragmaLogixAI.backend.app.services.vertex_client import get_gcp_project
        project = get_gcp_project()
        dataset = os.environ.get("BIGQUERY_DATASET", "pragmalogix")
        table_id = f"{project}.{dataset}.life_events"

        bq_client = bigquery.Client(project=project)
        rows = [
            {
                "event_id": str(uuid.uuid4()),
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "user_id": user_id,
                "category": evt.category,
                "description": evt.description,
                "value": evt.value or 0.0,
                "metadata": json.dumps(evt.metadata or {}),
            }
            for evt in events
        ]
        errors = bq_client.insert_rows_json(table_id, rows)
        if errors:
            logger.error("BigQuery insert errors: %s", errors)
        else:
            logger.info("Wrote %d events to BigQuery: %s", len(rows), table_id)
    except Exception as exc:
        logger.warning("BigQuery write failed (non-fatal): %s", exc)


async def ingest_multimodal_signal(
    file_path: str,
    mime_type: str,
    db_session: AsyncSession,
    gemini_client: Any,
    user_id: str = "default_user",
    file_bytes: bytes | None = None,
) -> IngestionResult:
    """Ingest a multimodal file, extract graph entities, and persist them.

    This function:
    1. Optionally stages the file to GCS if ``file_bytes`` is provided.
    2. Calls the Vertex AI Gemini 2.5 Flash-Lite model (or the injected
       ``gemini_client`` for testing) with the entity-extraction prompt.
    3. Parses the JSON response into an ``IngestionResult``.
    4. Upserts graph nodes/edges into PostgreSQL.
    5. Writes tabular events to BigQuery asynchronously.

    Args:
        file_path: Local path or GCS URI of the signal file.
        mime_type: MIME type (e.g. ``audio/mp3``, ``image/jpeg``).
        db_session: Async SQLAlchemy session (injected via ``get_db()``).
        gemini_client: Gemini client instance; if ``None``, the Vertex AI
            singleton from ``vertex_client`` is used automatically.
        user_id: Anonymised user tactical ID (no PII stored).
        file_bytes: Raw file bytes; if provided, the file is staged to GCS.

    Returns:
        ``IngestionResult`` containing extracted nodes, edges, and events.

    Raises:
        ValueError: If the model response cannot be parsed as valid JSON.
    """
    # 1. Stage to GCS (best-effort, non-blocking on failure)
    if file_bytes:
        file_path = await _upload_to_gcs(file_bytes, file_path, mime_type)

    # 2. Resolve the model (prefer injected client for tests)
    model = gemini_client or _build_vertex_gemini_client()

    contents = [INGESTION_PROMPT]
    media_part = None

    if mime_type.startswith("text/") and file_bytes:
        try:
            text_content = file_bytes.decode("utf-8", errors="replace")
            contents.append(f"Input Signal: {text_content} (MIME: {mime_type})")
            logger.info("Ingested text signal directly as string content.")
        except Exception as exc:
            logger.warning("Could not decode text file as UTF-8: %s", exc)
            contents.append(f"Input Signal: {file_path} (MIME: {mime_type})")
    else:
        if file_path.startswith("gs://"):
            try:
                from vertexai.generative_models import Part
                media_part = Part.from_uri(uri=file_path, mime_type=mime_type)
                contents.append(media_part)
                logger.info("Constructed Part.from_uri for Gemini model: %s", file_path)
            except Exception as exc:
                logger.warning("Failed to construct Part.from_uri: %s", exc)
        
        if media_part is None and file_bytes:
            try:
                from vertexai.generative_models import Part
                media_part = Part.from_data(data=file_bytes, mime_type=mime_type)
                contents.append(media_part)
                logger.info("Constructed Part.from_data for Gemini model from raw bytes.")
            except Exception as exc:
                logger.warning("Failed to construct Part.from_data: %s", exc)

        if media_part is None:
            contents.append(f"Input Signal: {file_path} (MIME: {mime_type})")

    try:
        if hasattr(model, "generate_content"):
            # Vertex AI GenerativeModel path
            response = model.generate_content(contents)
            raw_text = response.text
        else:
            # Legacy google-genai mock path (unit tests)
            response = model.models.generate_content(
                model="gemini-2.5-flash",
                contents=contents,
            )
            raw_text = response.text
    except Exception as exc:
        raise ValueError(f"Gemini model call failed: {exc}") from exc

    # 3. Parse JSON response
    try:
        # Strip markdown fences if the model wraps output despite instructions
        clean_text = raw_text.strip().removeprefix("```json").removeprefix("```").removesuffix("```")
        raw_data = json.loads(clean_text)
        result = IngestionResult.model_validate(raw_data)
    except Exception as exc:
        raise ValueError(
            f"Failed to parse Gemini output into IngestionResult: {exc}. "
            f"Raw response: {raw_text}"
        ) from exc

    # 4. Upsert graph nodes/edges into PostgreSQL
    node_name_map: dict[str, Any] = {}

    for node_schema in result.extracted_nodes:
        q = select(GraphNode).where(GraphNode.name == node_schema.name)
        existing = await db_session.execute(q)
        node_obj = existing.scalars().first()

        if not node_obj:
            node_obj = GraphNode(
                label=node_schema.label,
                name=node_schema.name,
                description=node_schema.description,
                metadata_json=node_schema.metadata,
            )
            db_session.add(node_obj)
            await db_session.flush()

        node_name_map[node_schema.name] = node_obj.id

    for edge_schema in result.extracted_edges:
        source_id = node_name_map.get(edge_schema.source_name)
        target_id = node_name_map.get(edge_schema.target_name)

        if not source_id:
            q = select(GraphNode).where(GraphNode.name == edge_schema.source_name)
            res = await db_session.execute(q)
            node_obj = res.scalars().first()
            if node_obj:
                source_id = node_obj.id

        if not target_id:
            q = select(GraphNode).where(GraphNode.name == edge_schema.target_name)
            res = await db_session.execute(q)
            node_obj = res.scalars().first()
            if node_obj:
                target_id = node_obj.id

        if source_id and target_id:
            q = select(GraphEdge).where(
                GraphEdge.source_id == source_id,
                GraphEdge.target_id == target_id,
                GraphEdge.relationship == edge_schema.relationship,
            )
            existing_edge = await db_session.execute(q)
            if not existing_edge.scalars().first():
                db_session.add(GraphEdge(
                    source_id=source_id,
                    target_id=target_id,
                    relationship=edge_schema.relationship,
                    weight=edge_schema.weight,
                ))

    await db_session.commit()

    # 5. Write events to BigQuery (non-blocking — errors are logged, not raised)
    await _write_events_to_bigquery(result.extracted_events, user_id)

    return result
