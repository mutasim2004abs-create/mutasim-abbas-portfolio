"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Copy, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LINKS } from "@/lib/content";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link below is the fallback.
    }
  }, []);

  return (
    <footer
      id="contact"
      className="relative z-10 mx-auto max-w-content px-[clamp(1.25rem,5vw,3rem)] py-[clamp(5rem,3rem+8vw,10rem)]"
    >
      <Reveal>
        <p className="eyebrow mb-6">{"// 04 — Contact"}</p>
        <h2 className="h2-section max-w-[16ch] text-text">
          Let&rsquo;s build something that{" "}
          <span className="serif-accent text-accent">stands.</span>
        </h2>
      </Reveal>

      <Reveal index={1} className="mt-12">
        <div className="glass rounded-[40px] p-[clamp(1.5rem,4vw,2.5rem)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-6">
            {/* Email with copy affordance */}
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${LINKS.email}`}
                className="group inline-flex min-h-[44px] items-center gap-3 label-mono text-text transition-colors hover:text-accent"
              >
                <Mail size={20} strokeWidth={1.5} aria-hidden />
                {LINKS.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text-muted transition-colors hover:text-accent"
              >
                {copied ? (
                  <Check size={18} strokeWidth={2} className="text-accent" />
                ) : (
                  <Copy size={18} strokeWidth={1.5} />
                )}
              </button>
            </div>

            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-3 label-mono text-text transition-colors hover:text-accent"
            >
              <Github size={20} strokeWidth={1.5} aria-hidden />
              mutasim2004abs-create
            </a>

            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-3 label-mono text-text transition-colors hover:text-accent"
            >
              <Linkedin size={20} strokeWidth={1.5} aria-hidden />
              mutasim-abbas-063740410
            </a>

            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-3 label-mono text-text transition-colors hover:text-accent"
            >
              <Instagram size={20} strokeWidth={1.5} aria-hidden />
              mutasimabbas_
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center">
        <p className="label-mono text-text-muted">
          © {new Date().getFullYear()} Mutasim Abbas
        </p>
        <p className="label-mono text-text-muted">
          Built with Next.js · TypeScript · Framer Motion
        </p>
      </div>

      {/* Copy-success toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            className="glass fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 label-mono text-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <Check size={16} strokeWidth={2} className="text-accent" aria-hidden />
            copied
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
