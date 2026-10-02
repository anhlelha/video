// ===================== SCENE 3: downstream (0 – 16) =====================
(() => {
  // 3a river + factories (0 – 7.4)
  const S = scene(0, 7.4, C.cream);
  const cm = el('g', {}, S.g);
  el('rect', { x: -1000, y: 960, width: 5000, height: 800, fill: '#E6DECF' }, cm);
  const riverD = 'M -300 140 C 300 80, 500 320, 900 340 S 1500 520, 1750 720 S 2100 900, 2480 900';
  el('path', { d: riverD, fill: 'none', stroke: '#8EC5E8', 'stroke-width': 150, 'stroke-linecap': 'round' }, cm);
  const flow = el('path', { d: riverD, fill: 'none', stroke: '#B9DDF3', 'stroke-width': 18, 'stroke-dasharray': '40 70', 'stroke-linecap': 'round' }, cm);
  const river = el('path', { d: riverD, fill: 'none', stroke: 'none' }, cm);
  const L = river.getTotalLength();
  const drift = [];
  for (let i = 0; i < 16; i++) {
    const g = el('g', {}, cm);
    el('circle', { r: 46, fill: C.gold, opacity: .35 }, g);
    const w = makeWheelVariant(g, 28, i);
    drift.push({ g, w, off: i / 16 });
  }
  makeFactory(cm, 2420, 960, 300, 300);
  makeFactory(cm, 2770, 960, 280, 380);
  makeFactory(cm, 3100, 960, 300, 320);
  const smk = [];
  for (let i = 0; i < 18; i++) smk.push(el('circle', { r: 20, fill: '#9C978C' }, cm));
  // robot arm
  const arm = el('g', {}, cm);
  const base = [2440, 700];
  el('rect', { x: base[0] - 30, y: base[1] - 30, width: 60, height: 60, rx: 10, fill: '#3A3D45' }, arm);
  const seg1 = el('line', { stroke: C.gold, 'stroke-width': 30, 'stroke-linecap': 'round' }, arm);
  const seg2 = el('line', { stroke: C.gold, 'stroke-width': 24, 'stroke-linecap': 'round' }, arm);
  const elbow = el('circle', { r: 20, fill: '#3A3D45' }, arm);
  const claw = el('g', {}, arm);
  const clawL = el('path', { d: 'M0 0 L-26 30 L-14 50', fill: 'none', stroke: '#3A3D45', 'stroke-width': 12, 'stroke-linecap': 'round' }, claw);
  const clawR = el('path', { d: 'M0 0 L26 30 L14 50', fill: 'none', stroke: '#3A3D45', 'stroke-width': 12, 'stroke-linecap': 'round' }, claw);
  const grabbed = el('g', {}, cm);
  el('circle', { r: 46, fill: C.gold, opacity: .35 }, grabbed);
  const gw = makeWheelVariant(grabbed, 28, 'spiked');
  const rest = [2520, 520], target = [2260, 880];
  function ik(E) {
    const l = 230, dx = E[0] - base[0], dy = E[1] - base[1];
    const d = Math.min(Math.hypot(dx, dy), 2 * l - 1);
    const th = Math.atan2(dy, dx), ph = Math.acos(d / (2 * l));
    const ex = base[0] + Math.cos(th - ph) * l, ey = base[1] + Math.sin(th - ph) * l;
    return [ex, ey];
  }
  S.r = t => {
    flow.setAttribute('stroke-dashoffset', -t * 160);
    drift.forEach((d, i) => {
      const s = ((d.off + t * .035) % 1) * L * .97;
      const p = river.getPointAtLength(s);
      d.g.setAttribute('transform', `translate(${p.x} ${p.y + Math.sin(t * 3 + i) * 6})`);
      d.w.spokes.setAttribute('transform', `rotate(${t * 90 + i * 40})`);
    });
    smk.forEach((s, i) => {
      const k = i % 3, birth = (i / 18) * 3, p = ((t + birth) % 3) / 3;
      const cx = [2420 + 300 * .62 + 23, 2770 + 280 * .62 + 23, 3100 + 300 * .62 + 23][k];
      const top = [960 - 300 - 120, 960 - 380 - 120, 960 - 320 - 120][k];
      s.setAttribute('cx', cx + p * 70); s.setAttribute('cy', top - p * 220); s.setAttribute('r', 16 + p * 40);
      s.setAttribute('opacity', (1 - p) * .5);
    });
    // arm path
    let E = rest, closed = 0, holding = false;
    if (t > 5.6) {
      if (t < 6.4) E = [lerp(rest[0], target[0], easeInOut(seg(t, 5.6, 6.4))), lerp(rest[1], target[1], easeInOut(seg(t, 5.6, 6.4)))];
      else if (t < 6.6) { E = target; closed = seg(t, 6.4, 6.6); }
      else { const p = easeInOut(seg(t, 6.6, 7.3)); E = [lerp(target[0], rest[0], p), lerp(target[1], rest[1] - 60, p)]; closed = 1; holding = true; }
    }
    const el1 = ik(E);
    seg1.setAttribute('x1', base[0]); seg1.setAttribute('y1', base[1]); seg1.setAttribute('x2', el1[0]); seg1.setAttribute('y2', el1[1]);
    seg2.setAttribute('x1', el1[0]); seg2.setAttribute('y1', el1[1]); seg2.setAttribute('x2', E[0]); seg2.setAttribute('y2', E[1]);
    elbow.setAttribute('cx', el1[0]); elbow.setAttribute('cy', el1[1]);
    claw.setAttribute('transform', `translate(${E[0]} ${E[1] - 50})`);
    clawL.setAttribute('transform', `rotate(${-closed * 18})`); clawR.setAttribute('transform', `rotate(${closed * 18})`);
    grabbed.setAttribute('opacity', t > 5.6 ? 1 : 0);
    grabbed.setAttribute('transform', `translate(${holding ? E[0] : target[0]} ${holding ? E[1] + 10 : target[1] + Math.sin(t * 3) * 6})`);
    gw.spokes.setAttribute('transform', `rotate(${t * 90})`);
    // camera: drone along the river, then close on the arm
    let cx, cy, s;
    if (t < 5.4) { const p = easeInOut(seg(t, 0, 5.2)); cx = lerp(700, 2560, p); cy = lerp(380, 700, p); s = lerp(1, .85, p); }
    else { cx = 2400; cy = 720; s = 1.35; }
    cam(cm, cx, cy, s);
  };
})();

