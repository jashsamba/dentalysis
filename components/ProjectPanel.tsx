import Link from 'next/link'
import { ViewTransition } from 'react'
import { themeVars, type Project } from '@/lib/projects'
import { ProjectMedia } from './ProjectMedia'
import { Placeholder } from './Placeholder'

type Props = {
  project: Project
  index: number
  total: number
  /** Heading level: h3 on the home page, h2 in the "next project" teaser */
  as?: 'h2' | 'h3'
  eyebrow?: string
}

/**
 * A project's "world": its colours, title and visual. The same three view-transition names are used
 * by the case study hero, so clicking a panel morphs it into the page.
 */
export function ProjectPanel({ project, index, total, as: Heading = 'h3', eyebrow }: Props) {
  const href = `/projects/${project.slug}/`
  return (
    <ViewTransition name={`project-bg-${project.slug}`} share="morph" default="none">
      <article
        style={themeVars(project.theme)}
        className="group relative h-full overflow-hidden rounded-3xl bg-[color:var(--project-bg)] text-[color:var(--project-text)]"
      >
        {/* Soft glow in the project's accent colour */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/3 -right-1/4 h-[80%] w-[70%] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, var(--project-accent), transparent)' }}
        />

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
                  href={href}
                  transitionTypes={['nav-forward']}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none after:focus-visible:rounded-3xl after:focus-visible:outline-3 after:focus-visible:outline-[color:var(--project-accent)] after:focus-visible:-outline-offset-4"
                >
                  {project.title}
                </Link>
              </Heading>
            </ViewTransition>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[color:var(--project-text)]/90">
              {project.oneLiner}
            </p>

            {project.stats.length > 0 && (
              <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                {project.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-mono text-2xl font-semibold text-[color:var(--project-accent)]">{s.value}</dd>
                    <dd className="mt-1 text-sm leading-snug text-[color:var(--project-muted)]">{s.label}</dd>
                  </div>
                ))}
              </dl>
            )}

            {project.pending && project.pending.length > 0 && (
              <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                {project.pending.map((p) => (
                  <Placeholder key={p} tone="dark">
                    {p}
                  </Placeholder>
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
