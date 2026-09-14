import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

function getPreferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .find(Boolean);

  if (!preferred) return defaultLocale;
  if (preferred.startsWith("tr")) return "tr";
  if (preferred.startsWith("en")) return "en";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
