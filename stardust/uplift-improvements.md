---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-09-15T11:52:00.000Z
  againstInput: https://indiauncharted.com/
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/index.json
    - stardust/current/brand-review.html
---

# Improvements — https://indiauncharted.com/

1. **[dated-pattern]** Hero reads as a 2018-era WordPress travel template — the centered headline sits over a single photo with a boxed multi-field capture form (Name / Email / Phone / Package) crammed into the first viewport (tension: "Template-era hero + inline lead form"; screenshot ~top 2000px shows form band directly under headline) · pattern at fault: form-in-hero + double-CTA density · fix: full-bleed cinematic hero with the headline and a single primary CTA ("Plan my journey"); demote the enquiry form to a focused step below or a slide-in, so the first frame sells the destination, not the paperwork.

2. **[missed-opportunity]** The brand's strongest asset — authentic destination photography (Taj Mahal, Jaisalmer forts, Varanasi ghats, tiger/leopard, desert boats) — is cropped to thumbnail scale (46 images captured in `pages/index.json#media.imgs`, nearly all rendered as small cards/tiles ≤ ~300px wide) · pattern at fault: photo-as-thumbnail in card grids · fix: restore hero and destination imagery to editorial 3:2 / 4:3 scale with lower-band title overlays; let the photography fill the frame instead of decorating it.

3. **[ia-clutter]** Voice is split between a boutique-hospitality register and a bargain-OTA one — the elegant Tenor Sans hero ("Turning Vacations Into Lifelong Stories") competes with a "UNLIMITED CHOICES | BEST PRICES | HAPPY MEMORIES | HOT DEALS" strip in the same viewport (`voice.tagline` in `_brand-extraction.json`) · pattern at fault: conflicting value propositions above the fold · fix: commit to the boutique-curated register; drop the discount banner or fold its substance into a single trust line ("Handcrafted itineraries · Local experts · 24/7 support").

4. **[contrast-or-density]** Inconsistent radius and CTA ladder plus leaked theme-default colors muddy the warm-earth system — radii span 5/6/10/20/50px with no clear step, and a stray pure-orange `#ff6600` and a blue shadow tint (`rgba(43,89,255,.08)`) appear alongside the coral `#e3876e` (`_brand-extraction.json#motifs.borderRadius`, `#palette`) · pattern at fault: WordPress/plugin style leakage · fix: define one radius ladder (e.g. 8 / 16 / 999px pill), retire the stray orange and blue tints, and standardize all CTAs on the coral pill.

5. **[dated-pattern]** Section rhythm is flat and centered-everything — every band uses the same centered eyebrow + title + centered body, giving no hierarchy or pacing across a long page (headings outline in `pages/index.json#headings` shows 20 uniformly-centered section titles) · pattern at fault: monotone centered stack · fix: introduce asymmetry and scale contrast — alternate full-bleed image bands with tighter editorial two-column sections, and let a few destination features break the grid.
