"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  className?: string;
};

export function LanguageSwitcher({
  locale,
  className = "",
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  const switchPath = (next: Locale) => {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  };

  return (
    <div
      className={`inline-flex h-9 items-center rounded-full border border-line bg-white/70 p-1 ${className}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            href={switchPath(item)}
            hrefLang={item}
            className={`inline-flex h-full items-center justify-center rounded-full px-3 text-xs font-semibold tracking-wide transition-colors ${
              active
                ? "bg-[#0d6b66] text-white"
                : "text-ink-soft hover:bg-ink/5 hover:text-ink"
            }`}
            aria-current={active ? "true" : undefined}
          >
            {localeLabels[item]}
          </Link>
        );
      })}
    </div>
  );
}
