import { mkdir, writeFile, cp, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { Page } from '../src/components.js';
import { profile } from '../src/data.js';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export async function build() {
  const destination = join(root, 'dist');
  await mkdir(destination, { recursive: true });
  await cp(join(root, 'public'), destination, { recursive: true });
  await cp(join(root, 'src'), join(destination, 'src'), { recursive: true });
  const person = {
    '@context': 'https://schema.org', '@type': 'Person',
    name: profile.name, alternateName: profile.brand,
    description: profile.positioning,
    knowsAbout: ['Digital Marketing', 'Creative Strategy', 'Content Creation', 'Photography', 'Digital Business'],
    sameAs: Object.values(profile.socials).filter(Boolean),
  };
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f7f6f2">
  <meta name="description" content="Iki — Farrizqi Ichsan Maulana. Digital Business student exploring marketing, content, visual storytelling, and creative strategy. Discover projects and the thinking behind them.">
  <meta name="author" content="Farrizqi Ichsan Maulana">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_US">
  <meta property="og:title" content="Iki — Ideas into digital experiences.">
  <meta property="og:description" content="Digital Business student. Curious mind. Intentional work. A portfolio of marketing, creative strategy, and visual storytelling.">
  <meta name="twitter:card" content="summary">
  <title>Iki — Digital Marketing & Creative Portfolio</title>
  <link rel="icon" href="./assets/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="./assets/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="./assets/instrument-serif-italic-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="./src/styles.css">
  <script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>
</head>
<body>
${Page()}
<script type="module" src="./src/app.js"></script>
</body>
</html>`;
  await writeFile(join(destination, 'index.html'), html);
  return destination;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(`Built static portfolio → ${await build()}`);
}
