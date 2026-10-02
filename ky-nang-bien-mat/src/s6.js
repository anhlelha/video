// Scene 6: the shelf of skills; horse vs. math; the gym.
(function () {
  const g = el('g', {}, svg);
  // ---- A: shelf ----
  const shelf = el('g', {}, g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#EFE6D4' }, shelf);
  el('rect', { x: 200, y: 640, width: 1520, height: 34, rx: 6, fill: '#A8744A' }, shelf);
  el('rect', { x: 200, y: 674, width: 1520, height: 70, fill: '#8E5E3A' }, shelf);
  const names = ['Săn bắt', 'Cưỡi ngựa', 'Trồng lúa', 'Toán', 'Văn', 'Tin học'];
  const items = [
    c => { el('line', { x1: 0, y1: 0, x2: 0, y2: -300, stroke: '#6B4A2E', 'stroke-width': 10 }, c); el('path', { d: 'M-16 -300 L 0 -360 L 16 -300 Z', fill: '#7D8288' }, c); },
    c => { el('path', { d: 'M-60 -40 L -60 -150 A 60 60 0 0 1 60 -150 L 60 -40', fill: 'none', stroke: '#7D8288', 'stroke-width': 30, 'stroke-linecap': 'round' }, c); for (const [x, y] of [[-60, -80], [-60, -130], [60, -80], [60, -130]]) el('circle', { cx: x, cy: y, r: 5, fill: '#4E5761' }, c); },
    c => { for (let i = 0; i < 9; i++) el('path', { d: `M${(i - 4) * 6} 0 Q ${(i - 4) * 12} -150 ${(i - 4) * 22} -260`, fill: 'none', stroke: '#D4A93E', 'stroke-width': 7 }, c); el('rect', { x: -34, y: -110, width: 68, height: 18, fill: '#8A6440' }, c); },
    c => { el('rect', { x: -95, y: -240, width: 190, height: 240, rx: 8, fill: '#4F7CAC' }, c); el('rect', { x: -80, y: -225, width: 160, height: 210, fill: '#FFFDF6' }, c); txt(c, 0, -160, 'x² + 3x', { 'font-size': 34, fill: '#24345C' }); txt(c, 0, -100, '= 10', { 'font-size': 34, fill: '#24345C' }); },
    c => { el('rect', { x: -90, y: -250, width: 180, height: 250, fill: '#FFFDF6', stroke: '#C9C2B2', 'stroke-width': 4 }, c); txt(c, 0, -200, 'Văn', { 'font-size': 36, fill: '#8A3B2B', 'font-weight': 800 }); for (let i = 0; i < 6; i++) el('line', { x1: -66, y1: -160 + i * 26, x2: 66 - (i === 5 ? 50 : 0), y2: -160 + i * 26, stroke: '#9AA5B1', 'stroke-width': 5 }, c); },
    c => { el('rect', { x: -120, y: -110, width: 240, height: 110, rx: 12, fill: '#3C4A63' }, c); for (let i = 0; i < 24; i++) el('rect', { x: -106 + (i % 8) * 27, y: -98 + Math.floor(i / 8) * 30, width: 22, height: 22, rx: 4, fill: '#D6DCE2' }, c); txt(c, 0, -150, '</>', { 'font-size': 40, fill: '#3C4A63', 'font-weight': 800 }); },
  ];
  const itemG = items.map((draw, i) => {
    const c = el('g', {}, shelf); const inner = el('g', {}, c); draw(inner);
    txt(c, 0, 82, names[i], { 'font-size': 34, fill: '#FFF6E2' });
    return { c, inner };
  });
  const parts = el('g', {}, shelf); const P = [];
  for (let i = 0; i < 120; i++) P.push(el('circle', { r: 4 + rnd(i) * 7, fill: ['#F2C14E', '#E8743B', '#8FD3F4'][i % 3] }, parts));
  // ---- B: split screen ----
  const split = el('g', {}, g);
  el('rect', { x: 0, y: 0, width: 960, height: 1080, fill: '#F3E3C3' }, split);
  el('rect', { x: 960, y: 0, width: 960, height: 1080, fill: '#E3ECEF' }, split);
  el('rect', { x: 0, y: 760, width: 960, height: 320, fill: '#D9C29A' }, split);
  el('line', { x1: 960, y1: 0, x2: 960, y2: 1080, stroke: '#2B2620', 'stroke-width': 8 }, split);
  const roadLines = el('g', {}, split); const rl = [];
  for (let i = 0; i < 6; i++) rl.push(el('rect', { x: 0, y: 820, width: 90, height: 12, rx: 6, fill: '#FFF6E2' }, roadLines));
  const sHorse = makeHorse(split, { coat: '#7A4E2E', dark: '#5E3A20', mane: '#2B2620' });
  const car = el('g', {}, split);
  el('path', { d: 'M-200 -40 L -180 -110 Q -150 -120 -120 -120 L -70 -190 L 90 -190 L 150 -120 L 200 -110 Q 220 -100 220 -60 L 220 -40 Z', fill: '#C8373B' }, car);
  el('path', { d: 'M-50 -175 L 70 -175 L 115 -125 L -85 -125 Z', fill: '#BDE7FA' }, car);
  const wheels = [-120, 130].map(x => { const w = el('g', { transform: `translate(${x} -40)` }, car); el('circle', { r: 46, fill: '#2B2620' }, w); el('circle', { r: 20, fill: '#D6DCE2' }, w); el('rect', { x: -3, y: -20, width: 6, height: 40, fill: '#9AA5B1' }, w); return w; });
  // right: kid struggling with a problem, brain network grows
  const rDesk = el('g', {}, split);
  const kidR = makeFigure(rDesk, KID); kidR.g.setAttribute('transform', 'translate(1440 900)');
  el('rect', { x: 1150, y: 760, width: 580, height: 30, rx: 8, fill: '#B07D52' }, rDesk);
  el('rect', { x: 1180, y: 790, width: 520, height: 300, fill: '#8E5E3A' }, rDesk);
  el('path', { d: 'M1330 735 L 1550 735 L 1560 768 L 1320 768 Z', fill: '#FFFDF6', stroke: '#9AA5B1', 'stroke-width': 3 }, rDesk);
  const sweat = el('path', { d: 'M0 0 C -10 16, -10 26, 0 26 C 10 26, 10 16, 0 0 Z', fill: '#8FD3F4' }, rDesk);
  const net = el('g', {}, split);
  el('circle', { cx: 1440, cy: 300, r: 190, fill: 'rgba(255,255,255,.55)', stroke: '#9AA5B1', 'stroke-width': 4, 'stroke-dasharray': '10 10' }, net);
  const nodes = []; for (let i = 0; i < 14; i++) { const a = rnd(i) * 6.28, r = 40 + rnd(i + 30) * 130; nodes.push([1440 + Math.cos(a) * r, 300 + Math.sin(a) * r]); }
  const edges = []; for (let i = 0; i < 22; i++) { const a = Math.floor(rnd(i + 70) * 14), b = (a + 1 + Math.floor(rnd(i + 90) * 5)) % 14; edges.push(el('line', { x1: nodes[a][0], y1: nodes[a][1], x2: nodes[a][0], y2: nodes[a][1], stroke: '#F2C14E', 'stroke-width': 5, 'stroke-linecap': 'round', 'data-b': b, 'data-a': a }, net)); }
  const nodeEls = nodes.map(([x, y]) => el('circle', { cx: x, cy: y, r: 10, fill: '#9AA5B1' }, net));
  // ---- C: gym ----
  const gym = el('g', {}, g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#E7EEF0' }, gym);
  el('rect', { x: 0, y: 800, width: 1920, height: 280, fill: '#8E9AA6' }, gym);
  for (let i = 0; i < 6; i++) el('rect', { x: 120 + i * 300, y: 160, width: 200, height: 300, rx: 10, fill: '#D6E2E6' }, gym);
  const gk = makeFigure(gym, KID); gk.g.setAttribute('transform', 'translate(760 880) scale(1.25)');
  const bell = (arm) => { const b = el('g', { transform: 'translate(0 112)' }, arm); el('rect', { x: -40, y: -6, width: 80, height: 12, fill: '#4E5761' }, b); el('rect', { x: -52, y: -22, width: 18, height: 44, rx: 5, fill: '#2B2620' }, b); el('rect', { x: 34, y: -22, width: 18, height: 44, rx: 5, fill: '#2B2620' }, b); };
  bell(gk.armL); bell(gk.armR);
  const robot = el('g', {}, gym);
  el('rect', { x: -14, y: -440, width: 28, height: 40, fill: '#9AA5B1' }, robot);
  const rlight = el('circle', { cx: 0, cy: -450, r: 14, fill: '#E8743B' }, robot);
  el('rect', { x: -90, y: -400, width: 180, height: 140, rx: 30, fill: '#C3CCD5', stroke: '#5D6773', 'stroke-width': 6 }, robot);
  el('rect', { x: -66, y: -376, width: 132, height: 90, rx: 18, fill: '#24345C' }, robot);
  el('circle', { cx: -28, cy: -334, r: 11, fill: '#8FD3F4' }, robot); el('circle', { cx: 28, cy: -334, r: 11, fill: '#8FD3F4' }, robot);
  el('path', { d: 'M-22 -306 Q 0 -294 22 -306', fill: 'none', stroke: '#8FD3F4', 'stroke-width': 5, 'stroke-linecap': 'round' }, robot);
  el('rect', { x: -110, y: -250, width: 220, height: 200, rx: 30, fill: '#C3CCD5', stroke: '#5D6773', 'stroke-width': 6 }, robot);
  el('rect', { x: -70, y: -50, width: 40, height: 50, fill: '#5D6773' }, robot); el('rect', { x: 30, y: -50, width: 40, height: 50, fill: '#5D6773' }, robot);
  const rArm = el('g', { transform: 'translate(-120 -220)' }, robot);
  el('rect', { x: -18, y: 0, width: 36, height: 150, rx: 18, fill: '#9AA5B1', stroke: '#5D6773', 'stroke-width': 5 }, rArm);
  el('circle', { cx: 0, cy: 160, r: 26, fill: '#5D6773' }, rArm);
  el('rect', { x: 102, y: -220, width: 36, height: 150, rx: 18, fill: '#9AA5B1', stroke: '#5D6773', 'stroke-width': 5 }, robot);
  const rBub = makeBubble(gym, 440, 110, 'Để tôi nâng giúp!', 40);
  const kq = qmark(gym, 700, 330, 1.2);
  const cut = el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#F7EBD3', opacity: 0 }, g);
  SC[6] = { g, render(t, lt) {
    const t15 = L(t, 15), t16 = L(t, 16), t17 = L(t, 17), t18 = L(t, 18), t19 = L(t, 19), t20 = L(t, 20);
    const phase = t17 < -.3 ? 0 : t19 < -.6 ? 1 : 2;
    show(shelf, phase === 0); show(split, phase === 1); show(gym, phase === 2);
    op(cut, Math.max(1 - Math.abs(t17 + .3) / .3, 1 - Math.abs(t19 + .6) / .3));
    if (phase === 0) {
      // items arrive; the old ones are already faded
      itemG.forEach((it, i) => {
        const p = easeBack(seg(lt, .3 + i * .4, .75 + i * .4));
        tr(it.c, 360 + i * 240, 640, 0, 1); it.inner.setAttribute('transform', `translate(0 ${(1 - p) * -80}) scale(${p})`);
        op(it.inner, i < 3 ? .5 : 1 - seg(t15, 2.0 + (i - 3) * .3, 3.2 + (i - 3) * .3));
      });
      // particles rise from the last three, then freeze on "Nhưng"
      const tf = Math.min(t15, (L(t, 16) > 0 ? LINES[15].s - LINES[14].s : t15) + 0);
      const age = x => x;
      P.forEach((p, i) => {
        const src = 3 + (i % 3), born = 2.0 + (src - 3) * .3 + rnd(i) * 1.2;
        let a = age(t15 - born);
        const freezeAt = LINES[15].s - LINES[14].s + .2;
        if (t15 > freezeAt) a = (freezeAt - born) + (1 - Math.exp(-(t15 - freezeAt) * 6)) / 6 * .4;
        show(p, a > 0);
        const x = 360 + src * 240 + (rnd(i + 5) - .5) * 160 + Math.sin(a * 2 + i) * 30 * a;
        const y = 540 - a * (60 + rnd(i + 8) * 70);
        p.setAttribute('cx', x); p.setAttribute('cy', y);
        const glow = t15 > freezeAt ? .9 + .1 * Math.sin(t * 4 + i) : 1 - seg(a, 3, 5) * .4;
        op(p, glow);
      });
    } else if (phase === 1) {
      // left: horse becomes car; right: kid works, network grows
      const morph = seg(t17, 2.6, 3.2);
      gallop(sHorse, t, 12, 28);
      tr(sHorse.g, 480, 790 - Math.abs(Math.sin(t * 12)) * 8, 0, .9); op(sHorse.g, 1 - morph);
      tr(car, 480, 790, 0, 1); op(car, morph);
      wheels.forEach(w => w.setAttribute('transform', `${w.getAttribute('transform').split(' rotate')[0]} rotate(${t * 600})`));
      rl.forEach((r, i) => { const x = ((i * 200 - t * 500) % 1200 + 1200) % 1200 - 140; r.setAttribute('x', x); show(r, x < 860); });
      const rOn = seg(t18, -.3, .4);
      op(rDesk, .35 + .65 * rOn); op(net, rOn);
      pose(kidR, { aL: 25, aR: -25, h: Math.sin(t * 1.6) * 8 }); setMouth(kidR, t18 > 4 ? 'smile' : 'flat'); setBrows(kidR, t18 > 4 ? 0 : .9);
      const sw = (t * .8) % 1; tr(sweat, 1490, 520 + sw * 60); op(sweat, rOn * (1 - sw) * (t18 < 4 ? 1 : 0));
      const grow = seg(t18, .5, 5.2);
      edges.forEach((e, i) => {
        const a = +e.getAttribute('data-a'), b = +e.getAttribute('data-b'), p = seg(grow * 22 - i, 0, 1);
        e.setAttribute('x2', lerp(nodes[a][0], nodes[b][0], p)); e.setAttribute('y2', lerp(nodes[a][1], nodes[b][1], p));
      });
      nodeEls.forEach((n, i) => n.setAttribute('fill', grow * 14 > i ? '#F2C14E' : '#9AA5B1'));
    } else {
      // gym: kid lifts; robot offers to lift instead
      const lifting = 1 - seg(t20, .4, .9);
      const cyc = (Math.sin(t * 4) + 1) / 2 * lifting + .5 * (1 - lifting);
      pose(gk, { aL: lerp(10, 165, cyc), aR: lerp(-10, -165, cyc), h: lerp(0, -12, seg(t20, .6, 1.1)) * (1 - seg(t20, 2.4, 2.9)) });
      setMouth(gk, t20 > .6 ? 'flat' : 'smile'); setBrows(gk, t20 > 2.4 ? .7 : 0);
      tr(robot, 1360, 860);
      rArm.setAttribute('transform', `translate(-120 -220) rotate(${lerp(0, 130, easeOut(seg(t20, 0, .5)))})`);
      rlight.setAttribute('fill', Math.floor(t * 3) % 2 ? '#E8743B' : '#F2C14E');
      show(rBub, t20 > .2); tr(rBub, 1360, 300, 0, easeBack(seg(t20, .2, .6)));
      op(kq, seg(t20, 2.8, 3.2));
    }
  } };
})();
