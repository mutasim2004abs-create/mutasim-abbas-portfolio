"use client";

import { useState } from "react";
import Image from "next/image";
import { Code2 } from "lucide-react";
import { withBase } from "@/lib/content";

type PortraitProps = {
  /** Real files at /public/portrait.jpg (side) + /public/portrait-front.jpg (front). */
  sources?: string[];
  alt: string;
  caption?: string;
};

/**
 * Portrait frame with a smooth CSS crossfade between the real photos: the first
 * photo is the always-on base; each additional photo fades in and out over it on
 * an 8s loop (see `.portrait-fade` in globals.css). Any image that fails to load
 * is dropped from the rotation; if none remain, an on-theme placeholder shows —
 * never a broken-image icon. The global reduced-motion rule pauses the fade.
 */
export function Portrait({
  sources = [withBase("/portrait.jpg"), withBase("/portrait-front.jpg")],
  alt,
  caption = "mutasim // portrait pending",
}: PortraitProps) {
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const available = sources.filter((s) => !failed[s]);

  return (
    <div className="glass glass--glow relative aspect-[4/5] w-full overflow-hidden rounded-[48px]">
      {available.length > 0 ? (
        available.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? alt : ""}
            aria-hidden={i !== 0}
            fill
            sizes="(max-width: 1024px) 320px, 42vw"
            className={
              "object-cover object-[center_25%]" +
              (i > 0 ? " portrait-fade" : "")
            }
            priority
            onError={() => setFailed((f) => ({ ...f, [src]: true }))}
          />
        ))
      ) : (
        // Intentional placeholder — glass frame, accent glyph, mono caption.
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-card-2">
          <Code2
            size={64}
            strokeWidth={1.25}
            className="text-accent-dim"
            aria-hidden
          />
          <p className="label-mono text-text-muted">{caption}</p>
        </div>
      )}
    </div>
  );
}
