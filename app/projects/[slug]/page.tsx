import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'
import { PageTransition } from '@/components/PageTransition'
import { Placeholder } from '@/components/Placeholder'
import { ProjectMedia } from '@/components/ProjectMedia'
import { ProjectPanel } from '@/components/ProjectPanel'
import { getNextProject, getProject, projects, themeVars } from '@/lib/projects'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  return project ? { title: project.title, description: project.oneLiner } : {}
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { default: Body } = await import(`@/content/projects/${slug}.mdx`)
  const next = getNextProject(slug)
  const index = projects.indexOf(project)

  return (
    <PageTransition>
      <main id="main" style={themeVars(project.theme)} className="pt-20">
        {/* Hero: shares view-transition names with the home page panel */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ViewTransition name={`project-bg-${project.slug}`} share="morph" default="none">
            <header className="relative overflow-hidden rounded-3xl bg-[color:var(--project-bg)] text-[color:var(--project-text)]">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-1/3 -right-1/4 h-[80%] w-[70%] rounded-full opacity-25 blur-3xl"
                style={{ background: 'radial-gradient(closest-side, var(--project-accent), transparent)' }}
              />
              <div className="relative grid items-center gap-10 px-6 py-10 sm:px-10 md:grid-cols-[1.1fr_1fr] md:px-14 md:py-16">
                <div>
                  <Link
                    href="/#projects"
                    transitionTypes={['nav-back']}
                    className="inline-flex items-center gap-2 text-sm text-[color:var(--project-muted)] transition hover:text-[color:var(--project-accent)]"
                  >
                    <span aria-hidden>←</span> All projects
                  </Link>
                  <p className="mt-6 font-mono text-sm text-[color:var(--project-muted)]">
                    {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    <span className="mx-2" aria-hidden>
                      ·
                    </span>
                    {project.kicker}
                  </p>
                  <ViewTransition name={`project-title-${project.slug}`} share="morph" default="none">
                    <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">{project.title}</h1>
                  </ViewTransition>
                  <p className="mt-5 max-w-xl text-xl leading-relaxed text-[color:var(--project-text)]/90">
                    {project.oneLiner}
                  </p>
                </div>
                <ViewTransition name={`project-media-${project.slug}`} share="morph" default="none">
                  <div>
                    <ProjectMedia project={project} size="lg" />
                  </div>
                </ViewTransition>
              </div>
            </header>
          </ViewTransition>
        </div>

        {/* Body */}
        <article className="prose-case mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
          <Body />

          <h2>Stack</h2>
          <ul className="not-prose flex list-none flex-wrap gap-2 !pl-0">
            {project.stack.map((s) => (
              <li key={s} className="!m-0 rounded-full border border-mist bg-card px-3 py-1 font-mono !text-sm">
                {s}
              </li>
            ))}
          </ul>

          <h2>Links</h2>
          {project.github.url ? (
            <p>
              <a href={project.github.url}>Source on GitHub</a>
            </p>
          ) : (
            <div className="space-y-3">
              <Placeholder>GitHub link. {project.github.note}</Placeholder>
              <br />
              <Placeholder>Demo video</Placeholder>
            </div>
          )}
        </article>

        {/* Next project: its panel morphs into its own page */}
        <nav aria-label="Next project" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div className="md:h-[70svh]">
            <ProjectPanel project={next} index={projects.indexOf(next)} total={projects.length} as="h2" eyebrow="Next project" />
          </div>
        </nav>
      </main>
    </PageTransition>
  )
}
