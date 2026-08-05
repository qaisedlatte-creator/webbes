'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import Hero from './Hero'
import WeddingDetails from './WeddingDetails'
import Countdown from './Countdown'
import Location from './Location'
import Footer from './Footer'
import MusicToggle from './MusicToggle'
import PetalOverlay from './PetalOverlay'
import Watermark from './Watermark'
import type { InviteData, Religion } from '@/lib/templates/types'
import { getPreset, RELIGION_TERMINOLOGY, RELIGION_MUSIC } from '@/lib/templates/religion-themes'
import { formatDateLong, formatDateDotted } from '@/lib/templates/date'

interface Props {
  religion: Religion
  data: InviteData
  /** Show the "PREVIEW — pay to unlock" overlay (unpaid drafts). */
  watermark?: boolean
  /** Skip the envelope-reveal gate — used for the live editor preview pane. */
  skipReveal?: boolean
}

function initials(name: string) {
  return name.trim().charAt(0).toUpperCase() || '?'
}

export default function InviteTemplate({ religion, data, watermark = false, skipReveal = false }: Props) {
  const [isLoaded, setIsLoaded] = useState(skipReveal)
  const onComplete = useCallback(() => setIsLoaded(true), [])

  useEffect(() => {
    setIsLoaded(skipReveal)
  }, [skipReveal])

  useEffect(() => {
    if (!isLoaded || skipReveal) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const vh = window.innerHeight
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / vh, 1)
        document.documentElement.style.setProperty('--scroll-blur', `${(progress * 8).toFixed(1)}px`)
        document.documentElement.style.setProperty('--scroll-dim', `${(1 - progress * 0.25).toFixed(3)}`)
        document.documentElement.style.setProperty('--petals-opacity', `${Math.max(0, 1 - progress * 2).toFixed(3)}`)
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isLoaded, skipReveal])

  const theme = getPreset(religion, data.colorPresetId)
  const terminology = RELIGION_TERMINOLOGY[religion]
  const music = RELIGION_MUSIC[religion]
  const monogram = `${initials(data.brideName)} & ${initials(data.groomName)}`

  return (
    <div style={{ fontFamily: 'var(--invite-label)', backgroundColor: theme.bodyBg, color: theme.ink, minHeight: '100%', position: 'relative' }}>
      {!skipReveal && (
        <LoadingScreen
          brideName={data.brideName || 'Bride'}
          groomName={data.groomName || 'Groom'}
          monogram={monogram}
          invitationLabel={terminology.invitationLabel}
          dateDotted={formatDateDotted(data.date)}
          theme={theme}
          onComplete={onComplete}
        />
      )}

      <MusicToggle src={music.src} theme={theme} />

      {isLoaded && (
        <>
          {data.photoUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.photoUrl}
                alt=""
                aria-hidden="true"
                className="invite-bg-img"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${theme.bodyBg}00 0%, ${theme.bodyBg}CC 85%)` }} />
            </motion.div>
          )}

          <PetalOverlay theme={theme} />

          <motion.div
            initial={skipReveal ? false : { opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <main>
              <Hero
                brideName={data.brideName || 'Bride'}
                groomName={data.groomName || 'Groom'}
                eventLabel={terminology.eventLabel}
                subtitle={terminology.heroSubtitle}
                dateLong={formatDateLong(data.date)}
                theme={theme}
              />
              <WeddingDetails date={data.date} time={data.time || '4:00 PM'} eventLabel={terminology.eventLabel} closingLine={terminology.closingLine} theme={theme} />
              <Countdown date={data.date} time={data.time || '4:00 PM'} theme={theme} />
              <Location venue={data.venue || 'Venue to be announced'} venueCity={data.venueCity || ''} date={data.date} eventLabel={terminology.eventLabel} theme={theme} />
              <Footer brideName={data.brideName || 'Bride'} groomName={data.groomName || 'Groom'} date={data.date} footerBlessing={terminology.footerBlessing} religion={religion} theme={theme} />
            </main>
          </motion.div>
        </>
      )}

      {watermark && <Watermark theme={theme} />}
    </div>
  )
}
