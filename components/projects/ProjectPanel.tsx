import Link from 'next/link'
import { ViewTransition } from 'react'
import type { Project } from '@/data/projects'
import { themeVars } from '@/lib/theme'
import { Placeholder } from '../ui/Placeholder'
import { Planet } from './Planet'
import { ProjectMedia } from './ProjectMedia'

type Props = {
  project: Project
  index: number
  total: number
  /** Heading level: h3 on the home page, h2 in the "next project" teaser */
  as?: 'h2' | 'h3'
  eyebrow?: string
}

/**
 * A project's "world": its colours, planet, title and visual. The case study hero uses the same
 * view-transition names, so clicking a panel morphs it into the page.
 */
export function ProjectPanel({ project, index, total, as: Heading = 'h3', eyebrow }: Props) {
  return (
    <ViewTransition name={`project-bg-${project.slug}`} share="morph" default="none">
      <article
        style={themeVars(project.theme)}
        className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--project-bg)] text-[color:var(--project-text)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
      >
        <PanelBackdrop project={project} />

        <div className="relative grid h-full items-center gap-10 px-6 py-10 sm:px-10 md:grid-cols-[1.1fr_1fr] md:gap-12 md:px-14 md:py-12">
          <div>
            <p className="font-mono text-sm text-[color:var(--project-muted)]">
              {eyebrow ?? `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
              <span className="mx-2" aria-hidden>
                ·
              </span>
              {project.kicker}
            </p>

            <ViewTransition name={`project-title-${project.slug}`} share="morph" default="none">
              <Heading className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                <Link
                  href={`/projects/${project.slug}/`}
                  transitionTypes={['nav-forward']}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none after:focus-visible:rounded-3xl after:focus-visible:outline-3 after:focus-visible:outline-[color:var(--project-accent)] after:focus-visible:-outline-offset-4"
                >
                  {project.title}
                </Link>
              </Heading>
            </ViewTransition>

            <p className="mt-4 max-w-xl text-lg leading-relaxed opacity-90">{project.oneLiner}</p>

            {project.stats.length > 0 && (
              <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                {project.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd
                      className="font-mono text-2xl font-semibold text-[color:var(--project-accent)]"
                      style={{ textShadow: '0 0 18px color-mix(in srgb, var(--project-accent) 45%, transparent)' }}
                    >
                      {s.value}
                    </dd>
                    <dd className="mt-1 text-sm leading-snug text-[color:var(--project-muted)]">{s.label}</dd>
                  </div>
                ))}
              </dl>
            )}

            {project.pending && project.pending.length > 0 && (
              <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                {project.pending.map((p) => (
                  <Placeholder key={p}>{p}</Placeholder>
                ))}
              </div>
            )}

            <p className="mt-8 inline-flex items-center gap-2 font-medium text-[color:var(--project-accent)]">
              Read the case study
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </p>
          </div>

          <ViewTransition name={`project-media-${project.slug}`} share="morph" default="none">
            <div className="transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]">
              <ProjectMedia project={project} />
            </div>
          </ViewTransition>
        </div>
      </article>
    </ViewTransition>
  )
}

/** Nebula glow + planet behind the panel content. Shared with the case study hero. */
export function PanelBackdrop({ project }: { project: Project }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 85% 10%, color-mix(in srgb, var(--project-accent) 22%, transparent), transparent 70%), radial-gradient(ellipse 50% 60% at 0% 100%, color-mix(in srgb, var(--planet-dark) 45%, transparent), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 12% 22%, #fff 50%, transparent), radial-gradient(1px 1px at 38% 78%, #fff 50%, transparent), radial-gradient(1.5px 1.5px at 62% 14%, #fff 50%, transparent), radial-gradient(1px 1px at 78% 62%, #fff 50%, transparent), radial-gradient(1px 1px at 90% 88%, #fff 50%, transparent), radial-gradient(1.5px 1.5px at 24% 58%, #fff 50%, transparent), radial-gradient(1px 1px at 52% 40%, #fff 50%, transparent), radial-gradient(1px 1px at 6% 90%, #fff 50%, transparent)',
        }}
      />
      <Planet
        ring={project.theme.ring}
        className="-top-16 -right-16 h-48 w-48 opacity-90 sm:h-56 sm:w-56 md:-top-20 md:-right-20 md:h-72 md:w-72"
      />
    </>
  )
}
