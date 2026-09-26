import type { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  download?: boolean
}

/** Link styled as a button. */
export function Button({ href, children, variant = 'ghost', download }: Props) {
  const styles =
    variant === 'primary'
      ? 'bg-sun text-void shadow-[0_0_30px_-6px_rgba(251,191,36,0.7)] hover:bg-sun-soft'
      : 'border border-white/15 bg-white/[0.03] text-star hover:border-sun/70 hover:text-sun'
  return (
    <a href={href} download={download} className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold transition ${styles}`}>
      {children}
    </a>
  )
}
