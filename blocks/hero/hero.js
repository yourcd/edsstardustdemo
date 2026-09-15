import { revealNow, parallax, initLenis } from '../../scripts/motion.js';

/**
 * Hero — bespoke cinematic full-bleed band (variant C).
 * Authored rows: 1) media picture, 2) eyebrow p, 3) h1, 4) sub p, 5) trust p, 6) CTAs p.
 * decorateButtons() runs first: authored <strong><a> => a.button.primary and
 * <em><a> => a.button.secondary, each inside a p.button-wrapper.
 * We MOVE the authored nodes into the prototype's .hero-bg / .hero-inner slots
 * (never rebuild from textContent), then wire the editorial motion runtime.
 */
export default function decorate(block) {
  // --- media layer ---
  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  bg.setAttribute('data-parallax', '-0.06');

  const picture = block.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      img.loading = 'eager'; // #100 — above-fold hero image loads eagerly
      img.setAttribute('fetchpriority', 'high');
      img.classList.add('kenburns'); // global .kenburns (neutralized under reduced-motion)
    }
    bg.append(picture); // MOVE, not clone
  }

  // --- copy layer ---
  const inner = document.createElement('div');
  inner.className = 'hero-inner';

  const heading = block.querySelector('h1');

  // all authored paragraphs except any that live in the media layer
  const paras = [...block.querySelectorAll('p')].filter((p) => !bg.contains(p));

  // CTA wrappers (p.button-wrapper produced by decorateButtons) — MOVE the <p>
  const ctaWrappers = paras.filter(
    (p) => p.classList.contains('button-wrapper') || p.querySelector('a.button'),
  );
  const actions = document.createElement('div');
  actions.className = 'hero-actions';
  ctaWrappers.forEach((p) => actions.append(p));

  // remaining plain paragraphs, in authored order: eyebrow, sub, trust
  const textParas = paras.filter((p) => !ctaWrappers.includes(p));
  const [eyebrow, sub, trust] = textParas;
  if (eyebrow) eyebrow.classList.add('eyebrow');
  if (sub) sub.classList.add('sub');
  if (trust) trust.classList.add('trust');

  // assemble in prototype order
  if (eyebrow) inner.append(eyebrow);
  if (heading) inner.append(heading);
  if (sub) inner.append(sub);
  if (trust) inner.append(trust);
  if (actions.children.length) inner.append(actions);

  block.replaceChildren(bg, inner);

  // --- editorial motion ---
  revealNow([eyebrow, heading, sub, trust, actions]); // above-fold copy resolves on load
  parallax(bg, -0.06); // gentle media drift, hard-clamped ~10vh
  initLenis(); // smooth-scroll, initialized once from the hero
}
