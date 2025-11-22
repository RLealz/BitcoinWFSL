# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Essential Commands

### Development
```powershell
# Start development server (on port 3000)
npm run dev

# Change port if 3000 is busy
next dev -p 3001

# Type checking
npm run check

# Build for production
npm run build

# Start production server
npm run start
```

### Database
```powershell
# Push Drizzle schema to database (creates/updates tables)
npm run db:push
```

### Seeding
```powershell
# Run seed scripts if needed (use node with .js, tsx/ts-node with .ts)
node add-sample-plans.js
node setup-db.js
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router) with TypeScript strict mode
- **Database**: Neon Postgres via Drizzle ORM (serverless)
- **Styling**: Tailwind CSS with theme tokens in `app/globals.css`
- **UI Components**: shadcn/ui + Radix UI primitives
- **State**: React Query for server state, React Hooks for local state
- **Auth**: Custom JWT with httpOnly cookies (no external auth provider)
- **Validation**: Zod schemas with drizzle-zod integration

### Directory Structure
```
app/
├── api/              # Next.js API routes (login, logout, register, investment-plans, leads, user)
├── components/
│   ├── sections/     # Page sections (hero, features, plans, calculator, team, etc.)
│   └── ui/           # shadcn/ui reusable components
├── lib/              # Utilities (auth, rate-limit, recaptcha, constants, protected-route)
├── admin/            # Admin pages (protected)
├── auth/             # Authentication pages
├── data/             # Sample/static data
└── globals.css       # Global styles and CSS variables

server/
└── db.ts             # Drizzle client with Neon Pool

shared/
└── schema.ts         # Drizzle schema: users, userProfiles, investmentPlans, leads
```

### Path Aliases (tsconfig.json)
- `@/*` → root directory
- `@/components/*` → `app/components/*`
- `@/lib/*` → `app/lib/*`
- `@shared/*` → `shared/*`

### Authentication Flow
1. **Login**: POST to `/api/login` with `{username, password}` → returns JWT in httpOnly cookie
2. **Cookie**: Named per `COOKIE_NAME` constant in `app/lib/constants.ts`
3. **Verification**: Uses custom `verifyJwt` in `app/lib/auth.ts` (no external libraries)
4. **Password Hashing**: scrypt-based hashing via `hashPassword`/`verifyPassword` in `app/lib/auth.ts`
5. **Protected Routes**: Use `app/lib/protected-route.tsx` wrapper or check JWT in API routes

### Database Schema (shared/schema.ts)
- **users**: Authentication and profile flags
- **userProfiles**: Extended user information (phone, country, preferences, risk tolerance)
- **investmentPlans**: Fund types (crypto, real-estate, emerging-tech) with risk levels and returns
- **leads**: Contact form submissions with conversion tracking

### Security Practices
- **JWT**: httpOnly, sameSite=lax, secure in production
- **CSP Headers**: Defined in `next.config.mjs` for reCAPTCHA (Google endpoints)
- **Rate Limiting**: In-memory rate limiter in `app/lib/rate-limit.ts`
- **reCAPTCHA**: Server-side verification in `app/lib/recaptcha.ts` on lead submissions
- **Input Validation**: Zod schemas in `shared/schema.ts` (insertUserSchema, insertLeadSchema, etc.)

### Component Patterns
- **Sections**: Large page sections in `app/components/sections/` (hero, features, plans, calculator, team, contact)
- **UI**: Atomic shadcn/ui components in `app/components/ui/` following Radix patterns
- **Providers**: `ThemeProvider` and `QueryProvider` wrap the app in `layout.tsx`

### Data Fetching
- **React Query**: Used for client-side data fetching and caching
- **API Routes**: 
  - `GET /api/investment-plans` - Fetch active plans
  - `POST /api/login` - Authenticate user
  - `POST /api/leads` - Submit contact form (with reCAPTCHA)
  - `GET /api/user` - Get authenticated user info
  - `POST /api/register` - Create new user
  - `POST /api/logout` - Clear auth cookie

### Environment Variables
Required in `.env.local`:
- `DATABASE_URL` - Neon Postgres connection string
- `JWT_SECRET` - Strong random secret for JWT signing
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Client-side reCAPTCHA site key
- `RECAPTCHA_SECRET_KEY` - Server-side reCAPTCHA validation key

### Styling System
- **Tailwind**: Utility-first with custom theme tokens
- **CSS Variables**: Defined in `app/globals.css` for consistent theming
- **Dark Theme**: Default theme with high-contrast support
- **Theme Provider**: Custom accessibility theme provider in `app/components/theme-provider.tsx`

### Key Files
- `server/db.ts` - Database client initialization (Neon Pool + Drizzle)
- `shared/schema.ts` - All database tables and Zod validation schemas
- `app/lib/auth.ts` - JWT signing/verification and password hashing
- `next.config.mjs` - CSP headers, server externals, environment mapping
- `drizzle.config.ts` - Drizzle Kit configuration for migrations

### Database Workflow
1. Modify schema in `shared/schema.ts`
2. Run `npm run db:push` to sync changes to Neon database
3. Migrations are stored in `migrations/` folder (generated by Drizzle Kit)

### Testing Notes
- No test framework is currently configured
- Manual testing via local development server
- Type checking with `npm run check`
