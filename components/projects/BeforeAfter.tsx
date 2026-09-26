'use client'

import { useId, useState } from 'react'

type Img = { src: string; alt: string; label: string }

/** Drag (or use arrow keys on) the handle to compare two screenshots. */
export function BeforeAfter({ before, after, width = 420, height = 880 }: { before: Img; after: Img; width?: number; height?: number }) {
  const [pos, setPos] = useState(50)
  const id = useId()

  return (
    <figure className="my-8">
      <div
        className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-[1.6rem] border-4 border-black/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] select-none"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <img src={after.src} alt={after.alt} width={width} height={height} className="absolute inset-0 h-full w-full object-cover" />
        <img
          src={before.src}
          alt={before.alt}
          width={width}
          height={height}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm text-void shadow-md">
            ⇆
          </span>
        </div>

        <span className="pointer-events-none absolute top-3 left-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">{before.label}</span>
        <span className="pointer-events-none absolute top-3 right-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">{after.label}</span>

        <label htmlFor={id} className="sr-only">
          Compare {before.label} and {after.label}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-center text-sm text-haze">
        Drag the handle to compare the {before.label.toLowerCase()} and the {after.label.toLowerCase()}.
      </figcaption>
    </figure>
  )
}
