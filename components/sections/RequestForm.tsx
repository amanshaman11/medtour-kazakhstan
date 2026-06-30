"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, Phone, AlertCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

interface RequestFormProps {
  compact?: boolean;
}

export function RequestForm({ compact = false }: RequestFormProps) {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setError(json.error ?? t("requestForm.error"));
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError(t("requestForm.error"));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <CheckCircle2 className="w-10 h-10 text-kz-blue mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-white mb-1.5">{t("requestForm.successTitle")}</h3>
        <p className="text-xs text-white/70 leading-relaxed">{t("requestForm.successMessage")}</p>
        <a
          href="tel:1717"
          className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-kz-gold hover:text-[#f5b800]"
        >
          <Phone className="w-3.5 h-3.5" />
          {t("callCenter.callLabel")}: 1717
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-kz-blue/40 focus:border-kz-blue/50";
  const labelClass = "block text-[11px] font-semibold text-white/80 mb-1 uppercase tracking-wide";

  return (
    <div>
      {error && (
        <div className="flex items-start gap-2 mb-3 p-2.5 rounded-lg bg-red-500/20 border border-red-400/30 text-red-100 text-xs">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={compact ? "space-y-2.5" : "space-y-3"}>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label htmlFor="req-firstName" className={labelClass}>
              {t("requestForm.firstName")} *
            </label>
            <input
              id="req-firstName"
              name="firstName"
              required
              autoComplete="given-name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="req-lastName" className={labelClass}>
              {t("requestForm.lastName")} *
            </label>
            <input
              id="req-lastName"
              name="lastName"
              required
              autoComplete="family-name"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="req-email" className={labelClass}>
            {t("requestForm.email")} *
          </label>
          <input
            id="req-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="req-phone" className={labelClass}>
            {t("requestForm.phone")} *
          </label>
          <input
            id="req-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="req-message" className={labelClass}>
            {t("requestForm.messageLabel")}
          </label>
          <textarea
            id="req-message"
            name="message"
            rows={3}
            placeholder={t("requestForm.messagePlaceholder")}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-kz-gold text-navy-900 text-sm font-bold rounded-lg hover:bg-[#f5b800] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {loading ? t("requestForm.sending") : t("requestForm.submit")}
        </button>
      </form>
    </div>
  );
}
