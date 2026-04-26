'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { staggerFast, fadeUpVariant, viewportConfig } from '@/lib/animations'

const CERTIFICATES = [
  { id: 1, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228404/cert-1_rfmfqr.jpg', alt: 'Certyfikat 1' },
  { id: 2, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228404/cert-2_exftry.jpg', alt: 'Certyfikat 2' },
  { id: 3, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228405/cert-3_fvyphb.jpg', alt: 'Certyfikat 3' },
  { id: 4, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228407/cert-4_dvd08h.jpg', alt: 'Certyfikat 4' },
  { id: 5, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228406/cert-5_qkbxig.jpg', alt: 'Certyfikat 5' },
  { id: 6, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228410/cert-6_hxu7k6.jpg', alt: 'Certyfikat 6' },
  { id: 7, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228404/cert-7_latbl2.jpg', alt: 'Certyfikat 7' },
  { id: 8, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228405/cert-8_vfq4n0.jpg', alt: 'Certyfikat 8' },
  { id: 9, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228407/cert-9_onku42.jpg', alt: 'Certyfikat 9' },
  { id: 10, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228406/cert-10_qwpdqi.jpg', alt: 'Certyfikat 10' },
  { id: 11, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228407/cert-11_ylckbd.jpg', alt: 'Certyfikat 11' },
  { id: 12, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228408/cert-12_klj2l2.jpg', alt: 'Certyfikat 12' },
  { id: 13, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228409/cert-13_f7t289.jpg', alt: 'Certyfikat 13' },
]

export function Certificates() {
  const [selected, setSelected] = useState<string | null>(null)

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
            Posiadamy wszelkie niezbędne uprawnienia i certyfikaty do realizacji powierzonych prac.
          </p>
        </div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {CERTIFICATES.map((cert) => (
            <motion.button
              key={cert.id}
              variants={fadeUpVariant}
              onClick={() => setSelected(cert.url)}
              className="relative aspect-[3/4] rounded-lg overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:border-brand-navyMid transition-all duration-300 group"
              aria-label={`Otwórz ${cert.alt}`}
            >
              <Image
                src={cert.url}
                alt={cert.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd certyfikatu"
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setSelected(null)}
            aria-label="Zamknij"
          >
            <X size={24} />
          </button>
          <div
            className="relative max-w-2xl w-full max-h-[90vh] aspect-[3/4]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected}
              alt="Certyfikat"
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </div>
      )}
    </section>
  )
}