/** Eyebrow + title (+ optional intro) at the top of each home page section. */
export function SectionHeading({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="mb-12 max-w-3xl">
      <p className="flex items-center gap-3 font-mono text-sm text-ion">
        <span aria-hidden className="h-px w-8 bg-gradient-to-r from-ion to-transparent" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-3 text-3xl font-semibold tracking-tight text-star sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed">{intro}</p>}
    </header>
  )
}
