"""
GraphRAG service: retrieve semantically relevant subgraphs from the Life Knowledge Graph.

Uses Vertex AI ``text-embedding-004`` to embed the query, then performs a
cosine-similarity search against ``graph_nodes.embedding`` (pgvector HNSW index)
to retrieve the top-k most relevant nodes and their connecting edges.

The resulting context is formatted as structured Markdown and passed to agents
as grounding — preventing the coordinator from loading full conversation history
into the LLM context window.
"""
from __future__ import annotations

import logging
from typing import Any

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)


async def _get_query_embedding(query: str, gemini_client: Any) -> list[float]:
    """Embed a query string using Vertex AI ``text-embedding-004``.

    Falls back to a zero-vector (768 dims) if embedding is unavailable,
    which gracefully degrades GraphRAG to an empty-result return.

    Args:
        query: Input query string to embed.
        gemini_client: Gemini/Vertex AI client instance (injected or real).

    Returns:
        A list of 768 floats representing the query embedding.
    """
    # Prefer an injected client so tests and alternate providers stay offline and
    # deterministic. Production callers that pass no client use Vertex AI below.
    if gemini_client is not None:
        try:
            if hasattr(gemini_client, "models") and callable(
                getattr(gemini_client.models, "get_embeddings", None)
            ):
                response = gemini_client.models.get_embeddings(
                    model="text-embedding-004", texts=[query]
                )
                return response[0].values
        except Exception as exc:
            logger.debug("Injected embedding client failed: %s", exc)

    try:
        from vertexai.language_models import TextEmbeddingModel

        model = TextEmbeddingModel.from_pretrained("text-embedding-004")
        embeddings = model.get_embeddings([query])
        return embeddings[0].values
    except Exception as exc:
        logger.debug("Vertex AI embedding failed: %s", exc)

    logger.warning("Returning zero-vector fallback for embedding of query: %.50s", query)
    return [0.0] * 768


async def retrieve_subgraph_context(
    query: str,
    db_session: AsyncSession,
    gemini_client: Any,
    top_k: int = 5,
    similarity_threshold: float = 0.65,
) -> str:
    """Retrieve semantically relevant nodes and edges from the Life Knowledge Graph.

    Performs a two-step retrieval:
    1. Embed the query with ``text-embedding-004``.
    2. Query ``graph_nodes`` via pgvector cosine distance for top-k matches.
    3. Fetch all edges connecting those nodes.
    4. Format the result as Markdown for LLM grounding.

    Args:
        query: Natural-language query (e.g. "coffee acid reflux morning energy").
        db_session: Async SQLAlchemy session.
        gemini_client: Vertex AI or mock client for embedding generation.
        top_k: Maximum number of nodes to retrieve.
        similarity_threshold: Minimum cosine similarity (0–1) for inclusion.

    Returns:
        Structured Markdown string describing the retrieved subgraph, or a
        "No context" message if no relevant nodes are found.
    """
    embedding = await _get_query_embedding(query, gemini_client)

    # pgvector cosine distance query
    node_query = text("""
        SELECT id, label, name, description,
               1 - (embedding <=> :embedding::vector) AS similarity
        FROM graph_nodes
        WHERE 1 - (embedding <=> :embedding::vector) >= :threshold
        ORDER BY embedding <=> :embedding::vector
        LIMIT :top_k
    """)

    try:
        node_results = await db_session.execute(
            node_query,
            {
                "embedding": str(embedding),
                "threshold": similarity_threshold,
                "top_k": top_k,
            },
        )
        nodes = node_results.fetchall()
    except Exception as exc:
        # SQLite fallback (unit tests): pgvector syntax not supported
        logger.debug("pgvector query failed (expected in SQLite tests): %s", exc)
        nodes = []

    if not nodes:
        return "No relevant context found in the Life Knowledge Graph."

    node_ids = [n[0] for n in nodes]

    edge_query = text("""
        SELECT e.relationship, e.weight,
               n_src.name AS source_name, n_src.label AS source_label,
               n_tgt.name AS target_name, n_tgt.label AS target_label
        FROM graph_edges e
        JOIN graph_nodes n_src ON e.source_id = n_src.id
        JOIN graph_nodes n_tgt ON e.target_id = n_tgt.id
        WHERE e.source_id = ANY(:node_ids) OR e.target_id = ANY(:node_ids)
    """)

    try:
        edge_results = await db_session.execute(edge_query, {"node_ids": node_ids})
        edges = edge_results.fetchall()
    except Exception as exc:
        logger.debug("Edge query failed: %s", exc)
        edges = []

    # Format Markdown context for LLM grounding
    lines = ["### Life Knowledge Graph Context", "#### Relevant Entities:"]
    for n in nodes:
        lines.append(f"- **[{n[1]}] {n[2]}**: {n[3]} (similarity: {n[4]:.2f})")

    if edges:
        lines.append("\n#### Relationships:")
        for e in edges:
            lines.append(
                f"- **{e[2]}** ({e[3]}) --[{e[0]} (weight: {e[1]:.2f})]--→ **{e[4]}** ({e[5]})"
            )

    return "\n".join(lines)
