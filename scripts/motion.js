/*
 * India Uncharted — editorial motion runtime (register: editorial, reading-paced).
 * Shared across blocks via /scripts/ (the only sanctioned cross-block import path).
 * Every entry point is a no-op under prefers-reduced-motion: reduce.
 *
 * Ported from the variant-C prototype's inline motion script:
 *   - reveal: fade + gentle rise as a band settles (IntersectionObserver, center-biased)
 *   - parallax: rAF-driven, re-baselined each frame, hard-clamped to ~10vh
 *   - Lenis smooth-scroll: reading-paced, with native anchor resolution
 *   - ken-burns: CSS-only (blocks add the .kenburns class; neutralized by reduced-motion CSS)
 */

export const prefersReducedMotion = () => window.matchMedia
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveal a set of elements on scroll. Marks them [data-anim] (base CSS in styles.css),
 * staggers siblings, and adds .in when they enter the viewport.
 * @param {Element[]} els elements to reveal
 * @param {Element} [group] optional shared parent for stagger indexing
 */
export function reveal(els, group) {
  const list = [...els].filter(Boolean);
  if (!list.length) return;
  list.forEach((el) => el.setAttribute('data-anim', ''));

  if (prefersReducedMotion()) {
    list.forEach((el) => el.classList.add('in'));
    return;
  }

  // per-group stagger, capped under the 600ms/section budget
  const counts = new Map();
  list.forEach((el) => {
    const parent = group || el.parentElement;
    const idx = counts.get(parent) || 0;
    el.style.transitionDelay = `${Math.min(idx, 3) * 140}ms`;
    counts.set(parent, idx + 1);
  });

  if (!('IntersectionObserver' in window)) {
    list.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  list.forEach((el) => io.observe(el));
}

/** Reveal immediately (above-the-fold hero copy — no scroll wait). */
export function revealNow(els) {
  [...els].filter(Boolean).forEach((el) => { el.setAttribute('data-anim', ''); el.classList.add('in'); });
}

// ---- Parallax: shared registry, single rAF loop, re-baselined each frame ----
const parallaxEls = [];
let parallaxBound = false;
let vh = window.innerHeight;
let maxShift = Math.round(vh * 0.10); // editorial clamp ~10vh

// Lenis instance shared between parallax() (scroll source) and initLenis() (owner).
let lenisInstance = null;

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function applyParallax() {
  const mid = vh / 2;
  for (let i = 0; i < parallaxEls.length; i += 1) {
    const { el, speed } = parallaxEls[i];
    const r = el.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const t = clamp((center - mid) * speed, -maxShift, maxShift);
    el.style.transform = `translate3d(0, ${t.toFixed(1)}px, 0)`;
  }
}

/**
 * Register an element for gentle parallax. No-op under reduced motion.
 * @param {Element} el layer to translate
 * @param {number} speed negative = moves up as it scrolls into view (e.g. -0.05)
 */
export function parallax(el, speed = -0.05) {
  if (!el || prefersReducedMotion()) return;
  parallaxEls.push({ el, speed });
  if (!parallaxBound) {
    parallaxBound = true;
    if (lenisInstance) {
      lenisInstance.on('scroll', applyParallax);
    } else {
      window.addEventListener('scroll', () => requestAnimationFrame(applyParallax), { passive: true });
    }
    window.addEventListener('resize', () => {
      vh = window.innerHeight; maxShift = Math.round(vh * 0.10); applyParallax();
    });
    window.addEventListener('load', applyParallax);
  }
  applyParallax();
}

// ---- Lenis smooth scroll — initialized once, reading-paced ----
let lenisReady = false;

export async function initLenis() {
  if (lenisReady || prefersReducedMotion() || lenisInstance) return;
  lenisReady = true;
  try {
    const mod = await import('./lenis.min.js');
    const Lenis = mod.default || window.Lenis;
    if (!Lenis) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisInstance = lenis;
    // if parallax was registered before Lenis was ready, drive it from Lenis scroll now
    if (parallaxBound) lenis.on('scroll', applyParallax);
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    // native in-page anchors still resolve (no scroll-jack)
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (ev) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) { ev.preventDefault(); lenis.scrollTo(target, { offset: -74 }); }
        }
      });
    });
  } catch (e) {
    // Lenis missing/blocked — native scroll is the graceful fallback
    lenisReady = false;
  }
}
