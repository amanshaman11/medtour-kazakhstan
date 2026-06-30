"use client";

import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Static wrapper — no scroll-affecting enter animations. */
export function AnimatedSection({
  children,
  className = "",
}: AnimatedSectionProps) {
  return <div className={className}>{children}</div>;
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  centered?: boolean;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  dark = false,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 lg:mb-12 ${centered ? "text-center" : ""}`}>
      {badge && (
        <span
          className={`inline-block mb-3.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase ${
            dark
              ? "bg-white/10 text-white/75 border border-white/10"
              : "bg-navy-50 text-navy-700 border border-navy-100"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-[2.125rem] font-bold tracking-tight leading-[1.15] ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3.5 text-[15px] sm:text-base leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${dark ? "text-white/60" : "text-muted"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
