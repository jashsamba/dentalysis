/** Decorative planet in the project's colours, floating in the corner of its panel. */
export function Planet({ ring, className = '' }: { ring?: boolean; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`} style={{ perspective: '600px' }}>
      <div className="planet h-full w-full rounded-full" />
      {ring && <div className="planet-ring absolute -inset-[28%] rounded-full" />}
    </div>
  )
}
