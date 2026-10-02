// ===================== SCENE 6: now (74.6 – 114) =====================
(() => {
  // 6a AI-slide startup gets overtaken (74.6 – 86.4)
  const S = scene(74.6, 86.4, '#EAF2F8');
  const g = S.g;
  el('rect', { x: 0, y: 860, width: 1920, height: 220, fill: '#D5E1EA' }, g);
  const banner = el('g', {}, g);
  el('rect', { x: -420, y: -110, width: 840, height: 220, rx: 24, fill: '#5B4BDB' }, banner);
  el('text', { x: 0, y: -8, 'text-anchor': 'middle', 'font-size': 92, 'font-weight': 800, fill: '#fff' }, banner).textContent = 'AI Slide';
  el('text', { x: 0, y: 70, 'text-anchor': 'middle', 'font-size': 44, 'font-weight': 700, fill: C.gold }, banner).textContent = 'Series A 🎉';
  [[300, 380], [1620, 380], [300, 620], [1620, 620]].forEach(([x, y]) => {
    el('rect', { x: x - 120, y: y - 70, width: 240, height: 140, rx: 10, fill: '#fff', stroke: '#B9C6D2', 'stroke-width': 4 }, g);
    el('rect', { x: x - 90, y: y - 46, width: 120, height: 16, rx: 4, fill: '#5B4BDB' }, g);
    el('rect', { x: x - 90, y: y - 14, width: 180, height: 10, rx: 4, fill: '#C8D3DC' }, g);
    el('rect', { x: x - 90, y: y + 8, width: 150, height: 10, rx: 4, fill: '#C8D3DC' }, g);
    el('rect', { x: x - 90, y: y + 30, width: 160, height: 10, rx: 4, fill: '#C8D3DC' }, g);
  });
  const team = [['#F1C9A5', '#2B2320', '#5B4BDB'], ['#B9825A', '#1E1A18', C.orange], ['#F4D3B8', '#C99B53', '#3E9C6B']].map(([skin, hair, hoodie], i) => {
    const p = makePerson(g, { skin, hair, hoodie }); return { p, x: 760 + i * 200 };
  });
  const conf = [];
  for (let i = 0; i < 50; i++) conf.push(el('rect', { width: 14, height: 22, fill: [C.orange, C.gold, '#5B4BDB', '#3E9C6B'][i % 4] }, g));
  const cars = [['Claude', C.orange, 82.2], ['ChatGPT', '#3E9C6B', 84.6]].map(([name, col, at]) => {
    const h = el('g', {}, g);
    const c = makeCar(h, col);
    const btn = el('g', { transform: 'translate(20 -190)' }, h);
    el('rect', { x: -110, y: -34, width: 220, height: 68, rx: 34, fill: C.ink }, btn);
    el('text', { x: 0, y: 12, 'text-anchor': 'middle', 'font-size': 32, 'font-weight': 700, fill: '#fff' }, btn).textContent = 'Tạo slide';
    const chip = el('g', { transform: 'translate(0 -30)' }, h);
    el('rect', { x: -95, y: -28, width: 190, height: 56, rx: 28, fill: '#fff' }, chip);
    el('text', { x: 0, y: 12, 'text-anchor': 'middle', 'font-size': 32, 'font-weight': 800, fill: C.ink }, chip).textContent = name;
    return { h, c, at };
  });
  const lines = [0, 1, 2, 3, 4].map(() => el('line', { stroke: '#B9C6D2', 'stroke-width': 8, 'stroke-linecap': 'round' }, g));
  S.r = t => {
    const blown = easeIn(seg(t, 82.6, 84.0));
    banner.setAttribute('transform', `translate(${960 - blown * 1500} ${230 - blown * 200}) rotate(${-blown * 50})`);
    team.forEach((o, i) => {
      const jump = t < 82.4 ? Math.abs(Math.sin(t * 6 + i)) * 40 : 0;
      o.p.g.setAttribute('transform', `translate(${o.x} ${720 - jump}) scale(1.1)`);
      o.p.mouth.setAttribute('ry', t > 82.6 ? 14 : 6);
    });
    conf.forEach((c, i) => {
      const p = ((t * .35 + rnd(i)) % 1);
      c.setAttribute('x', 200 + rnd(i + 1) * 1520 + Math.sin(t * 3 + i) * 30); c.setAttribute('y', -40 + p * 1000);
      c.setAttribute('transform', `rotate(${t * 200 + i * 30} ${200 + rnd(i + 1) * 1520} ${-40 + p * 1000})`);
      c.setAttribute('opacity', t < 82.4 ? 1 : 1 - seg(t, 82.4, 82.9));
    });
    let speed = 0;
    cars.forEach(o => {
      const p = seg(t, o.at, o.at + 1.1);
      o.h.setAttribute('transform', `translate(${lerp(2400, -500, p)} 860) scale(.9)`);
      o.h.setAttribute('opacity', p > 0 && p < 1 ? 1 : 0);
      o.c.wheels.forEach(w => w.spokes.setAttribute('transform', `rotate(${-t * 1400})`));
      if (p > 0 && p < 1) speed = Math.sin(p * Math.PI);
    });
    lines.forEach((l, i) => {
      const y = 600 + i * 60;
      l.setAttribute('x1', 200 + i * 300); l.setAttribute('x2', 200 + i * 300 + 400 * speed); l.setAttribute('y1', y); l.setAttribute('y2', y);
      l.setAttribute('opacity', speed);
    });
  };
})();

