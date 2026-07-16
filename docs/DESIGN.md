# DESIGN SYSTEM — Mutasim Abbas Portfolio

> Implementation-ready spec. Frontend builds from this without follow-up questions.
> Stack: Next.js (App Router) + TypeScript · Tailwind CSS · Framer Motion · lucide-react · optional React Three Fiber.
> This document is the source of truth. Where it and any component you pull from 21st.dev disagree, this wins — re-skin the component.

---

## 0. Direction & Mood (with reasoning)

**One line:** _A software engineer's terminal, lit from within._

The site blends the **structure and motion of a premium 3D-creator portfolio** (Hero → Marquee → About with scroll-reveal text → Skills → sticky-stacking Projects) with the **skin of a dark coding IDE** (near-black background, one confident code-green accent `#5ed29c`, faint vertical grid lines, a single central glow, liquid-glass cards).

**Why this fits the audience:**
- **Recruiters + technical peers** read "dark, precise, green-on-black, monospace details" as competence instantly — it is the visual language of the terminal and the editor they live in. It signals "engineer" before a single word is read.
- **Restraint is the flex.** One accent color, one glow, generous negative space. A student who over-decorates looks junior; a student who shows control of a tight system looks senior. The motion does the impressing, not the color count.
- **VisSort is the north star.** Mutasim's own centerpiece project is cinematic dark liquid-glass with Instrument Serif. The portfolio must feel like the same hand made both — so the serif-italic accent word and the glass recipe here are deliberately echoed from VisSort. Continuity between portfolio and project is itself proof of taste.

**Mood keywords:** cinematic, precise, engineered, calm-confident, nocturnal, glassy, disciplined.
**Anti-mood (avoid):** rainbow gradients, playful/bubbly, skeuomorphic clutter, neon cyberpunk overload, stock-template "startup purple".

**Style lineage (from design DB):** Motion-Driven + Minimalism (primary for Portfolio/Personal) × Glassmorphism × Dimensional Layering. Landing pattern: **Storytelling-Driven**.

---

## 1. Color Tokens

Single dark theme only. No light mode (do not half-build one). All values are exact hex/rgba. Contrast ratios are measured against the stated background and printed — **all body/UI text clears WCAG AA (4.5:1); most clear AAA (7:1).**

### 1.1 Primitive tokens (CSS variables)

```css
:root {
  /* ---- Backgrounds ---- */
  --bg: #070B0A;              /* page base — near-black, faint green cast */
  --bg-elevated: #0A100E;     /* raised sections / sticky card backdrop */
  --card: #0E1512;           /* glass card fill base (before rgba tint) */
  --card-2: #101A16;         /* secondary card / nested surface */

  /* ---- Accent (code green) ---- */
  --accent: #5ED29C;         /* PRIMARY — the one color that matters */
  --accent-bright: #7DE0B0;  /* hover / active glow highlight */
  --accent-dim: #3FA87A;     /* pressed / borders / de-emphasized accent */
  --accent-ink: #04110B;     /* text placed ON a solid accent fill */
  --cyan: #6FE9E0;           /* secondary glow ONLY (never text) — hero glow blend */

  /* ---- Text ---- */
  --text: #FFFFFF;           /* headings, high-emphasis */
  --text-body: #B4C0BA;      /* body copy (~70% white, green-tinted) */
  --text-muted: #8A968F;     /* captions, meta, eyebrow, disabled labels */

  /* ---- Borders / glass / glow ---- */
  --border: rgba(255,255,255,0.08);        /* hairline dividers */
  --border-strong: rgba(255,255,255,0.14); /* card outer edge */
  --glass-fill: rgba(20,32,27,0.55);       /* liquid-glass card fill */
  --glass-highlight: rgba(255,255,255,0.06);/* inset top highlight */
  --grid-line: rgba(94,210,156,0.05);      /* faint vertical grid lines */
  --glow-core: rgba(94,210,156,0.28);      /* central hero glow inner */
  --glow-cyan: rgba(111,233,224,0.14);     /* glow outer blend */
  --accent-glow: 0 0 40px rgba(94,210,156,0.35); /* shadow used for CTA/portrait */

  /* ---- Project-specific accents (used ONLY inside that project card) ---- */
  --fitmacro-gold: #D4AF37;  /* FitMacro brand echo — its card only */
}
```

