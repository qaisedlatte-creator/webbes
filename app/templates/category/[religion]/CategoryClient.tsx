'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import type { TemplateVariant } from '@/lib/templates/posterVariants'
import type { Religion } from '@/lib/templates/types'

const VP = { once: true, margin: '-60px' } as const

export default function CategoryClient({ religion, label, variants }: { religion: Religion; label: string; variants: TemplateVariant[] }) {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <section className="px-6 pt-32 pb-14 md:pt-40 md:pb-16 text-center" style={{ background: '#f7f5f0' }}>
        <Link href="/templates" className="text-xs text-black/40 hover:text-black/70 mb-6 inline-block">← All categories</Link>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.5px' }}>
          {label} Wedding Invitations
        </h1>
        <p className="mt-3 mx-auto max-w-md text-[15px]" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(10,10,10,0.55)' }}>
          Pick a style, or upload your own photo and build on that instead.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {variants.map((v, i) => (
            <motion.div key={v.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}>
              <Link
                href={`/templates/build/${v.id}`}
                className="group block rounded-2xl overflow-hidden border border-black/8 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ background: '#fff' }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image src={v.thumbnail} alt={v.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 text-left">
                  <p className="text-[11px] uppercase tracking-[0.2em] mb-1 font-semibold text-black/40">
                    {v.kind === 'poster' ? 'Fixed background' : 'Customizable colors'}
                  </p>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#0a0a0a' }}>{v.label}</p>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Custom tile — upload your own photo, always last */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5, ease: 'easeOut', delay: variants.length * 0.06 }}>
            <Link
              href={`/templates/build/custom?religion=${religion}`}
              className="group flex flex-col items-center justify-center h-full min-h-[220px] rounded-2xl border-2 border-dashed border-black/15 transition-all hover:-translate-y-1 hover:border-black/30"
              style={{ background: '#faf9f6' }}
            >
              <Upload size={22} className="text-black/30 mb-3" />
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#0a0a0a' }}>Custom</p>
              <p className="text-[13px] text-black/45 mt-1 px-6 text-center">Upload your own photo as the background</p>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
