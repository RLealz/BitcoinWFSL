## Verification Summary
- Tailwind scanning includes Next app: tailwind.config.ts:5-9
- Global gradient matches Vite style: app/globals.css:13-14 (+ fixed attachment at 14)
- Utility classes ported: app/globals.css:20-41 (gradient-background, text-gradient), animation: app/globals.css:43-56
- Header style matches: app/components/sections/header.tsx:24-33
- Hero cloned: app/components/sections/hero.tsx (yellow accent, centered CTA)
- Features cloned: app/components/sections/features.tsx (cards with yellow headings)
- Investment Plans cloned: app/components/sections/investment-plans.tsx (tabs, cards)
- Calculator cloned: app/components/sections/calculator.tsx (inputs, select, computed panels)
- CTA cloned: app/components/sections/cta.tsx
- Home composition mirrors client flow: app/page.tsx:12-20
- React Query provider present: app/components/query-provider.tsx and used in app/layout.tsx:17-22

## Gaps Found
- Missing theme CSS variables used by shadcn-style tokens (e.g., bg-muted, border-input): tailwind.config.ts:17-67 referenced; no matching `--primary`, `--muted`, etc in app/globals.css.
- InvestmentPlans imports a non-existent file: app/components/sections/investment-plans.tsx:10 imports `../../data/sample-investment-plans`; the source exists only at client/src/data/sample-investment-plans.ts.
- InvestmentPlans references shared types with incorrect path depth: app/components/sections/investment-plans.tsx:8 should target repo-root `shared/schema.ts`.
- Team section not an exact visual/UX clone (no Dialog/motion cards): app/components/sections/team.tsx vs client/src/components/sections/team.tsx.
- Next app lacks `/api/investment-plans`; current fetch relies on fallback data and would 404 otherwise.

## Plan To Close Gaps
### Theme Tokens
1. Add default CSS variables in Next `app/globals.css` for shadcn tokens: `--primary`, `--muted`, `--border`, etc to stabilize `bg-muted`, `border-input`, and related utilities.

### Data Imports & Types
2. Provide sample data for Next: add `app/data/sample-investment-plans.ts` (mirroring client/src/data/sample-investment-plans.ts) or adjust import to `../../../client/src/data/sample-investment-plans` for immediate parity.
3. Fix type import path in InvestmentPlans to `../../../shared/schema`.

### Sections Parity
4. Port the client Team component (dialog/motion cards) to Next under `app/components/sections/team.tsx` for exact UX parity.

### API Parity (Optional for full clone)
5. Implement Next API route `app/api/investment-plans/route.ts` that returns active plans (mirroring Express logic) so the Next app does not rely on fallback data.

### Verification
6. Run Next dev and visually validate: gradient, header translucency, hero, features, plans tabs, calculator panels, CTA, and team dialog interactions.
7. Check classes that use token colors (`bg-muted`, `text-primary`) render correctly after variables are added.

If you approve, I will apply these targeted fixes to complete the exact clone and verify the result end-to-end.