'use client'

import { motion } from 'framer-motion'
import { heroContainer, heroItem } from '@/lib/templates/animations'
import type { ColorPreset } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'

interface Props {
  brideName: string
  groomName: string
  eventLabel: string
  subtitle: string
  dateLong: string
  theme: ColorPreset
}

export default function Hero({ brideName, groomName, eventLabel, subtitle, dateLong, theme }: Props) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 65% at 50% 38%, ${withAlpha(theme.cardBg, 0.18)} 0%, transparent 72%)` }}
      />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center w-full max-w-xs mx-auto px-6"
        style={{ paddingTop: '22vh' }}
      >
        <motion.div variants={heroItem} className="mb-5">
          <span
            className="tracking-[0.42em] uppercase"
            style={{
              fontFamily: 'var(--invite-label)',
              fontSize: '0.6rem',
              color: withAlpha(theme.ink, 0.75),
              fontWeight: 300,
              border: `1px solid ${withAlpha(theme.accent, 0.35)}`,
              padding: '4px 20px',
            }}
          >
            {eventLabel}
          </span>
        </motion.div>

        <motion.p
          variants={heroItem}
          className="italic leading-relaxed mb-8"
          style={{ fontFamily: 'var(--invite-serif)', fontSize: 'clamp(0.78rem, 2.2vw, 0.95rem)', color: withAlpha(theme.ink, 0.65), maxWidth: '220px' }}
        >
          {subtitle}
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="italic font-light leading-none"
          style={{ fontFamily: 'var(--invite-serif)', fontSize: 'clamp(3rem, 11vw, 5rem)', color: theme.ink, letterSpacing: '-0.01em' }}
        >
          {brideName}
        </motion.h1>

        <motion.div variants={heroItem} className="flex items-center justify-center gap-4 my-3 w-full max-w-[180px]">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(theme.accent, 0.3)})` }} />
          <span className="italic" style={{ fontFamily: 'var(--invite-serif)', fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: theme.accent, opacity: 0.7 }}>&amp;</span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${withAlpha(theme.accent, 0.3)})` }} />
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="italic font-light leading-none"
          style={{ fontFamily: 'var(--invite-serif)', fontSize: 'clamp(3rem, 11vw, 5rem)', color: theme.ink, letterSpacing: '-0.01em' }}
        >
          {groomName}
        </motion.h1>

        <motion.div variants={heroItem} className="flex items-center justify-center gap-3 mt-6 mb-5 w-full max-w-[200px]">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(theme.gold, 0.45)})` }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: theme.gold, opacity: 0.55 }} />
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${withAlpha(theme.gold, 0.45)})` }} />
        </motion.div>

        <motion.p
          variants={heroItem}
          className="tracking-[0.32em] uppercase"
          style={{ fontFamily: 'var(--invite-label)', fontSize: 'clamp(0.55rem, 1.8vw, 0.68rem)', color: withAlpha(theme.ink, 0.6), fontWeight: 300 }}
        >
          {dateLong}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-4 h-7 rounded-full border flex justify-center pt-1" style={{ borderColor: withAlpha(theme.accent, 0.35) }}>
          <motion.div
            className="w-0.5 rounded-full"
            style={{ background: theme.accent, height: '8px' }}
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
        <svg width="14" height="8" viewBox="0 0 20 12" fill="none">
          <path d="M1 1L10 10L19 1" stroke={withAlpha(theme.accent, 0.5)} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </motion.div>
    </section>
  )
}
