import type { ReactNode } from 'react'

type Props = {
  kind?: 'todo' | 'confirm'
  children: ReactNode
  className?: string
}

/**
 * A clearly visible marker for content that is not final yet.
 * Search the codebase for <Placeholder / <Todo / <Confirm to find everything left to resolve.
 */
export function Placeholder({ kind = 'todo', children, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-baseline gap-2 rounded-md border border-dashed border-sun/60 bg-sun/[0.08] px-2.5 py-1 text-sm leading-snug text-sun-soft ${className}`}
    >
      <strong className="shrink-0 font-mono text-xs font-semibold text-sun">{kind === 'todo' ? 'To do' : 'To confirm'}</strong>
      <span>{children}</span>
    </span>
  )
}
