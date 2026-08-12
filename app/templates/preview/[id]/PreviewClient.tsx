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

  // Cashfree only falls back to a real redirect (instead of resolving the
  // modal's promise) in in-app browsers that can't host the modal — confirm
  // the order the same way the modal path does, then unlock on success.
  useEffect(() => {
    const orderId = searchParams.get('cf_order_id')
    if (!orderId) return
    ;(async () => {
      setPaying(true)
      try {
        const verifyRes = await fetch('/api/templates/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, orderId }),
        })
        const verify = await verifyRes.json()
        if (!verifyRes.ok) throw new Error(verify.error || 'Could not confirm payment')
        window.location.href = `/templates/invite/${id}`
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Payment did not go through — nothing was charged. Please try again.')
        setPaying(false)
      }
    })()
  }, [searchParams, id])

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

  // Cashfree's JS SDK renders the checkout as a modal on top of this page —
  // no redirect. Its promise resolves once the user finishes or dismisses it,
  // then we confirm the actual payment status server-side before unlocking.
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

      const { load } = await import('@cashfreepayments/cashfree-js')
      const cashfree = await load({
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' ? 'production' : 'sandbox',
      })

      const result = await cashfree.checkout({
        paymentSessionId: order.paymentSessionId,
        redirectTarget: '_modal',
      })

      if (result.error) {
        setError('Payment did not go through — nothing was charged. Please try again.')
        setPaying(false)
        return
      }
      if (result.redirect) return // in-app-browser case — page is about to navigate away

      const verifyRes = await fetch('/api/templates/checkout/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, orderId: order.orderId }),
      })
      const verify = await verifyRes.json()
      if (!verifyRes.ok) throw new Error(verify.error || 'Could not confirm payment')

      window.location.href = `/templates/invite/${id}`
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
          {paying ? 'Opening payment…' : `Pay ${priceLabel} to unlock your invitation`}
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
