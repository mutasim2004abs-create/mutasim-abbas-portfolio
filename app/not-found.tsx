import Link from "next/link";
import { Backdrop } from "@/components/Backdrop";

export default function NotFound() {
  return (
    <>
      <Backdrop />
      <main className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="big-number text-accent">404</p>
        <h1 className="h3-sub text-text">This page never compiled.</h1>
        <p className="body-copy mx-auto">
          The route you followed doesn&rsquo;t exist — let&rsquo;s get you back
          to the start.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-6 py-3 font-display font-semibold text-accent-ink shadow-[var(--accent-glow)] transition-transform hover:-translate-y-0.5"
        >
          Back to start
        </Link>
      </main>
    </>
  );
}
