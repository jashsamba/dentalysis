import Link from 'next/link'
import { profile } from '@/data/profile'
import { CertBadge } from '../ui/CertBadge'

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
]

/** Top bar. Its view-transition name keeps it still while pages slide underneath. */
export function SiteHeader() {
  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-void/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" transitionTypes={['nav-back']} className="flex items-center gap-2.5 font-semibold tracking-tight text-star">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-sun shadow-[0_0_12px_3px_rgba(251,191,36,0.6)]" />
            {profile.name}
          </Link>
          <span className="hidden md:block">
            <CertBadge size="sm" />
          </span>
        </div>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm sm:gap-2">
            {nav.map((item) => (
              <li key={item.href} className={item.label === 'Experience' ? 'hidden sm:block' : ''}>
                <Link href={item.href} className="rounded-md px-2 py-1.5 text-dust transition-colors hover:text-sun sm:px-3">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
