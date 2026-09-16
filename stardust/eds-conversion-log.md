# EDS conversion log — India Uncharted, variant C (cinematic)

Source prototype: `stardust/prototypes/index-C-cinematic.html`
Runtime: vanilla aem-boilerplate (see `stardust/runtime-contract.json`).
Environment: Experience Catalyst (EMA) — build + local gates only; DA deploy is a UI action (handoff script run at the end).

## Block inventory (10 blocks + chrome)

| Block | Kind | Notes |
|---|---|---|
| hero | bespoke / template-slotted, full-bleed | LCP img eager+fetchpriority, ken-burns, parallax; owns Lenis init; page's only `<h1>` |
| enquiry | interactive | JS-rendered form (CSP blocks authored forms); `@ew-exempt all` |
| cards ("Special Packages") | reconstructive grid | photo + meta + h3 + desc + outline CTA; gold stars generated (aria-hidden) |
| welcome | bespoke split band, full-bleed | 50/50 photo + copy panel, badge overlay |
| features | icon triad | glyph parsed to `.ico`; section on `sand` ground |
| destinations | bespoke full-bleed mosaic | gap:0 grid, first tile big, per-tile parallax |
| testimonial | bespoke quote card | quote-mark + stars generated (aria-hidden); `tinted` section |
| themes | bespoke full-bleed band | 4-up seamless photo band, per-tile parallax |
| cta-band | bespoke full-bleed | photo + scrim + centered copy + CTA |
| blog | reconstructive grid | photo + h3 + plain "Read more" link (not buttonized) |
| header / footer | chrome | stock blocks restyled; `/nav` + `/footer` authored docs |

## Decisions locked

- **Palette + type pinned (Mode A):** coral `#e3876e`, clay, espresso, sand, gold; Tenor Sans (display) + Poppins (body), both self-hosted OFL from `@fontsource`.
- **Editorial motion** (register: editorial) ported from the prototype's inline `<script>` into a shared `/scripts/motion.js` runtime (reveal / parallax / Lenis / ken-burns), imported by blocks. Global CSS primitives (`[data-anim]`, `.kenburns`, reduced-motion neutralization) live in `styles.css`. All motion is a no-op under `prefers-reduced-motion`.
- **Section styles** (small closed set): `full-bleed`, `tinted`, `sand`, `dark` — used by full-bleed photo bands and default-content grounds.

## David's Model lint — dispositions

- **19 × 🔴 D4 (image src not fully qualified):** ACCEPTED / not a release gate. Per the EMA-environment rule in `stardust:deploy` SKILL.md, image srcs are intentionally left local (`/stardust-media/<file>`); EMA's uploader rehosts them on DA upload. Authoring `content.da.live` URLs here would break them (uploader short-circuits on absolute URLs). The handoff script points these at `stardust/current/assets/media/` by basename.
- **4 × 🟡 D1 (default-content candidate):** JUSTIFIED as genuine blocks, not bare prose:
  - `enquiry` — interactive JS-rendered form (bespoke widget).
  - `cards` — repeating card units with per-card CTA + JS-generated star ratings.
  - `features` — icon-triad composition (glyph → styled icon circle).
  - `testimonial` — bespoke quote card with generated quote-mark + stars.

## QA gate results (local harness)

- `qa-gate.mjs`: 42 ok / 0 warn / 2 fail. The 2 fails are `header`/`footer` rendering empty in the harness — documented harness limitation (chrome fetches `/nav` + `/footer` fragments not on local routes), not a defect. On the deployed preview the chrome renders.
- Exactly one `<h1>`; 10 sections; all 10 content blocks decorated + non-empty; 0 page errors; 19/19 images load.

## Follow-ups before go-live (deploy-time)

