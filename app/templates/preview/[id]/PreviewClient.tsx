'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import TemplateRenderer from '@/components/templates/TemplateRenderer'
import type { InviteData, Religion } from '@/lib/templates/types'

interface Props {
  id: string
  templateId: string
  religion: Religion
  data: InviteData
  pricePaise: number
  rsvpEnabled: boolean
  songEnabled: boolean
}

export default function PreviewClient({ id, templateId, religion, data, pricePaise, rsvpEnabled, songEnabled }: Props) {
  const searchParams = useSearchParams()
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shareLink, setShareLink] = useState<string | null>(null)
  const [sharing, setSharing] = useState(false)

  const priceLabel = `₹${(pricePaise / 100).toLocaleString('en-IN')}`

  // PayU redirects here after a failed/cancelled payment (success goes straight
  // to /templates/invite/[id] from the callback route, never back through here).
  useEffect(() => {
    if (searchParams.get('payu_error')) {
      setError('Payment did not go through — nothing was charged. Please try again.')
    }
  }, [searchParams])

  const handleShare = async () => {
    setSharing(true)
    try {
      const res = await fetch('/api/templates/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const json = await res.json()
      if (res.ok && json.token) setShareLink(`${window.location.origin}/templates/share/${json.token}`)
    } catch {
      // silent — share link is a nice-to-have, not critical
    } finally {
      setSharing(false)
    }
  }

  // PayU's hosted checkout is a full-page redirect, not a JS modal — we build
  // a real <form> and submit it so the browser POSTs straight to PayU. There's
  // nothing to verify client-side; PayU POSTs the result back to our own
  // callback route, which is what actually unlocks the invitation.
  const handlePay = async () => {
    setError(null)
    setPaying(true)
    try {
      const orderRes = await fetch('/api/templates/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const order = await orderRes.json()
      if (!orderRes.ok) throw new Error(order.error || 'Could not start checkout')

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = order.action
      for (const [name, value] of Object.entries(order.fields as Record<string, string>)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        form.appendChild(input)
      }
      document.body.appendChild(form)
      form.submit()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setPaying(false)
    }
  }

  return (
    <div className="relative">
      <TemplateRenderer templateId={templateId} religion={religion} data={data} watermark rsvpEnabled={rsvpEnabled} inviteId={id} />

      <a
        href="/"
        className="fixed top-4 left-4 z-[300] text-xs font-bold tracking-tight bg-white/90 text-black/70 px-3 py-2 rounded-full shadow-lg hover:text-black"
      >
        webbes
      </a>

      <div
        className="fixed top-4 right-4 z-[300]"
      >
        {shareLink ? (
          <div className="flex items-center gap-2 bg-white/95 rounded-full pl-3 pr-1 py-1 shadow-lg max-w-[280px]">
            <span className="text-[11px] text-black/60 truncate">{shareLink}</span>
            <button
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="text-[11px] font-semibold px-2.5 py-1.5 rounded-full text-white shrink-0"
              style={{ background: '#2563EB' }}
            >
              Copy
            </button>
          </div>
        ) : (
          <button
            onClick={handleShare}
            disabled={sharing}
            className="text-[11px] font-semibold bg-white/90 text-black/70 px-3 py-2 rounded-full shadow-lg disabled:opacity-50"
          >
            {sharing ? 'Creating…' : 'Share preview (one-time view)'}
          </button>
        )}
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-[300] flex flex-col items-center gap-2 px-4 py-4"
        style={{ background: 'rgba(20,10,10,0.9)', backdropFilter: 'blur(10px)' }}
      >
        {error && <p className="text-xs text-red-300">{error}</p>}
        <button
          onClick={handlePay}
          disabled={paying}
          className="w-full max-w-sm py-3.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #8B1A1A, #5C0E0E)' }}
        >
          {paying ? 'Redirecting to payment…' : `Pay ${priceLabel} to unlock your invitation`}
        </button>
        <p className="text-[11px] text-white/50">
          Removes the watermark and unlocks your photo{songEnabled ? ', song,' : ''} &amp; final link
          {rsvpEnabled ? ' — RSVP included' : ''}
        </p>
        <p className="text-[11px] text-white/35">
          By purchasing you agree to our{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60">
            Terms
          </a>
          ,{' '}
          <a href="/refund-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60">
            Refund Policy
          </a>{' '}
          and{' '}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60">
            Privacy Policy
          </a>
          .
        </p>
        <p className="text-[11px] text-white/30">
          Webbes ·{' '}
          <a href="mailto:webbes.in@gmail.com" className="underline hover:text-white/50">
            webbes.in@gmail.com
          </a>{' '}
          ·{' '}
          <a href="https://wa.me/919149681874" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50">
            WhatsApp
          </a>
        </p>
      </div>
    </div>
  )
}
