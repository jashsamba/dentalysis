import { impact } from '@/data/impact'
import { Placeholder } from '../ui/Placeholder'

/** Section 2: four headline numbers. */
export function Impact() {
  return (
    <section aria-label="Impact" className="mx-auto max-w-6xl px-4 sm:px-6">
      <dl className="glass grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl px-6 py-8 sm:px-8 lg:grid-cols-4">
        {impact.map((item) => (
          <div key={item.label} className="relative pl-4">
            <span aria-hidden className="absolute top-1 bottom-1 left-0 w-0.5 rounded-full bg-gradient-to-b from-sun to-nebula" />
            <dt className="sr-only">{item.label}</dt>
            <dd className="font-mono text-3xl font-semibold text-star [text-shadow:0_0_24px_rgba(251,191,36,0.35)] sm:text-4xl">
              {item.value}
            </dd>
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
  )
}
