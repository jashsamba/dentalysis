import type { MDXComponents } from 'mdx/types'
import { BeforeAfter } from '@/components/BeforeAfter'
import { FlowDiagram } from '@/components/FlowDiagram'
import { Placeholder } from '@/components/Placeholder'

function Figure({ src, alt, caption, width, height }: { src: string; alt: string; caption?: string; width: number; height: number }) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt} width={width} height={height} loading="lazy" className="mx-auto max-h-[640px] w-auto rounded-2xl shadow-lg" />
      {caption && <figcaption className="mt-3 text-center text-sm text-slate">{caption}</figcaption>}
    </figure>
  )
}

/** Block-level placeholder for MDX */
function Todo({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5">
      <Placeholder kind="todo">{children}</Placeholder>
    </div>
  )
}
function Confirm({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5">
      <Placeholder kind="confirm">{children}</Placeholder>
    </div>
  )
}

function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="my-6 grid gap-4 sm:grid-cols-2">
      {items.map((s) => (
        <div key={s.label} className="rounded-xl border border-mist bg-card p-4">
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-mono text-2xl font-semibold text-[color:var(--project-accent-strong)]">{s.value}</dd>
          <dd className="mt-1 text-sm text-slate">{s.label}</dd>
        </div>
      ))}
    </dl>
  )
}

const components: MDXComponents = {
  BeforeAfter,
  FlowDiagram,
  Figure,
  Todo,
  Confirm,
  Stats,
}

export function useMDXComponents(): MDXComponents {
  return components
}
