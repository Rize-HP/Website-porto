import { profile, projects, skillGroups, processSteps, experiences } from './data.js';

export const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const iconPaths = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  diagonal: '<path d="M5 19 19 5M5 5h14v14"/>',
  down: '<path d="M12 4v16M5 13l7 7 7-7"/>',
  up: '<path d="M12 20V4M5 11l7-7 7 7"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>',
  aperture: '<circle cx="12" cy="12" r="9"/><path d="m12 3 5 9M20 8H10M20 17l-5-9M12 21l-5-9M4 16h10M4 7l5 9"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5"/>',
  spark: '<path d="M12 2v20M2 12h20M5 5l14 14M5 19 19-14"/>',
  loop: '<path d="M20 8a8 8 0 0 0-14-2L3 9m0-6v6h6M4 16a8 8 0 0 0 14 2l3-3m0 6v-6h-6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  camera: '<path d="M4 7h4l2-3h4l2 3h4v13H4Z"/><circle cx="12" cy="13" r="4"/>',
  film: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4m-6-12 4 3-4 3Z"/>',
  message: '<path d="M21 4H3v13h5v4l5-4h8Z"/><path d="M7 8h10M7 12h7"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
};
export const Icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.diagonal}</svg>`;

export function CTA({ label, href, style = 'primary', icon = 'diagonal', attributes = '' }) {
  return `<a class="cta cta--${style}" href="${escapeHTML(href)}" ${attributes}><span>${escapeHTML(label)}</span><span class="cta__icon">${Icon(icon)}</span></a>`;
}

export function SectionHeader({ number, eyebrow, title, text = '', id }) {
  return `<div class="section-header reveal"><div><div class="eyebrow"><span class="section-number">${number}</span>${eyebrow}</div><h2 id="${id}">${title}</h2></div>${text ? `<p>${text}</p>` : ''}</div>`;
}

export function Navbar() {
  return `<header class="site-header" id="site-header"><div class="nav-shell container">
    <a class="wordmark" href="#top" aria-label="Iki — kembali ke atas">iki<span class="wordmark-dot">.</span></a>
    <nav class="desktop-nav" aria-label="Navigasi utama">${['Work', 'About', 'Skills', 'Process', 'Contact'].map(item => `<a href="#${item.toLowerCase()}" data-nav="${item.toLowerCase()}">${item}<span class="nav-dot"></span></a>`).join('')}</nav>
    <a class="nav-availability" href="#contact"><span class="status-dot"></span>Open to ideas ${Icon('diagonal')}</a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Buka menu"><span></span><span></span></button>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Navigasi mobile" hidden>${['Work', 'About', 'Skills', 'Process', 'Contact'].map((item, i) => `<a href="#${item.toLowerCase()}" data-nav="${item.toLowerCase()}"><span class="mono">0${i + 1}</span>${item}${Icon('diagonal')}</a>`).join('')}<p>Jakarta, Indonesia · Open to ideas</p></nav>
  </div></header>`;
}

export function Hero() {
  return `<section class="hero container" id="top" aria-labelledby="hero-title">
    <div class="hero-topline"><span class="eyebrow"><span class="tiny-cross">+</span> A CURIOUS MIND. A CREATIVE JOURNEY.</span><span class="mono hero-edition">PERSONAL PORTFOLIO / VOL. 01</span></div>
    <div class="hero-grid"><div class="hero-copy"><p class="hero-intro">Hey, I'm Iki <span class="intro-line"></span></p>
      <h1 id="hero-title">I build ideas<br>into <em>digital</em><br>experiences<span class="blue">.</span></h1>
      <p class="hero-description">Digital Business student exploring marketing, content, visual storytelling, and creative strategy.</p>
      <div class="hero-actions">${CTA({label: 'View My Work', href: '#work'})}${CTA({label: 'About Me', href: '#about', style: 'text', icon: 'arrow'})}</div>
    </div>
    <div class="hero-art" role="group" aria-label="Ilustrasi editorial tentang proses kreatif">
      <div class="art-coordinate mono">FIG. 01 — A DIFFERENT PERSPECTIVE</div>
      <div class="hero-frame"><img src="assets/perspective.svg" width="520" height="630" alt="Ilustrasi arsitektur monokrom dengan lingkaran cobalt dan permainan perspektif." fetchpriority="high"><div class="frame-corner corner-tl"></div><div class="frame-corner corner-br"></div><span class="frame-label mono">THINK. CREATE. REPEAT.</span></div>
      <div class="curiosity-sticker">${Icon('spark')}<span>Made of ideas.<br>Always in progress.</span></div>
      <div class="art-caption"><span class="mono">A WORK IN PROGRESS, BY DESIGN.</span><span class="art-line"></span><span class="mono">↗</span></div>
    </div></div>
    <div class="hero-bottom"><span class="location">${Icon('globe')}Jakarta, Indonesia</span><span class="hero-student">Digital Business Student</span><span class="availability"><span class="status-dot"></span>Available for Creative Projects</span><a class="scroll-cue mono" href="#work">SCROLL TO EXPLORE ${Icon('down')}</a></div>
  </section>`;
}

export function ProjectCard(project) {
  return `<article class="project-card reveal" data-project="${project.id}" data-categories="${project.filters.join(' ')}">
    <a class="project-link" href="#case/${project.id}" aria-label="Buka case study ${escapeHTML(project.name)}">
      <div class="project-image project-image--${project.color}"><img src="${project.image}" alt="${escapeHTML(project.alt)}" loading="lazy" decoding="async" width="800" height="570"><div class="project-image-top"><span class="project-index mono">${project.number} / 06</span><span class="cover-label mono">${project.coverLabel}</span></div><span class="view-project">Explore the project ${Icon('diagonal')}</span><span class="image-placeholder mono">CONCEPT COVER / PLACEHOLDER</span></div>
      <div class="project-meta"><span class="project-category">${project.category}</span><span class="project-year mono" title="${project.year ? 'Tahun project' : 'Tahun project belum ditambahkan'}">YEAR ${project.year || '—'}</span></div>
      <div class="project-title-row"><h3>${project.name}</h3><span class="project-arrow">${Icon('diagonal')}</span></div>
      <p class="project-description">${project.description}</p>
      <div class="tags">${project.skills.map(skill => `<span>${skill}</span>`).join('')}</div>
    </a></article>`;
}

export function Works() {
  return `<section class="works section container" id="work" aria-labelledby="work-title">
    ${SectionHeader({number: '01', eyebrow: 'IDEAS, TAKING SHAPE', title: 'Selected Works<span class="blue">.</span>', id: 'work-title', text: 'A mix of school projects, creative explorations, and ideas worth building.'})}
    <div class="work-toolbar"><div class="work-filters" role="group" aria-label="Filter project"><button class="filter-button active" data-filter="all" aria-pressed="true">All work <span>06</span></button><button class="filter-button" data-filter="marketing" aria-pressed="false">Marketing</button><button class="filter-button" data-filter="brand" aria-pressed="false">Brand & business</button><button class="filter-button" data-filter="community" aria-pressed="false">Visual & community</button></div><p class="work-count mono" aria-live="polite" aria-atomic="true">6 PROJECTS / ALWAYS LEARNING</p></div>
    <div class="project-grid">${projects.map(ProjectCard).join('')}</div>
    <div class="work-footnote"><span class="tiny-cross">+</span><p>Behind every project: a question, a process, and something new to learn.</p><span class="mono">MORE IDEAS IN THE MAKING</span></div>
  </section>`;
}

export function About() {
  const facts = [['target','Digital Marketing'],['message','Content & Social Media'],['camera','Photography'],['film','Filmmaking'],['grid','Business'],['spark','Creative Strategy']];
  return `<section class="about-section section" id="about" aria-labelledby="about-title"><div class="container">
    <div class="about-grid"><div class="about-heading reveal"><div class="eyebrow"><span class="section-number">02</span>THE PERSON BEHIND THE IDEAS</div><h2 id="about-title">A little<br>about <em>me.</em></h2><div class="about-signature">Iki<span class="blue">↗</span></div><p class="about-fullname">Farrizqi Ichsan Maulana</p><p class="about-positioning">Digital Marketing Student<br>Creative Strategist<br>Content & Visual Enthusiast</p></div>
    <div class="about-content reveal" lang="id"><p class="about-lead">Kreatif dalam melihat kemungkinan.<br><span>Terstruktur dalam mewujudkannya.</span></p><p>Saya adalah pelajar SMK Bisnis Digital yang tertarik pada bagaimana sebuah ide dapat berubah menjadi brand, campaign, content, atau business project yang memiliki tujuan jelas.</p><p>Saya banyak mengeksplorasi digital marketing, social media, visual content, photography, filmmaking, dan business development.</p><p>Saya suka menggabungkan sisi kreatif dengan cara berpikir yang terstruktur: memahami masalah, mencari insight, menyusun strategi, kemudian mengubahnya menjadi sesuatu yang dapat dilihat dan digunakan.</p><div class="learning-note">${Icon('spark')}<span>Still learning. Always making.<br><small>Setiap project adalah kesempatan untuk bertumbuh.</small></span></div></div></div>
    <div class="interest-grid">${facts.map(([icon,title]) => `<div class="interest-card reveal">${Icon(icon)}<span>${title}</span></div>`).join('')}</div>
    <div class="experience-notes"><div class="experience-heading reveal"><span class="eyebrow">LEARNING, BEYOND THE CLASSROOM</span><span class="mono">SMKN 20 JAKARTA / BISNIS DIGITAL</span></div><div class="experience-grid">${experiences.map(item => `<article class="experience-item reveal"><span class="mono">${item.period}</span><h3>${item.title}</h3><p lang="id">${item.text}</p></article>`).join('')}</div></div>
  </div></section>`;
}

export function SkillCard(group) {
  return `<article class="skill-card reveal"><div class="skill-card-top">${Icon(group.icon)}<span class="mono">${group.number}</span></div><h3>${group.title}</h3><p>${group.caption}</p><ul>${group.items.map(item => `<li><span class="skill-mark"></span>${item}</li>`).join('')}</ul></article>`;
}

export function Skills() {
  return `<section class="skills section container" id="skills" aria-labelledby="skills-title">${SectionHeader({number: '03', eyebrow: 'AN EVOLVING TOOLKIT', title: 'What I work with<span class="blue">.</span>', id: 'skills-title', text: 'Skills I’m learning, practicing, and connecting through real projects.'})}<div class="skills-grid">${skillGroups.map(SkillCard).join('')}</div><p class="skills-note">${Icon('loop')}Built through practice. Sharpened with every project.</p></section>`;
}

export function Process() {
  return `<section class="process-section section" id="process" aria-labelledby="process-title"><div class="container"><div class="process-heading reveal"><div><div class="eyebrow"><span class="section-number">04</span>FROM A QUESTION TO A CREATION</div><h2 id="process-title">How I turn an idea<br>into <em>something real.</em></h2></div><div class="process-orbit" aria-hidden="true">${Icon('spark')}</div></div><div class="process-grid">${processSteps.map(step => `<article class="process-step reveal"><div class="process-step-top"><span class="process-number">${step.number}</span>${Icon(step.icon)}</div><h3>${step.title}</h3><p>${step.description}</p><span class="process-detail">${step.detail}</span></article>`).join('')}</div><div class="process-footer mono"><span>THOUGHTFUL BY NATURE. ITERATIVE BY CHOICE.</span><span>↳ &nbsp; AND THEN, DO IT A LITTLE BETTER.</span></div></div></section>`;
}

export function Philosophy() {
  return `<section class="philosophy container section" aria-labelledby="philosophy-title"><div class="eyebrow reveal">A NOTE TO MYSELF</div><h2 class="reveal" id="philosophy-title">I don't want to just make<br>things <em>look good.</em></h2><div class="philosophy-bottom reveal">${Icon('spark')}<p>I want to understand <strong>why they should exist,</strong><br>who they are for, and what they are<br>supposed to achieve.</p><span class="mono">PURPOSE FIRST.<br>EVERYTHING ELSE FOLLOWS.</span></div></section>`;
}

