import { professionalWork } from '@/data/work'
import { FlowDiagram } from '../diagrams/FlowDiagram'
import { SectionHeading } from '../ui/SectionHeading'

// One glow colour per system, so each diagram reads as its own thing
const ACCENTS = ['#67e8f9', '#a78bfa', '#5eead4', '#fcd34d']

/** Section 3: production AI systems at Musashi, each with an architecture diagram. */
export function ProfessionalWork() {
  return (
    <section aria-labelledby="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading
        id="work"
        eyebrow="Professional AI work · Musashi Auto Parts"
        title="Production LLM systems inside a global manufacturer"
        intro="Described at the level of architecture and impact. Diagrams are generic on purpose: no internal names or data."
      />

      <ol className="space-y-8">
        {professionalWork.map((p, i) => (
          <li key={p.title} className="glass rounded-2xl p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <p className="font-mono text-sm" style={{ color: ACCENTS[i % ACCENTS.length] }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-star">{p.title}</h3>
                <div className="mt-3 max-w-3xl space-y-2">
                  {p.summary.map((s) => (
                    <p key={s} className="leading-relaxed">
                      {s}
                    </p>
                  ))}
                </div>
              </div>
              <ul className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end" aria-label="Stack">
                {p.stack.map((t) => (
                  <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-star">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-white/[0.07] pt-8">
              <FlowDiagram nodes={p.flow} accent={ACCENTS[i % ACCENTS.length]} label={`${p.title} architecture`} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
