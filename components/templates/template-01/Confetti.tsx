'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PALETTE = [
  '#C9A84C', '#D4AF37', '#F0D060', '#FAF7F0',
  '#8B1A1A', '#C41E3A', '#E8D5A3', '#FFD700',
  '#FF6B6B', '#B8860B', '#FFF8DC',
]

function pr(n: number) { return ((n * 9301 + 49297) % 233280) / 233280 }

interface Particle {
  id: number
  startX: number
  startY: number
  dx: number
  dy: number
  color: string
  size: number
  rotation: number
  duration: number
  delay: number
  isSquare: boolean
}

function makeParticles(ox: number, oy: number, count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = pr(i * 3) * Math.PI * 2
    const d = pr(i * 3 + 1) * 320 + 70
    const g = pr(i * 3 + 2) * 260 + 130
    return {
      id: i,
      startX: ox,
      startY: oy,
      dx: Math.cos(angle) * d,
      dy: Math.sin(angle) * d * 0.42 + g,
      color: PALETTE[Math.floor(pr(i * 7) * PALETTE.length)],
      size: pr(i * 5) * 12 + 4,
      rotation: pr(i * 11) * 720 - 360,
      duration: pr(i * 13) * 1.8 + 2.2,
      delay: pr(i * 17) * 0.45,
      isSquare: pr(i * 19) > 0.48,
    }
  })
}

export function useConfetti() {
  const [particles, setParticles] = useState<Particle[]>([])

  const trigger = useCallback((originX?: number, originY?: number) => {
    const x = originX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 500)
    const y = originY ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 400)
    setParticles(makeParticles(x, y, 145))
    setTimeout(() => setParticles([]), 5500)
  }, [])

  return { particles, trigger }
}

export function ConfettiRenderer({ particles }: { particles: Particle[] }) {
  if (!particles.length) return null
  return (
    <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.startX, y: p.startY, opacity: 1, rotate: 0, scale: 1 }}
            animate={{
              x: p.startX + p.dx,
              y: p.startY + p.dy,
              opacity: 0,
              rotate: p.rotation,
              scale: 0.3,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, delay: p.delay, ease: [0.2, 0.8, 0.4, 1] }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.isSquare ? '2px' : '50%',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
