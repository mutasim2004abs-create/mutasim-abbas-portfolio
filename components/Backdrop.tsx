/**
 * Global chrome: faint vertical grid lines, a single central glow, and film grain.
 * One light source only (§6 global chrome). Purely decorative — aria-hidden.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="hero-glow" />
      <div className="grid-lines" />
      <div className="film-grain" />
    </div>
  );
}
