Bitcoin WFSL – Next.js Investment Platform

    
A modern, accessible investment website built with Next.js App Router, Tailwind CSS, shadcn/ui, and Drizzle ORM (Neon Postgres). It delivers a sleek, terminal-inspired aesthetic with strong security practices and a clean UX.

🚀 Overview
This application provides a complete landing experience with hero, services, plans, calculator, team, contact, and admin/auth flows. It uses Next.js API routes for authentication, lead capture, and investment plans, with reCAPTCHA validation and conservative rate limiting. Styling is utility-first via Tailwind with shared theme tokens across components.

Key Features
🧠 User Experience & Accessibility
- Dark theme with high-contrast and font-size controls
- Responsive layout with polished gradient visuals and motion
- Consistent component library via shadcn/ui and Radix primitives

🔗 Backend Integration
- Next.js API routes: authentication, leads, investment plans
- Drizzle ORM + Neon serverless Postgres
- Secure JWT cookie-based auth
- Google reCAPTCHA validation

📊 Modern UI Sections
- Hero with branded CTA and iconography
- Features grid with cards
- Investment Plans with tabs and risk badges
- Interactive Calculator for ROI projections
- Team section with dialogs and rich profiles
- Contact section with accessibility cues

⚡ Tech Stack
- Next.js 15 (App Router) with TypeScript
- Tailwind CSS + theme tokens
- shadcn/ui + Radix UI + Lucide icons
- React Query for data fetching
- Framer Motion for animations
- Drizzle ORM + Neon Postgres

🏗️ Architecture
Frontend Stack
- Next.js 15.5.x: App Router, server actions, API routes
- TypeScript: strict typing and DX
- Tailwind CSS: utility-first styling with theme variables
- shadcn/ui: accessible, consistent components
- Framer Motion: subtle motion effects
- Lucide React: icon set

Data & API Layer
- Drizzle ORM (Neon Serverless) for typed SQL
- Next.js API endpoints:
  - `app/api/login/route.ts`: user login, JWT cookie issuance
  - `app/api/investment-plans/route.ts`: fetch active plans
  - `app/api/leads/route.ts`: create leads with reCAPTCHA
  - `app/api/user/route.ts`: user info via cookie auth
- Security: CSP headers in `next.config.mjs`, rate limiting, CSRF handling via cookie strategy where applicable

State Management
- React Hooks for UI state
- React Query for requests and caching
- Context-based theme provider for accessibility

🛠️ Installation & Setup
Prerequisites
- Node.js: 18+ recommended
- npm: 8+ (or pnpm/yarn)
- A Neon Postgres database URL

Local Development Setup
1) Clone the Repository
```
git clone <repository-url>
cd BitcoinWFSL
```
2) Install Dependencies
```
npm install
```
3) Environment Variables
Create `.env.local` at the project root and set:
```
DATABASE_URL=<your-neon-postgres-connection-string>
JWT_SECRET=<a-strong-secret>
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your-site-key>
RECAPTCHA_SECRET_KEY=<your-secret-key>
```
4) Database Setup (Drizzle)
```
npm run db:push
```
Optional: run seed scripts if provided.

5) Start Development Server
```
npm run dev
```
Access the Application at `http://localhost:3000`.

🔧 Configuration
Theme & Styling
- Tailwind scans `./app/**/*` and uses CSS variables for tokens in `app/globals.css`.

Environment Variables
- `DATABASE_URL`: Neon Postgres connection string
- `JWT_SECRET`: JWT signing secret for auth cookie
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Client-side reCAPTCHA site key
- `RECAPTCHA_SECRET_KEY`: Server-side reCAPTCHA validation key

🎯 Usage Guide
Navigation & Sections
- Home page provides Hero → Features → Plans → Calculator → Team → CTA → Contact.

Authentication
- Visit `/auth` to log in; successful login sets a secure, httpOnly cookie.
- Admin pages under `/admin` when authorized.

API Endpoints
- `POST /api/login`: body `{ username, password }`
- `GET /api/investment-plans`: returns active plans
- `POST /api/leads`: body `{ name, email, message, captchaToken }`
- `GET /api/user`: returns authenticated user

🏃‍♂️ Development
Project Structure
```
app/
  components/
    sections/        # Hero, Features, Plans, Calculator, Team, etc.
    ui/              # shadcn/ui components (button, card, tabs, dialog...)
    query-provider.tsx
    theme-provider.tsx
  api/               # Next API routes (login, investment-plans, leads, user)
  lib/               # auth, constants, rate-limit, recaptcha, utils
  data/              # sample data
  globals.css
  layout.tsx
  page.tsx
server/
  db.ts              # Drizzle + Neon client
shared/
  schema.ts          # Drizzle schema
```

Key Components
Investment Plans
- Tabs for fund types, cards with risk labels, and CTA.

Calculator
- ROI projection by tier and duration with accessible inputs.

Team
- Dialog-rich profiles, expertise chips, and social links.

Build & Deployment
Development Build
```
npm run build
```
Production Start
```
npm run start
```
Deployment
- Vercel-ready (Next.js). Ensure environment variables are configured on the platform.

🔒 Security Considerations
Cookies & Auth
- JWT cookies are httpOnly, sameSite=lax, secure in production.

CSP & reCAPTCHA
- CSP headers defined in `next.config.mjs` for Google endpoints.
- Server-side reCAPTCHA verification on lead submission.

Rate Limiting & Input Validation
- Conservative API rate limiting.
- Zod-based validation on critical endpoints.

🧪 Testing & Checks
- Type Checking: `npm run check`
- Manual: verify API endpoints and UI flows locally.

📈 Performance Notes
- Lean, component-driven UI with Tailwind.
- React Query caches requests; reduce network chatter.
- Motion kept subtle; avoid heavy animations.

🤝 Contributing
Workflow
- Fork, create a feature branch, implement changes with strict types.
- Validate locally, submit PR with clear description.

Code Standards
- TypeScript strict mode, ESLint/Prettier conventions.
- Follow component patterns used in `app/components/ui`.

📋 System Requirements
Minimum
- Browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Node.js: 18+
- RAM: 512MB

Recommended
- Latest modern browser
- Node.js: 20+
- RAM: 1GB+

🐛 Troubleshooting
Port In Use
- Change dev port: `next dev -p 3001` if `3000` is busy.

Missing Env Vars
- Ensure `.env.local` contains `DATABASE_URL`, `JWT_SECRET`, and reCAPTCHA keys.

Database Connectivity
- Verify Neon database availability and connection string.

reCAPTCHA Issues
- Confirm both site and secret keys are valid and CSP allows Google endpoints.

📄 License
MIT License.

🙏 Acknowledgments
- Next.js Team, Vercel
- Tailwind Labs
- shadcn and Radix UI
- Lucide Icons
- Drizzle ORM and Neon

📞 Support
- Open issues on GitHub for bugs and feature requests.