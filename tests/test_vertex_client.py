"""
Unit tests for the Vertex AI client singleton (vertex_client.py).

Uses ``unittest.mock`` to patch ``vertexai.init`` and ``vertexai.generative_models``
so no real GCP credentials are required in CI.
"""
import pytest
from unittest.mock import patch, MagicMock


def test_init_vertex_uses_env_project(monkeypatch):
    """init_vertex reads GOOGLE_CLOUD_PROJECT from environment."""
    monkeypatch.setenv("GOOGLE_CLOUD_PROJECT", "test-project-123")
    monkeypatch.setenv("GOOGLE_CLOUD_LOCATION", "asia-south1")

    with patch("vertexai.init") as mock_init:
        # Re-import to pick up patched env
        import importlib
        import PragmaLogixAI.backend.app.services.vertex_client as vc
        importlib.reload(vc)

        vc.init_vertex()
        mock_init.assert_called_once_with(
            project="test-project-123",
            location="asia-south1",
        )


def test_init_vertex_default_fallback():
    """init_vertex falls back to YOUR_GCP_PROJECT when env is not set."""
    with patch("vertexai.init") as mock_init, \
         patch.dict("os.environ", {}, clear=True):
        import importlib
        import PragmaLogixAI.backend.app.services.vertex_client as vc
        importlib.reload(vc)

        vc.init_vertex()
        call_kwargs = mock_init.call_args
        assert call_kwargs is not None


def test_get_flash_lite_model_returns_model():
    """get_flash_lite_model returns a GenerativeModel configured for Flash-Lite."""
    mock_model = MagicMock()

    with patch("vertexai.generative_models.GenerativeModel", return_value=mock_model), \
         patch("vertexai.generative_models.GenerationConfig"):
        import importlib
        import PragmaLogixAI.backend.app.services.vertex_client as vc
        importlib.reload(vc)

        model = vc.get_flash_lite_model()
        assert model is not None


def test_get_pro_model_returns_model():
    """get_pro_model returns a GenerativeModel configured for Gemini 2.5 Pro."""
    mock_model = MagicMock()

    with patch("vertexai.generative_models.GenerativeModel", return_value=mock_model), \
         patch("vertexai.generative_models.GenerationConfig"):
        import importlib
        import PragmaLogixAI.backend.app.services.vertex_client as vc
        importlib.reload(vc)

        model = vc.get_pro_model()
        assert model is not None
