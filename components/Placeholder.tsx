import type { ReactNode } from 'react'

type Props = {
  kind?: 'todo' | 'confirm'
  children: ReactNode
  /** Use on dark panels */
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * A clearly visible marker for content that is not final yet.
 * Search the codebase for <Placeholder to find everything left to resolve.
 */
export function Placeholder({ kind = 'todo', children, tone = 'light', className = '' }: Props) {
  const label = kind === 'todo' ? 'To do' : 'To confirm'
  const colors =
    tone === 'dark'
      ? 'border-amber/70 bg-amber/10 text-amber'
      : 'border-amber-deep/60 bg-amber/10 text-amber-deep'
  return (
    <span
      className={`inline-flex items-baseline gap-2 rounded-md border border-dashed px-2.5 py-1 text-sm leading-snug ${colors} ${className}`}
    >
      <strong className="shrink-0 font-mono text-xs font-semibold">{label}</strong>
      <span>{children}</span>
    </span>
  )
}