export function ContactLinks() {
  const channels = [
    { name: 'Instagram', url: profile.socials.instagram },
    { name: 'LinkedIn', url: profile.socials.linkedin },
    { name: 'Email', url: profile.email ? `mailto:${profile.email}` : null },
    ...(profile.socials.github ? [{ name: 'GitHub', url: profile.socials.github }] : []),
  ];
  return channels.map(channel => channel.url ? `<a class="social-link" href="${escapeHTML(channel.url)}" ${channel.name !== 'Email' ? 'target="_blank" rel="noopener noreferrer"' : ''}>${channel.name}${Icon('diagonal')}</a>` : `<span class="social-link social-link--pending">${channel.name}<span class="social-pending" lang="id">Belum ditambahkan</span></span>`).join('');
}

export function Contact() {
  return `<section class="contact-section section" id="contact" aria-labelledby="contact-title"><div class="container"><div class="contact-top reveal"><div class="eyebrow"><span class="section-number">05</span>GOOD THINGS START WITH A CONVERSATION</div><span class="contact-availability"><span class="status-dot"></span>Available for Creative Projects</span></div><div class="contact-grid"><div class="reveal"><h2 id="contact-title">Have an idea?<br>Let's <em>talk.</em><span class="contact-star" aria-hidden="true">✳</span></h2>${CTA({label: "Let's Connect", href: profile.email ? `mailto:${profile.email}` : '#connect', style: 'light'})}</div><div class="contact-detail reveal"><p>Whether it's a campaign, content idea, creative project, or simply a good conversation about digital business, feel free to reach out.</p><div class="contact-links">${ContactLinks()}</div></div></div></div></section>`;
}

