# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Alexsander's professional portfolio as a bilingual (PT-BR/EN) single-page landing page using the existing TanStack Start + Tailwind CSS v4 infrastructure.

**Architecture:** Single-page app with smooth scroll navigation. All content hardcoded in i18n JSON files (no CMS/content-collections). Server function for contact form → Google Sheets. SSR for SEO. Sections rendered as React components composed in a single route.

**Tech Stack:** TanStack Start (React 19 SSR), Tailwind CSS v4, Vite 7, Bun, Zod, Lucide React, Google Sheets API

**Spec:** `docs/superpowers/specs/2026-03-24-portfolio-design.md`

---

## File Structure

```
src/
├── i18n/
│   ├── pt.json                    # Portuguese translations
│   ├── en.json                    # English translations
│   ├── context.tsx                # I18nProvider + useI18n hook
│   └── init-script.ts             # Inline script for flash prevention
├── components/
│   ├── Navbar.tsx                 # Fixed nav with smooth scroll + i18n toggle + mobile hamburger
│   ├── Hero.tsx                   # Hero section (label, headline, subtitle, CTAs)
│   ├── MetricsStrip.tsx           # 4-metric strip with context badges
│   ├── About.tsx                  # About section (2-col text + quick facts)
│   ├── Experience.tsx             # Vertical timeline
│   ├── StackCarousel.tsx          # Infinite scroll carousel with tech logos
│   ├── Projects.tsx               # 2x2 project cards grid
│   ├── Contact.tsx                # Contact form + direct channels
│   ├── Footer.tsx                 # Dark footer (replace existing)
│   └── SectionLabel.tsx           # Reusable section label (uppercase accent)
├── lib/
│   ├── utils.ts                   # Keep existing cn() utility
│   └── contact-schema.ts          # Zod schema for contact form validation
├── routes/
│   ├── __root.tsx                 # Modify: new fonts, meta tags, i18n init script, remove old shell
│   ├── index.tsx                  # Rewrite: compose all portfolio sections
│   ├── api.contact.ts             # New: POST handler for contact form → Google Sheets
│   └── blog.tsx                   # Placeholder (commented out) for future blog
├── styles.css                     # Rewrite: new design system tokens + portfolio styles
└── router.tsx                     # Keep as-is

Delete:
├── components/Header.tsx          # Replaced by Navbar.tsx
├── components/Footer.tsx          # Replaced by new Footer.tsx
├── components/ThemeToggle.tsx     # No theme toggle in portfolio
├── components/HeroCarousel.tsx
├── components/RemyAssistant.tsx
├── components/RemyButton.tsx
├── components/SpeakerCard.tsx
├── components/TalkCard.tsx
├── components/ui/card.tsx
├── lib/conference-ai-hook.ts
├── lib/conference-tools.ts
├── routes/about.tsx
├── routes/schedule.index.tsx
├── routes/speakers.$slug.tsx
├── routes/speakers.index.tsx
├── routes/talks.$slug.tsx
├── routes/talks.index.tsx
├── routes/api.remy-chat.ts
content-collections.ts
content/                           # Entire directory
```

---

### Task 1: Clean up old template and dependencies

**Files:**
- Delete: `content-collections.ts`, `content/` directory, all old components and routes listed above
- Modify: `package.json` (remove unused deps)
- Modify: `vite.config.ts` (remove contentCollections plugin)

- [ ] **Step 1: Delete old content and components**

```bash
rm -f content-collections.ts
rm -rf content/
rm -f src/components/HeroCarousel.tsx src/components/RemyAssistant.tsx src/components/RemyButton.tsx src/components/SpeakerCard.tsx src/components/TalkCard.tsx src/components/ThemeToggle.tsx src/components/Header.tsx src/components/Footer.tsx
rm -rf src/components/ui/
rm -f src/lib/conference-ai-hook.ts src/lib/conference-tools.ts
rm -f src/routes/about.tsx src/routes/schedule.index.tsx src/routes/speakers.\$slug.tsx src/routes/speakers.index.tsx src/routes/talks.\$slug.tsx src/routes/talks.index.tsx src/routes/api.remy-chat.ts
```

- [ ] **Step 2: Remove unused dependencies from package.json**

Remove from `dependencies`:
```
@tanstack/ai, @tanstack/ai-anthropic, @tanstack/ai-client, @tanstack/ai-gemini,
@tanstack/ai-ollama, @tanstack/ai-openai, @tanstack/ai-react, @tanstack/react-devtools,
@tanstack/react-router-devtools, @tanstack/react-router-ssr-query, @tanstack/store,
class-variance-authority, marked, streamdown, tailwindcss-animate
```

