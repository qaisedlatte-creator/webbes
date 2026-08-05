import Razorpay from 'razorpay'

export function getRazorpayClient(): Razorpay | null {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) return null
  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}

function envPaise(name: string, fallback: number): number {
  const raw = process.env[name]
  const parsed = raw ? parseInt(raw, 10) : NaN
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

/** Discounted base price — ₹1299, was ₹1599. */
export function getInvitePricePaise(): number {
  return envPaise('INVITE_PRICE_PAISE', 129900)
}

/** Struck-through "was" price shown next to the discounted price. */
export function getInviteListPricePaise(): number {
  return envPaise('INVITE_LIST_PRICE_PAISE', 159900)
}

/** RSVP form + private dashboard add-on — ₹500. */
export function getRsvpAddonPricePaise(): number {
  return envPaise('RSVP_ADDON_PRICE_PAISE', 50000)
}

/** Custom uploaded song add-on — ₹59. */
export function getSongAddonPricePaise(): number {
  return envPaise('SONG_ADDON_PRICE_PAISE', 5900)
}

export function getTotalPricePaise(opts: { rsvpEnabled: boolean; songEnabled: boolean }): number {
  let total = getInvitePricePaise()
  if (opts.rsvpEnabled) total += getRsvpAddonPricePaise()
  if (opts.songEnabled) total += getSongAddonPricePaise()
  return total
}
