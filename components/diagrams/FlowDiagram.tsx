import type { FlowNode } from '@/data/types'

type Props = {
  nodes: FlowNode[]
  label: string
  /** Glow colour for step numbers and connectors (any CSS colour or var) */
  accent?: string
  /**
   * 'auto': one straight row on large screens, a vertical column below that.
   * 'vertical': always a column (used inside project panels).
   */
  layout?: 'auto' | 'vertical'
}

/** Generic architecture diagram: numbered steps joined by glowing connectors. No internal names or data. */
export function FlowDiagram({ nodes, label, accent = 'var(--color-ion)', layout = 'auto' }: Props) {
  const row = layout === 'auto'

  return (
    <ol
      aria-label={label}
      className={`flex flex-col items-stretch ${row ? 'lg:flex-row lg:items-center' : ''}`}
      style={{ ['--flow-accent' as string]: accent }}
    >
      {nodes.map((n, i) => (
        <li key={n.label} className={`flex flex-col items-center ${row ? 'lg:min-w-0 lg:flex-1 lg:flex-row' : ''}`}>
          <div
            className="relative w-full rounded-xl px-4 py-3 text-center backdrop-blur-sm"
            style={{
              background: 'linear-gradient(180deg, rgb(255 255 255 / 0.07), rgb(255 255 255 / 0.02))',
              border: '1px solid color-mix(in srgb, var(--flow-accent) 30%, transparent)',
              boxShadow: '0 0 24px -12px var(--flow-accent)',
            }}
          >
            <span
              className="mx-auto mb-1.5 flex h-6 w-6 items-center justify-center rounded-full font-mono text-[11px] font-semibold"
              style={{
                color: 'var(--flow-accent)',
                background: 'color-mix(in srgb, var(--flow-accent) 16%, transparent)',
                boxShadow: '0 0 10px -2px var(--flow-accent)',
              }}
            >
              {i + 1}
            </span>
            <span className="block text-sm leading-snug font-medium text-star">{n.label}</span>
            {n.note && <span className="mt-0.5 block text-xs leading-snug text-haze">{n.note}</span>}
          </div>

          {i < nodes.length - 1 && (
            <span aria-hidden className={`flow-link block h-7 w-0.5 shrink-0 rounded-full ${row ? 'flow-auto lg:h-0.5 lg:w-8' : ''}`} />
          )}
        </li>
      ))}
    </ol>
  )
}