### 1.2 Verified contrast (measured)

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `#FFFFFF` (headings) | `--bg #070B0A` | **19.8:1** | AAA |
| `#B4C0BA` (body) | `--bg` | **10.5:1** | AAA |
| `#8A968F` (muted/eyebrow) | `--bg` | **6.4:1** | AA (large + UI ok; use ≥14px) |
| `#5ED29C` (accent text/links) | `--bg` | **10.5:1** | AAA |
| `#7DE0B0` (accent hover) | `--bg` | **12.4:1** | AAA |
| `#5ED29C` (accent) | `--card #0E1512` | **9.9:1** | AAA |
| `--accent-ink #04110B` | on `#5ED29C` fill (CTA text) | **10.3:1** | AAA |
| `#FFFFFF` | `--card` | **18.5:1** | AAA |
| `#B4C0BA` | `--card` | **9.9:1** | AAA |
| `#D4AF37` (gold) | `--bg` | **9.4:1** | AAA (FitMacro card only) |

**Color-is-never-the-only-signal rule:** the accent green always co-occurs with a shape or text cue — links are underlined on hover, the "active" nav item has an underline bar (not just green text), status/tech tags carry a label, and the hero's green period is also the largest glyph. Never rely on green alone to carry meaning (color-blind safety).

---

## 2. Typography

Self-host via `@fontsource` so the site works offline and avoids layout shift (do **not** rely on the Google CDN in production). Families:

| Role | Family | Package | Why |
|---|---|---|---|
| Display / headings | **Plus Jakarta Sans** | `@fontsource/plus-jakarta-sans` | Geometric, slightly warm, distinctive at huge sizes; tight tracking reads "modern engineered". |
| Body / UI | **Inter** | `@fontsource-variable/inter` | Workhorse legibility; pairs invisibly under Jakarta. |
| Serif accent | **Instrument Serif** (italic) | `@fontsource/instrument-serif` | The VisSort echo — one or two italic words per section for cinematic contrast. |
| Mono (code, tags, numbers, eyebrow) | **JetBrains Mono** | `@fontsource/jetbrains-mono` | The "software engineer" tell — used for eyebrows, tech tags, big index numbers, metrics. |

```bash
npm i @fontsource/plus-jakarta-sans @fontsource-variable/inter @fontsource/instrument-serif @fontsource/jetbrains-mono
```

Import in `app/layout.tsx` (weights: Jakarta 500/600/700/800, Inter variable, Instrument 400 + 400-italic, JetBrains 400/500).

```js
// tailwind.config — fontFamily
display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
body:    ['"InterVariable"', 'Inter', 'system-ui', 'sans-serif'],
serif:   ['"Instrument Serif"', 'Georgia', 'serif'],
mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
```

### 2.1 Fluid type scale (`clamp()`)

Mobile-first; each role scales between a 360px phone and a 1440px desktop.

| Role | Font / weight | `clamp()` size | line-height | tracking | Notes |
|---|---|---|---|---|---|
| Eyebrow / kicker | Mono 500, uppercase | `clamp(0.72rem, 0.68rem + 0.2vw, 0.8rem)` | 1.4 | `0.22em` | color `--accent`, often prefixed with `//` or `01 —` |
| Hero H1 | Jakarta 700 | `clamp(2.75rem, 1.6rem + 6.4vw, 6.5rem)` | 0.95 | `-0.03em` | uppercase; the final period is `--accent` |
| Section heading (H2) | Jakarta 700 | `clamp(2rem, 1.2rem + 3.6vw, 3.75rem)` | 1.0 | `-0.02em` | one word may be `serif italic` |
| Sub-heading (H3) | Jakarta 600 | `clamp(1.25rem, 1.05rem + 0.9vw, 1.6rem)` | 1.15 | `-0.01em` | card titles |
| Body | Inter 400 | `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)` | 1.65 | `0` | color `--text-body`; max-width `65ch` |
| Body-large (About) | Inter 400 | `clamp(1.35rem, 1.1rem + 1.3vw, 2.1rem)` | 1.35 | `-0.01em` | the scroll-reveal paragraph |
| Label / tag | Mono 500 | `clamp(0.75rem, 0.72rem + 0.15vw, 0.85rem)` | 1.2 | `0.02em` | tech chips, meta |
| Big number / index | Mono 500 | `clamp(3rem, 2rem + 5vw, 7rem)` | 1.0 | `-0.02em` | project index `01 / 02`, metrics like `239` |
| Serif accent word | Instrument Serif italic 400 | inherits host size ×1.05 | inherit | `0` | `--text` or `--accent`; tasteful, ≤2 words |

