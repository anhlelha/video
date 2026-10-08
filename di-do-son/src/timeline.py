# Build timeline.js (line + scene timings) from voice-line durations.
import subprocess, json
GAP = [1.2, .3, 1.0, 2.6, .6, 2.8, 2.0, .6, 2.6, 3.4, 3.0, .7, .7]
SCENE_FIRST = [1, 7, 9, 11]  # first line of each scene (1-based)
TAIL = 4.5
rows = [l.rstrip('\n').split('|') for l in open('vo/lines.txt', encoding='utf-8')]
dur = [float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'vo/v{i}.mp3'])) for i in range(1, len(rows) + 1)]
t = 0; lines = []
for i, d in enumerate(dur):
    t += GAP[i]; lines.append({'s': round(t, 2), 'e': round(t + d - .2, 2), 'who': rows[i][1], 'text': rows[i][2]}); t += d
total = round(t + TAIL, 2)
scenes = [{'s': 0 if k == 0 else round(lines[f - 1]['s'] - GAP[f - 1], 2)} for k, f in enumerate(SCENE_FIRST)]
for k in range(len(scenes)): scenes[k]['e'] = scenes[k + 1]['s'] if k + 1 < len(scenes) else total
open('timeline.js', 'w', encoding='utf-8').write('const LINES = ' + json.dumps(lines, ensure_ascii=False) + ';\nconst SCENES = ' + json.dumps(scenes) + ';\nwindow.DURATION = ' + str(total) + ';\n')
print(total); [print(k + 1, s) for k, s in enumerate(scenes)]