(() => {
  // 3b assembly line (7.4 – 10.6)
  const S = scene(7.4, 10.6, '#2B2D33');
  const g = S.g;
  for (let i = 0; i < 7; i++) el('rect', { x: 120 + i * 260, y: 120, width: 150, height: 70, rx: 8, fill: C.gold, opacity: .25 }, g);
  el('rect', { x: -50, y: 820, width: 2100, height: 40, fill: '#4A4E58' }, g);
  const rollers = [];
  for (let i = 0; i < 30; i++) rollers.push(el('circle', { cx: i * 70, cy: 880, r: 18, fill: '#5D6773' }, g));
  // station markers
  [['Bánh xe', 560], ['Thân vỏ', 900], ['Sơn', 1240], ['Logo', 1560]].forEach(([s, x]) => {
    el('rect', { x: x - 90, y: 230, width: 180, height: 60, rx: 30, fill: '#3A3D45' }, g);
    el('text', { x, y: 271, 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 700, fill: C.gold }, g).textContent = s;
    el('line', { x1: x, x2: x, y1: 290, y2: 380, stroke: '#3A3D45', 'stroke-width': 14 }, g);
  });
  const nozzle = el('path', { d: 'M1220 380 L1260 380 L1250 430 L1230 430 Z', fill: '#5D6773' }, g);
  const spray = [];
  for (let i = 0; i < 24; i++) spray.push(el('circle', { r: 8, fill: C.orange }, g));
  const veh = el('g', {}, g);
  const engG = el('g', { transform: 'translate(0 -150) scale(.55)' }, veh);
  makeEngine(engG);
  const car = makeCar(veh, '#B8C2CC');
  const chip = el('g', {}, veh);
  el('rect', { x: -70, y: -30, width: 140, height: 60, rx: 30, fill: '#fff', stroke: C.ink, 'stroke-width': 4 }, chip);
  el('text', { x: 0, y: 11, 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 800, fill: C.ink }, chip).textContent = 'LLM ™';
  S.r = t => {
    const x = lerp(260, 1700, seg(t, 7.4, 10.6));
    veh.setAttribute('transform', `translate(${x} 790) scale(.9)`);
    rollers.forEach((r, i) => r.setAttribute('cx', ((i * 70 + t * 160) % 2100) - 50));
    // wheels at 560, body at 900, paint at 1240, logo at 1560
    const wOn = x > 520;
    car.wheels.forEach((w, i) => { w.g.setAttribute('opacity', wOn ? 1 : 0); w.spokes.setAttribute('transform', `rotate(${x})`); });
    const bodyP = seg(x, 860, 960);
    [car.body, car.trunk].forEach(b => b.setAttribute('transform', `translate(0 ${(1 - easeOut(bodyP)) * -420})`));
    car.g.querySelectorAll('path,line').forEach(p => { if (p !== car.body && p.parentNode !== car.trunk) p.setAttribute('opacity', bodyP >= 1 ? 1 : 0); });
    [car.body, car.trunkLid].forEach(b => b.setAttribute('opacity', x > 860 ? 1 : 0));
    engG.setAttribute('opacity', bodyP >= 1 ? 0 : 1);
    const paint = seg(x, 1180, 1320);
    const col = paint >= 1 ? C.orange : paint > 0 ? '#D79A72' : '#B8C2CC';
    car.body.setAttribute('fill', col); car.trunkLid.setAttribute('fill', col);
    spray.forEach((s, i) => {
      const on = x > 1150 && x < 1350;
      const p = ((t * 3 + i / 24) % 1);
      s.setAttribute('cx', 1240 + (rnd(i) - .5) * 120 * p); s.setAttribute('cy', 430 + p * 260);
      s.setAttribute('opacity', on ? (1 - p) * .8 : 0);
    });
    const lp = seg(x, 1520, 1600);
    chip.setAttribute('transform', `translate(20 -30) scale(${lp ? easeBack(lp) : 0})`);
  };
})();

