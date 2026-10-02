#!/usr/bin/env bash
# Prepend a still cover (1.5 s, silent) to a video. Usage: add_cover.sh cover.png in.mp4 out.mp4 [crf]
set -euo pipefail
COVER=$1; IN=$2; OUT=$3; CRF=${4:-21}
IFS=x read W H < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$IN")
ffmpeg -nostdin -y -loglevel error -loop 1 -framerate 30 -t 1.5 -i "$COVER" -f lavfi -t 1.5 -i anullsrc=r=44100:cl=stereo -i "$IN" -filter_complex \
"[0:v]scale=$W:$H,setsar=1,format=yuv420p[c];[2:v]setsar=1,format=yuv420p[m];[1:a]aformat=sample_rates=44100:channel_layouts=stereo[ca];[2:a]aformat=sample_rates=44100:channel_layouts=stereo[ma];[c][ca][m][ma]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" -c:v libx264 -crf "$CRF" -preset slow -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -movflags +faststart "$OUT"
