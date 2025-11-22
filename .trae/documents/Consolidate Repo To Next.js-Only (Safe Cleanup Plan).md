## Summary
Keep the Next.js app and its required backend pieces; remove Vite/Express and legacy artifacts. No code changes will be executed until you approve.

## What Must Be Kept
- Next app: `app/`, `public/`, `next.config.mjs`, `postcss.config.js`, `tailwind.config.ts`
- API deps used by Next:
  - `server/db.ts` (Neon + Drizzle client the Next API routes import)
  - `shared/schema.ts` (tables used by Drizzle in Next API)
- Environment files: `.env.local`, `.env.development` (contain `DATABASE_URL`, `JWT_SECRET`, reCAPTCHA keys)

## What Will Be Deleted
- Client app and assets: `client/` (and `client/public`)
- Express server code not needed by Next: `server/index.ts`, `server/routes.ts`, `server/auth.ts`, `server/vite.ts`, `server/storage.ts` and other non-`db.ts` files
- Build outputs and SPA artifacts: `dist/` and any `dist/public`
- Legacy copies: entire `BitcoinWFSLOLD/`
- Vite configuration: `vite.config.ts`
- Misc dev-only assets under `attached_assets/` if not needed by Next static site

## Package Cleanup (After Deletion)
- Scripts: remove `dev:express`, `build:express`, `start:express`
- Dependencies: remove Express/Vite/related packages (`express`, `vite`, `@vitejs/plugin-react`, `esbuild`, `tsx`, `helmet`, `express-session`, etc.) while keeping Next/Tailwind/Drizzle/Neon and UI libraries
- Tailwind content paths: update to only scan `./app/**/*.{js,jsx,ts,tsx}`

## Safety Checks
1. Re-run Next dev and verify:
   - Home renders all sections and team images
   - API endpoints `/api/login` and `/api/investment-plans` respond
2. Search for any remaining imports referencing deleted paths (`client/*`, `server/*` except `server/db.ts`) and fix if found

## Rollback Consideration
- Preserve a temporary backup folder before deletion for quick restore if needed.

If you approve, I will perform the cleanup, adjust `package.json` and Tailwind content, and verify the Next.js app end-to-end. 