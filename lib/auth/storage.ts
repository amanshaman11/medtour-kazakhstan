import type { AuthUser, StoredAccount } from "./types";

const ACCOUNTS_KEY = "medtour-accounts";
const SESSION_KEY = "medtour-session";

export function loadAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAccount(account: StoredAccount): void {
  const accounts = loadAccounts();
  const index = accounts.findIndex(
    (a) => a.email.toLowerCase() === account.email.toLowerCase()
  );
  if (index >= 0) {
    accounts[index] = account;
  } else {
    accounts.push(account);
  }
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function findAccount(email: string): StoredAccount | undefined {
  return loadAccounts().find((a) => a.email.toLowerCase() === email.toLowerCase());
}

export function loadSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function saveSession(user: AuthUser): void {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY);
}

export function parseGoogleCredential(credential: string): Pick<AuthUser, "fullName" | "email" | "picture"> {
  const payload = credential.split(".")[1];
  const decoded = JSON.parse(
    atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
  ) as { name?: string; email?: string; picture?: string };
  return {
    fullName: decoded.name ?? decoded.email?.split("@")[0] ?? "User",
    email: decoded.email ?? "",
    picture: decoded.picture,
  };
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName;
}
