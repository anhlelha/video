const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + __dirname + '/scene.html'); await p.evaluate(() => document.fonts.ready);
  for (const t of process.argv.slice(3)) { await p.evaluate(t => render(t), +t); await p.screenshot({ path: process.argv[2] + '/s' + t + '.png' }); }
  await b.close();
})();
