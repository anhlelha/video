# Music + sound effects bed, timed from timeline.js. Output: mono WAV (OUT env, default sfx.wav).
import json, os, re, wave
import numpy as np
from scipy.signal import lfilter
src = open(os.path.join(os.path.dirname(__file__) or '.', 'timeline.js'), encoding='utf-8').read()
LINES = json.loads(re.search(r'const LINES = (.*?);\n', src).group(1))
SCENES = json.loads(re.search(r'const SCENES = (.*?);\n', src).group(1))
DUR = float(re.search(r'window.DURATION = ([\d.]+)', src).group(1))
Ls = lambda i: LINES[i - 1]['s']; Le = lambda i: LINES[i - 1]['e']; S = lambda k: SCENES[k - 1]['s']
SR = 44100; N = int(SR * DUR); out = np.zeros(N); mus = np.zeros(N)
rng = np.random.default_rng(11)
def add(sig, at, gain=1.0, buf=None):
    b = out if buf is None else buf
    i = int(at * SR); j = min(N, i + len(sig))
    if 0 <= i < N: b[i:j] += sig[:j - i] * gain
def T(d): return np.arange(int(d * SR)) / SR
def lp(x, fc): a = np.exp(-2 * np.pi * fc / SR); return lfilter([1 - a], [1, -a], x)
def hp(x, fc): return x - lp(x, fc)
def noise(d): return rng.standard_normal(int(d * SR))
def mtof(m): return 440 * 2 ** ((m - 69) / 12)
def piano(m, d=2.2, dec=.9):
    t = T(d); f = mtof(m)
    s = sum(np.sin(2 * np.pi * f * k * t) * h * np.exp(-t * k * .6 / dec) for k, h in zip((1, 2, 3, 4), (1, .35, .12, .05)))
    return s * np.minimum(1, t / .004) * np.exp(-t / dec * .8)
def pluck(m, d=1.6):
    t = T(d); f = mtof(m)
    return sum(np.sin(2 * np.pi * f * k * t) * h for k, h in zip((1, 2, 3), (1, .5, .25))) * np.exp(-t * 3.2) * np.minimum(1, t / .002)
def flute(m, d):
    t = T(d); f = mtof(m)
    s = np.sin(2 * np.pi * f * t + .004 * f / 5 * np.sin(2 * np.pi * 5 * t)) + .18 * np.sin(4 * np.pi * f * t)
    s += lp(noise(d), 3000) * .05
    return s * np.minimum(1, t / .12) * np.minimum(1, (d - t) / .25)
def pad(ms, d):
    t = T(d); s = 0
    for m in ms:
        for det in (-.15, .15): s = s + np.sin(2 * np.pi * mtof(m + det / 100 * 12) * t)
    s = lp(s, 900)
    return s * np.minimum(1, t / 2.5) * np.minimum(1, (d - t) / 2.5) / len(ms)
def calliope(m, d):
    t = T(d); f = mtof(m); ph = (f * t) % 1
    return lp((2 * ph - 1) * .6 + np.sin(2 * np.pi * f * t) * .4, 2500) * np.minimum(1, t / .01) * np.exp(-t * 2)
def tick(): t = T(.04); return hp(noise(.04), 2000) * np.exp(-t * 180)
def ting(f=1760): t = T(1.6); return sum(np.sin(2 * np.pi * f * k * t) * h for k, h in zip((1, 2.76, 5.4), (1, .3, .1))) * np.exp(-t * 2.6)
def pop(f=600): t = T(.14); return np.sin(2 * np.pi * np.cumsum(f * (1 + 2 * np.exp(-t * 60))) / SR) * np.exp(-t * 35)
def thud(f0=90, d=.5): t = T(d); return np.sin(2 * np.pi * np.cumsum(f0 * np.exp(-t * 5) + 35) / SR) * np.exp(-t * 8) + lp(noise(d), 300) * np.exp(-t * 14) * 1.5
def whoosh(d=.6, fc=1200):
    x = noise(d); t = np.linspace(0, 1, len(x)); y = lp(x, fc) * np.sin(np.pi * t) ** 2
    return y * 2.5
def chirp(f=4200, d=.22): t = T(d); return np.sin(2 * np.pi * f * t) * (np.sin(2 * np.pi * 42 * t) > 0) * np.sin(np.pi * t / d)
def bird(): t = T(.18); f = 2600 + 1400 * np.sin(np.pi * t / .18); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .18)
def clop(): t = T(.08); return lp(noise(.08), 1800) * np.exp(-t * 70) + np.sin(2 * np.pi * 300 * t) * np.exp(-t * 60) * .5
def buzz(): t = T(.35); return lp(np.sign(np.sin(2 * np.pi * 110 * t)), 1500) * np.minimum(1, t / .01) * np.minimum(1, (.35 - t) / .05)
def croak(): t = T(.3); return lp(np.sign(np.sin(2 * np.pi * 70 * t)) * (np.sin(2 * np.pi * 18 * t) > -.2), 900) * np.sin(np.pi * t / .3)
def beep(f, d=.12): t = T(d); return np.sign(np.sin(2 * np.pi * f * t)) * .5 * np.minimum(1, (d - t) / .02)
def clap(): t = T(.05); return hp(noise(.05), 900) * np.exp(-t * 90)

