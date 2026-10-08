// Scene 4: BÙM! -> the question, with software roles orbiting the steering wheel.
(function () {
  const g = el('g', {}, svg);
  const bg = el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#F2A541' }, g);
  const night = el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: radGrad([[0, '#2C3A66'], [1, '#121831']]) }, g);
  const stars = el('g', {}, g);
  for (let i = 0; i < 90; i++) el('circle', { cx: rnd(i) * 1920, cy: rnd(i + 50) * 1080, r: 1 + rnd(i + 7) * 2.5, fill: '#fff', opacity: .25 + rnd(i + 3) * .5 }, stars);
  // explosion
  const boom = el('g', {}, g);
  const b1 = burst(boom, 18, 330, 560, '#D94F3D'); const b2 = burst(boom, 16, 230, 400, '#F2C14E'); const b3 = burst(boom, 14, 140, 250, '#FFFDF6');
  txt(boom, 0, 50, 'BÙM!', { 'font-size': 170, 'font-weight': 800, fill: '#2B2620' });
  const debris = el('g', {}, g); const deb = [];
  for (let i = 0; i < 14; i++) {
    const d = el('g', {}, debris);
    if (i % 3 === 0) { el('circle', { r: 34, fill: '#2B2620' }, d); el('circle', { r: 16, fill: '#C9CED4' }, d); }
    else if (i % 3 === 1) el('path', { d: 'M0 -30 L 9 -9 L 30 -6 L 14 9 L 18 30 L 0 19 L -18 30 L -14 9 L -30 -6 L -9 -9 Z', fill: '#FCE38A', stroke: '#2B2620', 'stroke-width': 4 }, d);
    else el('rect', { x: -30, y: -14, width: 60, height: 28, rx: 6, fill: '#D94F3D', stroke: '#2B2620', 'stroke-width': 4 }, d);
    deb.push(d);
  }
  // steering wheel
  const wheel = el('g', {}, g);
  const wh = el('g', {}, wheel);
  el('circle', { r: 150, fill: 'none', stroke: '#F2C14E', 'stroke-width': 30 }, wh);
  el('circle', { r: 46, fill: '#F2C14E' }, wh);
  [90, 210, 330].forEach(a => el('rect', { x: -14, y: 30, width: 28, height: 110, rx: 10, fill: '#F2C14E', transform: `rotate(${a - 90})` }, wh));
  txt(wh, 0, 12, '</>', { 'font-size': 36, fill: '#121831', 'font-weight': 800 });
  const glow = el('circle', { r: 230, fill: radGrad([[0, '#F2C14E', .35], [1, '#F2C14E', 0]]) }, wheel);
  wheel.insertBefore(glow, wh);
  // orbiting roles
  const back = el('g', {}, g); g.appendChild(wheel); const front = el('g', {}, g);
  const ROLES = [['PM', '#E8743B'], ['BA', '#3E7CB1'], ['Dev', '#2DA44E'], ['Test', '#D94F3D'], ['QC', '#9B59B6'], ['DevOps', '#1FA2A8'], ['UX/UI', '#F49AC1'], ['Tech Lead', '#F2C14E'], ['PO', '#8FC3F0'], ['Khách hàng', '#C9A66B']];
  const chips = ROLES.map(([n, c]) => {
    const ch = el('g', {}, front); const w = 40 + n.length * 26;
    el('rect', { x: -w / 2, y: -38, width: w, height: 76, rx: 38, fill: c, stroke: '#fff', 'stroke-width': 4 }, ch);
    txt(ch, 0, 15, n, { 'font-size': 42, 'font-weight': 800, fill: '#fff' });
    return ch;
  });
  const LET = ['P', 'M', 'B', 'A', 'D', 'e', 'v', 'Q', 'C', 'T', 's', 't', 'O', 'U', 'X', '{ }', '</>', '?'];
  const letters = LET.map(s => txt(back, 0, 0, s, { 'font-size': 46, 'font-weight': 800, fill: '#8FA3D9' }));
  // question texts
  const q1 = el('text', { x: 960, y: 150, 'text-anchor': 'middle', 'font-size': 66, 'font-weight': 800, fill: '#FFF8E8' }, g);
  q1.innerHTML = 'Nếu <tspan fill="#F2C14E">coding platform</tspan> là một chiếc ô tô…';
  const cards = el('g', {}, g);
  const mk = (i, label, draw) => {
    const c = el('g', {}, cards);
    el('rect', { x: -190, y: -95, width: 380, height: 190, rx: 26, fill: '#FFFDF6', stroke: '#F2C14E', 'stroke-width': 6 }, c);
    const ic = el('g', { transform: 'translate(0 -28)' }, c); draw(ic);
    txt(c, 0, 66, label, { 'font-size': 34, 'font-weight': 800 });
    return c;
  };
  const C = [
    mk(0, 'Ai giữ chìa khoá?', ic => { const k = makeKey(ic, 1.1); k.setAttribute('transform', 'translate(-50 0)'); }),
    mk(1, 'Ai nổ máy?', ic => { el('circle', { r: 48, fill: '#D94F3D', stroke: '#2B2620', 'stroke-width': 5 }, ic); txt(ic, 0, 9, 'START', { 'font-size': 22, fill: '#fff' }); }),
    mk(2, 'Ai cầm lái?', ic => { el('circle', { r: 46, fill: 'none', stroke: '#2B2620', 'stroke-width': 12 }, ic); el('circle', { r: 12, fill: '#2B2620' }, ic); [0, 120, 240].forEach(a => el('rect', { x: -5, y: 8, width: 10, height: 34, fill: '#2B2620', transform: `rotate(${a})` }, ic)); }),
    mk(3, 'Ai biết phanh?', ic => { el('rect', { x: -40, y: -46, width: 80, height: 92, rx: 12, fill: '#8D959E', stroke: '#2B2620', 'stroke-width': 5 }, ic); txt(ic, 0, 18, '?', { 'font-size': 60, fill: '#D94F3D', 'font-weight': 800 }); }),
  ];
  const fin = el('g', {}, g);
  txt(fin, 0, -20, 'Bạn định lái', { 'font-size': 110, 'font-weight': 800, fill: '#FFF8E8', stroke: '#121831', 'stroke-width': 14, 'paint-order': 'stroke' });
  txt(fin, 0, 110, 'chiếc xe này thế nào?', { 'font-size': 110, 'font-weight': 800, fill: '#F2C14E', stroke: '#121831', 'stroke-width': 14, 'paint-order': 'stroke' });
  const tag = txt(g, 960, 1010, 'PM · BA · Dev · Test · QC … ai ngồi ghế nào?', { 'font-size': 40, 'font-weight': 700, fill: '#B9C6EA' });
  SC[4] = { g, render(t, lt) {
    const t11 = L(t, 11), t12 = L(t, 12), t13 = L(t, 13);
    // boom
    const bo = easeBack(seg(lt, 0, .35));
    const bOut = seg(lt, 1.8, 2.5);
    show(boom, bOut < 1); boom.setAttribute('transform', `translate(${960 + Math.sin(t * 70) * 14 * (1 - bOut)} ${540 + Math.cos(t * 61) * 12 * (1 - bOut)}) scale(${bo * (1 + lt * .08) * (1 - easeIn(bOut))}) rotate(${lt * 6})`);
    b1.setAttribute('transform', `rotate(${lt * 10})`); b2.setAttribute('transform', `rotate(${-lt * 14})`);
    deb.forEach((d, i) => {
      const a = rnd(i) * Math.PI * 2, v = 700 + rnd(i + 4) * 900, p = lt;
      d.setAttribute('transform', `translate(${960 + Math.cos(a) * v * p} ${540 + Math.sin(a) * v * p + 500 * p * p}) rotate(${p * 400 * (rnd(i + 2) - .5)})`);
    });
    show(debris, lt < 2.5); show(bg, lt < 3);
    op(night, seg(lt, 1.8, 2.8)); op(stars, seg(lt, 2.2, 3.4));
    // wheel + orbit
    const on = easeOut(seg(lt, 2.4, 3.4));
    const fade13 = seg(t13, -.2, .6);
    const wy = 560;
    tr(wheel, 960, wy, 0, on * lerp(1, 1.25, fade13)); wh.setAttribute('transform', `rotate(${Math.sin(t * .9) * 25})`);
    op(wheel, on * lerp(1, .35, fade13));
    const spd = .45 + seg(t13, 0, 2) * .35;
    chips.forEach((c, i) => {
      const th = t * spd + i * Math.PI * 2 / chips.length;
      const depth = (Math.sin(th) + 1) / 2;   // 0 back .. 1 front
      const x = 960 + Math.cos(th) * 640, y = wy + Math.sin(th) * 210 - Math.cos(th) * 60;
      const blink = clamp(.6 + .6 * Math.sin(t * 1.3 + i * 2.1), .12, 1);   // roles fade in and out
      (depth > .5 ? front : back).appendChild(c);
      tr(c, x, y, 0, (.62 + .5 * depth) * easeBack(seg(lt, 2.6 + i * .12, 3.0 + i * .12)));
      op(c, (.35 + .65 * depth) * blink);
    });
    letters.forEach((l, i) => {
      const th = -t * .25 + i * Math.PI * 2 / letters.length;
      l.setAttribute('transform', `translate(${960 + Math.cos(th) * 880} ${wy + Math.sin(th) * 380}) scale(${.7 + .4 * rnd(i)})`);
      op(l, on * clamp(.15 + .6 * Math.sin(t * 2 + i * 1.7)));
    });
    // question line 11
    const q = seg(t11, -.2, .4) * (1 - seg(t13, -.4, .2));
    op(q1, q); q1.setAttribute('transform', `translate(0 ${(1 - easeOut(seg(t11, -.2, .4))) * 30})`);
    // line 12: four cards
    const cs = [0, 1.25, 2.4, 4.2];
    C.forEach((c, i) => {
      const p = easeBack(seg(t12, cs[i], cs[i] + .35)) * (1 - easeIn(seg(t13, -.4, .2)));
      show(c, p > .01); tr(c, 300 + i * 440, 880, (i - 1.5) * 1.5, p);
    });
    show(cards, t12 > 0 && t13 < .3);
    // line 13: final question
    const f = easeBack(seg(t13, 0, .5));
    show(fin, f > .01); tr(fin, 960, 520, 0, f);
    op(tag, seg(t13, 2.6, 3.4));
  } };
})();
