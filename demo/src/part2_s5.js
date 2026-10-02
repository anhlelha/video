// ===================== SCENE 5: the old days (47.2 – 74.6) =====================
function oldFilm(S) {
  const content = el('g', { filter: 'url(#oldfilm)' }, S.g);
  el('rect', { x: -100, y: -100, width: 2200, height: 1300, fill: '#EDE3CF' }, content);
  const top = el('g', {}, S.g);
  const grain = el('rect', { x: 0, y: 0, width: 1920, height: 1080, filter: 'url(#grain)', opacity: .14 }, top);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: 'url(#vignette)' }, top);
  const scratch = el('line', { y1: 0, y2: 1080, stroke: '#fff', 'stroke-width': 2, opacity: .3 }, top);
  const flick = el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#000', opacity: 0 }, top);
  const turb = document.getElementById('grainTurb');
  const update = t => {
    const f = Math.floor(t * 24);
    turb.setAttribute('seed', f % 17);
    flick.setAttribute('opacity', .04 + .06 * rnd(f));
    const sx = rnd(Math.floor(t * 3)) * 1920;
    scratch.setAttribute('x1', sx); scratch.setAttribute('x2', sx + 6);
    scratch.setAttribute('opacity', rnd(f + 3) > .5 ? .3 : 0);
    S.g.setAttribute('transform', `translate(0 ${rnd(f + 7) > .85 ? 3 : 0})`);
    void grain;
  };
  return { content, top, update };
}
function makeOldCar(parent) {
  const g = el('g', {}, parent);
  el('path', { d: 'M-260 0 L-260 -90 L-120 -90 L-120 -230 L80 -230 L80 -90 L230 -90 C260 -90 270 -60 270 -30 L270 0 Z', fill: '#2F2B28' }, g);
  el('rect', { x: -100, y: -210, width: 160, height: 100, fill: '#C9C2B4' }, g);
  el('rect', { x: 160, y: -86, width: 40, height: 50, fill: '#8C8476' }, g);
  [-170, 170].forEach(x => {
    const w = el('g', { transform: `translate(${x} 10)` }, g);
    el('circle', { r: 72, fill: 'none', stroke: '#1E1B19', 'stroke-width': 16 }, w);
    for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5; el('line', { x1: 0, y1: 0, x2: Math.cos(a) * 64, y2: Math.sin(a) * 64, stroke: '#3A3530', 'stroke-width': 5 }, w); }
    el('circle', { r: 12, fill: '#1E1B19' }, w);
  });
  return g;
}
function makeWorker(parent, x, y, s) {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, parent);
  el('path', { d: 'M-60 200 L-50 40 C-40 0 40 0 50 40 L60 200 Z', fill: '#3A3530' }, g);
  el('circle', { cx: 0, cy: -20, r: 40, fill: '#D8C8B0' }, g);
  el('ellipse', { cx: 0, cy: -52, rx: 58, ry: 10, fill: '#1E1B19' }, g);
  el('path', { d: 'M-34 -52 C-34 -100 34 -100 34 -52 Z', fill: '#1E1B19' }, g);
  const arm = el('g', {}, g);
  el('line', { x1: 40, y1: 60, x2: 120, y2: 40, stroke: '#3A3530', 'stroke-width': 26, 'stroke-linecap': 'round' }, arm);
  el('rect', { x: 110, y: 10, width: 16, height: 70, fill: '#5A4A3A' }, arm);
  el('rect', { x: 96, y: 0, width: 44, height: 24, fill: '#2A2522' }, arm);
  return { g, arm };
}

(() => {
  // 5a old workshop (47.2 – 50.6)
  const S = scene(47.2, 50.6, '#000');
  const F = oldFilm(S), g = F.content;
  for (let r = 0; r < 14; r++) for (let c = 0; c < 18; c++)
    el('rect', { x: c * 120 - (r % 2) * 60, y: r * 60, width: 112, height: 52, fill: r * 7 + c % 3 ? '#B9A88E' : '#A8977E' }, g);
  el('rect', { x: 0, y: 820, width: 1920, height: 260, fill: '#5A5046' }, g);
  const car = makeOldCar(g); car.setAttribute('transform', 'translate(960 760)');
  const w1 = makeWorker(g, 520, 600, 1.1), w2 = makeWorker(g, 1440, 610, 1.05);
  w2.g.setAttribute('transform', 'translate(1440 610) scale(-1.05 1.05)');
  S.r = t => {
    F.update(t);
    w1.arm.setAttribute('transform', `rotate(${Math.max(0, Math.sin(t * 6)) * -30} 40 60)`);
    w2.arm.setAttribute('transform', `rotate(${Math.max(0, Math.sin(t * 5 + 1)) * -30} 40 60)`);
    g.setAttribute('opacity', t < 47.6 ? (Math.floor(t * 20) % 2 ? .3 : .8) : 1);
  };
})();

