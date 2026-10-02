import numpy as np, wave
SR = 44100; DUR = 142.0
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

