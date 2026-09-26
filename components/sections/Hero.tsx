import { profile } from '@/data/profile'
import { SolarSystem } from '../diagrams/SolarSystem'
import { Button } from '../ui/Button'
import { CertBadge } from '../ui/CertBadge'
import { Portrait } from '../ui/Portrait'

/** Section 1: name, headline and the solar-system diagram. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <div className="flex items-center gap-5">
            <Portrait size={92} tight />
            <div className="flex flex-col items-start gap-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-sm text-sun-soft">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sun shadow-[0_0_8px_2px_rgba(251,191,36,0.7)]" />
                {profile.name}
              </p>
              <CertBadge />
            </div>
          </div>
          <h1
            id="hero-title"
            className="text-cosmic mt-6 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">{profile.subline}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#projects" variant="primary">
              View projects
            </Button>
            {profile.resume && (
              <Button href={profile.resume} download>
                Download resume
              </Button>
            )}
            <Button href={`mailto:${profile.email}`}>Email me</Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[560px]">
          <SolarSystem />
        </div>
      </div>
    </section>
  )
}
