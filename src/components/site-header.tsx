"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const items = [
    { href: localizedPath(locale, "/"), label: dict.nav.home },
    { href: localizedPath(locale, "/about"), label: dict.nav.about },
    { href: localizedPath(locale, "/projects"), label: dict.nav.work },
    { href: localizedPath(locale, "/contact"), label: dict.nav.contact },
  ];

  return (
    <header
      className={`z-30 border-b ${
        onHome
          ? "absolute inset-x-0 top-0 border-white/10 bg-ink/15 text-paper backdrop-blur-md"
          : "relative border-line/70 bg-paper/80 text-ink backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link
          href={localizedPath(locale, "/")}
          className="font-display text-lg font-semibold tracking-tight"
        >
          {site.shortName}
        </Link>

        <nav
          aria-label="Primary"
          className={`hidden items-center gap-6 text-sm md:flex ${
            onHome ? "text-paper/75" : "text-ink-soft"
          }`}
        >
          {items.map((item) => {
            const current =
              item.href === localizedPath(locale, "/")
                ? onHome
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`underline-grow transition-colors ${
                  onHome ? "hover:text-paper" : "hover:text-ink"
                } ${current ? (onHome ? "text-paper" : "text-ink") : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} onHome={onHome} />
          <Link
            href={localizedPath(locale, "/contact")}
            className={`shrink-0 px-4 py-2 text-sm font-medium transition-colors ${
              onHome
                ? "bg-white text-[#10141c] hover:bg-[#f3f3f3]"
                : "bg-[#0d6b66] text-white hover:bg-[#094f4b]"
            }`}
          >
            {dict.nav.hireMe}
          </Link>
        </div>
      </div>

      <nav
        aria-label="Mobile"
        className={`flex gap-5 overflow-x-auto border-t px-6 py-3 text-sm md:hidden ${
          onHome
            ? "border-white/10 text-paper/75"
            : "border-line/70 text-ink-soft"
        }`}
      >
        {items.map((item) => {
          const current =
            item.href === localizedPath(locale, "/")
              ? onHome
              : pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={current ? (onHome ? "text-paper" : "text-ink") : ""}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
