import type { Variants } from 'framer-motion'

export const fadeUpVariant: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const fadeInVariant: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const slideLeftVariant: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const slideRightVariant: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
}

export const staggerFast: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

export const staggerSlow: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.10 },
  },
}

export const viewportConfig = {
  once: true,
  margin: '-100px',
} as const
