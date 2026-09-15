import { reveal, parallax } from '../../scripts/motion.js';

/**
 * CTA band — bespoke full-bleed photographic band with a flat espresso scrim,
 * centered white heading + lede + one primary CTA (variant C).
 * Authored rows: 1) media picture, 2) h2, 3) lede p, 4) CTA p (<strong><a>).
 * decorateButtons() runs first (=> a.button.primary in p.button-wrapper).
 * We MOVE authored nodes into the prototype's .cta-band-bg / .inner slots.
 */
export default function decorate(block) {
  // media layer
  const bg = document.createElement('div');
  bg.className = 'cta-band-bg';
  bg.setAttribute('data-parallax', '-0.05');
  const picture = block.querySelector('picture');
  if (picture) bg.append(picture); // MOVE

  // copy layer
  const inner = document.createElement('div');
  inner.className = 'inner';

  const heading = block.querySelector('h2');
  const paras = [...block.querySelectorAll('p')].filter((p) => !bg.contains(p));
  const ctaWrappers = paras.filter(
    (p) => p.classList.contains('button-wrapper') || p.querySelector('a.button'),
  );
  const lede = paras.find((p) => !ctaWrappers.includes(p));

  if (heading) inner.append(heading);
  if (lede) inner.append(lede);
  ctaWrappers.forEach((p) => inner.append(p)); // MOVE the CTA <p>

  block.replaceChildren(bg, inner);

  parallax(bg, -0.05);
  reveal([heading, lede, ...ctaWrappers], inner);
}
