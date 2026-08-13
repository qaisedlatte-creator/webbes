// Meta Conversions API (server-side) — used exclusively for the Purchase
// event. Server-side firing is used here (rather than the client pixel)
// because it's the reliable signal for ad optimization: it fires from our
// own server after payment is actually confirmed, so it survives ad
// blockers and doesn't depend on the customer's browser tab staying open
// through the redirect.
//
// Docs: https://developers.facebook.com/docs/marketing-api/conversions-api/get-started

import crypto from 'crypto'

const GRAPH_VERSION = 'v21.0'

export function isMetaCapiConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID && process.env.META_CONVERSIONS_API_ACCESS_TOKEN)
}

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

/** Meta matches on E.164-without-plus, SHA-256 hashed — mirrors the normalization used for WhatsApp reminders. */
function hashPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  const e164 = digits.length === 10 ? `91${digits}` : digits.length > 10 ? digits : null
  return e164 ? sha256(e164) : null
}

export interface SendPurchaseEventInput {
  /** Used as the event_id for dedup — stable per invite so a retried call never double-counts. */
  inviteId: string
  valueInr: number
  eventSourceUrl: string
  whatsapp?: string | null
  clientIp?: string | null
  userAgent?: string | null
  /** `_fbp` cookie, when the call originates from the customer's own browser (checkout/verify, not the Cashfree webhook). */
  fbp?: string | null
  /** `_fbc` cookie — present when the customer arrived via a Facebook/Instagram ad click. */
  fbc?: string | null
}

export interface SendEventResult {
  ok: boolean
  error?: string
}

export async function sendPurchaseEvent(input: SendPurchaseEventInput): Promise<SendEventResult> {
  if (!isMetaCapiConfigured()) return { ok: false, error: 'Meta Conversions API is not configured' }

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN

  const userData: Record<string, unknown> = {}
  const phHash = input.whatsapp ? hashPhone(input.whatsapp) : null
  if (phHash) userData.ph = [phHash]
  if (input.clientIp) userData.client_ip_address = input.clientIp
  if (input.userAgent) userData.client_user_agent = input.userAgent
  if (input.fbp) userData.fbp = input.fbp
  if (input.fbc) userData.fbc = input.fbc

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: `purchase_${input.inviteId}`,
        event_source_url: input.eventSourceUrl,
        action_source: 'website',
        user_data: userData,
        custom_data: { value: input.valueInr, currency: 'INR' },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
  }

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken!)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const json = await res.json().catch(() => null)
      return { ok: false, error: json?.error?.message || `Meta CAPI send failed (${res.status})` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Meta CAPI send failed' }
  }
}
