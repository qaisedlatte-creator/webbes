'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { BASE_PRICE_INR, LIST_PRICE_INR, RSVP_ADDON_PRICE_INR, SONG_ADDON_PRICE_INR, formatINR } from '@/lib/templates/pricing'

const VP = { once: true, margin: '-60px' } as const

const FAQS = [
  {
    q: 'How much does it cost?',
    a: `Every template starts at ${formatINR(BASE_PRICE_INR)} (list price ${formatINR(LIST_PRICE_INR)}) — one-time, no subscription. RSVP tracking is a ${formatINR(RSVP_ADDON_PRICE_INR)} add-on, and a custom song is ${formatINR(SONG_ADDON_PRICE_INR)}.`,
  },
  {
    q: 'How do guests view it — do they need an app?',
    a: 'No app or download. You get a single link that opens directly in any browser — just send it on WhatsApp, SMS, or however you’d normally invite people.',
  },
  {
    q: 'How long does it take to get my invite?',
    a: 'The builder is self-serve and updates live as you type — most people finish customizing in a few minutes. There’s no waiting on a designer; you preview, pay, and your link is live immediately after.',
  },
  {
    q: 'Can I collect RSVPs?',
    a: 'Yes, as an add-on. Turn it on in the editor and guests can RSVP directly from the invite — you get a private dashboard link to see who’s coming.',
  },
  {
    q: 'Can I add my own photo and venue map?',
    a: 'Yes — upload your own photo for the background, and paste your Google Maps link so guests get one-tap directions to the venue.',
  },
  {
    q: 'What if I want a refund?',
    a: (
      <>
        See our{' '}
        <a href="/refund-policy" className="underline hover:text-black" target="_blank" rel="noopener noreferrer">
          Refund Policy
        </a>{' '}
        for the exact terms.
      </>
    ),
  },
] as const

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="max-w-3xl mx-auto px-6 py-20 md:py-28">
      <motion.p
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VP}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex items-center gap-2.5 mb-4"
        style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.32)' }}
      >
        <span style={{ width: 18, height: 1, background: 'rgba(10,10,10,0.32)', display: 'inline-block' }} />
        Questions
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.5px', marginBottom: 32 }}
      >
        Frequently asked questions
      </motion.h2>

      <div className="divide-y divide-black/8 border-t border-b border-black/8">
        {FAQS.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.98rem', fontWeight: 700, color: '#0a0a0a' }}>{item.q}</span>
                <ChevronDown size={18} className="shrink-0 transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', color: 'rgba(10,10,10,0.4)' }} />
              </button>
              {isOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="pb-5 text-[14px] pr-8"
                  style={{ color: 'rgba(10,10,10,0.6)', lineHeight: 1.6 }}
                >
                  {item.a}
                </motion.p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
