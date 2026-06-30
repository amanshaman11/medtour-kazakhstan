"use client";

import { useState, type FormEvent } from "react";
import { m } from "framer-motion";
import { Send, CheckCircle2, Phone, AlertCircle, UserCheck } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

interface ConsultationFormProps {
  procedureName: string;
  cityName: string;
  procedureId: string;
  categoryId: string;
  clinicId?: string;
  clinicName?: string;
}

export function ConsultationForm({
  procedureName,
  cityName,
  procedureId,
  categoryId,
  clinicId,
  clinicName,
}: ConsultationFormProps) {
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
          procedure: procedureName,
          city: cityName,
          procedureId,
          categoryId,
          clinicId,
          clinicName,
          message: data.get("message"),
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setError(json.error ?? t("procedures.form.error"));
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError(t("procedures.form.error"));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-kz-blue/25 bg-gradient-to-br from-kz-blue/5 to-white p-8 text-center shadow-sm"
      >
        <CheckCircle2 className="w-12 h-12 text-kz-blue mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-navy-900 mb-2">
          {t("procedures.form.successTitle")}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{t("procedures.form.successMessage")}</p>
        <a
          href="tel:1717"
          className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-kz-blue-dark hover:text-kz-blue"
        >
          <Phone className="w-4 h-4" />
          {t("callCenter.callLabel")}: 1717
        </a>
      </m.div>
    );
  }

  return (
    <div className="rounded-2xl border border-kz-blue/15 bg-white shadow-lg shadow-navy-900/5 overflow-hidden lg:sticky lg:top-24">
      <div className="bg-gradient-to-r from-navy-900 to-kz-blue-dark px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{t("procedures.form.title")}</h3>
            <p className="text-[12px] text-white/70">{t("procedures.form.coordinator")}</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        {clinicName && (
          <div className="mb-5 p-3 rounded-xl bg-kz-blue/5 border border-kz-blue/15">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-kz-blue-dark mb-1">
              {t("procedures.clinics.selected")}
            </p>
            <p className="text-sm font-bold text-navy-900">{clinicName}</p>
          </div>
        )}

        <p className="text-[13px] text-muted leading-relaxed mb-5">{t("procedures.form.subtitle")}</p>

        {error && (
          <div className="flex items-start gap-2 mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-[13px]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form id="consultation-request-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-[12px] font-semibold text-navy-800 mb-1.5 uppercase tracking-wide">
                {t("procedures.form.firstName")} *
              </label>
              <input
                id="firstName"
                name="firstName"
                required
                autoComplete="given-name"
                className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kz-blue/25 focus:border-kz-blue"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[12px] font-semibold text-navy-800 mb-1.5 uppercase tracking-wide">
                {t("procedures.form.lastName")} *
              </label>
              <input
                id="lastName"
                name="lastName"
                required
                autoComplete="family-name"
                className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kz-blue/25 focus:border-kz-blue"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-[12px] font-semibold text-navy-800 mb-1.5 uppercase tracking-wide">
              {t("procedures.form.email")} *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kz-blue/25 focus:border-kz-blue"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-[12px] font-semibold text-navy-800 mb-1.5 uppercase tracking-wide">
              {t("procedures.form.phone")} *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kz-blue/25 focus:border-kz-blue"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-[12px] font-semibold text-navy-800 mb-1.5 uppercase tracking-wide">
              {t("requestForm.messageLabel")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder={t("requestForm.messagePlaceholder")}
              className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kz-blue/25 focus:border-kz-blue resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-kz-gold text-navy-900 text-base font-bold rounded-xl border-2 border-navy-900/15 shadow-lg shadow-kz-gold/30 hover:bg-[#f5b800] hover:shadow-xl hover:shadow-kz-gold/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            {loading ? t("procedures.form.sending") : t("procedures.form.submit")}
          </button>

          <p className="text-[11px] text-center text-muted leading-relaxed">
            {t("procedures.form.privacy")}
          </p>
        </form>
      </div>
    </div>
  );
}
