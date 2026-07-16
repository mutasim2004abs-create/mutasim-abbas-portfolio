"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ABOUT_PARAGRAPHS, withBase } from "@/lib/content";

type WordToken = { text: string; serif: boolean; accent: boolean };

/** Tokenize the verbatim copy into words, flagging {…} serif accents. */
function buildParagraphs(paragraphs: string[]): WordToken[][] {
  return paragraphs.map((para, pIndex) => {
    const isLast = pIndex === paragraphs.length - 1;
    const segments = para.split(/(\{[^}]+\})/g).filter(Boolean);
    const tokens: WordToken[] = [];
    for (const seg of segments) {
      const serif = seg.startsWith("{");
      const clean = serif ? seg.slice(1, -1) : seg;
      for (const w of clean.split(/\s+/).filter(Boolean)) {
        tokens.push({ text: w, serif, accent: serif && isLast });
      }
    }
    return tokens;
  });
}

function Word({
  token,
  progress,
  start,
  end,
}: {
  token: WordToken;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const cls = [
    "inline-block",
    token.serif ? "serif-accent" : "",
    token.accent ? "text-accent" : "text-text",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <motion.span style={{ opacity }} className={cls}>
      {token.text}
      {" "}
    </motion.span>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const paragraphs = buildParagraphs(ABOUT_PARAGRAPHS);
  const total = paragraphs.reduce((n, p) => n + p.length, 0);
  // Running start index for each paragraph (precomputed, no render mutation).
  const offsets: number[] = [];
  paragraphs.reduce((acc, p) => {
    offsets.push(acc);
    return acc + p.length;
  }, 0);

  return (
    <section
      id="about"
      className="relative z-10 mx-auto max-w-content px-[clamp(1.25rem,5vw,3rem)] py-[clamp(5rem,3rem+8vw,10rem)]"
    >
      <p className="eyebrow mb-8">{"// 01 — About"}</p>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start lg:gap-16">
        {/* Portrait (front-facing) */}
        <div className="glass overflow-hidden rounded-[40px] lg:sticky lg:top-28">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={withBase("/portrait-front.jpg")}
              alt="Mutasim Abbas"
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Text */}
        <div ref={ref} className="max-w-[46ch]">
        {paragraphs.map((tokens, pIndex) => (
          <p
            key={pIndex}
            className="body-large mb-8 last:mb-0"
            aria-label={ABOUT_PARAGRAPHS[pIndex].replace(/[{}]/g, "")}
          >
            {tokens.map((token, wIndex) => {
              const i = offsets[pIndex] + wIndex;
              const start = i / total;
              const end = start + 1 / total;
              return (
                <span key={wIndex} aria-hidden>
                  {prefersReduced ? (
                    <span
                      className={[
                        "inline-block",
                        token.serif ? "serif-accent" : "",
                        token.accent ? "text-accent" : "text-text",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {token.text}
                      {" "}
                    </span>
                  ) : (
                    <Word
                      token={token}
                      progress={scrollYProgress}
                      start={start}
                      end={end}
                    />
                  )}
                </span>
              );
            })}
          </p>
        ))}
        </div>
      </div>
    </section>
  );
}
