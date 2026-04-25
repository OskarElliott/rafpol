import { SectionLabel } from '@/components/atoms/SectionLabel'
import { TestimonialsGrid } from '@/components/molecules/TestimonialsGrid'
import { getSiteData } from '@/lib/siteData'

export async function Testimonials() {
  const data = await getSiteData()

  return (
    <section
      className="bg-brand-offWhite py-16 md:py-24"
      aria-label="Opinie klientow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <SectionLabel>Opinie klientów</SectionLabel>
          <h2 className="text-3xl md:text-[2.25rem] font-bold text-brand-slate mt-3 leading-[1.2]">
            Co mówią nasi klienci
          </h2>
        </div>

        <TestimonialsGrid testimonials={data.testimonials} />

      </div>
    </section>
  )
}
