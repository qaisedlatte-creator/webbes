'use client'

import { RELIGIONS } from '@/lib/templates/religion-themes'
import type { Religion } from '@/lib/templates/types'

interface Props {
  active: Religion | 'all'
  onChange: (value: Religion | 'all') => void
}

const OPTIONS: { id: Religion | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  ...RELIGIONS.map((r) => ({ id: r.id, label: r.label })),
]

export default function FilterBar({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Filter by style">
      {OPTIONS.map((opt) => {
        const isActive = opt.id === active
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.id)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              background: isActive ? '#0a0a0a' : 'rgba(10,10,10,0.05)',
              color: isActive ? '#fff' : 'rgba(10,10,10,0.6)',
              border: isActive ? '1px solid #0a0a0a' : '1px solid rgba(10,10,10,0.08)',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
