import { dataEngineering } from '@/data/data-engineering'
import { SectionHeading } from '../ui/SectionHeading'

/** Section 4: data engineering and analytics. */
export function DataEngineering() {
  return (
    <section aria-labelledby="data" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-28">
      <SectionHeading id="data" eyebrow="Data engineering and analytics" title="The data platforms the agents stand on" />
      <dl className="grid gap-5 md:grid-cols-2">
        {dataEngineering.map((d, i) => (
          <div key={d.title} className={`glass rounded-2xl p-6 ${i === dataEngineering.length - 1 && i % 2 === 0 ? 'md:col-span-2' : ''}`}>
            <dt className="flex items-center gap-3 text-lg font-semibold text-star">
              <span aria-hidden className="h-2 w-2 rounded-full bg-ion shadow-[0_0_10px_2px_rgba(103,232,249,0.6)]" />
              {d.title}
            </dt>
            <dd className="mt-2 leading-relaxed">{d.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
