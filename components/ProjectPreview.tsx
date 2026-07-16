"use client";

import { useState } from "react";
import Image from "next/image";
import { Terminal } from "lucide-react";

type ProjectPreviewProps = {
  src: string;
  alt: string;
  gold?: boolean;
};

/**
 * Large project screenshot with an on-theme faux-terminal fallback until the
 * real capture is dropped in (§7). Never a broken image.
 */
export function ProjectPreview({ src, alt, gold }: ProjectPreviewProps) {
  const [failed, setFailed] = useState(false);
  const accent = gold ? "text-fitmacro-gold" : "text-accent-dim";
  const bar = gold ? "rgba(212,175,55,0.3)" : "rgba(94,210,156,0.25)";

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] border border-[var(--border)] bg-bg-elevated">
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 90vw, 60vw"
          className="object-cover object-top"
          onError={() => setFailed(true)}
        />
      ) : (
        // SWAP: capture real screenshot into public/projects/*.png
        <div className="flex h-full w-full flex-col justify-between p-6 sm:p-8">
          <Terminal size={26} strokeWidth={1.5} className={accent} aria-hidden />
          <div className="space-y-2" aria-hidden>
            <span className="block h-2 w-2/3 rounded-full bg-[var(--border-strong)]" />
            <span className="block h-2 w-5/6 rounded-full bg-[var(--border)]" />
            <span
              className="block h-2 w-1/2 rounded-full"
              style={{ background: bar }}
            />
            <span className="block h-2 w-3/4 rounded-full bg-[var(--border)]" />
          </div>
          <span className="label-mono text-text-muted">preview coming soon</span>
        </div>
      )}
    </div>
  );
}
