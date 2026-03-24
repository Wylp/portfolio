# Portfolio Profissional — Design Spec

## Visão Geral

Portfolio profissional de Alexsander de Oliveira Gusmão — Software Architect & Tech Lead. Landing page single-page com scroll suave, estilo Clean Minimal / Corporate, bilíngue (PT-BR / EN) com toggle de idioma.

**Objetivo:** Posicionamento profissional flexível — atrair propostas, mostrar autoridade técnica e funcionar como cartão de visita digital.

**Tom:** Técnico e assertivo. Foco em resultados mensuráveis, sem adjetivos vazios. Números falam por si.

---

## Stack Técnica do Projeto

- **Framework:** TanStack Start (React 19 SSR)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Build:** Vite 7
- **Runtime:** Bun
- **Tipografia:** Inter (body/headings) + JetBrains Mono (code)
- **Ícones:** Lucide React (SVG)
- **Logos de tech:** devicons CDN (SVG públicos)
- **Formulário:** Server function do TanStack Start → Google Sheets API
- **i18n:** JSON de traduções com React Context + toggle PT/EN

### O que remover do projeto atual

O projeto atual é um template de conferência de pâtisserie. Remover:
- `content-collections.ts` e dependências `@content-collections/*`
- Diretório `content/` (speakers, talks)
- Todos os componentes da conferência (RemyAssistant, RemyButton, SpeakerCard, TalkCard, HeroCarousel)
- Dependências de AI (`@tanstack/ai-*`)
- Rotas existentes (schedule, speakers, talks, api.remy-chat)
- Manter: infraestrutura base (TanStack Start, Tailwind, Vite, router, `__root.tsx` shell)

---

## Design System

### Paleta de Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--text-primary` | `#0F172A` (slate-900) | Headings, texto principal, botão primário |
| `--text-secondary` | `#334155` (slate-700) | Body text |
| `--text-muted` | `#64748B` (slate-500) | Subtextos, labels |
| `--accent` | `#2563EB` (blue-600) | Links, labels de seção, destaques |
| `--accent-light` | `#EFF6FF` (blue-50) | Background de tags de tech |
| `--success` | `#059669` (emerald-600) | Badges de resultado/impacto |
| `--success-light` | `#ECFDF5` (emerald-50) | Background de badges de resultado |
| `--bg-primary` | `#F8FAFC` (slate-50) | Background principal |
| `--bg-surface` | `#FFFFFF` | Cards, formulários |
| `--border` | `#E2E8F0` (slate-200) | Bordas, divisores |
| `--footer-bg` | `#0F172A` (slate-900) | Footer |
| `--footer-text` | `#F8FAFC` (slate-50) | Texto principal no footer |
| `--footer-muted` | `#64748B` (slate-500) | Texto secundário no footer |
| `--footer-subtle` | `#475569` (slate-600) | Copyright, links menores no footer |

Cores adicionais para categorias de projeto:
- Roxo: `#7C3AED` / `#F3F0FF` (mobile)
- Verde: `#059669` / `#ECFDF5` (infraestrutura)
- Amber: `#D97706` / `#FFFBEB` (analytics)

### Tipografia

- **Headings:** Inter, weight 700, letter-spacing -0.5px
- **Body:** Inter, weight 400/500, line-height 1.7-1.8
- **Labels de seção:** Inter, weight 600, 11px, letter-spacing 2px, uppercase, cor accent
- **Mono (code):** JetBrains Mono
- **Scale:** 11 · 12 · 13 · 14 · 15 · 16 · 18 · 28 · 32 · 36

### Estilo

- **Swiss Modernism 2.0 + Minimal & Direct**
- Grid rigoroso, sem decoração
- Muito whitespace
- Sem emojis como ícones — usar Lucide SVGs
- Hover transitions: 150-300ms ease
- Bordas: 1px solid slate-200
- Border-radius: 6-10px (cards/botões)
- Sem sombras pesadas

### Responsividade

- Mobile-first: 375px → 768px → 1024px → 1440px
- Max-width de conteúdo: 900px (centrado)
- Nav colapsa em hamburger no mobile
- Grid de projetos: 2 colunas → 1 coluna no mobile
- Metrics strip: 4 colunas → 2x2 no mobile
- Carousel de stack: mantém em todas as resoluções (CSS mask + overflow hidden)