(() => {
  // 3c showroom (10.6 – 16)
  const S = scene(10.6, 16.0, '#23252B');
  const g = S.g;
  el('rect', { x: 0, y: 700, width: 1920, height: 400, fill: '#30333B' }, g);
  const xs = [430, 960, 1490], cols = ['#E8743B', '#4A7BD8', '#3E9C6B'], names = ['Claude', 'Gemini', 'GPT'];
  const beams = xs.map(x => el('polygon', { points: `${x - 40},0 ${x + 40},0 ${x + 260},820 ${x - 260},820`, fill: '#FFF6D8', opacity: .1 }, g));
  const cars = xs.map((x, i) => {
    el('ellipse', { cx: x, cy: 800, rx: 250, ry: 46, fill: '#4A4E58' }, g);
    el('ellipse', { cx: x, cy: 790, rx: 250, ry: 46, fill: '#5D6773' }, g);
    const holder = el('g', {}, g);
    const c = makeCar(holder, cols[i]);
    const tag = el('g', { transform: `translate(${x} 900)` }, g);
    el('rect', { x: -110, y: -36, width: 220, height: 72, rx: 36, fill: '#fff' }, tag);
    el('text', { x: 0, y: 14, 'text-anchor': 'middle', 'font-size': 38, 'font-weight': 800, fill: C.ink }, tag).textContent = names[i];
    const price = el('g', { transform: `translate(${x + 40} 470)` }, g);
    el('line', { x1: 0, y1: -470, x2: 0, y2: -40, stroke: '#888', 'stroke-width': 2 }, price);
    el('rect', { x: -95, y: -40, width: 190, height: 70, rx: 12, fill: C.gold }, price);
    el('text', { x: 0, y: 8, 'text-anchor': 'middle', 'font-size': 32, 'font-weight': 800, fill: C.ink }, price).textContent = '$20/tháng';
    return { holder, c, x, tag, price };
  });
  const flashes = [];
  for (let i = 0; i < 14; i++) flashes.push(el('circle', { r: 60, fill: '#fff' }, g));
  S.r = t => {
    cars.forEach((o, i) => {
      const p = seg(t, 10.7 + i * .25, 11.2 + i * .25);
      const flip = Math.sin((t - 10.6) * 1.2 + i) > 0 ? 1 : -1; // "glance" at each other
      o.holder.setAttribute('transform', `translate(${o.x} ${770 - (1 - easeOut(p)) * 300}) scale(${.62 * flip} .62)`);
      o.holder.setAttribute('opacity', p > 0 ? 1 : 0);
      o.price.setAttribute('opacity', seg(t, 12.0 + i * .2, 12.3 + i * .2));
    });
    beams.forEach((b, i) => b.setAttribute('opacity', .08 + .05 * Math.sin(t * 2 + i)));
    flashes.forEach((f, i) => {
      const at = 11.0 + rnd(i) * 4.6, p = seg(t, at, at + .18);
      f.setAttribute('cx', 150 + rnd(i + 20) * 1620); f.setAttribute('cy', 980 + rnd(i + 40) * 60);
      f.setAttribute('opacity', p > 0 && p < 1 ? 1 - p : 0); f.setAttribute('r', 20 + p * 80);
    });
  };
})();

