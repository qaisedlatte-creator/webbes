'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { styleLabel } from '@/lib/templates/display'
import { trackPixelEvent } from '@/lib/meta-pixel-client'
import { BASE_PRICE_INR } from '@/lib/templates/pricing'
import type { Religion } from '@/lib/templates/types'

interface Props {
  templateId: string
  religion: Religion
  religionLabel: string
  initialColorPresetId: string
}

function formatDigits(digits: string): string {
  return digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits
}

export default function StartCapture({ templateId, religion, religionLabel, initialColorPresetId }: Props) {
  const router = useRouter()
  const [phoneDigits, setPhoneDigits] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fires once when the customer lands on this template's build flow — the
  // true first "view" now that customization happens after this screen.
  useEffect(() => {
    trackPixelEvent('ViewContent', {
      content_name: styleLabel(religion, templateId),
      content_type: 'product',
      content_ids: [templateId],
      value: BASE_PRICE_INR,
      currency: 'INR',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const valid = phoneDigits.length === 10

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
    setPhoneDigits(digits)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/templates/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId,
          religion,
          data: initialColorPresetId ? { colorPresetId: initialColorPresetId } : {},
          whatsapp: `+91${phoneDigits}`,
          contactName: name.trim() || undefined,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.id) throw new Error(json.error || 'Could not start')
      router.push(`/templates/build/${templateId}?id=${json.id}`)
    } catch {
      setError('Something went wrong — please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: '#f7f5f0' }}>
      <div className="px-5 pt-6">
        <Link href={`/templates/category/${religion}`} className="text-xs text-black/40 hover:text-black/60 inline-block">
          ← Back
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center px-5 py-8 max-w-sm mx-auto w-full">
        <h1
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.5rem, 6vw, 1.9rem)', lineHeight: 1.15 }}
          className="font-bold text-black text-center mb-8"
        >
          Let&apos;s build your {religionLabel} invitation 💍
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black/80 mb-2">Your WhatsApp number</label>
            <div className="flex items-stretch rounded-xl border border-black/15 bg-white overflow-hidden focus-within:border-[#2563EB]">
              <span className="flex items-center px-3.5 text-base font-semibold text-black/50 border-r border-black/10 bg-black/[0.03]">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                autoFocus
                placeholder="98765 43210"
                value={formatDigits(phoneDigits)}
                onChange={handlePhoneChange}
                className="flex-1 min-w-0 px-3.5 py-4 text-lg tracking-wide focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-black/80 mb-2">Your name</label>
            <input
              type="text"
              placeholder="So we know what to call you"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-4 text-lg rounded-xl border border-black/15 bg-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <p className="text-xs text-black/40 leading-relaxed">
            We&apos;ll save your progress here — no spam, just your invite link when it&apos;s ready.
          </p>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={!valid || submitting}
            className="w-full py-4 rounded-full text-base font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-40"
            style={{ background: '#2563EB' }}
          >
            {submitting ? 'Starting…' : 'Start customizing →'}
          </button>
        </form>
      </div>
    </div>
  )
}
