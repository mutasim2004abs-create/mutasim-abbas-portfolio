"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProjectPreview } from "@/components/ProjectPreview";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
};

/** Sticky-stacking star project card (§5.5). Degrades to flow under reduced motion. */
export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const topOffset = `calc(6rem + ${index * 1.5}rem)`;

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: prefersReduced ? undefined : topOffset }}
    >
      <motion.article
        style={prefersReduced ? undefined : { scale }}
        className="glass glass-hover relative overflow-hidden rounded-[48px] p-[clamp(1.5rem,4vw,3.5rem)]"
      >
        {/* Whole-card link → project repository (buttons below sit above this). */}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the ${project.name} repository on GitHub`}
          className="absolute inset-0 z-10 rounded-[48px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        />

        {/* Header row: index + category */}
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <span
            className="big-number leading-none text-text-muted"
            style={
              project.gold ? { color: "var(--fitmacro-gold)" } : undefined
            }
          >
            {project.index}
          </span>
          <span className="label-mono text-right uppercase tracking-[0.14em] text-text-muted">
            {project.category}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="h2-section text-text">{project.name}</h3>
            <p className="body-copy mt-4">{project.pitch}</p>

            {/* Tech chips */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-[12px] border border-[var(--border)] bg-card-2 px-3 py-1 label-mono text-text-body"
                  style={
                    project.gold
                      ? {
                          borderColor: "rgba(212,175,55,0.3)",
                          color: "var(--fitmacro-gold)",
                        }
                      : undefined
                  }
                >
                  {t}
                </li>
              ))}
            </ul>

            {/* Metrics */}
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd
                    className="big-number text-[clamp(2rem,1.4rem+2vw,3rem)] leading-none text-accent"
                    style={
                      project.gold ? { color: "var(--fitmacro-gold)" } : undefined
                    }
                  >
                    {m.value}
                  </dd>
                  <span className="label-mono text-text-muted">{m.label}</span>
                </div>
              ))}
            </dl>

            {/* CTAs — raised above the whole-card link so they stay clickable */}
            <div className="relative z-20 mt-9 flex flex-wrap gap-4">
              {project.liveUrl ? (
                <Button href={project.liveUrl} variant="primary" external>
                  Live Project
                  <ArrowUpRight size={18} strokeWidth={2} aria-hidden />
                </Button>
              ) : (
                <span className="inline-flex items-center gap-2 label-mono text-text-muted">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full bg-text-muted"
                  />
                  Live deploy coming soon
                </span>
              )}
              <Button href={project.repoUrl} variant="ghost" external>
                <Github size={18} strokeWidth={1.75} aria-hidden />
                Code
              </Button>
            </div>
          </div>

          {/* Preview */}
          <ProjectPreview
            src={project.shot}
            alt={project.shotAlt}
            gold={project.gold}
          />
        </div>
      </motion.article>
    </div>
  );
}
