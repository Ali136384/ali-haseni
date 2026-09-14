import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/lib/paths";
import { site } from "@/lib/site";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  return (
    <footer className="relative z-10 mt-auto border-t border-line/70 bg-paper/50">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight text-ink">
            {site.name}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            {dict.site.role} · {dict.site.level} · {site.yearsExperience}+{" "}
            {locale === "tr" ? "yıl" : "years"}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            {dict.site.footerBlurb}
          </p>
          <div className="mt-5 space-y-1 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="block text-teal underline-grow"
            >
              {site.email}
            </a>
            <a href={site.phoneHref} className="block text-teal underline-grow">
              {site.phone}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-ink-soft sm:items-end">
          <p className="text-ink">{dict.site.languages.join(" · ")}</p>
          <div className="mt-2 flex flex-wrap gap-5 sm:justify-end">
            <Link
              href={site.social.github}
              className="underline-grow hover:text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.common.openGithub}
            </Link>
            <Link
              href={site.social.linkedin}
              className="underline-grow hover:text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.common.openLinkedin}
            </Link>
            <Link
              href={localizedPath(locale, "/about")}
              className="underline-grow hover:text-ink"
            >
              {dict.common.experience}
            </Link>
            <Link
              href={localizedPath(locale, "/contact")}
              className="underline-grow hover:text-ink"
            >
              {dict.common.contact}
            </Link>
          </div>
          <p className="mt-6 text-xs text-ink/45">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