Remove from `devDependencies`:
```
@content-collections/core, @content-collections/vite, @tailwindcss/typography, @tanstack/devtools-vite
```

Add to `dependencies`:
```
googleapis (for Google Sheets API)
```

Run: `bun install`

- [ ] **Step 3: Remove contentCollections plugin from vite.config.ts**

Remove the `import contentCollections` line and `contentCollections()` from the plugins array. Also remove `devtools()` import and plugin (not needed for portfolio).

Final `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
```

- [ ] **Step 4: Verify clean build**

Run: `bun --bun run build`
Expected: Build succeeds (routes will be empty/broken, that's fine — the infrastructure works)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove old conference template, clean dependencies"
```

---

### Task 2: Design system — styles.css + fonts

**Files:**
- Rewrite: `src/styles.css`

- [ ] **Step 1: Rewrite styles.css with new design system**

Replace entire file with portfolio design tokens. Fonts are loaded via `<link>` tags in `__root.tsx` (Task 4), NOT via CSS `@import` — this avoids render-blocking and allows preloading critical Inter 400/700. Define CSS custom properties matching the spec color tokens. Set up Tailwind v4 theme inline config. Add carousel keyframes and utility classes.

```css
/* Fonts loaded via <link> in __root.tsx — do NOT @import here */
@import 'tailwindcss';

html {
  scroll-behavior: smooth;
  scroll-padding-top: 64px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  @apply m-0 antialiased;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

code {
  font-family: 'JetBrains Mono', monospace;
}

@theme inline {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --color-text-primary: #0F172A;
  --color-text-secondary: #334155;
  --color-text-muted: #64748B;
  --color-accent: #2563EB;
  --color-accent-light: #EFF6FF;
  --color-success: #059669;
  --color-success-light: #ECFDF5;
  --color-bg-primary: #F8FAFC;
  --color-bg-surface: #FFFFFF;
  --color-border: #E2E8F0;
  --color-destructive: #DC2626;

  --color-footer-bg: #0F172A;
  --color-footer-text: #F8FAFC;
  --color-footer-muted: #64748B;
  --color-footer-subtle: #475569;

  --color-project-purple: #7C3AED;
  --color-project-purple-light: #F3F0FF;
  --color-project-green: #059669;
  --color-project-green-light: #ECFDF5;
  --color-project-amber: #D97706;
  --color-project-amber-light: #FFFBEB;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-bg-primary text-text-primary;
  }
}

/* Carousel animations */
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-track { animation: none !important; }
}

