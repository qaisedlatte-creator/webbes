'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getVariant } from '@/lib/templates/posterVariants'
import { BASE_PRICE_INR, formatINR } from '@/lib/templates/pricing'

interface Props {
  variantId: string | null
  onClose: () => void
}

export default function PhonePreview({ variantId, onClose }: Props) {
  useEffect(() => {
    if (!variantId) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [variantId, onClose])

  const variant = variantId ? getVariant(variantId) : undefined

  return (
    <AnimatePresence>
      {variant && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] flex flex-col items-center justify-center px-4 py-8"
          style={{ background: 'rgba(10,8,6,0.85)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="absolute top-5 right-5 text-white/70 hover:text-white rounded-full p-2"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <X size={18} />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-5"
          >
            {/* Phone frame */}
            <div
              className="relative overflow-hidden"
              style={{
                width: 'min(84vw, 320px)',
                height: 'min(76vh, 660px)',
                borderRadius: 40,
                border: '10px solid #0a0a0a',
                background: '#0a0a0a',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 z-10"
                style={{ width: 110, height: 22, background: '#0a0a0a', borderRadius: '0 0 14px 14px' }}
              />
              <iframe
                key={variant.id}
                src={`/templates/demo/${variant.id}?skip=1`}
                title={`${variant.label} preview`}
                className="w-full h-full border-0"
                style={{ borderRadius: 30 }}
              />
            </div>

            <div className="text-center">
              <p className="text-white font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>{variant.label}</p>
              <p className="text-white/50 text-sm mt-0.5">This is exactly what your guests will see</p>
            </div>

            <Link
              href={`/templates/build/${variant.id}/start`}
              className="px-6 py-3 rounded-full text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #8B1A1A, #5C0E0E)' }}
            >
              Use this style — {formatINR(BASE_PRICE_INR)}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