**Usage rule for the serif:** exactly one italic accent word per section maximum (e.g. About heading "the quiet _logic_"). Overuse kills the effect.

---

## 3. Spacing, Radii, Elevation

### 3.1 Spacing scale (4px base)
`--space-1:4 · 2:8 · 3:12 · 4:16 · 5:24 · 6:32 · 7:48 · 8:64 · 9:96 · 10:128 · 11:160`px.
Section vertical rhythm: `padding-block: clamp(5rem, 3rem + 8vw, 10rem)`. Content max-width `1200px`, gutter `clamp(1.25rem, 5vw, 3rem)`.

### 3.2 Radii — **heavy rounding is a signature**
```css
--r-sm: 12px;    /* chips, tags, inputs */
--r-md: 20px;    /* buttons, small cards */
--r-lg: 32px;    /* standard cards */
--r-xl: 40px;    /* feature cards, marquee tiles */
--r-2xl: 48px;   /* project sticky cards */
--r-3xl: 60px;   /* hero glass panel */
--r-full: 9999px;/* pills, avatar, magnetic CTA */
```
Tailwind: `rounded-[40px]`, `rounded-[48px]`, `rounded-[60px]`. Large radii are intentional and consistent — do not mix a 12px card next to a 48px card in the same row.

### 3.3 Elevation (dark = glow + hairline, not drop shadow)
```css
--elev-1: 0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.45);
--elev-2: 0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 60px rgba(0,0,0,0.55);
--elev-accent: 0 0 0 1px rgba(94,210,156,0.30), 0 0 40px rgba(94,210,156,0.28);
```

---

## 4. Liquid-Glass Card Recipe (signature component)

The core surface, echoing VisSort. Every card, nav, and overlay uses this base.

```css
.glass {
  position: relative;
  background: var(--glass-fill);                 /* rgba(20,32,27,0.55) */
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border-radius: var(--r-xl);                    /* 40px */
  box-shadow:
    inset 0 1px 0 var(--glass-highlight),        /* top inset highlight */
    var(--elev-2);
  overflow: hidden;
  isolation: isolate;
}

/* Gradient border via mask-composite (no visible box border, just a lit edge) */
.glass::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  padding: 1px;                                  /* border thickness */
  background: linear-gradient(
    135deg,
    rgba(94,210,156,0.55) 0%,
    rgba(255,255,255,0.12) 30%,
    rgba(255,255,255,0.02) 60%,
    rgba(94,210,156,0.25) 100%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;                   /* Safari/Chrome */
          mask-composite: exclude;               /* standard */
  pointer-events: none;
}

/* Optional inner top glow for hero panel */
.glass--glow::after {
  content: "";
  position: absolute; inset: 0;
  background: radial-gradient(120% 60% at 50% -10%, var(--glow-core), transparent 60%);
  pointer-events: none; z-index: -1;
}
```

**Fallback:** if `backdrop-filter` is unsupported (test with `@supports not (backdrop-filter: blur(1px))`), set `.glass { background: rgba(14,21,18,0.92); }` — solid, still readable, contrast preserved.

**Film grain (VisSort echo, optional):** a fixed full-screen `<div>` with a tiling SVG/PNG noise at `opacity: 0.04; mix-blend-mode: overlay; pointer-events:none;`. Ship it behind a `prefers-reduced-transparency` / low-power guard; keep opacity ≤0.05.

---

## 5. Motion Spec (Framer Motion)

Global easing token: `--ease-out: cubic-bezier(0.25, 0.1, 0.25, 1)`. Standard duration `0.6s`; micro-interactions `0.25–0.35s`.

### 5.1 Fade-in reveal (default for every block)
```ts
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show:  (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.08 },
  }),
};
// <motion.div variants={reveal} initial="hidden" whileInView="show"
//   viewport={{ once: true, margin: "-15%" }} custom={index} />
```
Stagger children by `delay: index * 0.08`. Trigger once, at 15% into viewport.

