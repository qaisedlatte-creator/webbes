'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import type { PosterAccent } from '@/lib/templates/posterVariants'
import type { InviteData, Religion } from '@/lib/templates/types'
import { RELIGION_TERMINOLOGY, RELIGION_MUSIC } from '@/lib/templates/religion-themes'
import { withAlpha } from '@/lib/templates/color'
import { formatDateParts, formatDateLong } from '@/lib/templates/date'
import Watermark from '@/components/templates/template-01/Watermark'
import MusicToggle from '@/components/templates/template-01/MusicToggle'

interface Props {
  religion: Religion
  data: InviteData
  backgroundImage: string
  accent: PosterAccent
  watermark?: boolean
}

export default function PosterTemplate({ religion, data, backgroundImage, accent, watermark = false }: Props) {
  const terminology = RELIGION_TERMINOLOGY[religion]
  const music = RELIGION_MUSIC[religion]
  const { weekday, day, month, year } = formatDateParts(data.date)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${data.venue || ''}, ${data.venueCity || ''}`)}`

  // themed pseudo-preset so MusicToggle (which expects the full ColorPreset shape) still works
  const musicTheme = {
    id: 'poster',
    name: 'Poster',
    ink: accent.ink,
    accent: accent.accent,
    accentDeep: accent.accent,
    accentDarkest: accent.ink,
    gold: accent.gold,
    goldBright: accent.gold,
    label: accent.gold,
    cardBg: accent.cardBg,
    bodyBg: accent.cardBg,
    pageBgStops: [accent.cardBg, accent.cardBg, accent.cardBg, accent.cardBg] as [string, string, string, string],
    petalPrimary: accent.accent,
    petalSecondary: accent.ink,
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ fontFamily: 'var(--invite-label)', backgroundColor: accent.ink }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center top' }}
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${withAlpha(accent.ink, 0.08)} 0%, ${withAlpha(accent.ink, 0.18)} 100%)` }} />

      <MusicToggle src={music.src} theme={musicTheme} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-10 flex items-center justify-center min-h-screen p-[6%]"
      >
        <div
          className="w-full max-w-md rounded-[28px] flex flex-col items-center text-center px-6 py-10 md:px-10 md:py-12"
          style={{
            background: withAlpha(accent.cardBg, 0.92),
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid ${withAlpha(accent.gold, 0.35)}`,
            boxShadow: `0 20px 60px ${withAlpha(accent.ink, 0.35)}`,
          }}
        >
          <p
            className="uppercase tracking-[0.32em] mb-4"
            style={{ fontFamily: 'var(--invite-label)', fontSize: '0.62rem', color: withAlpha(accent.accent, 0.75), fontWeight: 500 }}
          >
            {terminology.invitationLabel}
          </p>

          <p
            className="italic mb-6 max-w-[85%]"
            style={{ fontFamily: 'var(--invite-serif)', fontSize: '0.95rem', color: withAlpha(accent.ink, 0.7), lineHeight: 1.5 }}
          >
            {terminology.heroSubtitle}
          </p>

          <h1
            style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(1.9rem, 6vw, 2.6rem)', color: accent.ink, fontWeight: 700, lineHeight: 1.15 }}
          >
            {data.brideName || 'Bride'}
          </h1>
          <span style={{ fontFamily: 'var(--invite-script)', fontSize: '1.6rem', color: accent.gold, margin: '4px 0' }}>&amp;</span>
          <h1
            style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(1.9rem, 6vw, 2.6rem)', color: accent.ink, fontWeight: 700, lineHeight: 1.15, marginBottom: 24 }}
          >
            {data.groomName || 'Groom'}
          </h1>

          <div className="flex items-center gap-3 w-full max-w-[220px] mb-8">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(accent.gold, 0.6)})` }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: accent.gold }} />
            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${withAlpha(accent.gold, 0.6)})` }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mb-8">
            <div className="flex flex-col items-center gap-1.5">
              <Calendar size={16} color={accent.gold} />
              <p style={{ fontFamily: 'var(--invite-label)', fontSize: '0.62rem', color: withAlpha(accent.ink, 0.55), letterSpacing: '0.1em', textTransform: 'uppercase' }}>{weekday}</p>
              <p style={{ fontFamily: 'var(--invite-heading)', fontSize: '1rem', color: accent.ink, fontWeight: 600 }}>{day} {month.slice(0, 3)} {year}</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Clock size={16} color={accent.gold} />
              <p style={{ fontFamily: 'var(--invite-label)', fontSize: '0.62rem', color: withAlpha(accent.ink, 0.55), letterSpacing: '0.1em', textTransform: 'uppercase' }}>Time</p>
              <p style={{ fontFamily: 'var(--invite-heading)', fontSize: '1rem', color: accent.ink, fontWeight: 600 }}>{data.time || 'TBA'}</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <MapPin size={16} color={accent.gold} />
              <p style={{ fontFamily: 'var(--invite-label)', fontSize: '0.62rem', color: withAlpha(accent.ink, 0.55), letterSpacing: '0.1em', textTransform: 'uppercase' }}>Venue</p>
              <p style={{ fontFamily: 'var(--invite-heading)', fontSize: '0.9rem', color: accent.ink, fontWeight: 600 }}>{data.venue || 'TBA'}</p>
            </div>
          </div>

          <p className="italic mb-1" style={{ fontFamily: 'var(--invite-serif)', fontSize: '0.85rem', color: withAlpha(accent.ink, 0.55) }}>
            {formatDateLong(data.date)}{data.venueCity ? ` · ${data.venueCity}` : ''}
          </p>

          <p className="italic mt-4 mb-6" style={{ fontFamily: 'var(--invite-serif)', fontSize: '0.85rem', color: withAlpha(accent.accent, 0.7) }}>
            {terminology.closingLine}
          </p>

          {data.venue && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.15em]"
              style={{ fontFamily: 'var(--invite-label)', background: accent.ink, color: accent.cardBg, fontWeight: 500 }}
            >
              <MapPin size={12} />
              View on Map
              <ExternalLink size={10} />
            </a>
          )}
        </div>
      </motion.div>

      {watermark && <Watermark theme={musicTheme} />}
    </div>
  )
}
