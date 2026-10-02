# Sound effects + music for scenes 3-7 (local time 0 = start of scene 3)
import os; OUTF = os.environ.get('OUT', 'sfx2.wav')
import math
exec(open('sfx_lib_part2.py').read())
def rnd(i):
    x = math.sin(i * 127.1 + 311.7) * 43758.5453
    return x - math.floor(x)
def kick():
    n = int(.3 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(55 + 90 * np.exp(-t * 30)) / SR) * np.exp(-t * 9)
def hat(): return np.diff(noise(.05), prepend=0) * np.exp(-np.arange(int(.05 * SR)) / SR * 90) * .5
def note(m, d=1.6, g=1, r=.55):
    f = 440 * 2 ** ((m - 69) / 12)
    return tone(f, d, r, (1, .4, .15, .05), .004) * g
def pad(m, d, g=1):
    n = int(d * SR); t = np.arange(n) / SR; f = 440 * 2 ** ((m - 69) / 12)
    e = np.minimum(1, t / 1.5) * np.minimum(1, (d - t) / 1.5)
    return (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 1.5 * t) + .3 * np.sin(2 * np.pi * f * 2.01 * t)) * e * (0.8 + .2 * np.sin(2 * np.pi * .3 * t)) * g
def band(d, k1, k2):
    x = noise(d); return lowpass(x, k2) - lowpass(x, k1)
def squeak(d=.35):
    n = int(d * SR); t = np.arange(n) / SR
    f = 900 + 250 * np.sin(np.pi * t / d)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) * (0.6 + .4 * np.sign(np.sin(2 * np.pi * 30 * t)))

# ---------- Scene 3 (0 – 16) ----------
add(pad(45, 16.0), 0.0, .10); add(pad(52, 16.0), 0.0, .06)
add(band(5.4, .01, .08) * np.sin(np.pi * np.arange(int(5.4 * SR)) / (5.4 * SR)), 0, .5)   # river
add(tone(220, .8, 2, (1,)) * np.linspace(.2, 1, int(.8 * SR)), 5.6, .12)  # servo
add(click(), 6.5, .9); add(pop(300), 6.5, .4)
add(tone(260, .7, 2, (1,)) * np.linspace(1, .2, int(.7 * SR)), 6.6, .12)
add(whoosh(.5), 7.15, .35)
for k in range(8): add(thud()[:int(.15 * SR)], 7.5 + k * .4, .25)
add(band(3.2, .05, .2), 7.4, .08)
add(pop(500), 7.98, .4); add(thud()[:int(.3 * SR)], 8.73, .5)
add(band(.45, .2, .6), 9.33, .5)
add(pop(800), 10.2, .4)
add(whoosh(.5), 10.35, .35)
for i in range(14):
    at = 11.0 + rnd(i) * 4.6
    add(click(), at, .7); add(tone(3200, .25, .08, (1,)), at + .02, .05)
for k in range(90): add(click(), 11.2 + rng.random() * 4.4, .25)   # applause
add(ting(1318), 12.0, .15)
# ---------- Scene 4 (16 – 46.8) ----------
add(whoosh(.5), 15.75, .35)
bt = 16.0; step = .5
while bt < 47.0:
    add(kick(), bt, .55); add(hat(), bt + step / 2, .25)
    if bt > 25: add(hat(), bt + step / 4, .15); add(hat(), bt + 3 * step / 4, .15)
    add(note(33 + (5 if int((bt - 16) / 2) % 2 else 0), step * .9, 1, .2), bt, .12)
    if bt > 34.4: step = max(.22, .5 - (bt - 34.4) * .024)
    bt += step
