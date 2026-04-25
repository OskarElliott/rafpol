'use client'

import { motion } from 'framer-motion'
import { ServiceCard } from './ServiceCard'
import { staggerFast, viewportConfig } from '@/lib/animations'

interface Service {
  id: string
  name: string
  subtitle: string
  description: string
  expanded: string
  icon: string
}

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          name={service.name}
          subtitle={service.subtitle}
          description={service.description}
          expanded={service.expanded}
          icon={service.icon}
        />
      ))}
    </motion.div>
  )
}
