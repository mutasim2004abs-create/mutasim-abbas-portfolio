"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnet } from "@/components/Magnet";
import { HeroField } from "@/components/HeroField";
import { Portrait } from "@/components/Portrait";
import { LINKS } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";

const HERO_LINES = ["MUTASIM", "ABBAS"];

export function Hero() {
  const prefersReduced = useReducedMotion();

  const wordVariant = {
    hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE_OUT, delay: 0.15 + i * 0.12 },
    }),
  };

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-content flex-col justify-center px-[clamp(1.25rem,5vw,3rem)] pb-16 pt-32"
    >
      <HeroField />
      <div className="relative grid items-center gap-12 lg:grid-cols-[58%_42%]">
        {/* Text column */}
        <div>
          <motion.p
            className="eyebrow mb-6"
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            {"// Software Engineering Student"}
          </motion.p>

          <h1 className="h1-hero text-text">
            {HERO_LINES.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                custom={i}
                variants={prefersReduced ? undefined : wordVariant}
                initial={prefersReduced ? false : "hidden"}
                animate={prefersReduced ? undefined : "show"}
              >
                {line}
                {i === HERO_LINES.length - 1 && (
                  <span
                    className="text-accent"
                    style={{ textShadow: "0 0 24px rgba(94,210,156,0.5)" }}
                  >
                    .
                  </span>
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="body-copy mt-7 max-w-[52ch]"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.5 }}
          >
            Software engineering student building fast, well-tested web
            applications with React, TypeScript, and Python — focused on clean
            code and thoughtful, accessible interfaces.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.62 }}
          >
            <Magnet strength={0.3} clamp={12}>
              <Button href="#projects" variant="primary">
                View Projects
                <ArrowRight size={18} strokeWidth={2} aria-hidden />
              </Button>
            </Magnet>
            <Button href={LINKS.github} variant="ghost" external>
              <Github size={18} strokeWidth={1.75} aria-hidden />
              GitHub
            </Button>
          </motion.div>
        </div>

        {/* Portrait column */}
        <motion.div
          className="mx-auto w-full max-w-[320px] lg:max-w-none"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3 }}
        >
          <Magnet strength={0.18} clamp={16}>
            <motion.div
              whileHover={prefersReduced ? undefined : { scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <Portrait alt="Mutasim Abbas, standing by the water in a black jacket and sunglasses" />
            </motion.div>
          </Magnet>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="mt-14 flex items-center gap-2 label-mono text-text-muted"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={
          prefersReduced ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }
        }
        transition={
          prefersReduced
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
        aria-hidden
      >
        <MoveDown size={16} strokeWidth={1.5} />
        scroll
      </motion.div>
    </section>
  );
}
