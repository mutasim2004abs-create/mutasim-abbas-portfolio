"use client";

import { Languages, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { SKILL_GROUPS, SPOKEN_LANGUAGES } from "@/lib/content";

function Chip({ glyph, name }: { glyph: string; name: string }) {
  return (
    <span className="inline-flex min-h-[36px] items-center gap-2 rounded-[12px] border border-[var(--border)] bg-card-2 px-3 py-1.5 label-mono text-text">
      <span aria-hidden className="text-accent">
        {glyph}
      </span>
      {name}
    </span>
  );
}

function GroupCard({
  label,
  children,
  index,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <Reveal index={index} className={className}>
      <div className="glass glass-hover h-full rounded-[40px] p-7 transition-transform duration-350 ease-out-soft hover:-translate-y-1">
        <p className="label-mono mb-5 uppercase tracking-[0.16em] text-accent">
          {label}
        </p>
        {children}
      </div>
    </Reveal>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 mx-auto max-w-content px-[clamp(1.25rem,5vw,3rem)] py-[clamp(5rem,3rem+8vw,10rem)]"
    >
      <SectionHeading eyebrow="// 02 — What I Do" title="Tools of the {craft}." />

      <div className="grid gap-4 md:grid-cols-2">
        {SKILL_GROUPS.map((group, i) => (
          <GroupCard key={group.label} label={group.label} index={i}>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <Chip key={item.name} glyph={item.glyph} name={item.name} />
              ))}
            </div>
          </GroupCard>
        ))}

        {/* Spoken languages */}
        <GroupCard label="SPOKEN" index={SKILL_GROUPS.length}>
          <div className="flex flex-wrap gap-2.5">
            {SPOKEN_LANGUAGES.map((lang) => (
              <span
                key={lang.name}
                className="inline-flex min-h-[36px] items-center gap-2 rounded-[12px] border border-[var(--border)] bg-card-2 px-3 py-1.5 label-mono text-text"
              >
                <Languages
                  size={15}
                  strokeWidth={1.5}
                  className="text-accent"
                  aria-hidden
                />
                {lang.name}
                <span className="text-text-muted">· {lang.level}</span>
              </span>
            ))}
          </div>
        </GroupCard>
      </div>

      {/* Discipline strip — personality, not a skill bar */}
      <Reveal index={1} className="mt-4">
        <div className="glass flex flex-col items-start gap-3 rounded-[40px] p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="grid h-11 w-11 place-items-center rounded-full bg-card-2 text-accent"
            >
              <Wrench size={20} strokeWidth={1.5} />
            </span>
            <div>
              <p className="label-mono uppercase tracking-[0.16em] text-accent">
                Discipline
              </p>
              <p className="h3-sub text-text">Boxing · 2 years</p>
            </div>
          </div>
          <p className="body-copy max-w-[38ch] text-text-body">
            The focus and consistency I built through training are the same ones
            I bring to writing and shipping code.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
