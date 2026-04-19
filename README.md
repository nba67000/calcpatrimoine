# CalcPatrimoine — Design System

**Calculateurs patrimoniaux open-source et transparents pour la France.**
CalcPatrimoine (calcpatrimoine.fr) is a French-language site providing free,
open-source, source-cited calculators for personal finance decisions: life
annuities (rente viagère), life-insurance taxation (assurance-vie),
inheritance transmission, TMI, PER, etc. The editorial voice is strictly
factual and **anti-advice** — the site _informs_, it does not _recommend_.

The creator, **Nicolas Barbier**, is a COBOL/AS400 analyst-developer in the
French life-insurance industry. That shapes everything: the tone is
technical, transparent, source-cited, and anti-marketing.

---

## Index

| File | What it is |
|------|------------|
| `README.md` | This file — brand context, content rules, visual foundations, iconography |
| `SKILL.md` | Agent-Skills compatible entry point; read this if invoking as a Claude Skill |
| `colors_and_type.css` | All CSS custom properties (colors, type scale, spacing, shadows, radii, motion) |
| `assets/` | Logos (SVG), favicon |
| `preview/` | Card previews registered to the Design System tab |
| `ui_kits/web/` | React recreations of core CalcPatrimoine site components |

---

## Sources

The entire system was extracted from the production codebase:

- **Repo:** `github.com/nba67000/calcpatrimoine` (branch `main`)
- **Site:** `https://calcpatrimoine.fr`
- Key files consulted:
  - `tailwind.config.ts` — color palette, font families, shadows, radii
  - `src/app/globals.css` — slider styling, focus ring
  - `src/app/layout.tsx` — Inter + Playfair Display + Roboto Mono via Fontsource
  - `src/components/Header.tsx`, `Footer.tsx` — logo lockup, nav patterns
  - `src/components/Icon.tsx` — the only 3 approved icons in the product
  - `src/components/Calculator/*Calculator.tsx` — calculator layout, result panel, disclaimer pattern
  - `src/components/LegalDisclaimer.tsx` — warning pattern
  - `src/components/Tooltip.tsx`, `RangeSlider.tsx`
  - `CLAUDE.md` — editorial rules
  - `public/logo.svg`, `public/favicon.svg`

---

## CONTENT FUNDAMENTALS

### Language
**French (fr-FR) exclusively.** All copy, even technical labels, is French.
Decimal separator is a comma; thousands separator is a non-breaking space
(`150 000 €`, `3,75 %`). Currency symbol follows the number with a space.

### Editorial stance — _anti-advice_
The single most important rule: **CalcPatrimoine informs, it does not advise.**
Quoting `CLAUDE.md` verbatim: _"on écrit 'l'option X aboutit à un impôt de Y€',
'l'écart entre les deux est de Z€'"._ Never write _"vous devriez"_, _"choisissez"_,
_"il est préférable"_.

Suggestions are factual + conditional only:
- ✅ _"En fractionnant sur 2 ans, vous économiseriez 450 €"_
- ❌ _"Nous vous conseillons de fractionner"_

### Tone
- **Technical, transparent, sourced.** Every tax rate, every threshold, every
  formula cites a primary source (Légifrance, BOFiP, INSEE, INED).
- **Calm and quiet.** No exclamation marks in marketing copy. No hype words
  (_incroyable_, _révolutionnaire_, _le meilleur_). No superlatives in meta
  descriptions.
- **Second-person singular formal (`vous`).** Always `vous`, never `tu`.
- **Patrimonial vocabulary, unpacked.** Technical terms (_rente viagère_,
  _seuil de rentabilité_, _réversion_) are used and then explained inline
  or in a `Tooltip`.

### Casing
- **Sentence case for headings** (`Calculez votre rente viagère`), not
  Title Case.
- **Proper nouns capitalized** (`INSEE`, `PFU`, `CGI`, `BOFiP`).
- **ALL CAPS reserved for eyebrows** (`CALCULATEURS`, `RESSOURCES`) with
  wider tracking — footer column labels only.
- The brand is **CalcPatrimoine** (one word, two capital letters).

### Voice examples from the codebase

> _"Calculateurs gratuits pour vos décisions patrimoniales"_ (hero)

> _"Outils open-source pour simuler rente viagère, fiscalité assurance-vie,
> et optimiser votre patrimoine. Aucune donnée conservée, calculs 100% côté
> navigateur."_ (lede)

> _"À 72 ans avec 250 000 €, le seuil tombe à 15,8 ans. Ce n'est pas une
> anomalie."_ (article dek — declarative, numerate, anti-clickbait)

Trust markers are short, factual badges: `100% gratuit`, `Open-source`,
`Zéro tracking`, `Tables INSEE officielles`. No emoji.

