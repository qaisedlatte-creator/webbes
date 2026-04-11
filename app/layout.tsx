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
    'Webbes is a web design and AI automation agency based in Kochi, India. We build websites, Shopify stores, and AI automations for businesses across India and the GCC. Fast delivery. Direct communication.',
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
      'Websites that bring customers. AI that saves hours. E-commerce that sells. Based in Kochi, India — serving India & the GCC.',
    locale: 'en_IN',
    siteName: 'Webbes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webbes — Web Design & AI Automation Agency',
    description: 'Websites that bring customers. AI that saves hours. E-commerce that sells.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
