'use client'

import { StatItem } from '@/components/molecules/StatItem'
import { STATS } from '@/lib/constants'

export function StatsBar() {
  return (
    <section
      className="bg-brand-navyMid"
      aria-label="Statystyki firmy"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isLast={i === STATS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
