"use client";

import Link from "next/link";
import { Menu, X, Calendar, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Logo } from "@/components/ui/Logo";
import { SignInModal } from "@/components/auth/SignInModal";
import { homeHref } from "@/lib/utils/routes";
import { firstName } from "@/lib/auth/storage";

const ctaClassName =
  "inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3.5 sm:px-4 text-[13px] sm:text-[14px] font-bold whitespace-nowrap rounded-lg bg-kz-gold text-navy-900 border-2 border-navy-900/15 shadow-lg shadow-kz-gold/30 hover:bg-[#f5b800] transition-colors shrink-0";

const signInClassName =
  "inline-flex items-center justify-center h-10 sm:h-11 px-3 sm:px-3.5 text-[13px] sm:text-[14px] font-semibold whitespace-nowrap rounded-lg text-navy-900 border border-border hover:border-kz-blue/30 hover:bg-kz-blue/5 transition-colors shrink-0";

const accountClassName =
  "inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 pl-2 pr-2.5 sm:pl-2.5 sm:pr-3 text-[13px] sm:text-[14px] font-semibold whitespace-nowrap rounded-lg text-navy-900 border border-kz-blue/20 bg-kz-blue/5 hover:bg-kz-blue/10 transition-colors shrink-0 max-w-[9rem] sm:max-w-[11rem]";

function UserAvatar({ name, picture }: { name: string; picture?: string }) {
  const initial = firstName(name).charAt(0).toUpperCase();
  if (picture) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={picture} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
    );
  }
  return (
    <span className="w-7 h-7 rounded-full bg-kz-blue text-white text-xs font-bold flex items-center justify-center shrink-0">
      {initial}
    </span>
  );
}

export function Navbar() {
  const { t } = useTranslation();
  const { user, isReady, signOut, displayName } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t("nav.why"), href: homeHref("#why-kazakhstan") },
    { label: t("nav.platform"), href: homeHref("#platform") },
    { label: t("nav.procedures"), href: homeHref("#procedures") },
    { label: t("nav.clinics"), href: homeHref("#search") },
    { label: t("nav.packages"), href: homeHref("#packages") },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[100] bg-white border-b border-kz-blue/15 shadow-md">
        <nav className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 h-16 lg:h-[4.5rem]">
          <div className="flex h-full items-center justify-between gap-2 sm:gap-3 min-w-0">
            <Logo variant="nav" className="max-w-[40%] sm:max-w-none" />

            <div className="hidden xl:flex flex-1 items-center justify-center gap-x-3 2xl:gap-x-4 min-w-0 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center h-10 px-1.5 text-[13px] xl:text-[14px] font-medium whitespace-nowrap text-muted hover:text-kz-blue-dark transition-colors shrink-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Link href="/procedures" className={ctaClassName} aria-label={t("nav.bookAppointment")}>
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{t("nav.bookAppointment")}</span>
              </Link>

              {isReady && user ? (
                <div ref={accountRef} className="relative hidden sm:block">
                  <button
                    type="button"
                    onClick={() => setAccountOpen((o) => !o)}
                    className={accountClassName}
                    aria-expanded={accountOpen}
                    aria-label={t("auth.myAccount")}
                  >
                    <UserAvatar name={user.fullName} picture={user.picture} />
                    <span className="truncate">{displayName}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted shrink-0" />
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-56 rounded-xl border border-border bg-white shadow-xl py-1 z-50">
                      <div className="px-3 py-2.5 border-b border-border">
                        <p className="text-xs text-muted">{t("auth.signedInAs")}</p>
                        <p className="text-sm font-semibold text-navy-900 truncate">{user.fullName}</p>
                        <p className="text-xs text-muted truncate">{user.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          signOut();
                          setAccountOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-navy-800 hover:bg-surface transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-muted" />
                        {t("auth.signOut")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSignInOpen(true)}
                  className={`hidden sm:inline-flex ${signInClassName}`}
                >
                  {t("nav.signIn")}
                </button>
              )}

              <div className="flex items-center h-10 sm:h-11">
                <LanguageSelector />
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-navy-900 shrink-0"
                aria-label={t("nav.menu")}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {mobileOpen && (
          <div className="xl:hidden bg-white border-b border-border shadow-lg overflow-hidden">
            <div className="px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm text-navy-800 border-b border-border last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              {isReady && user ? (
                <>
                  <div className="py-3 border-b border-border">
                    <p className="text-xs text-muted">{t("auth.signedInAs")}</p>
                    <p className="text-sm font-semibold text-navy-900">{user.fullName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="py-3 text-sm text-navy-800 text-left font-semibold flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("auth.signOut")}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setSignInOpen(true);
                  }}
                  className="py-3 text-sm text-navy-800 border-b border-border text-left font-semibold"
                >
                  {t("nav.signIn")}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}
