'use client'

import { useEffect, useRef } from 'react'
import {
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion'

export function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.5,
  })
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString('pl-PL'),
  )

  useEffect(() => {
    if (inView) motionVal.set(target)
  }, [inView, target, motionVal])

  return { ref, display }
}
