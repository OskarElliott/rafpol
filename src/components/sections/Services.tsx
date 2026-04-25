import { SectionLabel } from '@/components/atoms/SectionLabel'
import { ServiceCard } from '@/components/molecules/ServiceCard'
import { ServicesGrid } from '@/components/molecules/ServicesGrid'
import { getSiteData } from '@/lib/siteData'

export async function Services() {
  const data = await getSiteData()

  return (
    <section
      id="uslugi"
      className="bg-white py-16 md:py-24"
      aria-label="Nasze uslugi"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <SectionLabel>Nasze Uslugi</SectionLabel>
          <h2 className="text-3xl md:text-[2.25rem] font-bold text-brand-slate mt-3 leading-[1.2]">
            Kompleksowe uslugi dla domu i firmy
          </h2>
        </div>

        <ServicesGrid services={data.services} />

      </div>
    </section>
  )
}
