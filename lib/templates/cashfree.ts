// Cashfree Payment Gateway integration.
// Docs: https://www.cashfree.com/docs/api-reference/payments/latest/orders/create
//       https://www.cashfree.com/docs/api-reference/payments/latest/orders/get
//       https://www.cashfree.com/docs/api-reference/payments/latest/payments/webhooks
//
// Cashfree's REST amounts are in the base currency unit (rupees, decimal) —
// unlike Razorpay's paise-based `amount`. All pricing elsewhere in this app
// (lib/templates/razorpay.ts) is in paise, so every function here converts
// paise -> rupees right before calling Cashfree.

import crypto from 'crypto'

const API_VERSION = '2023-08-01'

export { getTotalPricePaise, getInvitePricePaise, getRsvpAddonPricePaise, getSongAddonPricePaise } from './razorpay'

export function isCashfreeConfigured(): boolean {
  return Boolean(process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY)
}

function getBaseUrl(): string {
  const env = (process.env.CASHFREE_ENV || 'TEST').toUpperCase()
  return env === 'PRODUCTION' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg'
}

function getAuthHeaders(): Record<string, string> {
  return {
    'x-client-id': process.env.CASHFREE_APP_ID || '',
    'x-client-secret': process.env.CASHFREE_SECRET_KEY || '',
    'x-api-version': API_VERSION,
    'Content-Type': 'application/json',
  }
}

/** Cashfree requires a 10-digit phone; falls back to a sandbox-safe dummy if the customer hasn't given one yet. */
function sanitizePhone(raw: string | null | undefined): string {
  const digits = (raw || '').replace(/\D/g, '')
  const last10 = digits.slice(-10)
  return last10.length === 10 ? last10 : '9999999999'
}

export interface CreateCashfreeOrderInput {
  /** Our own invite id — embedded in the Cashfree order_id so the webhook can recover it. */
  inviteId: string
  amountPaise: number
  customerName: string
  customerPhone: string | null
  returnUrl: string
}

export interface CashfreeOrder {
  orderId: string
  paymentSessionId: string
}

/** order_id format: inv_<inviteId>_<timestamp> — always unique, and the invite id is recoverable by splitting on '_'. */
function buildOrderId(inviteId: string): string {
  return `inv_${inviteId}_${Date.now()}`
}

export function inviteIdFromOrderId(orderId: string): string | null {
  const parts = orderId.split('_')
  if (parts.length !== 3 || parts[0] !== 'inv') return null
  return parts[1]
}

export async function createCashfreeOrder(input: CreateCashfreeOrderInput): Promise<CashfreeOrder> {
  const orderId = buildOrderId(input.inviteId)

  const res = await fetch(`${getBaseUrl()}/orders`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      order_id: orderId,
      order_amount: Math.round(input.amountPaise) / 100,
      order_currency: 'INR',
      customer_details: {
        customer_id: input.inviteId,
        customer_phone: sanitizePhone(input.customerPhone),
        customer_name: input.customerName.slice(0, 100) || 'Guest',
      },
      order_meta: {
        return_url: input.returnUrl,
      },
    }),
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.message || `Cashfree order create failed (${res.status})`)
  }

  return { orderId: json.order_id, paymentSessionId: json.payment_session_id }
}

export async function getCashfreeOrderStatus(orderId: string): Promise<string> {
  const res = await fetch(`${getBaseUrl()}/orders/${encodeURIComponent(orderId)}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.message || `Cashfree order fetch failed (${res.status})`)
  }
  return json.order_status as string
}

/** HMAC-SHA256(timestamp + rawBody, secret), base64 — must run against the raw, unparsed request body. */
export function verifyCashfreeWebhookSignature(rawBody: string, timestamp: string, signature: string): boolean {
  const secret = process.env.CASHFREE_WEBHOOK_SECRET || process.env.CASHFREE_SECRET_KEY
  if (!secret) return false

  const expected = crypto.createHmac('sha256', secret).update(timestamp + rawBody).digest('base64')

  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}