### Emoji policy
**None in the product UI.** `CLAUDE.md` is explicit: _"Pas d'icônes emoji
dans le code source (UTF-8 mojibake fréquent)."_ The repo's README uses
emoji decoratively (🎯 🧮 🚧) but the shipped product does not. For design
system mocks, treat emoji as forbidden — use the three-icon `Icon` component
(`check`, `cross`, `warning`) or short text badges.

### Disclaimers
Every calculator ships with `<LegalDisclaimer />` at the top and a warning
block at the bottom. Disclaimer tone is formal, exhaustive, almost legalistic
— but still in sentence case. Always lists: _ce n'est pas un conseil,
consultez un CGP / notaire / expert-comptable, dernière mise à jour
(mois année)_.

---

## VISUAL FOUNDATIONS

### The aesthetic in one sentence
**"Confiance bancaire moderne"** — modern banking trust. Think: Stripe's
density + a French retail-bank's muted navy + INSEE's sobriety. Clean,
quiet, numeric, low-chrome.

### Color
- **Primary: navy blue.** `#2E4A6F` is the workhorse; `#1E3A5F` is hover;
  `#0A2540` is deep-brand. The 50/100 tints are used for soft-callout
  backgrounds (`primary-50` for info alerts, calculator highlight boxes).
- **Accent: gold/amber.** `#D4AF37 → #B8860B`. Almost never used in UI;
  reserved for a "premium" shadow recipe and future accents. **Do not
  introduce gold casually** — it's a brand lever held in reserve.
- **Neutrals: slate.** Tailwind-standard slate 50–900.
- **Warning: amber** (`#F59E0B`). The only non-primary color shipped in
  the UI today, and exclusively for disclaimer blocks.
- `success` and `error` tailwind tokens are **aliased to primary** in
  `tailwind.config.ts`. This is intentional: the brand unifies "trust"
  under one blue. Do not use green for success states or red for errors
  in layouts — use primary blue. (The Icon component's green check /
  red cross are the one narrow exception.)

### Typography
- **Inter** (400/500/600/700) — everything (nav, body, headings, numbers).
- **Playfair Display** (700) — available via Fontsource, intended for
  editorial moments (blog h1, _À propos_). Use sparingly.
- **Roboto Mono** (500/700) — reserved for tabular numbers in the result
  panels; applied via `.tabular-nums`.
- **Hero sizes**: 60px for result displays (`--fs-6xl`), 48px for page h1
  (`--fs-5xl`). Tight letter-spacing (`-0.02em`).
- Line-height is generous: 1.5 for body, 1.625 for paragraphs in articles.

### Backgrounds
- **White (`#FFFFFF`) by default.** The site is bright and high-contrast.
- **Subtle bleed**: `bg-gradient-to-b from-primary-50 to-white` for hero
  sections. No dramatic gradients, no hero images, no patterns.
- **Dark only in footer.** `neutral-900` background.
- **No photography in the UI.** No illustrations. The OG image uses a
  logo-on-gradient template. This is a numbers-first product.

### Borders
- 1px solid `neutral-200` for default borders (cards, dividers).
- 2px for emphasized cards (`border-2 border-primary-200` on info callouts,
  `border-2 border-warning-300` on warnings).
- **4px colored left-border** is a recognized pattern here (see
  `card--accent-left`: `border-l-4 border-primary-600` on calculator form
  panels, `border-l-4 border-primary-300` on reversion block). Used
  deliberately — not decoratively — to mark "this is input" vs "this is
  result".
- **Result cards use 4px colored TOP-border** (`border-t-4 border-primary-600`).

### Radii
**Modest. 2–12px.** No pill shapes except the range-slider thumb and toggle
switches (which are genuinely circular). Cards use `rounded-lg` (8px) or
`rounded-xl` (12px). Inputs use `rounded-lg`. Logo tile uses `rounded-md`
(6px).

### Shadows
Five recipes, all flat and quiet:
- `subtle` — just a hairline, for pinned headers
- `card` — default card elevation
- `card-hover` — subtle lift on hover
- `result` — stronger shadow for hero result panel
- `premium` — amber-tinted glow, **unused in current UI** but defined

No inner shadows. No glows except the amber "premium" recipe.

### Animation
- **Framer Motion** for enter/exit. Durations are **0.2–0.3s**. Easings are
  `ease-in` / `ease-out` — no springs, no bounces.
