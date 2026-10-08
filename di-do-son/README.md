# Đi Đồ Sơn: "Chồng ơi, phanh ở đâu?"

Video ngắn (~75 giây, 1920×1080) ví von việc phân vai trong làm phần mềm với chuyện cả nhà lái ô tô đi Đồ Sơn.

| File | Nội dung |
|---|---|
| `di-do-son.mp4` | Bản hoàn chỉnh: hình, giọng đọc, nhạc, hiệu ứng âm thanh, phụ đề |
| `src/vo/lines.txt` | Lời thoại: `nhân_vật|tên_hiển_thị|phụ_đề|câu_đọc_cho_máy (tuỳ chọn)` |

## Kịch bản

| Cảnh | Thời gian | Nội dung |
|---|---|---|
| 1. Phòng khách → sân | 0:00–0:28 | Ông: "Nhân dịp ông vừa lĩnh lương hưu, hè đi thu tới… cả nhà mình đi Đồ Sơn đê!" (lịch lật 31/8 → 1/9, bưu thiếp Đồ Sơn). Cả nhà reo "Yeee!". Cháu gái chạy lấy chìa khoá, đưa anh; cháu trai chạy ra mở cửa xe, đưa chìa khoá cho bố. |
| 2. Nổ máy, đổi ghế | 0:28–0:38 | Cận cảnh ổ khoá "BRỪM!". Bố mời cả nhà lên xe. Sơ đồ ghế nhìn từ trên: bố chuyển sang ghế phụ, mẹ vào ghế lái. |
| 3. Trên đường | 0:38–0:52 | "Ok! Lên đường thôi!", xe chạy "zin zin" qua biển "ĐỒ SƠN 15 km". Con trâu ra giữa đường. Mẹ: "Á á á! Con trâu! Chồng ơi… phanh ở đâu?!", chân lúng túng giữa Côn / Phanh / Ga. |
| 4. BÙM! → câu hỏi | 0:52–1:15 | Vụ nổ kiểu truyện tranh. Nền tối, vô-lăng `</>` ở giữa, các vai trò PM, BA, Dev, Test, QC, DevOps, UX/UI, Tech Lead, PO, Khách hàng quay quanh và ẩn hiện. "Nếu coding platform là một chiếc ô tô…" → 4 thẻ: Ai giữ chìa khoá? / Ai nổ máy? / Ai cầm lái? / Ai biết phanh? → "Bạn định lái chiếc xe này thế nào?" |

## Dựng lại

Cần: Node + Playwright (Chromium), ffmpeg, Python 3 với `numpy`, `scipy`, `edge-tts`.

1. Giọng đọc (chỉ khi sửa lời): `bash src/tts_all.sh`. Giọng mỗi nhân vật (edge-tts, chỉnh tốc độ/cao độ) khai báo trong hàm `voice()` của script.
2. Dựng: `bash src/build.sh <thư_mục_tạm>`. Script tính mốc thời gian (`timeline.py` → `timeline.js`), render hình (`main.html`, `s1.js`–`s4.js`), tạo nhạc + hiệu ứng (`sfx.py`), ghép giọng đọc rồi xuất `di-do-son.mp4`.
3. Xem nhanh vài khung hình: `bash src/sheet.sh 3 20 47 70` → `src/prev/sheet.png`.

Mọi chuyển động đều neo theo câu thoại, nên sửa lời hoặc đổi giọng thì hình tự khớp lại.
