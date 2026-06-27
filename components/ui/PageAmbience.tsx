"use client";

/** Subtle Kazakhstan-colored side glows for a dynamic, tourism-forward feel. */
export function PageAmbience() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="kz-side-glow kz-side-glow-left" />
      <div className="kz-side-glow kz-side-glow-right" />
      <div className="kz-accent-line kz-accent-line-left" />
      <div className="kz-accent-line kz-accent-line-right" />
    </div>
  );
}
