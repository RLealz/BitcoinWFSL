## Approach
- Use the provided template’s structure and tone (sections and emoji markers) while adapting all content to this repository’s Next.js app.
- Focus on the single Next.js app (Vite/Express artifacts already removed), describe architecture, setup, configuration, usage, and deployment.

## Contents To Include
1. Title & Overview: Project name and short description aligned to terminal-style aesthetic.
2. Key Features: Accessibility controls, hero/sections, API routes, JWT auth cookie, reCAPTCHA, rate-limiting.
3. Architecture:
   - Frontend: Next.js 15 App Router, TypeScript, Tailwind, shadcn/ui, Radix, Lucide, Framer Motion.
   - Data/ORM: Drizzle ORM with Neon serverless Postgres.
   - API Layer: Next API routes (login, investment-plans, leads, user); CSP and security.
   - State: React Query and hooks.
4. Installation & Setup:
   - Prereqs: Node 18+.
   - Clone, `npm install`, env setup, `npm run dev`.
   - Database: provision Neon, set `DATABASE_URL`, run `npm run db:push` and optional seed.
5. Configuration:
   - Env vars: `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`.
6. Usage Guide:
   - Access app, navigate sections, authentication flow, admin navigation, API endpoints.
7. Development:
   - Project structure tree for `app/`, components, api, lib, shared, server/db.
8. Build & Deployment:
   - `npm run build` / `npm run start`, Vercel notes.
9. Security Considerations: JWT cookies, CSP headers, rate limiting, reCAPTCHA, Neon best practices.
10. Testing/Checks: `npm run check` (TypeScript), manual verification steps.
11. Performance/Monitoring (adapted to Next).
12. Contributing: workflow mirroring template style.
13. System Requirements: browser/node versions.
14. Troubleshooting: port conflicts, env missing, DB connectivity, reCAPTCHA config.
15. License & Acknowledgments & Support.

## Deliverable
- Add `README.md` at repo root with the full document, matching the template’s style and format, but specific to this Next.js project.