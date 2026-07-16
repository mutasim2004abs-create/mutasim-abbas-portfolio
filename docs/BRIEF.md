# Portfolio Project Brief — Mutasim Abbas

## Purpose
A high-end personal portfolio for **Mutasim Abbas**, a software engineering student.
Primary goal: **flex technical skill** — the site itself is proof he can build. Secondary:
be reachable for opportunities (recruiters).

## Direction (locked)
Blend of two reference templates:
- **Skeleton / structure / motion** from a premium "3D creator" portfolio (Template 2):
  Hero → Marquee → About (scroll-reveal text) → "What I Do" (skills, replaces Services) →
  Projects (sticky-stacking cards). Framer Motion, magnetic portrait, fluid `clamp()` typography.
- **Skin / aesthetic** from a dark coding-education hero (Template 1):
  Dark theme with green code accent `#5ed29c`, technical/coding feel, glass/glow accents,
  grid lines, subtle glow. This makes it read as a **software engineer**, not a 3D designer.
- **Content** is 100% Mutasim's real info (below). No demo assets (no "Jack" photo, no
  motionsites GIFs, no higgs.ai project images). Replace all with real content + tasteful
  coding-themed visuals.

## Tech stack (locked)
- **Next.js + TypeScript** (App Router)
- **Tailwind CSS**
- **Framer Motion** (motion/interactions)
- **lucide-react** (icons)
- Optional subtle 3D via **React Three Fiber** if it strengthens the hero without hurting perf.
- Deploy target: **Vercel** (free). Build must be static-friendly.
- Windows dev environment (PowerShell). Keep commands cross-platform.

## Theme tokens (starting point — designer to refine)
- Background: near-black (e.g. `#070b0a` / `#0C0C0C`)
- Primary accent (code green): `#5ed29c`
- Text: white / 70% white for body
- Fonts: a strong geometric sans for headings (Inter/Plus Jakarta Sans), optional serif italic
  accent (Instrument Serif) for a word or two. Confirm in design system.

## Sections
1. **Hero + Nav** — Name "MUTASIM ABBAS", title "Software Engineering Student", eyebrow tagline,
   dark coding aesthetic (grid lines, central glow, green accent). Portrait uses Mutasim's photo
   (magnetic hover effect). CTA to Projects. Nav: PROJECTS, ABOUT, SKILLS, (RESUME/CONTACT).
   Mobile hamburger → full-screen overlay.
2. **Marquee** — scrolling strip. Replace demo GIFs with real project screenshots / coding
   visuals / tech-logo tiles (no third-party demo assets).
3. **About** — scroll-reveal character animation. Use the "wisdom" copy below.
4. **Skills / What I Do** — replaces 3D "Services". List real skills grouped: Languages (Java,
   Python, C, JS/TS), Web (React, HTML, CSS), Tools (VS Code, Git). Mention spoken languages
   (Arabic native, Turkish, English B2–C1) and boxing (4 yrs) as a "discipline" note.
5. **Projects** — sticky-stacking cards for the two stars, plus a compact grid/list for the
   smaller uni projects.

## About copy (draft — "wisdom, not a résumé")
> Some people write code. Others build discipline into everything they touch.
>
> Mutasim Abbas moves between three languages and one keyboard — Arabic by blood, Turkish by
> choice, English by ambition — and speaks a fourth fluently: the quiet logic of the machine.
>
> Four years in the ring taught him what computer science only confirmed — mastery is precision,
> repeated until it looks effortless. Every function refined like a jab. Every project a round he
> refuses to lose.
>
> He doesn't chase shortcuts. He builds — FitMacro, VisSort, and the experiments in between —
> because a builder is measured by what still stands after the noise fades.
>
> This isn't a portfolio. It's a starting line.

## Content — Projects
### ⭐ VisSort (solo) — CENTERPIECE PROJECT
- A cinematic, interactive **sorting-algorithm visualizer** built for teaching. Five-page SPA,
  fully client-side (no backend).
