'use client'

import { motion } from 'framer-motion'
import { ProjectTile } from './ProjectTile'
import { staggerFast, viewportConfig } from '@/lib/animations'

interface Project {
  label: string
  location: string
  alt: string
  image?: string
}

const FALLBACK_IMAGES = [
  '/images/project-1.jpg',
  '/images/project-2.jpg',
  '/images/project-3.jpg',
  '/images/project-4.jpg',
  '/images/project-5.jpg',
  '/images/project-6.jpg',
  '/images/project-7.jpg',
  '/images/project-8.jpg',
  '/images/project-9.jpg',
  '/images/project-10.jpg',
]

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {projects.map((project, i) => (
        <ProjectTile
          key={i}
          label={project.label}
          location={project.location}
          alt={project.alt}
          imageSrc={project.image || FALLBACK_IMAGES[i] || '/images/project-1.jpg'}
        />
      ))}
    </motion.div>
  )
}