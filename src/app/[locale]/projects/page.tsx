import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { projectMeta } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.nav.work,
    description: dict.work.intro,
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = await getDictionary(locale);

  const projects = projectMeta.map((meta) => ({
    ...meta,
    ...dict.projects[meta.slug],
  }));

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <p className="animate-rise text-sm font-medium uppercase tracking-[0.18em] text-teal">
        {dict.work.eyebrow}
      </p>
      <h1 className="animate-rise-delay-1 mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl">
        {dict.work.title}
      </h1>
      <p className="animate-rise-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
        {dict.work.intro}
      </p>

      <ul className="animate-rise-delay-3 mt-16 space-y-10">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <article className="group grid overflow-hidden border border-line bg-white/40 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <div
                className="project-panel relative min-h-[240px] lg:min-h-[320px]"
                style={{
                  background: `linear-gradient(150deg, ${project.accent} 0%, #10141c 80%)`,
                }}
              >
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
                <p className="absolute left-6 top-6 font-display text-5xl font-bold text-paper/20">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-paper/55">
                    {project.client}
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold text-paper">
                    {project.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between px-6 py-8 sm:px-8 sm:py-10">
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-ink-soft">
                    <span>{project.year}</span>
                    <span aria-hidden>·</span>
                    <span>{project.outcome}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                    {project.summary}
                  </p>
                  <p className="mt-6 text-sm text-ink/50">
                    {project.stack.join(" · ")}
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-teal-deep"
                  >
                    {project.linkLabel}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-14 max-w-2xl border-t border-line pt-8 text-base leading-relaxed text-ink-soft sm:text-lg">
        {dict.work.moreNote}
      </p>
    </section>
  );
}
