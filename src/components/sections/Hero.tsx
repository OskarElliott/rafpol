'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { TrustBadge } from '@/components/molecules/TrustBadge'
import {
  fadeInVariant,
  fadeUpVariant,
  staggerSlow,
} from '@/lib/animations'
import { TRUST_BADGES } from '@/lib/constants'

const PHONE = process.env.NEXT_PUBLIC_PHONE ?? '+48 XXX XXX XXX'

const wordVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const headlineContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center"
      aria-label="Sekcja główna"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Elektryk podczas pracy przy tablicy rozdzielczej"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-brand-navy/70" aria-hidden="true" />

      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-navy/60 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
        <div className="max-w-2xl">

          <motion.p
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-xs font-medium uppercase tracking-widest text-brand-amber mb-3"
          >
            Wsparcie · Serwis · Instalacje
          </motion.p>

          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-display font-extrabold text-white leading-[1.1]"
          >
            {['Twój', 'zaufany'].map((word) => (
              <motion.span key={word} variants={wordVariant} className="inline-block mr-[0.25em]">
                {word}
              </motion.span>
            ))}
            <br />
            {['partner', 'w', 'elektryce'].map((word) => (
              <motion.span key={word} variants={wordVariant} className="inline-block mr-[0.25em]">
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span variants={wordVariant} className="inline-block text-brand-amber">
              i nie tylko.
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="text-lg text-white/80 mt-4 max-w-lg leading-relaxed"
          >
            Instalacje, serwis i energia odnawialna — kompleksowo, szybko i z gwarancją jakości.
          </motion.p>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = `tel:${PHONE.replace(/\s/g, '')}`}
            >
              <Phone size={16} aria-hidden="true" />
              Zadzwoń teraz
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => document.getElementById('uslugi')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Nasze usługi
            </Button>
          </motion.div>

          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.7 }}
            className="flex flex-wrap gap-3 mt-6"
          >
            {TRUST_BADGES.map((badge) => (
              <motion.div key={badge.text} variants={fadeUpVariant}>
                <TrustBadge text={badge.text} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}