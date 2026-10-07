const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const FPS = 30;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +(process.env.W || 1920), height: +(process.env.H || 1080) } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + __dirname + '/' + (process.env.PAGE || 'scene.html'));
  await p.evaluate(() => document.fonts.ready);
  const dur = await p.evaluate(() => window.DURATION);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', (process.env.VOUT || 'video_noaudio.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = Math.round(dur * FPS);
  for (let f = 0; f < N; f++) {
    await p.evaluate(t => render(t), f / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 300 === 0) console.log('frame', f, '/', N);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await b.close();
})();
