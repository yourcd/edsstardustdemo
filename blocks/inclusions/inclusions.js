import { reveal } from '../../scripts/motion.js';

/**
 * Inclusions — two-column "what's included / what's not" list for tour-detail pages.
 * Authoring model: two cells (in one row, or two rows) — first list = inclusions,
 * second list = exclusions. The section title (e.g. "Package Inclusions") is authored
 * as DEFAULT CONTENT above the block and styled via
 * .inclusions-container .default-content-wrapper.
 *
 * decorate(): reads the two authored <ul>s and MOVES them into two column cards —
 * left "Included" (✓, tinted --clay), right "Not included" (✕, --muted). The check /
 * cross markers are generated ::before decoration in CSS (aria-hidden by nature).
 * reveal() the columns.
 */
export default function decorate(block) {
  const lists = [...block.querySelectorAll('ul')];
  const included = lists[0];
  const excluded = lists[1];

  const columns = [];

  const buildColumn = (list, modifier, label) => {
    const col = document.createElement('div');
    col.className = `incl-col incl-${modifier}`;

    /** @ew-exempt generated decoration — column label, not authored content */
    const head = document.createElement('p');
    head.className = 'incl-col-title';
    head.textContent = label;
    col.append(head);

    if (list) col.append(list); // MOVE authored <ul>/<li>
    return col;
  };

  if (included) columns.push(buildColumn(included, 'yes', 'Included'));
  if (excluded) columns.push(buildColumn(excluded, 'no', 'Not included'));

  block.replaceChildren(...columns);

  reveal(columns, block);
}