// ===================== SCENE 4: the loop (16 – 47.2) =====================
const SHELLS = [
  ['M-280 40 L-280 -150 L230 -150 L300 -60 L300 40 Z', '#7FB3D5'],
  ['M-280 40 C-280 -190 280 -190 300 40 Z', '#F2C14E'],
  ['M-300 40 L-300 -30 L250 -95 L320 0 L320 40 Z', '#D64545'],
  ['M-300 40 L-300 -60 L60 -60 L60 -160 L240 -160 L300 -60 L300 40 Z', '#6C8E5A'],
  ['M-260 40 C-300 -40 -200 -140 0 -140 C200 -140 300 -40 260 40 Z M-120 -130 L-160 -230 L-80 -138 Z M120 -130 L160 -230 L80 -138 Z', '#B58CD8'],
  ['M-300 30 L-300 -20 L-150 -20 L-150 -66 C-110 -125 -60 -145 0 -145 L90 -145 C140 -145 175 -112 205 -72 L275 -62 C305 -56 315 -30 315 0 L315 30 Z', C.orange],
  ['M-280 40 L-280 -100 L-200 -180 L200 -180 L280 -100 L280 40 Z', '#9AA5B1'],
  ['M-300 40 C-300 -60 -150 -60 -100 -120 L150 -120 C220 -60 320 -60 300 40 Z', '#4A7BD8'],
];
(() => {
  // 4a many shells, the hand picks one (16 – 25)
  const S = scene(16.0, 25.0, C.cream);
  const g = S.g;
  const head = el('g', { transform: 'translate(960 110)' }, g);
  el('rect', { x: -260, y: -42, width: 520, height: 84, rx: 42, fill: C.ink }, head);
  el('text', { x: 0, y: 14, 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 700, fill: '#fff' }, head).textContent = 'Thân vỏ = UI / Chat';
  const items = SHELLS.map(([d, col], i) => {
    const x = 270 + (i % 4) * 460, y = 470 + Math.floor(i / 4) * 330;
    const ped = el('rect', { x: x - 150, y: y + 40, width: 300, height: 40, rx: 10, fill: '#E2DACB' }, g);
    const sh = el('g', {}, g);
    el('path', { d, fill: col, stroke: 'rgba(0,0,0,.25)', 'stroke-width': 5, 'fill-rule': 'nonzero' }, sh);
    const p = makePerson(g, { skin: ['#F1C9A5', '#B9825A', '#F4D3B8', '#8A5A3B'][i % 4], hair: '#2B2320', hoodie: [C.navy, '#B03A48', '#3E7C59', '#6C4AB6'][i % 4] });
    return { x, y, sh, ped, p };
  });
  const hand = el('g', {}, g);
  el('rect', { x: -70, y: -900, width: 140, height: 820, fill: C.charcoal }, hand);
  el('rect', { x: -78, y: -110, width: 156, height: 34, rx: 8, fill: C.gold }, hand);
  el('rect', { x: -80, y: -80, width: 160, height: 120, rx: 40, fill: '#F1C9A5' }, hand);
  [-60, -20, 20, 60].forEach(fx => el('rect', { x: fx - 16, y: 10, width: 32, height: 90, rx: 16, fill: '#F1C9A5' }, hand));
  const PICK = 5;
  S.r = t => {
    items.forEach((o, i) => {
      const pp = seg(t, 19.7 + i * .15, 20.05 + i * .15);
      let tx = o.x, ty = o.y, rot = 0, sc = t < 19.7 + i * .15 ? 0 : easeBack(pp) * .5;
      if (i === PICK && t > 23.4) ty = o.y - easeInOut(seg(t, 23.5, 24.6)) * 700;
      if (i !== PICK) rot = easeOut(seg(t, 23.6 + i * .06, 24.0 + i * .06)) * (i % 2 ? 18 : -18);
      o.sh.setAttribute('transform', `translate(${tx} ${ty}) rotate(${rot}) scale(${sc})`);
      o.sh.setAttribute('opacity', i !== PICK && t > 23.6 ? .55 : 1);
      o.p.g.setAttribute('transform', `translate(${o.x + 190} ${o.y - 10 - Math.abs(Math.sin(t * 5 + i)) * (t < 19.7 ? 14 : 0)}) scale(.55)`);
      o.p.mouth.setAttribute('ry', t > 23.6 ? 12 : 4);
    });
    head.setAttribute('opacity', seg(t, 19.9, 20.3));
    const hx = items[PICK].x, hy = items[PICK].y - 90;
    let y;
    if (t < 22.3) y = -400; else if (t < 23.4) y = lerp(-400, hy, easeOut(seg(t, 22.3, 23.3))); else y = hy - easeInOut(seg(t, 23.5, 24.6)) * 700;
    hand.setAttribute('transform', `translate(${hx} ${y})`);
  };
})();

