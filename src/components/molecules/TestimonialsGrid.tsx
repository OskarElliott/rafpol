'use client'

import { motion } from 'framer-motion'
import { TestimonialCard } from './TestimonialCard'
import { staggerContainer, viewportConfig } from '@/lib/animations'

interface Testimonial {
  quote: string
  author: string
  location: string
}

export function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {testimonials.map((t, i) => (
        <TestimonialCard
          key={i}
          quote={t.quote}
          author={t.author}
          location={t.location}
        />
      ))}
    </motion.div>
  )
}
