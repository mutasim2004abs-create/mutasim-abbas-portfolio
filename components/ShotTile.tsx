"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Terminal } from "lucide-react";

type ShotTileProps = {
  src: string;
  label: string;
  alt: string;
};

/**
 * A project screenshot tile for the marquee. Falls back to an on-theme
 * coding placeholder (faux terminal) until real screenshots are captured.
 */
export function ShotTile({ src, label, alt }: ShotTileProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="glass relative h-full w-[clamp(220px,42vw,360px)] shrink-0 overflow-hidden rounded-[40px]">
      {!failed ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="360px"
            className="object-cover"
            onError={() => setFailed(true)}
          />
          <span className="absolute bottom-4 left-5 inline-flex items-center gap-1 label-mono text-text">
            {label}
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
          </span>
        </>
      ) : (
        // SWAP: real screenshots land at /public/projects/*.png
        <div className="flex h-full w-full flex-col justify-between bg-card-2 p-5">
          <div className="flex items-start justify-between">
            <Terminal size={22} strokeWidth={1.5} className="text-accent-dim" aria-hidden />
            <span className="label-mono text-[10px] uppercase tracking-wider text-text-muted">
              preview soon
            </span>
          </div>
          <div className="space-y-1.5" aria-hidden>
            <span className="block h-1.5 w-3/5 rounded-full bg-[var(--border-strong)]" />
            <span className="block h-1.5 w-4/5 rounded-full bg-[var(--border)]" />
            <span className="block h-1.5 w-2/5 rounded-full bg-[rgba(94,210,156,0.25)]" />
          </div>
          <span className="inline-flex items-center gap-1 label-mono text-text">
            {label}
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
          </span>
        </div>
      )}
    </div>
  );
}
