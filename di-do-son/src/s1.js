// Scene 1: living room -> yard. Grandpa announces, everyone cheers, key relay girl -> boy -> dad.
(function () {
  const g = el('g', {}, svg); const world = el('g', {}, g);
  // yard (right part)
  el('rect', { x: 1900, y: -300, width: 2600, height: 1200, fill: linGrad([[0, '#8FD0EA'], [1, '#DDF1F7']]) }, world);
  el('circle', { cx: 3500, cy: 180, r: 80, fill: '#FCE38A' }, world);
  [[2400, 200, 1], [3100, 300, .8], [3900, 160, 1.1]].forEach(([x, y, s]) => tr(makeCloud(world, s, '#fff'), x, y));
  el('rect', { x: 1900, y: 760, width: 2600, height: 600, fill: '#8CC56B' }, world);
  el('rect', { x: 2300, y: 880, width: 1700, height: 120, fill: '#C9C1B3' }, world);
  [2250, 4050, 4300].forEach(x => { const t = el('g', { transform: `translate(${x} 800)` }, world); el('rect', { x: -16, y: -220, width: 32, height: 220, fill: '#7A5634' }, t); [[0, -260, 100], [-80, -210, 70], [80, -210, 70]].forEach(([cx, cy, r]) => el('circle', { cx, cy, r, fill: '#5E9E4A' }, t)); });
  // living room
  el('rect', { x: -400, y: -300, width: 2300, height: 1200, fill: '#F4E3C3' }, world);
  for (let x = -400; x < 1900; x += 90) el('rect', { x, y: -300, width: 45, height: 1110, fill: 'rgba(214,180,130,.18)' }, world);
  el('rect', { x: -400, y: 810, width: 2300, height: 500, fill: '#B98650' }, world);
  el('rect', { x: -400, y: 800, width: 2300, height: 18, fill: '#8C5A2B' }, world);
  // window with summer -> autumn tree
  el('rect', { x: 640, y: 200, width: 360, height: 280, rx: 10, fill: '#BFE3F2', stroke: '#8C5A2B', 'stroke-width': 14 }, world);
  el('line', { x1: 820, y1: 200, x2: 820, y2: 480, stroke: '#8C5A2B', 'stroke-width': 10 }, world);
  const leaves = []; for (let i = 0; i < 5; i++) leaves.push(el('ellipse', { rx: 12, ry: 7, fill: '#E8743B' }, world));
  // calendar
  const cal = el('g', { transform: 'translate(1180 300)' }, world);
  el('rect', { x: -90, y: -70, width: 180, height: 170, rx: 8, fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 5 }, cal);
  el('rect', { x: -90, y: -70, width: 180, height: 46, rx: 8, fill: '#D94F3D' }, cal);
  const calTxt = txt(cal, 0, -36, 'THÁNG 8', { 'font-size': 26, fill: '#fff' });
  const calNum = txt(cal, 0, 70, '31', { 'font-size': 84, 'font-weight': 800 });
  // sofa
  const sofa = el('g', { transform: 'translate(1000 810)' }, world);
  el('rect', { x: -330, y: -200, width: 660, height: 120, rx: 40, fill: '#6C8EBF' }, sofa);
  el('rect', { x: -360, y: -110, width: 720, height: 110, rx: 30, fill: '#5A7BAD' }, sofa);
  // key hook
  const hook = el('g', { transform: 'translate(150 470)' }, world);
  el('rect', { x: -70, y: -30, width: 140, height: 40, rx: 8, fill: '#8C5A2B' }, hook);
  [-40, 0, 40].forEach(x => el('path', { d: `M${x} 10 l 0 22 q 0 10 10 6`, fill: 'none', stroke: '#5C5F66', 'stroke-width': 5 }, hook));
  txt(hook, 0, -46, 'CHÌA KHOÁ', { 'font-size': 22, fill: '#8C5A2B' });
  // door to the yard
  el('rect', { x: 1860, y: 300, width: 60, height: 520, fill: '#8C5A2B' }, world);
  // car in the yard
  const car = makeCar(world, '#D94F3D'); tr(car.g, 3330, 945);
  // family
  const F = { trai: makeFam(world, 'trai'), gai: makeFam(world, 'gai'), me: makeFam(world, 'me'), ong: makeFam(world, 'ong'), bo: makeFam(world, 'bo') };
  const key = makeKey(world, .9);
  // postcard "Đồ Sơn"
  const card = el('g', {}, g);
  el('rect', { x: -210, y: -140, width: 420, height: 280, rx: 14, fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 6 }, card);
  el('rect', { x: -190, y: -120, width: 380, height: 180, fill: '#8FD0EA' }, card);
  el('circle', { cx: 110, cy: -70, r: 34, fill: '#FCE38A' }, card);
  el('path', { d: 'M-190 10 Q -120 -10 -60 10 T 70 10 T 190 10 L 190 60 L -190 60 Z', fill: '#2E86AB' }, card);
  el('path', { d: 'M-190 40 Q -60 20 190 46 L 190 60 L -190 60 Z', fill: '#F3D9A4' }, card);
  txt(card, 0, 115, 'ĐỒ SƠN 🏖', { 'font-size': 46, 'font-weight': 800, fill: '#D94F3D' });
  const confetti = el('g', {}, g); const conf = [];
  const cc = ['#D94F3D', '#F2C14E', '#2DA44E', '#3E7CB1', '#F49AC1'];
  for (let i = 0; i < 70; i++) conf.push(el('rect', { x: -7, y: -4, width: 14, height: 8, fill: cc[i % 5] }, confetti));
  const yeah = txt(g, 0, 50, 'YEEE!', { 'font-size': 150, 'font-weight': 800, fill: '#F2C14E', stroke: '#2B2620', 'stroke-width': 8, 'paint-order': 'stroke' });
  const dust = []; for (let i = 0; i < 8; i++) dust.push(puff(world));
  let holder = null;
  const fy = x => lerp(860, 1010, easeInOut(seg(x, 1900, 2500)));
  SC[1] = { g, render(t, lt) {
    const t1 = L(t, 1), t2 = L(t, 2), t3 = L(t, 3), t4 = L(t, 4), t5 = L(t, 5), t6 = L(t, 6);
    // calendar flips 31/8 -> 1/9 ("hè đi thu tới"), leaves fall outside the window
    const flip = t1 > 3.2;
    calTxt.textContent = flip ? 'THÁNG 9' : 'THÁNG 8'; calNum.textContent = flip ? '1' : '31';
    cal.setAttribute('transform', `translate(1180 300) rotate(${Math.sin(seg(t1, 3.0, 3.6) * Math.PI) * 8})`);
    leaves.forEach((lf, i) => { const p = ((t * .25 + i * .2) % 1); lf.setAttribute('transform', `translate(${660 + i * 70 + Math.sin(t * 2 + i) * 20} ${210 + p * 260}) rotate(${t * 90 + i * 40})`); op(lf, seg(t1, 3.2, 3.8) * (p < .92 ? 1 : 0)); });
    // cheering jump
    const cheer = seg(t2, -.1, 3.4);
    const jump = (i) => cheer > 0 && cheer < 1 ? -Math.abs(Math.sin(t2 * 7 + i)) * 40 : 0;
    const up = cheer > 0 && cheer < 1 ? -160 : 0;
    // grandpa
    place(F.ong, 960, 860 + jump(0));
    still(F.ong, { aL: 10, aR: t1 > 0 && t2 < 0 ? -150 + Math.sin(t * 6) * 12 : (up ? -160 : -8), h: Math.sin(t * 2) * 4 });
    talk(F.ong, t, 1);
    // dad: stands, then walks out to the car (line 5) and waits for the key
    const dW = seg(t5, .2, 4.4);
    const dX = lerp(1220, 3000, easeInOut(dW)); place(F.bo, dX, fy(dX) + jump(1));
    if (dW > 0 && dW < 1) walk(F.bo, t * 9, 22); else still(F.bo, { aL: up ? 160 : 8, aR: up ? -160 : (t6 > 1.6 ? -60 : -8) });
    talk(F.bo, t, 99, cheer > 0 && cheer < 1 ? 'o' : 'smile');
    // mom
    place(F.me, 1420, 860 + jump(2)); still(F.me, { aL: up ? 160 : 6, aR: up ? -160 : -6, h: -4 });
    setMouth(F.me, cheer > 0 && cheer < 1 ? 'o' : 'smile');
    // girl: runs to the hook (line 3), grabs key, runs to her brother (gap), hands it over (line 4)
    let gx = 700, gRun = false, gArm = null;
    const a1 = seg(t3, -.1, 1.6), a2 = seg(t4, -2.4, -.3);
    if (a1 > 0) { gx = lerp(700, 205, easeInOut(a1)); gRun = a1 < 1; }
    if (t3 > 1.6 && a2 <= 0) gArm = -170 + Math.sin(t * 8) * 6;  // reaching up
    if (a2 > 0) { gx = lerp(205, 1520, easeInOut(a2)); gRun = a2 < 1; gArm = gRun ? -30 : null; }
    if (t4 > 0 && t4 < 2.6) gArm = -80;
    place(F.gai, gx, 860 + jump(3), gx < 690 && a2 <= 0 ? -1 : 1);
    if (gRun) walk(F.gai, t * 14, 32, gArm); else still(F.gai, { aL: up ? 160 : 8, aR: gArm != null ? gArm : (up ? -160 : -8) });
    talk(F.gai, t, t3 < 4 ? 3 : 4, cheer > 0 && cheer < 1 ? 'o' : 'smile');
    // boy: by the door; takes key, runs to the car, opens door (line 5), hands key to dad (line 6)
    let bx = 1620, bRun = false, bArm = null;
    const b1 = seg(t5, .1, 3.3);
    if (b1 > 0) { bx = lerp(1620, 3150, easeInOut(b1)); bRun = b1 < 1; }
    if (t4 > 1.1 && t5 < .1) bArm = -80;
    if (t5 > 3.3 && t6 < 1.0) bArm = -120;     // opening the door
    if (t6 > 1.0) bArm = -95;                   // handing the key up
    place(F.trai, bx, fy(bx) + jump(4), (t4 > 0 && t5 < 0) || t6 > .3 ? -1 : 1);
    if (bRun) walk(F.trai, t * 13, 30, -40); else still(F.trai, { aL: up ? 160 : 8, aR: bArm != null ? bArm : (up ? -160 : -8) });
    talk(F.trai, t, t5 < 3 ? 5 : 6, cheer > 0 && cheer < 1 ? 'o' : 'smile');
    car.setDoor(easeOut(seg(t5, 3.4, 4.2)));
    // key holder relay
    let h = null;
    if (t3 > 1.75) h = F.gai;
    if (t4 > 1.2) h = F.trai;
    if (t6 > 1.7) h = F.bo;
    if (!h) { show(key, true); if (key.parentNode !== world) world.appendChild(key); tr(key, 150, 520, 90); }
    else if (holder !== h) { h.armR.appendChild(key); }
    if (h) key.setAttribute('transform', `translate(0 118) rotate(80) scale(${.9 / h.s})`);
    holder = h;
    // dust behind runners
    dust.forEach((d, i) => {
      const who = i < 4 ? F.gai : F.trai, run = i < 4 ? gRun : bRun;
      const p = ((t * 3 + i * .25) % 1);
      const m = who.g.getAttribute('transform').match(/translate\(([-\d.]+) ([-\d.]+)\)/);
      const dir = i < 4 && a2 <= 0 ? 1 : -1;
      tr(d, +m[1] + dir * (40 + p * 120), +m[2] - 10 - p * 30, 0, .6 + p * .6); op(d, run ? (1 - p) * .8 : 0);
    });
    // postcard pops near grandpa when he says "Đồ Sơn"
    const cp = easeBack(seg(t1, 4.2, 4.7)) * (1 - easeIn(seg(t2, 2.6, 3.2)));
    show(card, cp > .01); tr(card, 1380, 330, -6 + Math.sin(t * 2) * 2, cp);
    // confetti + YEEE
    show(confetti, cheer > 0 && t2 < 5.5); show(yeah, cheer > 0 && cheer < 1);
    tr(yeah, 960, 230, Math.sin(t2 * 9) * 4, easeBack(seg(t2, 0, .35)));
    conf.forEach((c, i) => {
      const p = t2 + rnd(i) * .6; const x = 960 + (rnd(i + 1) - .5) * 1700 * Math.min(1, p * 1.5);
      const y = 1100 - 1400 * p + 900 * p * p * (1 + rnd(i + 2));
      c.setAttribute('transform', `translate(${x} ${y}) rotate(${p * 600 * (rnd(i + 3) - .5)})`);
    });
    // camera: room -> follow girl to hook -> back -> pan to yard
    let cx = 960, cy = 540, s = 1;
    const k1 = easeInOut(seg(t3, 0, 1.6)) * (1 - easeInOut(seg(t4, -2.4, -.4)));
    cx = lerp(cx, 620, k1); s = lerp(s, 1.12, k1);
    const k2 = easeInOut(seg(t5, .2, 3.6));
    cx = lerp(cx, 2950, k2); cy = lerp(cy, 560, k2);
    const k3 = easeInOut(seg(t6, -.6, 1.2)); s = lerp(s, 1.25, k3); cx = lerp(cx, 3130, k3); cy = lerp(cy, 700, k3);
    cam(world, cx, cy, s);
  } };
})();
