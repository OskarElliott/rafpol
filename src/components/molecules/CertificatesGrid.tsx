'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { staggerFast, fadeUpVariant, viewportConfig } from '@/lib/animations'

interface Certificate {
  id: number
  url: string
  alt: string
}

export function CertificatesGrid({ certificates }: { certificates: Certificate[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  if (!certificates || certificates.length === 0) return null

  return (
    <>
      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        {certificates.map((cert) => (
          <motion.button
            key={cert.id}
            variants={fadeUpVariant}
            onClick={() => setSelected(cert.url)}
            className="relative aspect-[3/4] rounded-lg overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:border-brand-navyMid transition-all duration-300 group"
            aria-label={`Otworz ${cert.alt}`}
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

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
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
    </>
  )
}