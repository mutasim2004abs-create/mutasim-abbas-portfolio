"use client";

import { Spline, Calculator, Binary, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SMALL_PROJECTS, type SmallProject } from "@/lib/content";

const ICONS: Record<SmallProject["icon"], LucideIcon> = {
  geometry: Spline,
  gpa: Calculator,
  binary: Binary,
};

export function SmallProjects() {
  return (
    <div className="mt-16">
      <Reveal className="mb-6">
        <p className="label-mono uppercase tracking-[0.16em] text-text-muted">
          Also built — coursework &amp; group projects
        </p>
      </Reveal>
      <ul className="grid gap-4 md:grid-cols-3">
        {SMALL_PROJECTS.map((p, i) => {
          const Icon = ICONS[p.icon];
          return (
            <Reveal as="li" index={i} key={p.title}>
              <div className="glass glass-hover h-full rounded-[32px] p-6 transition-transform duration-350 ease-out-soft hover:-translate-y-1">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 place-items-center rounded-full bg-card-2 text-accent"
                  >
                    <Icon size={19} strokeWidth={1.5} />
                  </span>
                  <span className="rounded-full border border-[var(--border)] px-2.5 py-1 label-mono text-text-muted">
                    {p.tag}
                  </span>
                </div>
                <h4 className="font-mono text-[0.95rem] font-medium leading-snug text-text">
                  {p.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {p.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