(() => {
  // 5b calendar torn slowly (50.6 – 57.8)
  const S = scene(50.6, 57.8, '#000');
  const F = oldFilm(S), g = F.content;
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#CBBFA8' }, g);
  el('path', { d: 'M0 0 L260 0 L0 220 Z M0 0 L180 160 M0 0 L80 210 M60 50 L20 110 M120 100 L50 160', fill: 'none', stroke: '#8C8476', 'stroke-width': 3 }, g);
  const years = [1908, 1914, 1920, 1927, 1933, 1940, 1948];
  const pages = [];
  el('rect', { x: 640, y: 170, width: 640, height: 700, rx: 10, fill: '#E9E1D0', stroke: '#6E665A', 'stroke-width': 6 }, g);
  for (let i = years.length - 1; i >= 0; i--) {
    const p = el('g', {}, g);
    el('rect', { x: 660, y: 240, width: 600, height: 610, fill: '#F4EEE2', stroke: '#9C9384', 'stroke-width': 3 }, p);
    el('rect', { x: 660, y: 240, width: 600, height: 120, fill: '#5A5046' }, p);
    el('text', { x: 960, y: 322, 'text-anchor': 'middle', 'font-size': 56, 'font-weight': 700, fill: '#F4EEE2' }, p).textContent = 'NĂM';
    el('text', { x: 960, y: 640, 'text-anchor': 'middle', 'font-size': 220, 'font-weight': 800, fill: '#2F2B28' }, p).textContent = years[i];
    pages[i] = p;
  }
  for (let i = 0; i < 8; i++) el('circle', { cx: 700 + i * 74, cy: 200, r: 14, fill: '#3A3530' }, g);
  S.r = t => {
    F.update(t);
    pages.forEach((p, i) => {
      const at = 51.2 + i * .95, k = seg(t, at, at + .7);
      if (i === years.length - 1) { p.setAttribute('transform', ''); return; }
      p.setAttribute('transform', `translate(${k * 120} ${easeIn(k) * 900}) rotate(${k * 28} 960 240)`);
      p.setAttribute('opacity', 1 - seg(t, at + .45, at + .7));
    });
  };
})();

