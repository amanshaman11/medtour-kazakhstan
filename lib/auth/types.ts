export interface StoredAccount {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}

export interface AuthUser {
  fullName: string;
  email: string;
  phone?: string;
  provider: "email" | "google";
  picture?: string;
}

export interface GoogleProfile {
  fullName: string;
  email: string;
  picture?: string;
}

export type AuthView = "signIn" | "create" | "accountCreated" | "welcome";
