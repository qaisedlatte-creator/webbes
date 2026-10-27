'use client'

// Hosted checkout for orders created by the WhatsApp wedding-invite bot (n8n).
// The bot creates a Cashfree order and sends the customer /pay?s=<payment_session_id>.
// Not linked anywhere and excluded from search.

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function PayInner() {
  const params = useSearchParams()
  const session = params.get('s') || ''
  const done = params.get('done') === '1'
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session || done) return
    ;(async () => {
      try {
        const { load } = await import('@cashfreepayments/cashfree-js')
        const cashfree = await load({
          mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' ? 'production' : 'sandbox',
        })
        const result = await cashfree.checkout({ paymentSessionId: session, redirectTarget: '_self' })
        if (result?.error) setError('The payment page could not open. Please go back to WhatsApp and ask for a new link.')
      } catch {
        setError('The payment page could not open. Please go back to WhatsApp and ask for a new link.')
      }
    })()
  }, [session, done])

  const box = { maxWidth: 480, margin: '64px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif', textAlign: 'center' as const }
  if (done) {
    return (
      <main style={box}>
        <h1 style={{ fontSize: 24 }}>Thank you!</h1>
        <p>Your payment is being confirmed. You'll get a message on WhatsApp shortly with the next steps.</p>
      </main>
    )
  }
  if (!session) {
    return (
      <main style={box}>
        <h1 style={{ fontSize: 22 }}>Payment link missing</h1>
        <p>Please go back to WhatsApp and ask for your payment link again.</p>
      </main>
    )
  }
  return (
    <main style={box}>
      <h1 style={{ fontSize: 22 }}>Opening secure payment…</h1>
      <p style={{ color: '#555' }}>Pay with GPay, PhonePe, any UPI app or card. Secured by Cashfree.</p>
      {error && <p style={{ color: '#b42318' }}>{error}</p>}
    </main>
  )
}

export default function PayPage() {
  return (
    <Suspense fallback={null}>
      <meta name="robots" content="noindex" />
      <PayInner />
    </Suspense>
  )
}