### 5.2 Magnetic portrait / magnetic CTA
Track pointer inside the element; translate toward cursor at ~0.25 strength, spring back on leave.
```ts
// on mouse move within bounds:
const x = (e.clientX - (rect.left + rect.width/2)) * 0.25;
const y = (e.clientY - (rect.top  + rect.height/2)) * 0.25;
// animate with spring: { stiffness: 150, damping: 15, mass: 0.1 }
// onMouseLeave -> x:0, y:0
```
Portrait also lifts: `scale: 1.03` + `box-shadow: --elev-accent` on hover. Max translate clamp ±18px so it never detaches from layout.

### 5.3 Character-by-character scroll-reveal (About paragraph)
Split copy into words → spans. Drive opacity by scroll progress.
```ts
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start 0.8", "end 0.2"],
});
// each word i of N:
const start = i / N;
const end   = start + (1 / N);
const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
// rest color = rgba(180,192,186,0.2) -> resolves to --text-body/--text as it lights
```
Resting characters sit at `opacity 0.2`; they light to `1` as the reader scrolls through. This is the centerpiece storytelling moment.

### 5.4 Scroll-driven marquee
Two mirrored rows, opposite directions, base auto-scroll (`~40s` linear infinite) **plus** a scroll-velocity nudge via `useScroll` → `useVelocity` → offset. Pause on hover. Rows: real project tiles + tech-logo tiles (see §6).

### 5.5 Sticky-stacking project cards
Each card is `position: sticky; top: <stacked offset>`. As you scroll, later cards slide up and the earlier card scales down slightly, stacking like a deck.
```ts
// For card `index` of `total` cards:
const targetScale = 1 - (total - 1 - index) * 0.03;
const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "start start"] });
const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
// sticky top grows per card: top = `calc(6rem + ${index * 1.5}rem)`
// wrap each card: style={{ scale, top }}
```
With 2 star cards: card 0 scales to `0.97`, card 1 stays `1.0`. Smaller uni projects live below in a static grid (not stacked).

### 5.6 Micro-interactions
- Buttons/links: color + underline transitions `0.25s ease-out`.
- Nav underline: animated width `0 → 100%` on hover/active, `0.3s`.
- Card hover: border gradient brightens (accent stops `0.55 → 0.85`), `translateY(-4px)`, `0.35s`.

### 5.7 `prefers-reduced-motion` fallback (required)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
In JS: read `useReducedMotion()` from Framer Motion. When true —
- reveals render at final state (`opacity 1, y 0`), no stagger;
- About text renders fully lit (all words `opacity 1`), no scroll binding;
- marquee stops auto-scrolling (static strip) or scrolls at most once, no velocity coupling;
- sticky cards render as a plain stacked/flow list with no scale transform;
- magnetic effects disabled (portrait/CTA static, hover = simple opacity change).

---

## 6. Section Layout Specs

Breakpoints: **mobile** `<640` · **tablet** `640–1024` · **desktop** `>1024`. All wireframes below are mobile-first.

### Global chrome
- **Vertical grid lines:** fixed background layer, `repeating-linear-gradient(90deg, transparent, transparent calc(25% - 1px), var(--grid-line) calc(25% - 1px), var(--grid-line) 25%)` → 4 faint columns on desktop, 2 on mobile. Behind all content, `pointer-events:none`.
- **Central glow:** one fixed radial behind the hero: `radial-gradient(60% 50% at 50% 30%, var(--glow-core), var(--glow-cyan) 40%, transparent 70%)`. Do not repeat glows per section — one light source.

### 6.1 Hero + Nav

