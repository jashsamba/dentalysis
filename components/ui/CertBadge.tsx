import { certification } from '@/data/education'

type Props = {
  /** 'sm' is the compact header version */
  size?: 'sm' | 'md'
  className?: string
}

/** "Certified" badge shown next to your name. Hover shows the full certificate name. */
export function CertBadge({ size = 'md', className = '' }: Props) {
  const full = `${certification.org} ${certification.name} (${certification.short}), ${certification.date}`
  const small = size === 'sm'

  return (
    <span
      title={full}
      className={`inline-flex items-center gap-1.5 rounded-full border border-sun/40 bg-gradient-to-r from-sun/15 to-nebula/15 font-medium text-sun-soft shadow-[0_0_18px_-6px_rgba(251,191,36,0.6)] ${
        small ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } ${className}`}
    >
      {/* seal with a tick */}
      <svg aria-hidden viewBox="0 0 20 20" className={small ? 'h-3.5 w-3.5' : 'h-4 w-4'}>
        <path
          fill="currentColor"
          d="M10 1.5l2.1 1.6 2.6-.2.9 2.5 2.3 1.2-.6 2.6 1.2 2.3-1.9 1.8-.3 2.6-2.6.4-1.6 2.1-2.4-1-2.4 1-1.6-2.1-2.6-.4-.3-2.6-1.9-1.8 1.2-2.3-.6-2.6 2.3-1.2.9-2.5 2.6.2z"
          opacity="0.9"
        />
        <path d="M6.6 10.2l2.2 2.2 4.6-4.6" fill="none" stroke="#04050d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {small ? (
        <span>{certification.short} certified</span>
      ) : (
        <span>
          Certified in Cognitive Project Management in AI <span className="whitespace-nowrap text-haze">({certification.org}-{certification.short})</span>
        </span>
      )}
      <span className="sr-only">: {full}</span>
    </span>
  )
}
