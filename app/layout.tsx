import type { Metadata, Viewport } from "next";

// Self-hosted fonts via @fontsource (offline-safe, no CDN, no layout shift).
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import "./globals.css";

const SITE_URL = "https://mutasim2004abs-create.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mutasim Abbas — Software Engineer",
  description:
    "Portfolio of Mutasim Abbas, a software engineering student. Builder of VisSort and FitMacro — precise, disciplined, cinematic engineering.",
  keywords: [
    "Mutasim Abbas",
    "software engineer",
    "software engineering student",
    "portfolio",
    "React",
    "TypeScript",
    "VisSort",
    "FitMacro",
  ],
  authors: [{ name: "Mutasim Abbas" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Mutasim Abbas — Software Engineer",
    description:
      "Builder of VisSort and FitMacro. A software engineer's terminal, lit from within.",
    siteName: "Mutasim Abbas",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutasim Abbas — Software Engineer",
    description:
      "Builder of VisSort and FitMacro. A software engineer's terminal, lit from within.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070b0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
