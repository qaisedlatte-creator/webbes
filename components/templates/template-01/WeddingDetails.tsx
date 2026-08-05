'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { stagger, fadeUp } from '@/lib/templates/animations'
import { useConfetti, ConfettiRenderer } from './Confetti'
import type { ColorPreset } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'
import { formatDateParts } from '@/lib/templates/date'

interface Props {
  date: string
  time: string
  eventLabel: string
  closingLine: string
  theme: ColorPreset
}

function WaxSeal({ onClick, theme }: { onClick: () => void; theme: ColorPreset }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        onClick={onClick}
        className="relative w-36 h-36 rounded-full cursor-pointer flex items-end justify-center pb-4"
        animate={{
          scale: [1, 1.045, 1],
          boxShadow: [
            `0 0 0 0 ${withAlpha(theme.gold, 0)}`,
            `0 0 0 18px ${withAlpha(theme.gold, 0.12)}`,
            `0 0 0 0 ${withAlpha(theme.gold, 0)}`,
          ],
        }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        whileTap={{ scale: 0.92, transition: { duration: 0.15 } }}
        aria-label="Reveal wedding invitation details"
      >
        <svg viewBox="0 0 144 144" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="waxBody" cx="38%" cy="32%" r="72%">
              <stop offset="0%" stopColor={withAlpha(theme.accent, 0.55)} />
              <stop offset="100%" stopColor={withAlpha(theme.accentDarkest, 0.75)} />
            </radialGradient>
          </defs>
          <circle cx="72" cy="72" r="70" fill="none" stroke={theme.gold} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.45" />
          <circle cx="72" cy="72" r="62" fill={theme.accentDarkest} />
          <circle cx="72" cy="72" r="62" fill="url(#waxBody)" />
          <circle cx="72" cy="72" r="58" fill="none" stroke={theme.gold} strokeWidth="0.9" opacity="0.4" />
          <g transform="translate(28,28) scale(1.1)">
            <path d="M40,10 L70,40 L40,70 L10,40 Z" fill="none" stroke={theme.gold} strokeWidth="1.1" opacity="0.65" />
            <path d="M40,25 L55,40 L40,55 L25,40 Z" fill="none" stroke={theme.gold} strokeWidth="0.7" opacity="0.42" />
            <circle cx="40" cy="40" r="5.5" fill="none" stroke={theme.gold} strokeWidth="0.7" opacity="0.35" />
            <circle cx="40" cy="40" r="2.2" fill={theme.gold} opacity="0.38" />
          </g>
          <ellipse cx="52" cy="48" rx="16" ry="8" fill="rgba(255,255,255,0.04)" transform="rotate(-30 52 48)" />
        </svg>
        <span className="relative z-10 tracking-[0.35em] uppercase" style={{ fontFamily: 'var(--invite-heading)', fontSize: '0.58rem', color: withAlpha(theme.gold, 0.65) }}>
          Open
        </span>
      </motion.button>

      <motion.p
        className="italic"
        style={{ fontFamily: 'var(--invite-serif)', fontSize: '0.9rem', color: withAlpha(theme.ink, 0.55) }}
        animate={{ opacity: [0.38, 0.85, 0.38] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        Tap to open your invitation
      </motion.p>
    </div>
  )
}

function IconBox({ children, theme }: { children: React.ReactNode; theme: ColorPreset }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
      style={{ background: withAlpha(theme.gold, 0.1), border: `1px solid ${withAlpha(theme.gold, 0.28)}` }}
    >
      {children}
    </div>
  )
}

export default function WeddingDetails({ date, time, eventLabel, closingLine, theme }: Props) {
  const [revealed, setRevealed] = useState(false)
  const sealWrapRef = useRef<HTMLDivElement>(null)
  const { particles, trigger } = useConfetti()
  const { weekday, day, month, year } = formatDateParts(date)

  const handleReveal = () => {
    if (revealed) return
    if (sealWrapRef.current) {
      const r = sealWrapRef.current.getBoundingClientRect()
      trigger(r.left + r.width / 2, r.top + r.height / 2)
    } else {
      trigger()
    }
    setRevealed(true)
  }

  return (
    <section id="details" className="relative py-24 md:py-36 overflow-hidden">
      <ConfettiRenderer particles={particles} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.p variants={fadeUp} className="tracking-[0.32em] text-xs uppercase mb-5" style={{ fontFamily: 'var(--invite-heading)', color: theme.label }}>
            You Are Invited
          </motion.p>

          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: theme.ink, lineHeight: 1, fontWeight: 400 }}>
            {eventLabel} Day
          </motion.h2>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mt-5 mb-14">
            <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(theme.gold, 0.42)})` }} />
            <span style={{ color: theme.gold, fontSize: '8px' }}>✦</span>
            <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${withAlpha(theme.gold, 0.42)})` }} />
          </motion.div>

          <motion.div variants={fadeUp} className="relative">
            <motion.div
              animate={{ filter: revealed ? 'blur(0px)' : 'blur(15px)', opacity: revealed ? 1 : 0.2, scale: revealed ? 1 : 0.97 }}
              transition={{ duration: 1.3, delay: revealed ? 0.45 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-0">
                <div
                  className="hidden md:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
                  style={{ background: `linear-gradient(to right, transparent 0%, ${withAlpha(theme.gold, 0.3)} 30%, ${withAlpha(theme.gold, 0.3)} 70%, transparent 100%)` }}
                />

                <div className="flex-1 relative z-10">
                  <div
                    className="inline-block md:block p-8 md:p-10 rounded-[18px]"
                    style={{ background: withAlpha(theme.cardBg, 0.88), border: `1px solid ${withAlpha(theme.gold, 0.22)}`, boxShadow: `0 8px 40px ${withAlpha(theme.accentDarkest, 0.12)}` }}
                  >
                    <IconBox theme={theme}><Calendar size={20} color={theme.gold} /></IconBox>
                    <p className="tracking-[0.28em] text-xs uppercase mb-3" style={{ fontFamily: 'var(--invite-label)', color: theme.label, fontWeight: 300 }}>Date</p>
                    <p className="italic" style={{ fontFamily: 'var(--invite-serif)', fontSize: 'clamp(1.2rem, 3.5vw, 1.7rem)', color: theme.ink }}>{weekday}</p>
                    <p className="leading-none" style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(3rem, 8vw, 5rem)', color: theme.accent, fontWeight: 400 }}>{day}</p>
                    <p className="tracking-widest" style={{ fontFamily: 'var(--invite-serif)', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: theme.ink }}>{month} {year}</p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center z-10 relative">
                  <div className="w-5 h-5 rotate-45" style={{ background: theme.gold, boxShadow: `0 0 20px ${withAlpha(theme.gold, 0.6)}` }} />
                </div>

                <div className="flex-1 relative z-10">
                  <div
                    className="inline-block md:block p-8 md:p-10 rounded-[18px]"
                    style={{ background: withAlpha(theme.cardBg, 0.88), border: `1px solid ${withAlpha(theme.gold, 0.22)}`, boxShadow: `0 8px 40px ${withAlpha(theme.accentDarkest, 0.12)}` }}
                  >
                    <IconBox theme={theme}><Clock size={20} color={theme.gold} /></IconBox>
                    <p className="tracking-[0.28em] text-xs uppercase mb-3" style={{ fontFamily: 'var(--invite-label)', color: theme.label, fontWeight: 300 }}>Time</p>
                    <p className="italic" style={{ fontFamily: 'var(--invite-serif)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: theme.accent }}>{time}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {!revealed && (
                <motion.div
                  exit={{ opacity: 0, scale: 0, rotate: 60, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                  className="absolute inset-0 flex items-center justify-center z-20 py-8"
                >
                  <div ref={sealWrapRef}>
                    <WaxSeal onClick={handleReveal} theme={theme} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.8 }}
                  className="mt-12 flex flex-col items-center gap-3"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(theme.gold, 0.4)})` }} />
                    <span style={{ color: theme.gold, fontSize: '8px' }}>✦</span>
                    <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${withAlpha(theme.gold, 0.4)})` }} />
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="italic"
                    style={{ fontFamily: 'var(--invite-serif)', fontSize: '0.9rem', color: withAlpha(theme.ink, 0.6) }}
                  >
                    {closingLine}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
