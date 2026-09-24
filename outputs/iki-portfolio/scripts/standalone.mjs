import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { build, root } from './build.mjs';

// A single-file edition for opening directly in a browser, including offline.
// The normal dist/ edition remains the recommended source for static hosting.
const destination = await build();
let html = await readFile(join(destination, 'index.html'), 'utf8');
let styles = await readFile(join(root, 'src/styles.css'), 'utf8');
const fonts = await readFile(join(root, 'src/fonts.css'), 'utf8');
const files = await readdir(join(root, 'public/assets'));
const assets = new Map();
for (const file of files) {
  const type = file.endsWith('.svg') ? 'image/svg+xml' : file.endsWith('.woff2') ? 'font/woff2' : null;
  if (type) assets.set(`assets/${file}`, `data:${type};base64,${(await readFile(join(root, 'public/assets', file))).toString('base64')}`);
}
styles = `${fonts}\n${styles.replace(/@import url\('\.\/fonts\.css'\);/, '')}`;
for (const [asset, url] of assets) styles = styles.replaceAll(`../${asset}`, url);
let bundle = '';
for (const file of ['data.js', 'components.js', 'app.js']) {
  let source = await readFile(join(root, 'src', file), 'utf8');
  source = source.replace(/^import .*;\r?\n/gm, '').replace(/^export /gm, '');
  for (const [asset, url] of assets) source = source.replaceAll(asset, url);
  bundle += `\n// ${file}\n${source}\n`;
}
html = html.replace(/\s*<link rel="preload"[^>]+>/g, '');
html = html.replace('<link rel="stylesheet" href="./src/styles.css">', () => `<style>${styles}</style>`);
html = html.replace('<script type="module" src="./src/app.js"></script>', () => `<script type="module">${bundle.replace(/<\/script/gi, '<\\/script')}</script>`);
// Replace only HTML asset attributes: module content was already embedded above.
html = html.replace(/(src|href)="(?:\.\/)?(assets\/[^"\s]+)"/g, (match, attribute, asset) => assets.has(asset) ? `${attribute}="${assets.get(asset)}"` : match);
const file = join(root, '..', 'iki-portfolio.html');
await writeFile(file, html);
console.log(`Standalone portfolio → ${file}`);
