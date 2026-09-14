import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  educationMeta,
  experienceMeta,
  site,
} from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.nav.about,
    description: dict.about.summary,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <section>
        <p className="animate-rise text-sm font-medium uppercase tracking-[0.18em] text-teal">
          {dict.about.eyebrow}
        </p>
        <h1 className="animate-rise-delay-1 mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {dict.about.intro}
        </h1>
        <p className="animate-rise-delay-2 mt-6 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {dict.about.summary}
        </p>
        <div className="animate-rise-delay-3 mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
          {dict.about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            {dict.common.experience}
          </h2>
          <ul className="mt-8 space-y-10">
            {experienceMeta.map((job) => {
              const content = dict.experience[job.id];
              return (
                <li key={job.id} className="border-t border-line pt-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {content.role}
                    </h3>
                    <p className="text-sm text-ink-soft">{job.period[locale]}</p>
                  </div>
                  <p className="mt-1 text-sm text-teal">
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-grow"
                    >
                      {job.company}
                    </a>
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
                    {content.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="space-y-12 lg:border-l lg:border-line lg:pl-10">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              {dict.common.competencies}
            </h2>
            <ul className="mt-5 space-y-3">
              {dict.competencies.map((skill) => (
                <li
                  key={skill}
                  className="border-b border-line/80 pb-3 text-sm text-ink-soft last:border-b-0"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              {dict.common.education}
            </h2>
            <ul className="mt-5 space-y-6">
              {educationMeta.map((item) => (
                <li key={item.id}>
                  <p className="font-medium text-ink">
                    {dict.education[item.id]}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {item.school[locale]}
                  </p>
                  <p className="mt-1 text-sm text-teal">{item.period[locale]}</p>
                  <p className="mt-1 text-xs text-ink/50">
                    {dict.about.instructionNote}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 text-sm text-ink-soft">
            <p className="font-display text-xl font-semibold text-ink">
              {dict.common.details}
            </p>
            <p>
              {dict.common.languagesSpoken}: {dict.site.languages.join(", ")}
            </p>
            <a href={`mailto:${site.email}`} className="block text-teal">
              {site.email}
            </a>
            <a href={site.phoneHref} className="block text-teal">
              {site.phone}
            </a>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal underline-grow"
              >
                {dict.common.openGithub}
              </Link>
              <Link
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal underline-grow"
              >
                {dict.common.openLinkedin}
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