/* Carousel fade edges */
.carousel-mask {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}
```

- [ ] **Step 2: Verify styles compile**

Run: `bun --bun run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/styles.css
git commit -m "feat: new design system with Inter font and portfolio color tokens"
```

---

### Task 3: i18n system

**Files:**
- Create: `src/i18n/pt.json`
- Create: `src/i18n/en.json`
- Create: `src/i18n/context.tsx`
- Create: `src/i18n/init-script.ts`

- [ ] **Step 1: Create Portuguese translations**

Create `src/i18n/pt.json` with all text content for every section. Structure:

```json
{
  "nav": {
    "about": "Sobre",
    "experience": "Experiência",
    "stack": "Stack",
    "projects": "Projetos",
    "contact": "Contato"
  },
  "hero": {
    "label": "SOFTWARE ARCHITECT & TECH LEAD",
    "headline": "Arquiteto de software com foco em resultado.",
    "subtitle": "5 anos liderando equipes, arquitetando sistemas distribuídos e entregando plataformas que atendem 10.000+ usuários diários com 99.999% de uptime.",
    "cta_primary": "Fale comigo",
    "cta_secondary": "Ver projetos"
  },
  "metrics": {
    "uptime": { "value": "99.99%", "label": "Uptime em produção", "badge": "Top 0.1% — média SaaS: 99.5%" },
    "cost": { "value": "-60%", "label": "Custo de infraestrutura", "badge": "3x resultado com menos budget" },
    "performance": { "value": "3x", "label": "Performance de APIs", "badges": ["Paralelização e event-driven", "Redução de 70% no tempo de resposta"] },
    "deploys": { "value": "~10/sem", "label": "Deploys em produção", "badge": "CI/CD contínuo mesmo liderando" }
  },
  "about": {
    "label": "SOBRE",
    "headline": "Engenheiro que lidera pela entrega, não pelo cargo.",
    "text_col1": "Engenheiro da Computação com 5 anos de experiência construindo e escalando plataformas SaaS. Atuo como arquiteto de software e tech lead, mas faço questão de ser o desenvolvedor que mais entrega na equipe.\n\nMeu foco é resultado mensurável: sistemas que escalam, custos que diminuem, times que entregam com cadência. Sempre em busca de novos aprendizados e troca de conhecimento.",
    "text_col2": "Responsável pela arquitetura de 60+ microserviços, infraestrutura cloud (GCP/AWS), e todo o ciclo de entrega — do design de sistema ao deploy em produção.\n\nConstruo plataformas que atendem milhares de usuários diários com alta disponibilidade, enquanto reduzo custos e acelero a velocidade do time.",
    "facts": {
      "education": { "label": "Formação", "value": "Eng. da Computação, Univ. Santa Cecília" },
      "location": { "label": "Base", "value": "São Paulo, Brasil" },
      "languages": { "label": "Idiomas", "value": "Português · Inglês" }
    }
  },
  "experience": {
    "label": "EXPERIÊNCIA",
    "headline": "5 anos de impacto consistente.",
    "roles": [
      {
        "period": "2023 — Presente",
        "title": "Software Architect & Tech Lead",
        "context": "Empresa de tecnologia · Gestão de frotas",
        "current": true,
        "badges": ["Arquitetura 60+ microserviços", "Liderança técnica", "Infra GCP/AWS"],
        "highlights": ["-60% custos cloud", "3x performance", "99.99% uptime"]
      },
      {
        "period": "2021 — 2023",
        "title": "Full Stack Developer & DevOps",
        "context": "Mesma empresa · Evolução interna",
        "current": false,
        "badges": ["CI/CD e automação", "Kubernetes e Docker", "Monitoramento e observabilidade"],
        "highlights": []
      },
      {
        "period": "2020 — 2021",
        "title": "Full Stack Developer",
        "context": "Mesma empresa · Início de carreira",
        "current": false,
        "badges": ["React · React Native · Node.js", "APIs REST e microserviços", "Apps mobile multiplataforma"],
        "highlights": []
      },
      {
        "period": "2019 — 2024",
        "title": "Engenharia da Computação",
        "context": "Universidade Santa Cecília · Bacharelado",
        "current": false,
        "badges": [],
        "highlights": []
      }
    ]
  },
  "stack": {
    "label": "STACK",
    "headline": "Ferramentas que uso para entregar."
  },
  "projects": {
    "label": "PROJETOS",
    "headline": "Sistemas que construí e escalo.",
    "items": [
      {
        "category": "Plataforma SaaS",
        "title": "Sistema de gestão de frotas",
        "description": "Plataforma web com 10k+ acessos diários para rastreamento em tempo real, gestão de veículos, motoristas, manutenção e telemetria.",
        "techs": ["React", "Microserviços", "GCP", "Kubernetes"],
        "metrics": ["10k+ usuários/dia", "99.99% uptime"],
        "color": "blue"
      },
      {
        "category": "Mobile",
        "title": "App de operações de campo",
        "description": "App multiplataforma (iOS/Android) para gestores e motoristas de frota com rastreamento em tempo real, controle remoto de veículos e checklists operacionais.",
        "techs": ["React Native", "Expo", "TypeScript"],
        "metrics": ["Multiplataforma", "E2E tested"],
        "color": "purple"
      },
      {
        "category": "Infraestrutura",
        "title": "Arquitetura de microserviços",
        "description": "Ecossistema de 60+ microserviços com event-driven architecture, filas de mensagens, PubSub e auto-scaling. Disaster recovery com múltiplas camadas.",
        "techs": ["Kubernetes", "PubSub", "Docker", "Cloud SQL"],
        "metrics": ["-60% custos", "60+ serviços"],
        "color": "green"
      },
      {
        "category": "Analytics",
        "title": "Dashboard de métricas de engenharia",
        "description": "Painel SSR com métricas de performance de desenvolvedores: velocidade, complexidade, cycle time e scoring — dados integrados via Google Sheets API.",
        "techs": ["Angular", "SSR", "Express"],
        "metrics": ["Real-time metrics", "Team visibility"],
        "color": "amber"
      }
    ]
  },
  "contact": {
    "label": "CONTATO",
    "headline": "Vamos conversar.",
    "subtitle": "Preencha o formulário ou use um dos canais diretos abaixo.",
    "form": {
      "name": "Nome",
      "name_placeholder": "Seu nome",
      "email": "Email",
      "email_placeholder": "seu@email.com",
      "subject": "Assunto",
      "subject_options": ["Proposta", "Consultoria", "Outro"],
      "message": "Mensagem",
      "message_placeholder": "Sua mensagem...",
      "submit": "Enviar mensagem",
      "submitting": "Enviando...",
      "success": "Mensagem enviada com sucesso!",
      "error": "Erro ao enviar. Tente novamente.",
      "rate_limit": "Muitas tentativas. Aguarde alguns minutos.",
      "disclaimer": "Os dados são salvos de forma segura via Google Sheets API."
    },
    "channels_title": "Canais diretos",
    "channels": [
      { "name": "Email", "handle": "PLACEHOLDER@email.com", "href": "mailto:PLACEHOLDER@email.com", "icon": "mail", "color": "blue" },
      { "name": "LinkedIn", "handle": "/in/alexsander-dev", "href": "https://linkedin.com/in/alexsander-dev", "icon": "linkedin", "color": "blue" },
      { "name": "GitHub", "handle": "PLACEHOLDER", "href": "https://github.com/PLACEHOLDER", "icon": "github", "color": "blue" },
      { "name": "WhatsApp", "handle": "Mensagem direta", "href": "https://wa.me/PLACEHOLDER", "icon": "phone", "color": "green" },
      { "name": "Telegram", "handle": "@PLACEHOLDER", "href": "https://t.me/PLACEHOLDER", "icon": "send", "color": "blue" }
    ]
  },
  "footer": {
    "tagline": "Software Architect & Tech Lead",
    "copyright": "© 2026 Alexsander Gusmão. Todos os direitos reservados.",
    "built_with": "Construído com TanStack Start + Tailwind CSS"
  },
  "meta": {
    "title": "Alexsander Gusmão — Software Architect & Tech Lead",
    "description": "Arquiteto de software com 5 anos de experiência liderando equipes e escalando plataformas SaaS com 10k+ usuários diários e 99.99% de uptime."
  }
}
```

- [ ] **Step 2: Create English translations**

Create `src/i18n/en.json` with the same structure, all text translated to English. Key translations:

```json
{
  "hero": {
    "label": "SOFTWARE ARCHITECT & TECH LEAD",
    "headline": "Software architect focused on results.",
    "subtitle": "5 years leading teams, architecting distributed systems, and delivering platforms serving 10,000+ daily users with 99.999% uptime.",
    "cta_primary": "Get in touch",
    "cta_secondary": "View projects"
  },
  "about": {
    "label": "ABOUT",
    "headline": "An engineer who leads by delivery, not by title."
  },
  "experience": {
    "label": "EXPERIENCE",
    "headline": "5 years of consistent impact."
  },
  "stack": {
    "label": "STACK",
    "headline": "Tools I use to deliver."
  },
  "projects": {
    "label": "PROJECTS",
    "headline": "Systems I've built and scaled."
  },
  "contact": {
    "label": "CONTACT",
    "headline": "Let's talk.",
    "subtitle": "Fill in the form or use one of the direct channels below.",
    "form": {
      "name": "Name",
      "email": "Email",
      "subject": "Subject",
      "subject_options": ["Proposal", "Consulting", "Other"],
      "message": "Message",
      "submit": "Send message",
      "submitting": "Sending...",
      "success": "Message sent successfully!",
      "error": "Failed to send. Please try again.",
      "rate_limit": "Too many attempts. Please wait a few minutes."
    }
  },
  "meta": {
    "title": "Alexsander Gusmão — Software Architect & Tech Lead",
    "description": "Software architect with 5 years of experience leading teams and scaling SaaS platforms with 10k+ daily users and 99.99% uptime."
  }
}
```

Translate ALL remaining strings from `pt.json` following this pattern (nav, metrics, about full text, experience roles, projects items, footer, etc.).

- [ ] **Step 3: Create i18n context provider**

Create `src/i18n/context.tsx`:

```tsx
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import pt from './pt.json'
import en from './en.json'

