import { projects } from '@/data/projects'
import { ProjectStack } from '../projects/ProjectStack'
import { SectionHeading } from '../ui/SectionHeading'

/** Section 5: personal projects as a scrolling deck of worlds. */
export function Projects() {
  return (
    <section aria-labelledby="projects" className="mx-auto max-w-7xl px-4 pt-24 pb-10 sm:px-6 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="projects"
          eyebrow="Personal projects"
          title="Four worlds, built on my own time"
          intro="Scroll through them, then open one for the full case study."
        />
      </div>
      <ProjectStack projects={projects} />
    </section>
  )
}
