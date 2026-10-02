// Scene 3: horses and spears -> the circus.
(function () {
  const g = el('g', {}, svg); const world = el('g', {}, g);
  el('rect', { x: -800, y: -600, width: 4400, height: 1400, fill: linGrad([[0, '#D9774A'], [.75, '#F6D9A0']]) }, world);
  el('circle', { cx: 1600, cy: 470, r: 170, fill: '#F9E2A2' }, world);
  // citadel silhouette
  const fort = el('g', { transform: 'translate(300 0)' }, world);
  el('path', { d: 'M0 640 L 0 520 L 40 520 L 40 545 L 80 545 L 80 520 L 120 520 L 120 545 L 160 545 L 160 520 L 200 520 L 200 450 L 330 450 L 330 520 L 600 520 L 600 640 Z', fill: '#9C4A33' }, fort);
  el('path', { d: 'M190 450 L 265 395 L 340 450 Z', fill: '#7E3726' }, fort);
  el('line', { x1: 265, y1: 395, x2: 265, y2: 330, stroke: '#7E3726', 'stroke-width': 5 }, fort);
  el('path', { d: 'M265 330 L 310 345 L 265 360 Z', fill: '#F2C14E' }, fort);
  el('path', { d: 'M-800 700 C 0 600, 800 680, 1600 620 S 2800 640, 3600 660 L 3600 900 L -800 900 Z', fill: '#C98B57' }, world);
  el('rect', { x: -800, y: 790, width: 4400, height: 500, fill: '#C9A26B' }, world);
  // straw target
  const target = el('g', { transform: 'translate(2350 640)' }, world);
  el('rect', { x: -8, y: 60, width: 16, height: 100, fill: '#6B4A2E' }, target);
  ['#E9C46A', '#C8373B', '#FFFDF6', '#C8373B'].forEach((c, i) => el('circle', { r: 110 - i * 28, fill: c }, target));
  // horse + rider
  const horse = makeHorse(world, { coat: '#7A4E2E', dark: '#5E3A20', mane: '#2B2620', saddle: '#8A3B2B' });
  const rider = el('g', { transform: 'translate(-10 -205)' }, horse.g);
  el('rect', { x: -6, y: -10, width: 28, height: 90, rx: 12, fill: '#3B3F4A', transform: 'rotate(-14)' }, rider);
  el('path', { d: 'M-30 0 L 30 0 L 34 -120 L -22 -120 Z', fill: '#8A3B2B' }, rider);
  el('rect', { x: -28, y: -70, width: 60, height: 14, fill: '#F2C14E' }, rider);
  const rhead = el('g', { transform: 'translate(6 -160)' }, rider);
  el('circle', { r: 36, fill: '#E0A77A' }, rhead);
  el('path', { d: 'M-40 -4 C -40 -56, 40 -56, 40 -4 Z M -6 -48 L 0 -78 L 6 -48 Z', fill: '#B8862E' }, rhead);
  el('circle', { cx: 18, cy: 2, r: 4.5, fill: '#2B2620' }, rhead);
  const rarm = el('g', { transform: 'translate(10 -100)' }, rider);
  el('rect', { x: -12, y: -6, width: 24, height: 90, rx: 12, fill: '#8A3B2B' }, rarm);
  const heldSpear = el('g', { transform: 'translate(0 84)' }, rarm);
  el('line', { x1: -120, y1: 0, x2: 170, y2: 0, stroke: '#6B4A2E', 'stroke-width': 8 }, heldSpear);
  el('path', { d: 'M170 -11 L 214 0 L 170 11 Z', fill: '#9AA5B1' }, heldSpear);
  const flySpear = el('g', {}, world);
  el('line', { x1: -145, y1: 0, x2: 145, y2: 0, stroke: '#6B4A2E', 'stroke-width': 8 }, flySpear);
  el('path', { d: 'M145 -11 L 189 0 L 145 11 Z', fill: '#9AA5B1' }, flySpear);
  const dustW = [];
  for (let i = 0; i < 6; i++) dustW.push(el('circle', { r: 30, fill: '#E2C79A', opacity: .7 }, world));
  // circus
  const circus = el('g', {}, g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#3A1F2E' }, circus);
  for (let i = 0; i < 20; i++) {
    const a0 = -1.35 + i * .135, a1 = a0 + .135;
    el('path', { d: `M960 -120 L ${960 + Math.sin(a0) * 1500} ${-120 + Math.cos(a0) * 900} L ${960 + Math.sin(a1) * 1500} ${-120 + Math.cos(a1) * 900} Z`, fill: i % 2 ? '#B83A3A' : '#F3E3C3', transform: `rotate(0)` }, circus);
  }
  el('rect', { x: 0, y: 620, width: 1920, height: 460, fill: '#4A2A36' }, circus);
  el('ellipse', { cx: 960, cy: 790, rx: 700, ry: 190, fill: '#D9B27A', stroke: '#B83A3A', 'stroke-width': 26 }, circus);
  const spots = [el('path', { d: 'M520 -20 L 640 -20 L 1060 840 L 700 840 Z', fill: '#FFF0B4', opacity: .16 }, circus),
    el('path', { d: 'M1280 -20 L 1400 -20 L 1220 840 L 860 840 Z', fill: '#FFF0B4', opacity: .16 }, circus)];
  const chorse = makeHorse(circus, { coat: '#F4F1EA', dark: '#D6D0C4', mane: '#E9A6B8', plume: '#E86A92', saddle: '#4F7CAC' });
  const crowd = el('g', {}, circus); const heads = [];
  for (let i = 0; i < 18; i++) {
    const h = el('g', {}, crowd);
    el('path', { d: 'M-60 120 C -60 40, 60 40, 60 120 Z', fill: '#24131C' }, h);
    el('circle', { cx: 0, cy: 22, r: 36, fill: '#24131C' }, h);
    heads.push(h);
  }
  // dust burst (screen space)
  const dust = el('g', {}, g); const puffs = [];
  for (let i = 0; i < 26; i++) puffs.push(el('circle', { cx: rnd(i) * 1920, cy: 200 + rnd(i + 50) * 900, r: 0, fill: i % 3 ? '#E2C79A' : '#D6B888' }, dust));
  // hand-on-reins inset
  const inset = makeInset(g, 960, 520, 340, '#B5452F', '#5E2418');
  el('path', { d: 'M560 760 C 800 600, 1100 600, 1380 330', fill: 'none', stroke: '#6B4A2E', 'stroke-width': 54, 'stroke-linecap': 'round' }, inset.content);
  el('path', { d: 'M560 760 C 800 600, 1100 600, 1380 330', fill: 'none', stroke: '#8A6440', 'stroke-width': 8, 'stroke-dasharray': '18 16' }, inset.content);
  const fist = makeFist(inset.content, '#E0A77A', '#8A3B2B');
  SC[3] = { g, render(t, lt) {
    const t8 = L(t, 8), e8 = LE(t, 8), t9 = L(t, 9);
    // inset
    tr(fist, 960 + Math.sin(lt * 5) * 6, 600 + Math.max(0, Math.sin(lt * 5)) * 10, -32);
    const away = easeIn(seg(t8, -.4, .5));
    show(inset.g, away < 1); op(inset.g, 1 - away);
    inset.g.setAttribute('transform', `translate(960 520) scale(${1 + away * .6}) translate(-960 -520)`);
    // gallop across, throw at ~3.2 s into line 8
    const hx = lerp(-150, 1250, seg(t8, -1, 3.4)) + lerp(0, 350, easeOut(seg(t8, 3.4, 6.5)));
    const speed = 1 - seg(t8, 4, 6.5);
    gallop(horse, t, 14, 32 * speed + 3);
    const bob = Math.abs(Math.sin(t * 14)) * 10 * speed;
    tr(horse.g, hx, 800 - bob);
    rider.setAttribute('transform', `translate(-10 ${-205 + Math.sin(t * 14) * 3 * speed})`);
    const wind = easeInOut(seg(t8, 2.3, 3.1)), rel = seg(t8, 3.1, 3.3);
    rarm.setAttribute('transform', `translate(10 -100) rotate(${lerp(-70, 120, wind) - 100 * rel})`);
    show(heldSpear, t8 < 3.2);
    const fp = seg(t8, 3.2, 4.1), sx0 = lerp(-150, 1250, seg(3.2, -1, 3.4)) + 60, sy0 = 410;
    const fx = lerp(sx0, 2290, fp), fy = lerp(sy0, 640, fp) - Math.sin(Math.PI * fp) * 220;
    const dy = (640 - sy0) - Math.cos(Math.PI * fp) * 220 * Math.PI, dx = 2290 - sx0;
    const wob = t8 > 4.1 ? Math.sin((t8 - 4.1) * 40) * 6 * Math.exp(-(t8 - 4.1) * 4) : 0;
    show(flySpear, t8 >= 3.2); tr(flySpear, fx, fy, Math.atan2(dy, dx) * 180 / Math.PI * (fp < 1 ? 1 : 0) + (fp >= 1 ? 8 + wob : 0));
    dustW.forEach((d, i) => { const k = ((t * 3 + i / 6) % 1); d.setAttribute('cx', hx - 120 - k * 200); d.setAttribute('cy', 790 - k * 50); d.setAttribute('r', 20 + k * 50); op(d, (1 - k) * .7 * speed); });
    const cp = easeInOut(seg(t8, 0, 3.6));
    cam(world, lerp(860, 1750, cp), lerp(560, 520, cp), lerp(1, .82, cp));
    // dust burst covers the screen, then reveals the circus
    const burst = seg(e8, 0, 1.0), clear = seg(e8, 1.4, 2.4);
    show(dust, e8 > 0 && clear < 1); op(dust, 1 - clear);
    puffs.forEach((p, i) => p.setAttribute('r', easeOut(seg(burst, rnd(i + 9) * .5, rnd(i + 9) * .5 + .5)) * 420));
    show(circus, e8 > 1.2); show(world, e8 < 1.2);
    const a = t * 1.1;
    const cx = 960 + 560 * Math.cos(a), cy = 760 + 120 * Math.sin(a), sc = .78 + .16 * Math.sin(a);
    gallop(chorse, t, 8, 18);
    chorse.g.setAttribute('transform', `translate(${cx} ${cy - Math.abs(Math.sin(t * 8)) * 6}) scale(${Math.sin(a) > 0 ? -sc : sc} ${sc})`);
    spots.forEach((s, i) => s.setAttribute('transform', `rotate(${Math.sin(t * .8 + i * 2) * 6} ${i ? 1340 : 580} -20)`));
    const clap = seg(t9, 1.5, 2.5);
    heads.forEach((h, i) => tr(h, 60 + i * 110, 990 + Math.abs(Math.sin(t * (6 + rnd(i) * 3) + i)) * 14 * clap + rnd(i) * 10));
  } };
})();