(() => {
  // 6b methodology rewired every hour (86.4 – 93.4)
  const S = scene(86.4, 93.4, '#1F4E79');
  const g = S.g;
  for (let i = 0; i < 40; i++) el('line', { x1: i * 50, x2: i * 50, y1: 0, y2: 1080, stroke: '#2A5F90', 'stroke-width': 2 }, g);
  for (let i = 0; i < 22; i++) el('line', { y1: i * 50, y2: i * 50, x1: 0, x2: 1920, stroke: '#2A5F90', 'stroke-width': 2 }, g);
  el('text', { x: 960, y: 140, 'text-anchor': 'middle', 'font-size': 72, 'font-weight': 800, fill: '#fff' }, g).textContent = 'Phương pháp luận';
  const stamp = el('text', { x: 1780, y: 140, 'text-anchor': 'end', 'font-size': 40, 'font-weight': 700, fill: C.gold }, g);
  const slots = [[360, 420], [760, 620], [1160, 420], [1560, 620], [960, 820], [560, 820], [1360, 820]];
  const labels = ['Phân tích', 'Thiết kế', 'Code', 'Test', 'Triển khai'];
  const links = labels.slice(1).map(() => el('line', { stroke: '#9CC3E6', 'stroke-width': 6, 'stroke-dasharray': '14 10' }, g));
  const boxes = labels.map(s => {
    const b = el('g', {}, g);
    el('rect', { x: -150, y: -56, width: 300, height: 112, rx: 18, fill: '#fff' }, b);
    el('text', { x: 0, y: 14, 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 800, fill: '#1F4E79' }, b).textContent = s;
    return b;
  });
  const perms = [[0, 1, 2, 3, 4], [1, 0, 3, 2, 4], [0, 2, 1, 5, 3], [4, 0, 2, 1, 6], [2, 3, 0, 6, 1], [0, 4, 1, 2, 3], [3, 1, 5, 0, 2], [1, 2, 0, 3, 4]];
  S.r = t => {
    const k = Math.floor((t - 86.4) / .85), u = easeInOut(seg((t - 86.4) % .85, 0, .4));
    const A = perms[k % perms.length], B = perms[(k + 1) % perms.length];
    const pos = boxes.map((b, i) => {
      const a = slots[A[i]], bb = slots[B[i]];
      const x = lerp(a[0], bb[0], u), y = lerp(a[1], bb[1], u);
      b.setAttribute('transform', `translate(${x} ${y})`);
      return [x, y];
    });
    links.forEach((l, i) => { l.setAttribute('x1', pos[i][0]); l.setAttribute('y1', pos[i][1]); l.setAttribute('x2', pos[i + 1][0]); l.setAttribute('y2', pos[i + 1][1]); l.setAttribute('stroke-dashoffset', -t * 60); });
    stamp.textContent = `Cập nhật ${String(9 + k).padStart(2, '0')}:00`;
  };
})();

