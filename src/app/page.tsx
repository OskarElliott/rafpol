export const dynamic = 'force-dynamic'

import { Navbar }        from '@/components/sections/Navbar'
import { Hero }          from '@/components/sections/Hero'
import { StatsBar }      from '@/components/sections/StatsBar'
import { Services }      from '@/components/sections/Services'
import { About }         from '@/components/sections/About'
import { Projects }      from '@/components/sections/Projects'
import { Testimonials }  from '@/components/sections/Testimonials'
import { Certificates }  from '@/components/sections/Certificates'
import { Contact }       from '@/components/sections/Contact'
import { Footer }        from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <About />
      <Projects />
      <Testimonials />
      <Certificates />
      <Contact />
      <Footer />
    </>
  )
}