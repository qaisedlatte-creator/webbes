'use client'

import TemplateCard from './TemplateCard'
import type { GridItem } from './gridItems'

interface Props {
  items: GridItem[]
  onPreview: (variantId: string) => void
}

export default function TemplateGrid({ items, onPreview }: Props) {
  if (items.length === 0) {
    return <p className="text-center text-sm text-black/40 py-16">No styles in this category yet.</p>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <TemplateCard key={item.kind === 'variant' ? item.variant.id : `custom-${item.religion}`} item={item} delay={(i % 6) * 0.06} onPreview={onPreview} />
      ))}
    </div>
  )
}
