'use client'

import { MapPin, ClipboardCheck, Timer, Palette, Music, Link2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { RSVP_ADDON_PRICE_INR, SONG_ADDON_PRICE_INR, formatINR } from '@/lib/templates/pricing'

const VP = { once: true, margin: '-60px' } as const

const FEATURES = [
  { icon: MapPin, title: 'Map navigation', body: 'Paste your Google Maps link — guests tap and get one-tap directions to the venue.' },
  { icon: ClipboardCheck, title: 'Live RSVP tracking', body: `See who's coming from a private dashboard. Add-on, ${formatINR(RSVP_ADDON_PRICE_INR)}.` },
  { icon: Timer, title: 'Countdown timer', body: 'A live countdown to the big day, built into every template.' },
  { icon: Palette, title: 'Religion-authentic themes', body: 'Colors, script and blessings matched to Nikah, Vivaha or Wedding traditions.' },
  { icon: Music, title: 'Custom song', body: `Swap in your own track instead of the default. Add-on, ${formatINR(SONG_ADDON_PRICE_INR)}.` },
  { icon: Link2, title: 'One shareable link', body: 'Works anywhere WhatsApp does — no app, no download for your guests.' },
] as const

export default function FeaturesGrid() {
  return (
    <section className="px-6 py-20 md:py-28" style={{ background: '#faf9f6' }}>
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex items-center gap-2.5 mb-4"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.32)' }}
        >
          <span style={{ width: 18, height: 1, background: 'rgba(10,10,10,0.32)', display: 'inline-block' }} />
          What you get
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.5px', marginBottom: 44 }}
        >
          Everything a proper invitation needs.
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: 'easeOut', delay: (i % 6) * 0.06 }}
              className="rounded-2xl p-6 border border-black/8"
              style={{ background: '#fff' }}
            >
              <f.icon size={20} strokeWidth={1.75} color="#8B1A1A" />
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.02rem', fontWeight: 700, color: '#0a0a0a', marginTop: 14 }}>{f.title}</p>
              <p className="mt-2 text-[13.5px]" style={{ color: 'rgba(10,10,10,0.55)', lineHeight: 1.55 }}>{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
