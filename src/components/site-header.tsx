"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/lib/paths";
import { site } from "@/lib/site";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const items = [
    { href: localizedPath(locale, "/"), label: dict.nav.home },
    { href: localizedPath(locale, "/about"), label: dict.nav.about },
    { href: localizedPath(locale, "/projects"), label: dict.nav.work },
    { href: localizedPath(locale, "/contact"), label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line/70 bg-[#f7f5f1]/95 text-ink backdrop-blur-md transition-shadow duration-300 ${
        scrolled || menuOpen
          ? "shadow-[0_8px_24px_-18px_rgba(16,20,28,0.45)]"
          : ""
      }`}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4 sm:px-8">
        <Link
          href={localizedPath(locale, "/")}
          className="col-start-1 justify-self-start font-display text-lg font-semibold tracking-tight text-ink"
        >
          {site.shortName}
        </Link>

        <nav
          aria-label="Primary"
          className="col-start-2 hidden items-center justify-center gap-8 text-sm md:flex"
        >
          {items.map((item) => {
            const current =
              item.href === localizedPath(locale, "/")
                ? onHome
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`group relative py-1 font-medium transition-colors ${
                  current
                    ? "text-[#0d6b66]"
                    : "text-ink-soft hover:text-[#0d6b66]"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-[#0d6b66] transition-transform duration-300 ${
                    current
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="col-start-3 hidden items-center justify-self-end gap-3 md:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href={localizedPath(locale, "/contact")}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[#0d6b66] px-5 text-sm font-medium text-white transition-colors hover:bg-[#094f4b]"
          >
            {dict.nav.hireMe}
          </Link>
        </div>

        <button
          type="button"
          className="col-start-3 justify-self-end rounded-md p-2 text-ink hover:bg-ink/5 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-line/70 bg-[#f7f5f1] md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4 sm:px-8"
          >
            {items.map((item) => {
              const current =
                item.href === localizedPath(locale, "/")
                  ? onHome
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    current
                      ? "bg-[#0d6b66]/10 text-[#0d6b66]"
                      : "text-ink-soft hover:bg-ink/5 hover:text-[#0d6b66]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-3 flex flex-col items-stretch gap-3 border-t border-line/70 pt-4">
              <LanguageSwitcher locale={locale} className="self-start" />
              <Link
                href={localizedPath(locale, "/contact")}
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#0d6b66] px-4 text-sm font-medium text-white transition-colors hover:bg-[#094f4b]"
              >
                {dict.nav.hireMe}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
