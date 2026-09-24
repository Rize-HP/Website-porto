const { chromium } = require('C:/Users/farri/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  await page.addScriptTag({ path: path.resolve('work/axe.min.js') });
  const summaries = [];
  async function audit(name) {
    const result = await page.evaluate(async () => await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa'] } }));
    const summary = { name, passes: result.passes.length, violations: result.violations.map(v => ({ id:v.id, impact:v.impact, description:v.description, nodes:v.nodes.map(n => ({target:n.target, message:n.failureSummary})) })), incomplete: result.incomplete.map(v=>({id:v.id,count:v.nodes.length})) };
    summaries.push(summary);
    console.log(JSON.stringify(summary,null,2));
  }
  await audit('Desktop portfolio');
  await page.locator('[data-project="terra-coffee"] .project-link').click();
  await audit('Open case study');
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.menu-toggle').click();
  await audit('Mobile menu expanded');
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.evaluate(() => scrollTo(0,0));
  await page.screenshot({path:path.resolve('work/qa/tablet.png')});
  const assets = await page.evaluate(() => performance.getEntriesByType('resource').filter(entry => !entry.name.startsWith(location.origin)).map(entry => entry.name));
  console.log('Third-party runtime requests:', JSON.stringify(assets));
  await fs.writeFile(path.resolve('work/qa/accessibility.json'), JSON.stringify(summaries,null,2));
  await browser.close();
  if (summaries.some(s=>s.violations.length)) process.exitCode=1;
})().catch(error=>{console.error(error);process.exit(1)});
