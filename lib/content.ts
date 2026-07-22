/**
 * Single source of truth for all real content (from docs/BRIEF.md).
 * No fabricated data — every link and metric here is real.
 */

/**
 * Base path for static assets. `next/image` with `unoptimized` passes src
 * through as-is, so files in /public have to be prefixed by hand.
 *
 * Read from the environment rather than hardcoded, because the prefix differs
 * per host: GitHub Pages needs the repo name, Vercel serves from the root. The
 * value is set once in next.config.mjs so the two cannot drift apart.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const withBase = (path: string) => `${BASE_PATH}${path}`;

export const LINKS = {
  github: "https://github.com/Mutasim-Abbas",
  linkedin: "https://www.linkedin.com/in/mutasim-abbas-063740410/",
  email: "mutasim2004.abs@gmail.com",
  instagram: "https://www.instagram.com/mutasimabbas_/",
} as const;

export const NAV_ITEMS = [
  { label: "PROJECTS", href: "#projects" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
] as const;

/** About copy — clear, professional first-person bio. */
export const ABOUT_PARAGRAPHS: string[] = [
  "I'm Mutasim Abbas, a software engineering student focused on {web development} and building tools that solve real problems.",
  "I work mainly in Java, Python, and C, and I build for the web with HTML, CSS, and JavaScript — with React being what I'm learning right now. My projects include VisSort, an interactive sorting-algorithm visualizer; FitMacro, a nutrition-tracking web app; and Lumina Study, a full-stack study platform where I built the API, database and authentication myself.",
  "I care about the details that separate code that works from code that's well made: tests, accessibility, and a clean interface. Right now I'm going deeper into AI and modern web development.",
  "I speak Arabic, Turkish, and English.",
];

export type SkillGroup = {
  label: string;
  /** `level` is stated honestly — no bar charts, no implied mastery. */
  items: { name: string; glyph: string; level?: string }[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "LANGUAGES",
    items: [
      { name: "Java", glyph: "{ }", level: "intermediate" },
      { name: "Python", glyph: ">_", level: "intermediate" },
      { name: "C", glyph: "#", level: "intermediate" },
      { name: "JavaScript", glyph: "JS", level: "intermediate" },
    ],
  },
  {
    label: "WEB",
    items: [
      { name: "HTML", glyph: "</>", level: "confident" },
      { name: "CSS", glyph: "#{}", level: "confident" },
      { name: "React", glyph: "()", level: "learning" },
    ],
  },
  {
    // Left without levels on purpose — these are stated as "built with", not
    // as a claim of mastery. Set them yourself if you want a level shown.
    label: "BACKEND",
    items: [
      { name: "Node.js", glyph: "⬢" },
      { name: "Fastify", glyph: "⚡" },
      { name: "SQLite", glyph: "▤" },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { name: "VS Code", glyph: "</>" },
      { name: "Git / GitHub", glyph: "⌥" },
    ],
  },
];

export const SPOKEN_LANGUAGES = [
  { name: "Arabic", level: "native" },
  { name: "Turkish", level: "fluent" },
  { name: "English", level: "B2–C1" },
] as const;

export type Project = {
  index: string;
  name: string;
  category: string;
  pitch: string;
  tech: string[];
  metrics: { value: string; label: string }[];
  liveUrl: string | null;
  repoUrl: string;
  shot: string;
  shotAlt: string;
  gold?: boolean;
};

export const STAR_PROJECTS: Project[] = [
  {
    index: "01",
    name: "VisSort",
    category: "Solo · 3D Visualization",
    pitch:
      "A cinematic, interactive sorting-algorithm visualizer built for teaching.",
    tech: [
      "Vite",
      "React 18",
      "TypeScript (strict)",
      "Tailwind",
      "Three.js / R3F",
      "React Router",
      "Vitest",
    ],
    metrics: [
      { value: "8", label: "algorithms" },
      { value: "3", label: "views" },
      { value: "239", label: "tests" },
    ],
    liveUrl: "https://mutasim-abbas.github.io/VisSort/",
    repoUrl: "https://github.com/Mutasim-Abbas/VisSort",
    shot: withBase("/projects/vissort.png"),
    shotAlt:
      "VisSort user interface showing an interactive sorting-algorithm visualization with bar columns and controls",
  },
  {
    index: "02",
    name: "FitMacro",
    category: "Solo · Web App",
    pitch:
      "Nutrition tracker with a real macro engine (Mifflin-St Jeor), a 184-food database, local-first storage, and AI meal scanning that estimates macros from a photo.",
    tech: [
      "Vite",
      "React 18",
      "TypeScript (strict)",
      "Tailwind",
      "PWA",
      "Vitest",
      "Claude API",
    ],
    metrics: [
      { value: "184", label: "foods" },
      { value: "317", label: "tests" },
      { value: "4", label: "macros tracked" },
    ],
    liveUrl: "https://fit-macro-ten.vercel.app",
    repoUrl: "https://github.com/Mutasim-Abbas/FitMacro",
    shot: withBase("/projects/fitmacro.png"),
    shotAlt:
      "FitMacro meal-tracker interface with a dark and gold theme showing macro totals for calories, protein, carbs and fat",
    gold: true,
  },
  {
    index: "03",
    name: "Lumina Study",
    category: "Solo · Full-Stack Web App",
    pitch:
      "Turns lecture notes or an uploaded PDF into flashcards, a practice quiz, a summary and ranked highlights, then schedules every card with SM-2 spaced repetition. Backed by a real API: accounts, hashed passwords and per-user cloud sync.",
    tech: [
      "React 18",
      "TypeScript (strict)",
      "Vite",
      "Tailwind",
      "Node.js / Fastify",
      "SQLite",
      "Zod",
      "Vitest",
    ],
    metrics: [
      { value: "140", label: "tests" },
      { value: "15", label: "API endpoints" },
      { value: "SM-2", label: "review scheduler" },
    ],
    // No public demo: the app needs its Node server for accounts, sync and AI,
    // and GitHub Pages can only serve the static frontend.
    liveUrl: null,
    repoUrl: "https://github.com/Mutasim-Abbas/LuminaStudy",
    shot: withBase("/projects/luminastudy.png"),
    shotAlt:
      "Lumina Study dashboard in dark mode, showing the Due Today review queue, Recent Study Sets, and a Weekly Progress ring with reviews and study time for the week",
  },
];

export type SmallProject = {
  title: string;
  description: string;
  tag: string;
  icon: "geometry" | "gpa" | "binary";
};

export const SMALL_PROJECTS: SmallProject[] = [
  {
    title: "Line-Intersection Point Calculator",
    description:
      "Computes the intersection point of two lines from their coordinates — a geometry utility.",
    tag: "Group project",
    icon: "geometry",
  },
  {
    title: "GPA Calculator",
    description:
      "Weights course credits and grades to produce a running grade-point average.",
    tag: "Group project",
    icon: "gpa",
  },
  {
    title: "Endianness Demo + Hex→Decimal Converter",
    description:
      "Illustrates byte order and converts hexadecimal to decimal — low-level systems work.",
    tag: "Group project",
    icon: "binary",
  },
];

/** Marquee tech tiles (Row B) — no third-party demo assets, glyph + wordmark only. */
export const TECH_TILES = [
  "JavaScript",
  "TypeScript",
  "React",
  "Python",
  "Java",
  "C",
  "Git",
  "Vite",
  "Three.js",
  "Tailwind",
  "Node.js",
  "SQLite",
] as const;