# ---------- Scene 1: living room ----------
k = 0.0
while k < S(2) - .3:
    add(tick(), k, .10 if not (Ls(2) <= k < Ls(2) + 2.2) else 0); k += 1.0
for i in range(26): add(tick(), Ls(2) + i * .085, .09)
for i in range(3): add(pop(1200), Ls(2) + .1 + i * .12, .12)
add(ting(1568), Ls(2) + 2.25, .22)
add(whoosh(1.4, 1600), Le(4) + .1, .25)
for bar, ch in enumerate([(57, 60, 64), (53, 57, 60), (48, 55, 64), (55, 59, 62)] * 2):
    t0 = 1.0 + bar * 2.6
    if t0 > S(2) - 1: break
    for j, m in enumerate(ch): add(piano(m), t0 + j * .43, .05, mus)
    add(piano(ch[0] - 12, 3), t0, .05, mus)
# ---------- Scene 2: hunter-gatherers ----------
d = S(3) - S(2)
w = lp(noise(d), 450); w *= (0.5 + .5 * np.sin(2 * np.pi * .21 * T(d)) ** 2) * np.minimum(1, T(d) / 1.5) * np.minimum(1, (d - T(d)) / 1.0)
add(w, S(2), .3)
add(thud(70, .6), S(2) + 1.9, .35)
for i in range(7): add(bird(), Ls(5) + .4 + rng.random() * 9, .05)
pent = [57, 60, 62, 64, 67, 69, 72]
for i in range(10):
    t0 = Ls(5) - 1 + i * 1.3
    if t0 > Ls(7) + 2.6: break
    add(pluck(pent[int(rng.random() * 7)]), t0, .06, mus)
add(buzz(), Ls(6) + .9, .12); add(ting(1318), Ls(6) + 3.0, .2); add(ting(1976), Ls(6) + 3.1, .12)
add(whoosh(.5), Ls(7) + 2.75, .3)
for i in range(9): add(chirp(), Ls(7) + 3.3 + i * .55, .05)
for i in range(3): add(pop(700 + i * 150), Ls(7) + 3.4 + i * .4, .18)
# ---------- Scene 3: horses ----------
add(whoosh(.8, 900), S(3) + .1, .3)
b = Ls(8) - 2.8
while b < Le(8):
    add(thud(65, .45), b, .30, mus); add(thud(65, .45), b + .25, .15, mus); b += .5
g0, g1 = Ls(8) - 1, Ls(8) + 6.5
c = g0
while c < g1:
    fade = 1 - max(0, (c - (Ls(8) + 4)) / 2.5)
    for o in (0, .09, .17): add(clop(), c + o, .22 * fade)
    c += .45 + .25 * (1 - fade)
add(whoosh(.7, 2500), Ls(8) + 3.15, .35)
add(thud(140, .3), Ls(8) + 4.1, .5)
t = T(.8); add(np.sin(2 * np.pi * 190 * t + 3 * np.sin(2 * np.pi * 14 * t)) * np.exp(-t * 5), Ls(8) + 4.1, .12)
add(whoosh(1.8, 600), Le(8) - .1, .3)
mel = [72, 76, 79, 76, 77, 74, 71, 74, 72, 76, 79, 84, 79, 76, 72]
b = Le(8) + 1.3; i = 0
while b < S(4) - .4:
    bass = [48, 43][int(i / 3) % 2]
    add(piano(bass, .5), b, .07, mus); add(calliope(64, .25), b + .26, .03, mus); add(calliope(67, .25), b + .52, .03, mus)
    add(calliope(mel[i % len(mel)], .5), b, .05, mus); b += .78; i += 1
for i in range(70): add(clap(), Ls(9) + 1.5 + rng.random() * 3.0, .12)
# ---------- Scene 4: rice ----------
fl = [(62, 1.2), (65, .8), (67, 1.6), (69, 1.0), (67, .8), (65, 1.6), (62, 2.0), (60, 1.0), (62, 2.4), (69, 1.2), (72, 1.0), (69, 1.4), (67, 2.4)]
b = S(4) + .4
for m, dd in fl:
    if b > Ls(12) - .5: break
    add(flute(m, dd), b, .045, mus); b += dd
