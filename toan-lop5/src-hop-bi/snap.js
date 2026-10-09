const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +(process.env.W || 1920), height: +(process.env.H || 1080) } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + __dirname + '/' + (process.env.PAGE || 'scene.html')); await p.evaluate(() => document.fonts.ready);
  for (const t of process.argv.slice(3)) { await p.evaluate(t => render(t), +t); await p.screenshot({ path: process.argv[2] + '/s' + t + '.png' }); }
  await b.close();
})();
