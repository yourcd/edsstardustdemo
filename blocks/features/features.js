import { reveal } from '../../scripts/motion.js';

/**
 * Features — feature triad (variant C). The band background (--sand) comes from the
 * section's `sand` style (set on the content page), so this block only styles the
 * white feature cards. The section head (eyebrow / h2 / lede) is authored as DEFAULT
 * CONTENT above and lands in .features-container .default-content-wrapper.
 *
 * Authoring: one ROW per feature, cell = a leading glyph char (or <strong> glyph),
 * an <h3>, and a <p>. We parse the leading glyph as the icon and MOVE authored
 * heading/paragraph nodes into the card — never rebuild from textContent.
 */
export default function decorate(block) {
  const rows = [...block.children];

  const features = rows.map((row) => {
    const feature = document.createElement('div');
    feature.className = 'feature';

    const heading = row.querySelector('h2, h3, h4');
    const paras = [...row.querySelectorAll('p')];

    // glyph source: a <strong> if present, else the first standalone text paragraph
    const strong = row.querySelector('strong');
    const glyphP = paras.find((p) => p !== heading && !p.querySelector('a'));
    let glyphSource = '';
    if (strong) glyphSource = strong.textContent;
    else if (glyphP) glyphSource = glyphP.textContent;
    const glyphChar = glyphSource.trim();

    // @ew-exempt <div> icon glyph circle — derived decoration (aria-hidden)
    const ico = document.createElement('div');
    ico.className = 'ico';
    ico.textContent = glyphChar || '✦';
    ico.setAttribute('aria-hidden', 'true');
    feature.append(ico);

    // the paragraph that only carried the glyph should not repeat as body copy
    const bodyParas = paras.filter((p) => {
      if (p === glyphP && !strong) return false;
      return p.textContent.trim() !== glyphChar;
    });

    if (heading) feature.append(heading); // MOVE
    bodyParas.forEach((p) => feature.append(p)); // MOVE
    return feature;
  });

  block.replaceChildren(...features);

  // triad — one card per authored row, never collapsed to a single card
  reveal(features, block);
}