(() => {
  // 6c COBOL mainframe modernised (93.4 – 99.4)
  const S = scene(93.4, 99.4, '#E9E2D3');
  const g = S.g;
  el('rect', { x: 0, y: 880, width: 1920, height: 200, fill: '#D6CDBB' }, g);
  const plate = el('g', { transform: 'translate(960 150)' }, g);
  el('rect', { x: -230, y: -46, width: 460, height: 92, rx: 12, fill: '#5A6B5C' }, plate);
  el('text', { x: 0, y: 16, 'text-anchor': 'middle', 'font-size': 44, 'font-weight': 800, fill: '#E9E2D3' }, plate).textContent = 'COBOL · 1985';
  const old = el('g', {}, g);
  const reels = [], leds = [];
  for (let c = 0; c < 4; c++) {
    const x = 520 + c * 230;
    el('rect', { x, y: 240, width: 210, height: 640, rx: 8, fill: '#8A9A8B', stroke: '#5A6B5C', 'stroke-width': 6 }, old);
    for (let r = 0; r < 2; r++) { const re = el('g', { transform: `translate(${x + 105} ${340 + r * 150})` }, old); el('circle', { r: 56, fill: '#5A6B5C' }, re); el('circle', { r: 18, fill: '#E9E2D3' }, re); el('rect', { x: -6, y: -54, width: 12, height: 30, fill: '#E9E2D3' }, re); reels.push(re); }
    for (let i = 0; i < 6; i++) leds.push(el('circle', { cx: x + 40 + i * 26, cy: 620, r: 8, fill: '#D64545' }, old));
  }
  const cables = [];
  for (let i = 0; i < 9; i++) cables.push(el('path', { d: `M${480 + rnd(i) * 960} 880 C ${400 + rnd(i + 1) * 1100} ${300 + rnd(i + 2) * 400}, ${400 + rnd(i + 3) * 1100} ${500 + rnd(i + 4) * 400}, ${480 + rnd(i + 5) * 960} ${260 + rnd(i + 6) * 600}`, fill: 'none', stroke: ['#3A3D45', '#B03A48', '#4A7BD8'][i % 3], 'stroke-width': 8 }, g));
  const dust = [];
  for (let i = 0; i < 30; i++) dust.push(el('circle', { r: 3 + rnd(i) * 3, fill: '#B9AE98' }, g));
  // blocks: old cabinet slices -> modern tiles
  const tags = ['API', 'Cloud', 'Web', 'Data', 'Auth', 'Test', 'CI/CD', 'Mobile', 'Logs', 'Search', 'Queue', 'AI'];
  const blocks = tags.map((s, i) => {
    const c = i % 4, r = Math.floor(i / 4);
    const from = [520 + c * 230, 240 + r * 213, 210, 205];
    const to = [1120 + (i % 3) * 230, 260 + Math.floor(i / 3) * 150, 210, 130];
    const b = el('g', {}, g);
    const rect = el('rect', { rx: 10 }, b);
    const tx = el('text', { 'text-anchor': 'middle', 'font-size': 36, 'font-weight': 800, fill: '#fff' }, b); tx.textContent = s;
    return { from, to, b, rect, tx, col: [C.orange, '#4A7BD8', '#3E9C6B'][i % 3] };
  });
  const dev = makePerson(g, { skin: '#F1C9A5', hair: '#2B2320', hoodie: C.navy });
  const ai = makeStar(g, 0, 0, 50, C.orange);
  S.r = t => {
    reels.forEach((r, i) => r.setAttribute('transform', r.getAttribute('transform').replace(/ rotate\(.*\)$/, '') + ` rotate(${t * 40 * (i % 2 ? 1 : -1)})`));
    leds.forEach((l, i) => l.setAttribute('opacity', rnd(i + Math.floor(t * 4)) > .5 ? 1 : .25));
    dust.forEach((d, i) => { d.setAttribute('cx', 460 + rnd(i) * 1000 + Math.sin(t + i) * 20); d.setAttribute('cy', 200 + ((rnd(i + 9) * 700 + t * 15) % 700)); d.setAttribute('opacity', 1 - seg(t, 96.2, 96.8)); });
    const br = seg(t, 96.4, 98.6);
    old.setAttribute('opacity', br > 0 ? 0 : 1);
    cables.forEach(c => c.setAttribute('opacity', 1 - seg(t, 95.9, 96.5)));
    plate.setAttribute('opacity', 1 - seg(t, 96.2, 96.6));
    blocks.forEach((o, i) => {
      const p = easeInOut(seg(t, 96.4 + i * .08, 97.6 + i * .08));
      const x = lerp(o.from[0], o.to[0], p), y = lerp(o.from[1], o.to[1], p) - Math.sin(p * Math.PI) * 120;
      const w = lerp(o.from[2], o.to[2], p), h = lerp(o.from[3], o.to[3], p);
      o.rect.setAttribute('x', x); o.rect.setAttribute('y', y); o.rect.setAttribute('width', w); o.rect.setAttribute('height', h);
      o.rect.setAttribute('fill', p > .5 ? o.col : '#8A9A8B');
      o.tx.setAttribute('x', x + w / 2); o.tx.setAttribute('y', y + h / 2 + 13);
      o.tx.setAttribute('opacity', seg(p, .7, 1));
      o.b.setAttribute('opacity', br > 0 ? 1 : 0);
    });
    const dp = seg(t, 95.6, 96.0);
    dev.g.setAttribute('transform', `translate(230 ${700}) scale(${t < 95.6 ? 0 : easeBack(dp) * 1.3})`);
    ai.setAttribute('transform', `translate(330 520) rotate(${t * 90}) scale(${t < 95.8 ? 0 : easeBack(seg(t, 95.8, 96.2))})`);
  };
})();

