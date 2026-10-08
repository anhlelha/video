// Extra drawings for "Đi Đồ Sơn": family, car, buffalo, key, burst.
const FAM = {
  ong:  { skin: '#EBC09A', hair: '#E4E4E4', style: 'bald', beard: '#F2F2F2', glasses: 1, shirt: '#B98A4E', pants: '#5A4A3A', s: 1 },
  bo:   { skin: '#F1C7A3', hair: '#2B2620', shirt: '#3E7CB1', pants: '#2F3640', s: 1.04 },
  me:   { skin: '#F6D2B0', hair: '#3A2418', style: 'long', shirt: '#D9466A', pants: '#4A3B5C', s: .97 },
  gai:  { skin: '#F6D2B0', hair: '#3A2418', style: 'bun', shirt: '#F49AC1', pants: '#F49AC1', shoe: '#C8373B', s: .6 },
  trai: { skin: '#F1C7A3', hair: '#2B2620', shirt: '#4CAF6A', pants: '#2F5A8C', s: .68 },
};
function makeFam(parent, k) { const f = makeFigure(parent, FAM[k]); f.s = FAM[k].s; return f; }
const place = (f, x, y, flip = 1, extraS = 1) => f.g.setAttribute('transform', `translate(${x} ${y}) scale(${f.s * extraS * flip} ${f.s * extraS})`);
// walking / running cycle; ph = phase (radians), amp = swing in degrees
function walk(f, ph, amp, armUp) {
  const s = Math.sin(ph) * amp;
  pose(f, { lL: s, lR: -s, aL: -s * .8, aR: armUp != null ? armUp : s * .8, h: Math.sin(ph * 2) * 2 });
  f.body.setAttribute('transform', `translate(0 ${-Math.abs(Math.cos(ph)) * amp * .5})`);
}
function still(f, p) { pose(f, p || {}); f.body.setAttribute('transform', ''); }
// talking mouth while voice line i plays
function talk(f, t, i, rest) {
  if (!LINES[i - 1]) { setMouth(f, rest || 'smile'); return; }
  const a = L(t, i), b = LE(t, i);
  if (a > 0 && b < 0) setMouth(f, Math.sin(t * 22) > -.1 ? 'o' : 'smile');
  else setMouth(f, rest || 'smile');
}
// car key (ring at 0,0)
function makeKey(parent, s) {
  const g = el('g', {}, parent);
  const k = el('g', { transform: `scale(${s || 1})` }, g);
  el('circle', { cx: 0, cy: 0, r: 18, fill: 'none', stroke: '#B0B6BE', 'stroke-width': 6 }, k);
  el('rect', { x: 8, y: -22, width: 44, height: 34, rx: 10, fill: '#2B2620' }, k);
  el('circle', { cx: 30, cy: -5, r: 7, fill: '#D94F3D' }, k);
  el('rect', { x: 50, y: -11, width: 46, height: 12, rx: 3, fill: '#D7DCE1', stroke: '#8D959E', 'stroke-width': 2 }, k);
  el('path', { d: 'M70 1 L 70 9 L 78 9 L 78 5 L 86 5 L 86 1 Z', fill: '#D7DCE1', stroke: '#8D959E', 'stroke-width': 2 }, k);
  return g;
}
// side-view family car facing right, origin at ground center. Returns parts.
function makeCar(parent, color) {
  const g = el('g', {}, parent);
  const body = el('g', {}, g);
  el('ellipse', { cx: 0, cy: 4, rx: 330, ry: 16, fill: 'rgba(0,0,0,.18)' }, g);
  // cabin + glass
  el('path', { d: 'M-250 -150 L -205 -262 Q -195 -278 -175 -278 L 70 -278 Q 92 -278 108 -262 L 200 -150 Z', fill: color, stroke: '#2B2620', 'stroke-width': 6, 'stroke-linejoin': 'round' }, body);
  const winR = 'M-228 -158 L -192 -250 Q -186 -262 -172 -262 L -40 -262 L -40 -158 Z';
  const winF = 'M-24 -158 L -24 -262 L 64 -262 Q 82 -262 96 -248 L 176 -158 Z';
  [winR, winF].forEach(d => el('path', { d, fill: '#BFE3F2' }, body));
  const cid = uid('cw'); const cp = el('clipPath', { id: cid }, defs);
  el('path', { d: winR }, cp); el('path', { d: winF }, cp);
  const seats = el('g', { 'clip-path': `url(#${cid})` }, body);   // people inside, clipped to windows
  const glare = el('g', { opacity: .35 }, body);
  el('path', { d: 'M-150 -262 L -120 -262 L -175 -158 L -205 -158 Z M 30 -262 L 52 -262 L 0 -158 L -22 -158 Z', fill: '#fff' }, glare);
  el('path', { d: winR, fill: 'none', stroke: '#2B2620', 'stroke-width': 5 }, body);
  el('path', { d: winF, fill: 'none', stroke: '#2B2620', 'stroke-width': 5 }, body);
  // lower body
  el('path', { d: 'M-312 -60 L -312 -130 Q -312 -158 -282 -160 L 210 -160 Q 290 -150 312 -110 L 316 -60 Q 316 -44 300 -44 L -296 -44 Q -312 -44 -312 -60 Z', fill: color, stroke: '#2B2620', 'stroke-width': 6, 'stroke-linejoin': 'round' }, body);
  el('rect', { x: -312, y: -84, width: 628, height: 14, fill: 'rgba(0,0,0,.12)' }, body);
  // door interior (visible when the front door opens)
  const inside = el('path', { d: 'M-24 -160 L 176 -160 L 176 -50 L -24 -50 Z', fill: '#3B3530', opacity: 0 }, body);
  const door = el('g', {}, body);
  el('path', { d: 'M-24 -160 L 176 -160 L 176 -50 L -24 -50 Z', fill: color, stroke: '#2B2620', 'stroke-width': 4 }, door);
  el('rect', { x: 120, y: -132, width: 34, height: 9, rx: 4, fill: '#2B2620' }, door);
  el('path', { d: 'M-24 -158 L -24 -262 L 64 -262 Q 82 -262 96 -248 L 176 -158 Z', fill: 'none', stroke: '#2B2620', 'stroke-width': 5 }, door);
  el('line', { x1: -40, y1: -160, x2: -40, y2: -50, stroke: '#2B2620', 'stroke-width': 4 }, body);
  el('rect', { x: -110, y: -132, width: 34, height: 9, rx: 4, fill: '#2B2620' }, body);
  // lights, bumpers, mirror
  el('path', { d: 'M286 -128 Q 306 -122 312 -104 L 284 -104 Z', fill: '#FBE6B0', stroke: '#2B2620', 'stroke-width': 4 }, body);
  el('rect', { x: -316, y: -132, width: 16, height: 30, rx: 4, fill: '#C8373B', stroke: '#2B2620', 'stroke-width': 3 }, body);
  el('rect', { x: 262, y: -62, width: 64, height: 18, rx: 8, fill: '#5C5F66' }, body);
  el('rect', { x: -326, y: -62, width: 60, height: 18, rx: 8, fill: '#5C5F66' }, body);
  el('path', { d: 'M150 -176 L 186 -186 L 190 -166 L 160 -160 Z', fill: color, stroke: '#2B2620', 'stroke-width': 4 }, body);
  el('rect', { x: -60, y: -36, width: 140, height: 0, fill: 'none' }, body);
  const plate = el('g', { transform: 'translate(300 -88)' }, body);
  // wheels
  const wheels = [-190, 196].map(x => {
    const w = el('g', { transform: `translate(${x} -46)` }, g);
    el('circle', { r: 56, fill: '#2B2620' }, w);
    el('circle', { r: 30, fill: '#C9CED4' }, w);
    const sp = el('g', {}, w);
    for (let i = 0; i < 5; i++) el('rect', { x: -4, y: -28, width: 8, height: 26, rx: 3, fill: '#8D959E', transform: `rotate(${i * 72})` }, sp);
    el('circle', { r: 8, fill: '#5C5F66' }, w);
    return { w, sp, x };
  });
  const exhaust = el('g', { transform: 'translate(-320 -54)' }, g);
  return { g, body, seats, door, inside, wheels, exhaust, setDoor(p) {
    door.setAttribute('transform', `translate(176 0) scale(${1 - .78 * p} 1) translate(-176 0)`);
    op(inside, p * 3);
  }, spin(a) { wheels.forEach(w => w.sp.setAttribute('transform', `rotate(${a})`)); } };
}
// person sitting in the car: a figure placed so only head + shoulders show through the window
function seat(car, k, x, headY, sc) {
  const f = makeFam(car.seats, k); f.sc = (sc || .62) * f.s;
  f.at = (xx, yy) => f.g.setAttribute('transform', `translate(${xx} ${yy + 318 * f.sc}) scale(${f.sc})`);
  f.at(x, headY); still(f, { aL: 10, aR: -10 });
  return f;
}
// side-view water buffalo facing left; origin at hooves center
function makeBuffalo(parent) {
  const g = el('g', {}, parent);
  const c = '#4B4F55', d = '#363A40';
  const legs = [];
  const leg = (x, fill) => { const lg = el('g', { transform: `translate(${x} -120)` }, g); el('rect', { x: -14, y: 0, width: 28, height: 116, rx: 10, fill }, lg); el('rect', { x: -15, y: 108, width: 30, height: 14, rx: 4, fill: '#222' }, lg); legs.push(lg); };
  leg(-80, d); leg(90, d);
  const tail = el('path', { d: 'M150 -190 C 190 -170, 196 -110, 186 -80', fill: 'none', stroke: c, 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
  el('ellipse', { cx: 20, cy: -170, rx: 150, ry: 72, fill: c }, g);
  leg(-60, c); leg(110, c);
  const head = el('g', { transform: 'translate(-140 -200)' }, g);
  el('path', { d: 'M-30 -60 C -130 -110, -150 -10, -100 10 C -130 -40, -90 -70, -30 -40 Z', fill: '#D8CFC0', stroke: '#8C8272', 'stroke-width': 4 }, head);
  el('path', { d: 'M10 -60 C 90 -120, 130 -20, 90 10 C 100 -40, 70 -70, 16 -40 Z', fill: '#CFC6B6', stroke: '#8C8272', 'stroke-width': 4 }, head);
  el('ellipse', { cx: -20, cy: 10, rx: 60, ry: 52, fill: c }, head);
  el('ellipse', { cx: -60, cy: 44, rx: 36, ry: 26, fill: '#6E727A' }, head);
  el('circle', { cx: -72, cy: 44, r: 5, fill: '#222' }, head); el('circle', { cx: -52, cy: 46, r: 5, fill: '#222' }, head);
  el('ellipse', { cx: 34, cy: -10, rx: 22, ry: 10, fill: d, transform: 'rotate(-20 34 -10)' }, head);
  const eye = el('g', {}, head);
  el('circle', { cx: -34, cy: -4, r: 11, fill: '#fff' }, eye); el('circle', { cx: -37, cy: -3, r: 6, fill: '#222' }, eye);
  return { g, legs, head, tail };
}
function burst(parent, n, r1, r2, fill, stroke) {
  let d = '';
  for (let i = 0; i < n * 2; i++) { const a = i * Math.PI / n, r = i % 2 ? r1 * (.8 + rnd(i) * .3) : r2 * (.85 + rnd(i + 9) * .3); d += (i ? 'L' : 'M') + (Math.cos(a) * r).toFixed(1) + ' ' + (Math.sin(a) * r).toFixed(1) + ' '; }
  return el('path', { d: d + 'Z', fill, stroke: stroke || '#2B2620', 'stroke-width': 8, 'stroke-linejoin': 'round' }, parent);
}
function puff(parent) { return makeCloud(parent, .5, '#E9E4DA'); }
