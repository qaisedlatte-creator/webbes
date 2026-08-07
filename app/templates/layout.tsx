import type { Metadata } from 'next'
import { Cinzel, Cormorant_Garamond, Great_Vibes, Amiri, Josefin_Sans } from 'next/font/google'
import './invite-globals.css'

// Overrides the root layout's agency-wide keywords/description for the whole
// /templates section — pages here shouldn't inherit unrelated service keywords
// (e.g. "Shopify development India") from the main site.
export const metadata: Metadata = {
  title: 'Webbes Invitations — Wedding Invitation Website Builder',
  description:
    'Build a personalized wedding invitation website with Webbes. Pick a style, add your names, date and venue, and get a shareable link — starting at ₹1,299.',
  keywords: [
    'wedding invitation website',
    'online wedding invitation India',
    'digital wedding invitation builder',
    'wedding invitation website Kerala',
  ],
  authors: [{ name: 'Webbes' }],
  robots: { index: true, follow: true },
}

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--invite-heading',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--invite-serif',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--invite-script',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--invite-arabic',
  display: 'swap',
})

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100', '300', '400'],
  variable: '--invite-label',
  display: 'swap',
})

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} ${amiri.variable} ${josefin.variable}`}>
      {children}
    </div>
  )
}
