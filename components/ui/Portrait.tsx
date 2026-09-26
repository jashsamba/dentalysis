import { profile } from '@/data/profile'

/** Round portrait with a turning cosmic ring and a small moon in orbit. */
export function Portrait({ size = 88, tight = false, className = '' }: { size?: number; tight?: boolean; className?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      {/* soft glow behind */}
      <div aria-hidden className="absolute -inset-3 rounded-full bg-nebula/25 blur-xl" />
      {/* turning gradient ring */}
      <div aria-hidden className="portrait-ring absolute -inset-[3px] rounded-full" />
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-void">
        <img
          src={profile.portrait.src}
          alt={profile.portrait.alt}
          width={size}
          height={size}
          // tight: zoom in on the face for small sizes
          className="h-full w-full object-cover"
          style={tight ? { transform: 'scale(1.45)', transformOrigin: '48% 36%' } : undefined}
        />
      </div>
      {/* moon orbiting the portrait */}
      <div aria-hidden className="portrait-orbit absolute" style={{ inset: -Math.max(8, size * 0.1) }}>
        <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-sun shadow-[0_0_10px_3px_rgba(251,191,36,0.7)]" />
      </div>
    </div>
  )
}
