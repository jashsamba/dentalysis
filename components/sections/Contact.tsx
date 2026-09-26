import { profile } from '@/data/profile'
import { Button } from '../ui/Button'
import { Placeholder } from '../ui/Placeholder'

/** Section 9: contact details, links and footer. */
export function Contact() {
  return (
    <section aria-labelledby="contact" className="relative mt-10 overflow-hidden border-t border-white/[0.07]">
      {/* Horizon glow: a sunrise over the edge of a planet */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[60%] left-1/2 h-[120%] w-[140%] -translate-x-1/2 rounded-[100%]"
        style={{
          background: 'radial-gradient(closest-side, rgba(251,191,36,0.22), rgba(167,139,250,0.12) 55%, transparent)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
        <p className="font-mono text-sm text-sun">Contact</p>
        <h2 id="contact" className="text-cosmic mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Building something with AI and data? Let&apos;s talk.
        </h2>

        <dl className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          <div className="glass rounded-2xl p-5">
            <dt className="font-mono text-sm text-haze">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${profile.email}`} className="text-xl break-all text-star transition hover:text-sun">
                {profile.email}
              </a>
            </dd>
          </div>
          <div className="glass rounded-2xl p-5">
            <dt className="font-mono text-sm text-haze">Phone</dt>
            <dd className="mt-1">
              <a href={profile.phone.href} className="text-xl text-star transition hover:text-sun">
                {profile.phone.display}
              </a>
            </dd>
          </div>
        </dl>

        <ul className="mt-8 flex flex-wrap items-center gap-3">
          <li>
            <Button href={profile.github}>GitHub</Button>
          </li>
          {profile.linkedin && (
            <li>
              <Button href={profile.linkedin}>LinkedIn</Button>
            </li>
          )}
          {profile.resume && (
            <li>
              <Button href={profile.resume} download>
                Resume (PDF)
              </Button>
            </li>
          )}
          <li>{profile.upwork ? <Button href={profile.upwork}>Upwork</Button> : <Placeholder>Upwork link (optional)</Placeholder>}</li>
        </ul>
      </div>

      <footer className="relative border-t border-white/[0.07]">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-haze sm:px-6">
          © {new Date().getFullYear()} {profile.name} · Ontario, Canada
        </p>
      </footer>
    </section>
  )
}
