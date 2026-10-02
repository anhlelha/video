// Scene 4: wet-rice farming -> orange or pomelo?
(function () {
  const g = el('g', {}, svg);
  const field = el('g', {}, g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: linGrad([[0, '#CFE6E0'], [.6, '#F3EBD0']]) }, field);
  const clouds = [];
  for (let i = 0; i < 4; i++) clouds.push(makeCloud(field, 1.2 + rnd(i) * .6, '#FFFFFF'));
  el('path', { d: 'M0 520 L 240 330 L 420 470 L 650 280 L 900 500 L 1150 340 L 1400 480 L 1650 300 L 1920 470 L 1920 640 L 0 640 Z', fill: '#9DBE95' }, field);
  el('path', { d: 'M0 600 C 400 520, 800 600, 1200 560 S 1700 560, 1920 580 L 1920 700 L 0 700 Z', fill: '#79A36F' }, field);
  ['#8DBF5A', '#A5CF6A', '#7BAE4E', '#9CCB62', '#86B955'].forEach((c, i) => {
    const y = 640 + i * 90;
    el('path', { d: `M-20 ${y} C 600 ${y - 30}, 1300 ${y + 20}, 1940 ${y - 10} L 1940 ${y + 100} L -20 ${y + 100} Z`, fill: c }, field);
    for (let k = 0; k < 24; k++) {
      const x = k * 84 + (i % 2) * 40, yy = y + 40 + Math.sin(k) * 6;
      el('path', { d: `M${x} ${yy} l -10 -30 M${x} ${yy} l 0 -36 M${x} ${yy} l 10 -30`, stroke: '#4E7D32', 'stroke-width': 4, 'stroke-linecap': 'round' }, field);
    }
  });
  const rain = el('g', {}, field); const drops = [];
  for (let i = 0; i < 60; i++) drops.push(el('line', { x1: 0, y1: 0, x2: -6, y2: 26, stroke: '#6E8FB0', 'stroke-width': 4, 'stroke-linecap': 'round' }, rain));
  const farmer = makeFigure(field, { skin: '#C99467', hair: '#2B2620', shirt: '#6B5136', pants: '#2F2F2F', hat: 'non' });
  // detail cards: leaf pest, root pest, buffalo, chicken
  const cards = [];
  const card = (draw) => { const c = el('g', {}, g); el('rect', { x: -170, y: -150, width: 340, height: 300, rx: 26, fill: '#FFFDF6', stroke: '#4E7D32', 'stroke-width': 8 }, c); draw(c); cards.push(c); return c; };
  card(c => {
    el('path', { d: 'M-110 60 C -60 -110, 90 -120, 120 -60 C 60 -40, -20 20, -110 60 Z', fill: '#7BAE4E' }, c);
    el('path', { d: 'M-110 60 C -20 0, 50 -50, 120 -60', fill: 'none', stroke: '#4E7D32', 'stroke-width': 5 }, c);
    for (let i = 0; i < 5; i++) el('circle', { cx: -20 + i * 16, cy: -36 - Math.sin(i) * 6, r: 11, fill: i === 4 ? '#5A6B2B' : '#B9C94A' }, c);
    el('path', { d: 'M40 -70 a 14 10 0 0 0 20 6', fill: 'none', stroke: '#C8373B', 'stroke-width': 5 }, c);
  });
  card(c => {
    el('rect', { x: -170, y: -10, width: 340, height: 160, fill: '#8C6A3E', 'clip-path': 'inset(0 round 0 0 26px 26px)' }, c);
    el('path', { d: 'M0 -10 L 0 -130 M0 -10 L -40 -120 M0 -10 L 40 -120', stroke: '#6E9B4A', 'stroke-width': 8, 'stroke-linecap': 'round' }, c);
    el('path', { d: 'M0 -10 C -10 30, -40 50, -60 90 M0 -10 C 10 30, 30 60, 50 100 M0 -10 L 0 100', fill: 'none', stroke: '#E3D2A8', 'stroke-width': 5 }, c);
    el('path', { d: 'M-40 70 C -10 50, 20 90, 50 70', fill: 'none', stroke: '#F1E4C2', 'stroke-width': 18, 'stroke-linecap': 'round' }, c);
    el('circle', { cx: 52, cy: 70, r: 8, fill: '#8A3B2B' }, c);
  });
  card(c => {
    el('ellipse', { cx: -10, cy: 10, rx: 100, ry: 55, fill: '#6F7378' }, c);
    for (const x of [-80, -40, 30, 60]) el('rect', { x: x - 9, y: 40, width: 18, height: 70, rx: 7, fill: '#5A5E63' }, c);
    el('ellipse', { cx: 95, cy: -20, rx: 44, ry: 36, fill: '#6F7378' }, c);
    el('path', { d: 'M70 -50 C 40 -100, 90 -110, 80 -70 M120 -50 C 150 -100, 100 -110, 110 -70', fill: 'none', stroke: '#E9E2D0', 'stroke-width': 10, 'stroke-linecap': 'round' }, c);
    el('circle', { cx: 108, cy: -24, r: 5, fill: '#2B2620' }, c);
  });
  card(c => {
    el('ellipse', { cx: -20, cy: 10, rx: 80, ry: 64, fill: '#C9763E' }, c);
    el('circle', { cx: 55, cy: -50, r: 38, fill: '#C9763E' }, c);
    el('path', { d: 'M45 -86 l 8 -22 l 8 18 l 8 -16 l 4 22 Z', fill: '#C8373B' }, c);
    el('path', { d: 'M90 -54 l 26 6 l -26 8 Z', fill: '#F2C14E' }, c);
    el('circle', { cx: 64, cy: -56, r: 5, fill: '#2B2620' }, c);
    el('path', { d: 'M-100 -10 C -140 -60, -130 20, -96 30 Z', fill: '#8A4A24' }, c);
    el('ellipse', { cx: 110, cy: 90, rx: 26, ry: 34, fill: '#FFF6E2', stroke: '#D9C29A', 'stroke-width': 4 }, c);
  });
  // garden: orange tree vs pomelo tree
  const garden = el('g', {}, g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: linGrad([[0, '#DCEFE6'], [.7, '#F3EBD0']]) }, garden);
  el('rect', { x: 0, y: 800, width: 1920, height: 280, fill: '#9CC46A' }, garden);
  const fruitTree = (x, fruit, r) => {
    const tg = el('g', { transform: `translate(${x} 810)` }, garden);
    el('rect', { x: -16, y: -260, width: 32, height: 260, fill: '#6B4A2E' }, tg);
    [[0, -360, 150], [-110, -290, 100], [110, -290, 100], [0, -460, 100]].forEach(([cx, cy, rr]) => el('circle', { cx, cy, r: rr, fill: '#4F7A35' }, tg));
    for (let i = 0; i < 11; i++) el('circle', { cx: -150 + rnd(i * 5 + x) * 300, cy: -480 + rnd(i * 11 + x) * 260, r, fill: fruit }, tg);
  };
  fruitTree(480, '#F29B38', 17); fruitTree(1440, '#C9D66A', 26);
  const dad = makeFigure(garden, DAD); dad.g.setAttribute('transform', 'translate(960 940) scale(1.25)');
  const gq = [qmark(garden, 800, 430, 1.3), qmark(garden, 1130, 400, 1.1)];
  // fish counter
  const fish = el('g', {}, g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#E7EEF0' }, fish);
  el('rect', { x: 0, y: 700, width: 1920, height: 380, fill: '#B9C7CC' }, fish);
  el('rect', { x: 300, y: 640, width: 1320, height: 90, rx: 20, fill: '#FFFFFF' }, fish);
  const fishShape = (x, body, fin) => {
    const fg = el('g', { transform: `translate(${x} 600)` }, fish);
    el('path', { d: 'M-160 0 C -90 -80, 90 -80, 150 0 C 90 80, -90 80, -160 0 Z', fill: body }, fg);
    el('path', { d: 'M140 0 L 220 -60 L 205 0 L 220 60 Z', fill: fin }, fg);
    el('path', { d: 'M-40 -55 L 20 -95 L 40 -50 Z', fill: fin }, fg);
    el('circle', { cx: -110, cy: -10, r: 10, fill: '#FFFFFF' }, fg); el('circle', { cx: -110, cy: -10, r: 5, fill: '#2B2620' }, fg);
    el('path', { d: 'M-70 -40 C -50 0, -50 0, -70 40', fill: 'none', stroke: 'rgba(0,0,0,.2)', 'stroke-width': 5 }, fg);
    return fg;
  };
  fishShape(620, '#9AA5B1', '#7B8794'); fishShape(1300, '#B59A6A', '#957A4E');
  const fq = [qmark(fish, 620, 420, 1.2), qmark(fish, 1300, 420, 1.2)];
  const dad2 = makeFigure(fish, DAD); dad2.g.setAttribute('transform', 'translate(1720 1010)');
  // hand holding rice grains (inset)
  const inset = makeInset(g, 960, 520, 340, '#6E9B4A', '#2F4E1E');
  const hand = makeHand(inset.content, '#C99467', '#6B5136');
  const grains = el('g', {}, inset.content); const gr = [];
  for (let i = 0; i < 22; i++) gr.push(el('ellipse', { rx: 16, ry: 9, fill: i % 4 ? '#E9C46A' : '#D4A93E', transform: '' }, grains));
  SC[4] = { g, render(t, lt) {
    const t10 = L(t, 10), t11 = L(t, 11), t12 = L(t, 12);
    // inset
    tr(hand.g, 930, 800, -84);
    gr.forEach((e, i) => {
      const bx = 965 + (rnd(i) - .5) * 120, by = 690 + (rnd(i + 7) - .5) * 50 - rnd(i + 3) * 30;
      const hop = Math.max(0, Math.sin(lt * 4 + i)) * 6;
      e.setAttribute('transform', `translate(${bx} ${by - hop}) rotate(${rnd(i + 2) * 180})`);
    });
    const away = easeIn(seg(t10, -.4, .5));
    show(inset.g, away < 1); op(inset.g, 1 - away);
    inset.g.setAttribute('transform', `translate(960 520) scale(${1 + away * .6}) translate(-960 -520)`);
    // sky: clouds gather and darken, a little rain
    const dark = seg(t10, 1, 4.5);
    clouds.forEach((c, i) => {
      tr(c, ((i * 520 + t * 30) % 2300) - 200, 140 + i * 40 + rnd(i) * 60);
      c.querySelectorAll('circle').forEach(ci => ci.setAttribute('fill', `rgb(${lerp(255, 150, dark)},${lerp(255, 160, dark)},${lerp(255, 175, dark)})`));
    });
    const rainOn = seg(t10, 4, 5);
    op(rain, rainOn);
    drops.forEach((d, i) => { const k = (t * 1.4 + rnd(i)) % 1; tr(d, rnd(i + 20) * 1920 + k * -20, 220 + k * 800); });
    tr(farmer.g, 960, 900);
    pose(farmer, { aL: 10, aR: lerp(-10, -150, easeOut(seg(t10, .6, 1.4))), h: -6 + Math.sin(t) * 3 });
    setMouth(farmer, 'smile');
    // cards pop in one after another
    const at = [.1, 1.6, 3.2, 4.8];
    cards.forEach((c, i) => {
      const p = easeBack(seg(t11, at[i], at[i] + .45)), o = 1 - seg(t12, -.6, 0);
      show(c, t11 > at[i] && o > 0); tr(c, 330 + i * 420, 400 + (i % 2) * 70, (i % 2 ? 4 : -4), p * (.7 + .3 * o)); op(c, o);
    });
    // garden, then fish counter
    const inGarden = t12 > -.3, inFish = t12 > 4.9;
    show(field, !inGarden); show(garden, inGarden && !inFish); show(fish, inFish);
    pose(dad, { aL: 10, aR: lerp(-10, -168, easeOut(seg(t12, 1.5, 2.2))), h: Math.sin(t * 2) * 10 });
    setMouth(dad, 'flat'); setBrows(dad, .9);
    gq.forEach((q, i) => op(q, seg(t12, 2.0 + i * .5, 2.3 + i * .5)));
    pose(dad2, { aL: lerp(10, 60, seg(t12, 5.6, 6.2)), aR: lerp(-10, -60, seg(t12, 5.6, 6.2)), h: Math.sin(t * 2.4) * 8 });
    setMouth(dad2, 'flat'); setBrows(dad2, .9);
    fq.forEach((q, i) => tr(q, 0, 0, 0, 1) || op(q, seg(t12, 5.3 + i * .4, 5.6 + i * .4)));
  } };
})();