- Entrance pattern: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`.
- Result-number animation: fade/slide on change (key={value}).
- CSS: `transition-colors`, `transition-all duration-200`. Hover lift is
  subtle (`hover:shadow-lg`).
- **No loading spinners in the product** — calculations are synchronous
  (<10ms) and debounced by 150ms.

### Hover states
- **Links in nav**: text color shifts from `neutral-600` → `neutral-900`.
- **Buttons / primary CTAs**: background darkens one shade
  (`primary-600` → `primary-700`).
- **Cards**: `hover:border-primary-400 hover:shadow-lg`.
- **Footer links**: `text-neutral-400 hover:text-white`.
- **Slider thumb**: `transform: scale(1.2)` + darker fill + stronger shadow.

### Press / active states
- **Sliders**: `cursor: grabbing` (no scale).
- **Buttons**: no dedicated `:active` styling beyond browser default.
- No shrink-on-press. No ripple effects.

### Focus
Universal: `outline: 2px solid var(--primary-600); outline-offset: 2px;`
Never removed. Visible on keyboard nav.

### Transparency and blur
- Minimal. `bg-white/50` appears once inside a reversion info box.
- No `backdrop-filter` / no glassmorphism anywhere.
- Sticky header is opaque white with a subtle shadow, not blurred.

### Layout rules
- Max-width **6xl (72rem / 1152px)** for the site shell (`Header`, `Footer`,
  landing).
- Max-width **4xl (56rem / 896px)** for calculator columns.
- Horizontal padding **px-4** at the page edge.
- Section padding **py-16 / py-20** on marketing sections, **p-8 / p-10**
  inside cards.
- Grid for calculator grid: `md:grid-cols-2 lg:grid-cols-3 gap-6`.

### Cards
Two recognized card species:
1. **Calculator-link card** (landing page): `rounded-xl border-2
   border-neutral-200 p-8`, hover lifts border to primary.
2. **Input/result card** (calculator pages): `rounded-lg shadow-md p-8/p-10`
   with a 4px colored left or top border indicating role.

Dashed borders (`border-dashed border-neutral-300`) mark "coming soon" /
unavailable items. This is a codified pattern.

### Imagery
**Almost none.** The brand is numbers and text. When you mock a design that
demands imagery, prefer a tinted navy placeholder or the OG-image-style
centered-logo-on-blue-gradient composition. Never generate photography.

---

## ICONOGRAPHY

### The three-icon rule
The product ships **exactly 3 icons**, all defined inline in
`src/components/Icon.tsx`:

| Name | Purpose | Fill |
|------|---------|------|
| `check` | Confirmation, trust markers, "consultez…" bullets | `#10B981` green circle |
| `cross` | "ne constitue pas…" bullets in disclaimers | `#DC2626` red circle |
| `warning` | Warning-block heading glyph | `#F59E0B` amber triangle |

All other glyphs in the product are:
- **Unicode arrows** (`→`) for "accéder au calculateur" link affordances
- **Inline SVGs** for hamburger + close (in `Header.tsx`)
- **Inline `?` SVG** for Tooltip triggers

### No icon font / no icon library
`CLAUDE.md` mentions `lucide-react` as a future option (_"pas encore
installé"_) but none is wired up. When recreating the brand, **do not pull
in Lucide, Heroicons, Tabler, or Font Awesome.** The design intent is
deliberate austerity.

### Recommended approach when you must add glyphs
1. Prefer **text labels** over icons. ("Accéder au calculateur →" is more
   CalcPatrimoine than any icon.)
2. If strictly necessary, hand-author an SVG in the pattern of `Icon.tsx`
   (circle-wrapped, bold stroke, flat color).
3. **Flag the substitution** — the brand rule is "3 icons, no more".

### Emoji
**Never in shipped UI.** Only appears in `README.md`, not in rendered pages.

### Unicode chars used as UI
- `→` arrow in CTAs
- `·` middle dot as separator in meta / category lines (_"Fiscalité · 11 min"_)
- `©` copyright in footer
- Non-breaking space in number formatting

---

## CAVEATS / ASKS

- **Fonts**: The source uses `@fontsource/*` npm packages. No `.ttf`/`.woff2`
  files are committed to the repo, and none were importable. This design
  system links Inter, Playfair Display, and Roboto Mono from **Google Fonts
  CDN**. These are the same foundry versions — no visual substitution — but
  if you have self-hosted brand-approved font files, drop them in a `fonts/`
  folder and flag it.
- **Logo**: The current `logo.svg` is a letterform "C" on a navy gradient
  square — pragmatic but not a proper wordmark. `LOGO_ASSETS_README.md` in
  the source repo explicitly flags this is a placeholder pending a Canva/
  Figma export. **Ask**: do you have a wordmark lockup?
- **OG image** (`og-image.png`, 1200×630) was not imported because it's a
  binary PNG; we kept the template guidelines instead.
- **Gold/amber accent** is defined in the token system but unused in
  shipped UI. The `shadow-premium` recipe is waiting for a "premium tier"
  or editorial moment — worth a call on whether to activate it.
- **Slide templates** were not part of this brand — no `slides/` folder.
- This system covers **one product** (the calcpatrimoine.fr web app).
  Separate calculators (Rente, AssuranceVie, Transmission, Couple, Inverse)
  all share the same shell and component vocabulary.

---

## Bold ask

**Please pressure-test the calculator-shell recreation in `ui_kits/web/`
against live calcpatrimoine.fr** (especially the range-slider thumb, the
warning-block spacing, and the 60px result number tracking). These are the
brand-critical surfaces. If the slider track gradient or the result panel's
top-border color feels off by even a shade, tell me — we'll tune the
tokens together.
