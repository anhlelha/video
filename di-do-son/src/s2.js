// Scene 2: dad starts the engine, family boards, dad hands the driver seat to mom.
(function () {
  const g = el('g', {}, svg); const world = el('g', {}, g);
  el('rect', { x: -400, y: -300, width: 2800, height: 1100, fill: linGrad([[0, '#8FD0EA'], [1, '#DDF1F7']]) }, world);
  [[300, 160, 1], [1100, 120, .8]].forEach(([x, y, s]) => tr(makeCloud(world, s, '#fff'), x, y));
  el('rect', { x: -400, y: 700, width: 2800, height: 700, fill: '#8CC56B' }, world);
  el('rect', { x: -400, y: 820, width: 2800, height: 160, fill: '#C9C1B3' }, world);
  const carW = el('g', {}, world);
  const car = makeCar(carW, '#D94F3D');
  const H = { ong: seat(car, 'ong', -110, -212), gai: seat(car, 'gai', -175, -196), trai: seat(car, 'trai', -60, -200), me: seat(car, 'me', 70, -212), bo: seat(car, 'bo', 40, -212) };
  const puffs = []; for (let i = 0; i < 6; i++) puffs.push(puff(world));
  // walkers boarding
  const W = { ong: makeFam(world, 'ong'), gai: makeFam(world, 'gai'), trai: makeFam(world, 'trai'), me: makeFam(world, 'me') };
  // ignition close-up
  const ins = makeInset(g, 1450, 420, 250, '#3B3530', '#2B2620');
  const ig = el('g', { transform: 'translate(1450 420)' }, ins.content);
  el('circle', { r: 120, fill: '#5C5F66' }, ig); el('circle', { r: 90, fill: '#2B2620' }, ig);
  ['OFF', 'ACC', 'ON', 'START'].forEach((s, i) => { const a = (-60 + i * 40) * Math.PI / 180; txt(ig, Math.sin(a) * 160, -Math.cos(a) * 160 + 8, s, { 'font-size': 26, fill: i === 3 ? '#F2C14E' : '#D7DCE1' }); });
  const ikey = el('g', {}, ig); const kk = makeKey(ikey, 1.6); kk.setAttribute('transform', 'rotate(-90) translate(-150 0)');
  const brum = el('g', {}, g); burst(brum, 14, 110, 170, '#F2C14E'); txt(brum, 0, 22, 'BRỪM!', { 'font-size': 64, 'font-weight': 800 });
  // top-down seating chart
  const chart = el('g', {}, g);
  el('rect', { x: -330, y: -390, width: 660, height: 780, rx: 30, fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 6 }, chart);
  txt(chart, 0, -330, 'Ai ngồi ghế nào?', { 'font-size': 40, 'font-weight': 800 });
  el('rect', { x: -150, y: -280, width: 300, height: 620, rx: 110, fill: '#D94F3D', stroke: '#2B2620', 'stroke-width': 6 }, chart);
  el('path', { d: 'M-120 -170 Q 0 -215 120 -170 L 110 -120 Q 0 -150 -110 -120 Z', fill: '#BFE3F2', stroke: '#2B2620', 'stroke-width': 4 }, chart);
  const seatPos = { L: [-62, -40], R: [62, -40], B1: [-80, 150], B2: [0, 150], B3: [80, 150] };
  Object.values(seatPos).forEach(([x, y]) => el('rect', { x: x - 44, y: y - 44, width: 88, height: 96, rx: 18, fill: '#8C2F25' }, chart));
  el('circle', { cx: -62, cy: -100, r: 34, fill: 'none', stroke: '#2B2620', 'stroke-width': 9 }, chart);
  const lblL = txt(chart, -250, -40, 'Lái chính', { 'font-size': 30, fill: '#2B2620' });
  const lblR = txt(chart, 250, -40, 'Ghế phụ', { 'font-size': 30, fill: '#2B2620' });
  const ava = {};
  [['bo', 'Bố'], ['me', 'Mẹ'], ['ong', 'Ông'], ['gai', 'Gái'], ['trai', 'Trai']].forEach(([k, n]) => {
    const a = el('g', {}, chart); el('circle', { r: 40, fill: FAM[k].shirt, stroke: '#fff', 'stroke-width': 5 }, a);
    txt(a, 0, 10, n, { 'font-size': 26, fill: '#fff', 'font-weight': 800 }); ava[k] = a;
  });
  SC[2] = { g, render(t, lt) {
    const t7 = L(t, 7), t8 = L(t, 8);
    // ignition inset: key turns, engine catches
    const insOn = easeBack(seg(lt, .2, .7)) * (1 - easeIn(seg(t7, 1.4, 1.9)));
    show(ins.g, insOn > .01); ins.g.setAttribute('transform', `translate(1450 420) scale(${insOn}) translate(-1450 -420)`);
    const turn = easeOut(seg(lt, 1.0, 1.6)) * 120 - Math.max(0, Math.sin(seg(lt, 1.6, 2.3) * Math.PI)) * 0;
    ikey.setAttribute('transform', `rotate(${-60 + turn + (lt > 1.6 && lt < 2.6 ? Math.sin(t * 60) * 3 : 0)})`);
    const br = easeBack(seg(lt, 1.6, 1.9)) * (1 - seg(t7, 1.2, 1.6));
    show(brum, br > .01); tr(brum, 1150, 200, Math.sin(t * 30) * 3, br);
    // car idles (shakes) once started
    const on = lt > 1.6;
    tr(carW, 640, 900 + (on ? Math.sin(t * 50) * 1.5 : 0), on ? Math.sin(t * 37) * .3 : 0, 1.2);
    car.setDoor(1 - easeInOut(seg(t8, 3.0, 3.6)));
    puffs.forEach((p, i) => { const k = ((t * 1.2 + i / 6) % 1); tr(p, 640 - 390 * 1.2 - k * 220, 900 - 60 - k * 90, 0, .4 + k * 1.2); op(p, on ? (1 - k) * .8 : 0); });
    // boarding: grandpa + kids into the back, mom waits by the front door
    const board = [['trai', 3.0, -80], ['gai', 3.4, -40], ['ong', 3.8, 0]];
    board.forEach(([k, st, dx], i) => {
      const p = seg(lt, st, st + 1.8); const w = W[k];
      place(w, lerp(-150 + dx, 420 + dx * .3, easeInOut(p)), 1000);
      if (p < 1) walk(w, t * 12, 24); else still(w);
      show(w.g, p < 1); show(H[k].g, p >= 1);
      if (p >= 1) H[k].body.setAttribute('transform', `translate(0 ${-easeOut(seg(lt, st + 1.8, st + 2.2)) * 0})`);
      talk(w, t, 99);
    });
    const mp = seg(lt, 4.2, 6.4); const mIn = seg(t8, 2.0, 2.4);
    place(W.me, lerp(-150, 930, easeInOut(mp)), 1000); show(W.me.g, mIn < 1);
    if (mp > 0 && mp < 1) walk(W.me, t * 11, 22); else still(W.me, { aR: t8 > 0 ? -30 : -6 });
    setMouth(W.me, 'smile');
    // dad in front window: driver until line 8, then mom takes over
    const swap = t8 > 2.2;
    H.bo.at(swap ? -10 : 70, -212); show(H.me.g, swap);
    talk(H.bo, t, t8 > 0 ? 8 : 7);
    // seating chart
    const ch = easeBack(seg(t8, -.6, -.1));
    show(chart, ch > .01); tr(chart, 1450, 500, 0, ch);
    const pos = (k, xy) => tr(ava[k], xy[0], xy[1]);
    const bo = easeInOut(seg(t8, .6, 1.5));
    const boXY = [lerp(-62, 62, bo), -40 - Math.sin(bo * Math.PI) * 60];
    pos('bo', boXY);
    const me = easeInOut(seg(t8, 1.4, 2.3));
    pos('me', [lerp(-260, -62, me), lerp(80, -40, me)]); op(ava.me, seg(t8, 1.2, 1.5));
    pos('ong', seatPos.B2); pos('gai', seatPos.B1); pos('trai', seatPos.B3);
    op(ava.ong, 1); op(ava.gai, 1); op(ava.trai, 1);
    lblL.setAttribute('fill', me > .9 ? '#D94F3D' : '#2B2620'); lblR.setAttribute('fill', bo > .9 ? '#3E7CB1' : '#2B2620');
    cam(world, lerp(960, 820, easeInOut(seg(t8, -.6, .2))), 560, 1);
  } };
})();
