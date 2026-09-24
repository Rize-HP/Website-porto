import { projects } from './data.js';
import { CaseStudy } from './components.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const caseDialog = document.querySelector('#case-dialog');
const connectDialog = document.querySelector('#connect-dialog');
const caseContent = document.querySelector('#case-content');
let lastFocus = null;
let returnHash = '#work';
let activeDialog = null;

function toggleMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  mobileMenu.hidden = !open;
  header.classList.toggle('menu-open', open);
}
menuToggle.addEventListener('click', () => toggleMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('click', event => { if (!header.contains(event.target)) toggleMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    toggleMenu(false);
    menuToggle.focus();
  }
  if (event.key === 'Tab' && menuToggle.getAttribute('aria-expanded') === 'true') {
    const lastLink = mobileMenu.querySelector('a:last-of-type');
    if (event.shiftKey && document.activeElement === menuToggle) { event.preventDefault(); lastLink.focus(); }
    else if (!event.shiftKey && document.activeElement === lastLink) { event.preventDefault(); menuToggle.focus(); }
  }
});
window.matchMedia('(min-width: 769px)').addEventListener('change', event => { if (event.matches) toggleMenu(false); });

// A single passive, requestAnimationFrame-throttled listener handles header + nav.
const sections = [...document.querySelectorAll('main > section[id]')].filter(section => section.id !== 'top');
const navLinks = document.querySelectorAll('[data-nav]');
let scrollQueued = false;
function syncNavigation() {
  header.classList.toggle('scrolled', window.scrollY > 24);
  let active = '';
  const threshold = Math.min(window.innerHeight * .35, 260);
  for (const section of sections) { if (section.getBoundingClientRect().top <= threshold) active = section.id; }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 20) active = 'contact';
  navLinks.forEach(link => {
    const current = link.dataset.nav === active;
    link.classList.toggle('is-active', current);
    if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(syncNavigation); } }, { passive: true });
window.addEventListener('resize', syncNavigation, { passive: true });
syncNavigation();

// Content is visible by default. Reveal animations only activate when supported.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .07, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.reveal').forEach(element => {
    if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('will-reveal');
    observer.observe(element);
  });
}
reducedMotion.addEventListener('change', event => {
  if (event.matches) document.querySelectorAll('.will-reveal').forEach(element => element.classList.add('is-visible'));
});

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-project]');
filters.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filters.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  cards.forEach(card => {
    const show = filter === 'all' || card.dataset.categories.split(' ').includes(filter);
    card.hidden = !show;
    if (show) { count++; card.classList.add('is-visible'); }
  });
  document.querySelector('.work-count').textContent = `${count} PROJECT${count === 1 ? '' : 'S'} / ALWAYS LEARNING`;
  syncNavigation();
}));

function unlockPage() {
  document.body.classList.remove('dialog-is-open');
  activeDialog = null;
  if (lastFocus?.isConnected && !lastFocus.closest('[hidden]')) lastFocus.focus({ preventScroll: true });
}
function closeDialog(updateURL = true) {
  if (!activeDialog) return;
  activeDialog.close();
  unlockPage();
  if (updateURL && (location.hash.startsWith('#case/') || location.hash === '#connect')) {
    history.replaceState(null, '', location.pathname + location.search + returnHash);
  }
}
function showDialog(dialog, focusSelector) {
  if (!dialog.open) {
    lastFocus = document.activeElement;
    if (activeDialog) activeDialog.close();
    activeDialog = dialog;
    toggleMenu(false);
    document.body.classList.add('dialog-is-open');
    dialog.showModal();
  }
  dialog.scrollTop = 0;
  dialog.querySelector(focusSelector)?.focus({ preventScroll: true });
}
function openCase(id) {
  const project = projects.find(item => item.id === id);
  if (!project) return false;
  caseContent.innerHTML = CaseStudy(project);
  showDialog(caseDialog, '#case-title');
  return true;
}
function handleRoute() {
  if (location.hash.startsWith('#case/')) {
    const id = location.hash.slice(6);
    if (!openCase(id)) { closeDialog(false); history.replaceState(null, '', '#work'); }
  } else if (location.hash === '#connect') {
    showDialog(connectDialog, '#connect-title');
  } else closeDialog(false);
}
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  const href = link.getAttribute('href');
  if (link.hasAttribute('data-close-dialog')) { event.preventDefault(); closeDialog(); return; }
  if (href?.startsWith('#case/') || href === '#connect') {
    event.preventDefault();
    if (!activeDialog) {
      returnHash = location.hash && !location.hash.startsWith('#case/') && location.hash !== '#connect' ? location.hash : '#work';
      history.pushState(null, '', href);
    } else history.replaceState(null, '', href);
    handleRoute();
  }
});
[caseDialog, connectDialog].forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => closeDialog());
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(); });
  // Only a complete pointer click on the backdrop closes the modal.
  let startedOnBackdrop = false;
  dialog.addEventListener('pointerdown', event => { startedOnBackdrop = event.target === dialog && (event.clientX < dialog.getBoundingClientRect().left || event.clientX > dialog.getBoundingClientRect().right || event.clientY < dialog.getBoundingClientRect().top || event.clientY > dialog.getBoundingClientRect().bottom); });
  dialog.addEventListener('click', event => { if (startedOnBackdrop && event.target === dialog) closeDialog(); startedOnBackdrop = false; });
});
document.querySelector('.connect-back').addEventListener('click', () => closeDialog());
window.addEventListener('popstate', handleRoute);
window.addEventListener('hashchange', handleRoute);
handleRoute();

// Gentle pointer response; no continuous animation or work on touch screens.
if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion.matches) {
  document.querySelectorAll('.cta--primary, .cta--light').forEach(button => {
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--mx', `${(event.clientX - rect.left - rect.width / 2) * .045}px`);
      button.style.setProperty('--my', `${(event.clientY - rect.top - rect.height / 2) * .07}px`);
    });
    button.addEventListener('pointerleave', () => { button.style.setProperty('--mx', '0px'); button.style.setProperty('--my', '0px'); });
  });
}