(() => {
  // 6d stock drop (99.4 – 104.4)
  const S = scene(99.4, 104.4, '#14161C');
  const g = S.g;
  for (let i = 1; i < 6; i++) el('line', { x1: 120, x2: 1800, y1: 200 + i * 120, y2: 200 + i * 120, stroke: '#232733', 'stroke-width': 2 }, g);
  el('text', { x: 140, y: 160, 'font-size': 110, 'font-weight': 800, fill: '#fff' }, g).textContent = 'IBM';
  const pts = [];
  for (let i = 0; i <= 60; i++) { const x = 140 + i * 26; const y = i < 46 ? 420 + Math.sin(i * .7) * 18 + rnd(i) * 22 : 420 + (i - 46) ** 1.5 * 7; pts.push([x, y]); }
  const line = el('polyline', { points: pts.map(p => p.join(',')).join(' '), fill: 'none', stroke: '#E5484D', 'stroke-width': 8, 'stroke-linejoin': 'round' }, g);
  const total = pts.reduce((s, p, i) => i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0, 0);
  line.setAttribute('stroke-dasharray', `${total} ${total}`);
  const badge = el('g', { transform: 'translate(1500 300)' }, g);
  el('rect', { x: -230, y: -80, width: 460, height: 160, rx: 24, fill: '#E5484D' }, badge);
  el('text', { x: 0, y: 30, 'text-anchor': 'middle', 'font-size': 96, 'font-weight': 800, fill: '#fff' }, badge).textContent = '▼ −10%+';
  el('text', { x: 1500, y: 450, 'text-anchor': 'middle', 'font-size': 44, 'font-weight': 700, fill: '#9AA5B1' }, g).textContent = 'trong 1 ngày';
  const tape = el('text', { y: 930, 'font-size': 44, 'font-weight': 700, fill: '#E5484D' }, g);
  tape.textContent = 'IBM ▼ −10%+ · 1 NGÀY · '.repeat(8);
  S.r = t => {
    const p = easeInOut(seg(t, 99.6, 102.4));
    line.setAttribute('stroke-dashoffset', total * (1 - p));
    badge.setAttribute('transform', `translate(1500 300) scale(${t < 101.9 ? 0 : easeBack(seg(t, 101.9, 102.2))})`);
    tape.setAttribute('x', -((t - 99.4) * 260) % 640);
  };
})();

