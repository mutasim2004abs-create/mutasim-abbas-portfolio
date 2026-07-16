"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { magnetSpring } from "@/lib/motion";

type MagnetProps = {
  children: ReactNode;
  /** Pull strength toward the cursor (0–1). */
  strength?: number;
  /** Max translation in px so the element never detaches from layout. */
  clamp?: number;
  className?: string;
};

/**
 * Magnetic wrapper (§5.2): translates toward the pointer with a spring,
 * springs back on leave. Disabled under prefers-reduced-motion.
 */
export function Magnet({
  children,
  strength = 0.25,
  clamp = 18,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, magnetSpring);
  const springY = useSpring(y, magnetSpring);

  const clampVal = (v: number) => Math.max(-clamp, Math.min(clamp, v));

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(clampVal(dx));
    y.set(clampVal(dy));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
