import type { Metadata } from 'next'
import WeddingInvitationsClient from './WeddingInvitationsClient'
import { BASE_PRICE_INR } from '@/lib/templates/pricing'

export const metadata: Metadata = {
  title: 'Digital Wedding Invitation Website Templates — Webbes',
  description:
    'Animated wedding invitation websites for Islamic, Hindu, and Christian weddings. Pick a template, customize it live, and share one link with every guest — starting at ₹759.',
  keywords: [
    'wedding invitation template website',
    'digital wedding invitation India',
    'animated wedding invite website',
    'online wedding invitation Kerala',
    'nikah invitation website',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.webbes.in/wedding-invitations' },
  openGraph: {
    type: 'website',
    url: 'https://www.webbes.in/wedding-invitations',
    title: 'Digital Wedding Invitation Website Templates | Webbes',
    description: 'Animated wedding invitation websites, ready in minutes. Pick a style, customize it live, share one link.',
    siteName: 'Webbes',
  },
}

export default function WeddingInvitationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Webbes Digital Wedding Invitation Website',
            description: 'Animated, shareable wedding invitation websites for Islamic, Hindu, and Christian weddings — customizable in a live editor.',
            brand: { '@type': 'Brand', name: 'Webbes' },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: (BASE_PRICE_INR).toString(),
              availability: 'https://schema.org/InStock',
              url: 'https://www.webbes.in/templates',
            },
          }),
        }}
      />
      <WeddingInvitationsClient />
    </>
  )
}