```
NAV (glass pill, sticky top)
┌───────────────────────────────────────────────┐
│ MA▮        PROJECTS  ABOUT  SKILLS   [Resume ↗] │  desktop
└───────────────────────────────────────────────┘
┌───────────────────────────────────────────────┐
│ MA▮                                        [≡] │  mobile
└───────────────────────────────────────────────┘

HERO
        // SOFTWARE ENGINEERING STUDENT        ← eyebrow (mono, accent)
        MUTASIM
        ABBAS.                                  ← H1, the "." is --accent
        one-line tagline in --text-body (max 60ch)
        [ View Projects → ]   [ GitHub ↗ ]      ← primary + ghost CTA
                                   ┌──────────┐
                                   │ portrait │  ← glass frame, magnetic
                                   │  (glow)  │
                                   └──────────┘
```
- **Nav:** glass pill (`.glass`, `--r-full`), `backdrop-blur`, sits `top: 1rem`, becomes more opaque after `scrollY > 40`. Left: monogram `MA` (accent). Center/right: `PROJECTS · ABOUT · SKILLS` links (mono, uppercase, `letter-spacing 0.1em`) + `Resume ↗` as an outlined accent pill. Active/hover: animated accent underline bar.
- **Mobile nav:** hamburger (lucide `Menu`) → **full-screen overlay** (`--bg` at 98%, `backdrop-blur`), links stagger-fade in at `clamp(2rem,10vw,3rem)`, close = lucide `X`. Body scroll locked while open. Include Email + LinkedIn + GitHub at the bottom of the overlay.
- **H1:** two lines, uppercase, Jakarta 700, `-0.03em`. Final period `.` in `--accent` with `text-shadow: 0 0 24px rgba(94,210,156,0.5)`.
- **Portrait:** right column on desktop, below CTAs on mobile. `/public/portrait.jpg` (side-profile) in a glass frame `--r-2xl`, magnetic hover (§5.2), subtle accent glow. **Placeholder until file arrives** — see §7.
- **Layout:** desktop = 2-col (text 58% / portrait 42%); tablet = text over portrait; mobile = stacked, portrait `max-width: 320px` centered.
- Scroll cue at bottom: mono `scroll ↓` fading in/out (respect reduced-motion → static).

### 6.2 Marquee
Full-bleed, two rows (see §5.4). **Tiles are real content only** — never demo GIFs:
- Row A: real **project screenshot tiles** (VisSort live capture, FitMacro capture) in `--r-xl` glass tiles, each with a mono label overlay (`VisSort ↗`).
- Row B: **tech-logo tiles** — JavaScript/TypeScript, React, Python, Java, C, Git, Vite, Three.js, Tailwind. Monochrome/accent-tinted glyphs on glass chips (`--r-md`), mono wordmark beside each.
- Edge fade masks left/right (`mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`).
- Height `clamp(84px, 12vw, 140px)` per row, `gap 16px`.
- Until screenshots exist, use coding-themed placeholders (§7), never third-party assets.

### 6.3 About (scroll-reveal storytelling)
- Eyebrow: `// 01 — ABOUT`.
- The **"wisdom" copy is used verbatim** from the brief. Render as the big scroll-reveal paragraph (§5.3, Body-large). Split by word; words light from `0.2 → 1` opacity on scroll.
- Suggested serif-italic accents (one or two words only): _"logic"_ in "the quiet **logic** of the machine", and _"starting line"_ in the closing sentence — set in Instrument Serif italic, `--accent` on the final phrase.
- Layout: single centered column, `max-width: 40ch–46ch` at Body-large size for dramatic line breaks; left-aligned on mobile.
- Full verbatim text to render:
  > Some people write code. Others build discipline into everything they touch.
  >
  > Mutasim Abbas moves between three languages and one keyboard — Arabic by blood, Turkish by choice, English by ambition — and speaks a fourth fluently: the quiet _logic_ of the machine.
  >
  > Four years in the ring taught him what computer science only confirmed — mastery is precision, repeated until it looks effortless. Every function refined like a jab. Every project a round he refuses to lose.
  >
  > He doesn't chase shortcuts. He builds — FitMacro, VisSort, and the experiments in between — because a builder is measured by what still stands after the noise fades.
  >
  > This isn't a portfolio. It's a _starting line._

### 6.4 Skills / "What I Do"
Eyebrow `// 02 — WHAT I DO`. Heading e.g. "Tools of the _craft_." Bento-style glass grid.

