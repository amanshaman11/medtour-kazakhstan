"use client";

import { m, AnimatePresence } from "framer-motion";
import { Headset, Send, Phone } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { conciergeScenarios } from "@/lib/data/concierge";
import type { ConciergeScenario } from "@/lib/data/types";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

interface ResponseLine {
  text: string;
  bold?: boolean;
  spacer?: boolean;
}

function useResponseLines(scenario: ConciergeScenario): ResponseLine[] {
  const { t, ta } = useTranslation();
  return useMemo(() => {
    const base = `concierge.scenarios.${scenario.id}`;
    const lines: ResponseLine[] = [];
    lines.push({ text: t(`${base}.title`), bold: true });
    lines.push({ text: "", spacer: true });
    lines.push({ text: t("concierge.recommendedClinics"), bold: true });
    ta(`${base}.clinics`).forEach((c) => lines.push({ text: `• ${c}` }));

    if (scenario.response.priceRange) {
      lines.push({ text: "", spacer: true });
      lines.push({ text: t(`${base}.priceRange`) });
    }
    if (scenario.response.packages) {
      lines.push({ text: "", spacer: true });
      lines.push({ text: t("concierge.packageSuggestions"), bold: true });
      ta(`${base}.packages`).forEach((p) => lines.push({ text: `• ${p}` }));
    }
    if (scenario.response.hotels) {
      lines.push({ text: "", spacer: true });
      lines.push({ text: t("concierge.hotelRecommendations"), bold: true });
      ta(`${base}.hotels`).forEach((h) => lines.push({ text: `• ${h}` }));
    }
    lines.push({ text: "", spacer: true });
    lines.push({ text: t(`${base}.interpreter`) });
    lines.push({ text: t(`${base}.contact`) });
    return lines;
  }, [scenario, t, ta]);
}

function ConciergeChat({ scenario }: { scenario: ConciergeScenario }) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<"typing" | "response">("typing");
  const [visibleLines, setVisibleLines] = useState(0);
  const responseLines = useResponseLines(scenario);

  useEffect(() => {
    const responseTimer = setTimeout(() => {
      setPhase("response");
      setVisibleLines(1);
    }, 1400);
    return () => clearTimeout(responseTimer);
  }, [scenario.id]);

  useEffect(() => {
    if (phase !== "response" || visibleLines >= responseLines.length) return;
    const timer = setTimeout(
      () => setVisibleLines((v) => v + 1),
      visibleLines <= 1 ? 0 : 120
    );
    return () => clearTimeout(timer);
  }, [phase, visibleLines, responseLines.length]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="max-w-[80%] px-4 py-3 rounded-xl rounded-tr-sm bg-navy-700 text-white text-[14px]">
          {t(`concierge.scenarios.${scenario.id}.patientMessage`)}
        </div>
      </div>

      {phase === "typing" && (
        <div className="flex justify-start">
          <div className="px-4 py-3 rounded-xl rounded-tl-sm bg-white/5 border border-white/8">
            <div className="flex gap-1">
              {[0, 1, 2].map((d) => (
                <m.span
                  key={d}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                  className="w-1.5 h-1.5 rounded-full bg-white/40"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {phase === "response" && (
        <div className="flex justify-start">
          <div className="max-w-[90%] px-5 py-4 rounded-xl rounded-tl-sm bg-white/5 border border-white/8 text-[14px] text-white/80 leading-relaxed space-y-1">
            {responseLines.slice(0, visibleLines).map((line, i) =>
              line.spacer ? (
                <br key={i} />
              ) : line.bold ? (
                <p key={i} className="font-semibold text-white">
                  {line.text}
                </p>
              ) : (
                <p key={i}>{line.text}</p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function MedicalConcierge() {
  const { t } = useTranslation();
  const [activeScenario, setActiveScenario] = useState(0);
  const scenario = conciergeScenarios[activeScenario];

  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveScenario((s) => (s + 1) % conciergeScenarios.length);
    }, 14000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <section id="concierge" className="py-14 lg:py-20 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("concierge.badge")}
            title={t("concierge.title")}
            subtitle={t("concierge.subtitle")}
            dark
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="space-y-4">
              {conciergeScenarios.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveScenario(i)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    activeScenario === i
                      ? "bg-white/8 border-white/15"
                      : "bg-transparent border-white/8 hover:border-white/12"
                  }`}
                >
                  <p className="text-[13px] text-white/55 mb-1">
                    {t("concierge.patientInquiry")}
                  </p>
                  <p className="text-[15px] text-white font-medium">
                    &ldquo;{t(`concierge.scenarios.${s.id}.patientMessage`)}&rdquo;
                  </p>
                </button>
              ))}

              <div className="p-5 rounded-xl bg-white/5 border border-white/8">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-4 h-4 text-navy-400" />
                  <span className="text-sm text-white/60">
                    {t("concierge.unifiedCenter")}
                  </span>
                </div>
                <p className="text-3xl font-bold text-white tracking-tight">1717</p>
                <p className="text-[13px] text-white/55 mt-1">
                  {t("concierge.available5")}
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <div className="rounded-xl border border-white/10 bg-navy-900/60 backdrop-blur overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-white/3">
                <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center">
                  <Headset className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {t("concierge.name")}
                  </p>
                  <p className="text-[12px] text-white/55">
                    {t("concierge.team")}
                  </p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 text-[12px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {t("concierge.online")}
                </span>
              </div>

              <div className="p-5 min-h-[380px]">
                <AnimatePresence mode="wait">
                  <m.div
                    key={scenario.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ConciergeChat scenario={scenario} />
                  </m.div>
                </AnimatePresence>
              </div>

              <div className="px-5 py-4 border-t border-white/8 flex gap-3">
                <input
                  type="text"
                  readOnly
                  aria-label={t("concierge.placeholder")}
                  placeholder={t("concierge.placeholder")}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-sm text-white placeholder:text-white/30 focus:outline-none"
                />
                <button
                  type="button"
                  aria-label={t("concierge.send")}
                  className="w-10 h-10 rounded-lg bg-navy-600 flex items-center justify-center hover:bg-navy-500 transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
