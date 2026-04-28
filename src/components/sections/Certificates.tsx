import { SectionLabel } from '@/components/atoms/SectionLabel'
import { CertificatesGrid } from '@/components/molecules/CertificatesGrid'
import { getSiteData } from '@/lib/siteData'

export async function Certificates() {
  const data = await getSiteData()

  return (
    <section
      id="certyfikaty"
      className="bg-white py-16 md:py-24"
      aria-label="Certyfikaty i uprawnienia"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>Certyfikaty i uprawnienia</SectionLabel>
          <h2 className="text-3xl md:text-[2.25rem] font-bold text-brand-slate mt-3 leading-[1.2]">
            Nasze kwalifikacje
          </h2>
          <p className="text-brand-muted text-base mt-3 max-w-xl mx-auto">
            Posiadamy wszelkie niezbedne uprawnienia i certyfikaty do realizacji powierzonych prac.
          </p>
        </div>
        <CertificatesGrid certificates={data.certificates ?? []} />
      </div>
    </section>
  )
}