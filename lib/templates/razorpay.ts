import Razorpay from 'razorpay'

export function getRazorpayClient(): Razorpay | null {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) return null
  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}

export function getInvitePricePaise(): number {
  const raw = process.env.INVITE_PRICE_PAISE
  const parsed = raw ? parseInt(raw, 10) : NaN
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 49900
}