(() => {
  // 5c intermittent wiper + patent (57.8 – 64.2)
  const S = scene(57.8, 64.2, '#000');
  const F = oldFilm(S), g = F.content;
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#7D776C' }, g);
  const glass = el('g', {}, g);
  el('path', { d: 'M260 940 L420 140 L1500 140 L1660 940 Z', fill: '#8E887C', stroke: '#2F2B28', 'stroke-width': 36, 'stroke-linejoin': 'round' }, glass);
  const drops = [];
  const PV = [960, 900], LEN = 600;
  for (let i = 0; i < 90; i++) {
    const a = -Math.PI + .15 + rnd(i) * (Math.PI - .3), r = 160 + rnd(i + 90) * 420;
    drops.push({ x: PV[0] + Math.cos(a) * r, y: PV[1] + Math.sin(a) * r, a, birth: 57.8 + rnd(i + 180) * 1.6, period: 1.6 + rnd(i + 270), n: el('ellipse', { rx: 9, ry: 13, fill: '#F4F0E6' }, g) });
  }
  const wiper = el('g', {}, g);
  el('line', { x1: 0, y1: 0, x2: LEN, y2: 0, stroke: '#1E1B19', 'stroke-width': 16, 'stroke-linecap': 'round' }, wiper);
  el('rect', { x: 120, y: -10, width: LEN - 140, height: 20, rx: 6, fill: '#2F2B28' }, wiper);
  el('rect', { x: 0, y: 940, width: 1920, height: 140, fill: '#2F2B28' }, g);
  // patent sheet
  const sheet = el('g', {}, g);
  el('rect', { x: 460, y: 160, width: 1000, height: 740, fill: '#E9E1D0', stroke: '#6E665A', 'stroke-width': 6 }, sheet);
  el('text', { x: 960, y: 250, 'text-anchor': 'middle', 'font-size': 46, 'font-weight': 700, fill: '#2F2B28' }, sheet).textContent = 'CẦN GẠT NƯỚC GIÁN ĐOẠN';
  el('path', { d: 'M560 780 A 400 400 0 0 1 1360 780', fill: 'none', stroke: '#6E665A', 'stroke-width': 4, 'stroke-dasharray': '14 10' }, sheet);
  el('line', { x1: 960, y1: 780, x2: 700, y2: 440, stroke: '#2F2B28', 'stroke-width': 10 }, sheet);
  el('circle', { cx: 960, cy: 780, r: 22, fill: '#2F2B28' }, sheet);
  [[1120, 420], [1180, 520], [1240, 640]].forEach(([x, y], i) => { el('rect', { x, y, width: 120, height: 50, fill: 'none', stroke: '#6E665A', 'stroke-width': 4 }, sheet); el('line', { x1: x, y1: y + 25, x2: x - 60, y2: y + 40 + i * 20, stroke: '#6E665A', 'stroke-width': 3 }, sheet); });
  const stamp = el('g', {}, S.g); // outside the film filter: keeps its red
  el('rect', { x: -230, y: -70, width: 460, height: 140, rx: 14, fill: 'none', stroke: '#C62828', 'stroke-width': 12 }, stamp);
  el('text', { x: 0, y: 32, 'text-anchor': 'middle', 'font-size': 96, 'font-weight': 800, fill: '#C62828' }, stamp).textContent = 'PATENT';
  // wiper angle: sweep 0.9s, pause 1.3s
  const wAng = t => {
    const u = t - 58.3; if (u < 0) return -Math.PI + .12;
    const ph = u % 2.2; if (ph > .9) return -Math.PI + .12;
    const k = Math.sin(ph / .9 * Math.PI); return -Math.PI + .12 + k * (Math.PI - .24);
  };
  S.r = t => {
    F.update(t);
    const wa = wAng(t);
    wiper.setAttribute('transform', `translate(${PV[0]} ${PV[1]}) rotate(${wa * 180 / Math.PI})`);
    drops.forEach(d => {
      let last = -1;   // last time the wiper crossed this drop
      for (let s = Math.max(57.8, t - 2.4); s <= t; s += 1 / 30) {
        const s2 = s + 1 / 30, a1 = wAng(s), a2 = wAng(s2);
        if ((a1 - d.a) * (a2 - d.a) <= 0 && a1 !== a2) last = s2;
      }
      const born = d.birth + Math.max(0, Math.floor((t - d.birth) / d.period)) * d.period;
      const visible = t >= d.birth && born > last;
      d.n.setAttribute('cx', d.x); d.n.setAttribute('cy', d.y + ((t - born) * 20) % 30);
      d.n.setAttribute('opacity', visible ? .9 : 0);
    });
    const sp = easeOut(seg(t, 62.6, 63.1));
    sheet.setAttribute('transform', `translate(0 ${(1 - sp) * 1100})`);
    const st = seg(t, 63.3, 63.5);
    stamp.setAttribute('transform', `translate(1260 760) rotate(-12) scale(${t < 63.3 ? 0 : lerp(2, 1, easeOut(st))})`);
    stamp.setAttribute('opacity', t < 63.3 ? 0 : .9);
  };
})();