for i in range(12): add(pluck([50, 57, 62, 57][i % 4], 1.4), S(4) + .4 + i * 1.1, .035, mus)
for i in range(5): add(croak(), S(4) + 1 + rng.random() * 14, .05)
r0, r1 = Ls(10) + 4, Le(11) + .5; rd = r1 - r0
add(hp(noise(rd), 1500) * np.minimum(1, T(rd) / 1.5) * np.minimum(1, (rd - T(rd)) / 1.0), r0, .05)
for k, a in enumerate([.1, 1.6, 3.2, 4.8]): add(pop(520 + k * 90), Ls(11) + a, .3)
add(whoosh(.5), Ls(12) - .4, .3)
for k in range(2): add(pop(900 - k * 120), Ls(12) + 2.0 + k * .5, .2)
add(whoosh(.5), Ls(12) + 4.75, .3)
for k in range(2): add(pop(800 - k * 100), Ls(12) + 5.3 + k * .4, .2)
for i, m in enumerate([62, 65, 64]): add(piano(m, 2.5), Ls(12) + 1.0 + i * 1.3, .04, mus)
# ---------- Scene 5: Socrates ----------
add(lp(noise(1.4), 150) * np.sin(np.pi * T(1.4) / 1.4), S(5) + .1, .5)
lyre = [62, 65, 69, 72, 74, 72, 69, 65]
b = S(5) + 1.2; i = 0
while b < S(6) - .6:
    add(pluck(lyre[i % 8] - (12 if i % 4 == 0 else 0), 1.8), b, .06, mus); b += .55; i += 1
add(pop(700), Ls(13) + 1.5, .2)
add(whoosh(1.2, 900), Ls(14) - .3, .3)
for k in range(5): add(whoosh(.35, 3000), Ls(14) + 1.2 + k * 1.05, .18); add(tick(), Ls(14) + 1.4 + k * 1.05, .2)
# ---------- Scene 6: shelf, horse vs math, gym ----------
for i in range(6): add(pop(420 + i * 70), S(6) + .3 + i * .4, .25)
for i in range(40): add(ting(2400 + rng.random() * 2400) * .5, Ls(15) + 2.0 + rng.random() * 2.2, .05)
b = S(6) + .5; i = 0
while b < Ls(16) - .3:
    add(piano([57, 64, 60, 64][i % 4], 2.0), b, .045, mus); b += .7; i += 1
add(piano(45, 4), Ls(16), .07)
b = Ls(17) - .2; i = 0
prog = [(53, 57, 60, 64), (48, 55, 60, 64), (55, 59, 62, 67), (57, 60, 64, 69)]
while b < S(7) - .5:
    ch = prog[(i // 4) % 4]; add(piano(ch[i % 4], 2.4), b, .04, mus); b += .75; i += 1
for o in (0, .25, .5): add(clop(), Ls(17) + .2 + o, .1)
add(whoosh(.7), Ls(17) + 2.55, .3)
t = T(1.6); add(lp(np.sign(np.sin(2 * np.pi * (45 + 20 * t) * t)), 400) * np.sin(np.pi * t / 1.6), Ls(17) + 2.8, .06)
for k in range(14): add(pluck(72 + [0, 2, 4, 7, 9][k % 5] + 12 * (k // 10), .6), Ls(18) + .5 + k * .33, .035)
add(whoosh(.5), Ls(19) - .75, .3)
for k in range(3): add(lp(noise(.3), 300) * np.exp(-T(.3) * 6), Ls(19) + .1 + k * 1.57, .08)
add(beep(660), Ls(20) + .05, .05); add(beep(990), Ls(20) + .2, .05); add(beep(880, .2), Ls(20) + .35, .05)
add(pop(900), Ls(20) + 2.8, .2)
# ---------- Scene 7: hands of every era, questions ----------
add(pad((45, 52, 57, 60), S(8) - S(7) - .2), S(7), .09, mus)
for i in range(5): add(ting([1047, 1175, 1319, 1568, 1760][i]), S(7) + .6 + i * .9, .07)
for k, m in enumerate([69, 72, 76, 74, 72, 69]): add(piano(m, 3), Ls(21) + 1 + k * 1.6, .03, mus)
for k, m in enumerate([64, 62, 60]): add(piano(m, 3.5), Ls(22 + k) - .1, .06, mus)
# ---------- Scene 8: back home (quiet) ----------
for k in range(8): add(thud(60, .25), S(8) + .4 + k * .34, .06)
for m, g_ in ((48, .07), (55, .05), (64, .05), (72, .03)): add(piano(m, 6, 2.5), Le(27) + .8, g_, mus)

mix = out + mus
mix = np.tanh(mix * 1.3) * .8
f = np.ones(N); fn = int(1.5 * SR); f[-fn:] = np.linspace(1, 0, fn); mix *= f
pcm = (np.clip(mix, -1, 1) * 32767).astype(np.int16)
w = wave.open(os.environ.get('OUT', 'sfx.wav'), 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close()
print('ok', DUR)
