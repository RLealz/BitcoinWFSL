# Bitcoin WFSL Investment Platform

## Overview

Bitcoin WFSL is a cryptocurrency investment platform designed with a strong focus on accessibility and inclusivity for the deaf community. The platform offers Bitcoin investment services with tiered plans, multi-language support including Portuguese Sign Language, and comprehensive accessibility features. Built as a modern full-stack web application, it combines secure backend services with an intuitive React frontend that prioritizes user experience and financial transparency.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development
- **Build System**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with Shadcn/ui components for consistent design
- **State Management**: React Query for server state and React Context for client state
- **Form Handling**: React Hook Form with Zod validation for robust form processing
- **Accessibility**: Custom accessibility controls with high contrast mode, font size adjustment, and theme switching
- **Animation**: Framer Motion for smooth user interactions
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Passport.js with local strategy and express-session
- **Security**: Comprehensive security stack including Helmet.js, CSRF protection, rate limiting, and reCAPTCHA integration
- **API Design**: RESTful endpoints with structured error handling and TypeScript validation

### Database Design
- **Users Table**: Core authentication with profile completion tracking
- **User Profiles**: Extended user information including accessibility preferences, investment goals, and language preferences
- **Investment Plans**: Tiered investment products with configurable parameters
- **Leads**: Contact form submissions and lead management system
- **Session Storage**: PostgreSQL-backed session management for security

### Security Architecture
- **Content Security Policy**: Configured for reCAPTCHA and external service integration
- **CSRF Protection**: Double-submit cookie pattern with token validation
- **Rate Limiting**: API endpoint protection against abuse
- **Session Management**: Secure HTTP-only cookies with appropriate security flags
- **Password Security**: Scrypt-based password hashing with salt

### Accessibility Features
- **Sign Language Support**: Portuguese Sign Language and International Sign support
- **Visual Accessibility**: High contrast mode, adjustable font sizes, and dark/light theme switching
- **Form Accessibility**: Comprehensive form validation with clear error messaging
- **Responsive Design**: Mobile-first approach ensuring usability across devices

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL hosting with serverless capabilities
- **Connection Pooling**: @neondatabase/serverless for efficient database connections

### Security Services
- **Google reCAPTCHA**: Bot protection for forms and sensitive operations
- **Content Security Policy**: Configured for secure external script loading

### Email and Communication
- **Contact Forms**: Lead capture system with email validation
- **WhatsApp Integration**: Direct communication channel for customer support
- **Telegram Integration**: Alternative communication platform

### Development and Deployment
- **Replit**: Primary development and hosting environment
- **TypeScript**: Full-stack type safety
- **ESLint and Prettier**: Code quality and formatting
- **Git**: Version control and collaboration

### Third-Party Libraries
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Consistent iconography
- **React Hook Form**: Form state management
- **Zod**: Runtime type validation
- **Framer Motion**: Animation library
- **React Query**: Server state management

### Payment Integration (Planned)
- **Stripe**: Payment processing for investment transactions
- **@stripe/stripe-js**: Frontend payment handling
- **@stripe/react-stripe-js**: React components for payment forms