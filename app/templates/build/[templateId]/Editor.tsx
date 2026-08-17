'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TemplateRenderer from '@/components/templates/TemplateRenderer'
import StepIndicator from '@/components/templates/wizard/StepIndicator'
import PhoneFrame from '@/components/templates/wizard/PhoneFrame'
import YourEventTab from './YourEventTab'
import StoryPhotosTab from './StoryPhotosTab'
import { RELIGION_PRESETS, RELIGIONS, RELIGION_TERMINOLOGY } from '@/lib/templates/religion-themes'
import { getVariant } from '@/lib/templates/posterVariants'
import { RSVP_ADDON_PRICE_INR, SONG_ADDON_PRICE_INR, BASE_PRICE_INR, LIST_PRICE_INR, formatINR } from '@/lib/templates/pricing'
import type { InviteData, Religion } from '@/lib/templates/types'

interface Props {
  templateId: string
  initialId: string | null
  initialReligion: Religion
  initialData: InviteData
  initialRsvpEnabled: boolean
  initialSongEnabled: boolean
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'
type Tab = 'event' | 'story'

export default function Editor({
  templateId,
  initialId,
  initialReligion,
  initialData,
  initialRsvpEnabled,
  initialSongEnabled,
}: Props) {
  const router = useRouter()
  const [id, setId] = useState(initialId)
  const [religion] = useState<Religion>(initialReligion)
  const [data, setData] = useState<InviteData>(initialData)
  const [rsvpEnabled, setRsvpEnabled] = useState(initialRsvpEnabled)
  const [songEnabled, setSongEnabled] = useState(initialSongEnabled)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [uploading, setUploading] = useState(false)
  const [uploadingSong, setUploadingSong] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [tab, setTab] = useState<Tab>('event')
  const idRef = useRef(id)
  idRef.current = id
  const mounted = useRef(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const variant = getVariant(templateId)
  const kind = variant?.kind ?? (templateId === 'custom' ? 'custom' : 'envelope')
  const religionLabel = RELIGIONS.find((r) => r.id === religion)?.label ?? religion
  const terminology = RELIGION_TERMINOLOGY[religion]

  const save = useCallback(async () => {
    setSaveState('saving')
    try {
      const res = await fetch('/api/templates/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: idRef.current ?? undefined,
          templateId,
          religion,
          data,
          rsvpEnabled,
          songEnabled,
        }),
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
  }, [templateId, religion, data, rsvpEnabled, songEnabled, router])

  // Autosave — debounced 800ms after any change, so a partial customization
  // survives the user leaving mid-way and coming back later.
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
  }, [religion, data, rsvpEnabled, songEnabled])

  const update = (patch: Partial<InviteData>) => setData((d) => ({ ...d, ...patch }))

  const handleUpload = async (file: File, target: 'photo' | 'song') => {
    const setBusy = target === 'photo' ? setUploading : setUploadingSong
    setBusy(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('kind', target === 'song' ? 'audio' : 'image')
      const res = await fetch('/api/templates/upload', { method: 'POST', body: form })
      const json = await res.json()
      if (res.ok && json.url) {
        if (target === 'photo') update({ photoUrl: json.url })
        else update({ audioUrl: json.url })
      } else alert(json.error || 'Upload failed')
    } catch {
      alert('Upload failed')
    } finally {
      setBusy(false)
    }
  }

  const presets = RELIGION_PRESETS[religion]
  const total = BASE_PRICE_INR + (rsvpEnabled ? RSVP_ADDON_PRICE_INR : 0) + (songEnabled ? SONG_ADDON_PRICE_INR : 0)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F7F5F0' }}>
      <StepIndicator current="customize" hrefs={{ template: `/templates/category/${religion}` }} />

