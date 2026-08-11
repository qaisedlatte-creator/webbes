// PayU Hosted Checkout integration (classic hash-based flow).
// Docs: https://docs.payu.in/docs/hosted-checkout
//
// Unlike Cashfree's JS-SDK modal, hosted checkout is a full-page redirect:
// we build a signed form, the browser POSTs it to PayU, and PayU POSTs the
// result straight back to our surl/furl callback — verified via a reverse
// hash computed with the same salt, never trusting the redirect alone.

import crypto from 'crypto'

export { getTotalPricePaise, getInvitePricePaise, getRsvpAddonPricePaise, getSongAddonPricePaise } from './razorpay'

export function isPayuConfigured(): boolean {
  return Boolean(process.env.PAYU_KEY && process.env.PAYU_SALT)
}

export function getPayuActionUrl(): string {
  const env = (process.env.PAYU_ENV || 'TEST').toUpperCase()
  return env === 'PRODUCTION' ? 'https://secure.payu.in/_payment' : 'https://test.payu.in/_payment'
}

/** PayU requires a 10-digit phone; falls back to a sandbox-safe dummy if the customer hasn't given one yet. */
function sanitizePhone(raw: string | null | undefined): string {
  const digits = (raw || '').replace(/\D/g, '')
  const last10 = digits.slice(-10)
  return last10.length === 10 ? last10 : '9999999999'
}

/** PayU's hash sequence carries 10 UDF slots even though we only use udf1 (the invite id). */
function buildHashString(parts: {
  key: string
  txnid: string
  amount: string
  productinfo: string
  firstname: string
  email: string
  udf1: string
  salt: string
}): string {
  const udfs = [parts.udf1, '', '', '', '', '', '', '', '', ''] // udf1..udf10
  return [parts.key, parts.txnid, parts.amount, parts.productinfo, parts.firstname, parts.email, ...udfs, parts.salt].join('|')
}

export interface CreatePayuOrderInput {
  /** Our own invite id — carried in udf1 so the callback can recover it without parsing txnid. */
  inviteId: string
  amountPaise: number
  customerName: string
  customerPhone: string | null
  surl: string
  furl: string
}

export interface PayuOrder {
  action: string
  fields: Record<string, string>
}

export function createPayuOrder(input: CreatePayuOrderInput): PayuOrder {
  const key = process.env.PAYU_KEY || ''
  const salt = process.env.PAYU_SALT || ''
  const txnid = crypto.randomBytes(10).toString('hex') // 20 chars — PayU caps txnid at 25
  const amount = (input.amountPaise / 100).toFixed(2)
  const productinfo = 'Wedding Invitation Website'
  const firstname = (input.customerName.trim().split(' ')[0] || 'Guest').slice(0, 60)
  // PayU requires an email for the hash/transaction; the invite flow only collects WhatsApp,
  // so we synthesize a per-invite address rather than asking the customer for one more field.
  const email = `${input.inviteId}@invite.webbes.in`

  const hash = crypto
    .createHash('sha512')
    .update(buildHashString({ key, txnid, amount, productinfo, firstname, email, udf1: input.inviteId, salt }))
    .digest('hex')

  return {
    action: getPayuActionUrl(),
    fields: {
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone: sanitizePhone(input.customerPhone),
      surl: input.surl,
      furl: input.furl,
      udf1: input.inviteId,
      hash,
    },
  }
}

export interface PayuCallbackFields {
  status: string
  txnid: string
  amount: string
  productinfo: string
  firstname: string
  email: string
  udf1: string
  hash: string
  key: string
}

/** Reverse hash: same fields, reverse order, salt first — proves the callback actually came from PayU. */
export function verifyPayuResponseHash(f: PayuCallbackFields): boolean {
  const salt = process.env.PAYU_SALT || ''
  const udfsReversed = ['', '', '', '', '', '', '', '', '', f.udf1] // udf10..udf1
  const hashString = [salt, f.status, ...udfsReversed, f.email, f.firstname, f.productinfo, f.amount, f.txnid, f.key].join('|')
  const expected = crypto.createHash('sha512').update(hashString).digest('hex')

  const a = Buffer.from((f.hash || '').toLowerCase())
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}
