const { chromium } = require('C:/Users/farri/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve('work/qa/desktop-first.png') });
  await page.screenshot({ path: path.resolve('work/qa/desktop-full.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: path.resolve('work/qa/mobile-first.png') });
  await page.screenshot({ path: path.resolve('work/qa/mobile-full.png'), fullPage: true });
  console.log(JSON.stringify({ title: await page.title(), projects: await page.locator('.project-card').count(), fonts: await page.evaluate(() => document.fonts.status), errors }, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
