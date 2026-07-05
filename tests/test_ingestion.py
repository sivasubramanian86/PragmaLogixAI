import pytest
from unittest.mock import AsyncMock, MagicMock
from PragmaLogixAI.backend.app.services.ingestion import ingest_multimodal_signal, IngestionResult

@pytest.mark.asyncio
async def test_ingest_multimodal_signal_success(monkeypatch):
    """
    Test that ingest_multimodal_signal correctly parses multimodal input
    and returns an IngestionResult containing extracted nodes, edges, and events.
    """
    # Arrange
    mock_db = AsyncMock()
    mock_db.add = MagicMock()
    mock_db.flush = AsyncMock()
    mock_scalars = MagicMock()
    mock_scalars.first.return_value = None
    mock_result = MagicMock()
    mock_result.scalars.return_value = mock_scalars
    mock_db.execute = AsyncMock(return_value=mock_result)
    
    mock_gemini_client = MagicMock()

    # Mock Gemini response — ingestion.py calls model.generate_content(contents)
    # when hasattr(model, "generate_content") is True (MagicMock always satisfies this)
    mock_response = MagicMock()
    mock_response.text = """
    {
        "nodes": [
            {"label": "Habit", "name": "Morning Coffee", "description": "Drinks double espresso daily at 8 AM", "metadata": {"frequency": "daily"}},
            {"label": "Pain", "name": "Acid Reflux", "description": "Stomach irritation reported post-coffee", "metadata": {"severity": "medium"}}
        ],
        "edges": [
            {"source_name": "Morning Coffee", "target_name": "Acid Reflux", "relationship": "TRIGGERS", "weight": 0.8}
        ],
        "events": [
            {"category": "HEALTH", "description": "Acid reflux flare-up after espresso", "value": 1.0}
        ]
    }
    """
    mock_gemini_client.generate_content.return_value = mock_response

    monkeypatch.setattr(
        "PragmaLogixAI.backend.app.services.ingestion._write_events_to_bigquery",
        AsyncMock(),
    )

    # Act
    result = await ingest_multimodal_signal(
        file_path="/mock/path/voice_note.mp3",
        mime_type="audio/mp3",
        db_session=mock_db,
        gemini_client=mock_gemini_client
    )

    # Assert
    assert isinstance(result, IngestionResult)
    assert len(result.extracted_nodes) == 2
    assert result.extracted_nodes[0].name == "Morning Coffee"
    assert result.extracted_nodes[1].label == "Pain"
    assert len(result.extracted_edges) == 1
    assert result.extracted_edges[0].relationship == "TRIGGERS"
    assert len(result.extracted_events) == 1
    assert result.extracted_events[0].category == "HEALTH"
