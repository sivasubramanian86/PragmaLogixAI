import io
import json
import logging
import math
import os
import struct
import wave
from typing import List, Dict, Any

from PragmaLogixAI.backend.app.services.vertex_client import get_flash_lite_model

logger = logging.getLogger(__name__)

# Sample/Fallback dialogue
DEFAULT_DIALOGUE = [
    {"host": "Host A (Emma)", "text": "Hi everyone! Welcome to your daily life audit. We're looking at some fresh optimizations today."},
    {"host": "Host B (Liam)", "text": "That's right. The agent mesh has successfully audited your wellness markers and schedules."},
    {"host": "Host A (Emma)", "text": "And it looks like we've resolved some duplicate subscription fees and trimmed screen-time friction!"},
    {"host": "Host B (Liam)", "text": "Exactly. Let's make sure we stick to the daily focus blocks for maximum productivity."}
]

def generate_podcast_dialogue(summary: str) -> List[Dict[str, str]]:
    """
    Uses Gemini to generate a NotebookLM-style dialogue script.
    """
    model = get_flash_lite_model()
    
    prompt = f"""
    Create a dialogue between Host A (Emma, Female, enthusiastic) and Host B (Liam, Male, analytical)
    summarising this life plan. They should discuss the recommendations, wellness actions, and metrics.
    Keep the dialogue short and concise (exactly 4 turns in total: A, B, A, B).
    Output the script strictly as a JSON array of dictionaries, where each has "host" (either "Host A (Emma)" or "Host B (Liam)") and "text" (the spoken line).
    
    Example:
    [
      {{"host": "Host A (Emma)", "text": "Welcome to your personal audit. Let's review the adjustments."}},
      {{"host": "Host B (Liam)", "text": "Certainly, Liam here. The schedule shows a high energy cost block."}},
      {{"host": "Host A (Emma)", "text": "Right, so we delayed it to protect your energy budget!"}},
      {{"host": "Host B (Liam)", "text": "Correct. This should prevent fatigue and keep you focused."}}
    ]

    Plan Summary:
    {summary}
    """
    
    try:
        if hasattr(model, "generate_content"):
            response = model.generate_content(prompt)
            raw_text = response.text
            clean_text = raw_text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
            return json.loads(clean_text)
    except Exception as exc:
        logger.warning("Failed to generate dialogue using Gemini model: %s. Using default dialogue.", exc)
        
    return DEFAULT_DIALOGUE

def generate_notebooklm_audio(dialogue: List[Dict[str, str]]) -> bytes:
    """
    Synthesizes speech for each dialogue line using different voices and merges them.
    Host A: en-US-Journey-F (female)
    Host B: en-US-Journey-D (male) or en-US-Neural2-I
    """
    try:
        from google.cloud import texttospeech
        client = texttospeech.TextToSpeechClient()
        
        audio_segments = []
        for turn in dialogue:
            host = turn.get("host", "Host A (Emma)")
            text = turn.get("text", "")
            
            # Select voice code based on host gender
            if "Liam" in host or "Host B" in host:
                voice_name = "en-US-Journey-D"  # Male Journey voice
            else:
                voice_name = "en-US-Journey-F"  # Female Journey voice
                
            synthesis_input = texttospeech.SynthesisInput(text=text)
            voice = texttospeech.VoiceSelectionParams(
                language_code="en-US",
                name=voice_name,
            )
            audio_config = texttospeech.AudioConfig(
                audio_encoding=texttospeech.AudioEncoding.LINEAR16,
            )
            
            response = client.synthesize_speech(
                input=synthesis_input, voice=voice, audio_config=audio_config
            )
            audio_segments.append(response.audio_content)
            
        # Concatenate PCM bytes using wave module
        if audio_segments:
            out_io = io.BytesIO()
            out_wav = None
            for segment in audio_segments:
                if len(segment) < 44 or not segment.startswith(b"RIFF"):
                    continue
                in_wav = wave.open(io.BytesIO(segment), "rb")
                if out_wav is None:
                    out_wav = wave.open(out_io, "wb")
                    out_wav.setparams(in_wav.getparams())
                out_wav.writeframes(in_wav.readframes(in_wav.getnframes()))
                in_wav.close()
                
            if out_wav is not None:
                out_wav.close()
                return out_io.getvalue()
                
    except Exception as exc:
        logger.warning("NotebookLM TTS synthesis failed or client unavailable: %s. Returning silent WAV.", exc)
        
    # Standard silent WAV fallback
    wav_header = b'RIFF$\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00@\x1f\x00\x00@\x1f\x00\x00\x01\x00\x08\x00data\x00\x00\x00\x00'
    return wav_header