type Locale = 'pt' | 'en'
type Translations = typeof pt

const translations: Record<Locale, Translations> = { pt, en }

interface I18nContextType {
  locale: Locale
  t: Translations
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'pt'
    return (localStorage.getItem('locale') as Locale) || 'pt'
  })

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'pt' ? 'en' : 'pt'
      localStorage.setItem('locale', next)
      document.documentElement.lang = next === 'pt' ? 'pt-BR' : 'en'
      return next
    })
  }, [])

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], toggleLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
```

- [ ] **Step 4: Create i18n init script for flash prevention**

Create `src/i18n/init-script.ts`:

```ts
export const I18N_INIT_SCRIPT = `(function(){try{var l=localStorage.getItem('locale');if(l==='en'){document.documentElement.lang='en'}else{document.documentElement.lang='pt-BR'}}catch(e){document.documentElement.lang='pt-BR'}})();`
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/
git commit -m "feat: add bilingual i18n system with PT-BR/EN translations"
```

---

### Task 4: Root layout + SEO meta tags

**Files:**
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Rewrite __root.tsx**

Replace the entire root route with the new portfolio shell. Remove old Header/Footer imports, remove devtools, add i18n init script, update meta tags for SEO, load fonts via `<link>` tags (not CSS @import), wrap children in I18nProvider. The Navbar and Footer will be added in later tasks (use placeholder comments for now).

**Note on SEO meta tags and i18n:** The `head()` function runs on the server where i18n context is unavailable. Meta tags are hardcoded in PT-BR (default language). This is acceptable because: (1) search engines primarily index the default language, (2) the locale toggle is client-side, (3) social cards shared from the default page will show PT content. A future enhancement could use URL-based locale (`/en`) for proper SSR i18n meta.

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { I18nProvider } from '#/i18n/context'
import { I18N_INIT_SCRIPT } from '#/i18n/init-script'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Alexsander Gusmão — Software Architect & Tech Lead' },
      { name: 'description', content: 'Arquiteto de software com 5 anos de experiência liderando equipes e escalando plataformas SaaS com 10k+ usuários diários e 99.99% de uptime.' },
      { property: 'og:title', content: 'Alexsander Gusmão — Software Architect & Tech Lead' },
      { property: 'og:description', content: 'Arquiteto de software com 5 anos de experiência liderando equipes e escalando plataformas SaaS com 10k+ usuários diários e 99.99% de uptime.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://alexsander.dev' },
      { property: 'og:image', content: '/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: 'https://alexsander.dev' },
      /* Critical fonts: preload Inter 400+700, load full set as stylesheet */
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
      /* Non-critical: JetBrains Mono loaded async via stylesheet (not preloaded) */
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: I18N_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  )
}
```

