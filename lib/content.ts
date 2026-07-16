/**
 * Single source of truth for all real content (from docs/BRIEF.md).
 * No fabricated data — every link and metric here is real.
 */

/**
 * GitHub Pages project-site base path (must match basePath in next.config.mjs).
 * next/image with `unoptimized` passes src through as-is, so static assets in
 * /public must be prefixed manually.
 */
export const BASE_PATH = "/mutasim-abbas-portfolio";
export const withBase = (path: string) => `${BASE_PATH}${path}`;

export const LINKS = {
  github: "https://github.com/mutasim2004abs-create",
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
  "I work across the stack with React, TypeScript, Python, Java, and C. My recent projects include VisSort — an interactive sorting-algorithm visualizer — and FitMacro, a nutrition-tracking web app, both designed and built solo.",
  "I care about the details that separate code that works from code that's well made: tests, accessibility, and a clean interface. Right now I'm going deeper into AI and modern web development.",
  "Outside of coding, two years of boxing taught me discipline and consistency, and I speak Arabic, Turkish, and English.",
];

export type SkillGroup = {
  label: string;
  items: { name: string; glyph: string }[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "LANGUAGES",
    items: [
      { name: "Java", glyph: "{ }" },
      { name: "Python", glyph: ">_" },
      { name: "C", glyph: "#" },
      { name: "JavaScript / TypeScript", glyph: "TS" },
    ],
  },
  {
    label: "WEB",
    items: [
      { name: "React", glyph: "()" },
      { name: "HTML", glyph: "</>" },
      { name: "CSS", glyph: "#{}" },
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
    liveUrl: "https://mutasim2004abs-create.github.io/VisSort/",
    repoUrl: "https://github.com/mutasim2004abs-create/VisSort",
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
    // Live link intentionally omitted until the Vercel deploy is up. Never fabricate a URL.
    liveUrl: null,
    repoUrl: "https://github.com/mutasim2004abs-create/FitMacro",
    shot: withBase("/projects/fitmacro.png"),
    shotAlt:
      "FitMacro meal-tracker interface with a dark and gold theme showing macro totals for calories, protein, carbs and fat",
    gold: true,
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
] as const;
