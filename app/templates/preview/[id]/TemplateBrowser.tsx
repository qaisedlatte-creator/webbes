'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import TemplateRenderer from '@/components/templates/TemplateRenderer'
import { TEMPLATE_VARIANTS, type TemplateVariant } from '@/lib/templates/posterVariants'
import { RELIGIONS } from '@/lib/templates/religion-themes'
import type { InviteData, Religion } from '@/lib/templates/types'

interface Props {
  data: InviteData
  currentTemplateId: string
  onApply: (templateId: string, religion: Religion) => void
  onClose: () => void
}

// Renders the actual candidate template with the user's own entered data —
// scaled down, non-interactive — so "browsing" shows real names/dates/photos,
// not placeholder demo content.
function LiveTile({ variant, data }: { variant: TemplateVariant; data: InviteData }) {
  const w = 390
  const h = 844
  const scale = 0.42

  return (
    <div className="relative overflow-hidden rounded-xl border border-black/10" style={{ width: w * scale, height: h * scale, pointerEvents: 'none' }}>
      <div style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <TemplateRenderer templateId={variant.id} religion={variant.religion} data={data} skipReveal watermark={false} />
      </div>
    </div>
  )
}

export default function TemplateBrowser({ data, currentTemplateId, onApply, onClose }: Props) {
  const [religionFilter, setReligionFilter] = useState<Religion | 'all'>('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<TemplateVariant | null>(null)

  const filtered = useMemo(() => {
    return TEMPLATE_VARIANTS.filter((v) => {
      if (religionFilter !== 'all' && v.religion !== religionFilter) return false
      if (query.trim() && !v.label.toLowerCase().includes(query.trim().toLowerCase())) return false
      return true
    })
  }, [religionFilter, query])

  return (
    <div className="fixed inset-0 z-[400] flex flex-col" style={{ background: '#F7F5F0' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 bg-white">
        <div>
          <h2 className="text-base font-bold text-black">Change template</h2>
          <p className="text-xs text-black/40">Your names, dates and photos carry over — only the style changes.</p>
        </div>
        <button onClick={onClose} aria-label="Close" className="p-2 rounded-full hover:bg-black/5">
          <X size={18} />
        </button>
      </div>

      {/* Filters */}
      <div className="px-5 py-3 border-b border-black/10 bg-white flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
          <input
            type="text"
            placeholder="Search template names…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-full border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {([['all', 'All'], ...RELIGIONS.map((r) => [r.id, r.label] as const)] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setReligionFilter(key as Religion | 'all')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={
                religionFilter === key
                  ? { background: '#0a0a0a', color: '#fff' }
                  : { background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,0,0,0.08)' }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-black/40 py-16">No templates match "{query}".</p>
        ) : (
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
            {filtered.map((v) => (
              // Not a real <button> — LiveTile renders the full invite template
              // inside, which has its own interactive <button> elements (the
              // wax-seal reveal), and buttons can't nest inside buttons in valid HTML.
              <div
                key={v.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(v)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelected(v)
                }}
                className="text-left rounded-2xl overflow-hidden border-2 transition-all p-3 flex flex-col items-center gap-2 cursor-pointer"
                style={{
                  borderColor: v.id === currentTemplateId ? '#2563EB' : selected?.id === v.id ? '#2563EB' : 'rgba(0,0,0,0.08)',
                  background: '#fff',
                }}
              >
                <LiveTile variant={v} data={data} />
                <div className="w-full">
                  <p className="text-[13px] font-semibold text-black/85 truncate">{v.label}</p>
                  <p className="text-[11px] text-black/40 capitalize">
                    {v.religion}
                    {v.id === currentTemplateId ? ' · current' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Apply bar */}
      {selected && (
        <div className="px-5 py-4 border-t border-black/10 bg-white flex items-center justify-between gap-4">
          <p className="text-sm text-black/70">
            <span className="font-semibold">{selected.label}</span> selected
          </p>
          <div className="flex gap-2">
            <button onClick={() => setSelected(null)} className="text-sm font-semibold px-4 py-2.5 rounded-full text-black/50 border border-black/10">
              Cancel
            </button>
            <button
              onClick={() => onApply(selected.id, selected.religion)}
              disabled={selected.id === currentTemplateId}
              className="text-sm font-semibold px-5 py-2.5 rounded-full text-white disabled:opacity-40"
              style={{ background: '#2563EB' }}
            >
              Apply template
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
