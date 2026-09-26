import { certification, education } from '@/data/education'
import { skills } from '@/data/skills'
import { SectionHeading } from '../ui/SectionHeading'

/** Section 8: education, certification and grouped skills. */
export function Skills() {
  return (
    <section aria-labelledby="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-28">
      <SectionHeading id="skills" eyebrow="Education, certification and skills" title="Foundations and toolkit" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="glass space-y-8 rounded-2xl p-6 sm:p-8">
          <div>
            <h3 className="font-semibold text-star">Education</h3>
            <ul className="mt-4 space-y-5">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="font-medium text-star">{e.school}</p>
                  <p className="text-sm leading-relaxed">{e.degree}</p>
                  <p className="mt-0.5 font-mono text-xs text-haze">{e.dates}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-star">Certification</h3>
            <p className="mt-4 font-medium text-star">{certification.org}</p>
            <p className="text-sm">{certification.name}</p>
            <p className="mt-0.5 font-mono text-xs text-haze">{certification.date}</p>
          </div>
        </div>

        <dl className="glass grid gap-8 rounded-2xl p-6 sm:grid-cols-2 sm:p-8">
          {skills.map((g) => (
            <div key={g.group}>
              <dt className="font-semibold text-star">{g.group}</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-sm">
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
  )
}
