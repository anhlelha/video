# Music + sound effects bed, timed from timeline.js. Output: mono WAV (OUT env, default sfx.wav).
import json, os, re, wave
import numpy as np
from scipy.signal import lfilter
src = open(os.path.join(os.path.dirname(__file__) or '.', 'timeline.js'), encoding='utf-8').read()
LINES = json.loads(re.search(r"const LINES = (.*?);\n", src).group(1))
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

def crowd(d):   # cheering: band-passed noise with syllable bursts
    x = hp(lp(noise(d), 2600), 500); t = T(d)
    return x * (.6 + .4 * np.abs(np.sin(2 * np.pi * 3.1 * t))) * np.minimum(1, t / .08) * np.minimum(1, (d - t) / .8)
def horn(f=520, d=.5): t = T(d); return lp(np.sign(np.sin(2 * np.pi * f * t)) + np.sign(np.sin(2 * np.pi * f * 1.26 * t)), 2200) * .5 * np.minimum(1, t / .01) * np.minimum(1, (d - t) / .03)
def jingle(): s = 0; [s := s + np.pad(ting(2600 + 900 * rng.random()) * .5, (int(k * .045 * SR), 0))[:int(1.2 * SR)] for k in range(5)]; return s
def step(): t = T(.07); return lp(noise(.07), 900) * np.exp(-t * 60)
def engine(d, f0, f1, rough=.5):   # engine hum with a pitch ramp
    t = T(d); f = f0 + (f1 - f0) * np.minimum(1, t / max(.01, d * .4))
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sign(np.sin(ph)) * .4 + np.sin(ph * 2) * .3 + lp(noise(d), 300) * rough
    return lp(s, 700) * (1 + .3 * np.sin(2 * np.pi * 11 * t))
def crank(d): t = T(d); return lp(noise(d), 500) * (np.sin(2 * np.pi * 9 * t) > 0) * 1.5
def moo(): t = T(1.3); f = 120 - 30 * t; s = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)); return (lp(s, 500) * .6 + lp(s, 1100) * .4 * np.sin(np.pi * t / 1.3)) * np.sin(np.pi * t / 1.3) ** .5
def riser(d): t = T(d); f = 200 * 2 ** (t / d * 3); return np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / d) ** 2 * .6 + hp(noise(d), 2000) * (t / d) ** 3 * .5
def boom(): t = T(3); return lp(noise(3), 400) * np.exp(-t * 2.2) * 3 + np.sin(2 * np.pi * np.cumsum(60 * np.exp(-t * 2) + 30) / SR) * np.exp(-t * 2.5) * 1.5

# ---------- music for scenes 1-3: bright plucked groove ----------
prog = [(48, 52, 55), (43, 47, 50), (45, 48, 52), (41, 45, 48)]
b = .3; i = 0; stop = Ls(10) - .2
while b < stop:
    ch = prog[(i // 8) % 4]; n = i % 8
    if n in (0, 4): add(pluck(ch[0] - 12, 1.2), b, .09, mus)
    add(pluck(ch[[0, 1, 2, 1, 2, 1, 0, 2][n]] + 24, .5), b, .05, mus)
    if n in (2, 6): add(tick(), b, .05, mus)
    b += .25; i += 1
# ---------- Scene 1 ----------
add(whoosh(.5, 3000), Ls(1) + 3.0, .25); add(pop(800), Ls(1) + 3.1, .2)
add(pop(600), Ls(1) + 4.2, .3); add(ting(1568), Ls(1) + 4.3, .12)
add(crowd(3.2), Ls(2), .25)
for i in range(16): add(pop(900 + rng.random() * 900), Ls(2) + rng.random() * 2.5, .1)
add(horn(700, .6), Ls(2) + .2, .08)
def steps(a, b_, dt, g_):
    x = a
    while x < b_: add(step(), x, g_); x += dt
steps(Ls(3) - .1, Ls(3) + 1.6, .14, .35); steps(Ls(4) - 2.4, Ls(4) - .3, .14, .35)
steps(Ls(5) + .1, Ls(5) + 3.3, .15, .35); steps(Ls(5) + .2, Ls(5) + 4.4, .3, .3)
for at in (Ls(3) + 1.75, Ls(4) + 1.2, Ls(6) + 1.7): add(jingle(), at, .2)
add(thud(300, .15), Ls(5) + 3.4, .4); add(tick(), Ls(5) + 3.42, .4)
# ---------- Scene 2 ----------
add(jingle(), S(2) + .9, .15)
add(crank(.6), S(2) + 1.0, .35)
d = S(3) - S(2) - 1.6; e = engine(d, 55, 42, .6); e *= np.minimum(1, T(d) / .05) * np.minimum(1, (d - T(d)) / .3)
add(engine(.7, 40, 110, .4) * np.sin(np.pi * T(.7) / .7), S(2) + 1.6, .35)
add(e, S(2) + 1.6, .16)
add(whoosh(.4, 2500), Ls(8) - .6, .25)
add(whoosh(.5, 1800), Ls(8) + .6, .2); add(pop(700), Ls(8) + 1.5, .2); add(whoosh(.5, 1800), Ls(8) + 1.4, .2); add(pop(900), Ls(8) + 2.3, .2)
add(thud(250, .2), Ls(8) + 3.5, .45)
# ---------- Scene 3 ----------
dd = S(4) - S(3)
add(engine(dd, 45, 45, .5) * np.minimum(1, T(dd) / .2), S(3), .12)
ad = S(4) - (S(3) + 3.6)
add(engine(ad, 60, 120, .3) * np.minimum(1, T(ad) / .3), S(3) + 3.6, .2)
for k in range(4): add(whoosh(.45, 2200), S(3) + 4.4 + k * 1.05, .14)
add(moo(), Ls(10) + 1.0, .22)
add(horn(440, .25), Ls(10) + .1, .12); add(horn(440, .5), Ls(10) + .45, .12)
add(riser(Ls(11) - Ls(10) - 3.0), Ls(10) + .2, .08)
# ---------- Scene 4 ----------
add(boom(), S(4), .7); add(whoosh(1.2, 900), S(4), .4)
add(whoosh(1.5, 600), S(4) + 1.8, .25)
pd = DUR - S(4) - 2.2
add(pad((45, 52, 57, 64), pd), S(4) + 2.2, .12, mus)
b = S(4) + 3.0; i = 0
while b < DUR - 1.0:
    add(piano([69, 72, 76, 79, 76, 72][i % 6], 1.6), b, .022, mus); b += .5; i += 1
for k, a in enumerate([0, 1.25, 2.4, 4.2]): add(pop(600 + k * 120), Ls(12) + a, .28)
add(whoosh(.6, 2000), Ls(13) - .3, .3)
for i in range(6): add(ting([1047, 1319, 1568, 2093, 1568, 2637][i]), Ls(13) + .1 + i * .12, .07)
for m in (45, 52, 57, 61, 64): add(piano(m, 6, 2.5), Ls(13), .05, mus)

mix = out + mus
mix = np.tanh(mix * 1.3) * .8
f = np.ones(N); fn = int(1.5 * SR); f[-fn:] = np.linspace(1, 0, fn); mix *= f
pcm = (np.clip(mix, -1, 1) * 32767).astype(np.int16)
w = wave.open(os.environ.get('OUT', 'sfx.wav'), 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close()
print('ok', DUR)
