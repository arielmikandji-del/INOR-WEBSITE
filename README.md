# Handoff: INOR Security — Marketing Website

## Overview
A one-page marketing site for INOR Security, a close-protection / executive-security firm. Positions the brand around discretion and precision rather than visible bulk presence, targeting high-net-worth principals and public figures (e.g. MPs). The design nods subtly to the founders' Irish heritage via an interlaced-knot motif and a shield-derived mark, without being overtly "Celtic."

## About the Design Files
The files in this bundle are **design references built in HTML** (a prototyping format used during design) — they show the intended look, motion, and behavior, not production code to copy verbatim. The task is to **recreate this design in your target codebase's existing stack** (e.g. React/Next.js, Vue, or plain templated HTML/CSS with a bundler) using its established conventions — or, if no frontend stack exists yet, standard semantic HTML/CSS/JS is the simplest fit here since the page has no complex state.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy placement, and animation timings shown are final-intent. Copy marked "Lorem ipsum" is placeholder text the client still needs to supply — everything else (headlines, labels, nav items, contact channels) is final copy.

## Screens / Views
Single scrolling page, sections in order:

1. **Navbar** (fixed, floating pill)
   - Logo left (`shield-and-name-transparent.svg`), links center (Services / Protocol / Contact), CTA pill right ("Initiate").
   - Transparent + white text over hero; on scroll (`scrollY > 40`) it crossfades to a frosted light pill (`rgba(220,216,208,0.85)`, `backdrop-filter: blur(20px)`) with dark text — 400ms ease transition on background, border, color, box-shadow. Logo filter swaps from `brightness(0) invert(1)` (white) to none (natural color) in the same transition.
   - CTA pill: dark bg/light text when unscrolled → inverts when scrolled.

