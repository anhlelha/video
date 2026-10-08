#!/usr/bin/env bash
# Contact sheet of preview frames. Usage: sheet.sh t1 t2 t3 t4 (2x2) -> prev/sheet.png
cd "$(dirname "$0")"
node preview.js "$@" >/dev/null 2>&1 || node preview.js "$@"
args=(); for t in "$@"; do args+=(-i prev/f_$t.png); done
n=$#; layout="0_0|w0_0|0_h0|w0_h0|0_h0+h0|w0_h0+h0"
ffmpeg -nostdin -y -loglevel error "${args[@]}" -filter_complex "$(for i in $(seq 0 $((n-1))); do printf "[$i]scale=640:360[s$i];"; done)$(for i in $(seq 0 $((n-1))); do printf "[s$i]"; done)xstack=inputs=$n:layout=$(echo $layout | cut -d'|' -f1-$n)" prev/sheet.png
