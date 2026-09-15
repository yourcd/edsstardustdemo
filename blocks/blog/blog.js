import { reveal } from '../../scripts/motion.js';

/**
 * Blog — reconstructive card grid of posts (variant C).
 * Authored: one ROW per post; cell = <picture> + <h3> title + a plain <a>Read more</a>.
 * The "Read more" link is a plain anchor (NOT a formatted button), styled as .read.
 * We MOVE authored picture / h3 / link into .post > .post-media + .post-body
 * (never rebuild from textContent), then reveal each post.
 */
export default function decorate(block) {
  const rows = [...block.children];

  const grid = document.createElement('div');
  grid.className = 'blog-grid';

  const posts = [];
  rows.forEach((row) => {
    const picture = row.querySelector('picture, img');
    const title = row.querySelector('h1, h2, h3, h4, h5, h6');
    const link = row.querySelector('a');
    if (!picture && !title && !link) return;

    const post = document.createElement('article');
    post.className = 'post';

    const media = document.createElement('div');
    media.className = 'post-media';
    if (picture) media.append(picture); // MOVE
    post.append(media);

    const body = document.createElement('div');
    body.className = 'post-body';
    if (title) body.append(title); // MOVE
    if (link) {
      link.classList.add('read');
      // link may be wrapped in an authored <p> — move the anchor itself
      body.append(link); // MOVE
    }
    post.append(body);

    grid.append(post);
    posts.push(post);
  });

  // assert post-decorate post count matches authored rows (never collapse to 1)
  if (posts.length) {
    block.replaceChildren(grid);
    posts.forEach((post) => reveal([post], grid));
  }
}
