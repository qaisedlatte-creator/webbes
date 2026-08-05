'use client'

import { motion } from 'framer-motion'
import { stagger, fadeUp, scaleIn, slideUp } from '@/lib/templates/animations'
import { MapPin, ExternalLink, Navigation2 } from 'lucide-react'
import type { ColorPreset } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'
import { formatDateLong } from '@/lib/templates/date'

interface Props {
  venue: string
  venueCity: string
  date: string
  eventLabel: string
  theme: ColorPreset
  /** Christian gets a slide-up-and-blur reveal instead of the scale-in the others use. */
  scrollStyle?: 'scale' | 'slide'
  /** Pasted Google Maps link — used as-is instead of the auto-generated search query. */
  mapsUrl?: string
}

export default function Location({ venue, venueCity, date, eventLabel, theme, scrollStyle = 'scale', mapsUrl: customMapsUrl }: Props) {
  const mapsUrl = customMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue}, ${venueCity}`)}`

  return (
    <section id="location" className="relative py-10 md:py-16 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <motion.div
            variants={scrollStyle === 'slide' ? slideUp : scaleIn}
            className="overflow-hidden rounded-[18px]"
            style={{ background: withAlpha(theme.cardBg, 0.88), border: `1px solid ${withAlpha(theme.gold, 0.22)}`, boxShadow: `0 8px 40px ${withAlpha(theme.accentDarkest, 0.12)}` }}
          >
            <div className="relative h-44 md:h-56" style={{ background: theme.ink }}>
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${withAlpha(theme.ink, 0.5)} 0%, ${withAlpha(theme.ink, 0.8)} 100%)` }} />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {[80, 55, 34].map((s, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border"
                    style={{ width: s, height: s, borderColor: withAlpha(theme.gold, 0.3) }}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
                  />
                ))}
                <motion.div
                  className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldBright})`, boxShadow: `0 4px 20px ${withAlpha(theme.gold, 0.5)}` }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MapPin size={20} color={theme.cardBg} fill={withAlpha(theme.cardBg, 0.15)} />
                </motion.div>
              </div>
            </div>

            <div className="p-8 md:p-10 text-center relative">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-14" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(theme.gold, 0.45)})` }} />
                <div className="w-2 h-2 rotate-45" style={{ background: theme.gold, opacity: 0.5 }} />
                <div className="h-px w-14" style={{ background: `linear-gradient(to left, transparent, ${withAlpha(theme.gold, 0.45)})` }} />
              </div>

              <motion.div variants={fadeUp} className="flex justify-center mb-4">
                <Navigation2 size={16} color={theme.gold} opacity={0.7} />
              </motion.div>

              <motion.p variants={fadeUp} className="tracking-[0.32em] text-xs uppercase mb-3" style={{ fontFamily: 'var(--invite-label)', color: withAlpha(theme.ink, 0.5), fontWeight: 300 }}>
                Find Us Here
              </motion.p>

              <motion.h3 variants={fadeUp} className="mb-1" style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)', color: theme.ink, fontWeight: 400 }}>
                {eventLabel} Venue
              </motion.h3>

              <motion.p variants={fadeUp} className="font-semibold mb-1" style={{ fontFamily: 'var(--invite-serif)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: theme.accentDeep }}>
                {venue}
              </motion.p>

              <motion.p variants={fadeUp} className="italic mb-7" style={{ fontFamily: 'var(--invite-serif)', fontSize: '0.88rem', color: withAlpha(theme.ink, 0.5) }}>
                {formatDateLong(date)} · {venueCity}
              </motion.p>

              <motion.a
                variants={fadeUp}
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 tracking-[0.22em] text-xs uppercase px-8 py-3.5 transition-all"
                style={{
                  fontFamily: 'var(--invite-label)',
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDeep})`,
                  color: theme.cardBg,
                  borderRadius: '2px',
                  fontWeight: 300,
                  letterSpacing: '0.22em',
                  boxShadow: `0 4px 20px ${withAlpha(theme.accent, 0.22)}`,
                }}
                whileHover={{ scale: 1.02, boxShadow: `0 8px 28px ${withAlpha(theme.accent, 0.32)}` }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPin size={13} />
                Open in Google Maps
                <ExternalLink size={11} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