---

## Seções

### 1. Navbar (fixa)

- Logo: `alexsander.dev` (texto, weight 700, ponto em azul accent)
- Links: Sobre · Experiência · Stack · Projetos · Contato
- Toggle de idioma: `PT | EN` em chip com borda
- Smooth scroll para as seções via anchor links
- Background branco com border-bottom slate-200
- Mobile: hamburger menu (slide-in overlay from right, 300ms ease-out)
  - Inclui todos os links de seção + toggle de idioma
  - Fecha ao: clicar no X, clicar em um link (scroll + fecha), clicar no overlay escuro
  - Overlay: bg black/50% opacity
  - Altura da navbar: 64px (usar como `scroll-padding-top` no `<html>` para offset de smooth scroll)

### 2. Hero

- **Label:** "SOFTWARE ARCHITECT & TECH LEAD" (uppercase, accent, 11px, letter-spacing 2px)
- **Headline:** "Arquiteto de software com foco em resultado." (36px, weight 700, slate-900)
- **Subtítulo:** "5 anos liderando equipes, arquitetando sistemas distribuídos e entregando plataformas que atendem 10.000+ usuários diários com 99.999% de uptime." (15px, slate-500, max-width 560px)
- **CTAs:**
  - Primário: "Fale comigo" (bg slate-900, text white, border-radius 6px) → scroll para Contato
  - Secundário: "Ver projetos" (border slate-200, text slate-900) → scroll para Projetos
- **Sem foto** — foco total no texto e métricas
- Padding: 80px top, 60px bottom, alinhado à esquerda

### 3. Metrics Strip (abaixo do hero)

Faixa com 4 métricas separadas por bordas verticais. Cada métrica tem:
- Número grande (32px, weight 700)
- Label descritivo (12px, muted)
- Badge de contexto (pill com background verde/azul, texto 10px)

| Métrica | Badge |
|---------|-------|
| **99.99%** — Uptime em produção | ↑ Top 0.1% — média SaaS: 99.5% (verde) |
| **-60%** — Custo de infraestrutura | ↑ 3x resultado com menos budget (verde) |
| **3x** — Performance de APIs | ↑ Paralelização e event-driven (verde) + ↑ Redução de 70% no tempo de resposta (verde) |
| **~10/sem** — Deploys em produção | → CI/CD contínuo mesmo liderando (azul) |

A terceira métrica tem 2 linhas de badge (empilhadas verticalmente).

### 4. Sobre

- **Background:** slate-50
- **Label:** "SOBRE" (accent, uppercase)
- **Headline:** "Engenheiro que lidera pela entrega, não pelo cargo." (28px)
- **Texto em 2 colunas** (colapsa para 1 coluna em < 768px):
  - Coluna 1: Background profissional, foco em resultado, menção a busca constante por aprendizado e troca de conhecimento
  - Coluna 2: Escopo de atuação (60+ microserviços, infra cloud, ciclo completo de entrega)
- **Quick facts** (chips com borda):
  - Formação — Eng. da Computação, Univ. Santa Cecília
  - Base — São Paulo, Brasil
  - Idiomas — Português · Inglês

### 5. Experiência (timeline vertical)

- **Background:** white
- **Label:** "EXPERIÊNCIA" (accent, uppercase)
- **Headline:** "5 anos de impacto consistente." (28px)
- **Timeline vertical** com linha de 2px slate-200 à esquerda:

| Período | Cargo | Contexto | Destaques |
|---------|-------|----------|-----------|
| 2023 — Presente | Software Architect & Tech Lead | Empresa de tecnologia · Gestão de frotas | Badges: Arquitetura 60+ microserviços, Liderança técnica, Infra GCP/AWS, -60% custos (verde), 3x performance (verde), 99.99% uptime (verde) |
| 2021 — 2023 | Full Stack Developer & DevOps | Mesma empresa · Evolução interna | Badges: CI/CD e automação, Kubernetes e Docker, Monitoramento e observabilidade |
| 2020 — 2021 | Full Stack Developer | Mesma empresa · Início de carreira | Badges: React · React Native · Node.js, APIs REST e microserviços, Apps mobile multiplataforma |
| 2019 — 2024 | Engenharia da Computação | Universidade Santa Cecília · Bacharelado | (sem badges) |