- Highlights: **8 algorithms** (Bubble, Insertion, Selection, Merge, Quicksort, Heapsort, Shell,
  Radix LSD); **three views** — Columns (bars), Array (numbered cells sliding between slots), and
  Tree (recursion tree built step-by-step for merge/quick + binary heap tree for heapsort);
  **Compare mode** races two algorithms on the same array with a head-to-head scoreboard + a live
  execution-scaling chart; **Learn mode** with pseudocode that highlights the executing line and
  quizzes generated from real runs; reversible stepping with scrub-correct counters; optional Web
  Audio sound; cinematic dark liquid-glass UI (Instrument Serif, blur-in headlines, film grain).
- Engineering cred to surface: **239 tests** (Vitest), strict TypeScript, CI/CD via GitHub Actions
  (type-check + lint + test + build before every deploy).
- Tech: **Vite · React 18 · TypeScript (strict) · Tailwind CSS · Three.js / @react-three/fiber ·
  React Router · Vitest**.
- Repo: https://github.com/mutasim2004abs-create/VisSort
- **Live: https://mutasim2004abs-create.github.io/VisSort/**
- Category label: "Solo · 3D Visualization"
- NOTE: VisSort's own aesthetic (dark, liquid-glass, Instrument Serif) is the north star for this
  portfolio's look — they should feel like the same designer made both.

### ⭐ FitMacro (solo)
- "FitMacro — AI Meal Tracker": a polished, mobile-style single-page app that helps athletes track
  daily calories, protein, carbs, and fat, with a diet planner that generates meal plans.
- Aesthetic: dark theme with a gold accent (#d4af37), radial-glow background, glass cards,
  ~480px mobile app frame.
- Tech: HTML/CSS/JavaScript (React on the repo). Repo: https://github.com/mutasim2004abs-create/Front-end
  (local build also at C:\Users\asoom\Downloads\fitmacro.html). Live link: TBD (ask user; may be
  undeployed — if so, link the repo and use screenshots).
- Category label: "Solo · Web App"

### Smaller projects (uni / group)
- Line-intersection point calculator
- GPA calculator
- Endianness demo + Hex→Decimal converter
(Group projects; the two stars above are solo.)

## Skills
- Languages: Java, Python, C, JavaScript/TypeScript
- Web: React, HTML, CSS
- Tools: VS Code, Git/GitHub
- Spoken: Arabic (native), Turkish, English (B2–C1)
- Discipline: Boxing (4 years)

## Links
- GitHub: https://github.com/mutasim2004abs-create
- LinkedIn: https://www.linkedin.com/in/mutasim-abbas-063740410/
- Email: mutasim2004.abs@gmail.com

## Component sources (use these — don't reinvent)
- **21st.dev** (https://21st.dev/community/components/featured) — premium copy-paste React/Tailwind
  components. Pull from: Heroes, Animated Backgrounds, Cards, Text animations, Marquees, Buttons
  (magnetic/gradient), 3D globes. Adapt to the theme tokens; keep code clean and self-contained.
- Reference templates the user liked (for structure + motion + the coding/glass skin) are described
  in the "Direction" section above. Recreate their *patterns*, never copy their demo assets.

## Assets
- Two real portraits provided by Mutasim (black jacket, sunglasses, by the water): one side-profile,
  one front-facing. Use side-profile for the artistic hero; front-facing works for About.
- IMPORTANT: the portrait image FILES are not yet in the repo. Build with a tasteful dark placeholder
  and leave a clearly-marked swap point at `/public/portrait.jpg` (and `/public/portrait-front.jpg`).
  Mutasim will drop the files in later.
- Real screenshots to capture for the Projects section: VisSort (live at the URL above) and FitMacro
  (from C:\Users\asoom\Downloads\fitmacro.html). No third-party demo assets anywhere.

## Non-negotiables
- No misrepresentation: never present others' work/photos as Mutasim's.
- Real, working links to the two repos.
- Fully responsive (mobile-first, clamp typography), accessible, fast.
- Clean, secure, production-quality code. Deployable to Vercel.