(() => {
  // 4b montage of parts (25 – 34.4)
  const S = scene(25.0, 34.4, C.cream);
  const g = S.g;
  const holder = el('g', { transform: 'translate(960 640) scale(1.35)' }, g);
  const beam = el('polygon', { points: '310,-40 900,-160 900,120 310,-10', fill: 'url(#beam)' }, holder);
  const car = makeCar(holder, C.orange);
  const headl = el('ellipse', { cx: 305, cy: -30, rx: 14, ry: 20, fill: '#FFE08A', stroke: C.ink, 'stroke-width': 3 }, holder);
  const tail = el('rect', { x: -312, y: -40, width: 20, height: 34, rx: 6, fill: '#D64545' }, holder);
  const tailGlow = el('circle', { cx: -305, cy: -24, r: 40, fill: '#D64545', opacity: .3 }, holder);
  const mirror = el('path', { d: 'M150 -80 L185 -92 L190 -70 L158 -66 Z', fill: C.ink }, holder);
  const brake = el('g', { transform: 'translate(190 30)' }, holder);
  el('circle', { r: 30, fill: 'none', stroke: '#8E99A4', 'stroke-width': 8 }, brake);
  el('path', { d: 'M-12 -40 A 42 42 0 0 1 30 -28 L 20 -14 A 26 26 0 0 0 -6 -24 Z', fill: '#D64545' }, brake);
  const pin = el('g', { transform: 'translate(40 -230)' }, holder);
  el('path', { d: 'M0 50 C -40 0, -40 -40, 0 -40 C 40 -40, 40 0, 0 50 Z', fill: '#2DA44E' }, pin);
  el('circle', { cx: 0, cy: -12, r: 12, fill: '#fff' }, pin);
  const box = el('g', { transform: 'translate(-230 -70)' }, holder);
  el('rect', { x: -40, y: -50, width: 80, height: 56, rx: 8, fill: C.gold, stroke: C.ink, 'stroke-width': 3 }, box);
  const parts = [
    { at: 25.9, nodes: [headl, beam], label: 'Đèn pha = Memory', lx: 1530, ly: 330 },
    { at: 27.3, nodes: [brake], label: 'Phanh = Guardrails', lx: 1500, ly: 860 },
    { at: 28.7, nodes: [tail, tailGlow], label: 'Đèn hậu = Observability', lx: 360, ly: 330 },
    { at: 30.1, nodes: [mirror], label: 'Gương = Reflection', lx: 1250, ly: 190 },
    { at: 31.4, nodes: [pin], label: 'Bản đồ = MCP', lx: 640, ly: 160 },
    { at: 32.9, nodes: [box], label: 'Cốp xe = Skills', lx: 420, ly: 860 },
  ];
  parts.forEach(p => {
    p.tag = el('g', {}, g);
    el('rect', { x: -230, y: -40, width: 460, height: 80, rx: 40, fill: C.ink }, p.tag);
    el('text', { x: 0, y: 13, 'text-anchor': 'middle', 'font-size': 36, 'font-weight': 700, fill: '#fff' }, p.tag).textContent = p.label;
  });
  const ver = el('text', { x: 1840, y: 90, 'text-anchor': 'end', 'font-size': 56, 'font-weight': 800, fill: C.orange }, g);
  S.r = t => {
    let n = 0;
    parts.forEach((p, i) => {
      const k = seg(t, p.at, p.at + .3);
      if (t >= p.at) n = i + 1;
      p.nodes.forEach(nd => nd.setAttribute('opacity', t >= p.at ? 1 : 0));
      p.tag.setAttribute('transform', `translate(${p.lx} ${p.ly}) scale(${t < p.at ? 0 : easeBack(k)})`);
    });
    pin.setAttribute('transform', `translate(40 ${-230 + Math.sin(t * 4) * 8})`);
    car.trunkLid.setAttribute('transform', t > 32.9 ? `rotate(${-38 * easeBack(seg(t, 32.9, 33.3))} -150 -66)` : '');
    box.setAttribute('transform', `translate(-230 ${-70 - (t > 32.9 ? easeOut(seg(t, 33.0, 33.4)) * 40 : 0)})`);
    beam.setAttribute('opacity', t >= 25.9 ? .8 + .2 * Math.sin(t * 6) : 0);
    ver.textContent = 'v2.' + n;
    car.wheels.forEach(w => w.spokes.setAttribute('transform', `rotate(${t * 60})`));
  };
})();

