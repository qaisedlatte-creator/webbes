'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { stagger, fadeUp } from '@/lib/templates/animations'
import type { ColorPreset } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'

interface Props {
  photos: string[]
  eventLabel: string
  theme: ColorPreset
}

export default function Gallery({ photos, eventLabel, theme }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % photos.length))
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, photos.length])

  if (photos.length === 0) return null

  return (
    <section className="relative py-10 md:py-16 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <motion.div variants={fadeUp} className="flex flex-col items-center mb-8">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ background: withAlpha(theme.gold, 0.1), border: `1px solid ${withAlpha(theme.gold, 0.28)}` }}
            >
              <Camera size={18} color={theme.gold} />
            </div>
            <p className="tracking-[0.32em] text-xs uppercase mb-2" style={{ fontFamily: 'var(--invite-label)', color: theme.label, fontWeight: 300 }}>
              Our Story
            </p>
            <h3 style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)', color: theme.ink, fontWeight: 400 }}>Moments Before {eventLabel}</h3>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setOpen(i)}
                className="relative overflow-hidden rounded-[14px] group"
                style={{ aspectRatio: '1 / 1', border: `1px solid ${withAlpha(theme.gold, 0.2)}` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: withAlpha(theme.ink, 0.15) }}
                />
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={() => setOpen(null)}
          >
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute top-5 right-5 text-white/70 hover:text-white p-2">
              <X size={22} />
            </button>

            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))
                }}
                aria-label="Previous photo"
                className="absolute left-3 md:left-6 text-white/70 hover:text-white p-2"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            <motion.img
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={photos[open]}
              alt=""
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen((i) => (i === null ? i : (i + 1) % photos.length))
                }}
                aria-label="Next photo"
                className="absolute right-3 md:right-6 text-white/70 hover:text-white p-2"
              >
                <ChevronRight size={28} />
              </button>
            )}

            <p className="absolute bottom-5 text-white/50 text-xs">
              {open + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
