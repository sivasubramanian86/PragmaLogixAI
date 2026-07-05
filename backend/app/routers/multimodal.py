import logging
from fastapi import APIRouter, Response, Query
from PragmaLogixAI.backend.app.services.multimodal_generator import (
    generate_imagen_diagram,
    generate_chirp_audio,
    generate_veo_video
)

logger = logging.getLogger(__name__)
router = APIRouter(tags=["multimodal"])

@router.get("/api/v1/multimodal/image")
async def get_multimodal_image(prompt: str = Query("Decision Summary", description="Prompt for Imagen 3")):
    """
    Generate and stream an outcome decision diagram generated via Vertex AI Imagen 3.
    """
    image_bytes = generate_imagen_diagram(prompt)
    # Check if we returned SVG or PNG
    if image_bytes.startswith(b"<svg"):
        return Response(content=image_bytes, media_type="image/svg+xml")
    return Response(content=image_bytes, media_type="image/png")

@router.get("/api/v1/multimodal/audio")
async def get_multimodal_audio(summary: str = Query("Plan summary", description="Summary text for Audio Speech")):
    """
    Stream synthesized audio summary voice-over.
    """
    audio_bytes = generate_chirp_audio(summary)
    return Response(
        content=audio_bytes,
        media_type="audio/wav",
        headers={"Content-Disposition": "inline; filename=plan-summary.wav"},
    )

@router.get("/api/v1/multimodal/video")
async def get_multimodal_video():
    """
    Stream a dynamic simulation video preview.
    """
    video_bytes = generate_veo_video()
    return Response(content=video_bytes, media_type="video/webm")
