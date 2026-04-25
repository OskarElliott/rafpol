'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronUp } from 'lucide-react'
import { Icon } from '@/components/atoms/Icon'
import { fadeUpVariant } from '@/lib/animations'

interface ServiceCardProps {
  name: string
  subtitle: string
  description: string
  icon: string
  expanded?: string
}

export function ServiceCard({ name, subtitle, description, icon, expanded }: ServiceCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.article
      variants={fadeUpVariant}
      whileHover={!open ? { y: -4 } : {}}
      className={
        'group bg-white border rounded-lg p-6 shadow-card transition-all duration-300 ' +
        (open
          ? 'border-brand-navyMid shadow-card-hover'
          : 'border-brand-border hover:border-brand-navyMid hover:shadow-card-hover')
      }
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-brand-offWhite flex items-center justify-center">
        <Icon name={icon} size={22} className="text-brand-navyMid" />
      </div>

      {/* Name */}
      <h3 className="text-[1.5rem] leading-[1.3] font-semibold text-brand-slate mt-4">
        {name}
      </h3>

      {/* English subtitle */}
      <p className="text-xs text-brand-amber uppercase tracking-wider mt-1 font-medium">
        {subtitle}
      </p>

      {/* Description */}
      <p className="text-sm text-brand-muted mt-2 leading-relaxed">
        {description}
      </p>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-brand-border mt-4">
              <p className="text-sm text-brand-muted leading-relaxed">
                {expanded ?? 'Szczegolowy opis uslug zostanie dodany wkrotce.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm text-brand-navyMid font-medium mt-4 hover:text-brand-amber transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber rounded-sm"
        aria-expanded={open}
        aria-label={open ? 'Zwiń' : 'Dowiedz się więcej'}
      >
        {open ? (
          <>
            Zwiń
            <ChevronUp size={14} aria-hidden="true" />
          </>
        ) : (
          <>
            Dowiedz się więcej
            <ArrowRight size={14} aria-hidden="true" />
          </>
        )}
      </button>
    </motion.article>
  )
}