# CalcPatrimoine — Web UI kit

Recreations of the core calcpatrimoine.fr surfaces as reusable JSX components.

## Files
- `index.html` — Full click-through prototype (landing → calculator).
- `Tokens.jsx` — CSS variables + global font import (mirror of `colors_and_type.css`).
- `Header.jsx`, `Footer.jsx` — Site chrome.
- `Landing.jsx` — Homepage (hero, calculator grid, articles).
- `RenteCalculator.jsx` — Full calculator page (inputs, reversion, result).
- `RangeField.jsx` — Range+number combo (the repeating input pattern).
- `Tooltip.jsx`, `Icon.jsx`, `Alert.jsx` — Small atoms.

## What this kit is
High-fidelity cosmetic recreations. Calculations are stubbed (linear
approximation) so the kit can be used for static mocks without pulling in
the real mortality tables.

## What this kit is NOT
Production code. There's no routing, no real calc engine, no tracking, no
SEO metadata, no disclaimer copy block (kept minimal for reuse).
