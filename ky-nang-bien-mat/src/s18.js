// Scenes 1 and 8: the living room.
const DAD = { skin: '#F1C7A3', hair: '#2B2620', shirt: '#4F7CAC', pants: '#3B3F4A', glasses: true };
const KID = { skin: '#F6D2B0', hair: '#3A2A20', shirt: '#E8743B', pants: '#3C4A63' };
function buildRoom(parent) {
  const g = el('g', {}, parent);
  el('rect', { x: -400, y: -300, width: 2720, height: 1700, fill: '#EED9B5' }, g);
  for (let i = 0; i < 26; i++) el('line', { x1: -400 + i * 110, y1: -300, x2: -400 + i * 110, y2: 780, stroke: 'rgba(160,110,60,.08)', 'stroke-width': 30 }, g);
  el('rect', { x: -400, y: 780, width: 2720, height: 700, fill: '#C79A6B' }, g);
  el('rect', { x: -400, y: 770, width: 2720, height: 18, fill: '#9C6E45' }, g);
  // window with night sky
  el('rect', { x: 200, y: 150, width: 380, height: 340, rx: 8, fill: '#7A5634' }, g);
  el('rect', { x: 218, y: 168, width: 344, height: 304, fill: linGrad([[0, '#141C36'], [1, '#2E3E6B']]) }, g);
  el('circle', { cx: 470, cy: 240, r: 34, fill: '#F6E7B0' }, g); el('circle', { cx: 486, cy: 230, r: 30, fill: '#1B2544' }, g);
  for (let i = 0; i < 14; i++) el('circle', { cx: 230 + rnd(i) * 320, cy: 180 + rnd(i + 40) * 280, r: 2 + rnd(i + 9) * 2, fill: '#F6E7B0' }, g);
  el('rect', { x: 384, y: 168, width: 12, height: 304, fill: '#7A5634' }, g); el('rect', { x: 218, y: 314, width: 344, height: 12, fill: '#7A5634' }, g);
  // wall clock
  const clock = el('g', { transform: 'translate(820 200)' }, g);
  el('circle', { r: 66, fill: '#FFFDF6', stroke: '#7A5634', 'stroke-width': 10 }, clock);
  for (let i = 0; i < 12; i++) el('line', { x1: 0, y1: -52, x2: 0, y2: -44, stroke: '#2B2620', 'stroke-width': 4, transform: `rotate(${i * 30})` }, clock);
  const hr = el('line', { x1: 0, y1: 0, x2: 0, y2: -30, stroke: '#2B2620', 'stroke-width': 7, 'stroke-linecap': 'round' }, clock);
  const mn = el('line', { x1: 0, y1: 0, x2: 0, y2: -48, stroke: '#2B2620', 'stroke-width': 5, 'stroke-linecap': 'round' }, clock);
  el('circle', { r: 6, fill: '#E8743B' }, clock);
  // old photo frame (sepia: a kid studying by an oil lamp)
  const photo = el('g', { transform: 'translate(1420 250)' }, g);
  el('rect', { x: -130, y: -100, width: 260, height: 200, fill: '#6B4A2E' }, photo);
  el('rect', { x: -112, y: -82, width: 224, height: 164, fill: '#D9C29A' }, photo);
  el('rect', { x: -90, y: 30, width: 180, height: 14, fill: '#8A6A44' }, photo);
  el('circle', { cx: -10, cy: -18, r: 18, fill: '#8A6A44' }, photo);
  el('path', { d: 'M-34 30 Q -10 -8 14 30 Z', fill: '#8A6A44' }, photo);
  el('rect', { x: 40, y: 4, width: 14, height: 26, rx: 4, fill: '#8A6A44' }, photo);
  el('ellipse', { cx: 47, cy: -4, rx: 7, ry: 11, fill: '#F2D27A' }, photo);
  el('circle', { cx: 47, cy: 0, r: 40, fill: radGrad([[0, '#F7E3A6', .7], [1, '#F7E3A6', 0]]) }, photo);
  // door with lit hallway
  el('rect', { x: 1550, y: 250, width: 270, height: 530, fill: '#7A5634' }, g);
  el('rect', { x: 1570, y: 270, width: 230, height: 510, fill: '#F2D9A6' }, g);
  el('path', { d: 'M1570 270 L 1640 300 L 1640 760 L 1570 780 Z', fill: '#A8744A' }, g);
  const people = el('g', {}, g);
  const dad = makeFigure(people, DAD); dad.g.setAttribute('transform', 'translate(1690 780)');
  const kid = makeFigure(people, KID); kid.g.setAttribute('transform', 'translate(990 700) scale(.92)');
  // desk lamp + glow
  const glow = el('ellipse', { cx: 760, cy: 560, rx: 520, ry: 330, fill: radGrad([[0, '#FFE7A8', .65], [1, '#FFE7A8', 0]]) }, g);
  el('rect', { x: 690, y: 552, width: 90, height: 16, rx: 6, fill: '#3C4A63' }, g);
  el('path', { d: 'M735 556 L 700 430 L 790 380', fill: 'none', stroke: '#3C4A63', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
  el('path', { d: 'M760 360 L 860 400 L 830 460 Z', fill: '#E8743B' }, g);
  // desk
  el('path', { d: 'M600 560 L 1320 560 L 1360 690 L 560 690 Z', fill: '#B07D52' }, g);
  el('rect', { x: 560, y: 690, width: 800, height: 120, fill: '#8E5E3A' }, g);
  el('rect', { x: 590, y: 810, width: 40, height: 120, fill: '#7A4E2E' }, g); el('rect', { x: 1290, y: 810, width: 40, height: 120, fill: '#7A4E2E' }, g);
  // notebook
  const nb = el('g', { transform: 'translate(1030 625)' }, g);
  el('path', { d: 'M-150 -50 L 150 -50 L 160 50 L -160 50 Z', fill: '#FFFDF6', stroke: '#9AA5B1', 'stroke-width': 3 }, nb);
  el('line', { x1: 0, y1: -50, x2: 0, y2: 50, stroke: '#9AA5B1', 'stroke-width': 3 }, nb);
  txt(nb, -78, -18, 'x² + 3x = 10', { 'font-size': 20, fill: '#24345C' });
  const nbLines = [];
  for (let i = 0; i < 4; i++) {
    const ln = el('line', { x1: 14, y1: -30 + i * 20, x2: 14, y2: -30 + i * 20, stroke: '#24345C', 'stroke-width': 4, 'stroke-linecap': 'round' }, nb);
    nbLines.push(ln);
  }
  const scrib = el('path', { d: 'M-130 10 q 10 -10 20 0 t 20 0 t 20 0 t 20 0 M-130 30 q 10 -10 20 0 t 20 0', fill: 'none', stroke: '#9AA5B1', 'stroke-width': 3 }, nb);
  // kid's arms: one continuous sleeve from each shoulder down to the hand on the desk
  show(kid.armL, false); show(kid.armR, false);
  const sleeve = { fill: 'none', stroke: KID.shirt, 'stroke-width': 28, 'stroke-linecap': 'round' };
  const armL = el('path', sleeve, g), armR = el('path', sleeve, g);
  const handL = el('circle', { r: 19, fill: KID.skin }, g);
  const handR = el('g', {}, g);
  const pencil = el('g', {}, handR);
  el('line', { x1: 0, y1: 0, x2: -36, y2: -62, stroke: '#F2C14E', 'stroke-width': 10, 'stroke-linecap': 'round' }, pencil);
  el('line', { x1: -36, y1: -62, x2: -42, y2: -72, stroke: '#2B2620', 'stroke-width': 6, 'stroke-linecap': 'round' }, pencil);
  const phone = el('g', {}, handR);
  el('rect', { x: -26, y: -96, width: 52, height: 92, rx: 9, fill: '#2B2620' }, phone);
  const screen = el('rect', { x: -21, y: -88, width: 42, height: 74, rx: 4, fill: '#8FD3F4' }, phone);
  el('circle', { r: 21, fill: KID.skin }, handR);
  // place hands; arms follow from the shoulders (kid at x 990, scale .92 -> shoulders at 990±46, y 472)
  function arms(lx, ly, rx, ry, rr) {
    armL.setAttribute('d', `M944 478 Q 880 575 ${lx} ${ly}`);
    armR.setAttribute('d', `M1036 478 Q 1092 575 ${rx} ${ry}`);
    handL.setAttribute('cx', lx); handL.setAttribute('cy', ly);
    tr(handR, rx, ry, rr || 0);
  }
  arms(868, 664, 1085, 632);
  // timer badge
  const timer = el('g', {}, g);
  el('rect', { x: -95, y: -40, width: 190, height: 80, rx: 40, fill: '#2B2620' }, timer);
  const timerT = txt(timer, 18, 16, '0:00', { 'font-size': 44, fill: '#FFFDF6', 'font-weight': 800 });
  el('circle', { cx: -55, cy: 0, r: 20, fill: 'none', stroke: '#F2C14E', 'stroke-width': 5 }, timer);
  const timerHand = el('line', { x1: -55, y1: 0, x2: -55, y2: -14, stroke: '#F2C14E', 'stroke-width': 4, 'stroke-linecap': 'round' }, timer);
  return { g, hr, mn, dad, kid, people, glow, nbLines, scrib, arms, pencil, phone, screen, timer, timerT, timerHand };
}

// ---------- Scene 1 ----------
(function () {
  const g = el('g', {}, svg); const world = el('g', {}, g);
  const R = buildRoom(world);
  const sigh = makeBubble(world, 220, 90, 'Haizz…', 40); 
  const flash = el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#F7EBD3' }, g);
  SC[1] = ({ g, render(t) {
    const t1 = L(t, 1), t2 = L(t, 2), t3 = L(t, 3), t4 = L(t, 4);
    // clock: slow, then racing through two minutes during line 2
    const mins = t * .5 + seg(t2, 0, 2.2) * 120;
    R.mn.setAttribute('transform', `rotate(${mins * 6})`); R.hr.setAttribute('transform', `rotate(${120 + mins * .5})`);
    // pencil tapping, then phone
    const usingPhone = t2 > 0;
    show(R.pencil, !usingPhone);
    show(R.phone, usingPhone);
    const lift = easeOut(seg(t2, 0, .4)), tap = usingPhone ? 0 : Math.max(0, Math.sin(t * 7)) * 8;
    R.arms(868, 664, lerp(1085, 1070, lift), lerp(632 - tap, 600, lift), lerp(0, -6, lift));
    R.screen.setAttribute('fill', Math.floor(t * 6) % 2 && t2 < 2.4 ? '#BDE7FA' : '#8FD3F4');
    R.nbLines.forEach((ln, i) => ln.setAttribute('x2', 14 + 120 * seg(t2, .3 + i * .4, .7 + i * .4)));
    show(R.timer, t2 > -.1 && t3 < .3); op(R.timer, seg(t2, -.1, .2));
    tr(R.timer, 1240, 440, 0, easeBack(seg(t2, -.1, .3)));
    const secs = Math.round(seg(t2, 0, 2.2) * 120);
    R.timerT.textContent = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
    R.timerHand.setAttribute('transform', `rotate(${secs * 6} -55 0)`);
    setMouth(R.kid, usingPhone && t2 > 2.2 ? 'smile' : 'flat'); setBrows(R.kid, usingPhone ? 0 : .6);
    // dad in the doorway
    const dIn = easeOut(seg(t3, -.6, .4));
    show(R.dad.g, t3 > -.6); tr(R.dad.g, lerp(1860, 1690, dIn), 780);
    pose(R.dad, { aL: 8, aR: -8, h: Math.sin(t * 1.3) * 3 });
    const sighing = seg(t3, 2.4, 3.0) * (1 - seg(t3, 4.3, 4.8));
    R.dad.body.setAttribute('transform', `translate(0 ${sighing * 10})`);
    setMouth(R.dad, sighing > .1 ? 'sigh' : 'flat'); setBrows(R.dad, .4 + sighing * .5);
    show(sigh, sighing > 0); op(sigh, sighing); tr(sigh, 1560, 330, 0, .6 + .4 * sighing);
    // camera: close on desk -> full room -> into the photo
    const out = easeInOut(seg(t3, -.4, 1.4)), into = easeInOut(seg(t4, .2, LINES[3].e - LINES[3].s + 1.2));
    let cx = lerp(990, 960, out), cy = lerp(600, 540, out), s = lerp(2.2, 1, out);
    cx = lerp(cx, 1420, into); cy = lerp(cy, 250, into); s = lerp(s, 7, easeIn(into));
    cam(world, cx, cy, s);
    op(flash, Math.max(1 - seg(t, 0, .8), seg(t4, LINES[3].e - LINES[3].s + .6, LINES[3].e - LINES[3].s + 1.3)));
  } });
})();

// ---------- Scene 8 ----------
(function () {
  const g = el('g', {}, svg); const world = el('g', {}, g);
  const R = buildRoom(world);
  show(R.timer, false); show(R.phone, false); R.nbLines.forEach(l => l.setAttribute('x2', 134));
    const chair = el('rect', { x: 1110, y: 520, width: 150, height: 40, rx: 10, fill: '#8E5E3A' }, world);
  R.g.insertBefore(chair, R.people);
  const dim = el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#1A1612' }, g);
  const card = el('g', {}, g);
  txt(card, 960, 470, 'Còn bạn,', { 'font-size': 96, fill: '#F7EBD3', 'font-weight': 800 });
  txt(card, 960, 590, 'bạn nghĩ sao?', { 'font-size': 96, fill: '#F2C14E', 'font-weight': 800 });
  const card2 = txt(card, 960, 760, 'Kỹ năng nào rồi cũng ra đi?', { 'font-size': 40, fill: 'rgba(247,235,211,.7)', 'font-weight': 400 });
  SC[8] = ({ g, render(t, lt) {
    const t25 = L(t, 25), e27 = LE(t, 27);
    const mins = t * .5; R.mn.setAttribute('transform', `rotate(${mins * 6})`); R.hr.setAttribute('transform', `rotate(${120 + mins * .5})`);
    show(R.pencil, true); R.arms(868, 664, 1085 + Math.sin(t * 1.5) * 10, 632 - Math.max(0, Math.sin(t * 6)) * 4 * (1 - seg(lt, 3, 4)));
    // dad walks in from the door, sits beside the kid
    const w = easeInOut(seg(lt, .3, 3.0)), sit = easeInOut(seg(lt, 3.0, 3.8));
    const x = lerp(1690, 1190, w);
    const step = w > 0 && w < 1 ? Math.sin(lt * 9) : 0;
    pose(R.dad, { aL: 8 + step * 10, aR: -8 + step * 10, lL: step * 14, lR: -step * 14, h: lerp(0, -8, seg(t25, 0, 1)) });
    tr(R.dad.g, x, lerp(780, 736, sit) - Math.abs(step) * 6);
    setMouth(R.dad, 'smile'); setBrows(R.dad, 0);
    setMouth(R.kid, t25 > 1 ? 'smile' : 'flat'); setBrows(R.kid, 0);
    pose(R.kid, { aL: 20, aR: -20, h: lerp(0, 6, seg(t25, .5, 1.5)) });
    // lamp warms, camera drifts in, then lights go down
    R.glow.setAttribute('opacity', .8 + .2 * Math.sin(t));
    const p = easeInOut(seg(lt, 0, 19));
    cam(world, lerp(960, 1010, p), lerp(540, 580, p), lerp(1, 1.3, p));
    op(dim, Math.max(1 - seg(lt, 0, .6), seg(e27, -.5, 1.2) * .96));
    show(card, e27 > .8); op(card, seg(e27, .8, 2.0)); op(card2, seg(e27, 2.0, 3.0) * .9);
  } });
})();
