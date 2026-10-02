// Scene 2: hunter-gatherers.
(function () {
  const g = el('g', {}, svg); const world = el('g', {}, g);
  el('rect', { x: -600, y: -400, width: 4400, height: 1300, fill: linGrad([[0, '#F2B66D'], [.7, '#F6DDAF']]) }, world);
  el('circle', { cx: 1300, cy: 300, r: 110, fill: '#FBE6B0' }, world);
  el('path', { d: 'M-600 640 C 0 470, 500 600, 900 520 S 1800 470, 2400 560 S 3300 480, 3800 600 L 3800 900 L -600 900 Z', fill: '#D3A46A' }, world);
  el('path', { d: 'M-600 720 C 200 600, 700 700, 1300 640 S 2400 620, 3800 700 L 3800 900 L -600 900 Z', fill: '#B98650' }, world);
  el('rect', { x: -600, y: 780, width: 4400, height: 500, fill: '#8C6A3E' }, world);
  const tree = (x, s) => {
    const tg = el('g', { transform: `translate(${x} 790) scale(${s})` }, world);
    el('rect', { x: -14, y: -200, width: 28, height: 200, fill: '#5A3F25' }, tg);
    [[0, -250, 90], [-70, -210, 70], [70, -210, 70], [0, -320, 70]].forEach(([cx, cy, r]) => el('circle', { cx, cy, r, fill: '#6E7B3A' }, tg));
  };
  [[-200, 1.1], [300, .8], [1550, 1.2], [2650, .9], [3150, 1.1]].forEach(([x, s]) => tree(x, s));
  // hoof prints trail
  for (let i = 0; i < 7; i++) {
    const p = el('g', { transform: `translate(${880 + i * 110} ${850 + (i % 2) * 24}) rotate(-8)` }, world);
    el('ellipse', { cx: -9, cy: 0, rx: 8, ry: 15, fill: '#5A4024' }, p); el('ellipse', { cx: 9, cy: 0, rx: 8, ry: 15, fill: '#5A4024' }, p);
  }
  // wind streaks
  const winds = [];
  for (let i = 0; i < 6; i++) winds.push(el('path', { d: 'M0 0 C 60 -20, 120 20, 200 0', fill: 'none', stroke: '#FFF6E2', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: .8 }, world));
  // hunter (crouched)
  const hunter = makeFigure(world, { skin: '#C58B5E', hair: '#3A2A20', style: 'long', shirt: '#8C5A2B', pants: '#C58B5E', shoe: '#8C5A2B' });
  const spear = el('g', { transform: 'translate(0 112) rotate(-20)' }, hunter.armL);
  el('line', { x1: 0, y1: 120, x2: 0, y2: -300, stroke: '#6B4A2E', 'stroke-width': 8 }, spear);
  el('path', { d: 'M-12 -300 L 0 -344 L 12 -300 Z', fill: '#7D8288' }, spear);
  // berry bushes + gatherer
  const bush = (x, berry) => {
    const bg = el('g', { transform: `translate(${x} 790)` }, world);
    [[0, -80, 90], [-80, -50, 60], [80, -50, 60], [0, -150, 60]].forEach(([cx, cy, r]) => el('circle', { cx, cy, r, fill: '#4F6B32' }, bg));
    for (let i = 0; i < 9; i++) el('circle', { cx: -80 + rnd(i * 3 + x) * 160, cy: -170 + rnd(i * 7 + x) * 140, r: 13, fill: berry }, bg);
    return bg;
  };
  bush(2080, '#C8373B'); bush(2560, '#3D4F9E');
  const gatherer = makeFigure(world, { skin: '#C58B5E', hair: '#2B2620', style: 'long', shirt: '#A0703A', pants: '#C58B5E', shoe: '#8C5A2B' });
  const xMark = el('g', {}, world);
  el('circle', { r: 56, fill: '#FFFDF6', stroke: '#C8373B', 'stroke-width': 8 }, xMark);
  el('path', { d: 'M-24 -24 L 24 24 M24 -24 L -24 24', stroke: '#C8373B', 'stroke-width': 12, 'stroke-linecap': 'round' }, xMark);
  const ok = el('g', {}, world);
  el('circle', { r: 56, fill: '#FFFDF6', stroke: '#2DA44E', 'stroke-width': 8 }, ok);
  el('path', { d: 'M-24 2 L -6 22 L 26 -18', fill: 'none', stroke: '#2DA44E', 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ok);
  // modern man, lost with a phone
  const modern = el('g', {}, world);
  const man = makeFigure(modern, { skin: '#F1C7A3', hair: '#2B2620', shirt: '#5B8DB8', pants: '#3B3F4A' });
  const mphone = el('g', {}, man.armR);
  el('rect', { x: -20, y: 100, width: 40, height: 66, rx: 7, fill: '#2B2620' }, mphone);
  el('rect', { x: -15, y: 106, width: 30, height: 50, rx: 3, fill: '#D6DCE2' }, mphone);
  const noSig = el('g', {}, modern);
  [0, 1, 2, 3].forEach(i => el('rect', { x: -40 + i * 22, y: -i * 16, width: 14, height: 16 + i * 16, rx: 3, fill: '#9AA5B1' }, noSig));
  el('path', { d: 'M30 -70 L 70 -30 M70 -70 L 30 -30', stroke: '#C8373B', 'stroke-width': 10, 'stroke-linecap': 'round' }, noSig);
  const qs = [qmark(modern, 170, -480, 1), qmark(modern, 250, -380, .8), qmark(modern, -200, -300, .7)];
  // hand close-up inset
  const inset = makeInset(g, 960, 520, 340, '#7A5634', '#3A2A20');
  for (let i = 0; i < 40; i++) el('circle', { cx: 620 + rnd(i) * 680, cy: 180 + rnd(i + 3) * 680, r: 6 + rnd(i + 5) * 14, fill: 'rgba(60,40,20,.35)' }, inset.content);
  const pr = el('g', { transform: 'translate(1000 560) rotate(-10)' }, inset.content);
  el('ellipse', { cx: -38, cy: 0, rx: 34, ry: 64, fill: '#4A3220' }, pr); el('ellipse', { cx: 38, cy: 0, rx: 34, ry: 64, fill: '#4A3220' }, pr);
  const hand = makeHand(inset.content, '#C58B5E', '#8C5A2B');
  SC[2] = { g, render(t, lt) {
    const t5 = L(t, 5), t6 = L(t, 6), t7 = L(t, 7);
    // inset: a hand reaches the hoof print, then the inset blooms away
    const reach = easeOut(seg(lt, .2, 2.0));
    tr(hand.g, lerp(560, 840, reach), lerp(900, 640, reach), -40);
    const away = easeIn(seg(t5, -.4, .5));
    show(inset.g, away < 1); op(inset.g, 1 - away);
    inset.g.setAttribute('transform', `translate(960 520) scale(${1 + away * .6}) translate(-960 -520)`);
    // hunter crouched, reading the trail; head turns into the wind
    tr(hunter.g, 760, 830); pose(hunter, { aL: 20, aR: -55 + Math.sin(t * 2) * 5, lL: 6, lR: -6, h: Math.sin(t * 1.5) * 6 + seg(t5, 2.5, 3.5) * 10 });
    winds.forEach((w, i) => {
      const x = ((t * 260 + i * 410) % 2600) - 200;
      w.setAttribute('transform', `translate(${x} ${180 + i * 70 + Math.sin(t * 2 + i) * 10})`);
      op(w, .3 + .5 * seg(t5, 1.5, 2.5));
    });
    // gatherer: reach red (no!), then blue (yes)
    tr(gatherer.g, 2320, 800);
    const toRed = easeOut(seg(t6, 0, .6)) * (1 - easeOut(seg(t6, 1.9, 2.4)));
    const toBlue = easeOut(seg(t6, 2.2, 2.8));
    pose(gatherer, { aL: lerp(5, 75, toRed), aR: lerp(-5, -75, toBlue), h: lerp(0, -10, toRed) + lerp(0, 10, toBlue) });
    setMouth(gatherer, toBlue > .5 ? 'smile' : toRed > .5 ? 'o' : 'flat');
    show(xMark, t6 > .9); tr(xMark, 2080, 520, 0, easeBack(seg(t6, .9, 1.3)));
    show(ok, t6 > 3.0); tr(ok, 2560, 520, 0, easeBack(seg(t6, 3.0, 3.4)));
    // the modern man replaces the gatherer
    const now = t7 > 2.9;
    show(modern, now); show(gatherer.g, !now); show(xMark, !now && t6 > .9); show(ok, !now && t6 > 3.0);
    tr(modern, 2320, 800); pose(man, { aL: 10, aR: -150 + Math.sin(t * 3) * 10, h: Math.sin(t * 2.4) * 10 });
    setMouth(man, 'o'); setBrows(man, .8);
    tr(noSig, -170, -470 + 0, 0, easeBack(seg(t7, 3.1, 3.5)));
    qs.forEach((q, i) => { op(q, seg(t7, 3.4 + i * .4, 3.7 + i * .4)); });
    // camera: wide on the hunter, pan to the bushes for line 6
    const pan = easeInOut(seg(t6, -.6, .8));
    cam(world, lerp(1000, 2330, pan), lerp(560, 540, pan), lerp(1, 1.05, pan));
  } };
})();
