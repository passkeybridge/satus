# satus.ai — Visual overhaul

Keep all current content verbatim. Replace the visual system, the page chrome, and the section composition. No new sections, no new copy, no logic changes.

## Direction

Treat the page as a **published technical specification** — something between an IETF RFC, an O'Reilly chapter, and an internal engineering memo. Restraint is the brand. Whitespace and hairlines do the talking; one red accent is the only color decision the user notices.

What it must NOT look like:
- A SaaS landing page with a glowing CTA and a gradient hero
- A generic "developer tool" page with a fake terminal and a marquee of logos
- Anything resembling the Lovable defaults (centered hero, soft shadows, rounded cards, pastel accents)

## Visual system

**Palette (Swiss Red on paper)**
- `--paper` `#fafaf7` background
- `--ink` `#0a0a0a` text and rules
- `--mute` `#525252` secondary text
- `--signal` `#dc2626` single accent — used only for: the wordmark dot, section numerals, the primary CTA underline, and inline `marker` highlights. Never for backgrounds, never for gradients.
- Hairline rule: `1px solid #0a0a0a` at 100% on structural dividers, `1px solid rgba(10,10,10,0.12)` for in-content separators.

**Typography**
- Display & section labels: **JetBrains Mono** (400/500), tracked tight, often UPPERCASE for labels, lowercase for headlines. Headlines stay relatively small (28–40px) — restraint, not billboard.
- Body: **Work Sans** (400/500), 15–16px, generous line-height (1.65), max measure ~62ch.
- Code/inline: JetBrains Mono at body size, no background tint, just `[ ]` or `·` delimiters where needed.
- No serif anywhere. Drop Instrument Serif and IBM Plex.

**Texture**
- Flat paper, no grain, no shadow, no glow, no gradient, no glassmorphism.
- Border radius: `0` on every structural element. Inputs and the install snippet may use `2px`. Cards do not exist.
- Motion: none on load except a single 200ms fade for the page. No hover lifts. Underlines on links animate width (left-to-right, 150ms). That's it.

## Page chrome

**Top bar** (full-width, hairline bottom border, 56px tall):
- Left: `satus` wordmark in JetBrains Mono, with a single `.` rendered in `--signal`.
- Center-left: monospace breadcrumb-style nav `~/overview  ~/profiles  ~/pricing  ~/quickstart  ~/docs`
- Right: `v0.1.0-alpha` build tag in mute, and a small ghost button `github ↗`.

**Two-column shell** (the layout choice):
- Left rail: 240px sticky, hairline right border. Contains a monospace table of contents — numbered (`01 · 02 · 03 …`), scroll-spy active state shown by inverting the row (ink background, paper text). Below the TOC: small metadata block (`status: draft  ·  updated: 2025-05-25  ·  spec: satus/0.1`).
- Right column: content, max-width `~720px`, left-aligned, never centered.

**Footer**: a single hairline-bordered strip with three monospace columns (`product · resources · legal`) and a final line `satus.ai — built for engineers who hate seeing John Doe in their demo data.`

## Section composition (re-using existing copy)

Every section follows the same pattern:
```text
┌─────────────────────────────────────────────┐
│ § 03                                        │
│ HOW IT WORKS                  ──── label    │
│                                             │
│ generate seed data that              ←──── lowercase headline
│ respects your foreign keys.                 │
│                                             │
│ Body paragraph in Work Sans, ~62ch.         │
│                                             │
│ ── hairline ──                              │
│                                             │
│ Numbered list / table / snippet             │
└─────────────────────────────────────────────┘
```

Specific section treatments:

1. **Hero / §00** — No giant headline. A short paragraph (the existing tagline) sits flush-left under a label `RFC · SATUS-001`. The install snippet (`npm i -g satus`) is rendered as a copyable monospace line with a `$` prompt and a quiet copy button. Below it, a single sentence CTA-link with red underline: `read the quickstart →`. The terminal mock card is removed — replaced by a small left-aligned monospace block showing 4–5 lines of real `satus generate` output as inline text, no chrome, no traffic-light dots.

2. **Problem / §01** — Two-up monospace comparison table (`faker` vs `satus`), columns separated by a vertical hairline. No icons, no checkmarks — just text and dashes.

3. **How it works / §02** — Numbered list `01 → 05`, each step a single line of mono label + one sentence of Work Sans description. No icons, no cards.

4. **Profiles / §03** — Three stacked rows (not a 3-column card grid). Each row: profile name in mono, one-line description, and a small inline `schema preview` snippet showing 2–3 table names like `appointments · patients · providers`. Hairline between rows.

5. **Pricing / §04** — One monospace table, three columns (Free · Pro · Team), feature rows aligned. No tier "cards", no popular-badge, no shadows. The Pro column has a single red left-border (1px) as the only visual emphasis.

6. **Quickstart / §05** — Renders as a literal numbered code block, monospace throughout, with prose between steps rendered as `# inline comments` in mute color. Reads like a README.

## Files to change

- `src/styles.css` — replace fonts (drop Instrument Serif + IBM Plex, keep JetBrains Mono, add Work Sans 400/500/600), replace palette tokens, set radii to 0, remove grain, drop `--marker` and `--rule` in favor of `--ink`/`--signal`/`--mute`.
- `src/routes/index.tsx` — full presentational rewrite into the two-column shell with the section composition above. No copy changes.
- `src/routes/__root.tsx` — no changes (metadata already correct).

No new packages. No new components needed beyond local sub-components inside `index.tsx` (`TopBar`, `LeftRail`, `Section`, `SpecTable`). No dependency on Cloud, no logic changes.

## Engineering notes

- The sticky TOC scroll-spy uses `IntersectionObserver` against the section `id`s. Pure client-side, no library.
- All horizontal rules are `<hr>` styled via CSS — no `<div class="border-b">` proliferation.
- Tables use real `<table>` semantics for the comparison and pricing blocks.
- Accessibility: contrast ratio of `#0a0a0a` on `#fafaf7` is ~19:1; red on paper is ~5.7:1 (passes AA for body, AAA for headlines).
