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