for i in range(8): add(pop(500 + i * 50), 19.7 + i * .15, .3)
add(whoosh(1.0), 22.3, .4); add(click(), 23.4, 1.0); add(pop(260), 23.4, .4)
for i in range(7): add(thud()[:int(.2 * SR)], 23.6 + i * .06, .18)
for at, f in zip([25.9, 27.3, 28.7, 30.1, 31.4, 32.9], [1568, 1760, 1976, 2093, 2349, 2637]): add(ting(f), at, .3); add(pop(700), at, .25)
for at in [34.85, 36.57, 38.4, 40.43]: add(ting(2093), at, .25)
tk = 41.4; gap = .25
while tk < 47.0: add(click(), tk, .8); tk += gap; gap = max(.04, gap * .93)
for at in (44.3, 46.3): add(thud(), at, .9); add(whoosh(.3), at - .25, .3)
# ---------- Scene 5 (47.2 – 74.6) ----------
proj = np.zeros(int(23.4 * SR))
for k in range(int(23.4 * 24)): i = int(k / 24 * SR); c = click(); proj[i:i + len(c)] += c[:len(proj) - i] if i < len(proj) else 0
add(proj, 47.2, .18)
add(band(23.4, .02, .1), 47.2, .05)
# ragtime: oom-pah in C / G7
bt = 47.6; k = 0
mel = [72, 76, 79, 76, 74, 77, 81, 77, 72, 76, 79, 84, 83, 79, 74, 71]
while bt < 57.6:
    root = 36 if (k // 8) % 2 == 0 else 43
    add(note(root, .3, 1, .12), bt, .14 if k % 2 == 0 else 0)
    if k % 2: add(note(root + 16, .25, 1, .1), bt, .06); add(note(root + 19, .25, 1, .1), bt, .05)
    add(note(mel[k % 16], .28, 1, .12), bt, .07)
    bt += .3; k += 1
for i in range(6):
    at = 51.2 + i * .95
    add(band(.5, .3, .8) * np.linspace(1, .2, int(.5 * SR)), at, .35)
add(band(4.8, .1, .5), 57.8, .18)  # rain
for kk in range(3):
    s0 = 58.3 + kk * 2.2
    add(squeak(.4), s0, .2); add(squeak(.4), s0 + .45, .16)
add(thud(), 63.3, .8); add(pop(200), 63.3, .3)
for k in range(14): add(tone(70, .12, .05, (1, .6, .3)), 64.2 + k * .1, .35)
for at in (67.3, 68.7, 70.05):
    kn = thud()[:int(.25 * SR)] + lowpass(noise(.25), .4) * np.exp(-np.arange(int(.25 * SR)) / SR * 40)
    add(kn, at, .8); add(kn, at + .18, .25); add(kn, at + .36, .1)
add(pad(38, 4.0), 70.6, .05)
# ---------- Scene 6 (74.6 – 114) ----------
add(whoosh(.5), 74.35, .35)
bt = 74.6
while bt < 113.6:
    add(kick(), bt, .4); add(hat(), bt + .25, .2)
    add(note([36, 36, 41, 43][int((bt - 74.6) / 2) % 4], .45, 1, .2), bt, .1)
    bt += .5
for k in range(10): add(pop(900 + rng.random() * 600), 75.0 + rng.random() * 7, .12)
for at in (82.2, 84.6): add(whoosh(1.1), at, .8); add(rumble(1.1, 60) * np.sin(np.pi * np.arange(int(1.1 * SR)) / (1.1 * SR)), at, .25)
for k in range(9): add(click(), 86.4 + k * .85, .6); add(tone(1200, .15, .05, (1,)), 86.4 + k * .85, .08)
add(rumble(3.0, 50) * np.sin(np.pi * np.arange(int(3 * SR)) / (3 * SR)), 93.4, .12)
for i in range(12): add(pop(500 + i * 30), 97.4 + i * .08, .25)
add(ting(2093), 98.6, .3)
add(ting(988), 99.6, .3); add(ting(1318), 99.7, .2)
n = int(1.2 * SR); tt = np.arange(n) / SR
add(np.sin(2 * np.pi * np.cumsum(700 * np.exp(-tt * 1.4)) / SR) * np.exp(-tt * 1.5), 101.0, .25)
add(thud(), 101.9, .8)
add(click(), 106.2, 1.0); add(pop(1200), 106.25, .3)
for k in range(6): add(whoosh(.6), 108.3 + k * .55, .18)
add(ting(1568), 112.0, .35); add(ting(2093), 112.08, .2)
# ---------- Scene 7 (114 – 144.8) ----------
add(band(5.4, .02, .06), 114.0, .12)  # computer fan
for at, m in [(119.4, 60), (121.1, 64), (125.1, 67), (131.9, 72)]: add(note(m, 3.0, 1, .9), at, .12)
for i, m in enumerate((72, 76, 79, 84, 88)): add(note(m, 1.2, 1, .5), 127.3 + i * .22, .05)   # galaxy appears
add(rumble(1.8, 70) * np.linspace(1, 0, int(1.8 * SR)), 129.5, .25); add(whoosh(1.6), 129.6, .5)   # lift-off
for i, m in enumerate((79, 84, 88, 91)): add(note(m, 1.0, 1, .4), 130.6 + i * .18, .05)
add(pop(260), 135.0, .7)
for m in (48, 55, 60, 64): add(note(m, 4.5, 1, 1.6), 137.4, .09)
add(ting(1046), 141.6, .25); add(ting(1568), 142.0, .2)

out = np.tanh(out * 1.2) * .8
fade = np.ones(N); fn = int(1.0 * SR); fade[-fn:] = np.linspace(1, 0, fn)
out *= fade
pcm = (out * 32767).astype(np.int16)
w = wave.open(OUTF, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close()
print('ok', N / SR)
