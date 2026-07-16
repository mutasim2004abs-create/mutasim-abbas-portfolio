import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        card: "var(--card)",
        "card-2": "var(--card-2)",
        accent: "var(--accent)",
        "accent-bright": "var(--accent-bright)",
        "accent-dim": "var(--accent-dim)",
        "accent-ink": "var(--accent-ink)",
        cyan: "var(--cyan)",
        text: "var(--text)",
        "text-body": "var(--text-body)",
        "text-muted": "var(--text-muted)",
        "fitmacro-gold": "var(--fitmacro-gold)",
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        body: ['"Inter Variable"', "Inter", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "12px",
        md: "20px",
        lg: "32px",
        xl: "40px",
        "2xl": "48px",
        "3xl": "60px",
      },
      maxWidth: {
        content: "1200px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-x-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        marquee: "marquee-x 40s linear infinite",
        "marquee-reverse": "marquee-x-reverse 40s linear infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
