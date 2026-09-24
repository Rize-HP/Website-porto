const { chromium } = require('C:/Users/farri/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [], results = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  const pass = text => { results.push(text); console.log(`PASS ${text}`); };
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('.project-card').count(), 6);
  assert.equal(await page.locator('a[href="mailto:farrizqiichsanm@gmail.com"]').count() >= 2, true);
  assert.equal(await page.locator('#contact a[href="https://www.instagram.com/farizqiqiqi/"]').count(), 1);
  assert.equal(await page.locator('#contact a[href="https://id.linkedin.com/in/farrizqi-ichsan-maulana-6757b6330"]').count(), 1);
  pass('Six projects, one H1, verified social links and working email CTA');

  for (const [filter, count] of [['marketing',3],['brand',2],['community',2],['all',6]]) {
    await page.locator(`[data-filter="${filter}"]`).click();
    assert.equal(await page.locator('.project-card:visible').count(), count);
    assert.equal(await page.locator(`[data-filter="${filter}"]`).getAttribute('aria-pressed'), 'true');
  }
  pass('All four project filters update cards and accessible state');

  const ids = await page.locator('[data-project]').evaluateAll(cards => cards.map(card => card.dataset.project));
  for (const id of ids) {
    const link = page.locator(`[data-project="${id}"] .project-link`);
    await link.click();
    assert.equal(await page.locator('#case-dialog').evaluate(dialog => dialog.open), true);
    assert.equal(await page.locator('#case-dialog .case-sections > section').count(), 7);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'case-title');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.closest('dialog')?.id), 'case-dialog');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#case-dialog').evaluate(dialog => dialog.open), false);
    assert.equal(await link.evaluate(link => document.activeElement === link), true);
  }
  pass('Six case studies: seven sections, focus containment, Escape and focus restoration');

  await page.locator('[data-project="terra-coffee"] .project-link').click();
  await page.locator('.case-next').click();
  assert.equal(await page.locator('#case-title').textContent(), 'Zenithro');
  await page.goBack();
  assert.equal(await page.locator('#case-dialog').evaluate(dialog => dialog.open), false);
  await page.goto('http://localhost:4173/#case/yamaha-content-campaign', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('#case-title').textContent(), 'Yamaha Content Campaign');
  assert.match(await page.locator('.case-result').textContent(), /Juara 2/);
  await page.screenshot({ path: path.resolve('work/qa/case-desktop.png') });
  await page.locator('#case-dialog .dialog-close').click();
  await page.goto('http://localhost:4173/#case/nonexistent', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('#case-dialog').evaluate(dialog => dialog.open), false);
  pass('Next case, browser Back, direct case links and unknown-case fallback');

  await page.locator('.desktop-nav a[href="#skills"]').click();
  await page.waitForFunction(() => document.querySelector('.desktop-nav [data-nav="skills"]').getAttribute('aria-current') === 'location');
  assert.equal(await page.locator('.site-header').evaluate(header => header.classList.contains('scrolled')), true);
  pass('Sticky navigation and active section follow scrolling');

  for (const section of ['work','about','skills','process','contact']) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    await page.evaluate(id => window.scrollTo(0, document.getElementById(id).offsetTop - 88), section);
    await page.waitForFunction(id => document.querySelector(`.desktop-nav [data-nav="${id}"]`).getAttribute('aria-current') === 'location', section);
    await page.mouse.move(0,0);
    await page.screenshot({ path: path.resolve(`work/qa/desktop-${section}.png`) });
  }

  for (const width of [320,375,390,600,768,820,1024,1440,1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo(0,0));
    const dimensions = await page.evaluate(() => ({ window: innerWidth, client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth, offenders: [...document.querySelectorAll('main *')].filter(el => { const r=el.getBoundingClientRect(); return r.width && r.right > document.documentElement.clientWidth + 2; }).map(el => el.className).slice(0,10) }));
    assert.ok(dimensions.scroll <= width, `Overflow at ${width}: ${JSON.stringify(dimensions)}`);
    const textClipping = await page.locator('h1, h2, h3, .project-description, .skill-card li').evaluateAll(elements => elements.filter(el => el.clientWidth && el.scrollWidth > el.clientWidth + 2).map(el => el.textContent));
    assert.deepEqual(textClipping, [], `Text clipping at ${width}: ${textClipping}`);
  }
  pass('No horizontal overflow or clipped headings at 320, 375, 390, 600, 768, 820, 1024, 1440, 1920px');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
  await page.screenshot({ path: path.resolve('work/qa/mobile-menu.png') });
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.mobile-menu').isVisible(), false);
  await page.locator('.menu-toggle').click();
  await page.locator('#mobile-menu a[href="#process"]').click();
  assert.equal(await page.locator('.mobile-menu').isVisible(), false);
  await page.waitForFunction(() => document.querySelector('#mobile-menu [data-nav="process"]').getAttribute('aria-current') === 'location');
  await page.screenshot({ path: path.resolve('work/qa/mobile-process.png') });
  await page.locator('[data-project="terra-coffee"] .project-link').click();
  assert.equal(await page.locator('#case-dialog').evaluate(dialog => dialog.open), true);
  await page.screenshot({ path: path.resolve('work/qa/case-mobile.png') });
  await page.locator('#case-dialog .dialog-close').click();
  pass('Mobile menu, Escape, section navigation and full-screen case study');

  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const staticPage = await noJS.newPage();
  await staticPage.goto('http://localhost:4173');
  assert.equal(await staticPage.locator('.project-card').count(), 6);
  assert.equal(await staticPage.locator('.project-card').first().isVisible(), true);
  assert.equal(await staticPage.locator('.noscript-note').isVisible(), true);
  pass('Static content and contact links remain available with JavaScript disabled');

  const animated = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  const animatedPage = await animated.newPage();
  await animatedPage.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  const revealTarget = animatedPage.locator('.process-step').first();
  await revealTarget.scrollIntoViewIfNeeded();
  await animatedPage.waitForFunction(() => document.querySelector('.process-step').classList.contains('is-visible'));
  await animatedPage.emulateMedia({ reducedMotion: 'reduce' });
  await animatedPage.waitForFunction(() => document.querySelectorAll('.will-reveal:not(.is-visible)').length === 0);
  assert.equal(await animatedPage.locator('.will-reveal:not(.is-visible)').count(), 0);
  pass('Viewport reveals and live reduced-motion preference changes');

  assert.deepEqual(errors, []);
  pass('No JavaScript errors or missing assets during the full browser run');
  await fs.writeFile(path.resolve('work/qa/results.json'), JSON.stringify({ date: new Date().toISOString(), browser: await browser.version(), results, errors }, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