(() => {
  // 6e the skill is unlocked and spreads (104.4 – 114)
  const S = scene(104.4, 114.0, C.cream);
  const g = S.g;
  const land = { fill: '#E6DECF', stroke: '#DCD3C2', 'stroke-width': 3 };
  ['M260 250 C 330 170, 560 160, 700 220 C 720 300, 640 330, 600 420 C 560 500, 470 520, 430 470 C 380 410, 300 380, 260 250 Z',
    'M560 560 C 640 540, 740 590, 730 660 C 720 760, 660 860, 620 900 C 590 820, 560 720, 560 560 Z',
    'M880 230 C 950 190, 1060 200, 1080 260 C 1060 330, 980 380, 900 360 C 860 320, 860 270, 880 230 Z',
    'M900 420 C 980 380, 1120 400, 1150 470 C 1160 560, 1100 700, 1030 790 C 980 740, 960 640, 920 560 C 880 510, 870 460, 900 420 Z',
    'M1090 200 C 1250 140, 1560 160, 1660 240 C 1700 320, 1610 380, 1560 420 C 1500 480, 1440 540, 1400 520 C 1330 470, 1260 500, 1200 460 C 1130 400, 1080 300, 1090 200 Z',
    'M1500 720 C 1580 680, 1700 700, 1720 770 C 1710 840, 1600 860, 1530 830 C 1490 800, 1480 750, 1500 720 Z'].forEach(d => el('path', Object.assign({ d }, land), g));
  const copies = [];
  for (let i = 0; i < 44; i++) {
    const c = el('g', {}, g);
    el('rect', { x: -40, y: -28, width: 80, height: 56, rx: 6, fill: '#1F4E79' }, c);
    el('line', { x1: -26, x2: 26, y1: -8, y2: -8, stroke: '#9CC3E6', 'stroke-width': 4 }, c);
    el('line', { x1: -26, x2: 10, y1: 8, y2: 8, stroke: '#9CC3E6', 'stroke-width': 4 }, c);
    copies.push({ c, tx: 280 + rnd(i) * 1400, ty: 220 + rnd(i + 50) * 640, at: 108.3 + rnd(i + 99) * 3.4 });
  }
  const doc = el('g', {}, g);
  el('rect', { x: -260, y: -180, width: 520, height: 360, rx: 16, fill: '#1F4E79' }, doc);
  for (let i = 0; i < 5; i++) el('line', { x1: -200, x2: 200 - i * 40, y1: -110 + i * 50, y2: -110 + i * 50, stroke: '#9CC3E6', 'stroke-width': 10, 'stroke-linecap': 'round' }, doc);
  el('text', { x: 0, y: 150, 'text-anchor': 'middle', 'font-size': 34, 'font-weight': 700, fill: '#fff' }, doc).textContent = 'Kỹ năng: hiện đại hoá COBOL';
  const lock = el('g', {}, g);
  const shackle = el('path', { d: 'M-50 0 L-50 -50 C-50 -110 50 -110 50 -50 L50 0', fill: 'none', stroke: C.ink, 'stroke-width': 22 }, lock);
  el('rect', { x: -80, y: -10, width: 160, height: 130, rx: 18, fill: C.gold, stroke: C.ink, 'stroke-width': 6 }, lock);
  el('circle', { cx: 0, cy: 50, r: 16, fill: C.ink }, lock);
  const big = el('text', { x: 960, y: 560, 'text-anchor': 'middle', 'font-size': 180, 'font-weight': 800, fill: C.orange }, g);
  big.textContent = 'Vài ngày.';
  S.r = t => {
    const op = seg(t, 106.2, 106.6);
    shackle.setAttribute('transform', `translate(${op > 0 ? 50 * easeOut(op) : 0} ${-40 * easeOut(op)}) `);
    lock.setAttribute('transform', `translate(960 ${540 - (t > 107.2 ? easeIn(seg(t, 107.2, 107.8)) * 800 : 0)})`);
    const dsc = 1 - easeInOut(seg(t, 107.8, 108.4)) * .6;
    doc.setAttribute('transform', `translate(960 540) scale(${dsc})`);
    doc.setAttribute('opacity', 1 - seg(t, 111.6, 112.0));
    copies.forEach(o => {
      const p = easeOut(seg(t, o.at, o.at + .9));
      o.c.setAttribute('transform', `translate(${lerp(960, o.tx, p)} ${lerp(540, o.ty, p)}) scale(${lerp(.3, 1, p)})`);
      o.c.setAttribute('opacity', t > o.at ? 1 - .65 * seg(t, 111.9, 112.3) : 0);
    });
    big.setAttribute('opacity', seg(t, 112.0, 112.3));
    big.setAttribute('transform', `translate(960 540) scale(${lerp(1.6, 1, easeOut(seg(t, 112.0, 112.3)))}) translate(-960 -540)`);
  };
})();

