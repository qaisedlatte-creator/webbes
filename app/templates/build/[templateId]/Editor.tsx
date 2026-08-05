'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TemplateRenderer from '@/components/templates/TemplateRenderer'
import { RELIGION_PRESETS, RELIGIONS } from '@/lib/templates/religion-themes'
import { getVariant } from '@/lib/templates/posterVariants'
import type { InviteData, Religion } from '@/lib/templates/types'

interface Props {
  templateId: string
  initialId: string | null
  initialReligion: Religion
  initialData: InviteData
  initialWhatsapp: string | null
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export default function Editor({ templateId, initialId, initialReligion, initialData, initialWhatsapp }: Props) {
  const router = useRouter()
  const [id, setId] = useState(initialId)
  const [religion] = useState<Religion>(initialReligion)
  const [data, setData] = useState<InviteData>(initialData)
  const [whatsapp, setWhatsapp] = useState(initialWhatsapp ?? '')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [uploading, setUploading] = useState(false)
  const idRef = useRef(id)
  idRef.current = id
  const mounted = useRef(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const variant = getVariant(templateId)
  const kind = variant?.kind ?? (templateId === 'custom' ? 'custom' : 'envelope')
  const religionLabel = RELIGIONS.find((r) => r.id === religion)?.label ?? religion

  const save = useCallback(async () => {
    setSaveState('saving')
    try {
      const res = await fetch('/api/templates/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idRef.current ?? undefined, templateId, religion, data, whatsapp: whatsapp || undefined }),
      })
      if (!res.ok) throw new Error('save failed')
      const json = await res.json()
      if (!idRef.current && json.id) {
        setId(json.id)
        router.replace(`/templates/build/${templateId}?id=${json.id}`, { scroll: false })
      }
      setSaveState('saved')
    } catch {
      setSaveState('error')
    }
  }, [templateId, religion, data, whatsapp, router])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(save, 800)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [religion, data, whatsapp])

  const update = (patch: Partial<InviteData>) => setData((d) => ({ ...d, ...patch }))

  const handlePhotoUpload = async (file: File) => {
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/templates/upload', { method: 'POST', body: form })
      const json = await res.json()
      if (res.ok && json.url) update({ photoUrl: json.url })
      else alert(json.error || 'Upload failed')
    } catch {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const presets = RELIGION_PRESETS[religion]

  const PhotoSection = (
    <section>
      <h2 className="text-sm font-semibold text-black/80 mb-1">Photo</h2>
      {kind === 'custom' && !data.photoUrl && (
        <p className="text-xs text-black/40 mb-3">Upload your own background photo to build this invite on top of.</p>
      )}
      {data.photoUrl ? (
        <div className="relative rounded-lg overflow-hidden border border-black/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.photoUrl} alt="" className="w-full h-40 object-cover" />
          <button onClick={() => update({ photoUrl: null })} className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
            Remove
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center h-24 rounded-lg border border-dashed border-black/20 text-sm text-black/40 cursor-pointer hover:border-black/40">
          {uploading ? 'Uploading…' : 'Click to upload a photo'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handlePhotoUpload(f)
            }}
          />
        </label>
      )}
    </section>
  )

  return (
    <div className="min-h-screen" style={{ background: '#F7F5F0' }}>
      <div className="flex flex-col lg:flex-row lg:h-screen">
        {/* Form column */}
        <div className="w-full lg:w-[440px] lg:h-full lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-black/10 bg-white">
          <div className="px-6 py-6 border-b border-black/5 flex items-center justify-between">
            <Link href={`/templates/category/${religion}`} className="text-sm text-black/50 hover:text-black">← Back</Link>
            <span className="text-xs text-black/40">
              {saveState === 'saving' && 'Saving…'}
              {saveState === 'saved' && 'Saved'}
              {saveState === 'error' && 'Could not save'}
            </span>
          </div>

          <div className="px-6 pt-5">
            <p className="text-[11px] uppercase tracking-[0.15em] font-semibold" style={{ color: '#2563EB' }}>
              {religionLabel} · {variant?.label ?? 'Custom'}
            </p>
          </div>

          <div className="px-6 py-6 space-y-8">
            {/* Custom flow: photo comes first, before anything else */}
            {kind === 'custom' && PhotoSection}

            {/* Names */}
            <section>
              <h2 className="text-sm font-semibold text-black/80 mb-3">Names</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Bride's name"
                  value={data.brideName}
                  onChange={(e) => update({ brideName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Groom's name"
                  value={data.groomName}
                  onChange={(e) => update({ groomName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </section>

            {/* WhatsApp — captured early, before photo/color */}
            <section>
              <h2 className="text-sm font-semibold text-black/80 mb-1">WhatsApp number</h2>
              <p className="text-xs text-black/40 mb-3">So we can send you the final link once it's ready.</p>
              <input
                type="tel"
                placeholder="+91 9XXXXXXXXX"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </section>

            {/* Date & venue */}
            <section>
              <h2 className="text-sm font-semibold text-black/80 mb-3">Date &amp; venue</h2>
              <div className="space-y-3">
                <input
                  type="date"
                  value={data.date}
                  onChange={(e) => update({ date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Time, e.g. 4:00 PM – 7:00 PM"
                  value={data.time}
                  onChange={(e) => update({ time: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Venue name"
                  value={data.venue}
                  onChange={(e) => update({ venue: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={data.venueCity}
                  onChange={(e) => update({ venueCity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </section>

            {/* Color theme — only the flexible envelope template has this */}
            {kind === 'envelope' && (
              <section>
                <h2 className="text-sm font-semibold text-black/80 mb-3">Color theme</h2>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => update({ colorPresetId: p.id })}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-colors ${
                        data.colorPresetId === p.id ? 'border-[#2563EB]' : 'border-black/10 hover:border-black/20'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full shrink-0" style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.gold})` }} />
                      <span className="text-xs font-medium text-black/70">{p.name}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Envelope template also allows an optional ambient background photo */}
            {kind === 'envelope' && PhotoSection}
          </div>

          <div className="px-6 py-6 border-t border-black/5">
            <button
              disabled={!id}
              onClick={async () => {
                await save()
                if (idRef.current) router.push(`/templates/preview/${idRef.current}`)
              }}
              className="w-full py-3 rounded-full text-sm font-semibold text-white transition-colors disabled:opacity-40"
              style={{ background: '#2563EB' }}
            >
              See your invitation →
            </button>
          </div>
        </div>

        {/* Preview column */}
        <div className="flex-1 lg:h-full lg:overflow-y-auto bg-[#e9e6de] flex items-start justify-center py-8 px-4">
          <div className="w-full max-w-[420px] rounded-2xl overflow-hidden shadow-2xl border border-black/10" style={{ height: 'min(80vh, 780px)' }}>
            <div className="w-full h-full overflow-y-auto">
              <TemplateRenderer templateId={templateId} religion={religion} data={data} skipReveal watermark={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
