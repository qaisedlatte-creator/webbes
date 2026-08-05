'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Christian-only polish: the hero content drifts and fades as you scroll
 * past it, instead of just sitting static like the Islamic/Hindu hero.
 * Wrap with `enabled=false` (default) to render children untouched.
 */
export default function ScrollParallax({ enabled = false, children }: { enabled?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  if (!enabled) return <>{children}</>

  return (
    <div ref={ref}>
      <motion.div style={{ y, opacity }}>{children}</motion.div>
    </div>
  )
}
