<div align="center">

# alexsander.dev

**Professional portfolio — Software Architect & Tech Lead**

Built with React 19, TanStack Start, Tailwind CSS v4, and server-side rendering.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-SSR-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Bun](https://img.shields.io/badge/Bun-runtime-f9f1e1?logo=bun&logoColor=14151a)](https://bun.sh)

</div>

---

## Overview

Single-page bilingual portfolio (PT-BR / EN) showcasing 5 years of experience building and scaling SaaS platforms. Features smooth scroll navigation, scroll-triggered animations, and a working contact form backed by Google Sheets.

### Sections

| Section | Description |
|---------|-------------|
| **Hero** | Headline with interactive macOS terminal animation (`kubectl get pods`) |
| **Metrics Strip** | Key numbers — 99.99% uptime, -60% infra cost, 3x API performance |
| **About** | Bio, education, awards (CREA-SP 2024), and certifications |
| **Experience** | Interactive timeline — from Full Stack Developer to Software Architect |
| **Stack** | Infinite-scroll carousel of technologies |
| **Projects** | Categorized cards — SaaS, Mobile, Infrastructure, Analytics, Data Pipeline, Big Data |
| **Contact** | Form with Zod validation + direct channel links |

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | React 19, TanStack Start (SSR), TanStack Router (file-based) |
| **Styling** | Tailwind CSS v4 with custom design tokens |
| **Language** | TypeScript 5.7 |
| **Validation** | Zod |
| **Icons** | Lucide React, React Icons |
| **Build** | Vite 7, Bun |
| **Testing** | Vitest, Testing Library |
| **Backend** | Google Sheets API (contact form) |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.0
- Node.js >= 18 (fallback)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/Wylp/portfolio.git
cd portfolio

# Install dependencies
bun install

# Start dev server (port 3000)
bun --bun run dev
```

### Build for Production

```bash
bun --bun run build
```

### Run Tests

```bash
bun --bun run test
```

---

## Project Structure

```
src/
├── components/          # UI components
│   ├── Navbar.tsx       # Navigation with i18n toggle
│   ├── Hero.tsx         # Hero section + terminal animation
│   ├── MetricsStrip.tsx # Key metrics banner
│   ├── About.tsx        # Bio, education, awards
│   ├── Experience.tsx   # Career timeline
│   ├── StackCarousel.tsx# Infinite-scroll tech stack
│   ├── Projects.tsx     # Project cards grid
│   ├── Contact.tsx      # Contact form + channels
│   ├── Footer.tsx       # Footer
│   └── SectionLabel.tsx # Reusable section header
├── i18n/
│   ├── context.tsx      # I18n React Context + useI18n hook
│   ├── pt.json          # Portuguese translations
│   └── en.json          # English translations
├── lib/
│   ├── useFadeIn.ts     # Scroll-triggered fade-in hook
│   └── contact-server.ts# Server-side contact handler
├── routes/
│   ├── __root.tsx       # Root layout (SEO, fonts, i18n)
│   └── index.tsx        # Landing page (all sections)
└── styles.css           # Tailwind config + design tokens
```

---

## Internationalization

Bilingual support with zero-flash language switching:

- **Default:** PT-BR
- **Toggle:** Flag button in the navbar
- **Persistence:** `localStorage` with inline `<head>` script to prevent FOUC
- **Hook:** `useI18n()` returns `{ locale, t, toggleLocale }`

---

## Contact Form

The contact form uses client-side Zod validation with localized error messages and submits to a server-side API route.

**Features:**
- Rate limiting (3 requests / 5 min per IP)
- Google Sheets integration via service account
- Graceful fallback to `console.log` when env vars are not set

**Environment variables** (optional — form works without them):

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
```

---

## Design Tokens

Custom Tailwind v4 theme defined in `src/styles.css` using `@theme inline`:

| Token | Usage |
|-------|-------|
| `text-primary` | Main text color |
| `text-secondary` | Secondary text |
| `text-muted` | Subtle / disabled text |
| `accent` / `accent-light` | Primary accent color |
| `success` / `success-light` | Success states |
| `bg-primary` / `bg-surface` | Background layers |

**Fonts:** Inter (body/headings) · JetBrains Mono (code/terminal)

---

## License

This project is personal and not open for redistribution. Feel free to use it as reference or inspiration.

---

<div align="center">

**[alexsandeveloper@gmail.com](mailto:alexsandeveloper@gmail.com)** · **[LinkedIn](https://linkedin.com/in/alexsander-dev)** · **[GitHub](https://github.com/Wylp)**

</div>