```
Desktop (bento):
┌──────────────┬──────────────┐
│ LANGUAGES    │ WEB          │
│ Java Python  │ React        │
│ C  JS/TS     │ HTML  CSS    │
├──────────────┼──────────────┤
│ TOOLS        │ SPOKEN       │
│ VS Code Git  │ AR TR EN     │
├──────────────┴──────────────┤
│ DISCIPLINE — Boxing, 4 yrs  │  (full-width strip)
└─────────────────────────────┘
Tablet: 2-col.  Mobile: 1-col stack.
```
- Each group = a `.glass` card (`--r-xl`), mono category label (accent), tech items as chips (`--r-sm`, mono, `--text` on `--card-2`, 1px `--border`). Each chip pairs a lucide icon or letter glyph with the label (icon + text, never color-only).
- **Languages:** Java, Python, C, JavaScript/TypeScript. **Web:** React, HTML, CSS. **Tools:** VS Code, Git/GitHub.
- **Spoken languages:** Arabic (native), Turkish, English (B2–C1) — show as pill row with proficiency in mono meta.
- **Discipline strip:** "Boxing · 4 years — mastery is precision, repeated." Ties back to the About copy; lucide `dumbbell`/custom glove-free icon or a simple accent dot. This is a full-width glass strip that reads as personality, not a skill bar.
- **No fake percentage bars** — proficiency rings/bars imply false precision for a student; use presence + grouping instead.

### 6.5 Projects (sticky-stacking + grid)
Eyebrow `// 03 — SELECTED WORK`. Two **sticky-stacking** star cards (§5.5), then a compact grid.

**Card layout (each star, `.glass`, `--r-2xl`, min-height `~80vh` desktop):**
```
┌───────────────────────────────────────────┐
│ 01                         Solo · 3D Viz   │  ← mono index + category
│ VisSort                                    │  ← H2 (Jakarta)
│ one-line pitch (--text-body)               │
│ [screenshot / live preview]                │
│ tech chips: Vite React TS Tailwind Three…  │
│ metrics: 239 tests · 8 algorithms · CI/CD  │  ← mono big-number accents
│ [ Live Demo ↗ ]   [ Source ↗ ]             │
└───────────────────────────────────────────┘
```

- **Card 01 — VisSort** (centerpiece):
  - Category: `Solo · 3D Visualization`.
  - Pitch: "A cinematic, interactive sorting-algorithm visualizer built for teaching."
  - Highlights to surface as chips/metrics: **8 algorithms** · **3 views** (Columns / Array / Tree) · **Compare mode** · **Learn mode** · **239 tests (Vitest)** · **strict TypeScript** · **CI/CD (GitHub Actions)**.
  - Tech chips: Vite · React 18 · TypeScript (strict) · Tailwind · Three.js / R3F · React Router · Vitest.
  - Live: `https://mutasim2004abs-create.github.io/VisSort/` (primary CTA). Source: `https://github.com/mutasim2004abs-create/VisSort`.
  - Give VisSort the most visual weight (largest preview, the metrics row) — it is the flex.
- **Card 02 — FitMacro**:
  - Category: `Solo · Web App`.
  - Pitch: "AI Meal Tracker — track daily calories, protein, carbs & fat with a diet planner that generates meal plans."
  - Aesthetic note echoed inside the card: **gold accent `--fitmacro-gold #D4AF37`** used only here (tech chip glow, one hairline) so the card nods to the app's real identity without breaking the global green system. Everything else stays on the green/neutral system.
  - Tech chips: HTML · CSS · JavaScript · React.
  - CTA: Source `https://github.com/mutasim2004abs-create/Front-end`. **Live link TBD** — if undeployed, show only Source + screenshot; do not fabricate a live URL. Capture screenshot from `C:\Users\asoom\Downloads\fitmacro.html`.

- **Smaller uni projects (compact static grid below the stack, not stacked):** 3 glass cards `--r-lg`, 3-col desktop / 1-col mobile:
  1. **Line-Intersection Point Calculator** — geometry, `Group project`.
  2. **GPA Calculator** — utility, `Group project`.
  3. **Endianness Demo + Hex→Decimal Converter** — systems/low-level, `Group project`.
  Each: mono title, one-line description, `Group` tag, lucide icon. No inflated claims; these are honest supporting work.

### 6.6 Footer / Contact
- Big serif-italic line: "Let's build something that _stands._"
- Links (icon + label, mono): Email `mutasim2004.abs@gmail.com` · GitHub `mutasim2004abs-create` · LinkedIn `mutasim-abbas-063740410`.
- Copyright mono line. Repeat the central glow faintly is **not** allowed — footer stays flat/dark to close the page calmly.

---

## 7. Imagery & Asset Guidance

