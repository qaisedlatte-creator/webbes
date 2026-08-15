'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/components/templates-storefront/Hero'
import FilterBar from '@/components/templates-storefront/FilterBar'
import TemplateGrid from '@/components/templates-storefront/TemplateGrid'
import PhonePreview from '@/components/templates-storefront/PhonePreview'
import HowItWorks from '@/components/templates-storefront/HowItWorks'
import FeaturesGrid from '@/components/templates-storefront/FeaturesGrid'
import FAQ from '@/components/templates-storefront/FAQ'
import { buildGridItems, filterByReligion } from '@/components/templates-storefront/gridItems'
import type { Religion } from '@/lib/templates/types'

const VP = { once: true, margin: '-60px' } as const
const ALL_ITEMS = buildGridItems()

export default function GalleryClient() {
  const [filter, setFilter] = useState<Religion | 'all'>('all')
  const [previewId, setPreviewId] = useState<string | null>(null)

  const items = useMemo(() => filterByReligion(ALL_ITEMS, filter), [filter])

  return (
    <div style={{ background: '#ffffff' }}>
      <Hero />

      <section id="browse-templates" className="max-w-5xl mx-auto px-6 py-20 md:py-28 scroll-mt-20">
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex items-center gap-2.5 mb-4"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.32)' }}
        >
          <span style={{ width: 18, height: 1, background: 'rgba(10,10,10,0.32)', display: 'inline-block' }} />
          Browse templates
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.5px', marginBottom: 32 }}
        >
          Tap any style to preview it on your phone.
        </motion.h2>

        <div className="mb-10">
          <FilterBar active={filter} onChange={setFilter} />
        </div>

        <TemplateGrid items={items} onPreview={setPreviewId} />
      </section>

      <HowItWorks />
      <FeaturesGrid />
      <FAQ />

      <PhonePreview variantId={previewId} onClose={() => setPreviewId(null)} />
    </div>
  )
}
