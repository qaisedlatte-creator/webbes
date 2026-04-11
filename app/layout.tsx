import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Webbes — Web Design & AI Automation Agency in India | Kochi, Kerala & GCC',
  description:
    'Webbes is a digital agency based in Kochi, India. We build websites, set up e-commerce stores, automate businesses with AI, and get you found on Google and AI search engines.',
  authors: [{ name: 'Webbes' }],
  keywords: [
    'web design agency India',
    'AI automation India',
    'website development Kochi',
    'digital agency Kerala',
    'web development GCC',
    'Shopify development India',
  ],
  robots: { index: true, follow: true },
  metadataBase: new URL('https://www.webbes.in'),
  alternates: { canonical: 'https://www.webbes.in/' },
  openGraph: {
    type: 'website',
    url: 'https://www.webbes.in/',
    title: 'Webbes — Web Design & AI Automation Agency | India & GCC',
    description:
      'Webbes builds websites, e-commerce stores, AI automations, and gets you found on Google and AI search engines. Based in Kochi, India — serving India & the GCC.',
    locale: 'en_IN',
    siteName: 'Webbes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webbes — Web Design & AI Automation Agency',
    description: 'Websites, e-commerce, AI automation, and SEO. Based in Kochi, India.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Webbes',
                url: 'https://webbes.in',
                logo: 'https://webbes.in/favicon.png',
                email: 'webbes.in@gmail.com',
                foundingLocation: {
                  '@type': 'Place',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Kochi',
                    addressRegion: 'Kerala',
                    addressCountry: 'IN',
                  },
                },
                sameAs: [
                  'https://instagram.com/webbes.in',
                ],
                knowsAbout: [
                  'Website Development',
                  'AI Automation',
                  'E-Commerce',
                  'SEO & AEO',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                '@id': 'https://webbes.in/#localbusiness',
                name: 'Webbes',
                description:
                  'Webbes is a digital agency based in Kochi, Kerala, India. We build websites, set up e-commerce stores, automate businesses with AI, and get you found on Google and AI search engines.',
                url: 'https://webbes.in',
                email: 'webbes.in@gmail.com',
                image: 'https://webbes.in/favicon.png',
                priceRange: '$$',
                currenciesAccepted: 'INR, AED, USD',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Kochi',
                  addressRegion: 'Kerala',
                  postalCode: '682001',
                  addressCountry: 'IN',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 9.9312,
                  longitude: 76.2673,
                },
                areaServed: [
                  { '@type': 'Country', name: 'India' },
                  { '@type': 'Country', name: 'United Arab Emirates' },
                  { '@type': 'Country', name: 'Saudi Arabia' },
                  { '@type': 'Country', name: 'Qatar' },
                  { '@type': 'Country', name: 'Kuwait' },
                  { '@type': 'Country', name: 'Bahrain' },
                  { '@type': 'Country', name: 'Oman' },
                ],
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'Digital Agency Services',
                  itemListElement: [
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Commerce Development' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & AEO' } },
                  ],
                },
                sameAs: [
                  'https://instagram.com/webbes.in',
                ],
              },
            ]),
          }}
        />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap" rel="stylesheet" />
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Kochi, Kerala, India" />
      </head>
      <body className="bg-white text-[#0a0a0a]">
        <CustomCursor />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
