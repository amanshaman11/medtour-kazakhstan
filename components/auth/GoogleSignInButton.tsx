"use client";

import { useState } from "react";
import { useGoogleLogin, useGoogleOAuth } from "@react-oauth/google";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { GOOGLE_CLIENT_ID } from "@/lib/constants/auth";
import type { GoogleProfile } from "@/lib/auth/types";

export type { GoogleProfile };

interface GoogleSignInButtonProps {
  mode: "signIn" | "create";
  onSuccess: (profile: GoogleProfile) => void;
  onError: () => void;
  onNotConfigured?: () => void;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.083 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.053 28.991 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.053 28.991 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.048 0-9.411-3.317-10.964-7.886l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

const buttonClassName =
  "w-full flex items-center justify-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-navy-900 bg-white border border-border rounded-xl hover:bg-surface hover:border-kz-blue/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

function GoogleSignInButtonActive({ mode, onSuccess, onError }: GoogleSignInButtonProps) {
  const { t } = useTranslation();
  const { scriptLoadedSuccessfully } = useGoogleOAuth();
  const [busy, setBusy] = useState(false);

  const login = useGoogleLogin({
    flow: "implicit",
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      setBusy(true);
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        if (!res.ok) throw new Error("userinfo failed");
        const data = (await res.json()) as { name?: string; email?: string; picture?: string };
        if (!data.email) throw new Error("no email");
        onSuccess({
          fullName: data.name ?? data.email.split("@")[0] ?? "User",
          email: data.email,
          picture: data.picture,
        });
      } catch {
        onError();
      } finally {
        setBusy(false);
      }
    },
    onError: () => onError(),
    onNonOAuthError: () => onError(),
  });

  const label = mode === "create" ? t("auth.googleSignUp") : t("auth.googleSignIn");

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={!scriptLoadedSuccessfully || busy}
      className={buttonClassName}
    >
      <GoogleIcon />
      {busy ? t("auth.loading") : scriptLoadedSuccessfully ? label : t("auth.googleLoading")}
    </button>
  );
}

export function GoogleSignInButton({
  mode,
  onSuccess,
  onError,
  onNotConfigured,
}: GoogleSignInButtonProps) {
  const { t } = useTranslation();
  const label = mode === "create" ? t("auth.googleSignUp") : t("auth.googleSignIn");

  if (!GOOGLE_CLIENT_ID) {
    return (
      <button
        type="button"
        onClick={onNotConfigured}
        className={buttonClassName}
      >
        <GoogleIcon />
        {label}
      </button>
    );
  }

  return (
    <GoogleSignInButtonActive
      mode={mode}
      onSuccess={onSuccess}
      onError={onError}
      onNotConfigured={onNotConfigured}
    />
  );
}
