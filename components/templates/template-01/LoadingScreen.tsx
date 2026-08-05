'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ColorPreset } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'

type Phase = 'sealed' | 'opening' | 'done'

interface Props {
  brideName: string
  groomName: string
  monogram: string
  invitationLabel: string
  dateDotted: string
  theme: ColorPreset
  onComplete: () => void
}

function pr(seed: number) {
  return ((seed * 9301 + 49297) % 233280) / 233280
}

const SCREEN_PETALS = Array.from({ length: 20 }, (_, i) => ({
  left: pr(i * 11 + 1) * 88 + 4,
  duration: pr(i * 11 + 2) * 8 + 7,
  delay: -(pr(i * 11 + 3) * 16),
  size: pr(i * 11 + 4) * 10 + 8,
  drift: (pr(i * 11 + 5) - 0.5) * 120,
  spin: (pr(i * 11 + 6) * 380 + 140) * (i % 2 === 0 ? 1 : -1),
  shape: i % 3,
  dark: i % 2 === 0,
}))

function WaxSeal({ monogram, theme }: { monogram: string; theme: ColorPreset }) {
  return (
    <div
      style={{
        width: 'clamp(78px, 20vw, 96px)',
        height: 'clamp(78px, 20vw, 96px)',
        borderRadius: '50%',
        background: `radial-gradient(circle at 36% 30%, ${theme.accent} 0%, ${theme.accentDeep} 45%, ${theme.accentDarkest} 100%)`,
        border: `1.5px solid ${withAlpha(theme.gold, 0.55)}`,
        boxShadow: `0 6px 24px ${withAlpha(theme.accentDarkest, 0.5)}, 0 2px 8px ${withAlpha(theme.accentDarkest, 0.35)}, inset 0 2px 8px rgba(255,255,255,0.08)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', inset: 5, borderRadius: '50%', border: `1px solid ${withAlpha(theme.gold, 0.35)}` }} />
      <div style={{ position: 'absolute', inset: 9, borderRadius: '50%', border: `0.5px solid ${withAlpha(theme.gold, 0.2)}` }} />
      <span
        style={{
          fontFamily: 'var(--invite-script)',
          fontSize: 'clamp(1.7rem, 4.5vw, 2.3rem)',
          color: withAlpha(theme.goldBright, 0.95),
          lineHeight: 1,
          position: 'relative',
          zIndex: 1,
          textShadow: `0 1px 4px ${withAlpha(theme.accentDarkest, 0.4)}`,
        }}
      >
        {monogram}
      </span>
    </div>
  )
}

export default function LoadingScreen({ brideName, groomName, monogram, invitationLabel, dateDotted, theme, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('sealed')

  const handleOpen = () => {
    if (phase !== 'sealed') return
    setPhase('opening')
    setTimeout(() => {
      setPhase('done')
      setTimeout(onComplete, 650)
    }, 900)
  }

  const [bgFrom, bgVia1, bgVia2, bgTo] = theme.pageBgStops

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-6 text-center"
          style={{
            background: `linear-gradient(160deg, ${bgFrom} 0%, ${bgVia1} 38%, ${bgVia2} 68%, ${bgTo} 100%)`,
            overflow: 'hidden',
          }}
        >
          {SCREEN_PETALS.map((p, i) => {
            const h = p.size * (p.shape === 1 ? 0.54 : p.shape === 2 ? 0.7 : 0.65)
            const br = p.shape === 0 ? '50% 0 50% 0' : p.shape === 1 ? '38% 5% 62% 8%' : '60% 40% 55% 45%'
            const col = p.dark ? theme.petalSecondary : theme.petalPrimary
            return (
              <div
                key={i}
                className="petal"
                style={
                  {
                    position: 'absolute',
                    top: '-4%',
                    left: `${p.left}%`,
                    width: p.size,
                    height: h,
                    background: `radial-gradient(ellipse at 35% 30%, ${col} 0%, ${theme.accentDeep} 100%)`,
                    borderRadius: br,
                    '--petal-drift': `${p.drift}px`,
                    '--petal-spin': `${p.spin}deg`,
                    '--petal-dur': `${p.duration}s`,
                    '--petal-delay': `${p.delay}s`,
                    zIndex: 0,
                    pointerEvents: 'none',
                  } as React.CSSProperties
                }
              />
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative z-10 flex flex-col items-center mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 40, height: '1px', background: `linear-gradient(to right, transparent, ${withAlpha(theme.gold, 0.7)})` }} />
              <div style={{ width: 6, height: 6, background: theme.gold, transform: 'rotate(45deg)', opacity: 0.8 }} />
              <div style={{ width: 40, height: '1px', background: `linear-gradient(to left, transparent, ${withAlpha(theme.gold, 0.7)})` }} />
            </div>

            <p
              style={{
                fontFamily: 'var(--invite-label)',
                fontSize: 'clamp(0.55rem, 1.8vw, 0.65rem)',
                letterSpacing: '0.42em',
                textTransform: 'uppercase',
                color: theme.label,
                fontWeight: 300,
                marginBottom: '0.6rem',
              }}
            >
              {invitationLabel}
            </p>

            <h1
              style={{
                fontFamily: 'var(--invite-script)',
                fontSize: 'clamp(2.8rem, 8vw, 4rem)',
                color: theme.accent,
                lineHeight: 1.1,
                textShadow: `0 2px 12px ${withAlpha(theme.accent, 0.15)}`,
              }}
            >
              {brideName} &amp; {groomName}
            </h1>

            <p
              style={{
                fontFamily: 'var(--invite-label)',
                fontSize: 'clamp(0.55rem, 1.8vw, 0.65rem)',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: withAlpha(theme.ink, 0.5),
                fontWeight: 300,
                marginTop: '0.5rem',
              }}
            >
              {dateDotted}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            onClick={handleOpen}
            className="relative z-10 cursor-pointer select-none"
            style={{ perspective: '1200px', perspectiveOrigin: '50% 0%' }}
          >
            <div
              className="relative overflow-visible"
              style={{
                width: 'clamp(280px, 85vw, 400px)',
                aspectRatio: '3 / 2',
                background: `linear-gradient(160deg, ${theme.cardBg} 0%, ${withAlpha(theme.cardBg, 1)} 100%)`,
                boxShadow: `0 4px 12px ${withAlpha(theme.accentDarkest, 0.1)}, 0 12px 32px ${withAlpha(theme.accentDarkest, 0.12)}, 0 28px 64px ${withAlpha(theme.accentDarkest, 0.1)}`,
                border: `1px solid ${withAlpha(theme.gold, 0.2)}`,
              }}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 380 253" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0 L0,253 L190,126.5 Z" fill={withAlpha(theme.gold, 0.12)} stroke={withAlpha(theme.ink, 0.15)} strokeWidth="0.5" />
                <path d="M380,0 L380,253 L190,126.5 Z" fill={withAlpha(theme.gold, 0.16)} stroke={withAlpha(theme.ink, 0.15)} strokeWidth="0.5" />
                <path d="M0,253 L380,253 L190,126.5 Z" fill={withAlpha(theme.gold, 0.1)} stroke={withAlpha(theme.ink, 0.15)} strokeWidth="0.5" />
                <line x1="0" y1="0" x2="190" y2="126.5" stroke={withAlpha(theme.ink, 0.15)} strokeWidth="0.5" />
                <line x1="380" y1="0" x2="190" y2="126.5" stroke={withAlpha(theme.ink, 0.15)} strokeWidth="0.5" />
                <line x1="0" y1="253" x2="190" y2="126.5" stroke={withAlpha(theme.ink, 0.15)} strokeWidth="0.5" />
                <line x1="380" y1="253" x2="190" y2="126.5" stroke={withAlpha(theme.ink, 0.15)} strokeWidth="0.5" />
                <rect x="10" y="8" width="360" height="237" fill="none" stroke={withAlpha(theme.gold, 0.22)} strokeWidth="0.8" />
                <rect x="16" y="13" width="348" height="227" fill="none" stroke={withAlpha(theme.gold, 0.1)} strokeWidth="0.4" />
                <path d="M50,230 C62,198 68,162 72,126 C76,96 78,68 80,46" fill="none" stroke={withAlpha(theme.accent, 0.18)} strokeWidth="1.4" />
                <path d="M330,230 C318,198 312,162 308,126 C304,96 302,68 300,46" fill="none" stroke={withAlpha(theme.accent, 0.18)} strokeWidth="1.4" />
              </svg>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 30 }}>
                <WaxSeal monogram={monogram} theme={theme} />
              </div>

              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '100%',
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                  zIndex: 20,
                }}
                animate={{ rotateX: phase === 'sealed' ? 0 : -168 }}
                transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    clipPath: 'polygon(0 0, 100% 0, 50% 50%)',
                    background: `linear-gradient(150deg, ${theme.accent} 0%, ${theme.accentDeep} 45%, ${theme.accentDarkest} 100%)`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                />
                <svg
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', clipPath: 'polygon(0 0, 100% 0, 50% 50%)', backfaceVisibility: 'hidden' }}
                  viewBox="0 0 380 253"
                  preserveAspectRatio="none"
                >
                  <line x1="4" y1="2" x2="190" y2="122" stroke={withAlpha(theme.gold, 0.28)} strokeWidth="0.8" />
                  <line x1="376" y1="2" x2="190" y2="122" stroke={withAlpha(theme.gold, 0.28)} strokeWidth="0.8" />
                  <path d="M190,36 L200,50 L190,64 L180,50 Z" fill="none" stroke={withAlpha(theme.gold, 0.4)} strokeWidth="0.9" />
                  <circle cx="190" cy="50" r="2.5" fill={withAlpha(theme.gold, 0.3)} />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          <AnimatePresence>
            {phase === 'sealed' && (
              <motion.button
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                onClick={handleOpen}
                className="relative z-10 mt-9 flex flex-col items-center gap-3 cursor-pointer"
                style={{ background: 'none', border: 'none', padding: 0 }}
                aria-label="Open invitation"
              >
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M1 1L10 10L19 1" stroke={withAlpha(theme.accent, 0.45)} strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </motion.div>
                <p
                  style={{
                    fontFamily: 'var(--invite-label)',
                    fontSize: 'clamp(0.6rem, 2vw, 0.72rem)',
                    letterSpacing: '0.42em',
                    textTransform: 'uppercase',
                    color: withAlpha(theme.ink, 0.75),
                    fontWeight: 300,
                  }}
                >
                  Please Open
                </p>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
