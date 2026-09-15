import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 *
 * Authored /footer sections (default content), rendered in order into a 4-column grid:
 *   1. brand link + blurb   2. Get in Touch   3. Quick Links   4. Location + copyright
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer-inner';
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // tag the columns (each authored section is a default-content-wrapper)
  const cols = [...footer.querySelectorAll(':scope > .default-content-wrapper')];
  cols.forEach((col, i) => col.classList.add('footer-col', `footer-col-${i + 1}`));

  block.append(footer);
}
