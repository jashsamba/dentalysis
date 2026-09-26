import { FlowDiagram } from '@/components/FlowDiagram'
import { HeroPipeline } from '@/components/HeroPipeline'
import { PageTransition } from '@/components/PageTransition'
import { Placeholder } from '@/components/Placeholder'
import { ProjectStack } from '@/components/ProjectStack'
import { projects } from '@/lib/projects'
import {
  certification,
  dataEngineering,
  education,
  experience,
  experiments,
  impact,
  professionalWork,
  profile,
  skills,
} from '@/lib/site'

function SectionHeading({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="font-mono text-sm text-teal">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed">{intro}</p>}
    </header>
  )
}

export default function Home() {
  return (
    <PageTransition>
      <main id="main">
        {/* 1. Hero */}
        <section aria-labelledby="hero-title" className="bg-ink pt-16 text-paper">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="font-mono text-amber">{profile.name}</p>
              <h1 id="hero-title" className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem]">
                {profile.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">{profile.subline}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#projects" className="rounded-lg bg-amber px-5 py-3 font-semibold text-ink transition hover:bg-[#ffb85c]">
                  View projects
                </a>
                {profile.resume ? (
                  <a href={profile.resume} download className="rounded-lg border border-paper/30 px-5 py-3 font-semibold transition hover:border-amber hover:text-amber">
                    Download resume
                  </a>
                ) : (
                  <Placeholder tone="dark">Resume PDF</Placeholder>
                )}
                <a href={`mailto:${profile.email}`} className="rounded-lg border border-paper/30 px-5 py-3 font-semibold transition hover:border-amber hover:text-amber">
                  Email me
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
              <HeroPipeline />
            </div>
          </div>
        </section>

        {/* 2. Impact strip */}
        <section aria-label="Impact" className="border-b border-mist bg-card">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
            {impact.map((item) => (
              <div key={item.label} className="border-l-2 border-amber pl-4">
                <dt className="sr-only">{item.label}</dt>
                <dd className="font-mono text-3xl font-semibold text-ink sm:text-4xl">{item.value}</dd>
                <dd className="mt-2 text-sm leading-snug">{item.label}</dd>
                {item.confirm && (
                  <dd className="mt-2">
                    <Placeholder kind="confirm">{item.confirm}</Placeholder>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </section>

        {/* 3. Professional AI work */}
        <section aria-labelledby="work" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <SectionHeading
            id="work"
            eyebrow="Professional AI work · Musashi Auto Parts"
            title="Production LLM systems inside a global manufacturer"
            intro="Described at the level of architecture and impact. Diagrams are generic on purpose: no internal names or data."
          />

          <ol className="divide-y divide-mist border-y border-mist">
            {professionalWork.map((p, i) => (
              <li key={p.title} className="grid gap-8 py-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
                <div>
                  <p className="font-mono text-sm text-slate">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight text-ink">{p.title}</h3>
                  {p.summary.map((s) => (
                    <p key={s} className="mt-3 leading-relaxed">
                      {s}
                    </p>
                  ))}
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
                    {p.stack.map((t) => (
                      <li key={t} className="rounded-full bg-ink/5 px-3 py-1 font-mono text-xs text-ink">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="self-center rounded-2xl bg-paper p-5 ring-1 ring-mist sm:p-6">
                  <FlowDiagram nodes={p.flow} label={`${p.title} architecture`} />
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. Data engineering and analytics */}
        <section aria-labelledby="data" className="bg-card">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <SectionHeading
              id="data"
              eyebrow="Data engineering and analytics"
              title="The data platforms the agents stand on"
            />
            <dl className="grid gap-x-12 gap-y-10 md:grid-cols-2">
              {dataEngineering.map((d) => (
                <div key={d.title} className="border-t-2 border-teal pt-4">
                  <dt className="text-lg font-semibold text-ink">{d.title}</dt>
                  <dd className="mt-2 leading-relaxed">{d.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 5. Personal projects */}
        <section aria-labelledby="projects" className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 md:pt-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              id="projects"
              eyebrow="Personal projects"
              title="Built on my own time"
              intro="Four projects, each with its own world. Scroll through them, then open one for the full case study."
            />
          </div>
          <ProjectStack projects={projects} />
        </section>

        {/* 6. Experiments */}
        <section aria-labelledby="experiments" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <SectionHeading id="experiments" eyebrow="Experiments" title="Smaller things, honestly framed" />
          <ul className="grid gap-6 md:grid-cols-2">
            {experiments.map((e) => (
              <li key={e.title} className="rounded-2xl border border-mist bg-card p-6">
                <h3 className="text-lg font-semibold text-ink">{e.title}</h3>
                <p className="mt-2 leading-relaxed">{e.body}</p>
                {e.finding && (
                  <p className="mt-4 rounded-lg bg-paper p-4 text-sm leading-relaxed">
                    <strong className="text-ink">Honest finding: </strong>
                    {e.finding}
                  </p>
                )}
                {e.confirm && (
                  <Placeholder kind="confirm" className="mt-4">
                    {e.confirm}
                  </Placeholder>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Experience timeline */}
        <section aria-labelledby="experience" className="bg-card">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <SectionHeading id="experience" eyebrow="Experience" title="Where I've done the work" />
            <ol className="relative ml-2 border-l-2 border-mist">
              {experience.map((job) => (
                <li key={job.org} className="relative pb-12 pl-8 last:pb-0">
                  <span aria-hidden className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-card bg-amber" />
                  <p className="font-mono text-sm text-slate">{job.dates}</p>
                  <h3 className="mt-1 text-xl font-semibold text-ink">{job.role}</h3>
                  <p className="text-slate">
                    {job.org} · {job.place}
                  </p>
                  <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 marker:text-teal">
                    {job.points.map((pt) => (
                      <li key={pt} className="leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8. Education, certification, skills */}
        <section aria-labelledby="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <SectionHeading id="skills" eyebrow="Education, certification and skills" title="Foundations and toolkit" />
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-ink">Education</h3>
                <ul className="mt-3 space-y-4">
                  {education.map((e) => (
                    <li key={e.school}>
                      <p className="font-medium text-ink">{e.school}</p>
                      <p className="text-sm leading-relaxed">{e.degree}</p>
                      <p className="font-mono text-xs text-slate">{e.dates}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ink">Certification</h3>
                <p className="mt-3 font-medium text-ink">{certification.org}</p>
                <p className="text-sm">{certification.name}</p>
                <p className="font-mono text-xs text-slate">{certification.date}</p>
              </div>
            </div>
            <dl className="grid gap-8 sm:grid-cols-2">
              {skills.map((g) => (
                <div key={g.group}>
                  <dt className="font-semibold text-ink">{g.group}</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <li key={s} className="rounded-md border border-mist bg-card px-2.5 py-1 text-sm">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 9. Contact */}
        <section aria-labelledby="contact" className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <p className="font-mono text-sm text-amber">Contact</p>
            <h2 id="contact" className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Building something with AI and data? Let&apos;s talk.
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-block text-2xl break-all text-amber underline decoration-amber/40 underline-offset-8 transition hover:decoration-amber sm:text-3xl"
            >
              {profile.email}
            </a>
            <ul className="mt-10 flex flex-wrap items-center gap-3">
              <li>
                <a href={profile.github} className="inline-block rounded-lg border border-paper/30 px-4 py-2 transition hover:border-amber hover:text-amber">
                  GitHub
                </a>
              </li>
              <li>
                {profile.linkedin ? (
                  <a href={profile.linkedin} className="inline-block rounded-lg border border-paper/30 px-4 py-2 transition hover:border-amber hover:text-amber">
                    LinkedIn
                  </a>
                ) : (
                  <Placeholder tone="dark">LinkedIn URL</Placeholder>
                )}
              </li>
              <li>
                {profile.upwork ? (
                  <a href={profile.upwork} className="inline-block rounded-lg border border-paper/30 px-4 py-2 transition hover:border-amber hover:text-amber">
                    Upwork
                  </a>
                ) : (
                  <Placeholder tone="dark">Upwork link (optional)</Placeholder>
                )}
              </li>
              <li>
                {profile.resume ? (
                  <a href={profile.resume} download className="inline-block rounded-lg border border-paper/30 px-4 py-2 transition hover:border-amber hover:text-amber">
                    Resume (PDF)
                  </a>
                ) : (
                  <Placeholder tone="dark">Resume PDF</Placeholder>
                )}
              </li>
            </ul>
          </div>
          <footer className="border-t border-white/10">
            <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-paper/60 sm:px-6">
              © {new Date().getFullYear()} {profile.name} · Ontario, Canada
            </p>
          </footer>
        </section>
      </main>
    </PageTransition>
  )
}
