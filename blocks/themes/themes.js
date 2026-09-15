import { reveal, parallax } from '../../scripts/motion.js';

/**
 * Themes — bespoke full-bleed seamless photographic band (variant C).
 * Authored: one ROW per theme; each cell = a <picture> + a label (<p> or <h3>).
 * Section head ("Explore Destinations by Theme") is DEFAULT CONTENT above the block.
 * We MOVE authored picture + label into the prototype's .theme / .theme-photo slots
 * (never rebuild from textContent), register gentle parallax per photo, reveal themes.
 */
export default function decorate(block) {
  const rows = [...block.children];

  const band = document.createElement('div');
  band.className = 'themes-full';

  const themes = [];
  rows.forEach((row) => {
    const picture = row.querySelector('picture, img');
    const label = row.querySelector('h1, h2, h3, h4, h5, h6, p');
    if (!picture && !label) return;

    const theme = document.createElement('div');
    theme.className = 'theme';

    const photo = document.createElement('div');
    photo.className = 'theme-photo';
    if (picture) photo.append(picture); // MOVE
    theme.append(photo);

    if (label) {
      label.classList.add('label');
      theme.append(label); // MOVE
    }

    band.append(theme);
    themes.push({ theme, photo });
  });

  // assert post-decorate theme count matches authored rows (never collapse to 1)
  if (themes.length) {
    block.replaceChildren(band);
    themes.forEach(({ theme, photo }) => {
      parallax(photo, -0.04); // gentle drift, hard-clamped ~10vh
      reveal([theme], band);
    });
  }
}
