"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { X, Mail, Lock, ArrowLeft, User, Phone, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { GOOGLE_CLIENT_ID } from "@/lib/constants/auth";
import { Logo } from "@/components/ui/Logo";
import { firstName } from "@/lib/auth/storage";
import type { AuthView } from "@/lib/auth/types";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kz-blue/25 focus:border-kz-blue";
const labelClass = "block text-[11px] font-semibold text-navy-800 mb-1 uppercase tracking-wide";

function AuthField({
  id,
  label,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  icon: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        {children}
      </div>
    </div>
  );
}

export function SignInModal({ open, onClose }: SignInModalProps) {
  const { t } = useTranslation();
  const { signUp, signIn, signInWithGoogleProfile } = useAuth();
  const [view, setView] = useState<AuthView>("signIn");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState("");
  const [welcomeName, setWelcomeName] = useState("");
  const isCreate = view === "create";

  useEffect(() => {
    if (!open) return;
    setView("signIn");
    setError(null);
    setPendingEmail("");
    setWelcomeName("");
    setLoading(false);
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    onClose();
  };

  const showWelcomeThenClose = (name: string) => {
    setWelcomeName(name);
    setView("welcome");
    setTimeout(() => {
      handleClose();
    }, 1800);
  };

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);

    if (isCreate) {
      const password = String(data.get("password") ?? "");
      const confirmPassword = String(data.get("confirmPassword") ?? "");
      if (password !== confirmPassword) {
        setError(t("auth.passwordMismatch"));
        return;
      }

      setLoading(true);
      const result = signUp({
        fullName: String(data.get("fullName") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? "") || undefined,
        password,
      });
      setLoading(false);

      if (!result.ok) {
        setError(t("auth.emailAlreadyRegistered"));
        return;
      }

      setPendingEmail(String(data.get("email") ?? "").trim().toLowerCase());
      setView("accountCreated");
      return;
    }

    setLoading(true);
    const result = signIn(String(data.get("email") ?? ""), String(data.get("password") ?? ""));
    setLoading(false);

    if (!result.ok) {
      setError(t("auth.invalidCredentials"));
      return;
    }

    showWelcomeThenClose(firstName(result.user.fullName));
  };

  const handleGoogleProfile = (profile: { fullName: string; email: string; picture?: string }) => {
    const { user } = signInWithGoogleProfile(profile);
    showWelcomeThenClose(firstName(user.fullName));
  };

  const headerTitle =
    view === "accountCreated"
      ? t("auth.accountCreatedTitle")
      : view === "welcome"
        ? t("auth.welcomeBack")
        : isCreate
          ? t("auth.createAccount")
          : t("auth.signIn");

  const headerSubtitle =
    view === "accountCreated"
      ? t("auth.accountCreatedMessage")
      : view === "welcome"
        ? `${t("auth.signedInAs")} ${welcomeName}`
        : isCreate
          ? t("auth.createSubtitle")
          : t("auth.signInSubtitle");

  const modal = (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-label={t("auth.close")}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-in-title"
        className="relative w-full max-w-md max-h-[min(90dvh,720px)] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="shrink-0 bg-gradient-to-r from-navy-900 to-kz-blue-dark px-5 py-4">
          <div className="mb-3">
            <Logo variant="auth" showText={false} linked={false} />
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 id="sign-in-title" className="text-base font-bold text-white">
                {headerTitle}
              </h2>
              <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{headerSubtitle}</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              aria-label={t("auth.close")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {view === "accountCreated" && (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-kz-blue mx-auto" />
              <p className="text-sm text-muted leading-relaxed">{t("auth.accountCreatedHint")}</p>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setView("signIn");
                }}
                className="w-full py-2.5 bg-kz-gold text-navy-900 text-sm font-bold rounded-xl hover:bg-[#f5b800] transition-colors"
              >
                {t("auth.signInNow")}
              </button>
            </div>
          )}

          {view === "welcome" && (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-14 h-14 text-kz-blue mx-auto" />
              <p className="text-lg font-bold text-navy-900">
                {t("auth.welcomeBack")}, {welcomeName}!
              </p>
              <p className="text-sm text-muted">{t("auth.welcomeMessage")}</p>
            </div>
          )}

          {(view === "signIn" || view === "create") && (
            <>
              <GoogleSignInButton
                mode={isCreate ? "create" : "signIn"}
                onSuccess={handleGoogleProfile}
                onError={() => setError(t("auth.googleError"))}
                onNotConfigured={() => setError(t("auth.googleNotConfigured"))}
              />

              <div className="flex items-center gap-2.5">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[11px] text-muted font-medium whitespace-nowrap">
                  {t("auth.orEmail")}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {isCreate && (
                <p className="text-xs text-muted leading-relaxed -mt-1">{t("auth.passwordHint")}</p>
              )}

              <form key={view} onSubmit={handleEmailSubmit} className="space-y-3">
                {error && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                {isCreate && (
                  <AuthField id="auth-fullName" label={t("auth.fullName")} icon={User}>
                    <input
                      id="auth-fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      className={inputClass}
                    />
                  </AuthField>
                )}

                <AuthField id="auth-email" label={t("auth.email")} icon={Mail}>
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    defaultValue={!isCreate ? pendingEmail : undefined}
                    className={inputClass}
                  />
                </AuthField>

                {isCreate && (
                  <AuthField id="auth-phone" label={t("auth.phone")} icon={Phone}>
                    <input
                      id="auth-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </AuthField>
                )}

                <AuthField
                  id="auth-password"
                  label={isCreate ? t("auth.createPassword") : t("auth.password")}
                  icon={Lock}
                >
                  <input
                    id="auth-password"
                    name="password"
                    type="password"
                    required
                    minLength={isCreate ? 8 : undefined}
                    autoComplete={isCreate ? "new-password" : "current-password"}
                    className={inputClass}
                  />
                </AuthField>

                {isCreate && (
                  <AuthField id="auth-confirmPassword" label={t("auth.confirmPassword")} icon={Lock}>
                    <input
                      id="auth-confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className={inputClass}
                    />
                  </AuthField>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-kz-gold text-navy-900 text-sm font-bold rounded-xl hover:bg-[#f5b800] transition-colors disabled:opacity-60 mt-1"
                >
                  {loading
                    ? t("auth.loading")
                    : isCreate
                      ? t("auth.createAccount")
                      : t("auth.signIn")}
                </button>
              </form>

              <p className="text-center text-xs text-muted pt-1">
                {isCreate ? t("auth.toggleToSignIn") : t("auth.toggleToCreate")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setView(isCreate ? "signIn" : "create");
                  }}
                  className="font-semibold text-kz-blue-dark hover:text-kz-blue"
                >
                  {isCreate ? t("auth.signIn") : t("auth.createAccount")}
                </button>
              </p>
            </>
          )}

          {view !== "welcome" && (
            <Link
              href="/"
              onClick={handleClose}
              className="flex items-center justify-center gap-1.5 text-xs text-muted hover:text-navy-900 transition-colors pb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t("auth.backToHome")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  if (GOOGLE_CLIENT_ID) {
    return <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{modal}</GoogleOAuthProvider>;
  }

  return modal;
}
