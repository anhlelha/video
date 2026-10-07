#!/usr/bin/env bash
# Rebuild: bash gen_vo.sh && bash build.sh  (needs edge-tts, Playwright, ffmpeg)
set -euo pipefail
cd "$(dirname "$0")"; mkdir -p build
PAGE=scene.html VOUT=build/v.mp4 node render.js
DUR=$(node -e "eval(require('fs').readFileSync('timings.js','utf8').replace(/const /g,'global.').replace('window.','global.'));console.log(DURATION)")
OFF=($(node -e "eval(require('fs').readFileSync('timings.js','utf8').replace(/const /g,'global.').replace('window.','global.'));console.log(LS.join(' '))"))
IN=""; FC=""; MIX=""
for i in $(seq 1 ${#OFF[@]}); do
  IN="$IN -i vo/v$i.mp3"; ms=$(python3 -c "print(int(${OFF[$((i-1))]}*1000))")
  FC="$FC[$i:a]adelay=$ms:all=1[v$i];"; MIX="$MIX[v$i]"
done
ffmpeg -nostdin -y -loglevel error -i build/v.mp4 $IN -filter_complex "$FC${MIX}amix=inputs=${#OFF[@]}:normalize=0,apad=whole_dur=$DUR,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100,pan=stereo|c0=c0|c1=c0,atrim=0:$DUR[a]" \
  -map 0:v -map "[a]" -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart ../luc-giac-hinh-thu-10.mp4
echo done