export function Footer() {
  return `<footer class="site-footer"><div class="container footer-content"><a class="wordmark" href="#top" aria-label="Iki — kembali ke atas">iki<span class="wordmark-dot">.</span></a><p>© ${new Date().getFullYear()} Iki. Made with curiosity & intention.</p><a class="back-top mono" href="#top">BACK TO TOP ${Icon('up', 'rotate-up')}</a></div></footer>`;
}

export function CaseStudy(project) {
  const next = projects[(projects.findIndex(item => item.id === project.id) + 1) % projects.length];
  const note = project.verified
    ? 'Project notes · Pengalaman dan pencapaian merujuk CV Iki. Strategi disajikan sebagai kerangka belajar; refleksi personal masih dapat dilengkapi. Visual adalah cover konsep.'
    : 'Study outline · Kerangka berdasarkan brief project. Detail pelaksanaan dan refleksi personal perlu dilengkapi dengan dokumentasi Iki. Visual adalah cover konsep.';
  return `
    <div class="case-heading">
      <div class="eyebrow">PROJECT ${project.number} / ${project.category}</div>
      <h2 id="case-title" tabindex="-1">${project.name}</h2>
      <div class="case-tags tags">${project.skills.map(skill => `<span>${skill}</span>`).join('')}<span>Year ${project.year || '—'}</span></div>
    </div>
    <img class="case-cover" src="${project.image}" alt="${escapeHTML(project.alt)}" width="800" height="570">
    <p class="case-note" lang="id">${Icon('layers')}<span>${note}</span></p>
    <div class="case-sections" lang="id">
      <section><span class="mono">01</span><div><h3>Project Overview</h3><p>${project.overview}</p></div></section>
      <section><span class="mono">02</span><div><h3>The Problem</h3><p>${project.problem}</p></div></section>
      <section><span class="mono">03</span><div><h3>The Idea</h3><p>${project.idea}</p></div></section>
      <section><span class="mono">04</span><div><h3>The Strategy</h3><ul>${project.strategy.map(item => `<li>${item}</li>`).join('')}</ul></div></section>
      <section><span class="mono">05</span><div><h3>The Execution</h3><p>${project.execution}</p></div></section>
      <section class="case-learning"><span class="mono">06</span><div><h3>${project.result ? 'The Result / Learning' : 'What I learned'}</h3>${project.result ? `<p class="case-result">${project.result}</p>` : ''}<p>${project.learning}</p></div></section>
      <section><span class="mono">07</span><div><h3>Tools Used</h3><p class="case-tools-note">Frameworks & skills in focus</p><div class="tags">${project.tools.map(item => `<span>${item}</span>`).join('')}</div></div></section>
    </div>
    <a class="case-next" href="#case/${next.id}"><span><small class="mono">NEXT EXPLORATION</small><strong>${next.name}</strong></span>${Icon('arrow')}</a>`;
}

