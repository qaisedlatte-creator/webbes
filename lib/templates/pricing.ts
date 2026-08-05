// Client-safe display prices — mirrors the server defaults in lib/templates/razorpay.ts.
// The actual charge is always computed server-side from env vars at checkout time.
export const BASE_PRICE_INR = 1299;
export const LIST_PRICE_INR = 1599;
export const RSVP_ADDON_PRICE_INR = 500;
export const SONG_ADDON_PRICE_INR = 59;

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
