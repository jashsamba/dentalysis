import { experience } from '@/data/experience'
import { SectionHeading } from '../ui/SectionHeading'

/** Section 7: job timeline, drawn as a glowing trajectory. */
export function Experience() {
  return (
    <section aria-labelledby="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-28">
      <SectionHeading id="experience" eyebrow="Experience" title="Where I've done the work" />
      <ol className="relative ml-2">
        <span aria-hidden className="absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-sun via-nebula to-transparent" />
        {experience.map((job, i) => (
          <li key={job.org} className="relative pb-14 pl-9 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-1.5 -left-[7px] h-[15px] w-[15px] rounded-full ${i === 0 ? 'bg-sun shadow-[0_0_14px_4px_rgba(251,191,36,0.55)]' : 'border-2 border-nebula bg-void'}`}
            />
            <p className="font-mono text-sm text-haze">{job.dates}</p>
            <h3 className="mt-1 text-xl font-semibold text-star">{job.role}</h3>
            <p className="text-ion/90">
              {job.org} · {job.place}
            </p>
            <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 marker:text-nebula">
              {job.points.map((pt) => (
                <li key={pt} className="leading-relaxed">
                  {pt}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
