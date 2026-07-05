import pytest
from unittest.mock import MagicMock
from PragmaLogixAI.backend.app.services.summarization import summarize_context

@pytest.mark.asyncio
async def test_summarize_context_success():
    """
    Test that summarize_context takes chat history and returns a compiled summary.
    """
    # Arrange
    mock_gemini = MagicMock()
    mock_response = MagicMock()
    mock_response.text = '{"decisions": ["Optimize bedtime"], "facts": ["Wakes up tired"], "open_items": [], "task_state": "Optimise sleep routine"}'
    # summarization.py calls model.generate_content() when hasattr(model, "generate_content") is True
    mock_gemini.generate_content.return_value = mock_response

    history = [
        {"role": "user", "content": "I sleep badly and wake up tired"},
        {"role": "assistant", "content": "Let's optimize your bed time routine."}
    ]

    # Act
    summary = await summarize_context(history, mock_gemini)

    # Assert
    assert "decisions" in summary
    assert "facts" in summary
    assert "Optimize bedtime" in summary["decisions"]
