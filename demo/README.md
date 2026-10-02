# Demo Cảnh 1–2 (bản thử)

- `demo-canh-1-2.mp4`: video 61 giây, 1920×1080, 30fps, có giọng đọc, hiệu ứng âm thanh, nhạc nền và phụ đề.
- `src/`: mã nguồn để dựng lại video.

## Cách dựng lại

1. Tạo giọng đọc: `python3 src/tts.py --voice vi-VN-NamMinhNeural --rate=-8% --text "..." --write-media src/vo/lN.mp3` (cần `pip install edge-tts`).
2. Tạo hình: `node src/render.js` → `video_noaudio.mp4` (cần Playwright + Chromium + ffmpeg).
3. Tạo hiệu ứng âm thanh và nhạc: `python3 src/sfx.py` → `sfx.wav` (cần numpy).
4. Ghép giọng đọc + SFX + hình bằng ffmpeg. Giọng đọc đặt tại các mốc 2.0 / 15.0 / 25.4 / 33.3 / 42.6 / 49.0 giây.

Toàn bộ thời gian hoạt hình nằm trong hàm `render(t)` của `src/scene.html`.

## Bản đầy đủ: `chiec-xe-lap-rap-full.mp4` (khoảng 3:21)

**Dựng lại toàn bộ bằng một lệnh:** `bash src/build.sh <thư_mục_tạm>` (render hình, tạo âm thanh, ghép giọng đọc, nối 2 phần, xuất cả bản nén `-nhe.mp4`).

- Ghép từ Cảnh 1–2 (`scene.html`, cắt ở 56,5 giây, bỏ thẻ kết) và Cảnh 3–7 (`part2.html`, 142 giây).
- Hình Cảnh 3–7: `PAGE=part2.html VOUT=part2_noaudio.mp4 node src/render.js`
- Âm thanh Cảnh 3–7: `OUT=sfx2.wav python3 src/sfx2.py`; giọng đọc ở `src/vo2/` (câu thoại trong `src/vo2/lines.txt`).
- Mốc đặt giọng đọc Cảnh 3–7 (giây, tính từ đầu Cảnh 3): 0.8, 5.6, 10.6, 16.4, 22.0, 25.2, 34.6, 41.6, 48.0, 50.6, 57.8, 64.2, 75.0, 81.6, 86.6, 93.4, 104.6, 116.6, 121.0, 125.0, 131.8, 137.2.
- Các kiểu bánh xe (cổ điển, gai, xích, đôi, lục giác, neon, cánh quạt, ngôi sao, vuông) nằm trong `src/wheels.js`.
