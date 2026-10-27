'use client'

// One-off page to connect a WhatsApp Business app number to the Cloud API
// with coexistence (Meta Embedded Signup, featureType whatsapp_business_app_onboarding).
// Not linked anywhere and excluded from search.

import Script from 'next/script'
import { useEffect, useState } from 'react'

const APP_ID = '28035547492737902'
const CONFIG_ID = '1611186119901685'
const GRAPH_VERSION = 'v23.0'

declare global {
  interface Window {
    FB?: any
    fbAsyncInit?: () => void
  }
}

export default function WaConnectPage() {
  const [ready, setReady] = useState(false)
  const [events, setEvents] = useState<string[]>([])
  const log = (line: string) => setEvents((e) => [...e, line])

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({ appId: APP_ID, autoLogAppEvents: true, xfbml: true, version: GRAPH_VERSION })
      setReady(true)
    }
    // Embedded Signup reports the WABA ID and phone number ID through postMessage.
    const onMessage = (event: MessageEvent) => {
      if (!String(event.origin).endsWith('facebook.com')) return
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        if (data?.type === 'WA_EMBEDDED_SIGNUP') log(JSON.stringify(data.data ?? data, null, 2))
      } catch {
        // non-JSON messages from the SDK are ignored
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const launch = () => {
    window.FB.login(
      (response: any) => {
        const code = response?.authResponse?.code
        log(code ? 'Connected. Auth code received (send to Claude if a token is needed).' : 'Popup closed without finishing.')
      },
      {
        config_id: CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        extras: { setup: {}, featureType: 'whatsapp_business_app_onboarding', sessionInfoVersion: '3' },
      }
    )
  }

  return (
    <main style={{ maxWidth: 560, margin: '48px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif' }}>
      <meta name="robots" content="noindex" />
      <Script src="https://connect.facebook.net/en_US/sdk.js" strategy="afterInteractive" crossOrigin="anonymous" />
      <h1 style={{ fontSize: 24 }}>Connect WhatsApp Business app</h1>
      <p style={{ color: '#555' }}>
        Connects a number that's already on the WhatsApp Business app to the Webbes bot, and keeps the app working
        (coexistence). Have the phone with that number ready to scan a QR code.
      </p>
      <button
        onClick={launch}
        disabled={!ready}
        style={{ background: '#1877f2', color: '#fff', border: 0, borderRadius: 6, padding: '12px 18px', fontSize: 16, cursor: ready ? 'pointer' : 'wait' }}
      >
        {ready ? 'Connect with Facebook' : 'Loading…'}
      </button>
      {events.length > 0 && (
        <pre style={{ marginTop: 24, background: '#f4f4f4', padding: 12, borderRadius: 6, whiteSpace: 'pre-wrap' }}>{events.join('\n\n')}</pre>
      )}
    </main>
  )
}
