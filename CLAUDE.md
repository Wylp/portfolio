# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install              # Install dependencies
bun --bun run dev        # Dev server on port 3000
bun --bun run build      # Production build
bun --bun run test       # Run all tests (vitest)
bunx vitest run src/path/to/test.test.ts  # Run a single test
```

## Architecture

Professional portfolio landing page for Alexsander de Oliveira Gusmão — Software Architect & Tech Lead. Single-page bilingual (PT-BR/EN) with smooth scroll.

**Stack:** React 19, TanStack Start (SSR), TanStack Router (file-based), Tailwind CSS v4, Vite 7, Zod, Lucide React, Google Sheets API (googleapis).

### Routing

File-based routing in `src/routes/`. Route tree auto-generated in `src/routeTree.gen.ts` — don't edit manually.
- `/` — Portfolio landing page (all sections)
- `/api/contact` — POST handler for contact form → Google Sheets

Root layout in `src/routes/__root.tsx` (I18nProvider, SEO meta, font loading, i18n flash-prevention script).

### i18n

Bilingual PT-BR (default) / EN with toggle. JSON translations in `src/i18n/pt.json` and `src/i18n/en.json`. React Context provider in `src/i18n/context.tsx` with `useI18n()` hook returning `{ locale, t, toggleLocale }`. Flash prevention via inline script in `<head>` that sets `lang` attribute before paint.

### Design System

Tailwind CSS v4 with `@theme inline` tokens in `src/styles.css`. Key tokens: `text-primary`, `text-secondary`, `text-muted`, `accent`, `accent-light`, `success`, `success-light`, `bg-primary`, `bg-surface`, `border`, `footer-*`, `project-purple/green/amber`. Fonts: Inter (body/headings via Google Fonts `<link>`), JetBrains Mono (code).

### Sections & Components

All in `src/components/`: Navbar, Hero (with macOS terminal), MetricsStrip, About, Experience (timeline), StackCarousel (infinite scroll), Projects (2x2 cards), Contact (form + channels), Footer. Reusable: SectionLabel.

### Section Animations

Every section uses a **fade-in on scroll** animation via `useFadeIn()` hook (`src/lib/useFadeIn.ts`) + `fade-in-section` CSS class. New sections MUST include this pattern:
1. Import `useFadeIn` from `#/lib/useFadeIn`
2. Call `const ref = useFadeIn<HTMLElement>()` in the component
3. Add `ref={ref}` and `className="fade-in-section ..."` to the section element

Respects `prefers-reduced-motion` (shows content immediately without animation).

### Path Aliases

`#/*` maps to `./src/*` (configured in tsconfig.json and package.json imports). The codebase uses `#/` for imports.

### Contact Form

Client-side Zod validation with localized error messages. POST to `/api/contact` server route. Rate limited (3 req/5min per IP). Google Sheets integration via service account env vars (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SPREADSHEET_ID`). Graceful fallback to console.log when env vars are not set.
