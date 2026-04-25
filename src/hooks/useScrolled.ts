'use client'

import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export function useScrolled(threshold = 60) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > threshold)
  })

  return scrolled
}
