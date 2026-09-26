import { experiments } from '@/data/experiments'
import { Placeholder } from '../ui/Placeholder'
import { SectionHeading } from '../ui/SectionHeading'

/** Section 6: smaller experiments. */
export function Experiments() {
  return (
    <section aria-labelledby="experiments" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading id="experiments" eyebrow="Experiments" title="Smaller things, honestly framed" />
      <ul className="grid gap-5 md:grid-cols-2">
        {experiments.map((e) => (
          <li key={e.title} className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-star">{e.title}</h3>
            <p className="mt-2 leading-relaxed">{e.body}</p>
            {e.finding && (
              <p className="mt-4 rounded-lg border border-nebula/25 bg-nebula/[0.07] p-4 text-sm leading-relaxed">
                <strong className="text-nebula">Honest finding: </strong>
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
  )
}
