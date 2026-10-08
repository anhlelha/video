// Shared helpers and reusable drawings (all SVG, 1920x1080 stage).
const NS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('stage');
const defs = document.getElementById('defs');
function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  (parent || svg).appendChild(e);
  return e;
}
function txt(parent, x, y, s, a) {
  const e = el('text', Object.assign({ x, y, 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 40, fill: '#2B2620' }, a || {}), parent);
  e.textContent = s; return e;
}
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, p) => a + (b - a) * p;
const easeOut = p => 1 - Math.pow(1 - p, 3);
const easeIn = p => p * p * p;
const easeInOut = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
const easeBack = p => { const c = 1.7; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const cam = (g, cx, cy, s) => g.setAttribute('transform', `translate(960 540) scale(${s}) translate(${-cx} ${-cy})`);
const show = (g, on) => g.setAttribute('display', on ? 'inline' : 'none');
const tr = (g, x, y, r = 0, s = 1) => g.setAttribute('transform', `translate(${x} ${y}) rotate(${r}) scale(${s})`);
const op = (g, o) => g.setAttribute('opacity', clamp(o));
// time relative to the start of voice line i (1-based)
const L = (t, i) => t - LINES[i - 1].s;
const LE = (t, i) => t - LINES[i - 1].e;
let _uid = 0; const uid = p => (p || 'u') + (++_uid);

function linGrad(stops, x2 = 0, y2 = 1) {
  const id = uid('g'); const g = el('linearGradient', { id, x1: 0, y1: 0, x2, y2 }, defs);
  stops.forEach(([o, c]) => el('stop', { offset: o, 'stop-color': c }, g));
  return `url(#${id})`;
}
function radGrad(stops) {
  const id = uid('r'); const g = el('radialGradient', { id }, defs);
  stops.forEach(([o, c, a]) => el('stop', { offset: o, 'stop-color': c, 'stop-opacity': a == null ? 1 : a }, g));
  return `url(#${id})`;
}
// circular "hand close-up" inset with clipped content
function makeInset(parent, cx, cy, r, bg, ring) {
  const g = el('g', {}, parent);
  const id = uid('c'); const cp = el('clipPath', { id }, defs); const clip = el('circle', { cx, cy, r }, cp);
  const shadow = el('circle', { cx, cy: cy + 14, r, fill: 'rgba(0,0,0,.18)' }, g);
  const inner = el('g', { 'clip-path': `url(#${id})` }, g);
  el('rect', { x: cx - r - 10, y: cy - r - 10, width: 2 * r + 20, height: 2 * r + 20, fill: bg }, inner);
  const content = el('g', {}, inner);
  const border = el('circle', { cx, cy, r, fill: 'none', stroke: ring || '#2B2620', 'stroke-width': 12 }, g);
  return { g, content, setR(rr) { clip.setAttribute('r', rr); border.setAttribute('r', rr); shadow.setAttribute('r', rr); } };
}
// open hand pointing right (wrist at 0,0)
function makeHand(parent, skin, sleeve) {
  const g = el('g', {}, parent);
  const dk = 'rgba(0,0,0,.18)';
  if (sleeve) el('rect', { x: -260, y: -48, width: 250, height: 96, rx: 20, fill: sleeve }, g);
  el('rect', { x: -30, y: -40, width: 50, height: 80, fill: skin }, g);
  const fingers = el('g', {}, g);
  [[-36, 68], [-12, 78], [12, 74], [34, 60]].forEach(([y, l]) => {
    el('rect', { x: 70, y: y - 11, width: l + 22, height: 24, rx: 12, fill: skin, stroke: dk, 'stroke-width': 3 }, fingers);
  });
  el('rect', { x: 0, y: -50, width: 104, height: 100, rx: 34, fill: skin }, g);
  const thumb = el('g', { transform: 'translate(40 -40) rotate(-38)' }, g);
  el('rect', { x: 0, y: -13, width: 74, height: 28, rx: 14, fill: skin, stroke: dk, 'stroke-width': 3 }, thumb);
  return { g, fingers, thumb };
}
// closed fist gripping something horizontally (center 0,0)
function makeFist(parent, skin, sleeve) {
  const g = el('g', {}, parent);
  const dk = 'rgba(0,0,0,.2)';
  if (sleeve) el('rect', { x: -300, y: -50, width: 250, height: 100, rx: 20, fill: sleeve }, g);
  el('rect', { x: -70, y: -60, width: 130, height: 120, rx: 40, fill: skin }, g);
  for (let i = 0; i < 4; i++) el('ellipse', { cx: 52, cy: -42 + i * 28, rx: 26, ry: 15, fill: skin, stroke: dk, 'stroke-width': 3 }, g);
  el('path', { d: 'M-40 -58 C 0 -86, 40 -70, 46 -40', fill: 'none', stroke: skin, 'stroke-width': 30, 'stroke-linecap': 'round' }, g);
  return g;
}
// standing figure, front view; origin at feet. o: {skin, hair, style, shirt, pants, shoe, glasses, beard, hat}
function makeFigure(parent, o) {
  const g = el('g', {}, parent);
  const body = el('g', {}, g);
  const leg = x => {
    const lg = el('g', { transform: `translate(${x} -132)` }, body);
    el('rect', { x: -15, y: 0, width: 30, height: 128, rx: 12, fill: o.pants || '#3C4A63' }, lg);
    el('ellipse', { cx: x < 0 ? -6 : 6, cy: 128, rx: 24, ry: 11, fill: o.shoe || '#2B2620' }, lg);
    return lg;
  };
  const legL = leg(-20), legR = leg(20);
  const arm = (x, side) => {
    const ag = el('g', { transform: `translate(${x} -248)` }, body);
    el('rect', { x: -13, y: -6, width: 26, height: 112, rx: 13, fill: o.sleeve || o.shirt }, ag);
    el('circle', { cx: 0, cy: 112, r: 15, fill: o.skin }, ag);
    return ag;
  };
  const armL = arm(-50, -1), armR = arm(50, 1);
  el('path', { d: 'M-50 -262 Q 0 -276 50 -262 L 46 -126 Q 0 -116 -46 -126 Z', fill: o.shirt }, body);
  if (o.toga) el('path', { d: 'M-50 -262 Q 10 -200 46 -126 L 30 -126 Q 0 -190 -50 -240 Z', fill: 'rgba(0,0,0,.08)' }, body);
  el('rect', { x: -11, y: -282, width: 22, height: 24, fill: o.skin }, body);
  const head = el('g', { transform: 'translate(0 -318)' }, body);
  if (o.style === 'long') el('path', { d: 'M-44 -6 C -56 40, -54 70, -34 78 L -18 78 C -30 50, -34 30, -30 10 Z M44 -6 C 56 40, 54 70, 34 78 L 18 78 C 30 50, 34 30, 30 10 Z', fill: o.hair }, head);
  el('circle', { r: 42, fill: o.skin }, head);
  el('circle', { cx: -42, cy: 4, r: 8, fill: o.skin }, head); el('circle', { cx: 42, cy: 4, r: 8, fill: o.skin }, head);
  if (o.style === 'bald') {
    el('path', { d: 'M-44 4 C -46 -16, -36 -22, -30 -18 L -32 12 Z M44 4 C 46 -16, 36 -22, 30 -18 L 32 12 Z', fill: o.hair }, head);
  } else if (o.style !== 'none') {
    el('path', { d: 'M-44 -2 C -50 -56, 50 -62, 44 -2 C 34 -24, 6 -30, -10 -22 C -24 -16, -36 -14, -44 -2 Z', fill: o.hair }, head);
  }
  if (o.style === 'bun') el('circle', { cx: 0, cy: -46, r: 18, fill: o.hair }, head);
  const brows = el('g', {}, head);
  const browL = el('line', { x1: -24, y1: -12, x2: -8, y2: -12, stroke: '#2B2620', 'stroke-width': 4, 'stroke-linecap': 'round' }, brows);
  const browR = el('line', { x1: 8, y1: -12, x2: 24, y2: -12, stroke: '#2B2620', 'stroke-width': 4, 'stroke-linecap': 'round' }, brows);
  const eyes = el('g', {}, head);
  el('circle', { cx: -15, cy: 2, r: 5, fill: '#2B2620' }, eyes); el('circle', { cx: 15, cy: 2, r: 5, fill: '#2B2620' }, eyes);
  if (o.glasses) {
    el('circle', { cx: -15, cy: 2, r: 13, fill: 'none', stroke: '#2B2620', 'stroke-width': 3 }, head);
    el('circle', { cx: 15, cy: 2, r: 13, fill: 'none', stroke: '#2B2620', 'stroke-width': 3 }, head);
    el('line', { x1: -2, y1: 2, x2: 2, y2: 2, stroke: '#2B2620', 'stroke-width': 3 }, head);
  }
  if (o.beard) el('path', { d: 'M-36 8 C -34 70, 34 70, 36 8 C 22 30, -22 30, -36 8 Z', fill: o.beard }, head);
  const mouth = el('path', { d: '', fill: 'none', stroke: '#7A2E22', 'stroke-width': 4, 'stroke-linecap': 'round' }, head);
  if (o.hat === 'non') el('path', { d: 'M-80 -14 L 0 -76 L 80 -14 Q 0 -4 -80 -14 Z', fill: '#E9D9A6', stroke: '#B59A55', 'stroke-width': 4 }, head);
  if (o.hat === 'helmet') el('path', { d: 'M-46 -6 C -46 -60, 46 -60, 46 -6 Z M -6 -58 L 0 -86 L 6 -58 Z', fill: '#B8862E', stroke: '#7A5A1E', 'stroke-width': 4 }, head);
  const fig = { g, body, head, armL, armR, legL, legR, mouth, brows, browL, browR, eyes };
  setMouth(fig, 'smile');
  return fig;
}
function setMouth(f, m) {
  const d = { smile: 'M-12 20 Q 0 30 12 20', flat: 'M-10 24 L 10 24', frown: 'M-12 28 Q 0 18 12 28', o: 'M-5 22 a5 6 0 1 0 10 0 a5 6 0 1 0 -10 0', sigh: 'M-8 26 Q 0 22 8 26' }[m];
  f.mouth.setAttribute('d', d);
}
function setBrows(f, worry) {  // worry 0..1 tilts inner ends up
  f.browL.setAttribute('transform', `rotate(${-14 * worry} -8 -12)`);
  f.browR.setAttribute('transform', `rotate(${14 * worry} 8 -12)`);
}
function pose(f, p) {
  const r = (g, base, deg) => g.setAttribute('transform', `${base} rotate(${deg || 0})`);
  r(f.armL, 'translate(-50 -248)', p.aL); r(f.armR, 'translate(50 -248)', p.aR);
  r(f.legL, 'translate(-20 -132)', p.lL); r(f.legR, 'translate(20 -132)', p.lR);
  f.head.setAttribute('transform', `translate(0 -318) rotate(${p.h || 0})`);
}
// speech / thought bubble
function makeBubble(parent, w, h, text, fs, tail) {
  const g = el('g', {}, parent);
  el('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: h / 2.4, fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 5 }, g);
  if (tail !== false) el('path', { d: `M${-w * .15} ${h / 2 - 3} L ${-w * .25} ${h / 2 + 36} L ${-w * .02} ${h / 2 - 3} Z`, fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
  if (tail !== false) el('rect', { x: -w * .15 - 2, y: h / 2 - 9, width: w * .13 + 4, height: 10, fill: '#FFFDF6' }, g);
  if (text) txt(g, 0, fs * .36, text, { 'font-size': fs });
  return g;
}
function qmark(parent, x, y, s, c) { return txt(parent, x, y, '?', { 'font-size': 90 * (s || 1), 'font-weight': 800, fill: c || '#E8743B' }); }
// side-view horse facing right; origin at hooves center
function makeHorse(parent, o) {
  const g = el('g', {}, parent);
  const coat = o.coat, dark = o.dark;
  const legs = [];
  const leg = (x, back) => {
    const lg = el('g', { transform: `translate(${x} -130)` }, g);
    el('rect', { x: -11, y: 0, width: 22, height: 120, rx: 10, fill: back ? dark : coat }, lg);
    el('rect', { x: -13, y: 112, width: 26, height: 16, rx: 4, fill: '#2B2620' }, lg);
    legs.push(lg); return lg;
  };
  leg(-70, 1); leg(70, 1);
  const tail = el('path', { d: 'M-118 -168 C -170 -150, -175 -90, -160 -60 C -150 -100, -140 -130, -110 -150 Z', fill: o.mane }, g);
  el('ellipse', { cx: 0, cy: -160, rx: 125, ry: 55, fill: coat }, g);
  el('path', { d: 'M78 -190 L 140 -290 L 185 -270 L 120 -150 Z', fill: coat }, g);
  el('path', { d: 'M135 -300 L 225 -250 Q 238 -232 220 -222 L 160 -238 Z', fill: coat }, g);
  el('ellipse', { cx: 150, cy: -282, rx: 38, ry: 28, fill: coat }, g);
  el('path', { d: 'M138 -306 L 132 -340 L 152 -310 Z', fill: dark }, g);
  el('circle', { cx: 168, cy: -282, r: 5, fill: '#2B2620' }, g);
  el('path', { d: 'M128 -310 C 100 -280, 90 -230, 76 -190 L 96 -186 C 110 -230, 120 -270, 140 -300 Z', fill: o.mane }, g);
  leg(-55, 0); leg(85, 0);
  if (o.plume) el('path', { d: 'M140 -310 C 130 -360, 160 -380, 150 -400 C 175 -380, 170 -340, 150 -306 Z', fill: o.plume }, g);
  if (o.saddle) el('path', { d: 'M-50 -205 Q 0 -230 50 -205 L 40 -150 L -40 -150 Z', fill: o.saddle }, g);
  return { g, legs, tail };
}
function gallop(h, t, speed, amp) {
  const ph = t * speed;
  const base = [[-70, 0], [70, 0], [-55, Math.PI], [85, Math.PI]];
  h.legs.forEach((lg, i) => lg.setAttribute('transform', `translate(${base[i][0]} -130) rotate(${Math.sin(ph + base[i][1] + i * .6) * amp})`));
  h.g.setAttribute('data-bob', Math.abs(Math.sin(ph)) * 8);
}
// soft drifting cloud
function makeCloud(parent, s, fill) {
  const g = el('g', {}, parent);
  [[0, 0, 60], [55, 10, 46], [-55, 12, 44], [25, -30, 44], [-25, -22, 40]].forEach(([x, y, r]) => el('circle', { cx: x * s, cy: y * s, r: r * s, fill }, g));
  return g;
}
// paper grain texture overlay generated once
function paperTexture(parent) {
  const c = document.createElement('canvas'); c.width = 480; c.height = 270;
  const x = c.getContext('2d'); const im = x.createImageData(480, 270);
  for (let i = 0; i < im.data.length; i += 4) { const v = 200 + Math.random() * 55; im.data[i] = v; im.data[i + 1] = v * .97; im.data[i + 2] = v * .9; im.data[i + 3] = 255; }
  x.putImageData(im, 0, 0);
  return el('image', { href: c.toDataURL(), x: 0, y: 0, width: 1920, height: 1080, preserveAspectRatio: 'none', opacity: .16, style: 'mix-blend-mode:multiply' }, parent);
}

// one medallion per era (0 hunt, 1 horse, 2 rice, 3 study, 4 today): close-up of a hand, r = 140
const ERA_BG = ['#7A5634', '#B5452F', '#6E9B4A', '#F3E3C3', '#24345C'];
const ERA_LABEL = ['Săn bắt', 'Cưỡi ngựa', 'Trồng lúa', 'Học bài', 'Hôm nay'];
function makeEraMedallion(parent, i, x, y, label) {
  const m = el('g', {}, parent);
  const ins = makeInset(m, x, y, 140, ERA_BG[i], '#F7EBD3');
  const c = el('g', { transform: `translate(${x} ${y})` }, ins.content);
  if (i === 0) { el('ellipse', { cx: -16, cy: -20, rx: 14, ry: 26, fill: '#4A3220' }, c); el('ellipse', { cx: 16, cy: -20, rx: 14, ry: 26, fill: '#4A3220' }, c); const h = makeHand(c, '#C58B5E', '#8C5A2B'); tr(h.g, -60, 90, -40, .5); }
  if (i === 1) { el('path', { d: 'M-160 80 C -60 20, 60 20, 160 -80', fill: 'none', stroke: '#6B4A2E', 'stroke-width': 26 }, c); const f = makeFist(c, '#E0A77A', '#8A3B2B'); tr(f, 0, 30, -32, .5); }
  if (i === 2) { const h = makeHand(c, '#C99467', '#6B5136'); tr(h.g, -10, 120, -84, .5); for (let k = 0; k < 10; k++) el('ellipse', { cx: (rnd(k) - .5) * 60, cy: 20 + (rnd(k + 3) - .5) * 26, rx: 8, ry: 5, fill: '#E9C46A', transform: `rotate(${rnd(k) * 180} ${(rnd(k) - .5) * 60} ${20})` }, c); }
  if (i === 3) { el('rect', { x: -110, y: -40, width: 220, height: 150, fill: '#FFFDF6' }, c); for (let k = 0; k < 4; k++) el('line', { x1: -80, y1: -10 + k * 26, x2: 60, y2: -10 + k * 26, stroke: '#9AA5B1', 'stroke-width': 4 }, c); el('line', { x1: 20, y1: 30, x2: -30, y2: -60, stroke: '#F2C14E', 'stroke-width': 12, 'stroke-linecap': 'round' }, c); el('circle', { cx: 40, cy: 50, r: 30, fill: '#F6D2B0' }, c); }
  if (i === 4) { el('rect', { x: -40, y: -80, width: 80, height: 140, rx: 12, fill: '#2B2620' }, c); el('rect', { x: -32, y: -70, width: 64, height: 116, rx: 6, fill: '#8FD3F4' }, c); el('circle', { cx: 0, cy: 70, r: 34, fill: '#F6D2B0' }, c); el('rect', { x: -30, y: 90, width: 60, height: 80, fill: '#E8743B' }, c); }
  if (label) txt(m, x, y + 190, ERA_LABEL[i], { 'font-size': 32, fill: '#F7EBD3', 'font-weight': 700 });
  return m;
}
