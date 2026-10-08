// Render the cover image. Usage: node cover.js out.png
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + __dirname + '/cover.html');
  await p.evaluate(() => window.ready);
  await p.screenshot({ path: process.argv[2] || 'cover.png' });
  await b.close();
})();
