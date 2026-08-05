'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import TemplateRenderer from '@/components/templates/TemplateRenderer'
import type { InviteData, Religion } from '@/lib/templates/types'

declare global {
  interface Window {
    Razorpay: any
  }
}

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
  const router = useRouter()
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shareLink, setShareLink] = useState<string | null>(null)
  const [sharing, setSharing] = useState(false)

  const priceLabel = `₹${(pricePaise / 100).toLocaleString('en-IN')}`

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

      if (!window.Razorpay) throw new Error('Payments are still loading — try again in a second')

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Webbes Invitations',
        description: order.name,
        order_id: order.orderId,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          try {
            const verifyRes = await fetch('/api/templates/checkout/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id,
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            })
            if (!verifyRes.ok) throw new Error()
            router.push(`/templates/invite/${id}`)
          } catch {
            setError('Payment received but confirmation failed — refresh this page in a minute.')
          }
        },
        modal: { ondismiss: () => setPaying(false) },
        theme: { color: '#8B1A1A' },
      })
      rzp.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setPaying(false)
    }
  }

  return (
    <div className="relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <TemplateRenderer templateId={templateId} religion={religion} data={data} watermark rsvpEnabled={rsvpEnabled} inviteId={id} />

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
          {paying ? 'Opening checkout…' : `Pay ${priceLabel} to unlock your invitation`}
        </button>
        <p className="text-[11px] text-white/50">
          Removes the watermark and unlocks your photo{songEnabled ? ', song,' : ''} &amp; final link
          {rsvpEnabled ? ' — RSVP included' : ''}
        </p>
        <p className="text-[11px] text-white/35">
          By purchasing you agree to our{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60">
            Terms
          </a>{' '}
          and{' '}
          <a href="/refund-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60">
            Refund Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
