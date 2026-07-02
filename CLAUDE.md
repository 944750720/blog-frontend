# CLAUDE.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Essential Commands

- `pnpm dev` — Start development server
- `pnpm build` — Production build
- `pnpm lint` / `pnpm lint:fix` — Biome check with optional auto-fix
- `pnpm biome check .` — Full Biome lint + format check

## Architecture

- **Next.js 16** — App Router, Server Components by default
- **React 19** + **TypeScript**
- **Tailwind CSS 4** — CSS variables design tokens (`@theme inline` in globals.css)
- **shadcn/ui** — Radix UI based components (`components/ui/`)
- **SWR** — Data fetching
- **Biome** — Linting and formatting (replaces ESLint + Prettier)
- **next-intl** — Internationalization
- **next-themes** — Dark/light theme

## Project Structure

```
app/
├── page.tsx                # Home page
├── layout.tsx              # Root layout (ThemeProvider + SWRProvider + i18n)
├── globals.css             # Tailwind + shadcn theme variables
├── (pages)/
│   ├── (auth)/             # Auth pages (login/register)
│   ├── dashboard/          # Dashboard (admin + user)
│   └── ...
├── components/
│   ├── layout/             # Header, Footer
│   ├── ui/                 # shadcn/ui components (auto-generated)
│   └── icons/              # Custom icon components
├── lib/
│   ├── config.ts           # Site configuration (title, menu, footer, social)
│   ├── utils.ts            # cn() utility (clsx + tailwind-merge)
│   └── services/           # API service layer
├── hooks/                  # Custom React hooks
└── types/                  # TypeScript type definitions
```

## Code Style Rules

### Conditional ClassNames

Use `cn()` with object syntax instead of ternaries:

```tsx
// ✅ cn('base', { 'on-true': condition, 'on-false': !condition })
// ❌ condition ? "base on-true" : "base on-false"
```

### Use Design Tokens

Use CSS variable-based classes, not hardcoded colors:

```tsx
// ✅ bg-background, text-foreground, text-muted-foreground
// ❌ bg-[#fff], text-[#333]
```

### Import Order

1. External packages
2. `@/` alias imports
3. Relative imports

### Semantic HTML

Use `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<nav>` instead of generic `<div>` wrappers. Maintain heading hierarchy (`h1` → `h2` → `h3`), max one `<h1>` per page.

### Component Structure (Composer Approach)

```
1. Imports
2. Types/Interfaces
3. Component function
   3a. Hooks (top of component)
   3b. Local state
   3c. Event handlers
   3d. Render
```

### Next.js Patterns

- Server Components by default (no `"use client"`)
- Client Components only when needed (state, effects, event handlers)
- Use `@/` alias for imports from `app/` directory

### TipTap / ProseMirror

- Never use `document.querySelector(".ProseMirror")` to access the editor DOM. Use `editor.view.dom` instead — it is a direct reference to the editor container and does not depend on internal class names.
- For event handling (clicks, key events), use `editorProps.handleClick` / `handleDOMEvents` in the `useEditor` config instead of manual `addEventListener`.

### Code Quality

- `pnpm biome check .` must pass (no errors)
- No hardcoded colors — use design token classes
- SVG icons: include `aria-label` or `<title>` for accessibility; decorative icons next to visible text should use `aria-hidden="true"`
- Use stable `key` values (unique IDs), never array indices for dynamic lists

## Theme System

Colors are defined as CSS variables in `globals.css` under `:root` (light) and `.dark` (dark). The `@theme inline` block maps them to Tailwind utility classes. When adding new color tokens, add to both `:root`, `.dark`, and `@theme inline`.
