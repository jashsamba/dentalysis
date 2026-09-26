import Link from 'next/link'
import { profile } from '@/lib/site'

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 text-paper backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" transitionTypes={['nav-back']} className="font-semibold tracking-tight">
          {profile.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm sm:gap-2">
            {nav.map((item) => (
              <li key={item.href} className={item.label === 'Experience' ? 'hidden sm:block' : ''}>
                <Link
                  href={item.href}
                  className="rounded-md px-2 py-1.5 text-paper/80 transition-colors hover:text-amber sm:px-3"
                >
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
