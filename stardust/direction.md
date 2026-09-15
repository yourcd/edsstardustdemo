# Redesign direction — India Uncharted (uplift, 3 variants)

_Provenance: stardust:uplift Phase 3, against https://indiauncharted.com/._
_Reference grounding (Phase 2.5): skipped — no reference-research tool wired in this run; degrades gracefully per SKILL.md._

## Shared constraints (Mode A — brand-faithful)
- **Palette pinned:** coral `#e3876e` (primary), clay `#897055` (secondary), espresso `#3e2e1d`, gold `#e6ae48`, sand `#e5e3dc`, surface `#f8f8f8`, white, charcoal footer `#23282d`. Retire leaked `#ff6600` and blue shadow tint.
- **Type pinned:** Tenor Sans (display) + Poppins (body). No new families.
- **IA preserved:** header nav (Home/About/Destinations/Activity/Transfers/Blogs/Contact), enquiry affordance reachable from first viewport, package/destination/theme/testimonial/blog sections, charcoal footer.
- **Photography reused in semantic positions:** hero stays hero, destination images stay destinations.
- **Register:** boutique-curated (drop bargain-OTA banner).

## Cinematic register (Phase 3a)
Picked: **editorial**. Rationale: PRODUCT.md register is `brand`, place-led, reading-paced storytelling ("we create stories you'll cherish"); the strongest asset is photography. Per motion-registers § Selection heuristic, `editorial` traits → `editorial` register. Second-choice: `arrival`.

## Variant A — Faithful + improvements

Role: risk-averse green-light. "Yes, that's us, with the obvious fixes."
Composition: same IA as captured.
Motion: static (no cinematic layer).
Improvements applied (from uplift-improvements.md):
1. Full-bleed hero, single primary CTA; enquiry form demoted below hero.
2. Destination/hero photography restored toward editorial scale.
3. Boutique voice committed; bargain banner replaced with one trust line.
4. One radius ladder (8 / 16 / 999px pill); stray orange + blue tints retired; CTAs standardized on coral pill.
5. Asymmetric section rhythm replacing the monotone centered stack.

## Variant B — What if we amplified Tenor Sans display type?

Role: design-team motivator. The brand's underused display face foregrounded.
What if: "What if Tenor Sans stopped whispering in eyebrows and became the structural voice of the whole page?"
Captured trait amplified: Tenor Sans display type.
Evidence: `_brand-extraction.json#type` — Tenor Sans confined to a 40px H1 and small titles while Poppins carries everything.
Composition: oversized editorial Tenor Sans headlines and section numerals, display-set nav labels, tighter body measure so type carries hierarchy; destination content as a labeled editorial rail rather than a uniform card grid.
Motion: static (no cinematic layer).

## Variant C — What if motion was part of the identity?

Role: visionary pitch. The brand's third dimension — kinetic.
What if: "What if the destination photography breathed at full editorial scale and moved with you as you travel down the page?"
Cinematic register: editorial (auto-picked from PRODUCT.md Brand Personality).
Captured trait amplified: destination photography (the trait `editorial` naturally amplifies through motion).
Evidence: `pages/index.json#media.imgs` — 46 authentic destination images rendered at thumbnail scale.
Composition: identical IA to A; the bet is motion, not layout — full-bleed image sections with slow scroll-linked reveal, gentle parallax, and titles that resolve over the photograph as it settles.
Motion: cinematic, register editorial.

## Differentiation axes
- A vs B: hero pattern + type hierarchy + composition rhythm (≥ 2).
- A vs C: motion layer + full-bleed photographic composition (≥ 2).
- B vs C: axis of amplification — typography (static) vs photography (motion), plus composition primitive (editorial rail vs full-bleed cinematic bands) (≥ 2).
