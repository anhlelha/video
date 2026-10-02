// Render cover images. Usage: OUT=dir node thumb.js
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const out = process.env.OUT || '..';
  for (const [ar, w, h, name] of [['916', 1080, 1920, 'thumbnail-9x16.png'], ['169', 1920, 1080, 'thumbnail-16x9.png']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.on('pageerror', e => console.log('ERR', e.message));
    await p.goto(`file://${__dirname}/thumb.html?ar=${ar}`);
    await p.evaluate(() => window.ready);
    await p.screenshot({ path: `${out}/${name}` });
    await p.close();
  }
  await b.close();
})();
