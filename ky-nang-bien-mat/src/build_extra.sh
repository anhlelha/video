#!/usr/bin/env bash
# Covers, 9:16 TikTok version, and final files with a 1.5 s cover at the start.
# Usage: bash build_extra.sh <work_dir>   (expects <work_dir>/full_nocover.mp4 from build.sh)
set -euo pipefail
cd "$(dirname "$0")"
W=${1:-build}
node thumb.js
VOUT=$W/v_noaudio.mp4 node render_v.js
ffmpeg -nostdin -y -loglevel error -i $W/v_noaudio.mp4 -i $W/full_nocover.mp4 -map 0:v -map 1:a -c:v copy -c:a copy -shortest $W/tiktok_nocover.mp4
bash add_cover.sh ../thumbnail-16x9.png $W/full_nocover.mp4 ../ky-nang-nao-roi-cung-ra-di.mp4 19
bash add_cover.sh ../thumbnail-16x9.png $W/full_nocover.mp4 ../ky-nang-nao-roi-cung-ra-di-nhe.mp4 26
bash add_cover.sh ../thumbnail-9x16.png $W/tiktok_nocover.mp4 ../ky-nang-nao-roi-cung-ra-di-tiktok-9x16.mp4 21
echo extra done
