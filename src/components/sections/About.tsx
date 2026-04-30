'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Clock, Shield, Star, Zap } from 'lucide-react'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { Button } from '@/components/atoms/Button'
import {
  slideLeftVariant,
  slideRightVariant,
  staggerContainer,
  fadeUpVariant,
  viewportConfig,
} from '@/lib/animations'

const USP_ITEMS = [
  {
    icon: Zap,
    title: 'Szybka diagnoza i naprawy',
    description:
      'Diagnozujemy usterkę w ciągu 24h i realizujemy naprawę bez zbędnych opóźnień.',
  },
  {
    icon: Shield,
    title: 'Certyfikowani specjaliści',
    description:
      'Nasz zespół posiada uprawnienia elektryczne SEP i doświadczenie na rynku od ponad 10 lat.',
  },
  {
    icon: Star,
    title: 'Gwarancja na każdą usługę',
    description:
      'Udzielamy pisemnej gwarancji na wszystkie wykonane przez nas prace.',
  },
  {
    icon: Clock,
    title: 'Jedna firma, wszystkie usługi',
    description:
      'Od instalacji po fotowoltaikę z magazynem energii — obsługujesz się u jednego sprawdzonego wykonawcy.',
  },
] as const

export function About() {
  return (
    <section
      id="o-nas"
      className="bg-brand-offWhite py-16 md:py-24"
      aria-label="O firmie Rafpol"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            variants={slideLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="rounded-xl overflow-hidden aspect-[4/3] relative"
          >
            <Image
              src="/images/about-electrician.jpg"
              alt="Elektryk Rafpol podczas profesjonalnych prac instalacyjnych"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            variants={slideRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.1 }}
          >
            <SectionLabel>Dlaczego Rafpol</SectionLabel>
            <h2 className="text-3xl md:text-[2.25rem] font-bold text-brand-slate mt-3 leading-[1.2]">
              Twój sprawdzony partner w elektryce i sanitarce
            </h2>
            <p className="text-brand-muted text-base leading-relaxed mt-4">
              Od ponad 10 lat obsługujemy klientów indywidualnych i firmy w Krakowie i okolicach.
              Łączymy doświadczenie z nowoczesnymi technologiami, by każda realizacja była pewna i trwała.
            </p>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mt-8 flex flex-col gap-5"
              role="list"
            >
              {USP_ITEMS.map((usp) => {
                const IconComp = usp.icon
                return (
                  <motion.li
                    key={usp.title}
                    variants={fadeUpVariant}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-amber/10 text-brand-amber flex items-center justify-center flex-shrink-0">
                      <IconComp size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-slate text-base">{usp.title}</p>
                      <p className="text-sm text-brand-muted mt-0.5">{usp.description}</p>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ul>

            <div className="mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Skontaktuj się z nami
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}