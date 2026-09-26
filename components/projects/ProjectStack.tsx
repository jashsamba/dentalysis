'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, type RefObject } from 'react'
import type { Project } from '@/data/projects'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { ProjectPanel } from './ProjectPanel'

/**
 * Projects as a deck: on wide screens each panel pins, the next one slides up over it,
 * and the covered panel recedes into space. On phones (or with reduced motion) they simply stack.
 */
export function ProjectStack({ projects }: { projects: Project[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <div className="space-y-6 md:space-y-0">
      {projects.map((project, i) => (
        <StackItem
          key={project.slug}
          project={project}
          index={i}
          total={projects.length}
          setRef={(el) => {
            refs.current[i] = el
          }}
          nextRef={{
            get current() {
              return refs.current[i + 1] ?? null
            },
          }}
          isLast={i === projects.length - 1}
        />
      ))}
    </div>
  )
}

function StackItem({
  project,
  index,
  total,
  setRef,
  nextRef,
  isLast,
}: {
  project: Project
  index: number
  total: number
  setRef: (el: HTMLDivElement | null) => void
  nextRef: RefObject<HTMLDivElement | null>
  isLast: boolean
}) {
  const reduce = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 768px)')
  const selfRef = useRef<HTMLDivElement | null>(null)

  // 0 → 1 while the next panel slides over this one
  const { scrollYProgress: leave } = useScroll({
    target: isLast ? selfRef : nextRef,
    offset: isLast ? ['end end', 'end start'] : ['start end', 'start start'],
  })

  return (
    <div
      ref={(el) => {
        selfRef.current = el
        setRef(el)
      }}
      className="md:sticky md:top-[4.75rem] md:h-[calc(100svh-5.5rem)] md:pb-4"
      style={{ zIndex: index + 1 }}
    >
      {reduce || !desktop ? (
        <ProjectPanel project={project} index={index} total={total} />
      ) : (
        <AnimatedPanel project={project} index={index} total={total} leave={leave} isLast={isLast} />
      )}
    </div>
  )
}

function AnimatedPanel({
  project,
  index,
  total,
  leave,
  isLast,
}: {
  project: Project
  index: number
  total: number
  leave: MotionValue<number>
  isLast: boolean
}) {
  const scale = useTransform(leave, [0, 1], [1, isLast ? 1 : 0.88])
  const dim = useTransform(leave, [0, 1], [0, isLast ? 0 : 0.6])
  const blur = useTransform(leave, [0, 1], ['blur(0px)', isLast ? 'blur(0px)' : 'blur(3px)'])

  return (
    <motion.div className="relative h-full origin-top will-change-transform" style={{ scale, filter: blur }}>
      <ProjectPanel project={project} index={index} total={total} />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-void" style={{ opacity: dim }} />
    </motion.div>
  )
}
