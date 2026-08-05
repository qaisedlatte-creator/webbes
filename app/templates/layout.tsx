import { Cinzel, Cormorant_Garamond, Great_Vibes, Amiri, Josefin_Sans } from 'next/font/google'
import './invite-globals.css'

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
