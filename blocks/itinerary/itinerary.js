import { reveal } from '../../scripts/motion.js';

/**
 * Itinerary — day-by-day / numbered-stop accordion for tour-detail pages.
 * Authored rows: one ROW per day/stop. Each row's cell holds an <h3> title
 * followed by body content (paragraphs and/or a <ul> of sub-points).
 *
 * decorate(): each row becomes a `.itin-day`. The authored <h3> is MOVED into a
 * clickable `.itin-head` div (NOT a <button> — the h3 must stay editable in EW7),
 * which carries the click handler + role/tabindex/keydown + aria-expanded and a
 * generated (aria-hidden) chevron. The authored paragraphs/lists are MOVED into an
 * expandable `.itin-body`. First day open by default. reveal() the days.
 */
export default function decorate(block) {
  const rows = [...block.children];

  const days = rows.map((row, i) => {
    const day = document.createElement('div');
    day.className = 'itin-day';

    const heading = row.querySelector('h1, h2, h3, h4, h5, h6');
    const bodyEls = [...row.querySelectorAll('p, ul, ol')];

    const bodyId = `itin-body-${Date.now().toString(36)}-${i}`;

    // header: MOVED h3 + generated chevron; the DIV (not a button) is the control
    const head = document.createElement('div');
    head.className = 'itin-head';
    head.setAttribute('role', 'button');
    head.setAttribute('tabindex', '0');
    head.setAttribute('aria-controls', bodyId);

    if (heading) head.append(heading); // MOVE

    /** @ew-exempt generated decoration — aria-hidden chevron, not authored content */
    const chevron = document.createElement('span');
    chevron.className = 'itin-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    head.append(chevron);

    // body: MOVED paragraphs/lists inside an inner wrapper (grid-rows height animation)
    const body = document.createElement('div');
    body.className = 'itin-body';
    body.id = bodyId;

    const inner = document.createElement('div');
    inner.className = 'itin-body-inner';
    bodyEls.forEach((el) => inner.append(el)); // MOVE
    body.append(inner);

    const open = i === 0;
    day.classList.toggle('open', open);
    head.setAttribute('aria-expanded', open ? 'true' : 'false');

    const toggle = () => {
      const isOpen = day.classList.toggle('open');
      head.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    head.addEventListener('click', toggle);
    head.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggle();
      }
    });

    day.append(head, body);
    return day;
  });

  block.replaceChildren(...days);

  reveal(days, block);
}