**og:image:** Create a static social card image (1200x630px) at `public/og-image.png` with the name "Alexsander Gusmão", tagline "Software Architect & Tech Lead", and the portfolio color palette (slate-900 bg, white text, blue accent). This can be created with any design tool or generated as an SVG-to-PNG.

- [ ] **Step 2: Verify build**

Run: `bun --bun run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat: new root layout with i18n, SEO meta tags, Inter font"
```

---

### Task 5: SectionLabel + Navbar components

**Files:**
- Create: `src/components/SectionLabel.tsx`
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create SectionLabel component**

Create `src/components/SectionLabel.tsx` — reusable uppercase accent label used by every section:

```tsx
export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="text-[11px] font-semibold tracking-[2px] uppercase text-accent mb-3">
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Create Navbar component**

Create `src/components/Navbar.tsx` with:
- Fixed position, white bg, border-bottom
- Logo `alexsander.dev` with blue dot
- Desktop: nav links (smooth scroll anchors) + locale toggle chip
- Mobile: hamburger button → slide-in overlay from right (300ms), overlay bg black/50
- Close on: X button, link click, overlay click
- Use `useI18n()` for nav link labels and `toggleLocale()`

Full implementation with all the responsive hamburger logic, `useState` for mobile menu open/close, links as `<a href="#section-id">` with onClick handler that closes menu.

- [ ] **Step 3: Verify dev server renders navbar**

Run: `bun --bun run dev`
Open: `http://localhost:3000`
Expected: Navbar visible at top with logo, links, and locale toggle

- [ ] **Step 4: Commit**

```bash
git add src/components/SectionLabel.tsx src/components/Navbar.tsx
git commit -m "feat: add Navbar with mobile hamburger and i18n toggle"
```

---