- **Font-fallback CLS calibration:** `poppins-fallback` / `tenor-fallback` `size-adjust`/`ascent`/`descent` in `styles.css` were NOT machine-computed (no fonttools/network in this environment) — recompute from the woff2 (Step 4 #11 recipe) and verify CLS < 0.1 on the deployed preview.
- Run the deployed computed-style guard + CLS probe once the page is live (deploy-only checks, per skill).

## Site-specific notes

- Header uses the stock 3-section nav model (brand / sections / tools); brand link is a bare `<a>` (not buttonized), so the stock `header.js` `.button-container` cleanup is a no-op (guarded).
- `stardust-media/` at repo root is a served copy for the local harness; the canonical media lives in `stardust/current/assets/media/`.

---

## Template archetypes (added 2026-09-16)

Built one archetype per template (7 templates from stardust/site-catalog.json). Each reuses the variant-C block system; 2 new blocks added.

| Template | Archetype page | New blocks used |
|---|---|---|
| home | content/index.plain.html | — (all variant-C blocks) |
| destination-hub | content/goa-tour-packages.plain.html | — (hero, welcome, cards, cta-band, enquiry) |
| tour-detail | content/rajasthan-wildlife-tour-package-6-days-5-nights.plain.html | **itinerary**, **inclusions** |
| blog-post | content/best-ayurvedic-wellness-retreat-goa.plain.html | — (hero, blog, cta-band + native prose) |
| content-simple | content/about-us.plain.html | — (hero, features, cta-band) |
| listing | content/destinations.plain.html | — (hero, destinations, cta-band) |
| contact | content/contact-us.plain.html | — (hero, features-as-contact-cards, enquiry) |

### New blocks
- **itinerary** — day-by-day / numbered-stop accordion (EW-safe: h3 header is a role=button div, not a `<button>`; first day open; reduced-motion instant).
- **inclusions** — two-column included / not-included lists with generated ✓/✕ markers (--clay / --muted); stacks under 700px.

### QA (harness qa-gate, per archetype)
goa-tour-packages 26/0/0 · rajasthan-wildlife 28/0/0 · best-ayurvedic 20/0/0 · about-us 22/0/0 · destinations 20/0/0 · contact-us 20/0/0 — all PASS (0 fail). `npm run lint` exit 0. David's Model: only EMA-accepted D4 (local img srcs) + justified 🟡 D1 (cards/enquiry/features/blog are genuine blocks).

### Contact-details / map
Contact facts rendered via the `features` block (icon + label + value cards) rather than a bespoke `contact-details` block — reuse over new code. Map embed deferred (optional, not in source content).

### Remaining
119 pages `discovered`, template-assigned, awaiting roll-out across their template members: destination-hub ×20, tour-detail ×46, blog-post ×9, plus /transfers, /activity, /blogs, and 41 taxonomy pages flagged for review.

---

## Destination-hub roll-out (added 2026-09-16)

All 21 destination-hub pages migrated (1 archetype + 20 rolled out). Generated by a data-driven template generator from scraped content (title, Why-Visit prose, package links, images) — one shape, 20 pages. Reuses hero/welcome/cards/cta-band/enquiry (no new blocks).

- **QA:** all 20 pass qa-gate 0-fail (one transient broken-image on varanasi resolved by re-fetching varanasi23.jpg). `npm run lint` exit 0. David's Model: only EMA-accepted D4 (local img srcs) + justified 🟡 D1 (cards/enquiry).
- **Media:** 50 new hub images downloaded to stardust/current/assets/media + staged in stardust-media/.
- **Internal links:** package-card CTAs point to migrated detail pages where available, else localized to /destinations or /contact-us (re-run localize after tour-detail roll-out to reconnect).
- **Status:** destination-hub template 21/21 migrated. Site total: 27/126 migrated, 99 discovered.

---

## Tour-detail roll-out (added 2026-09-16)

All 47 tour-detail pages migrated (1 archetype + 46 rolled out). Data-driven generator parsed each source page's rendered DOM into structured tour data (overview, day-by-day itinerary with sub-point lists, inclusions, exclusions, why-choose, best-time, hero) and poured it into the tour-detail template. Reuses hero, itinerary, inclusions, welcome, cta-band, enquiry — the itinerary/inclusions blocks built earlier carried the whole batch.

- **Extraction:** headings scanned h1–h4 (the WP theme uses inconsistent levels — "Tour Overview"/"Package Inclusions" are often `<h1>`); days detected by "Day N"/emoji-numbered-stop headings; body paragraphs + `<ul>` sub-points associated per day.
- **Coverage:** day-by-day itinerary on the multi-day tours; short single-experience pages (walking/cycle/food/sightseeing) render overview + inclusions without an accordion (correct — they have no day structure).
- **QA:** all 46 pass qa-gate 0-fail (two batches of 23). David's Model: 0 non-D4 structural 🔴; only EMA-accepted local img srcs + justified 🟡. `npm run lint` exit 0.
- **Media:** 32 new tour images downloaded; 2 unresolved variants fall back to a staged image via the generator.
- **Links:** localize-links reports 0 rewrites — generator emitted correct root-relative internal links; hub package cards now reconnect to their migrated detail targets.
- **Status:** tour-detail 47/47 migrated. Site total: 73/126 migrated, 53 discovered.
