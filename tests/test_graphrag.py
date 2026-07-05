import pytest
from unittest.mock import AsyncMock, MagicMock
from PragmaLogixAI.backend.app.services.graphrag import retrieve_subgraph_context

@pytest.mark.asyncio
async def test_retrieve_subgraph_context_success():
    """
    Test that retrieve_subgraph_context runs query, fetches matching nodes/edges,
    and returns a structured markdown representation of the sub-graph.
    """
    # Arrange
    mock_db = AsyncMock()
    mock_gemini = MagicMock()
    mock_embedding = MagicMock()
    mock_embedding.values = [0.01] * 768
    mock_gemini.models.get_embeddings.return_value = [mock_embedding]

    # Mock node fetch
    mock_node_rows = [
        ("node-uuid-1", "Habit", "Morning Coffee", "Drinks daily", 0.95),
        ("node-uuid-2", "Pain", "Acid Reflux", "Irritation", 0.88)
    ]
    mock_nodes_result = MagicMock()
    mock_nodes_result.fetchall.return_value = mock_node_rows

    # Mock edge fetch
    mock_edge_rows = [
        ("TRIGGERS", 0.8, "Morning Coffee", "Habit", "Acid Reflux", "Pain")
    ]
    mock_edges_result = MagicMock()
    mock_edges_result.fetchall.return_value = mock_edge_rows

    # Setup database execution yields
    mock_db.execute.side_effect = [mock_nodes_result, mock_edges_result]

    # Act
    context = await retrieve_subgraph_context(
        query="coffee stomach pain",
        db_session=mock_db,
        gemini_client=mock_gemini
    )

    # Assert
    assert "Life Knowledge Graph Context" in context
    assert "Morning Coffee" in context
    assert "Acid Reflux" in context
    assert "TRIGGERS" in context
