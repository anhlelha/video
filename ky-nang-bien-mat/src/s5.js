// Scene 5: Socrates worries about writing -> every generation worries.
(function () {
  const g = el('g', {}, svg); const world = el('g', {}, g);
  el('rect', { x: -400, y: -300, width: 7600, height: 1700, fill: linGrad([[0, '#BFD9EA'], [.8, '#F1EEE6']]) }, world);
  // temple
  const temple = el('g', {}, world);
  el('path', { d: 'M180 300 L 960 120 L 1740 300 Z', fill: '#E9E4D8', stroke: '#C9C2B2', 'stroke-width': 6 }, temple);
  el('rect', { x: 200, y: 300, width: 1520, height: 50, fill: '#DDD6C6' }, temple);
  const cols = [];
  for (let i = 0; i < 7; i++) {
    const c = el('g', { transform: `translate(${290 + i * 223} 350)` }, temple);
    el('rect', { x: -44, y: 0, width: 88, height: 430, fill: '#F1EDE3' }, c);
    for (let k = 0; k < 4; k++) el('line', { x1: -26 + k * 17, y1: 10, x2: -26 + k * 17, y2: 420, stroke: '#D6CFBF', 'stroke-width': 5 }, c);
    el('rect', { x: -56, y: -6, width: 112, height: 22, fill: '#DDD6C6' }, c);
    cols.push(c);
  }
  el('rect', { x: 120, y: 780, width: 1680, height: 50, fill: '#DDD6C6' }, world);
  el('rect', { x: 60, y: 830, width: 1800, height: 50, fill: '#CFC7B5' }, world);
  el('rect', { x: -400, y: 880, width: 7600, height: 600, fill: '#BDB39E' }, world);
  // Socrates, seated with a scroll
  const soc = makeFigure(world, { skin: '#E6B48E', hair: '#E6E2DA', style: 'bald', beard: '#E6E2DA', shirt: '#F7F4EC', sleeve: '#F7F4EC', pants: '#F7F4EC', toga: true });
  show(soc.legL, false); show(soc.legR, false);
  const robe = el('path', { d: 'M-50 -130 L 50 -130 L 110 -20 L -110 -20 Z', fill: '#EDE8DC' }, soc.body);
  soc.body.insertBefore(robe, soc.body.firstChild);
  const scroll = el('g', { transform: 'translate(0 -150)' }, soc.body);
  el('rect', { x: -70, y: -26, width: 140, height: 52, fill: '#F3E3B5' }, scroll);
  el('rect', { x: -84, y: -32, width: 18, height: 64, rx: 8, fill: '#B5895A' }, scroll); el('rect', { x: 66, y: -32, width: 18, height: 64, rx: 8, fill: '#B5895A' }, scroll);
  txt(scroll, 0, 10, 'ΑΒΓΔ', { 'font-size': 26, fill: '#6B4A2E' });
  const think = el('g', {}, world);
  el('circle', { cx: -70, cy: 110, r: 12, fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 4 }, think);
  el('circle', { cx: -40, cy: 70, r: 18, fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 4 }, think);
  el('rect', { x: -10, y: -90, width: 360, height: 150, rx: 70, fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 5 }, think);
  const tScroll = el('g', { transform: 'translate(70 -15)' }, think);
  el('rect', { x: -40, y: -20, width: 80, height: 40, fill: '#F3E3B5' }, tScroll); el('rect', { x: -48, y: -24, width: 12, height: 48, rx: 5, fill: '#B5895A' }, tScroll); el('rect', { x: 36, y: -24, width: 12, height: 48, rx: 5, fill: '#B5895A' }, tScroll);
  txt(think, 165, 2, '→', { 'font-size': 50 });
  const brain = el('g', { transform: 'translate(265 -15)' }, think);
  el('path', { d: 'M-50 10 C -60 -30, -20 -50, 0 -36 C 20 -54, 60 -34, 50 6 C 62 30, 20 50, 0 36 C -20 50, -60 34, -50 10 Z', fill: '#F2B8C6', stroke: '#C77A8E', 'stroke-width': 4 }, brain);
  const dots = [];
  for (let i = 0; i < 6; i++) dots.push(el('circle', { cx: -30 + (i % 3) * 30, cy: -12 + Math.floor(i / 3) * 26, r: 7, fill: '#C77A8E' }, brain));
  // strip of "every generation" frames
  const frames = [];
  const icon = [
    c => { el('rect', { x: -110, y: -120, width: 220, height: 160, fill: 'none', stroke: '#6B4A2E', 'stroke-width': 14 }, c); el('line', { x1: 0, y1: -120, x2: 0, y2: -40, stroke: '#6B4A2E', 'stroke-width': 12 }, c); el('line', { x1: -60, y1: -100, x2: 60, y2: -100, stroke: '#6B4A2E', 'stroke-width': 10 }, c); el('rect', { x: -70, y: -40, width: 140, height: 26, fill: '#3C4A63' }, c); el('rect', { x: -60, y: 46, width: 120, height: 40, fill: '#FFFDF6', stroke: '#9AA5B1', 'stroke-width': 3 }, c); },
    c => { el('rect', { x: -80, y: -130, width: 160, height: 220, rx: 18, fill: '#3C4A63' }, c); el('rect', { x: -60, y: -110, width: 120, height: 46, rx: 6, fill: '#BFD8B8' }, c); txt(c, 0, -76, '12345', { 'font-size': 30, fill: '#2B2620' }); for (let i = 0; i < 12; i++) el('rect', { x: -58 + (i % 3) * 42, y: -50 + Math.floor(i / 3) * 34, width: 32, height: 26, rx: 5, fill: i % 3 === 2 ? '#E8743B' : '#D6DCE2' }, c); },
    c => { el('path', { d: 'M-40 -140 L 0 -100 L 40 -150', fill: 'none', stroke: '#2B2620', 'stroke-width': 6 }, c); el('rect', { x: -130, y: -100, width: 260, height: 190, rx: 26, fill: '#8E5E3A' }, c); el('rect', { x: -110, y: -80, width: 180, height: 150, rx: 30, fill: '#7FA7B5' }, c); el('circle', { cx: 95, cy: -40, r: 12, fill: '#2B2620' }, c); el('circle', { cx: 95, cy: 0, r: 12, fill: '#2B2620' }, c); },
    c => { el('rect', { x: -170, y: -60, width: 340, height: 80, rx: 40, fill: '#FFFDF6', stroke: '#9AA5B1', 'stroke-width': 6 }, c); txt(c, -20, -8, 'Tìm kiếm…', { 'font-size': 34, fill: '#9AA5B1', 'font-weight': 400 }); el('circle', { cx: 120, cy: -26, r: 16, fill: 'none', stroke: '#4F7CAC', 'stroke-width': 6 }, c); el('line', { x1: 132, y1: -14, x2: 146, y2: 0, stroke: '#4F7CAC', 'stroke-width': 7, 'stroke-linecap': 'round' }, c); },
    c => { el('rect', { x: -70, y: -140, width: 140, height: 240, rx: 22, fill: '#2B2620' }, c); el('rect', { x: -58, y: -122, width: 116, height: 200, rx: 10, fill: linGrad([[0, '#8FD3F4'], [1, '#E8A2C0']]) }, c); for (let i = 0; i < 6; i++) el('rect', { x: -46 + (i % 3) * 34, y: -106 + Math.floor(i / 3) * 34, width: 24, height: 24, rx: 6, fill: '#FFFDF6', opacity: .85 }, c); },
  ];
  icon.forEach((draw, i) => {
    const f = el('g', { transform: `translate(${2300 + i * 520} 480)` }, world);
    el('rect', { x: -230, y: -270, width: 460, height: 560, rx: 30, fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 6 }, f);
    const ic = el('g', { transform: 'translate(0 -60)' }, f); draw(ic);
    const eh = el('g', { transform: 'translate(-120 190)' }, f);
    el('path', { d: 'M-60 90 C -60 30, 60 30, 60 90 Z', fill: ['#6B4A2E', '#3C4A63', '#8A3B2B', '#4F7CAC', '#2DA44E'][i] }, eh);
    el('circle', { r: 44, fill: '#F1C7A3' }, eh);
    el('path', { d: 'M-44 -6 C -48 -50, 48 -54, 44 -6 C 30 -26, -30 -26, -44 -6 Z', fill: '#D6D0C4' }, eh);
    el('line', { x1: -26, y1: -16, x2: -8, y2: -10, stroke: '#2B2620', 'stroke-width': 4 }, eh); el('line', { x1: 26, y1: -16, x2: 8, y2: -10, stroke: '#2B2620', 'stroke-width': 4 }, eh);
    el('circle', { cx: -15, cy: 2, r: 5, fill: '#2B2620' }, eh); el('circle', { cx: 15, cy: 2, r: 5, fill: '#2B2620' }, eh);
    el('path', { d: 'M-12 26 Q 0 16 12 26', fill: 'none', stroke: '#7A2E22', 'stroke-width': 4, 'stroke-linecap': 'round' }, eh);
    const b = makeBubble(f, 230, 80, 'Thời nay…', 32); b.setAttribute('transform', 'translate(80 130)');
    frames.push({ f, b, eh });
  });
  SC[5] = { g, render(t, lt) {
    const t13 = L(t, 13), t14 = L(t, 14);
    cols.forEach((c, i) => c.setAttribute('transform', `translate(${290 + i * 223} ${350 + (1 - easeOut(seg(lt, i * .12, .8 + i * .12))) * 500})`));
    tr(soc.g, 960, 930, 0, 1.55);
    pose(soc, { aL: -28, aR: 28, h: Math.sin(t * 5) * 7 * seg(t13, 2.5, 3.0) * (1 - seg(t13, 5, 5.6)) });
    setMouth(soc, 'frown'); setBrows(soc, .7);
    const th = easeBack(seg(t13, 1.5, 2.0));
    show(think, t13 > 1.5); think.setAttribute('transform', `translate(1110 260) scale(${th})`);
    dots.forEach((d, i) => op(d, 1 - seg(t13, 3.2 + i * .3, 3.6 + i * .3)));
    // pan through the generations
    const p1 = easeInOut(seg(t14, -.3, 1.2)), p2 = easeInOut(seg(t14, 1.2, 5.6));
    let cx = lerp(1060, 2300, p1); cx = lerp(cx, 2300 + 4 * 520, p2);
    const s = lerp(1, .78, p1);
    cam(world, cx, lerp(520, 500, p1), s);
    frames.forEach((fr, i) => {
      const near = 1 - clamp(Math.abs(cx - (2300 + i * 520)) / 520);
      fr.b.setAttribute('transform', `translate(80 130) scale(${.85 + .15 * near})`);
      fr.eh.setAttribute('transform', `translate(-120 190) rotate(${Math.sin(t * 6 + i) * 6 * near})`);
    });
  } };
})();
