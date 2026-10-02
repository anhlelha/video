# Demo Cảnh 1–2 (bản thử)

- `demo-canh-1-2.mp4`: video 61 giây, 1920×1080, 30fps, có giọng đọc, hiệu ứng âm thanh, nhạc nền và phụ đề.
- `src/`: mã nguồn để dựng lại video.

## Cách dựng lại

1. Tạo giọng đọc: `python3 src/tts.py --voice vi-VN-NamMinhNeural --rate=-8% --text "..." --write-media src/vo/lN.mp3` (cần `pip install edge-tts`).
2. Tạo hình: `node src/render.js` → `video_noaudio.mp4` (cần Playwright + Chromium + ffmpeg).
3. Tạo hiệu ứng âm thanh và nhạc: `python3 src/sfx.py` → `sfx.wav` (cần numpy).
4. Ghép giọng đọc + SFX + hình bằng ffmpeg. Giọng đọc đặt tại các mốc 2.0 / 15.0 / 25.4 / 33.3 / 42.6 / 49.0 giây.

Toàn bộ thời gian hoạt hình nằm trong hàm `render(t)` của `src/scene.html`.
