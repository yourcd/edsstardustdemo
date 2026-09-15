import { createOptimizedPicture } from '../../scripts/aem.js';
import { reveal } from '../../scripts/motion.js';

/**
 * Cards — "Special Packages" 3-up package grid (variant C).
 * RECONSTRUCTIVE: authors add/remove cards, one ROW per card. Each card cell holds
 * a <picture>, a meta line (e.g. "6 Days · 5 Nights"), an <h3>, a <p> desc and an
 * <em><a>Explore</a> CTA. decorateButtons() runs first, so the <em><a> arrives as
 * a.button.secondary inside a p.button-wrapper (the outline "Explore" CTA).
 *
 * We segment strictly BY ROW (DA flattens cell nesting) and MOVE authored nodes into
 * the card scaffold — never rebuild from textContent/innerHTML.
 * The 5 gold stars are generated decoration.
 */
export default function decorate(block) {
  const rows = [...block.children];

  const cards = rows.map((row) => {
    const card = document.createElement('article');
    card.className = 'card';

    // --- media (match picture, img) ---
    const media = document.createElement('div');
    media.className = 'card-media';
    const picture = row.querySelector('picture') || row.querySelector('img');
    if (picture) media.append(picture); // MOVE

    // --- body ---
    const body = document.createElement('div');
    body.className = 'card-body';

    const heading = row.querySelector('h2, h3, h4');

    // CTA = a paragraph carrying a link (post-decorateButtons: p.button-wrapper > a.button)
    const allPs = [...row.querySelectorAll('p')];
    const ctaWrapper = allPs.find(
      (p) => p.classList.contains('button-wrapper') || p.querySelector('a'),
    );

    // text paragraphs = paragraphs that are neither the CTA nor an image wrapper
    const textPs = allPs.filter(
      (p) => p !== ctaWrapper && !p.querySelector('picture, img'),
    );
    const metaP = textPs[0];
    const descPs = textPs.slice(1);

    // meta row: authored duration MOVED left, generated stars right
    const meta = document.createElement('div');
    meta.className = 'card-meta';
    if (metaP) {
      metaP.classList.add('card-duration');
      meta.append(metaP); // MOVE authored duration text
    }
    // @ew-exempt <span> gold stars — generated decoration (aria-hidden)
    const stars = document.createElement('span');
    stars.className = 'stars';
    stars.textContent = '★★★★★';
    stars.setAttribute('aria-hidden', 'true');
    meta.append(stars);
    body.append(meta);

    if (heading) body.append(heading); // MOVE
    descPs.forEach((p) => body.append(p)); // MOVE
    if (ctaWrapper) body.append(ctaWrapper); // MOVE the CTA <p>, never the <a>

    card.append(media, body);
    return card;
  });

  block.replaceChildren(...cards);

  // reconstructive grid — one card per authored row, never collapsed to a single card

  // optimize the freshly-moved package photos
  block.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    );
  });

  reveal(cards, block);
}
