'use client'

import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

interface StatItemProps {
  value: number
  suffix: string
  label: string
  isLast?: boolean
}

export function StatItem({ value, suffix, label, isLast = false }: StatItemProps) {
  const { ref, display } = useCountUp(value)

  return (
    <div
      className={`flex flex-col items-center justify-center py-8 px-6 text-center ${
        !isLast ? 'border-r border-white/10' : ''
      }`}
    >
      <div className="flex items-baseline gap-0.5">
        <motion.span
          ref={ref}
          className="text-4xl font-extrabold text-brand-amber tabular-nums"
        >
          {display}
        </motion.span>
        {suffix && (
          <span className="text-4xl font-extrabold text-brand-amber">{suffix}</span>
        )}
      </div>
      <p className="text-white/60 text-sm uppercase tracking-wide mt-1">
        {label}
      </p>
    </div>
  )
}