- Cargo atual: bolinha azul accent (16px, border DBEAFE)
- Cargos anteriores: bolinha slate-400 (border F1F5F9)
- Badges de resultado em verde, demais em slate-100

### 6. Stack (carousel infinito)

- **Background:** slate-50
- **Label:** "STACK" (accent, uppercase)
- **Headline:** "Ferramentas que uso para entregar." (28px)
- **2 fileiras de carousel infinito:**

**Row 1 (→ esquerda, ~35s):** React, TypeScript, Angular, Tailwind CSS, Node.js, Express, Redux, Vite

**Row 2 (← direita, ~30s):** Google Cloud, AWS, Kubernetes, Docker, MySQL, PostgreSQL, Redis, GitHub

- Logos via devicons CDN (SVGs)
- **Estado default:** grayscale(100%) opacity(0.5), texto slate-400
- **Hover:** grayscale(0%) opacity(1), texto slate-900, scale(1.08)
- **Hover na área:** pausa a animação da fileira (animation-play-state: paused)
- **Fade nas bordas:** CSS mask-image (transparente 0%/100%, preto 8%-92%)
- **Loop:** items duplicados para transição seamless
- Transition: 300ms ease para filter, color e transform
- **`prefers-reduced-motion`:** exibe grid estática (sem animação, sem duplicatas), items em cores originais
- **Acessibilidade:** duplicatas recebem `aria-hidden="true"`, items originais têm `alt` descritivo
- Na implementação, adicionar mais techs conforme necessário (Expo, BigQuery, PubSub, React Native, etc.)

### 7. Projetos (cards em grid 2x2)

- **Background:** white
- **Label:** "PROJETOS" (accent, uppercase)
- **Headline:** "Sistemas que construí e escalo." (28px)
- **Grid 2x2** de cards:

Cada card:
- Borda 1px slate-200, border-radius 10px, background slate-50
- Barra colorida no topo (3px, gradient por categoria)
- Label de categoria (uppercase, 11px, cor da categoria)
- Título (18px, weight 600)
- Descrição (13px, slate-500, line-height 1.7)
- Tech tags (pills com background da cor light da categoria)
- Métricas de resultado em verde (11px, weight 600)