// ===================== SCENE 7: the open question (114 – 142) =====================
(() => {
  // 7a room again (114 – 117) + 7b screen close-up (117 – 119.4)
  const S = scene(114.0, 119.4, '#2A3047');
  const room = el('g', {}, S.g);
  el('rect', { x: -200, y: 780, width: 2400, height: 600, fill: '#20253A' }, room);
  el('rect', { x: 250, y: 160, width: 380, height: 300, rx: 12, fill: '#141A2B', stroke: '#3B4363', 'stroke-width': 12 }, room);
  el('circle', { cx: 345, cy: 250, r: 34, fill: '#F2E6B8' }, room); el('circle', { cx: 360, cy: 240, r: 30, fill: '#141A2B' }, room);
  const clock = el('text', { x: 1660, y: 200, 'text-anchor': 'middle', 'font-size': 60, 'font-weight': 800, fill: C.orange }, room); clock.textContent = '02:00 AM';
  el('rect', { x: 860, y: 660, width: 680, height: 26, rx: 6, fill: '#6B4E3A' }, room);
  el('rect', { x: 1020, y: 646, width: 240, height: 16, rx: 4, fill: '#B8C2CC' }, room);
  el('polygon', { points: '1240,646 1270,480 1290,480 1262,646', fill: '#B8C2CC' }, room);
  el('polygon', { points: '1243,640 1271,486 1284,486 1258,640', fill: '#7FD3FF' }, room);
  el('rect', { x: 680, y: 560, width: 40, height: 220, rx: 14, fill: '#3B4363' }, room);
  el('rect', { x: 690, y: 700, width: 200, height: 28, rx: 10, fill: '#3B4363' }, room);
  const body = el('g', {}, room);
  el('path', { d: 'M760 560 C 760 500, 880 490, 900 560 L 905 710 L 740 710 Z', fill: C.navy }, body);
  el('path', { d: 'M760 700 L 960 700 L 960 740 L 760 740 Z', fill: '#2E3550' }, body);
  const head = el('g', {}, body);
  el('path', { d: 'M-70 10 C -80 -60, 40 -90, 70 -20 L 60 40 C 20 60, -50 60, -70 10 Z', fill: C.navy }, head);
  el('circle', { cx: 10, cy: 0, r: 54, fill: '#F1C9A5' }, head);
  el('path', { d: 'M-44 -10 C -50 -70, 60 -80, 64 -20 C 40 -44, -10 -40, -44 -10 Z', fill: '#2B2320' }, head);
  el('rect', { x: 34, y: -12, width: 34, height: 22, rx: 6, fill: 'rgba(127,211,255,.35)', stroke: C.ink, 'stroke-width': 4 }, head);
  el('path', { d: 'M-40 -30 C -30 -90, 50 -90, 56 -40', fill: 'none', stroke: C.charcoal, 'stroke-width': 10 }, head);
  el('rect', { x: -26, y: -24, width: 30, height: 44, rx: 12, fill: C.charcoal }, head);
  const screen = el('g', {}, S.g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#141A2B' }, screen);
  el('rect', { x: 140, y: 80, width: 1640, height: 920, rx: 30, fill: '#E9F5FC', stroke: '#3B4363', 'stroke-width': 24 }, screen);
  el('rect', { x: 152, y: 92, width: 1616, height: 70, fill: '#D3E7F3' }, screen);
  [200, 240, 280].forEach(x => el('circle', { cx: x, cy: 127, r: 12, fill: '#9AA5B1' }, screen));
  el('text', { x: 960, y: 260, 'text-anchor': 'middle', 'font-size': 52, 'font-weight': 800, fill: C.ink }, screen).textContent = 'Ra mắt: tính năng mới!';
  const sc = el('g', { transform: 'translate(900 720) scale(1.2)' }, screen);
  const scar = makeCar(sc, '#4A7BD8');
  const chip = el('g', { transform: 'translate(0 -30)' }, sc);
  el('rect', { x: -110, y: -28, width: 220, height: 56, rx: 28, fill: '#fff' }, chip);
  el('text', { x: 0, y: 12, 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 800, fill: C.ink }, chip).textContent = 'Hãng LLM';
  const ring = el('circle', { cx: 900 + 190 * 1.2, cy: 720 + 30 * 1.2, r: 95, fill: 'none', stroke: C.orange, 'stroke-width': 10, 'stroke-dasharray': '18 12' }, screen);
  const note = el('g', { transform: 'translate(1440 470)' }, screen);
  el('rect', { x: -220, y: -44, width: 440, height: 88, rx: 44, fill: C.orange }, note);
  el('text', { x: 0, y: 14, 'text-anchor': 'middle', 'font-size': 38, 'font-weight': 800, fill: '#fff' }, note).textContent = 'Bánh xe của mình…';
  S.r = t => {
    const cu = t >= 117.0;
    show(room, !cu); show(screen, cu);
    const lean = easeInOut(seg(t, 115.6, 116.6));
    body.setAttribute('transform', `rotate(${-8 * lean} 820 710)`);
    head.setAttribute('transform', `translate(840 450) rotate(${-10 * lean})`);
    ring.setAttribute('stroke-dashoffset', -t * 40);
    note.setAttribute('transform', `translate(1440 470) scale(${t < 117.5 ? 0 : easeBack(seg(t, 117.5, 117.85))})`);
    scar.wheels.forEach(w => w.spokes.setAttribute('transform', `rotate(${t * 30})`));
    S.g.setAttribute('transform', cu ? `translate(960 540) scale(${lerp(1, 1.05, seg(t, 117, 119.4))}) translate(-960 -540)` : '');
  };
})();

(() => {
  // 7c crossroads (119.4 – 133.4)
  const S = scene(119.4, 133.4, '#000');
  const cm = el('g', {}, S.g);
  el('rect', { x: -400, y: -400, width: 2720, height: 1000, fill: 'url(#sky)' }, cm);
  el('circle', { cx: 960, cy: 560, r: 130, fill: '#FFD9A0' }, cm);
  el('rect', { x: -400, y: 560, width: 2720, height: 900, fill: '#5E4B5A' }, cm);
  el('polygon', { points: '760,1400 1160,1400 990,560 930,560', fill: '#7A6573' }, cm);
  el('polygon', { points: '900,820 1020,820 -300,600 -400,640', fill: '#7A6573' }, cm);
  el('polygon', { points: '900,820 1020,820 2320,640 2220,600', fill: '#7A6573' }, cm);
  // endpoints vignettes
  const v1 = el('g', { transform: 'translate(160 560)' }, cm);
  makeFactory(v1, -110, 0, 220, 180);
  for (let i = 0; i < 5; i++) el('rect', { x: 120 + i * 50, y: -24, width: 30, height: 24, rx: 4, fill: [C.orange, C.gold, '#4A7BD8'][i % 3] }, v1);
  el('rect', { x: 100, y: 0, width: 280, height: 12, fill: '#3A3D45' }, v1);
  const v2 = el('g', { transform: 'translate(960 560)' }, cm);
  el('path', { d: 'M-140 0 L-140 -150 L0 -230 L140 -150 L140 0 Z', fill: '#F5F1E8' }, v2);
  el('rect', { x: -40, y: -90, width: 80, height: 90, fill: C.orange }, v2);
  makeStar(v2, 0, -160, 34, C.orange);
  const v3 = el('g', { transform: 'translate(1760 560)' }, cm);
  el('rect', { x: -14, y: -260, width: 28, height: 260, fill: '#5A4130' }, v3);
  el('circle', { cx: 0, cy: -300, r: 120, fill: '#3E7C59' }, v3);
  el('circle', { cx: -80, cy: -250, r: 80, fill: '#4F8E68' }, v3);
  el('circle', { cx: 90, cy: -240, r: 80, fill: '#4F8E68' }, v3);
  el('path', { d: 'M14 -110 Q 140 -40 260 -110', fill: 'none', stroke: '#C99B53', 'stroke-width': 10 }, v3);
  el('line', { x1: 260, y1: -110, x2: 260, y2: 0, stroke: '#5A4130', 'stroke-width': 14 }, v3);
  const lazy = el('g', { transform: 'translate(140 -98)' }, v3);
  el('ellipse', { rx: 80, ry: 22, fill: C.navy }, lazy);
  el('circle', { cx: 80, cy: -16, r: 26, fill: '#F1C9A5' }, lazy);
  el('ellipse', { cx: 92, cy: -10, rx: 8, ry: 10, fill: '#7A2E22' }, lazy);
  const fig = el('circle', { r: 16, fill: '#7B3F6E' }, v3);
  // engineer from behind
  const me = el('g', { transform: 'translate(960 1000)' }, cm);
  el('path', { d: 'M-90 120 L-80 -60 C-70 -120 70 -120 80 -60 L90 120 Z', fill: C.navy }, me);
  el('circle', { cx: 0, cy: -150, r: 60, fill: '#2B2320' }, me);
  el('path', { d: 'M-62 -160 C -60 -230, 60 -230, 62 -160', fill: 'none', stroke: C.charcoal, 'stroke-width': 12 }, me);
  // signpost
  const post = el('g', { transform: 'translate(960 760)' }, cm);
  el('rect', { x: -12, y: -330, width: 24, height: 330, fill: '#5A4130' }, post);
  const signs = [
    { label: '① Cống nạp', d: 'M-40 -330 L-420 -330 L-460 -290 L-420 -250 L-40 -250 Z', tx: -240, ty: -276, at: 121.1, v: v1, vx: 160 },
    { label: '② Platform riêng', d: 'M-210 -460 L210 -460 L210 -370 L-210 -370 Z', tx: 0, ty: -400, at: 125.1, v: v2, vx: 960 },
    { label: '③ Chờ sung rụng', d: 'M40 -330 L420 -330 L460 -290 L420 -250 L40 -250 Z', tx: 240, ty: -276, at: 129.1, v: v3, vx: 1760 },
  ].map(s => {
    const gg = el('g', {}, post);
    el('path', { d: s.d, fill: '#F5F1E8', stroke: C.ink, 'stroke-width': 6 }, gg);
    el('text', { x: s.tx, y: s.ty, 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 800, fill: C.ink }, gg).textContent = s.label;
    return Object.assign(s, { gg });
  });
  S.r = t => {
    signs.forEach(s => {
      const p = seg(t, s.at, s.at + .35);
      s.gg.setAttribute('opacity', t < s.at ? 0 : 1);
      s.gg.setAttribute('transform', `scale(${t < s.at ? 0 : easeBack(p)})`);
      s.v.setAttribute('opacity', .35 + .65 * (t >= s.at ? 1 : 0));
    });
    // fig falls and misses
    const fp = seg(t, 131.6, 132.2);
    fig.setAttribute('cx', 60 + fp * 20); fig.setAttribute('cy', -260 + easeIn(fp) * 260 - (t > 132.2 ? Math.max(0, Math.sin(seg(t, 132.2, 132.6) * Math.PI)) * 30 : 0));
    // camera: crane up, then pan left / centre / right with each sign, then pull back
    let cx = 960, cy = 620, s = 1;
    if (t < 121.0) { const p = easeInOut(seg(t, 119.4, 121.0)); cy = lerp(800, 600, p); s = lerp(1.25, 1, p); }
    else {
      const k = signs.reduce((acc, sg, i) => (t >= sg.at - .2 ? i : acc), 0);
      const prev = k > 0 ? signs[k - 1].vx * .55 + 960 * .45 : 960, target = signs[k].vx * .55 + 960 * .45;
      const p = easeInOut(seg(t, signs[k].at - .2, signs[k].at + .6));
      cx = lerp(k === 0 ? 960 : prev, target, p); s = 1.18; cy = 560;
      if (t > 132.6) { const q = easeInOut(seg(t, 132.6, 133.4)); cx = lerp(cx, 960, q); s = lerp(1.18, 1, q); cy = lerp(560, 620, q); }
    }
    cam(cm, cx, cy, s);
  };
})();

(() => {
  // 7d the question (133.4 – 138.6) + 7e CTA (138.6 – 142)
  const Q = scene(133.4, 138.6, '#000');
  const q = el('text', { x: 960, y: 560, 'text-anchor': 'middle', 'font-size': 96, 'font-weight': 800, fill: '#fff' }, Q.g);
  q.textContent = 'Bạn chọn con đường nào?';
  Q.r = t => { q.setAttribute('opacity', easeOut(seg(t, 134.6, 136.0))); };
  const E = scene(138.6, 142.5, C.cream);
  const t1 = el('text', { x: 960, y: 470, 'text-anchor': 'middle', 'font-size': 76, 'font-weight': 800, fill: C.ink }, E.g);
  t1.textContent = 'CHIẾC XE LẮP RÁP TRONG MỘT ĐÊM';
  el('rect', { x: 760, y: 512, width: 400, height: 10, rx: 5, fill: C.orange }, E.g);
  const t2 = el('text', { x: 960, y: 620, 'text-anchor': 'middle', 'font-size': 50, 'font-weight': 700, fill: '#6B6455' }, E.g);
  t2.textContent = 'Bình luận lựa chọn của bạn bên dưới 👇';
  E.r = t => { t1.setAttribute('opacity', easeOut(seg(t, 138.8, 139.4))); t2.setAttribute('opacity', easeOut(seg(t, 139.3, 139.9))); };
})();
