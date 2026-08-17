'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { stagger, fadeUp } from '@/lib/templates/animations'
import type { ColorPreset } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'

interface Props {
  brideName: string
  groomName: string
  brideParents: string
  groomParents: string
  theme: ColorPreset
}

function ParentCard({ name, parents, label, theme }: { name: string; parents: string; label: string; theme: ColorPreset }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex-1 text-center p-7 md:p-8 rounded-[18px]"
      style={{ background: withAlpha(theme.cardBg, 0.88), border: `1px solid ${withAlpha(theme.gold, 0.22)}`, boxShadow: `0 8px 40px ${withAlpha(theme.accentDarkest, 0.1)}` }}
    >
      <p className="tracking-[0.28em] text-xs uppercase mb-3" style={{ fontFamily: 'var(--invite-label)', color: theme.label, fontWeight: 300 }}>
        {label}
      </p>
      <p className="italic mb-2" style={{ fontFamily: 'var(--invite-serif)', fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', color: theme.ink }}>
        {name}
      </p>
      <p style={{ fontFamily: 'var(--invite-serif)', fontSize: '0.85rem', color: withAlpha(theme.ink, 0.55), lineHeight: 1.6 }}>{parents}</p>
    </motion.div>
  )
}

export default function FamilyNames({ brideName, groomName, brideParents, groomParents, theme }: Props) {
  if (!brideParents.trim() && !groomParents.trim()) return null

  return (
    <section className="relative py-10 md:py-16 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-14" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(theme.gold, 0.42)})` }} />
            <Heart size={14} color={theme.gold} opacity={0.7} fill={withAlpha(theme.gold, 0.15)} />
            <div className="h-px w-14" style={{ background: `linear-gradient(to left, transparent, ${withAlpha(theme.gold, 0.42)})` }} />
          </motion.div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-6">
            {brideParents.trim() && <ParentCard name={brideName} parents={brideParents} label="Daughter of" theme={theme} />}
            {groomParents.trim() && <ParentCard name={groomName} parents={groomParents} label="Son of" theme={theme} />}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