| Card | Categoria | Cor | Título | Techs |
|------|-----------|-----|--------|-------|
| 1 | Plataforma SaaS | Azul (#2563EB) | Sistema de gestão de frotas | React, Microserviços, GCP, Kubernetes |
| 2 | Mobile | Roxo (#7C3AED) | App de operações de campo | React Native, Expo, TypeScript |
| 3 | Infraestrutura | Verde (#059669) | Arquitetura de microserviços | Kubernetes, PubSub, Docker, Cloud SQL |
| 4 | Analytics | Amber (#D97706) | Dashboard de métricas de engenharia | Angular, SSR, Express |

**Sem screenshots, sem nome de empresa** — cases genéricos focados em papel e impacto.

### 8. Contato (formulário + canais diretos)

- **Background:** white
- **Label:** "CONTATO" (accent, uppercase)
- **Headline:** "Vamos conversar." (28px)
- **Subtítulo:** "Preencha o formulário ou use um dos canais diretos abaixo."
- **Grid 2 colunas:**

**Grid colapsa para 1 coluna em < 768px** (formulário primeiro, canais abaixo).

**Coluna esquerda — Formulário:**
- Campos: Nome, Email, Assunto (select: Proposta · Consultoria · Outro), Mensagem (textarea)
- Labels visíveis acima de cada campo (12px, weight 600)
- Inputs com background slate-50, border slate-200, border-radius 6px, min-height 44px (touch target)
- Validação inline com Zod: erro aparece abaixo do campo em vermelho (destructive #DC2626) ao blur
- Botão: "Enviar mensagem" (bg slate-900, text white, full-width do form)
- **Estados do botão:**
  - Default: "Enviar mensagem"
  - Loading: disabled, opacity 0.7, spinner SVG animado + "Enviando..."
  - Sucesso: form reseta, mensagem verde inline acima do botão "Mensagem enviada com sucesso!" (desaparece em 5s)
  - Erro: mensagem vermelha inline "Erro ao enviar. Tente novamente." com botão habilitado
- Nota: "Os dados são salvos de forma segura via Google Sheets API." (11px, muted)
- **Submit:** Server function do TanStack Start → append na Google Sheet

**Coluna direita — Canais diretos:**
- Cards com ícone (40x40 bg blue-50, icon accent) + nome + handle/link
- Canais: Email, LinkedIn, GitHub, WhatsApp, Telegram
- WhatsApp usa bg emerald-50 + icon emerald-600

### 9. Footer

- **Background:** slate-900 (#0F172A)
- **Conteúdo:**
  - Logo `alexsander.dev` + tagline "Software Architect & Tech Lead"
  - Ícones sociais (LinkedIn, GitHub, Email) em pills com bg white/8%
  - Divider: 1px solid white/8%
  - Copyright: "© 2026 Alexsander Gusmão. Todos os direitos reservados."
  - Built with: "Construído com TanStack Start + Tailwind CSS"

### 10. Blog (comentado)

- Estrutura de rota `/blog` preparada mas comentada no código
- Será implementado separadamente no futuro
- Usará content-collections em projeto/rota separada

---

## i18n (Internacionalização)

- **Abordagem:** JSON de traduções (`pt.json`, `en.json`) com React Context provider
- **Toggle:** Chip `PT | EN` na navbar, persiste em localStorage
- **Escopo:** Todos os textos estáticos (headings, labels, descrições, botões, placeholders)
- **Default:** PT-BR
- **SSR:** Sempre renderiza PT-BR no servidor. Hidratação no client lê localStorage e troca se necessário. Flash de conteúdo PT→EN é aceitável e mitigado pela mesma estratégia do theme toggle (inline script no `<head>` que seta `lang` attribute antes do paint, similar ao `THEME_INIT_SCRIPT` já existente no `__root.tsx`)

---

## Formulário → Google Sheets

- **API Route:** `/api/contact` (POST handler via TanStack Start server function)
- **Fluxo:** Form submit → server function → Google Sheets API (append row)
- **Campos na planilha:** timestamp, nome, email, assunto, mensagem, idioma
- **Autenticação Google:** Service account com credenciais via env vars (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`). A planilha deve ser compartilhada com o service account. Scope: `https://www.googleapis.com/auth/spreadsheets`
- **Validação:** Client-side com Zod (inline errors), server-side valida novamente antes de enviar
- **Rate limiting:** Max 3 submissions por IP em janela de 5 minutos. Resposta 429 com mensagem "Muitas tentativas. Aguarde alguns minutos."

---

## Acessibilidade

- Contraste mínimo 4.5:1 (WCAG AA) — garantido pela paleta slate
- Focus rings visíveis em todos os elementos interativos
- Labels em todos os inputs do formulário
- `prefers-reduced-motion`: desabilita carousel animation
- Heading hierarchy sequencial (h1 → h2 → h3)
- Alt text descritivo nas logos de tech
- Smooth scroll respeitando `prefers-reduced-motion`
- Touch targets mínimos 44x44px

---

## SEO & Meta Tags

- **`<title>`:** "Alexsander Gusmão — Software Architect & Tech Lead"
- **`<meta description>`:** "Arquiteto de software com 5 anos de experiência liderando equipes e escalando plataformas SaaS com 10k+ usuários diários e 99.99% de uptime."
- **Open Graph:**
  - `og:title`: mesmo do `<title>`
  - `og:description`: mesmo do meta description
  - `og:type`: "website"
  - `og:url`: URL do portfólio
  - `og:image`: Imagem social card (1200x630px) com nome + cargo + paleta do site — gerar como asset estático
- **Twitter Card:** `summary_large_image` com os mesmos dados
- **Canonical URL:** definida no head
- **Versão EN:** meta tags em inglês quando idioma for EN (via i18n)

---

## Performance

- SSR via TanStack Start (First Contentful Paint rápido)
- Fontes: `font-display: swap`, preload apenas Inter weight 400/700
- Logos de tech: lazy load, SVG do CDN (leves)
- Sem JavaScript heavy no critical path
- Target: < 500KB page weight, < 2s LCP
