import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.nav.contact,
    description: `${site.name} — ${site.email} · ${site.phone}`,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = await getDictionary(locale);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="animate-rise text-sm font-medium uppercase tracking-[0.18em] text-teal">
            {dict.contact.eyebrow}
          </p>
          <h1 className="animate-rise-delay-1 mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {dict.contact.title}
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            {dict.contact.intro}
          </p>

          <dl className="animate-rise-delay-3 mt-10 space-y-5 text-sm">
            <div>
              <dt className="text-ink-soft">{dict.common.email}</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="text-base text-ink underline-grow"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">{dict.common.phone}</dt>
              <dd className="mt-1">
                <a
                  href={site.phoneHref}
                  className="text-base text-ink underline-grow"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">{dict.common.openLinkedin}</dt>
              <dd className="mt-1">
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-ink underline-grow"
                >
                  linkedin.com/in/ali-haseni-0a1637296
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">{dict.common.openGithub}</dt>
              <dd className="mt-1">
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-ink underline-grow"
                >
                  github.com/Ali136384
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">{dict.common.languagesSpoken}</dt>
              <dd className="mt-1 text-base text-ink">
                {dict.site.languages.join(" · ")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="animate-rise-delay-2 border border-line bg-white/45 px-6 py-8 sm:px-8">
          <h2 className="font-display text-xl font-semibold text-ink">
            {dict.contact.formTitle}
          </h2>
          <p className="mt-2 text-sm text-ink-soft">{dict.contact.formHint}</p>
          <ContactForm locale={locale} dict={dict.contact} />
        </div>
      </div>
    </section>
  );
}