- **Portraits (files not yet in repo):** build against `/public/portrait.jpg` (side-profile → Hero) and `/public/portrait-front.jpg` (front-facing → optional About). Use `next/image` with `fill` + `object-cover`. **Clearly-marked swap point:** wrap in a component `<Portrait src="/portrait.jpg" />` with a code comment `// SWAP: drop real file at /public/portrait.jpg`.
- **Placeholder until files arrive:** a glass frame filled with `--card-2`, a centered lucide `User`/`Code2` glyph in `--accent-dim`, plus a faint `<name> // portrait pending` mono caption and the accent glow. Tasteful, on-theme, obviously intentional — never a broken-image icon, never a stock face.
- **Project screenshots:** capture VisSort from its live URL and FitMacro from the local HTML. Store at `/public/projects/vissort.png`, `/public/projects/fitmacro.png`. Until captured, use a **coding-themed placeholder tile**: dark glass with a faux terminal/pseudocode SVG overlay in `--text-muted` + accent line highlight, labeled `preview coming soon`.
- **Never** use any reference template's demo assets (no "Jack" photo, no motionsites GIFs, no higgs.ai images). All imagery is Mutasim's real work or on-theme coding placeholders.
- **Icons:** lucide-react only, `1.5px` stroke, sized `20–24px`, color `--text-body` default / `--accent` on active.

---

## 8. Component States (all five)

Every interactive element specs default / hover / active / focus / disabled.

**Primary CTA ("View Projects", "Live Demo")** — accent fill pill, `--r-full`, Jakarta 600, `--accent-ink` text:
| State | Spec |
|---|---|
| Default | `bg: --accent`, text `--accent-ink`, `box-shadow: --accent-glow` |
| Hover | `bg: --accent-bright`, `translateY(-2px)`, glow intensifies (`0 0 56px`), magnetic pull |
| Active | `bg: --accent-dim`, `translateY(0) scale(0.98)` |
| Focus | `outline: 2px solid --accent-bright; outline-offset: 3px` (visible, never removed) |
| Disabled | `bg: --card-2`, text `--text-muted`, no glow, `cursor: not-allowed`, `opacity 0.6` |

**Ghost / secondary button ("GitHub ↗", "Source")** — transparent, 1px `--border-strong`, `--text`:
| State | Spec |
|---|---|
| Default | transparent, border `--border-strong`, text `--text` |
| Hover | border `--accent`, text `--accent`, faint `bg rgba(94,210,156,0.06)` |
| Active | `scale(0.98)`, border `--accent-dim` |
| Focus | `outline: 2px solid --accent-bright; outline-offset: 3px` |
| Disabled | border `--border`, text `--text-muted`, `opacity 0.6` |

**Nav link:**
| State | Spec |
|---|---|
| Default | `--text-body`, no underline |
| Hover | `--text`, accent underline width `0→100%` (0.3s) |
| Active (current section) | `--accent`, persistent underline bar |
| Focus | `outline: 2px solid --accent-bright; outline-offset: 4px; border-radius: 4px` |
| Disabled | n/a |

**Glass card (project/skill):**
| State | Spec |
|---|---|
| Default | `.glass`, `--elev-2`, border gradient accent stops `0.55` |
| Hover | `translateY(-4px)`, border stops `0.85`, `--elev-accent` bloom |
| Active | `translateY(-1px) scale(0.995)` |
| Focus-within | outer `outline: 2px solid --accent-bright; outline-offset: 4px` |
| Disabled | n/a |

**Touch targets:** every interactive element ≥ **44×44px** hit area (pad small icon buttons).

---

## 9. Application States (loading / empty / error / success)

- **Loading (route/image):** skeleton = `--card-2` block with a subtle accent shimmer sweep (`0.06` opacity, respects reduced-motion → static block). Fonts preloaded via `@fontsource` to avoid FOUT.
- **Empty:** the site is content-driven, but design honest empty states — e.g. **FitMacro live link absent** → show only Source button + a mono note "Live deploy coming soon", never an invented URL or fake demo. **Portrait missing** → the intentional placeholder in §7. Never auto-generate fake data/screenshots to look full.
- **Error:** external link/image fails → glass card with lucide `AlertTriangle` in `--accent-dim`, mono message, and a working fallback link (e.g. repo). 404 page: dark, central glow, `404` in mono big-number, "back to start" CTA.
- **Success (form/copy-email):** if a copy-email or contact action exists, confirm with a small glass toast, lucide `Check` in `--accent`, mono "copied" — paired with the icon (not color alone).

