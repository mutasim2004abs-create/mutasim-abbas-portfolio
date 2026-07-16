"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { reveal, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Stagger index — delays by index * 0.08s. */
  index?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
};

/** Default fade-in reveal wrapper (§5.1). Renders final state under reduced motion. */
export function Reveal({ children, index = 0, className, as = "div" }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const Comp = motion[as];

  if (prefersReduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      custom={index}
    >
      {children}
    </Comp>
  );
}
