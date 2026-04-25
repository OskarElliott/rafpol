'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeUpVariant } from '@/lib/animations'

interface ProjectTileProps {
  label: string
  location: string
  alt: string
  imageSrc: string
}

export function ProjectTile({ label, location, alt, imageSrc }: ProjectTileProps) {
  return (
    <motion.div
      variants={fadeUpVariant}
      className="relative overflow-hidden rounded-xl group cursor-pointer aspect-[4/3]"
    >
      {/* Image with hover zoom */}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay — darkens on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Label */}
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-white font-semibold text-sm leading-snug">
          {label}
          <span className="block text-white/70 text-xs font-normal mt-0.5">
            {location}
          </span>
        </p>
      </div>
    </motion.div>
  )
}
