import { reveal } from '../../scripts/motion.js';

/**
 * Testimonial — centered white quote card on a tinted surface (variant C).
 * Authored rows: 1) <h3> title, 2) quote <p>, 3) attribution <p> (e.g. "Priya Sharma").
 * The big coral open-quote mark and the gold stars are GENERATED decoration.
 * We MOVE the authored h3/quote/attribution into the .quote-card (never rebuild
 * from textContent), then reveal the card.
 */
export default function decorate(block) {
  const title = block.querySelector('h1, h2, h3, h4, h5, h6');
  const paras = [...block.querySelectorAll('p')];
  const quote = paras[0];
  const attribution = paras[1];

  const card = document.createElement('div');
  card.className = 'quote-card';

  /** @ew-exempt generated decoration — aria-hidden, not authored content */
  const mark = document.createElement('div');
  mark.className = 'mark';
  mark.setAttribute('aria-hidden', 'true');
  mark.textContent = '“';
  card.append(mark);

  if (title) card.append(title); // MOVE
  if (quote) card.append(quote); // MOVE
  if (attribution) {
    attribution.classList.add('who');
    card.append(attribution); // MOVE
  }

  /** @ew-exempt generated decoration — aria-hidden rating stars, not authored content */
  const stars = document.createElement('div');
  stars.className = 'stars';
  stars.setAttribute('aria-hidden', 'true');
  stars.textContent = '★★★★★';
  card.append(stars);

  block.replaceChildren(card);

  reveal([card]);
}