---

## 10. Accessibility & Responsive Notes

- **Contrast:** all text meets AA; ratios printed in §1.2. Body text never below `--text-body` on any surface listed.
- **Color is never the only signal:** links underline on hover, active nav has an underline bar, tags carry labels + icons, status uses icon + text. Verified for color-blind users.
- **Focus:** visible `--accent-bright` outline on every focusable element; never `outline: none` without a replacement. Logical tab order; skip-to-content link at top.
- **Reduced motion:** full fallback in §5.7 — no scroll-jacking, no forced parallax; About text and reveals render fully lit; sticky cards degrade to flow.
- **Reduced transparency / low power:** glass degrades to near-solid (`@supports` fallback §4); film grain disabled.
- **Touch:** ≥44px targets; mobile nav overlay locks scroll; no hover-only affordances (all hover info also reachable/visible on tap or by default).
- **Semantics:** one `<h1>` (hero), section `<h2>`s, real `<nav>`/`<main>`/`<footer>`, `alt` text on every image (portrait alt describes Mutasim; project shots describe the UI). Marquee marked `aria-hidden` if purely decorative duplicate, with an accessible project list elsewhere.
- **Responsive:** mobile-first, all type via `clamp()` (§2.1), no fixed pixel heights that clip content, test 360 / 768 / 1440. Images `next/image` responsive `sizes`.
- **Performance budget:** LCP < 2.5s; hero image priority-loaded; `backdrop-filter` limited to ≤ ~6 simultaneously visible glass layers; if optional R3F hero is added, cap at **60fps target, < 40k triangles, lazy-load + `Suspense`, and a static glass/gradient fallback** for `prefers-reduced-motion` or when WebGL is unavailable. 3D must never delay LCP or bury the name/CTA.

---

## 11. 21st.dev Component Mapping (what to pull & re-skin)

Pull the *pattern*, then re-skin to these tokens (dark bg, green accent, glass recipe). Never ship a component's demo assets.

| Section | 21st.dev category | Adaptation |
|---|---|---|
| Hero background | **Animated Backgrounds** (grid / spotlight / aurora) | Grid lines + single central green/cyan glow. Kill any multicolor. |
| Hero headline | **Text animations** (blur-in / word reveal) | Blur-in on H1 (VisSort echo), accent period. |
| Nav CTA / hero CTA | **Buttons** (magnetic / gradient) | Magnetic accent pill, `--accent-glow`. |
| Marquee | **Marquees** (scroll-velocity) | Real tiles only (§6.2), edge fade. |
| About | **Text animations** (scroll word-reveal) | Wire to `useScroll` per §5.3. |
| Skills | **Cards** (bento) | Glass bento grid. |
| Projects | **Cards** (sticky stack / scroll stack) | targetScale math §5.5. |
| Optional hero 3D | **3D globe** / R3F object | Only if it holds 60fps + has fallback; must not upstage the name. |

---

## 12. Non-Negotiables (frontend must not deviate)

1. **One accent color** (`--accent #5ED29C`) system-wide. Gold `#D4AF37` appears **only inside the FitMacro card**. No other accent colors, no rainbow gradients.
2. **Single dark theme.** Do not build a light mode.
3. **Verbatim About copy** from the brief (§6.3) — no rewriting.
4. **Real links only.** VisSort live + both repos must work. **Never fabricate a FitMacro live URL** — repo + screenshot until deployed.
5. **No third-party demo assets ever** (no Jack photo, no motionsites GIFs, no higgs.ai images). Real work or on-theme coding placeholders only.
6. **Portrait swap points** stay at `/public/portrait.jpg` + `/public/portrait-front.jpg` with intentional placeholders until files land.
7. **AA contrast + visible focus + reduced-motion fallback + ≥44px targets** are mandatory, not optional.
8. **Heavy radii** (`40–60px` on hero/cards) and the **liquid-glass recipe** (§4) are the signature — keep them consistent.
9. **Self-hosted fonts** via `@fontsource` (offline-safe). Families locked: Plus Jakarta Sans, Inter, Instrument Serif, JetBrains Mono.
10. **VisSort is the flex** — give it the most visual weight in the Projects section.
```