### Task 6: Hero + MetricsStrip components

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/MetricsStrip.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.tsx`:
- SectionLabel with role
- Headline h1 (36px, font-bold, slate-900)
- Subtitle paragraph (15px, slate-500, max-w-[560px])
- Two CTA buttons: primary (bg slate-900 text white) scrolls to `#contact`, secondary (border) scrolls to `#projects`
- Padding: pt-20 pb-15 px-10, max-w-[900px] mx-auto
- All text from `useI18n().t.hero`

- [ ] **Step 2: Create MetricsStrip component**

Create `src/components/MetricsStrip.tsx`:
- Flex row with 4 metrics separated by border-right
- Each metric: number (32px bold), label (12px muted), badge pill(s)
- Third metric has 2 badges stacked vertically
- Fourth badge uses blue instead of green
- Responsive: 4-col → 2x2 grid on mobile (< 768px)
- All text from `useI18n().t.metrics`

- [ ] **Step 3: Add to index route**

Update `src/routes/index.tsx` to import and render `<Navbar />`, `<Hero />`, `<MetricsStrip />`:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import Navbar from '#/components/Navbar'
import Hero from '#/components/Hero'
import MetricsStrip from '#/components/MetricsStrip'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MetricsStrip />
      </main>
    </>
  )
}
```

- [ ] **Step 4: Visual check in browser**

Run: `bun --bun run dev`
Expected: Hero section with headline, subtitle, CTAs, and metrics strip below

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/MetricsStrip.tsx src/routes/index.tsx
git commit -m "feat: add Hero and MetricsStrip sections"
```

---

### Task 7: About + Experience sections

**Files:**
- Create: `src/components/About.tsx`
- Create: `src/components/Experience.tsx`

- [ ] **Step 1: Create About component**

Create `src/components/About.tsx`:
- Section `id="about"`, bg slate-50
- SectionLabel "SOBRE"
- Headline h2 (28px)
- 2-column grid (gap-10) collapsing to 1-col at < 768px
- Each column: paragraphs (14px, slate-700, line-height 1.8), split by `\n\n`
- Quick facts: flex row of chips (padding, border, rounded-lg, 12px text)
- All text from `useI18n().t.about`

- [ ] **Step 2: Create Experience component**

Create `src/components/Experience.tsx`:
- Section `id="experience"`, bg white
- SectionLabel + headline
- Timeline: `pl-8` relative container with vertical line (absolute left-[7px], 2px wide, slate-200)
- Each role: relative div with circle indicator (absolute left-[-32px])
  - Current role: blue accent circle with DBEAFE border
  - Past roles: slate-400 circle with F1F5F9 border
- Role content: title (16px semi-bold), context (13px muted), period (12px, right-aligned)
- Badges: flex-wrap pills — regular in slate-100, highlights in emerald-50 with emerald-600 text
- Data from `useI18n().t.experience.roles` array

- [ ] **Step 3: Add to index route**

Import and render `<About />` and `<Experience />` after MetricsStrip in `index.tsx`.

- [ ] **Step 4: Visual check**

Expected: About with 2-column text + chips, Experience with 4-item vertical timeline

- [ ] **Step 5: Commit**

```bash
git add src/components/About.tsx src/components/Experience.tsx src/routes/index.tsx
git commit -m "feat: add About and Experience sections with timeline"
```

---

### Task 8: StackCarousel component

**Files:**
- Create: `src/components/StackCarousel.tsx`

- [ ] **Step 1: Create StackCarousel component**

Create `src/components/StackCarousel.tsx`:
- Section `id="stack"`, bg slate-50
- SectionLabel + headline from i18n
- Two carousel rows, each wrapped in `carousel-mask` class div (overflow hidden)
- Row 1 scrolls left (animation: `scroll-left 35s linear infinite`)
- Row 2 scrolls right (animation: `scroll-right 30s linear infinite`)
- Each tech item: flex row with `<img>` (32x32, devicons CDN SVG URL) + `<span>` label
- Default state: `grayscale opacity-50`, text `text-slate-400`
- Hover on item: `grayscale-0 opacity-100 scale-[1.08]`, text `text-text-primary`
- Hover on carousel wrapper: `animation-play-state: paused` (via group hover)
- Items duplicated in markup for seamless loop — duplicates get `aria-hidden="true"`
- `prefers-reduced-motion`: static grid (use CSS media query to set `animation: none`, show items at full color)

Tech items Row 1: React, TypeScript, Angular, Tailwind CSS, Node.js, Express, Redux, Vite, React Native, Expo
Tech items Row 2: Google Cloud, AWS, Kubernetes, Docker, MySQL, PostgreSQL, Redis, BigQuery, PubSub, GitHub

