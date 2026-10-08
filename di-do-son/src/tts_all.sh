#!/usr/bin/env bash
# Generate vo/vN.mp3 from vo/lines.txt (speaker|label|subtitle|spoken text, optional).
set -euo pipefail
cd "$(dirname "$0")"
voice() { case $1 in
  ong)  echo "vi-VN-NamMinhNeural -10% -22Hz";;
  bo)   echo "vi-VN-NamMinhNeural +6% +0Hz";;
  me)   echo "vi-VN-HoaiMyNeural +8% +0Hz";;
  me_hot) echo "vi-VN-HoaiMyNeural +22% +60Hz";;   # panicked scream
  gai)  echo "vi-VN-HoaiMyNeural +12% +55Hz";;
  trai) echo "vi-VN-HoaiMyNeural +8% +25Hz";;
  nar)  echo "vi-VN-NamMinhNeural -6% -4Hz";;
esac; }
say() { read V R P < <(voice $1); python3 tts.py --voice $V --rate=$R --pitch=$P --text "$2" --write-media "$3"; }
i=0
while IFS='|' read -r spk label sub spoken; do
  i=$((i+1)); txt=${spoken:-$sub}
  if [ "$spk" = all ]; then   # whole family cheering: layer several voices, slightly offset
    for s in ong bo me gai trai; do say $s "$txt" vo/tmp_$s.mp3; done
    ffmpeg -nostdin -y -loglevel error -i vo/tmp_ong.mp3 -i vo/tmp_bo.mp3 -i vo/tmp_me.mp3 -i vo/tmp_gai.mp3 -i vo/tmp_trai.mp3 -filter_complex \
      "[1]adelay=60:all=1[b];[2]adelay=20:all=1[c];[3]adelay=110:all=1[d];[4]adelay=40:all=1[e];[0][b][c][d][e]amix=inputs=5:normalize=0,volume=0.55" vo/v$i.mp3
    rm vo/tmp_*.mp3
  elif [ "$spk" = me_hot ]; then   # shaky, louder, a touch higher on top of the TTS pitch
    say $spk "$txt" vo/tmp.mp3
    ffmpeg -nostdin -y -loglevel error -i vo/tmp.mp3 -af "asetrate=24000*1.06,aresample=24000,atempo=1/1.06,vibrato=f=7:d=0.25,volume=1.5,alimiter=limit=0.95" vo/v$i.mp3
    rm vo/tmp.mp3
  else say $spk "$txt" vo/v$i.mp3; fi
done < vo/lines.txt
