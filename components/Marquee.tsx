"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  wrap,
} from "framer-motion";
import { ShotTile } from "@/components/ShotTile";
import { TECH_TILES, withBase } from "@/lib/content";

type RowProps = {
  children: ReactNode;
  baseVelocity: number;
};

/**
 * A single marquee row (§5.4): constant auto-scroll + scroll-velocity nudge,
 * pause on hover. Content is duplicated so wrapping is seamless.
 */
function MarqueeRow({ children, baseVelocity }: RowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const hovering = useRef(false);

  // -50% wraps because content is rendered twice.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (hovering.current) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="marquee-mask flex h-full overflow-hidden"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <motion.div className="flex h-full shrink-0 gap-4 pr-4" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}

function TechChip({ name }: { name: string }) {
  const glyph = name.slice(0, 2).toUpperCase();
  return (
    <div className="glass flex h-full shrink-0 items-center gap-3 rounded-[20px] px-6">
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-[12px] bg-card-2 label-mono text-accent"
      >
        {glyph}
      </span>
      <span className="label-mono whitespace-nowrap text-text">{name}</span>
    </div>
  );
}

export function Marquee() {
  const prefersReduced = useReducedMotion();

  const shots = (
    <>
      <ShotTile
        src={withBase("/projects/vissort.png")}
        label="VisSort"
        alt="VisSort sorting-algorithm visualizer preview"
      />
      <ShotTile
        src={withBase("/projects/fitmacro.png")}
        label="FitMacro"
        alt="FitMacro meal-tracker app preview"
      />
    </>
  );

  const chips = TECH_TILES.map((t) => <TechChip key={t} name={t} />);

  return (
    <section
      aria-hidden
      className="relative z-10 flex flex-col gap-4 overflow-hidden py-10"
    >
      {prefersReduced ? (
        // Static strips under reduced motion.
        <>
          <div className="marquee-mask flex gap-4 overflow-hidden px-6 [height:clamp(84px,12vw,140px)]">
            {shots}
          </div>
          <div className="marquee-mask flex gap-4 overflow-hidden px-6 [height:clamp(84px,12vw,140px)]">
            {chips}
          </div>
        </>
      ) : (
        <>
          <div className="[height:clamp(84px,12vw,140px)]">
            <MarqueeRow baseVelocity={-2}>{shots}</MarqueeRow>
          </div>
          <div className="[height:clamp(84px,12vw,140px)]">
            <MarqueeRow baseVelocity={2}>{chips}</MarqueeRow>
          </div>
        </>
      )}
    </section>
  );
}
