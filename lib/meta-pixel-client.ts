// Thin client-side wrapper around the Meta Pixel base code injected in app/layout.tsx.
// Safe to call from any client component — no-ops if the pixel script hasn't
// loaded yet (e.g. NEXT_PUBLIC_META_PIXEL_ID unset, or an ad blocker stripped it).

type Fbq = (...args: unknown[]) => void;

export function trackPixelEvent(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === 'function') fbq('track', event, params);
}
