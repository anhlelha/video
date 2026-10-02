# Video "Kỹ năng nào rồi cũng ra đi?"

Video hoạt hình 3:04 cho phụ huynh 30–50 tuổi, kết thúc để mở.

| File | Nội dung |
|---|---|
| `kich-ban.md` | Kịch bản 8 cảnh: hình ảnh, lời thoại, âm thanh |
| `loi-thoai-thu-am.md` | Lời thoại để thu âm, có ký hiệu ngắt nghỉ, nhấn giọng và mốc thời gian |
| `storyboard.md` + `storyboard/` | 24 khung hình chính, chụp từ bản dựng |
| `ky-nang-nao-roi-cung-ra-di.mp4` | Bản đầy đủ 1920×1080, có giọng đọc, nhạc, hiệu ứng âm thanh, phụ đề |
| `ky-nang-nao-roi-cung-ra-di-nhe.mp4` | Bản nén nhẹ để gửi nhanh |

## Dựng lại

Cần: Node + Playwright (Chromium), ffmpeg, Python 3 với `numpy`, `scipy`, `edge-tts`.

1. Giọng đọc (chỉ khi sửa lời): mỗi dòng `vo/lines.txt` có dạng `tốc_độ|phụ_đề|câu_đọc_cho_máy (tuỳ chọn)`. Tạo lại bằng
   `python3 src/tts.py --voice vi-VN-NamMinhNeural --rate=<tốc_độ> --text "<câu>" --write-media src/vo/vN.mp3`.
2. Dựng toàn bộ: `bash src/build.sh <thư_mục_tạm>`. Lệnh này tự tính mốc thời gian (`timeline.py` → `timeline.js`), render hình, tạo nhạc và hiệu ứng (`sfx.py`), ghép giọng đọc, rồi xuất cả bản nén.
3. Xem nhanh vài khung hình: `bash src/sheet.sh 3 10 15 22.5` → `src/prev/sheet.png`.

Mốc thời gian các cảnh được tính từ độ dài giọng đọc cộng khoảng nghỉ (`GAP` trong `timeline.py`). Mỗi cảnh nằm trong một file (`s18.js` cho Cảnh 1 và 8, `s2.js` đến `s7.js`), và mọi chuyển động đều neo theo câu thoại, nên sửa lời hay đổi giọng thì hình tự khớp lại.