export function Dialogs() {
  const hasContact = profile.email || Object.values(profile.socials).some(Boolean);
  const contactNote = hasContact
    ? 'Pilih kanal yang paling nyaman. Ceritakan ide, konteks project, atau hal menarik yang ingin dibahas.'
    : 'Link kontak Iki belum ditambahkan. Kanal yang sudah tersedia akan muncul di sini setelah dilengkapi.';
  return `<dialog class="case-dialog" id="case-dialog" aria-labelledby="case-title"><div class="dialog-topbar"><a class="wordmark" href="#top" data-close-dialog aria-label="Tutup case study">iki<span class="wordmark-dot">.</span></a><span class="mono">BEHIND THE WORK</span><button class="dialog-close" type="button" aria-label="Tutup case study">${Icon('close')}</button></div><div class="case-content" id="case-content"></div></dialog><dialog class="connect-dialog" id="connect-dialog" aria-labelledby="connect-title"><button class="dialog-close" type="button" aria-label="Tutup kontak">${Icon('close')}</button><span class="eyebrow">LET'S MAKE SOMETHING MEANINGFUL</span><h2 id="connect-title" tabindex="-1">A conversation<br>starts <em>here.</em></h2><p lang="id">${contactNote}</p><div class="contact-links">${ContactLinks()}</div><button class="cta cta--primary connect-back" type="button"><span>Back to exploring</span>${Icon('arrow')}</button></dialog>`;
}

export function Page() {
  return `<a class="skip-link" href="#main">Skip to content</a>${Navbar()}<main id="main">${Hero()}${Works()}${About()}${Skills()}${Process()}${Philosophy()}${Contact()}</main>${Footer()}${Dialogs()}<noscript><div class="noscript-note">Semua project dapat dibaca di halaman ini. Aktifkan JavaScript untuk filter, menu mobile, dan case study.</div></noscript>`;
}
