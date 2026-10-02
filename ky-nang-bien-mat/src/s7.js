// Scene 7: the hands of every era, and the open questions.
(function () {
  const g = el('g', {}, svg);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#2B2620' }, g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: radGrad([[0, '#4A3E30', 1], [1, '#2B2620', 1]]) }, g);
  const river = el('path', { d: 'M120 380 C 300 260, 420 500, 600 380 S 840 260, 960 380 S 1200 500, 1320 380 S 1560 260, 1800 380', fill: 'none', stroke: '#F2C14E', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: .6 }, g);
  const len = 2200; river.setAttribute('stroke-dasharray', len);
  const xs = [240, 600, 960, 1320, 1680];
  const bgs = ['#7A5634', '#B5452F', '#6E9B4A', '#F3E3C3', '#24345C'];
  const labels = ['Săn bắt', 'Cưỡi ngựa', 'Trồng lúa', 'Học bài', 'Hôm nay'];
  const meds = xs.map((x, i) => {
    const m = el('g', {}, g);
    const ins = makeInset(m, x, 380, 140, bgs[i], '#F7EBD3');
    const c = el('g', { transform: `translate(${x} 380)` }, ins.content);
    if (i === 0) { el('ellipse', { cx: -16, cy: -20, rx: 14, ry: 26, fill: '#4A3220' }, c); el('ellipse', { cx: 16, cy: -20, rx: 14, ry: 26, fill: '#4A3220' }, c); const h = makeHand(c, '#C58B5E', '#8C5A2B'); tr(h.g, -60, 90, -40, .5); }
    if (i === 1) { el('path', { d: 'M-160 80 C -60 20, 60 20, 160 -80', fill: 'none', stroke: '#6B4A2E', 'stroke-width': 26 }, c); const f = makeFist(c, '#E0A77A', '#8A3B2B'); tr(f, 0, 30, -32, .5); }
    if (i === 2) { const h = makeHand(c, '#C99467', '#6B5136'); tr(h.g, -10, 120, -84, .5); for (let k = 0; k < 10; k++) el('ellipse', { cx: (rnd(k) - .5) * 60, cy: 20 + (rnd(k + 3) - .5) * 26, rx: 8, ry: 5, fill: '#E9C46A', transform: `rotate(${rnd(k) * 180} ${(rnd(k) - .5) * 60} ${20})` }, c); }
    if (i === 3) { el('rect', { x: -110, y: -40, width: 220, height: 150, fill: '#FFFDF6' }, c); for (let k = 0; k < 4; k++) el('line', { x1: -80, y1: -10 + k * 26, x2: 60, y2: -10 + k * 26, stroke: '#9AA5B1', 'stroke-width': 4 }, c); el('line', { x1: 20, y1: 30, x2: -30, y2: -60, stroke: '#F2C14E', 'stroke-width': 12, 'stroke-linecap': 'round' }, c); el('circle', { cx: 40, cy: 50, r: 30, fill: '#F6D2B0' }, c); }
    if (i === 4) { el('rect', { x: -40, y: -80, width: 80, height: 140, rx: 12, fill: '#2B2620' }, c); el('rect', { x: -32, y: -70, width: 64, height: 116, rx: 6, fill: '#8FD3F4' }, c); el('circle', { cx: 0, cy: 70, r: 34, fill: '#F6D2B0' }, c); el('rect', { x: -30, y: 90, width: 60, height: 80, fill: '#E8743B' }, c); }
    txt(m, x, 570, labels[i], { 'font-size': 32, fill: '#F7EBD3', 'font-weight': 700 });
    return m;
  });
  const qs = ['Kỹ năng nào nên để nó ra đi?', 'Kỹ năng nào cần giữ lại?', 'Chuẩn bị… hay thuận theo thời thế?']
    .map((s, i) => txt(g, 960, 720 + i * 100, s, { 'font-size': 60, fill: i === 2 ? '#F2C14E' : '#F7EBD3', 'font-weight': 800 }));
  SC[7] = { g, render(t, lt) {
    const t21 = L(t, 21);
    river.setAttribute('stroke-dashoffset', len * (1 - easeInOut(seg(lt, .5, 9))));
    meds.forEach((m, i) => {
      const p = easeBack(seg(lt, .6 + i * .9, 1.1 + i * .9));
      const up = easeInOut(seg(t21, 7.5, 9.5));
      m.setAttribute('transform', `translate(${xs[i]} 380) scale(${p * lerp(1, .8, up)}) translate(${-xs[i]} ${-380 + Math.sin(t * 1.2 + i) * 6 - up * 90})`);
      op(m, lerp(1, .8, up));
    });
    river.setAttribute('transform', `translate(0 ${-easeInOut(seg(t21, 7.5, 9.5)) * 90 * .8})`);
    qs.forEach((q, i) => {
      const tq = L(t, 22 + i), next = i < 2 ? L(t, 23 + i) : -1;
      op(q, seg(tq, -.2, .5) * (next > 0 ? lerp(1, .4, seg(next, -.2, .4)) : 1));
      q.setAttribute('transform', `translate(0 ${(1 - easeOut(seg(tq, -.2, .6))) * 30})`);
    });
  } };
})();
