"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { NAV_ITEMS, LINKS } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";

const SECTION_IDS = NAV_ITEMS.map((n) => n.href.replace("#", ""));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const prefersReduced = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Elevate/opacity nav after scrolling past 40px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view for the active underline.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape + trap focus inside the overlay while open; restore
  // focus to the hamburger on close.
  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus({ preventScroll: true });
      return;
    }
    const focusables = () =>
      Array.from(
        overlayRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        ) ?? []
      );
    // Move focus into the dialog.
    focusables()[0]?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      const current = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (current === first || !overlayRef.current?.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-[clamp(1rem,5vw,2rem)] pt-4">
      <nav
        aria-label="Primary"
        className={`glass flex w-full max-w-content items-center justify-between rounded-full px-4 py-2.5 transition-colors duration-300 sm:px-6 ${
          scrolled ? "bg-[rgba(10,16,14,0.85)]" : ""
        }`}
      >
        {/* Monogram */}
        <Link
          href="#top"
          className="flex items-center gap-1 rounded px-1 font-display text-lg font-extrabold tracking-tight text-text"
          aria-label="Mutasim Abbas — home"
        >
          MA<span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-active={isActive}
                  className={`nav-underline label-mono uppercase tracking-[0.1em] transition-colors duration-250 ${
                    isActive
                      ? "text-accent"
                      : "text-text-body hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-[40px] items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-4 py-2 label-mono uppercase tracking-[0.1em] text-text transition-colors duration-250 hover:border-accent hover:text-accent md:inline-flex"
        >
          <Github size={16} strokeWidth={1.5} aria-hidden />
          GitHub
        </a>

        {/* Mobile hamburger */}
        <button
          ref={triggerRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text transition-colors hover:text-accent md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            ref={overlayRef}
            className="fixed inset-0 z-[60] flex flex-col bg-[rgba(7,11,10,0.98)] backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.3, ease: EASE_OUT }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-[clamp(1rem,5vw,2rem)] pt-6">
              <span className="font-display text-lg font-extrabold text-text">
                MA<span className="text-accent">.</span>
              </span>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text transition-colors hover:text-accent"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center gap-2 px-[clamp(1.5rem,8vw,3rem)]"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display font-bold uppercase leading-none tracking-tight text-text transition-colors hover:text-accent"
                  style={{ fontSize: "clamp(2rem, 10vw, 3rem)" }}
                  initial={prefersReduced ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: prefersReduced ? 0 : 0.1 + i * 0.07,
                    ease: EASE_OUT,
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-6 px-[clamp(1.5rem,8vw,3rem)] pb-10">
              <a
                href={`mailto:${LINKS.email}`}
                aria-label="Email Mutasim"
                className="inline-flex h-11 w-11 items-center justify-center text-text-body transition-colors hover:text-accent"
              >
                <Mail size={22} strokeWidth={1.5} />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center text-text-body transition-colors hover:text-accent"
              >
                <Linkedin size={22} strokeWidth={1.5} />
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center text-text-body transition-colors hover:text-accent"
              >
                <Github size={22} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