Each item needs the correct devicons CDN URL: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{name}/{name}-original.svg`

- [ ] **Step 2: Add to index route**

Import and render `<StackCarousel />` after Experience.

- [ ] **Step 3: Visual check**

Expected: Two rows of logos scrolling in opposite directions, grayscale by default, hover reveals color and pauses scroll

- [ ] **Step 4: Commit**

```bash
git add src/components/StackCarousel.tsx src/routes/index.tsx
git commit -m "feat: add infinite scroll StackCarousel with grayscale hover effect"
```

---

### Task 9: Projects component

**Files:**
- Create: `src/components/Projects.tsx`

- [ ] **Step 1: Create Projects component**

Create `src/components/Projects.tsx`:
- Section `id="projects"`, bg white
- SectionLabel + headline from i18n
- 2x2 grid (gap-5), collapsing to 1-col on mobile
- Each card from `useI18n().t.projects.items`:
  - Container: bg slate-50, border slate-200, rounded-[10px], p-7, relative overflow-hidden
  - Top bar: absolute 3px gradient (color varies by `item.color`: blue/purple/green/amber)
  - Category label: uppercase 11px, category color
  - Title: 18px semi-bold
  - Description: 13px, slate-500, line-height 1.7
  - Tech tags: pills with light background of category color
  - Metrics: 11px, emerald-600, font-semibold
- Map `color` string to actual color values using a lookup object

- [ ] **Step 2: Add to index route**

Import and render `<Projects />` after StackCarousel.

- [ ] **Step 3: Visual check**

Expected: 2x2 grid of project cards with colored top bars and tech pills

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.tsx src/routes/index.tsx
git commit -m "feat: add Projects section with categorized cards"
```

---

### Task 10: Contact form schema + API route

**Files:**
- Create: `src/lib/contact-schema.ts`
- Create: `src/routes/api.contact.ts`

- [ ] **Step 1: Create Zod validation schema**

Create `src/lib/contact-schema.ts`:

```ts
import { z } from 'zod'

// Accept both PT and EN subject values — normalized to PT on server for spreadsheet consistency
export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.enum(['Proposta', 'Consultoria', 'Outro', 'Proposal', 'Consulting', 'Other']),
  message: z.string().min(10),
  locale: z.enum(['pt', 'en']).optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

// Localized error messages — used by the Contact component, not the schema itself
export const contactErrors = {
  pt: { name: 'Nome é obrigatório', email: 'Email inválido', message: 'Mensagem muito curta' },
  en: { name: 'Name is required', email: 'Invalid email', message: 'Message too short' },
} as const
```

- [ ] **Step 2: Create API route for contact form**

Create `src/routes/api.contact.ts`:
- POST handler via TanStack Start file route
- Parse and validate body with `contactSchema`
- Simple in-memory rate limiting (Map of IP → timestamps, max 3 per 5 min)
- Authenticate with Google Sheets API using service account env vars
- Append row to spreadsheet: [timestamp, name, email, subject, message, locale]
- Return JSON response with success/error status
- Graceful fallback if Google env vars are not set (log to console, still return 200)

- [ ] **Step 3: Verify route exists**

Run: `bun --bun run build`
Expected: Build succeeds with new API route

- [ ] **Step 4: Commit**

```bash
git add src/lib/contact-schema.ts src/routes/api.contact.ts
git commit -m "feat: add contact form API route with Zod validation and Google Sheets integration"
```

---

### Task 11: Contact + Footer components

