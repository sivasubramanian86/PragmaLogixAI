"""
Tests for multimodal synthesis endpoints and generator functions.
Tests verify correct fallback behavior when Vertex AI SDKs are unavailable.
"""
import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from PragmaLogixAI.backend.app.main import app

client = TestClient(app)


def test_imagen_endpoint_returns_svg_fallback_when_sdk_missing():
    """GET /api/v1/multimodal/image returns SVG when Imagen SDK unavailable."""
    with patch(
        "PragmaLogixAI.backend.app.services.multimodal_generator.vertex_vision_available",
        False,
    ):
        response = client.get("/api/v1/multimodal/image?prompt=test+diagram")
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("image/svg+xml")
    assert b"<svg" in response.content


def test_imagen_endpoint_with_real_sdk_mock():
    """GET /api/v1/multimodal/image returns PNG bytes when Imagen SDK succeeds."""
    mock_image = MagicMock()
    mock_image._image_bytes = b"\x89PNG\r\n\x1a\n"  # PNG magic bytes

    mock_model = MagicMock()
    mock_model.generate_images.return_value = [mock_image]

    with patch(
        "PragmaLogixAI.backend.app.services.multimodal_generator.vertex_vision_available",
        True,
    ), patch(
        "PragmaLogixAI.backend.app.services.multimodal_generator.ImageGenerationModel"
    ) as mock_cls:
        mock_cls.from_pretrained.return_value = mock_model
        response = client.get("/api/v1/multimodal/image?prompt=real+test")

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("image/png")


def test_chirp_audio_endpoint_returns_wav():
    """GET /api/v1/multimodal/audio returns WAV content (stub fallback)."""
    response = client.get("/api/v1/multimodal/audio?summary=test+plan+summary")
    assert response.status_code == 200
    assert "audio/wav" in response.headers["content-type"]
    # Check WAV header magic bytes
    assert response.content[:4] == b"RIFF"


def test_chirp_tts_real_call_mock():
    """generate_chirp_audio attempts Cloud TTS and returns audio_content bytes."""
    import sys
    import types
    from PragmaLogixAI.backend.app.services.multimodal_generator import generate_chirp_audio

    mock_response = MagicMock()
    mock_response.audio_content = b"RIFF\x24\x00\x00\x00WAVEfmt "

    mock_client_instance = MagicMock()
    mock_client_instance.synthesize_speech.return_value = mock_response

    # google.cloud.texttospeech is lazily imported inside generate_chirp_audio,
    # so we inject a fake module into sys.modules before the call.
    fake_tts = types.ModuleType("google.cloud.texttospeech")
    fake_tts.TextToSpeechClient = MagicMock(return_value=mock_client_instance)
    fake_tts.SynthesisInput = MagicMock(side_effect=lambda **kw: MagicMock())
    fake_tts.VoiceSelectionParams = MagicMock(side_effect=lambda **kw: MagicMock())
    fake_tts.AudioConfig = MagicMock(side_effect=lambda **kw: MagicMock())
    fake_tts.AudioEncoding = MagicMock(LINEAR16="LINEAR16")

    with patch.dict(sys.modules, {"google.cloud.texttospeech": fake_tts}):
        result = generate_chirp_audio("Test summary for plan")

    assert result[:4] == b"RIFF"
    mock_client_instance.synthesize_speech.assert_called_once()


def test_veo_video_endpoint_returns_webm():
    """GET /api/v1/multimodal/video returns WebM content (stub fallback)."""
    response = client.get("/api/v1/multimodal/video")
    assert response.status_code == 200
    assert "video/webm" in response.headers["content-type"]
    # Check WebM EBML header
    assert response.content[:4] == b"\x1a\x45\xdf\xa3"


def test_generate_imagen_diagram_fallback_returns_svg():
    """generate_imagen_diagram returns SVG bytes when vertex_vision_available=False."""
    from PragmaLogixAI.backend.app.services.multimodal_generator import generate_imagen_diagram

    with patch(
        "PragmaLogixAI.backend.app.services.multimodal_generator.vertex_vision_available",
        False,
    ):
        result = generate_imagen_diagram("test prompt")

    assert b"<svg" in result
    assert b"DECISION PATH OPTIMISED" in result
