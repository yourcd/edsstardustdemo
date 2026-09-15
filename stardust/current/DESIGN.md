---
colors:
  background: "#ffffff"
  surface: "#f8f8f8"
  surfaceWarm: "#e5e3dc"
  text: "#2b2b2b"
  textStrong: "#3e2e1d"
  primary: "#e3876e"
  secondary: "#897055"
  accent: "#e6ae48"
  muted: "#a8a8a8"
  footer: "#23282d"
typography:
  headingFamily: "Tenor Sans"
  bodyFamily: "Poppins"
  h1: { size: "40px", weight: 500, lineHeight: "55px" }
  body: { size: "15px", lineHeight: 1.7 }
rounded: "mixed (20px cards / 50px pills / 5-6px chips)"
spacing: "ad-hoc; generous vertical rhythm between full-width bands"
components: ["header-nav", "hero-with-form", "package-card", "destination-tile", "feature-triad", "testimonial-card", "theme-carousel", "blog-card", "footer"]
---

# DESIGN — India Uncharted (current state, descriptive)

_Provenance: stardust:extract from https://indiauncharted.com/ computed styles._

## Color
Warm earth system. Coral/terracotta `#e3876e` is the signature accent (all CTAs, highlights, ratings backdrop). Muted clay `#897055` carries headings; deep espresso `#3e2e1d` anchors dark overlays and text-on-photo. Neutrals are white, off-white `#f8f8f8`, and a warm sand panel `#e5e3dc`. Footer is charcoal `#23282d`. A stray pure-orange `#ff6600` and a blue shadow tint leak in from theme defaults.

## Typography
Display: **Tenor Sans** — elegant, wide, editorial caps — used for hero and section titles (in clay `#897055`). Body: **Poppins** 15px. A third family (Rubik) and Times New Roman fallbacks appear from theme/plugins. The scale is ad-hoc: a large hero (40px) then compressed section titles, with weak modular rhythm.

## Motifs
- Cards with 10–20px radius and soft `0 5px 15px rgba(0,0,0,.1)` lift.
- Pill CTAs at 50px radius in coral.
- Faint world-map / dotted-route watermark behind some bands.
- Star-rating rows in gold.

## Layout
Classic stacked full-width bands: hero+form → package cards → welcome (image cluster + copy) → feature triad → destination tiles → testimonials → theme carousel → CTA band → blog grid → charcoal footer. Centered headings with a short eyebrow line. Desktop-first WordPress theme composition.
