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

This is a **TanStack Start** (React SSR framework) app — a pastry conference website ("Haute Pâtisserie 2026") with an AI chat assistant.

**Stack:** React 19, TanStack Router (file-based routing), TanStack AI, Tailwind CSS v4, content-collections, Vite 7, Zod 4.

### Routing

File-based routing in `src/routes/`. The route tree is auto-generated in `src/routeTree.gen.ts` — don't edit it manually. Key routes:
- `/` — Home with featured speakers/sessions
- `/schedule` — Conference schedule
- `/speakers`, `/speakers/:slug` — Speaker list and detail
- `/talks`, `/talks/:slug` — Session list and detail
- `/api/remy-chat` — SSE streaming API route for AI chat (POST handler in `src/routes/api.remy-chat.ts`)

Root layout is in `src/routes/__root.tsx` (includes Header, Footer, theme init script, devtools).

### Content Collections

Markdown content in `content/speakers/` and `content/talks/`, defined in `content-collections.ts`. Collections generate typed data (`allSpeakers`, `allTalks`) imported from `content-collections`. Each item gets a `slug` derived from its name/title.

### AI Chat ("Remy")

- **API route** (`src/routes/api.remy-chat.ts`): Multi-provider support (Anthropic → OpenAI → Gemini → Ollama fallback). Uses `@tanstack/ai` with SSE streaming and tool-calling (max 5 iterations).
- **Tools** (`src/lib/conference-tools.ts`): Server-side tools using `toolDefinition` pattern — each has a schema definition + `.server()` implementation. Tools query content-collections data.
- **Client hook** (`src/lib/conference-ai-hook.ts`): `useConferenceChat()` wraps `@tanstack/ai-react`'s `useChat` with SSE connection to `/api/remy-chat`.
- **UI** (`src/components/RemyAssistant.tsx`, `RemyButton.tsx`): Floating chat widget.

### Path Aliases

Both `#/*` and `@/*` map to `./src/*` (configured in tsconfig.json and package.json imports). The codebase uses `#/` for imports.

### Styling

Tailwind CSS v4 with `@tailwindcss/vite` plugin. Custom dark theme with Playfair Display / Cormorant Garamond fonts and copper/gold accents. Theme toggle supports light/dark/auto modes with localStorage persistence and a flash-prevention script in `__root.tsx`.

### AI Provider Configuration

Set one env var to enable the AI assistant: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, or run Ollama locally.
