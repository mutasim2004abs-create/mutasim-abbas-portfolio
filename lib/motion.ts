import type { Variants } from "framer-motion";

/** Global easing token — cubic-bezier(0.25, 0.1, 0.25, 1). */
export const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

/** Default fade-in reveal used for every block (§5.1). */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

/** Shared viewport config: trigger once, 15% into view. */
export const viewportOnce = { once: true, margin: "-15%" } as const;

/** Spring used by magnetic elements (§5.2). */
export const magnetSpring = { stiffness: 150, damping: 15, mass: 0.1 } as const;
