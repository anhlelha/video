#!/usr/bin/env bash
# Rebuild the video. Usage: bash build.sh <work_dir>   (voice: bash tts_all.sh first, only when lines change)
set -euo pipefail
cd "$(dirname "$0")"
W=${1:-build}; mkdir -p "$W"
python3 timeline.py
[ -n "${SKIP_RENDER:-}" ] || VOUT=$W/video_noaudio.mp4 node render.js
OUT=$W/sfx.wav python3 sfx.py
J="eval(require('fs').readFileSync('timeline.js','utf8').replace(/const /g,'global.').replace('window.','global.'))"
DUR=$(node -e "$J;console.log(DURATION)")
OFF=($(node -e "$J;console.log(LINES.map(l=>Math.round(l.s*1000)).join(' '))"))
IN=""; FC=""; MIX=""; n=${#OFF[@]}
for i in $(seq 1 $n); do
  IN="$IN -i vo/v$i.mp3"
  FC="$FC[$((i+1)):a]adelay=${OFF[$((i-1))]}:all=1[v$i];"; MIX="$MIX[v$i]"
done
ffmpeg -nostdin -y -loglevel error -i $W/video_noaudio.mp4 -i $W/sfx.wav $IN -filter_complex "$FC${MIX}amix=inputs=$n:normalize=0,volume=1.6,aformat=sample_rates=44100:channel_layouts=mono,apad=whole_dur=$DUR[vo];[vo]asplit[vo1][vo2];[1]aformat=sample_rates=44100:channel_layouts=mono[bg];[bg][vo2]sidechaincompress=threshold=0.05:ratio=4:attack=20:release=300[duck];[vo1][duck]amix=inputs=2:normalize=0,loudnorm=I=-15:TP=-1.5:LRA=11,aresample=44100,pan=stereo|c0=c0|c1=c0,atrim=0:$DUR[aout]" \
  -map 0:v -map "[aout]" -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart $W/full_nocover.mp4
bash build_extra.sh $W
echo done
