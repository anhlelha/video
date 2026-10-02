#!/usr/bin/env bash
# Rebuild the full video. Usage: bash build.sh <work_dir>
set -euo pipefail
cd "$(dirname "$0")"
W=${1:-build}; mkdir -p "$W"
# ---- part 1: scenes 1-2 ----
PAGE=scene.html VOUT=$W/p1_noaudio.mp4 node render.js
python3 sfx.py && mv sfx.wav $W/sfx1.wav
ffmpeg -nostdin -y -loglevel error -i $W/p1_noaudio.mp4 -i $W/sfx1.wav -i vo/l1.mp3 -i vo/l2.mp3 -i vo/l3.mp3 -i vo/l4.mp3 -i vo/l5.mp3 -i vo/l6.mp3 -filter_complex "\
[2]adelay=2000:all=1[a1];[3]adelay=15000:all=1[a2];[4]adelay=25400:all=1[a3];[5]adelay=33300:all=1[a4];[6]adelay=42600:all=1[a5];[7]adelay=49000:all=1[a6];\
[a1][a2][a3][a4][a5][a6]amix=inputs=6:normalize=0,volume=1.6,aformat=sample_rates=44100:channel_layouts=mono,apad=whole_dur=61[vo];\
[vo]asplit[vo1][vo2];[1]aformat=sample_rates=44100:channel_layouts=mono[bg];[bg][vo2]sidechaincompress=threshold=0.05:ratio=4:attack=20:release=300[duck];\
[vo1][duck]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100,pan=stereo|c0=c0|c1=c0,atrim=0:61[aout]" \
  -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k ../demo-canh-1-2.mp4
# ---- part 2: scenes 3-7 ----
PAGE=part2.html VOUT=$W/p2_noaudio.mp4 node render.js
OUT=$W/sfx2.wav python3 sfx2.py
OFF=(0.8 5.6 10.6 16.4 22.0 25.2 34.6 41.6 48.0 50.6 57.8 64.2 75.0 81.6 86.6 93.4 104.6 116.6 121.0 125.0 131.8 137.2)
DUR=144.8
IN=""; FC=""; MIX=""
for i in $(seq 1 22); do
  IN="$IN -i vo2/v$i.mp3"; ms=$(python3 -c "print(int(${OFF[$((i-1))]}*1000))")
  FC="$FC[$((i+1)):a]adelay=$ms:all=1[v$i];"; MIX="$MIX[v$i]"
done
ffmpeg -nostdin -y -loglevel error -i $W/p2_noaudio.mp4 -i $W/sfx2.wav $IN -filter_complex "$FC${MIX}amix=inputs=22:normalize=0,volume=1.6,aformat=sample_rates=44100:channel_layouts=mono,apad=whole_dur=$DUR[vo];[vo]asplit[vo1][vo2];[1]aformat=sample_rates=44100:channel_layouts=mono[bg];[bg][vo2]sidechaincompress=threshold=0.05:ratio=4:attack=20:release=300[duck];[vo1][duck]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100,pan=stereo|c0=c0|c1=c0,atrim=0:$DUR[aout]" \
  -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k $W/part2.mp4
# ---- join (part 1 cut at 56.5 s, before its end card) ----
ffmpeg -nostdin -y -loglevel error -i ../demo-canh-1-2.mp4 -i $W/part2.mp4 -filter_complex "[0:v]trim=0:56.5,setpts=PTS-STARTPTS[v0];[0:a]atrim=0:56.5,asetpts=PTS-STARTPTS,afade=t=out:st=56.3:d=0.2[a0];[1:v]setpts=PTS-STARTPTS[v1];[1:a]asetpts=PTS-STARTPTS[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" -c:v libx264 -crf 19 -preset medium -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart ../chiec-xe-lap-rap-full.mp4
ffmpeg -nostdin -y -loglevel error -i ../chiec-xe-lap-rap-full.mp4 -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -c:a copy -movflags +faststart ../chiec-xe-lap-rap-full-nhe.mp4
echo done
