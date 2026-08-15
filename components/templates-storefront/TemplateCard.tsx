'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { BASE_PRICE_INR, formatINR } from '@/lib/templates/pricing'
import type { GridItem } from './gridItems'

const RELIGION_LABEL: Record<string, string> = { islamic: 'Islamic', hindu: 'Hindu', christian: 'Christian' }

interface Props {
  item: GridItem
  delay: number
  onPreview: (variantId: string) => void
}

export default function TemplateCard({ item, delay, onPreview }: Props) {
  if (item.kind === 'custom') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut', delay }}
      >
        <Link
          href={`/templates/build/custom/start?religion=${item.religion}`}
          className="group flex flex-col items-center justify-center h-full min-h-[240px] rounded-2xl border-2 border-dashed border-black/15 transition-all hover:-translate-y-1 hover:border-black/30 text-center px-6"
          style={{ background: '#faf9f6' }}
        >
          <Upload size={22} className="text-black/30 mb-3" />
          <p className="text-[11px] uppercase tracking-[0.2em] mb-1 font-semibold text-black/40">{RELIGION_LABEL[item.religion]} · Custom</p>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#0a0a0a' }}>Upload your own photo</p>
          <p className="text-[13px] font-semibold mt-2" style={{ color: '#2563EB' }}>{formatINR(BASE_PRICE_INR)}</p>
        </Link>
      </motion.div>
    )
  }

  const { variant } = item
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      <button
        onClick={() => onPreview(variant.id)}
        className="group block w-full text-left rounded-2xl overflow-hidden border border-black/8 transition-all hover:-translate-y-1 hover:shadow-xl"
        style={{ background: '#fff' }}
      >
        <div className="relative h-56 overflow-hidden">
          <Image src={variant.thumbnail} alt={variant.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ background: 'rgba(10,10,10,0.35)' }}>
            <span className="text-white text-[13px] font-semibold px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}>
              Tap to preview
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-1 font-semibold text-black/40">
            {RELIGION_LABEL[variant.religion]} · {variant.kind === 'poster' ? 'Fixed background' : 'Customizable colors'}
          </p>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#0a0a0a' }}>{variant.label}</p>
          <p className="text-[13px] font-semibold mt-1" style={{ color: '#2563EB' }}>{formatINR(BASE_PRICE_INR)}</p>
        </div>
      </button>
    </motion.div>
  )
}
