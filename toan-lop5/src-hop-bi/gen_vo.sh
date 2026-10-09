#!/usr/bin/env bash
# Generate voice-over (edge-tts) + timings.js from lines.txt
set -euo pipefail
cd "$(dirname "$0")"; mkdir -p vo
i=0; LS=(); LD=(); SUBS=(); SAY=(); t=1.0
while IFS='|' read -r say sub; do
  i=$((i+1))
  python3 tts.py --voice vi-VN-HoaiMyNeural --rate=-5% --text "$say" --write-media vo/v$i.mp3 >/dev/null
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 vo/v$i.mp3)
  case $i in 5|7|13|16) t=$(python3 -c "print(round($t+0.6,2))");; esac
  LS+=("$t"); LD+=("$d"); SUBS+=("\"$sub\""); SAY+=("\"$say\"")
  t=$(python3 -c "print(round($t+$d+0.75,2))")
done < lines.txt
dur=$(python3 -c "print(round($t+3.5,2))")
{ echo "const LS=[$(IFS=,; echo "${LS[*]}")];"; echo "const LD=[$(IFS=,; echo "${LD[*]}")];"
  echo "const SUBS=[$(IFS=,; echo "${SUBS[*]}")];";
  echo "const SAY=[$(IFS=,; echo "${SAY[*]}")];"; echo "window.DURATION=$dur;"; } > timings.js
cat timings.js
