import type { FlowNode } from '@/lib/site'

type Props = {
  nodes: FlowNode[]
  /** 'panel' uses the current project's CSS variables (dark); 'light' is for the paper background */
  tone?: 'panel' | 'light'
  direction?: 'vertical' | 'horizontal'
  label: string
}

/**
 * Generic boxes-and-arrows architecture diagram. Deliberately free of internal names or data.
 */
export function FlowDiagram({ nodes, tone = 'light', direction = 'horizontal', label }: Props) {
  const vertical = direction === 'vertical'
  const boxClass =
    tone === 'panel'
      ? 'border-[color:var(--project-accent)]/30 bg-[color:var(--project-surface)] text-[color:var(--project-text)]'
      : 'border-mist bg-card text-ink'
  const noteClass = tone === 'panel' ? 'text-[color:var(--project-muted)]' : 'text-slate'
  const lineColor = tone === 'panel' ? 'var(--project-accent)' : 'var(--color-teal)'

  return (
    <ol
      aria-label={label}
      className={
        vertical
          ? 'flex flex-col items-stretch'
          : 'flex flex-col items-stretch gap-0 sm:flex-row sm:flex-wrap sm:items-center'
      }
    >
      {nodes.map((n, i) => (
        <li key={n.label} className={vertical ? 'flex flex-col items-center' : 'flex flex-col items-center sm:flex-row'}>
          <div className={`w-full rounded-lg border px-3.5 py-2 text-center ${vertical ? 'max-w-72' : 'sm:w-auto'} ${boxClass}`}>
            <span className="block font-mono text-[0.8rem] leading-tight font-medium">{n.label}</span>
            {n.note && <span className={`mt-0.5 block text-xs leading-snug ${noteClass}`}>{n.note}</span>}
          </div>
          {i < nodes.length - 1 && (
            <span
              aria-hidden
              className={`flow-connector relative block shrink-0 ${vertical ? 'h-7 w-px' : 'h-5 w-px sm:h-px sm:w-6'}`}
              style={{ ['--line' as string]: lineColor }}
            />
          )}
        </li>
      ))}
    </ol>
  )
}