      <div className="flex flex-col lg:flex-row flex-1 lg:h-[calc(100vh-49px)]">
        {/* Form column */}
        <div className="w-full lg:w-[440px] lg:h-full lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-black/10 bg-white">
          <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between sticky top-0 bg-white z-10">
            <div className="flex items-center gap-4">
              <Link href={`/templates/category/${religion}`} className="text-sm text-black/50 hover:text-black">← Back</Link>
              <p className="text-[11px] uppercase tracking-[0.15em] font-semibold" style={{ color: '#2563EB' }}>
                {religionLabel} · {variant?.label ?? 'Custom'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-black/40">
                {saveState === 'saving' && 'Saving…'}
                {saveState === 'saved' && 'Saved'}
                {saveState === 'error' && 'Could not save'}
              </span>
              {/* Mobile-only preview toggle since the preview pane is below the form on small screens */}
              <button
                onClick={() => setShowPreview((v) => !v)}
                className="lg:hidden text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: '#2563EB', color: 'white' }}
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className={`flex border-b border-black/8 sticky top-[65px] bg-white z-10 ${showPreview ? 'hidden lg:flex' : 'flex'}`}>
            {(
              [
                ['event', 'Your Event'],
                ['story', 'Story & Photos'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="flex-1 text-sm font-semibold py-3.5 border-b-2 transition-colors"
                style={tab === key ? { borderColor: '#2563EB', color: '#2563EB' } : { borderColor: 'transparent', color: 'rgba(0,0,0,0.4)' }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className={`px-6 py-6 ${showPreview ? 'hidden lg:block' : ''}`}>
            {tab === 'event' ? (
              <YourEventTab
                data={data}
                update={update}
                presets={presets}
                showColorTheme={kind === 'envelope'}
                eventLabelPlaceholder={terminology.eventLabel}
              />
            ) : (
              <StoryPhotosTab
                data={data}
                update={update}
                kind={kind}
                heroSubtitlePlaceholder={terminology.heroSubtitle}
                closingLinePlaceholder={terminology.closingLine}
                footerBlessingPlaceholder={terminology.footerBlessing}
                uploading={uploading}
                uploadingSong={uploadingSong}
                onUploadPhoto={(f) => handleUpload(f, 'photo')}
                onUploadSong={(f) => handleUpload(f, 'song')}
                rsvpEnabled={rsvpEnabled}
                setRsvpEnabled={setRsvpEnabled}
                songEnabled={songEnabled}
                setSongEnabled={setSongEnabled}
              />
            )}
          </div>

          <div className={`px-6 py-6 border-t border-black/5 ${showPreview ? 'hidden lg:block' : ''}`}>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-sm text-black/50">Total</span>
              <span className="text-lg font-bold text-black">
                {formatINR(total)}
                {!rsvpEnabled && !songEnabled && <span className="text-sm font-normal text-black/30 line-through ml-2">{formatINR(LIST_PRICE_INR)}</span>}
              </span>
            </div>
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
            <p className="text-[11px] text-black/35 text-center mt-3">
              By purchasing you agree to our{' '}
              <Link href="/terms" target="_blank" className="underline hover:text-black/60">
                Terms
              </Link>
              ,{' '}
              <Link href="/refund-policy" target="_blank" className="underline hover:text-black/60">
                Refund Policy
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" target="_blank" className="underline hover:text-black/60">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="text-[11px] text-black/30 text-center mt-2">
              Webbes ·{' '}
              <a href="mailto:webbes.in@gmail.com" className="underline hover:text-black/50">
                webbes.in@gmail.com
              </a>{' '}
              ·{' '}
              <a href="https://wa.me/918075959157" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/50">
                WhatsApp
              </a>
            </p>
          </div>
        </div>

        {/* Live preview column */}
        <div className={`flex-1 lg:h-full lg:overflow-y-auto bg-[#e9e6de] items-start justify-center py-8 px-4 ${showPreview ? 'flex' : 'hidden lg:flex'}`}>
          <PhoneFrame>
            <TemplateRenderer templateId={templateId} religion={religion} data={data} skipReveal watermark={false} rsvpEnabled={rsvpEnabled} inviteId={id ?? undefined} />
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}
