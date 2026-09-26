import { PageTransition } from '@/components/layout/PageTransition'
import { Contact } from '@/components/sections/Contact'
import { DataEngineering } from '@/components/sections/DataEngineering'
import { Experience } from '@/components/sections/Experience'
import { Experiments } from '@/components/sections/Experiments'
import { Hero } from '@/components/sections/Hero'
import { Impact } from '@/components/sections/Impact'
import { ProfessionalWork } from '@/components/sections/ProfessionalWork'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'

/** Home page: each section is its own file in components/sections. Reorder here. */
export default function Home() {
  return (
    <PageTransition>
      <main id="main">
        <Hero />
        <Impact />
        <ProfessionalWork />
        <DataEngineering />
        <Projects />
        <Experiments />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </PageTransition>
  )
}
