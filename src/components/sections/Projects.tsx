import { SectionLabel } from '@/components/atoms/SectionLabel'
import { ProjectsGrid } from '@/components/molecules/ProjectsGrid'
import { getSiteData } from '@/lib/siteData'

export async function Projects() {
  const data = await getSiteData()

  return (
    <section
      id="realizacje"
      className="bg-white py-16 md:py-24"
      aria-label="Nasze realizacje"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <SectionLabel>Nasze Realizacje</SectionLabel>
          <h2 className="text-3xl md:text-[2.25rem] font-bold text-brand-slate mt-3 leading-[1.2]">
            Wybrane projekty
          </h2>
        </div>

        <ProjectsGrid projects={data.projects} />

      </div>
    </section>
  )
}
