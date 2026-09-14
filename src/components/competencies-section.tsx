"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code2, Database, Layers, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

const icons: Record<string, LucideIcon> = {
  frontend: Layers,
  backend: Database,
  tools: Code2,
};

const accents: Record<string, string> = {
  frontend: "#0d6b66",
  backend: "#1d4e6f",
  tools: "#5b3a29",
};

type CompetencyCategory = Dictionary["competencyCategories"][number];

type CompetenciesSectionProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  categories: readonly CompetencyCategory[];
};

export function CompetenciesSection({
  eyebrow,
  title,
  subtitle,
  categories,
}: CompetenciesSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mt-24">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
        {categories.map((category, index) => {
          const Icon = icons[category.id] ?? Code2;
          const accent = accents[category.id] ?? "#0d6b66";

          return (
            <motion.article
              key={category.id}
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: index * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -8,
                      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                    }
              }
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line/70 bg-[linear-gradient(165deg,rgba(255,255,255,0.92)_0%,rgba(247,245,241,0.88)_100%)] p-7 shadow-[0_12px_32px_-22px_rgba(16,20,28,0.35)] transition-shadow duration-300 hover:border-teal/25 hover:shadow-[0_24px_48px_-24px_rgba(16,20,28,0.4)] sm:p-8"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, ${accent}, transparent 85%)`,
                }}
              />

              <div className="flex items-start justify-between gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_20px_-12px_rgba(16,20,28,0.45)]"
                  style={{
                    background: `linear-gradient(145deg, ${accent}, color-mix(in oklab, ${accent} 55%, #10141c))`,
                  }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <span className="font-display text-sm font-semibold tracking-[0.14em] text-ink/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-7 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {category.title}
              </h3>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    whileInView={
                      reduceMotion ? undefined : { opacity: 1, x: 0 }
                    }
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.1 + skillIndex * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-3 border-b border-line/70 pb-3 text-[0.95rem] leading-snug text-ink-soft last:border-b-0 last:pb-0"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: accent }}
                      aria-hidden
                    />
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
