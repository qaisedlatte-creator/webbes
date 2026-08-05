'use client'

import { motion } from 'framer-motion'
import { stagger, fadeUp } from '@/lib/templates/animations'
import type { ColorPreset, Religion } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'
import { formatDateDotted } from '@/lib/templates/date'

interface Props {
  brideName: string
  groomName: string
  date: string
  footerBlessing: string
  religion: Religion
  theme: ColorPreset
}

export default function Footer({ brideName, groomName, date, footerBlessing, religion, theme }: Props) {
  return (
    <footer id="footer" className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: withAlpha(theme.cardBg, 0.88), backdropFilter: 'blur(8px)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(theme.gold, 0.3)}, transparent)` }} />

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(theme.gold, 0.4)})` }} />
            <div className="w-2.5 h-2.5 rotate-45" style={{ background: theme.gold, opacity: 0.5 }} />
            <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${withAlpha(theme.gold, 0.4)})` }} />
          </motion.div>

          <motion.p variants={fadeUp} className="tracking-[0.3em] text-xs uppercase mb-4" style={{ fontFamily: 'var(--invite-label)', color: withAlpha(theme.ink, 0.45), fontWeight: 300 }}>
            With Love
          </motion.p>

          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(1.3rem, 4vw, 2rem)', color: theme.ink, fontWeight: 400 }}>
            {brideName}
          </motion.p>

          <motion.div variants={fadeUp} className="my-3">
            <span style={{ fontFamily: 'var(--invite-script)', fontSize: 'clamp(2.2rem, 5.5vw, 3rem)', color: theme.label }}>&amp;</span>
          </motion.div>

          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(1.3rem, 4vw, 2rem)', color: theme.ink, fontWeight: 400 }}>
            {groomName}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 my-8">
            <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(theme.gold, 0.4)})` }} />
            <div className="w-2 h-2 rotate-45" style={{ background: theme.gold, opacity: 0.45 }} />
            <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${withAlpha(theme.gold, 0.4)})` }} />
          </motion.div>

          <motion.p variants={fadeUp} className="tracking-[0.28em] text-sm uppercase" style={{ fontFamily: 'var(--invite-label)', color: withAlpha(theme.ink, 0.45), fontWeight: 300, fontSize: '0.7rem' }}>
            {formatDateDotted(date)}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6"
            style={{
              fontFamily: religion === 'islamic' ? 'var(--invite-arabic)' : 'var(--invite-serif)',
              direction: religion === 'islamic' ? 'rtl' : 'ltr',
              lineHeight: religion === 'islamic' ? 2 : 1.6,
              fontSize: '0.98rem',
              fontStyle: religion === 'islamic' ? 'normal' : 'italic',
              color: withAlpha(theme.accent, 0.4),
            }}
          >
            {footerBlessing}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-10 tracking-wide" style={{ fontFamily: 'var(--invite-label)', fontSize: '0.62rem', color: withAlpha(theme.ink, 0.22), fontWeight: 300 }}>
            Made with love · {new Date().getFullYear()}
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