2. **Hero** (`min-height:100dvh`)
   - Full-bleed background photo (`photo-suv-dusk.jpg`), `object-position: center 30%`, `filter: saturate(0.8) brightness(0.9)`, plus a diagonal gradient scrim: `linear-gradient(100deg, rgba(16,32,24,0.95) 0%, rgba(16,32,24,0.82) 45%, rgba(16,32,24,0.45) 100%)`.
   - Left-aligned content block, max-width 720px, padding-top 120px:
     - Eyebrow line: "EXECUTIVE PROTECTION MEETS" — Inter 700, `clamp(20px,3vw,30px)`, uppercase, `#F5F2EE`.
     - Headline: "Absolute discretion." — Playfair Display italic, `clamp(48px,9vw,112px)`, line-height 0.9.
     - Subcopy (JetBrains Mono, 14px, uppercase, letter-spacing 0.08em, `rgba(245,242,238,0.7)`): "Vetted operators. Plain clothes. Single-point command. Sized to the principal — never to a package."
     - CTA pill "Initiate Consultation" — accent-colored background, rounded-full, JetBrains Mono 14px uppercase. Hover: `translateY(-2px)`.
     - Trust row: "SIA-licensed operators • NDA-backed engagements • 24/7 tasking" — JetBrains Mono 11px, dot separators.
   - Right side: a large brand mark — the INOR shield SVG (accent-colored) centered in a floating "island," with two concentric pulsing rings (`heartbeatRing` keyframes, 6.5s, offset by half-cycle) and a subtle heartbeat scale-pulse on the shield itself (`heartbeatPulse`, 3.6s).
   - Entire hero content block fades/slides up on load (`fadeUp`, 1.1s cubic-bezier(0.22,1,0.36,1)).
   - **Divider mark**: near the bottom of the hero (absolute, ~96px from hero's bottom edge, so it renders over the photo, not at the section seam), a thin horizontal rule flanked left/right by gradient-fade lines, centered on a small circle-with-crosshair glyph (a plain circle, one horizontal line, one vertical line through the center — intentionally simple, not the shield logo).

3. **Core Capabilities / Services** (`#services`, light stone background `#DCD8D0`)
   - Eyebrow "Core Capabilities" (accent color) + heading "Precision-engineered" / italic Playfair "risk mitigation."
   - 3-column card grid (`grid-template-columns: repeat(auto-fit, minmax(300px,1fr))`, gap 32px), each card `border-radius:32px`, `height:400px`:
     - **Executive Protection** (light card, `rgba(232,226,220,0.5)`): title + copy, then a dark inset panel (`#102018`) containing a radar/orbit SVG graphic (rotating satellite dots on tracking lines around a center point, two pulsing red "blip" markers). Caption below: "Perimeter control."
     - **Risk Assessment** (dark card, `#102018`): title + copy + a "Live Feed" pill badge with a pulsing red dot (`liveDot`, 1.6s). Bottom 60% is a city-aerial photo fading to the card's dark background, with two pulsing red blips overlaid.
     - **Secure Transport** (light card, same treatment as card 1): dark inset panel with an animated dashed route line (`dashFlow`, 4s ease-in-out infinite alternate) tracing a path between two waypoints, plus faint decorative route curves. Caption: "Route integrity."
   - All three cards fade/rise/blur into view on scroll (staggered 0/130/260ms delays — see Interactions).

4. **Philosophy** (dark, `#102018`, concrete texture photo overlay at 22% opacity)
   - Two-line statement: muted "Most security focuses on: standardized visible presence." above a large italic Playfair line "We focus on: **absolute discretion.**" (the bolded/colored phrase uses the accent color). Both lines scroll-reveal with a slight stagger.

5. **Protocol** (`#protocol`, light stone `#DCD8D0` background)
   - Header: the interlaced-knot graphic (`celtic-knot.png`, `mix-blend-mode: multiply`, ~55% opacity, stretched to `min(90%, 560px)` wide) sits above the eyebrow "The Protocol."
   - Three full-width "sticky stacking" cards, one per step (01 Reconnaissance / 02 Implementation / 03 Constant Watch). See Interactions for the stacking mechanic. Card colors alternate for visual rhythm: card 01 is bone/light, card 02 is solid accent-color, card 03 is bone/light again — text colors invert per card to stay legible.
   - Each card: left column = step number (accent-tinted), title (Inter 700, `clamp(32px,5vw,52px)`), description (JetBrains Mono 15px). Right column = a unique animated SVG per step:
     - **01 Reconnaissance** — a radar-sweep graphic: concentric range rings + crosshairs, a rotating sweep wedge (`spin360`, 4.5s linear) with a trailing line, two pulsing contact "blips" fixed on the rings (deliberately a surveillance/recon visual, not abstract).
     - **02 Implementation** — a fingerprint-scan graphic: static fingerprint ridge paths that flash color momentarily (`fpFlash`, 3.2s) while a horizontal scan line sweeps top-to-bottom through a gradient glow band (`fpScan`, 3.2s).
     - **03 Constant Watch** — a lens/aperture graphic: multiple concentric rings rotating at different speeds/directions (`spin360`/`spinRev360`), a breathing central ring (`breathe`, 3s), four soft aperture-blade triangles, and a small red tracking dot that jitters (`trackJitter`, 2.4s).
   - Small "NN — 03" index label pinned top-right of each card.

6. **Tagline / Brand Statement** (near-black `#0a120d`, control-room photo background at 55% opacity with a top/bottom gradient scrim)
   - Centered: eyebrow "Our Standard" (accent color) + large italic Playfair line "Security without compromise." Scroll-reveals in.

7. **Contact** (`#contact`, dark `#102018`)
   - Two columns: left = eyebrow "Initiate Contact," heading "Confidentiality" / italic "from the first word.", supporting copy, and three contact rows (Secure Line phone, Encrypted Comms email, Headquarters) each with a circular icon badge.
   - Right = a bordered glass panel (`rgba(245,242,238,0.04)` bg, `rgba(245,242,238,0.1)` border, `border-radius:32px`) containing a form: Identifier (name), Comms Relay (email), Nature of Request (textarea), and a full-width accent-colored "Transmit Request →" submit pill.
   - Both columns scroll-reveal (right column delayed 150ms).

8. **Footer** (near-black `#0a120d`, top border `rgba(245,242,238,0.1)`)
   - Left: full lockup logo (`shield-and-name-footer.svg` — the shield mark + "INOR" wordmark, recolored to warm white `#F5F2EE` for the dark background) + copyright line.
   - Right: "Privacy Protocol" / "Terms of Engagement" links.

## Interactions & Behavior

- **Custom cursor** (desktop / fine-pointer only, disabled under `prefers-reduced-motion`): a small 8px solid dot tracks the raw mouse position 1:1; a 36px ring trails it with exponential smoothing (`lerp factor 0.16` per animation frame) using `requestAnimationFrame`. Both use `mix-blend-mode: difference` so they invert against any background. On hovering any `a, button, input, textarea`, the ring scales up to 1.7× (smoothed at factor 0.2). This entirely replaces the OS cursor.
- **Scroll reveals**: any element flagged for reveal starts at `opacity:0`, `translateY(72px) scale(0.96)`, `blur(8px)`, and animates to its natural state (`opacity:1`, no transform, no blur) over 1.1s `cubic-bezier(0.22,1,0.36,1)` the first time it crosses 15% into the viewport (`IntersectionObserver`, `threshold:0.15`, one-shot — unobserve after firing). Elements can carry a per-element delay in ms. Applies to: services header, all 3 service cards (staggered 0/130/260ms), both philosophy lines (0/180ms), the tagline block, and both contact-column blocks (0/150ms).
- **Navbar scroll transition**: crossfades between transparent/white-text (top of page) and frosted-light/dark-text (scrolled past 40px) — 400ms ease on all relevant properties, triggered by a scroll listener (throttling not required at this scale but recommended in production).
- **Protocol section "stacking cards"**: each step's card is `position: sticky` within its own full-viewport-height wrapper, with an increasing `top` offset per card (step 1: 24px, step 2: 44px, step 3: 64px) so cards visibly shingle/peek above one another as they stack. On every scroll tick, a per-card transform is computed: as the *next* card's wrapper approaches the top of the viewport (`nextRect.top / viewportHeight`, clamped 0–1), the *current* card scales down to as low as 0.9×, translates up to -26px, and dims via `brightness()`/`saturate()` filters (down to ~0.65/0.7) — producing a receding-behind-the-next-card effect. Additionally, while a card's own wrapper is still below the viewport top (i.e. sliding in), it gets a slight rotation (up to 2deg) that eases to 0 as it settles at rest — a subtle "deck of cards" tilt-in. This computation re-runs on every `scroll` event; a production build should throttle it with `requestAnimationFrame` (this prototype recalculates directly in the scroll handler, which is fine at this scale but not best practice for a shipped site).
- **Anchor nav**: `html { scroll-behavior: smooth }` — nav links scroll smoothly to `#services`, `#protocol`, `#contact`.
- **Reduced motion**: all of the above (cursor, reveals) are skipped entirely when `prefers-reduced-motion: reduce` matches. The various decorative SVG animations (radar sweep, fingerprint scan, orbiting dots, pulsing rings) are driven by a single `motionEnabled` flag/prop in the prototype and should likewise be gated behind the OS reduced-motion preference in production (currently they run continuously via CSS `@keyframes` and are only toggled by an explicit design-time flag, not automatically by the media query — worth wiring up when implementing).
- **Contact form**: prototype only prevents default submit; wire to your real form backend/validation.

## State Management
Minimal — this is a static marketing page. State needed:
- `scrolled: boolean` — navbar treatment toggle (`window.scrollY > 40`).
- Cursor position + smoothed ring position/scale + hover flag — local to the cursor-follower effect, not app state.
- No data fetching. Contact form fields are uncontrolled/local until you wire a submit handler.

## Design Tokens

**Colors**
- Ink / deepest dark: `#102018` (near-black green-black used for dark sections, primary text)
- Darkest backgrounds: `#0a120d` (tagline + footer)
- Stone / light background: `#DCD8D0`
- Light card tint: `rgba(232,226,220,0.5)` (card 1/3 background), solid light card alt: `#E8E4DC`
- Warm white (text on dark): `#F5F2EE`
- Accent (default, tweakable): `#2A4A38` (deep green) — alternates offered: `#4A2A32` (oxblood), `#1F2A44` (navy), `#4A3A20` (bronze)
- Alert/tracking red accent (fixed, not tweakable): `oklch(0.577 0.245 27.325)` — used only for small "live" blips/dots, never as a primary color

**Typography**
- Display/italic: Playfair Display, italic, weights 500/600/700 — used for emotive headline phrases only
- Body/UI/headings: Inter, weights 400–800
- Labels/mono/data: JetBrains Mono, weights 400–600, almost always uppercase with `letter-spacing: 0.08–0.2em`

**Spacing / Radius**
- Section padding: 96–140px vertical, 24px horizontal minimum
- Card radius: 32px (service cards), 40px (protocol cards), 20px (inset graphic panels), 999px (pills/buttons)
- Grid gaps: 32px (cards), 64px (contact columns)

**Shadows**
- Service cards: `0 2px 12px rgba(16,32,24,0.05)` (light cards), `0 8px 30px rgba(16,32,24,0.2)` (dark card)
- Protocol cards: `0 24px 60px rgba(16,32,24,0.28)`
- Scrolled navbar: `0 8px 24px rgba(16,32,24,0.12)`

## Assets
All included in `assets/`:
- `photo-suv-dusk.jpg` — hero background (armored/executive vehicle at dusk)
- `photo-aerial-city.jpg` — Risk Assessment card background
- `photo-concrete-texture.jpg` — Philosophy section texture overlay
- `photo-control-room.jpg` — Tagline section background
- `celtic-knot.png` — interlaced-knot band graphic (user-supplied artwork), used above "The Protocol" heading with `mix-blend-mode: multiply`
- `shield-and-name-transparent.svg` — navbar logo (shield + wordmark)
- `shield-and-name-footer.svg` — footer lockup, recolored to warm white (`#F5F2EE`) for the dark footer background (the source file had a white background layer stripped and its ink paths recolored)

Note: the large accent-colored shield graphic in the hero, and the radar/fingerprint/aperture SVGs in the Services and Protocol sections, are hand-built inline SVG paths in the prototype (not separate image assets) — recreate as SVG/CSS, or export as icon assets, per your codebase's conventions.

## Files
- `INOR Security.dc.html` — the full prototype (single file, inline-styled). All copy, exact colors, and animation keyframes referenced above are defined here — refer to it directly for anything not fully specified in this README (e.g. exact SVG path coordinates for the shield mark, precise keyframe percentages).
