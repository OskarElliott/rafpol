'use client'

import { motion } from 'framer-motion'
import { StarRating } from '@/components/atoms/StarRating'
import { fadeUpVariant } from '@/lib/animations'

interface TestimonialCardProps {
  quote: string
  author: string
  location: string
}

export function TestimonialCard({ quote, author, location }: TestimonialCardProps) {
  return (
    <motion.article
      variants={fadeUpVariant}
      className="bg-white rounded-lg shadow-card p-6 border border-brand-border"
    >
      <StarRating />
      <blockquote className="text-brand-slate text-base leading-relaxed mt-3 italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer className="text-brand-muted text-sm font-medium mt-4">
        {author}, <span className="font-normal">{location}</span>
      </footer>
    </motion.article>
  )
}
