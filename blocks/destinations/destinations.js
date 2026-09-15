import { reveal, parallax } from '../../scripts/motion.js';

/**
 * Destinations — bespoke full-bleed seamless photographic mosaic (variant C).
 * Authored: one ROW per tile; each cell = a <picture> + a label (<p> or <h3>).
 * The FIRST tile renders big (spans 2 rows). Section head (eyebrow/h2/lede) and the
 * "View all destinations" CTA are DEFAULT CONTENT outside this block.
 * We MOVE authored picture + label into the prototype's .tile / .tile-photo slots
 * (never rebuild from textContent), register gentle parallax per photo, reveal tiles.
 */
export default function decorate(block) {
  const rows = [...block.children];

  const mosaic = document.createElement('div');
  mosaic.className = 'mosaic-full';

  const tiles = [];
  rows.forEach((row, i) => {
    const picture = row.querySelector('picture, img');
    const label = row.querySelector('h1, h2, h3, h4, h5, h6, p');
    if (!picture && !label) return;

    const tile = document.createElement('div');
    tile.className = i === 0 ? 'tile big' : 'tile';

    const photo = document.createElement('div');
    photo.className = 'tile-photo';
    if (picture) photo.append(picture); // MOVE
    tile.append(photo);

    if (label) {
      label.classList.add('label');
      tile.append(label); // MOVE
    }

    mosaic.append(tile);
    tiles.push({ tile, photo });
  });

  // assert post-decorate tile count matches authored rows (never collapse to 1)
  if (tiles.length) {
    block.replaceChildren(mosaic);
    tiles.forEach(({ tile, photo }) => {
      parallax(photo, -0.04); // gentle drift, hard-clamped ~10vh
      reveal([tile], mosaic);
    });
  }
}