(() => {
  // 5d Ford + courtroom (64.2 – 70.6)
  const S = scene(64.2, 70.6, '#000');
  const F = oldFilm(S), g = F.content;
  const carG = el('g', {}, g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#B9AE98' }, carG);
  el('rect', { x: 0, y: 820, width: 1920, height: 260, fill: '#6E665A' }, carG);
  const car = makeOldCar(carG);
  const plate = el('g', {}, carG);
  el('rect', { x: -110, y: -40, width: 220, height: 80, rx: 40, fill: '#E9E1D0', stroke: '#2F2B28', 'stroke-width': 6 }, plate);
  el('text', { x: 0, y: 16, 'text-anchor': 'middle', 'font-size': 48, 'font-weight': 800, fill: '#2F2B28' }, plate).textContent = 'Ford';
  const court = el('g', {}, g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#A89A80' }, court);
  for (let i = 0; i < 9; i++) el('rect', { x: i * 220, y: 0, width: 30, height: 1080, fill: '#9A8C72' }, court);
  el('rect', { x: 560, y: 470, width: 800, height: 330, fill: '#5A4A3A' }, court);
  el('rect', { x: 540, y: 450, width: 840, height: 40, fill: '#4A3C2E' }, court);
  el('circle', { cx: 960, cy: 360, r: 70, fill: '#D8C8B0' }, court);
  for (let i = 0; i < 6; i++) el('circle', { cx: 900 + (i % 2) * 120, cy: 300 + Math.floor(i / 2) * 50, r: 30, fill: '#F4EEE2' }, court);
  el('path', { d: 'M860 450 C 860 400, 1060 400, 1060 450 Z', fill: '#1E1B19' }, court);
  const gavel = el('g', {}, court);
  el('rect', { x: -10, y: -10, width: 150, height: 20, rx: 6, fill: '#3A3530' }, gavel);
  el('rect', { x: 120, y: -40, width: 50, height: 80, rx: 10, fill: '#2A2522' }, gavel);
  el('rect', { x: 1180, y: 430, width: 120, height: 24, rx: 6, fill: '#2A2522' }, court);
  const lawyers = [makeWorker(court, 360, 760, 1.2), makeWorker(court, 1560, 760, 1.2)];
  lawyers[1].g.setAttribute('transform', 'translate(1560 760) scale(-1.2 1.2)');
  const calG = el('g', { transform: 'translate(1620 230)' }, court);
  el('rect', { x: -130, y: -110, width: 260, height: 220, fill: '#F4EEE2', stroke: '#2F2B28', 'stroke-width': 5 }, calG);
  el('rect', { x: -130, y: -110, width: 260, height: 50, fill: '#5A5046' }, calG);
  const calYear = el('text', { x: 0, y: 70, 'text-anchor': 'middle', 'font-size': 84, 'font-weight': 800, fill: '#2F2B28' }, calG);
  const HITS = [67.3, 68.7, 70.05];
  S.r = t => {
    F.update(t);
    const onCar = t < 66.4;
    show(carG, onCar); show(court, !onCar);
    car.setAttribute('transform', `translate(${lerp(-300, 960, easeOut(seg(t, 64.2, 65.6)))} 760)`);
    plate.setAttribute('transform', `translate(${lerp(-300, 960, easeOut(seg(t, 64.2, 65.6))) + 180} 640) scale(${easeBack(seg(t, 65.0, 65.4))})`);
    let ang = -50;
    HITS.forEach(h => { if (t > h - .3 && t < h + .25) ang = t < h ? lerp(-50, 10, easeIn(seg(t, h - .3, h))) : lerp(10, -50, seg(t, h, h + .25)); });
    gavel.setAttribute('transform', `translate(1120 430) rotate(${ang} 0 0) translate(-140 0)`);
    const yrs = [1978, 1982, 1986, 1990];
    const k = t < 67.6 ? 0 : t < 68.7 ? 1 : t < 69.7 ? 2 : 3;
    calYear.textContent = yrs[k];
    lawyers.forEach((l, i) => l.arm.setAttribute('transform', `rotate(${Math.sin(t * 4 + i * 2) * -20} 40 60)`));
  };
})();

(() => {
  // 5e text card (70.6 – 74.6)
  const S = scene(70.6, 74.6, '#000');
  const a = el('text', { x: 960, y: 500, 'text-anchor': 'middle', 'font-size': 76, 'font-weight': 800, fill: '#fff' }, S.g);
  a.textContent = 'Một cái cần gạt nước.';
  const b = el('text', { x: 960, y: 620, 'text-anchor': 'middle', 'font-size': 76, 'font-weight': 800, fill: '#E8743B' }, S.g);
  b.textContent = 'Hơn 10 năm hầu toà.';
  S.r = t => { a.setAttribute('opacity', easeOut(seg(t, 70.9, 71.6))); b.setAttribute('opacity', easeOut(seg(t, 71.9, 72.6))); };
})();
