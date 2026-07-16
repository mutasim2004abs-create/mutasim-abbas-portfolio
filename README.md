# Mutasim Abbas — Portfolio

High-end single-page portfolio, designed and built as a working proof of skill.

**▶ Live: https://mutasim2004abs-create.github.io/**

## Stack

Next.js 14 (App Router, static export) · TypeScript (strict) · Tailwind CSS ·
Framer Motion · lucide-react. Self-hosted fonts via `@fontsource` (Plus Jakarta
Sans, Inter Variable, Instrument Serif, JetBrains Mono). Single dark theme,
code-green accent, liquid-glass surfaces, canvas particle field, reduced-motion
fallbacks throughout.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server → http://localhost:3000
npm run build     # type-check + static export to out/
npm run lint      # ESLint
npm run typecheck # tsc --noEmit
```

## Deployment

Pushes to `main` deploy automatically to GitHub Pages via
`.github/workflows/deploy.yml` — the pipeline type-checks, lints, and builds
before every deploy. No environment variables, no server, no secrets.

## Structure

- `app/` — layout (fonts + metadata + OG image), page, globals.css (design
  tokens + glass recipe), 404, favicon.
- `components/` — Nav (focus-trapped mobile overlay), Hero (+ HeroField
  particles), Magnet, Marquee, About, Skills, Projects (sticky-stack), Footer.
- `lib/content.ts` — single source of truth for all content and links.
- `lib/motion.ts` — shared Framer Motion tokens.
- `docs/` — project brief and design system the site was built from.