**Files:**
- Create: `src/components/Contact.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Contact component**

Create `src/components/Contact.tsx`:
- Section `id="contact"`, bg white
- SectionLabel + headline + subtitle from i18n
- 2-column grid (gap-12), collapsing to 1-col at < 768px

Left column — form:
- Controlled form with useState for each field + status (idle/submitting/success/error)
- Labels visible above each input (12px, font-semibold)
- Inputs: bg slate-50, border slate-200, rounded-md, min-h-[44px]
- Assunto as `<select>` with options from i18n
- Textarea min-h-[100px]
- Client-side validation with Zod on blur — show error below field in red
- Submit button with 4 states (default/loading/success/error) as specified in spec
- POST to `/api/contact` with fetch
- On success: reset form, show green message for 5s
- On error: show red message, keep form filled

Right column — direct channels:
- Cards with icon (40x40 rounded bg + SVG icon) + name + handle
- Email, LinkedIn, GitHub, WhatsApp (emerald bg), Telegram
- Each wraps in `<a>` with correct href (mailto:, https://linkedin.com/..., etc.)
- Use Lucide icons: Mail, Linkedin (from lucide-react doesn't have LinkedIn — use inline SVG), Github, Phone, Send

- [ ] **Step 2: Create Footer component**

Create `src/components/Footer.tsx`:
- `<footer>` bg slate-900, text footer-text
- Max-w-[900px] centered
- Top row: logo `alexsander.dev` + tagline, social icon pills (LinkedIn, GitHub, Mail) in bg white/8%
- Divider: 1px solid white/8%
- Bottom row: copyright (left), built-with (right)
- All text from `useI18n().t.footer`

- [ ] **Step 3: Add to index route and remove from __root.tsx**

Complete the `index.tsx` with all sections and Footer. Make sure Navbar is also here (not in root — root just has I18nProvider shell).

Final `index.tsx` composition:
```tsx
<Navbar />
<main>
  <Hero />
  <MetricsStrip />
  <About />
  <Experience />
  <StackCarousel />
  <Projects />
  <Contact />
</main>
<Footer />
```

- [ ] **Step 4: Visual check — full page**

Run: `bun --bun run dev`
Expected: Complete landing page with all sections, scrollable, responsive

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.tsx src/routes/index.tsx
git commit -m "feat: add Contact form with validation and Footer, complete all sections"
```

---

### Task 12: Responsive polish + accessibility pass

**Files:**
- Modify: Multiple component files for responsive fixes

- [ ] **Step 1: Test all breakpoints**

Open dev server and test at: 375px, 768px, 1024px, 1440px
Check each section collapses correctly:
- Navbar → hamburger on mobile
- Hero → padding adjusts
- Metrics → 2x2 on mobile
- About → 1-col on mobile, quick facts wrap
- Experience → timeline stays single column (just tighter)
- Carousel → full width, still works
- Projects → 1-col on mobile
- Contact → 1-col on mobile (form first)
- Footer → stacks on mobile

Fix any issues found.

- [ ] **Step 2: Accessibility pass**

Check:
- Heading hierarchy: single h1 (hero), h2s for each section
- All interactive elements have focus-visible styles
- Form inputs have associated labels
- Alt text on tech logos
- `aria-hidden` on carousel duplicates
- Touch targets ≥ 44px on all interactive elements
- `prefers-reduced-motion` disables carousel animation

- [ ] **Step 3: Test smooth scroll with navbar offset**

Click each nav link — section should appear below the fixed navbar (64px offset via `scroll-padding-top`).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix: responsive polish and accessibility improvements"
```

---

### Task 13: Blog route placeholder + og:image

**Files:**
- Create: `src/routes/blog.tsx` (commented out)
- Create: `public/og-image.png`

- [ ] **Step 1: Create commented-out blog route**

Create `src/routes/blog.tsx`:

```tsx
// Blog route — placeholder for future implementation
// Will use content-collections in a separate project/route
//
// import { createFileRoute } from '@tanstack/react-router'
//
// export const Route = createFileRoute('/blog')({
//   component: BlogPage,
// })
//
// function BlogPage() {
//   return <div>Blog — Coming soon</div>
// }

export {}
```

- [ ] **Step 2: Create og:image social card**

Create a simple social card at `public/og-image.png` (1200x630px). This can be a solid slate-900 background with "Alexsander Gusmão" in white and "Software Architect & Tech Lead" in slate-400, with a blue accent line. Use any available tool or generate via canvas/SVG conversion.

- [ ] **Step 3: Commit**

```bash
git add src/routes/blog.tsx public/og-image.png
git commit -m "feat: add blog route placeholder and og:image social card"
```

---

### Task 14: Final build verification

**Files:** None (verification only)

- [ ] **Step 1: Production build**

Run: `bun --bun run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Preview production build**

Run: `bun --bun run preview`
Check: All sections render, smooth scroll works, form submits (or gracefully handles missing Google creds), locale toggle switches all text, SSR renders correctly.

- [ ] **Step 3: Run tests if any exist**

Run: `bun --bun run test`
Expected: No test failures (existing tests should still pass or have been removed with old code)

- [ ] **Step 4: Final commit if any remaining changes**

```bash
git add -A
git commit -m "chore: final build verification"
```
