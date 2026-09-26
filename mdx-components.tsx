import type { MDXComponents } from 'mdx/types'
import { FlowDiagram } from '@/components/diagrams/FlowDiagram'
import { BeforeAfter } from '@/components/projects/BeforeAfter'
import { Placeholder } from '@/components/ui/Placeholder'

// Components you can use inside content/projects/*.mdx

function Figure({ src, alt, caption, width, height }: { src: string; alt: string; caption?: string; width: number; height: number }) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="mx-auto max-h-[640px] w-auto rounded-2xl border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]"
      />
      {caption && <figcaption className="mt-3 text-center text-sm text-haze">{caption}</figcaption>}
    </figure>
  )
}

/** <Todo>…</Todo>: visible placeholder for missing content */
function Todo({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5">
      <Placeholder kind="todo">{children}</Placeholder>
    </div>
  )
}

/** <Confirm>…</Confirm>: visible placeholder for something to double-check */
function Confirm({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5">
      <Placeholder kind="confirm">{children}</Placeholder>
    </div>
  )
}

/** <Stats items={[{ value, label }]} />: big glowing numbers */
function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="my-6 grid gap-4 sm:grid-cols-2">
      {items.map((s) => (
        <div key={s.label} className="glass rounded-xl p-4">
          <dt className="sr-only">{s.label}</dt>
          <dd
            className="font-mono text-2xl font-semibold text-[color:var(--project-accent)]"
            style={{ textShadow: '0 0 18px color-mix(in srgb, var(--project-accent) 40%, transparent)' }}
          >
            {s.value}
          </dd>
          <dd className="mt-1 text-sm text-haze">{s.label}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Flow diagram in a case study, glowing in the project's accent colour */
function CaseFlow(props: React.ComponentProps<typeof FlowDiagram>) {
  return (
    <div className="glass my-6 rounded-2xl p-5">
      <FlowDiagram accent="var(--project-accent)" {...props} />
    </div>
  )
}

const components: MDXComponents = {
  BeforeAfter,
  FlowDiagram: CaseFlow,
  Figure,
  Todo,
  Confirm,
  Stats,
}

export function useMDXComponents(): MDXComponents {
  return components
}
