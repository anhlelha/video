// Render the 9:16 version. Usage: VOUT=out.mp4 node render_v.js  (STILLS="3,20" OUT=dir for preview PNGs)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const FPS = 30;
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + __dirname + '/vertical.html');
  await p.evaluate(() => window.ready);
  const dur = await p.evaluate(() => window.DURATION);
  if (process.env.STILLS) {   // preview: STILLS="1.5,20" writes PNGs instead of a video
    for (const t of process.env.STILLS.split(',').map(Number)) {
      await p.evaluate(t => render(t), t);
      await p.screenshot({ path: `${process.env.OUT || '.'}/v_${t}.png` });
    }
    await b.close(); return;
  }
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', process.env.VOUT || 'vertical.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = Math.round(dur * FPS);
  for (let fr = 0; fr < N; fr++) {
    await p.evaluate(t => render(t), fr / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (fr % 600 === 0) console.log('frame', fr, '/', N);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await b.close();
})();
