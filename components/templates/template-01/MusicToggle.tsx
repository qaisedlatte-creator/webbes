'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ColorPreset } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'

export default function MusicToggle({ src, theme }: { src: string; theme: ColorPreset }) {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const startOnGesture = useCallback(() => {
    const audio = audioRef.current
    if (!audio || playing) return
    audio
      .play()
      .then(() => {
        setPlaying(true)
        document.removeEventListener('click', startOnGesture)
        document.removeEventListener('touchstart', startOnGesture)
      })
      .catch(() => {})
  }, [playing])

  useEffect(() => {
    document.addEventListener('click', startOnGesture, { once: true })
    document.addEventListener('touchstart', startOnGesture, { once: true })
    return () => {
      document.removeEventListener('click', startOnGesture)
      document.removeEventListener('touchstart', startOnGesture)
    }
  }, [startOnGesture])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={src} />
      </audio>

      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={toggle}
            aria-label={playing ? 'Pause music' : 'Play music'}
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
              zIndex: 210,
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: `1px solid ${withAlpha(theme.gold, 0.45)}`,
              background: `linear-gradient(145deg, ${withAlpha(theme.accentDarkest, 0.82)} 0%, ${withAlpha(theme.accentDeep, 0.78)} 100%)`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: `0 4px 20px ${withAlpha(theme.accentDarkest, 0.35)}, 0 0 0 1px ${withAlpha(theme.gold, 0.15)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <AnimatePresence mode="wait">
              {playing ? (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}
                >
                  {[0, 1, 2].map((bar) => (
                    <motion.span
                      key={bar}
                      style={{
                        display: 'block',
                        width: 3,
                        borderRadius: 2,
                        background: `linear-gradient(to top, ${withAlpha(theme.gold, 0.6)}, ${theme.goldBright})`,
                      }}
                      animate={{ height: ['6px', '14px', '6px'] }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay: bar * 0.15 }}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="paused"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 2.5L13 8L4 13.5V2.5Z"
                      fill="url(#gold-play)"
                      stroke={withAlpha(theme.gold, 0.5)}
                      strokeWidth="0.5"
                    />
                    <defs>
                      <linearGradient id="gold-play" x1="4" y1="2.5" x2="13" y2="13.5" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={theme.goldBright} />
                        <stop offset="100%" stopColor={theme.gold} />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
