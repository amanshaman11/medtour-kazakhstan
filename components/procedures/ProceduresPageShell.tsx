import type { ReactNode } from "react";
import { Stethoscope } from "lucide-react";

export function ProceduresPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="pt-16 lg:pt-[4.5rem] min-h-screen kz-section-bg relative">
      <div className="absolute inset-0 grid-pattern-light opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-kz-blue/5 to-transparent pointer-events-none" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function ProceduresPageHeader({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <div className="border-b border-kz-blue/10 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 sm:py-8 lg:py-10">
        {badge && (
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-kz-blue/10 text-kz-blue-dark text-[11px] font-semibold uppercase tracking-widest border border-kz-blue/15">
            <Stethoscope className="w-3.5 h-3.5" />
            {badge}
          </span>
        )}
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-navy-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-[15px] text-muted max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
