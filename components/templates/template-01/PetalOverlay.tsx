'use client'

import { useEffect, useState } from 'react'
import type { ColorPreset } from '@/lib/templates/types'

function pr(seed: number) {
  return ((seed * 9301 + 49297) % 233280) / 233280
}

const PETAL_PATH =
  'M0,-30 C10,-28 22,-18 24,-6 C26,6 22,22 14,32 C8,40 2,44 0,44 ' +
  'C-2,44 -8,40 -14,32 C-22,22 -26,6 -24,-6 C-22,-18 -10,-28 0,-30 Z'

interface PetalConfig {
  count: number
  sizeMin: number
  sizeRange: number
  driftRange: number
  swayAmpRange: number
}

const DESKTOP: PetalConfig = { count: 18, sizeMin: 12, sizeRange: 18, driftRange: 160, swayAmpRange: 60 }
const MOBILE: PetalConfig = { count: 10, sizeMin: 9, sizeRange: 12, driftRange: 80, swayAmpRange: 32 }

function buildPetals(cfg: PetalConfig) {
  return Array.from({ length: cfg.count }, (_, i) => {
    const s = (n: number) => pr(i * 17 + n)
    return {
      id: i,
      left: s(1) * 88 + 4,
      size: s(2) * cfg.sizeRange + cfg.sizeMin,
      fallDur: s(3) * 9 + 7,
      fallDelay: -(s(4) * 16),
      drift: (s(5) - 0.5) * cfg.driftRange,
      swayDur: s(6) * 4 + 3,
      swayAmp: (s(7) - 0.5) * cfg.swayAmpRange,
      swayDelay: -(s(8) * 6),
      flutterDur: s(9) * 2.5 + 2,
      flutterDelay: -(s(10) * 3),
      opacity: 0.5 + s(11) * 0.35,
      rotateStart: s(13) * 360,
      dark: s(14) > 0.5,
    }
  })
}

const DESKTOP_PETALS = buildPetals(DESKTOP)
const MOBILE_PETALS = buildPetals(MOBILE)

export default function PetalOverlay({ theme }: { theme: ColorPreset }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onMotion)

    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    return () => {
      mq.removeEventListener('change', onMotion)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const allPetals = isMobile ? MOBILE_PETALS : DESKTOP_PETALS
  const petals = reducedMotion ? allPetals.slice(0, 5) : allPetals

  return (
    <div className="petal-overlay-wrap" style={{ position: 'fixed', inset: 0, zIndex: 8, pointerEvents: 'none', overflow: 'hidden' }}>
      {petals.map((p) => {
        const w = p.size
        const h = p.size * 1.55
        const gradId = `rg-${p.id}-${isMobile ? 'm' : 'd'}`
        const fallDur = reducedMotion ? p.fallDur * 1.8 : p.fallDur
        const tip = p.dark ? theme.petalSecondary : theme.petalPrimary
        const base = theme.accentDeep

        return (
          <div
            key={p.id}
            style={
              {
                position: 'absolute',
                top: '-6%',
                left: `${p.left}%`,
                width: w,
                height: h,
                opacity: p.opacity,
                willChange: 'transform',
                animation: `petal-fall ${fallDur}s ${p.fallDelay}s infinite linear`,
                '--petal-drift': `${p.drift}px`,
              } as React.CSSProperties
            }
          >
            <div
              style={
                {
                  width: '100%',
                  height: '100%',
                  animation: reducedMotion ? 'none' : `petal-sway ${p.swayDur}s ${p.swayDelay}s infinite ease-in-out`,
                  '--petal-sway': `${p.swayAmp}px`,
                } as React.CSSProperties
              }
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  animation: reducedMotion ? 'none' : `petal-flutter ${p.flutterDur}s ${p.flutterDelay}s infinite ease-in-out`,
                }}
              >
                <svg viewBox="-28 -32 56 80" width={w} height={h} style={{ display: 'block', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="-30" x2="0" y2="44" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor={tip} stopOpacity="0.88" />
                      <stop offset="55%" stopColor={base} stopOpacity="0.95" />
                      <stop offset="100%" stopColor={base} stopOpacity="0.78" />
                    </linearGradient>
                  </defs>
                  <path d={PETAL_PATH} fill={`url(#${gradId})`} transform={`rotate(${p.rotateStart})`} />
                </svg>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
