"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser, GoogleProfile } from "@/lib/auth/types";
import {
  clearSession,
  findAccount,
  firstName,
  loadSession,
  parseGoogleCredential,
  saveAccount,
  saveSession,
} from "@/lib/auth/storage";

interface AuthContextValue {
  user: AuthUser | null;
  isReady: boolean;
  signUp: (input: {
    fullName: string;
    email: string;
    phone?: string;
    password: string;
  }) => { ok: true } | { ok: false; error: "emailExists" };
  signIn: (email: string, password: string) => { ok: true; user: AuthUser } | { ok: false; error: "invalid" };
  signInWithGoogle: (credential: string) => { ok: true; user: AuthUser };
  signInWithGoogleProfile: (profile: GoogleProfile) => { ok: true; user: AuthUser };
  signOut: () => void;
  displayName: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(loadSession());
    setIsReady(true);
  }, []);

  const signUp = useCallback(
    (input: { fullName: string; email: string; phone?: string; password: string }) => {
      const email = input.email.trim().toLowerCase();
      if (findAccount(email)) {
        return { ok: false as const, error: "emailExists" as const };
      }
      saveAccount({
        fullName: input.fullName.trim(),
        email,
        phone: input.phone?.trim() || undefined,
        password: input.password,
      });
      return { ok: true as const };
    },
    []
  );

  const signIn = useCallback((email: string, password: string) => {
    const account = findAccount(email.trim());
    if (!account || account.password !== password) {
      return { ok: false as const, error: "invalid" as const };
    }
    const sessionUser: AuthUser = {
      fullName: account.fullName,
      email: account.email,
      phone: account.phone,
      provider: "email",
    };
    saveSession(sessionUser);
    setUser(sessionUser);
    return { ok: true as const, user: sessionUser };
  }, []);

  const signInWithGoogleProfile = useCallback((profile: GoogleProfile) => {
    const sessionUser: AuthUser = {
      fullName: profile.fullName,
      email: profile.email,
      provider: "google",
      picture: profile.picture,
    };
    saveSession(sessionUser);
    setUser(sessionUser);
    return { ok: true as const, user: sessionUser };
  }, []);

  const signInWithGoogle = useCallback((credential: string) => {
    const profile = parseGoogleCredential(credential);
    return signInWithGoogleProfile(profile);
  }, [signInWithGoogleProfile]);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const displayName = user ? firstName(user.fullName) : null;

  return (
    <AuthContext.Provider
      value={{ user, isReady, signUp, signIn, signInWithGoogle, signInWithGoogleProfile, signOut, displayName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
