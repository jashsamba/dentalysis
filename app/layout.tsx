import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'
import { profile } from '@/lib/site'
import './globals.css'

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${profile.name} · AI Engineer`,
    template: `%s · ${profile.name}`,
  },
  description: profile.headline,
}

export const viewport: Viewport = {
  themeColor: '#14213d',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-md bg-amber px-4 py-2 font-medium text-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
