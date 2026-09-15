import { reveal } from '../../scripts/motion.js';

/**
 * Welcome — bespoke full-bleed editorial split band (variant C).
 * 50/50: left = full-height photo with a coral "badge" pill; right = surface copy panel.
 * Authored rows (one node each):
 *   1) <picture> (left photo)
 *   2) badge text <p>
 *   3) eyebrow <p>
 *   4) <h2>
 *   5..6) body <p>s
 *   7) CTA <p> (<strong><a> -> a.button.primary in p.button-wrapper)
 * decorateButtons() runs first. We MOVE authored nodes into
 * .welcome-band > .welcome-photo(.badge) + .welcome-copy — never rebuild.
 */
export default function decorate(block) {
  const band = document.createElement('div');
  band.className = 'welcome-band';

  // --- photo layer ---
  const photo = document.createElement('div');
  photo.className = 'welcome-photo';
  const picture = block.querySelector('picture') || block.querySelector('img');
  if (picture) photo.append(picture); // MOVE

  // --- copy layer ---
  const copy = document.createElement('div');
  copy.className = 'welcome-copy';
  const inner = document.createElement('div');
  inner.className = 'welcome-copy-inner';

  const heading = block.querySelector('h2, h3');

  // paragraphs not living in the photo layer, in authored order
  const paras = [...block.querySelectorAll('p')].filter((p) => !photo.contains(p));
  const ctaWrappers = paras.filter(
    (p) => p.classList.contains('button-wrapper') || p.querySelector('a.button'),
  );
  const textParas = paras.filter((p) => !ctaWrappers.includes(p));

  // first text paragraph = badge (overlay on the photo), second = eyebrow, rest = body
  const [badge, eyebrow, ...body] = textParas;
  if (badge) {
    badge.classList.add('badge');
    photo.append(badge); // MOVE onto the photo layer as the coral pill
  }
  if (eyebrow) eyebrow.classList.add('eyebrow');

  if (eyebrow) inner.append(eyebrow);
  if (heading) inner.append(heading);
  body.forEach((p) => inner.append(p)); // MOVE body paragraphs
  ctaWrappers.forEach((p) => inner.append(p)); // MOVE the CTA <p>

  copy.append(inner);
  band.append(photo, copy);
  block.replaceChildren(band);

  // reveal the copy elements (photo stays static — no parallax required)
  reveal([eyebrow, heading, ...body, ...ctaWrappers], inner);
}
