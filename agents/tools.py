"""
Tool declarations for PragmaLogixAI ADK agents.

Each function is a proper async callable registered on specialist agents.
Tools are kept thin — they retrieve grounding data and return formatted
strings, not raw objects, to stay within ADK tool-call contract.
"""
from __future__ import annotations

import logging
import os
from typing import Any

logger = logging.getLogger(__name__)


async def graph_rag_tool(query: str, db_session: Any, gemini_client: Any) -> str:
    """Retrieve relevant sub-graph context from the Life Knowledge Graph.

    Uses cosine-similarity search (pgvector) to find the top-k most relevant
    nodes and edges from the user's life graph, formatted as Markdown.

    Args:
        query: Semantic query string describing what context to retrieve.
        db_session: Async SQLAlchemy database session.
        gemini_client: Vertex AI or mock client for embedding generation.

    Returns:
        Markdown-formatted subgraph context string.
    """
    from PragmaLogixAI.backend.app.services.graphrag import retrieve_subgraph_context

    return await retrieve_subgraph_context(
        query=query,
        db_session=db_session,
        gemini_client=gemini_client,
    )


async def bigquery_metrics_tool(
    user_id: str,
    category: str,
    days: int = 30,
) -> str:
    """Query BigQuery for recent life event metrics for a user.

    Fetches aggregated event data from ``pragmalogix.life_events`` for the
    specified category and time window.  Returns a formatted summary string
    suitable for LLM grounding context.

    Args:
        user_id: Anonymised user tactical ID (no PII).
        category: Event category filter — one of ``HEALTH``, ``MIND``,
            ``FINANCE``, ``LOGISTICS``.
        days: Look-back window in days (default: 30).

    Returns:
        Formatted string summarising recent metric events, or a
        "no data" message if BigQuery is unavailable or no rows found.
    """
    try:
        from google.cloud import bigquery

        from PragmaLogixAI.backend.app.services.vertex_client import get_gcp_project
        project = get_gcp_project()
        dataset = os.environ.get("BIGQUERY_DATASET", "pragmalogix")
        table = f"{project}.{dataset}.life_events"

        query_str = f"""
            SELECT
                category,
                description,
                value,
                timestamp
            FROM `{table}`
            WHERE user_id = @user_id
              AND category = @category
              AND timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL @days DAY)
            ORDER BY timestamp DESC
            LIMIT 20
        """

        bq_client = bigquery.Client(project=project)
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
                bigquery.ScalarQueryParameter("category", "STRING", category),
                bigquery.ScalarQueryParameter("days", "INT64", days),
            ]
        )

        rows = list(bq_client.query(query_str, job_config=job_config).result())
        if not rows:
            return f"No {category} events found in the last {days} days for user {user_id}."

        lines = [f"### BigQuery Metrics — {category} (last {days} days)"]
        for row in rows:
            value_str = f" | value: {row['value']:.2f}" if row.get("value") else ""
            lines.append(f"- [{row['timestamp'].date()}] {row['description']}{value_str}")
        return "\n".join(lines)

    except Exception as exc:
        logger.warning(
            "bigquery_metrics_tool unavailable for user=%s category=%s: %s",
            user_id, category, exc,
        )
        return f"BigQuery metrics temporarily unavailable ({category}). Using agent heuristics."
