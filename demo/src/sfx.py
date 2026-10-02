import numpy as np, wave
SR = 44100; DUR = 61.0
N = int(SR * DUR)
out = np.zeros(N)
rng = np.random.default_rng(7)
def add(sig, at, gain=1.0):
    i = int(at * SR); j = min(N, i + len(sig))
    if i < N: out[i:j] += sig[:j - i] * gain
def env(n, a=0.005, r=None):
    t = np.arange(n) / SR
    e = np.minimum(1, t / a)
    if r: e *= np.exp(-t / r)
    return e
def tone(f, d, r=0.3, harm=(1,), a=0.003):
    n = int(d * SR); t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * (k + 1) * t) * h for k, h in enumerate(harm))
    return s * env(n, a, r)
def noise(d): return rng.standard_normal(int(d * SR))
def lowpass(x, k):  # simple one-pole
    y = np.zeros_like(x); a = k; acc = 0.0
    for i in range(len(x)): acc += a * (x[i] - acc); y[i] = acc
    return y
def thud(): 
    n = int(.6 * SR); t = np.arange(n) / SR
    f = 90 * np.exp(-t * 6) + 40
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7) + lowpass(noise(.6), .05) * np.exp(-t * 12) * 2
def pop(f=600): 
    n = int(.12 * SR); t = np.arange(n) / SR
    fr = f * (1 + 2 * np.exp(-t * 60))
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 40)
def ting(f=1760): return tone(f, 1.4, .35, (1, .5, .25, .1))
def click(): return lowpass(noise(.03), .5) * np.exp(-np.arange(int(.03 * SR)) / SR * 200)
def whoosh(d=.5):
    x = noise(d); n = len(x); t = np.arange(n) / n
    y = np.zeros(n); acc = 0.0
    for i in range(n):
        a = 0.02 + 0.25 * np.sin(np.pi * t[i]); acc += a * (x[i] - acc); y[i] = acc
    return y * np.sin(np.pi * t) * 3
def rumble(d, base=38, amp_rate=None):
    n = int(d * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * base * t) * .6 + np.sin(2 * np.pi * base * 2 * t) * .3 + np.sign(np.sin(2 * np.pi * base / 2 * t)) * .15
    s *= 0.7 + 0.3 * np.sin(2 * np.pi * 11 * t)
    s += lowpass(noise(d), .08) * 1.2
    return s
def chirp():
    n = int(.25 * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * 4200 * t) * (np.sin(2 * np.pi * 45 * t) > 0)
    return s * np.sin(np.pi * t / .25)

# --- scene 1 ---
add(whoosh(.8), .2, .25)
add(thud(), 1.0, .9)
add(rumble(10.5) * env(int(10.5 * SR), 1.0) * np.linspace(1, .6, int(10.5 * SR)), 2.5, .10)  # idle
add(pop(520), 9.55, .5)
for i in range(3): add(pop(700 + i * 120), 10.8 + i * .4, .35)
r = rumble(8.0, 46); n = len(r); e = np.minimum(1, np.arange(n) / SR / .3) * np.clip((8.0 - np.arange(n) / SR) / 1.2, 0, 1)
add(r * e, 13.0, .45)
add(pop(400), 17.5, .3)
for k in range(5): add(chirp(), 21.8 + k * .55, .12)
# --- scene 2 ---
add(whoosh(.5), 24.35, .35)
add(whoosh(1.0) , 27.4, .4)
for k in range(26): add(click(), 28.5 + k * .075 + (rng.random() * .03), .5)
add(ting(1568), 30.55, .35)
add(pop(800), 30.8, .3)
add(whoosh(.5), 32.75, .35)
for i, t0 in enumerate([33.6, 34.1, 34.6, 35.1]):
    add(whoosh(.45), t0, .15); add(thud()[:int(.25 * SR)], t0 + .5, .45); add(click(), t0 + .52, .6)
add(pop(560), 36.0, .35)
add(rumble(4.0, 30) * np.sin(np.pi * np.arange(int(4.0 * SR)) / (4.0 * SR)), 38.4, .18)
add(ting(2093), 38.6, .4)
add(whoosh(.5), 42.15, .35)
k = 0; t0 = 44.4
while t0 < 48.6:
    add(tone(1320 + 220 * (k % 3), .25, .08, (1, .3)), t0, .18); k += 1
    t0 += max(.07, .45 * (1 - (t0 - 44.4) / 4.2))
add(whoosh(.5), 48.75, .3)
for i in range(9): add(click(), 49.0 + i * .17, .5); add(pop(500 + i * 40), 49.7 + i * .14, .2)
for t0 in (51.9, 53.2, 54.6): add(pop(450), t0, .45)
for i in range(9): add(tone(880 + i * 60, .2, .06, (1, .2)), 54.6 + i * .12, .12)
add(whoosh(.5), 56.55, .3)
add(ting(1046), 56.9, .3); add(ting(1568), 57.3, .2)

# --- music: sparse piano-ish motif, brighter from scene 2 ---
def note(m, d=1.6, g=1):
    f = 440 * 2 ** ((m - 69) / 12)
    return tone(f, d, .55, (1, .4, .15, .05), .004) * g
motif1 = [57, 64, 60, 64]          # A3 E4 C4 E4, slow
bt = 2.5
while bt < 24.0:
    for i, m in enumerate(motif1): add(note(m), bt + i * .75, .06)
    bt += 3.0
bt = 25.0
motif2 = [60, 67, 64, 72, 67, 64]
while bt < 56.5:
    for i, m in enumerate(motif2): add(note(m, 1.0), bt + i * .375, .05 if bt < 33 else .065)
    add(note(36 + (0 if int(bt / 2.25) % 2 == 0 else 5), 2.2, .9), bt, .08)
    bt += 2.25
add(note(60, 3.5), 56.9, .07); add(note(64, 3.5), 56.9, .06); add(note(67, 3.5), 56.9, .06)

out = np.tanh(out * 1.2) * .8
fade = np.ones(N); fn = int(1.0 * SR); fade[-fn:] = np.linspace(1, 0, fn)
out *= fade
pcm = (out * 32767).astype(np.int16)
w = wave.open('sfx.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close()
print('ok', N / SR)
