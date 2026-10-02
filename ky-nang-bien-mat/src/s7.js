// Scene 7: the hands of every era, and the open questions.
(function () {
  const g = el('g', {}, svg);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: '#2B2620' }, g);
  el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: radGrad([[0, '#4A3E30', 1], [1, '#2B2620', 1]]) }, g);
  const river = el('path', { d: 'M120 380 C 300 260, 420 500, 600 380 S 840 260, 960 380 S 1200 500, 1320 380 S 1560 260, 1800 380', fill: 'none', stroke: '#F2C14E', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: .6 }, g);
  const len = 2200; river.setAttribute('stroke-dasharray', len);
  const xs = [240, 600, 960, 1320, 1680];
  const meds = xs.map((x, i) => makeEraMedallion(g, i, x, 380, true));
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
