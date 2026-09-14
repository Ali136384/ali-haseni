"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  onHome?: boolean;
};

export function LanguageSwitcher({
  locale,
  onHome = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  const switchPath = (next: Locale) => {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  };

  return (
    <div
      className={`flex items-center gap-1 text-xs font-medium tracking-wide ${
        onHome ? "text-paper/70" : "text-ink-soft"
      }`}
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
            className={`px-2 py-1 transition-colors ${
              active
                ? onHome
                  ? "bg-white text-[#10141c]"
                  : "bg-[#10141c] text-white"
                : onHome
                  ? "text-white/75 hover:text-white"
                  : "hover:text-[#10141c]"
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
