import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const dict = await getDictionary(locale);

  return {
    title: {
      default: dict.meta.titleDefault,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.titleDefault,
      description: dict.meta.description,
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
    alternates: {
      languages: {
        en: "/en",
        tr: "/tr",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${manrope.variable} h-full`}
    >
      <body className="relative flex min-h-full flex-col antialiased">
        <SiteHeader locale={locale} dict={dict} />
        <main className="relative z-10 flex-1">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
