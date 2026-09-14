import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPath } from "@/lib/paths";
import { projectMeta, site } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = await getDictionary(locale);

  const featured = projectMeta.slice(0, 3).map((meta) => ({
    ...meta,
    ...dict.projects[meta.slug],
  }));

  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <div
          aria-hidden
          className="animate-drift absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_12%,rgba(26,155,148,0.5)_0%,transparent_40%),radial-gradient(ellipse_at_8%_90%,rgba(12,18,34,0.4)_0%,transparent_48%),linear-gradient(128deg,#0d6b66_0%,#17343c_42%,#10141c_100%)]"
        />
        <div
          aria-hidden
          className="animate-veil absolute inset-0 -z-10 opacity-25 mix-blend-overlay [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:52px_52px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 via-ink/35 to-transparent"
        />

        <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl items-end px-6 pb-16 pt-36 sm:px-8 sm:pb-20 lg:items-center lg:pb-24">
          <div className="max-w-2xl text-white">
            <p className="animate-rise text-xs font-medium uppercase tracking-[0.22em] text-white/70">
              {dict.home.eyebrow}
            </p>
            <p className="animate-rise mt-5 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
              {site.name}
            </p>
            <div className="hero-rule mt-6 h-px w-24 bg-white/80" />
            <h1 className="animate-rise-delay-1 mt-8 font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
              {dict.home.headline}
            </h1>
            <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {dict.site.tagline}
            </p>
            <div className="animate-rise-delay-3 mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={localizedPath(locale, "/projects")}
                className="inline-flex items-center justify-center bg-white px-6 py-3 text-sm font-medium text-[#10141c] transition-colors hover:bg-[#f3f3f3]"
              >
                {dict.home.ctaWork}
              </Link>
              <Link
                href={localizedPath(locale, "/contact")}
                className="inline-flex items-center justify-center border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/80 hover:bg-white/10"
              >
                {dict.home.ctaContact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-line/80 bg-paper/55">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 sm:px-8 md:grid-cols-3 md:gap-10 md:py-16">
          {dict.services.map((service, index) => (
            <div key={service.title} className="min-w-0">
              <p className="text-xs tracking-[0.18em] text-teal uppercase">
                0{index + 1}
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
                {service.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {service.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal">
              {dict.common.selectedWork}
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {dict.home.workTitle}
            </h2>
          </div>
          <Link
            href={localizedPath(locale, "/projects")}
            className="text-sm text-teal underline-grow"
          >
            {dict.common.seeAllWork}
          </Link>
        </div>

        <ul className="mt-14 space-y-8">
          {featured.map((project, index) => (
            <li key={project.slug}>
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid overflow-hidden border border-line bg-white/35 transition-colors hover:border-teal/35 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              >
                <div
                  className="project-panel relative min-h-[220px] lg:min-h-[280px]"
                  style={{
                    background: `linear-gradient(145deg, ${project.accent} 0%, #10141c 78%)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
                  <p className="absolute left-5 top-5 font-display text-4xl font-bold text-paper/25">
                    0{index + 1}
                  </p>
                </div>
                <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-ink-soft">
                    <span>{project.year}</span>
                    <span aria-hidden>·</span>
                    <span>{project.client}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-teal sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
                    {project.summary}
                  </p>
                  <p className="mt-5 text-sm text-ink/50">
                    {project.stack.join(" · ")}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-ink text-paper">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-20">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-paper/55">
              {dict.common.nextStep}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {dict.home.ctaTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/70 sm:text-base">
              {dict.home.ctaNotePrefix} · {dict.site.languages.join(" · ")} ·{" "}
              {site.phone}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={localizedPath(locale, "/contact")}
              className="bg-white px-6 py-3 text-sm font-medium text-[#10141c] transition-colors hover:bg-[#f3f3f3]"
            >
              {dict.common.contact}
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/70"
            >
              {dict.common.emailDirectly}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
