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
import ScrollParallax from './ScrollParallax'
import RSVP from './RSVP'
import type { ColorPreset, InviteData, Religion } from '@/lib/templates/types'
import { getPreset, RELIGION_TERMINOLOGY, RELIGION_MUSIC, RELIGION_DEFAULT_BACKGROUND } from '@/lib/templates/religion-themes'
import { formatDateLong, formatDateDotted } from '@/lib/templates/date'

interface Props {
  religion: Religion
  data: InviteData
  /** Show the "PREVIEW — pay to unlock" overlay (unpaid drafts). */
  watermark?: boolean
  /** Skip the envelope-reveal gate — used for the live editor preview pane. */
  skipReveal?: boolean
  /** Poster variants supply their own derived palette instead of a color preset. */
  themeOverride?: ColorPreset
  /** Poster variants force their fixed asset as the background, ignoring the uploaded photo. */
  forcedBackground?: string
  /** Shows the RSVP form — only meaningful together with inviteId. */
  rsvpEnabled?: boolean
  /** Real saved invite id, needed for the RSVP form to actually submit. */
  inviteId?: string
}

function initials(name: string) {
  return name.trim().charAt(0).toUpperCase() || '?'
}

export default function InviteTemplate({ religion, data, watermark = false, skipReveal = false, themeOverride, forcedBackground, rsvpEnabled = false, inviteId }: Props) {
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

  const theme = themeOverride ?? getPreset(religion, data.colorPresetId)
  const terminology = RELIGION_TERMINOLOGY[religion]
  const music = RELIGION_MUSIC[religion]
  // "brideName"/"groomName" below are purely positional (first/second) —
  // nameOrder swaps which real name lands in which slot.
  const [firstName, secondName] =
    data.nameOrder === 'groomFirst' ? [data.groomName || 'Groom', data.brideName || 'Bride'] : [data.brideName || 'Bride', data.groomName || 'Groom']
  const monogram = `${initials(firstName)} & ${initials(secondName)}`
  const eventLabel = data.eventLabel || terminology.eventLabel
  const heroSubtitle = data.heroSubtitle || terminology.heroSubtitle
  const closingLine = data.closingLine || terminology.closingLine
  const footerBlessing = data.footerBlessing || terminology.footerBlessing
  const audioSrc = data.audioUrl || music.src
  const backgroundImage = forcedBackground ?? data.photoUrl ?? RELIGION_DEFAULT_BACKGROUND[religion]
  // Stock assets (fixed poster backgrounds, or the default when no photo is
  // uploaded yet) have their own baked-in text/faces that must be masked
  // more heavily than a customer's own clean uploaded photo would need.
  const usingStockAsset = Boolean(forcedBackground) || !data.photoUrl

  return (
    <div style={{ fontFamily: 'var(--invite-label)', backgroundColor: theme.bodyBg, color: theme.ink, minHeight: '100%', position: 'relative' }}>
      {!skipReveal && (
        <LoadingScreen
          brideName={firstName}
          groomName={secondName}
          monogram={monogram}
          invitationLabel={terminology.invitationLabel}
          dateDotted={formatDateDotted(data.date)}
          theme={theme}
          onComplete={onComplete}
        />
      )}

      <MusicToggle src={audioSrc} theme={theme} />

      {isLoaded && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ position: skipReveal ? 'absolute' : 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              className="invite-bg-img"
              style={
                usingStockAsset
                  ? // Full poster compositions (arch, corners, text) need to show
                    // in full like the original site, not cropped edge-to-edge.
                    { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }
                  : { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }
              }
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: usingStockAsset
                  ? `linear-gradient(180deg, ${theme.bodyBg}00 0%, ${theme.bodyBg}F0 12%, ${theme.bodyBg}F0 90%, ${theme.bodyBg}F8 100%)`
                  : `linear-gradient(180deg, ${theme.bodyBg}00 0%, ${theme.bodyBg}CC 85%)`,
              }}
            />
          </motion.div>

          {/* Explicit stacking context above the fixed background — position:fixed
              elements otherwise escape ancestor paint order in unpredictable ways. */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {data.showPetals && <PetalOverlay theme={theme} confined={skipReveal} />}

            <motion.div
              initial={skipReveal ? false : { opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <main>
                <ScrollParallax enabled={religion === 'christian'}>
                  <Hero
                    brideName={firstName}
                    groomName={secondName}
                    eventLabel={eventLabel}
                    subtitle={heroSubtitle}
                    dateLong={formatDateLong(data.date)}
                    theme={theme}
                  />
                </ScrollParallax>
                {data.showWeddingDetails && (
                  <WeddingDetails date={data.date} time={data.time || '4:00 PM'} eventLabel={eventLabel} closingLine={closingLine} theme={theme} />
                )}
                {data.showCountdown && <Countdown date={data.date} time={data.time || '4:00 PM'} theme={theme} />}
                {data.showLocation && (
                  <Location
                    venue={data.venue || 'Venue to be announced'}
                    venueCity={data.venueCity || ''}
                    date={data.date}
                    eventLabel={eventLabel}
                    mapsUrl={data.mapsUrl}
                    theme={theme}
                    scrollStyle={religion === 'christian' ? 'slide' : 'scale'}
                  />
                )}
                {rsvpEnabled && inviteId && <RSVP inviteId={inviteId} theme={theme} style={data.rsvpStyle} />}
                {data.showFooter && (
                  <Footer brideName={firstName} groomName={secondName} date={data.date} footerBlessing={footerBlessing} religion={religion} theme={theme} />
                )}
              </main>
            </motion.div>
          </div>
        </>
      )}

      {watermark && <Watermark theme={theme} />}
    </div>
  )
}
