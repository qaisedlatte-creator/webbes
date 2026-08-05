'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { stagger, fadeUp } from '@/lib/templates/animations'
import type { ColorPreset } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'
import { parseInviteDate, formatDateLong } from '@/lib/templates/date'

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function CountUnit({ value, label, theme }: { value: number; label: string; theme: ColorPreset }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex items-center justify-center relative rounded-[18px]"
        style={{
          width: 'clamp(62px, 16vw, 86px)',
          height: 'clamp(62px, 16vw, 86px)',
          background: withAlpha(theme.cardBg, 0.88),
          border: `1px solid ${withAlpha(theme.gold, 0.22)}`,
          boxShadow: `0 8px 40px ${withAlpha(theme.accentDarkest, 0.12)}`,
        }}
      >
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: withAlpha(theme.gold, 0.4) }} />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: withAlpha(theme.gold, 0.4) }} />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: withAlpha(theme.gold, 0.4) }} />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: withAlpha(theme.gold, 0.4) }} />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="tabular-nums leading-none"
            style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', color: theme.accent, fontWeight: 400 }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="tracking-[0.24em] uppercase" style={{ fontFamily: 'var(--invite-label)', fontSize: '0.58rem', color: withAlpha(theme.ink, 0.5), fontWeight: 300 }}>
        {label}
      </p>
    </div>
  )
}

function Dot({ theme }: { theme: ColorPreset }) {
  return (
    <motion.span
      className="self-center pb-5"
      style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: theme.label }}
      animate={{ opacity: [0.45, 0.85, 0.45] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      :
    </motion.span>
  )
}

export default function Countdown({ date, time, theme }: { date: string; time: string; theme: ColorPreset }) {
  const target = parseInviteDate(date)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setTimeLeft(getTimeLeft(target))
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  return (
    <section id="countdown" className="relative py-10 md:py-16 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12">
        <motion.div
          className="p-8 md:p-10 rounded-[18px]"
          style={{ background: withAlpha(theme.cardBg, 0.88), border: `1px solid ${withAlpha(theme.gold, 0.22)}`, boxShadow: `0 8px 40px ${withAlpha(theme.accentDarkest, 0.12)}` }}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-14" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(theme.gold, 0.45)})` }} />
            <div className="w-2 h-2 rotate-45" style={{ background: theme.gold, opacity: 0.5 }} />
            <div className="h-px w-14" style={{ background: `linear-gradient(to left, transparent, ${withAlpha(theme.gold, 0.45)})` }} />
          </motion.div>

          <motion.p variants={fadeUp} className="tracking-[0.32em] text-xs uppercase text-center mb-7" style={{ fontFamily: 'var(--invite-label)', color: withAlpha(theme.ink, 0.5), fontWeight: 300 }}>
            Counting Down
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-start justify-center gap-2 md:gap-3">
            <CountUnit value={timeLeft.days} label="Days" theme={theme} />
            <Dot theme={theme} />
            <CountUnit value={timeLeft.hours} label="Hrs" theme={theme} />
            <Dot theme={theme} />
            <CountUnit value={timeLeft.minutes} label="Min" theme={theme} />
            <Dot theme={theme} />
            <CountUnit value={timeLeft.seconds} label="Sec" theme={theme} />
          </motion.div>

          <motion.p variants={fadeUp} className="italic text-center mt-7" style={{ fontFamily: 'var(--invite-serif)', fontSize: '0.88rem', color: withAlpha(theme.ink, 0.42) }}>
            {formatDateLong(date)} · {time}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
