import type { Locale } from "@/i18n/config";

export function localizedPath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}
