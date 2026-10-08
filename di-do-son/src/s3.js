// Scene 3: on the road to Đồ Sơn; a buffalo appears; mom can't find the brake.
(function () {
  const g = el('g', {}, svg); const world = el('g', {}, g);
  el('rect', { x: -400, y: -300, width: 2800, height: 1100, fill: linGrad([[0, '#7EC8E8'], [1, '#E2F4F8']]) }, world);
  el('circle', { cx: 1560, cy: 170, r: 70, fill: '#FCE38A' }, world);
  const far = el('g', {}, world), mid = el('g', {}, world), near = el('g', {}, world);
  for (let k = 0; k < 2; k++) el('path', { d: `M${k * 2400 - 400} 700 L ${k * 2400 - 200} 500 L ${k * 2400 + 100} 640 L ${k * 2400 + 400} 420 L ${k * 2400 + 800} 650 L ${k * 2400 + 1100} 520 L ${k * 2400 + 1500} 680 L ${k * 2400 + 1800} 470 L ${k * 2400 + 2100} 640 L ${k * 2400 + 2000} 700 Z`, fill: '#A9C9B4' }, far);
  el('rect', { x: -400, y: 690, width: 2800, height: 400, fill: '#8CC56B' }, world);
  for (let i = 0; i < 8; i++) { const x = i * 400; const tg = el('g', { transform: `translate(${x} 740)` }, mid); el('rect', { x: -10, y: -130, width: 20, height: 130, fill: '#7A5634' }, tg); el('circle', { cx: 0, cy: -160, r: 60, fill: '#5E9E4A' }, tg); el('circle', { cx: -40, cy: -130, r: 40, fill: '#6FAE57' }, tg); }
  el('rect', { x: -400, y: 790, width: 2800, height: 200, fill: '#5C5F66' }, world);
  el('rect', { x: -400, y: 790, width: 2800, height: 10, fill: '#E9E4DA' }, world);
  el('rect', { x: -400, y: 980, width: 2800, height: 10, fill: '#E9E4DA' }, world);
  const dash = el('g', {}, world);
  for (let i = 0; i < 16; i++) el('rect', { x: i * 200, y: 884, width: 110, height: 12, fill: '#F2C14E' }, dash);
  el('rect', { x: -400, y: 990, width: 2800, height: 200, fill: '#7DB85E' }, world);
  // road sign
  const sign = el('g', {}, near);
  el('rect', { x: -6, y: -230, width: 12, height: 230, fill: '#8D959E' }, sign);
  el('rect', { x: -170, y: -330, width: 340, height: 120, rx: 14, fill: '#2E7D4F', stroke: '#fff', 'stroke-width': 6 }, sign);
  txt(sign, 0, -280, 'ĐỒ SƠN', { 'font-size': 44, fill: '#fff', 'font-weight': 800 });
  txt(sign, 0, -232, '15 km →', { 'font-size': 32, fill: '#fff' });
  // buffalo
  const buf = makeBuffalo(world);
  const moo = el('g', {}, world); makeBubble(moo, 240, 100, 'Nghé ọ?', 40);
  // car
  const carW = el('g', {}, world);
  const car = makeCar(carW, '#D94F3D');
  const H = { ong: seat(car, 'ong', -110, -212), gai: seat(car, 'gai', -175, -196), trai: seat(car, 'trai', -60, -200), bo: seat(car, 'bo', -10, -212), me: seat(car, 'me', 70, -212) };
  const zin = [txt(world, 0, 0, 'zin', { 'font-size': 60, 'font-weight': 800, fill: '#fff', stroke: '#2B2620', 'stroke-width': 6, 'paint-order': 'stroke', 'font-style': 'italic' }),
    txt(world, 0, 0, 'zin~', { 'font-size': 52, 'font-weight': 800, fill: '#fff', stroke: '#2B2620', 'stroke-width': 6, 'paint-order': 'stroke', 'font-style': 'italic' })];
  const lines = []; for (let i = 0; i < 5; i++) lines.push(el('rect', { width: 120, height: 6, rx: 3, fill: '#fff', opacity: .7 }, world));
  const bang = el('g', {}, world);
  ['!', '!', '!'].forEach((s, i) => txt(bang, (i - 1) * 50, 0, s, { 'font-size': 110, 'font-weight': 800, fill: '#D94F3D', stroke: '#fff', 'stroke-width': 6, 'paint-order': 'stroke' }));
  const bub = el('g', {}, g);
  const bubBg = el('g', {}, bub); el('rect', { x: -330, y: -80, width: 660, height: 160, rx: 70, fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 7 }, bubBg);
  el('path', { d: 'M-120 76 L -190 150 L -40 76 Z', fill: '#FFFDF6', stroke: '#2B2620', 'stroke-width': 7, 'stroke-linejoin': 'round' }, bubBg);
  el('rect', { x: -124, y: 66, width: 88, height: 14, fill: '#FFFDF6' }, bubBg);
  const bubT = txt(bub, 0, 26, '', { 'font-size': 66, 'font-weight': 800, fill: '#D94F3D' });
  // pedals close-up
  const ped = makeInset(g, 1640, 300, 200, '#3B3530', '#F2C14E');
  const pg = el('g', { transform: 'translate(1640 300)' }, ped.content);
  ['Côn?', 'Phanh?', 'Ga?'].forEach((s, i) => { el('rect', { x: -130 + i * 95, y: -20, width: 70, height: 100, rx: 10, fill: '#8D959E', stroke: '#222', 'stroke-width': 4 }, pg); txt(pg, -95 + i * 95, 122, s, { 'font-size': 28, fill: '#F2C14E' }); });
  const foot = el('g', {}, pg); el('path', { d: 'M-40 -200 L 10 -200 L 14 60 Q 14 100 -26 100 L -50 100 Q -70 100 -66 70 L -44 40 Z', fill: '#F6D2B0', stroke: '#2B2620', 'stroke-width': 4 }, foot);
  el('rect', { x: -50, y: -260, width: 70, height: 120, fill: '#4A3B5C' }, foot);
  SC[3] = { g, render(t, lt) {
    const t9 = L(t, 9), t10 = L(t, 10);
    // distance travelled (car accelerates after "lên đường")
    const d0 = lt - 3.6; const dist = d0 < 0 ? 0 : d0 < 1 ? 450 * d0 * d0 : 450 + 900 * (d0 - 1);
    far.setAttribute('transform', `translate(${-(dist * .08) % 2400} 0)`);
    mid.setAttribute('transform', `translate(${-(dist * .5) % 400} 0)`);
    dash.setAttribute('transform', `translate(${-(dist % 200)} 0)`);
    tr(sign, 2300 - dist * 1.0 + 900 * 2, 800);
    const moving = d0 > 0;
    const panic = t10 > 0;
    const shake = panic ? Math.sin(t * 40) * 4 : 0;
    tr(carW, 760 + (moving ? Math.sin(t * 3) * 6 : 0), 950 + (moving ? Math.abs(Math.sin(t * 14)) * -3 : Math.sin(t * 50) * 1.2), panic ? Math.sin(t * 13) * 2 : 0);
    car.spin(dist * .9);
    car.setDoor(0);
    // faces
    Object.values(H).forEach(f => still(f, {}));
    talk(H.me, t, t10 > -.5 ? 10 : 9, panic ? 'o' : 'smile');
    if (panic) { setMouth(H.me, 'o'); setBrows(H.me, 1); setMouth(H.bo, 'o'); setBrows(H.bo, .8); setMouth(H.ong, 'o'); setMouth(H.gai, 'o'); setMouth(H.trai, 'o'); }
    else { setBrows(H.me, 0); setBrows(H.bo, 0); ['ong', 'gai', 'trai', 'bo'].forEach(k => setMouth(H[k], 'smile')); }
    H.me.at(70, -212 - (panic ? Math.abs(Math.sin(t * 20)) * 8 : 0));
    // zin zin
    zin.forEach((z, i) => { const p = ((lt * .7 + i * .5) % 1); z.setAttribute('transform', `translate(${380 - p * 300} ${780 - i * 70 - Math.sin(p * 6) * 20}) rotate(-8)`); op(z, moving && !panic ? Math.sin(p * Math.PI) : 0); });
    lines.forEach((l, i) => { const p = ((lt * 1.5 + i * .2) % 1); l.setAttribute('x', 360 - p * 500); l.setAttribute('y', 760 + i * 36); op(l, moving ? .6 * (1 - p) : 0); });
    // buffalo walks onto the road, then the car closes in
    const D10 = LINES[9].e - LINES[9].s;
    const b1 = seg(t10, -1.4, 0), b2 = seg(t10, 0, D10 + .2);
    const bx = lerp(2300, 1520, easeOut(b1)) - lerp(0, 300, easeIn(b2));
    tr(buf.g, bx, 935); show(buf.g, t10 > -1.5);
    buf.legs.forEach((lg, i) => { const base = [-80, 90, -60, 110][i]; lg.setAttribute('transform', `translate(${base} -120) rotate(${b1 < 1 ? Math.sin(t * 8 + i * 2) * 12 : 0})`); });
    buf.head.setAttribute('transform', `translate(-140 -200) rotate(${Math.sin(t * 1.5) * 4})`);
    const mo = easeBack(seg(t10, 1.0, 1.3)) * (1 - seg(t10, 2.6, 2.9));
    show(moo, mo > .01); tr(moo, bx - 80, 600, 0, mo);
    show(bang, panic); tr(bang, 820, 640 + Math.sin(t * 12) * 6, 0, easeBack(seg(t10, 0, .3)));
    // speech bubble
    const lines10 = [[.02, 'Á Á Á!!!'], [.25, 'CON TRÂU!'], [.47, 'CHỒNG ƠI!'], [.68, 'PHANH Ở ĐÂU???']].map(([f, w]) => [f * D10, w]);
    let cur = null; lines10.forEach(([s, w]) => { if (t10 > s) cur = [s, w]; });
    show(bub, !!cur && t10 < D10 + .3);
    if (cur) { bubT.textContent = cur[1]; tr(bub, 760, 300, Math.sin(t * 25) * 1.5, easeBack(seg(t10, cur[0], cur[0] + .2))); }
    // pedals: foot dithers between the three pedals
    const pd = easeBack(seg(t10, 2.6, 3.0));
    show(ped.g, pd > .01); ped.g.setAttribute('transform', `translate(1640 300) scale(${pd}) translate(-1640 -300)`);
    foot.setAttribute('transform', `translate(${28 + Math.sin(t * 9) * 95} ${-30 + Math.abs(Math.cos(t * 9)) * 20})`);
    // camera zooms in as the buffalo gets close
    const z = easeIn(seg(t10, 0, D10 + .2));
    cam(world, lerp(960, 1080, z) + shake, lerp(540, 720, z) + (panic ? Math.cos(t * 47) * 3 : 0), lerp(1, 1.35, z));
  } };
})();
