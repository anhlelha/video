# Build timeline.js (line + scene timings) from voice-line durations.
import subprocess, json
GAP = [2.0, .8, 1.0, .8, 3.0, .4, 1.0, 3.0, 2.0, 3.0, .6, 1.2, 3.0, .8, 3.0, 1.2, .8, .6, 1.2, 1.2, 3.0, 1.2, .8, .8, 3.0, .4, 1.2]
SCENE_FIRST = [1, 5, 8, 10, 13, 15, 21, 25]  # first line of each scene (1-based)
TAIL = 5.0
subs = [l.rstrip('\n').split('|')[1] for l in open('vo/lines.txt', encoding='utf-8')]
dur = [float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'vo/v{i}.mp3'])) for i in range(1, 28)]
t = 0; lines = []
for i, d in enumerate(dur):
    t += GAP[i]; lines.append({'s': round(t, 2), 'e': round(t + d - .25, 2), 'text': subs[i]}); t += d
total = round(t + TAIL, 2)
scenes = []
for k, f in enumerate(SCENE_FIRST):
    s = 0 if k == 0 else round(lines[f - 1]['s'] - GAP[f - 1], 2)
    scenes.append({'s': s})
for k in range(len(scenes)): scenes[k]['e'] = scenes[k + 1]['s'] if k + 1 < len(scenes) else total
open('timeline.js', 'w', encoding='utf-8').write('const LINES = ' + json.dumps(lines, ensure_ascii=False) + ';\nconst SCENES = ' + json.dumps(scenes) + ';\nwindow.DURATION = ' + str(total) + ';\n')
print(total); [print(k + 1, s) for k, s in enumerate(scenes)]
