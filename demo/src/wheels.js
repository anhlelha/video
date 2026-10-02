// Wheel designs invented by engineers around the world. Each returns { g, spokes };
// `spokes` is the part that rotates. Needs el(), makeWheel(), C from the page.
const WHEEL_KINDS = ['classic', 'spiked', 'tread', 'twin', 'hex', 'neon', 'propeller', 'star', 'square'];
function makeWheelVariant(parent, r, kind) {
  const k = typeof kind === 'number' ? WHEEL_KINDS[kind % WHEEL_KINDS.length] : kind;
  if (k === 'classic') return makeWheel(parent, r);
  const g = el('g', {}, parent);
  const spokes = el('g', {}, g);
  const hub = () => el('circle', { r: r * .18, fill: C.orange }, g);
  if (k === 'spiked') {
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6, b = a + Math.PI / 12;
      el('polygon', { points: `${Math.cos(a - .18) * r * .92},${Math.sin(a - .18) * r * .92} ${Math.cos(b) * r * 1.3},${Math.sin(b) * r * 1.3} ${Math.cos(a + .44) * r * .92},${Math.sin(a + .44) * r * .92}`, fill: '#8E99A4' }, spokes);
    }
    el('circle', { r, fill: C.charcoal }, spokes);
    el('circle', { r: r * .55, fill: '#D64545' }, spokes);
    el('line', { x1: -r * .5, x2: r * .5, y1: 0, y2: 0, stroke: '#fff', 'stroke-width': r * .1 }, spokes);
    hub();
  } else if (k === 'tread') {
    el('rect', { x: -r * 1.5, y: -r * .8, width: r * 3, height: r * 1.6, rx: r * .8, fill: C.charcoal }, g);
    for (let i = -1; i <= 1; i++) {
      const w = el('g', { transform: `translate(${i * r * .95} 0)` }, g);
      el('circle', { r: r * .5, fill: '#B8C2CC' }, w);
      const s = el('line', { x1: -r * .45, x2: r * .45, y1: 0, y2: 0, stroke: '#5D6773', 'stroke-width': r * .12 }, w);
      el('circle', { r: r * .14, fill: C.orange }, w);
      spokes.__subs = (spokes.__subs || []).concat(s);
    }
    // rotate each roller instead of the whole track
    const sub = spokes.__subs;
    const proxy = { setAttribute: (n, v) => sub.forEach(s => s.setAttribute(n, v)) };
    return { g, spokes: proxy };
  } else if (k === 'twin') {
    [[-r * .35, '#4A4E58'], [r * .35, C.charcoal]].forEach(([dx, col]) => {
      const w = el('g', { transform: `translate(${dx} 0)` }, spokes);
      el('ellipse', { rx: r * .45, ry: r, fill: col }, w);
      el('ellipse', { rx: r * .25, ry: r * .62, fill: '#D6DCE2' }, w);
    });
    el('rect', { x: -r * .4, y: -r * .1, width: r * .8, height: r * .2, fill: C.orange }, g);
    return { g, spokes: { setAttribute: () => {} } };
  } else if (k === 'hex') {
    const pts = n => Array.from({ length: 6 }, (_, i) => `${Math.cos(i * Math.PI / 3) * r * n},${Math.sin(i * Math.PI / 3) * r * n}`).join(' ');
    el('polygon', { points: pts(1), fill: '#3E7C59' }, spokes);
    el('polygon', { points: pts(.6), fill: '#BFE3CC' }, spokes);
    for (let i = 0; i < 3; i++) el('line', { x1: Math.cos(i * Math.PI / 3) * r * .58, y1: Math.sin(i * Math.PI / 3) * r * .58, x2: -Math.cos(i * Math.PI / 3) * r * .58, y2: -Math.sin(i * Math.PI / 3) * r * .58, stroke: '#3E7C59', 'stroke-width': r * .1 }, spokes);
    hub();
  } else if (k === 'neon') {
    el('circle', { r: r * 1.25, fill: '#7FD3FF', opacity: .25 }, g);
    el('circle', { r, fill: '#1D2333', stroke: '#7FD3FF', 'stroke-width': r * .16 }, spokes);
    for (let i = 0; i < 3; i++) { const a = i * Math.PI * 2 / 3; el('line', { x1: 0, y1: 0, x2: Math.cos(a) * r * .8, y2: Math.sin(a) * r * .8, stroke: '#7FD3FF', 'stroke-width': r * .1, 'stroke-linecap': 'round' }, spokes); }
    el('circle', { r: r * .18, fill: '#7FD3FF' }, g);
  } else if (k === 'propeller') {
    el('circle', { r, fill: 'none', stroke: C.charcoal, 'stroke-width': r * .2 }, g);
    for (let i = 0; i < 4; i++) el('ellipse', { cx: r * .45, cy: 0, rx: r * .42, ry: r * .16, fill: '#4A7BD8', transform: `rotate(${i * 90 + 20})` }, spokes);
    hub();
  } else if (k === 'star') {
    g.insertBefore(el('circle', { r, fill: '#5B4BDB' }, g), spokes);
    const pts = [];
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .32 : r * .78; pts.push(`${Math.cos(a) * rr},${Math.sin(a) * rr}`); }
    el('polygon', { points: pts.join(' '), fill: C.gold }, spokes);
    hub();
  } else if (k === 'square') {
    el('rect', { x: -r, y: -r, width: r * 2, height: r * 2, rx: r * .45, fill: '#B03A48' }, spokes);
    el('rect', { x: -r * .55, y: -r * .55, width: r * 1.1, height: r * 1.1, rx: r * .2, fill: '#F2D5D9' }, spokes);
    el('line', { x1: -r * .5, x2: r * .5, y1: -r * .5, y2: r * .5, stroke: '#B03A48', 'stroke-width': r * .1 }, spokes);
    hub();
  }
  return { g, spokes };
}