(() => {
  // 4c loop diagram + 4d clock (34.4 – 47.2)
  const S = scene(34.4, 47.2, C.cream);
  const g = S.g;
  const loopG = el('g', {}, g);
  const R = 300, CX = 960, CY = 500;
  el('circle', { cx: CX, cy: CY, r: R, fill: 'none', stroke: '#E2DACB', 'stroke-width': 18 }, loopG);
  const arc = el('circle', { cx: CX, cy: CY, r: R, fill: 'none', stroke: C.orange, 'stroke-width': 18, 'stroke-linecap': 'round', transform: `rotate(-90 ${CX} ${CY})` }, loopG);
  const circ = 2 * Math.PI * R;
  arc.setAttribute('stroke-dasharray', `0 ${circ}`);
  const nodes = [['Kỹ sư', 0], ['GitHub ⭐', 1], ['Nhà máy', 2], ['Xe mới', 3]].map(([s, k]) => {
    const a = -Math.PI / 2 + k * Math.PI / 2, x = CX + Math.cos(a) * R, y = CY + Math.sin(a) * R;
    const n = el('g', { transform: `translate(${x} ${y})` }, loopG);
    const bg = el('circle', { r: 92, fill: '#fff', stroke: C.ink, 'stroke-width': 6 }, n);
    el('text', { x: 0, y: 12, 'text-anchor': 'middle', 'font-size': 32, 'font-weight': 800, fill: C.ink }, n).textContent = s;
    return { n, bg, x, y };
  });
  const runner = el('circle', { r: 22, fill: C.gold, stroke: C.ink, 'stroke-width': 4 }, loopG);
  const ver = el('text', { x: CX, y: CY + 30, 'text-anchor': 'middle', 'font-size': 96, 'font-weight': 800, fill: C.ink }, loopG);
  const words = [['Làm', 34.85], ['Khen', 36.57], ['Lấy', 38.4], ['Lặp lại', 40.43]];
  const wordsG = el('g', { transform: 'translate(960 960)' }, loopG);
  el('rect', { x: -520, y: -50, width: 1040, height: 100, rx: 50, fill: C.ink }, wordsG);
  const wt = words.map(([s, at], i) => {
    const x = -360 + i * 240 + (i === 3 ? 20 : 0);
    const tx = el('text', { x, y: 18, 'text-anchor': 'middle', 'font-size': 50, 'font-weight': 800, fill: i === 3 ? C.orange : '#fff' }, wordsG);
    tx.textContent = s; return { tx, at };
  });
  // clock
  const clk = el('g', { transform: `translate(${CX} ${CY})` }, g);
  el('circle', { r: 230, fill: '#fff', stroke: C.ink, 'stroke-width': 12 }, clk);
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; el('line', { x1: Math.cos(a) * 190, y1: Math.sin(a) * 190, x2: Math.cos(a) * 210, y2: Math.sin(a) * 210, stroke: C.ink, 'stroke-width': 8 }, clk); }
  const hh = el('line', { x1: 0, y1: 0, x2: 0, y2: -110, stroke: C.ink, 'stroke-width': 16, 'stroke-linecap': 'round' }, clk);
  const mh = el('line', { x1: 0, y1: 0, x2: 0, y2: -170, stroke: C.orange, 'stroke-width': 10, 'stroke-linecap': 'round' }, clk);
  el('circle', { r: 16, fill: C.ink }, clk);
  const slam = [['NGÀY.', 44.3, -330], ['GIỜ.', 46.3, 330]].map(([s, at, dx]) => {
    const tx = el('text', { x: 0, y: 0, 'text-anchor': 'middle', 'font-size': 150, 'font-weight': 800, fill: C.orange }, g);
    tx.textContent = s; return { tx, at, dx };
  });
  const blackout = el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#000', opacity: 0 }, g);
  // laps: phase(t) grows faster and faster
  const phase = t => { const u = Math.max(0, t - 34.85); return u * .14 + Math.max(0, t - 40.4) ** 2 * .18; };
  S.r = t => {
    const ph = phase(t);
    const a = -Math.PI / 2 + (ph % 1) * Math.PI * 2;
    runner.setAttribute('cx', CX + Math.cos(a) * R); runner.setAttribute('cy', CY + Math.sin(a) * R);
    arc.setAttribute('stroke-dasharray', `${(ph % 1) * circ} ${circ}`);
    const k = Math.floor((ph % 1) * 4);
    nodes.forEach((n, i) => { n.bg.setAttribute('fill', i === k && t > 34.85 ? C.gold : '#fff'); });
    const minor = Math.floor(ph * 4);
    ver.textContent = `v${2 + Math.floor((minor + 1) / 10)}.${(minor + 1) % 10}`;
    wt.forEach(w => w.tx.setAttribute('opacity', t >= w.at ? 1 : 0));
    // switch to clock
    const cp = seg(t, 41.4, 41.9);
    loopG.setAttribute('opacity', 1 - cp * .85);
    clk.setAttribute('transform', `translate(${CX} ${CY}) scale(${t < 41.4 ? 0 : easeBack(cp)})`);
    const spin = Math.max(0, t - 41.4) ** 2 * 600;
    mh.setAttribute('transform', `rotate(${spin})`); hh.setAttribute('transform', `rotate(${spin / 12})`);
    slam.forEach(s => {
      const p = seg(t, s.at, s.at + .2);
      s.tx.setAttribute('opacity', t >= s.at ? 1 : 0);
      s.tx.setAttribute('transform', `translate(${CX + s.dx} ${CY + 330}) scale(${lerp(2.2, 1, easeOut(p))})`);
    });
    // hard cut to black after the peak
    blackout.setAttribute('opacity', t > 47.0 ? 1 : 0);
  };
})();
