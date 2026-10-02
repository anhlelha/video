const NS = 'http://www.w3.org/2000/svg';
let svg = document.getElementById('stage');
function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  (parent || svg).appendChild(e);
  return e;
}
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, p) => a + (b - a) * p;
const easeOut = p => 1 - Math.pow(1 - p, 3);
const easeIn = p => p * p * p;
const easeInOut = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
const easeBack = p => { const c = 1.9; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
function bounce(p) {
  const n = 7.5625, d = 2.75;
  if (p < 1 / d) return n * p * p;
  if (p < 2 / d) return n * (p -= 1.5 / d) * p + .75;
  if (p < 2.5 / d) return n * (p -= 2.25 / d) * p + .9375;
  return n * (p -= 2.625 / d) * p + .984375;
}
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const cam = (g, cx, cy, s) => g.setAttribute('transform', `translate(960 540) scale(${s}) translate(${-cx} ${-cy})`);
const show = (g, on) => g.setAttribute('display', on ? 'inline' : 'none');
const C = { cream: '#F5F1E8', silver: '#9AA5B1', silverD: '#5D6773', silverL: '#C3CCD5', orange: '#E8743B',
  green: '#2DA44E', charcoal: '#2B2D33', gold: '#F2C14E', navy: '#24345C', ink: '#23262E' };

// ---------- reusable drawings ----------
function makeEngine(parent) {
  const g = el('g', {}, parent);
  const exhaust = el('path', { d: 'M190 10 C 260 10, 280 -20, 285 -120', fill: 'none', stroke: '#6B7580', 'stroke-width': 26, 'stroke-linecap': 'round' }, g);
  el('rect', { x: 268, y: -150, width: 34, height: 30, rx: 6, fill: '#4E5761' }, g);
  const heads = [];
  [-165, -45, 75].forEach(x => {
    const h = el('g', {}, g);
    el('rect', { x, y: -150, width: 90, height: 82, rx: 12, fill: C.silverL, stroke: C.silverD, 'stroke-width': 6 }, h);
    for (let i = 0; i < 3; i++) el('line', { x1: x + 12, x2: x + 78, y1: -130 + i * 18, y2: -130 + i * 18, stroke: C.silverD, 'stroke-width': 4, 'stroke-linecap': 'round' }, h);
    heads.push(h);
  });
  el('rect', { x: -200, y: -80, width: 400, height: 185, rx: 20, fill: C.silver, stroke: C.silverD, 'stroke-width': 6 }, g);
  for (let i = 0; i < 4; i++) el('line', { x1: -170, x2: 170, y1: -45 + i * 34, y2: -45 + i * 34, stroke: '#8794A1', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
  el('rect', { x: -172, y: 100, width: 344, height: 52, rx: 14, fill: '#7B8794', stroke: C.silverD, 'stroke-width': 6 }, g);
  const pulley = el('g', { transform: 'translate(-232 30)' }, g);
  el('circle', { r: 50, fill: '#6B7580', stroke: C.silverD, 'stroke-width': 6 }, pulley);
  el('circle', { r: 16, fill: C.orange }, pulley);
  const pulleyLine = el('line', { x1: 0, y1: -42, x2: 0, y2: 42, stroke: '#4E5761', 'stroke-width': 6 }, pulley);
  el('circle', { cx: 0, cy: -168, r: 16, fill: C.orange, stroke: '#B85A2B', 'stroke-width': 4 }, g);
  return { g, heads, pulley, pulleyLine };
}
function makeWheel(parent, r, light) {
  const g = el('g', {}, parent);
  el('circle', { r, fill: light ? '#4A4E58' : C.charcoal }, g);
  el('circle', { r: r * .62, fill: light ? '#AEB7C0' : '#D6DCE2' }, g);
  const spokes = el('g', {}, g);
  for (let i = 0; i < 5; i++) {
    const a = i * Math.PI * 2 / 5;
    el('line', { x1: 0, y1: 0, x2: Math.cos(a) * r * .58, y2: Math.sin(a) * r * .58, stroke: light ? '#7E8892' : '#8E99A4', 'stroke-width': r * .1, 'stroke-linecap': 'round' }, spokes);
  }
  el('circle', { r: r * .18, fill: C.orange }, g);
  return { g, spokes };
}
function makeStar(parent, cx, cy, r, fill) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r;
    pts.push((cx + Math.cos(a) * rr).toFixed(1) + ',' + (cy + Math.sin(a) * rr).toFixed(1));
  }
  return el('polygon', { points: pts.join(' '), fill, 'stroke-linejoin': 'round' }, parent);
}
function makePerson(parent, o) {
  // front-facing bust: o = {skin, hair, hoodie}
  const g = el('g', {}, parent);
  el('path', { d: 'M-70 120 C -70 40, 70 40, 70 120 Z', fill: o.hoodie }, g);
  el('path', { d: 'M-22 52 L0 78 L22 52', fill: 'none', stroke: 'rgba(255,255,255,.5)', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  el('circle', { cx: 0, cy: 0, r: 46, fill: o.skin }, g);
  el('path', { d: 'M-46 -4 C -50 -50, 50 -60, 46 -4 C 30 -28, -20 -32, -46 -4 Z', fill: o.hair }, g);
  el('circle', { cx: -16, cy: 2, r: 5, fill: C.ink }, g);
  el('circle', { cx: 16, cy: 2, r: 5, fill: C.ink }, g);
  const mouth = el('ellipse', { cx: 0, cy: 24, rx: 9, ry: 12, fill: '#7A2E22' }, g);
  return { g, mouth };
}

