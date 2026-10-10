# ElevenLabs TTS: python3 tts_eleven.py "<text>" out.mp3
# Key comes from $ELEVENLABS_API_KEY or ~/.config/elevenlabs.env (never commit it).
import json, os, sys, urllib.request
key = os.environ.get("ELEVENLABS_API_KEY")
if not key:
    for line in open(os.path.expanduser("~/.config/elevenlabs.env")):
        if line.startswith("ELEVENLABS_API_KEY="): key = line.split("=", 1)[1].strip()
voice = os.environ.get("EL_VOICE", "cgSgspJ2msm6clMCkdW9")  # Jessica - playful, bright, warm
model = os.environ.get("EL_MODEL", "eleven_v3")
body = {"text": sys.argv[1], "model_id": model,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}}
if model != "eleven_v3": body["language_code"] = "vi"
req = urllib.request.Request(
    f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_128",
    data=json.dumps(body).encode(), headers={"xi-api-key": key, "Content-Type": "application/json"})
with urllib.request.urlopen(req) as r, open(sys.argv[2], "wb") as f: f.write(r.read())
