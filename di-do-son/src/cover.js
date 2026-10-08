// Render the covers. Usage: node cover.js <dir>  -> <dir>/thumbnail-16x9.png, <dir>/thumbnail-9x16.png
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const out = process.argv[2] || '..';
  for (const [page, w, h, name] of [['cover.html', 1920, 1080, 'thumbnail-16x9.png'], ['vertical.html?cover', 1080, 1920, 'thumbnail-9x16.png']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.on('pageerror', e => console.log('ERR', e.message));
    await p.goto('file://' + __dirname + '/' + page);
    await p.evaluate(() => window.ready);
    await p.screenshot({ path: `${out}/${name}` });
    await p.close();
  }
  await b.close();
})();
