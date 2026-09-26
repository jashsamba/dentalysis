import type { Project } from '@/lib/projects'
import { FlowDiagram } from './FlowDiagram'

/** The visual on a project's panel: real app renders, or a generic flow diagram until screenshots exist. */
export function ProjectMedia({ project, size = 'md' }: { project: Project; size?: 'md' | 'lg' }) {
  const { media } = project

  if (media.kind === 'phones') {
    const w = size === 'lg' ? 'w-[46%] max-w-[260px]' : 'w-[44%] max-w-[210px]'
    return (
      <div className="relative mx-auto flex aspect-[5/4] w-full max-w-md items-center justify-center">
        <img
          src={media.back.src}
          alt={media.back.alt}
          width={420}
          height={880}
          loading="lazy"
          className={`absolute top-1/2 left-[52%] ${w} -translate-y-[46%] rotate-6 rounded-[1.6rem] border-4 border-black/40 shadow-2xl`}
        />
        <img
          src={media.front.src}
          alt={media.front.alt}
          width={420}
          height={880}
          className={`absolute top-1/2 right-[50%] ${w} -translate-y-1/2 -rotate-3 rounded-[1.6rem] border-4 border-black/40 shadow-2xl`}
        />
      </div>
    )
  }

  return (
    <figure className="mx-auto w-full max-w-xs">
      <FlowDiagram nodes={media.nodes} tone="panel" direction="vertical" label={`${project.title} flow`} />
      <figcaption className="mt-4 text-center text-sm text-[color:var(--project-muted)]">{media.caption}</figcaption>
    </figure>
  )
}
