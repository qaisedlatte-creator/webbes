'use client'

import { motion } from 'framer-motion'

const VP = { once: true, margin: '-60px' } as const

const STEPS = [
  { n: '01', title: 'Pick your style', body: 'Browse Islamic, Hindu or Christian templates, or start from a blank canvas with your own photo.' },
  { n: '02', title: 'Customize live', body: 'Add your names, date, venue, photo and colors — the invite updates in real time as you type.' },
  { n: '03', title: 'Preview on your phone', body: 'Check exactly how it looks on WhatsApp before you pay, with a shareable preview link.' },
  { n: '04', title: 'Pay & publish', body: 'Pay once, and get your own live invite link — watermark removed, ready to share with every guest.' },
] as const

export default function HowItWorks() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
      <motion.p
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VP}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex items-center gap-2.5 mb-4"
        style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.32)' }}
      >
        <span style={{ width: 18, height: 1, background: 'rgba(10,10,10,0.32)', display: 'inline-block' }} />
        How it works
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.5px', marginBottom: 44 }}
      >
        From blank page to shareable invite, in four steps.
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
          >
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 700, color: 'rgba(10,10,10,0.12)' }}>{step.n}</p>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#0a0a0a', marginTop: 4 }}>{step.title}</p>
            <p className="mt-2 text-[14px]" style={{ color: 'rgba(10,10,10,0.55)', lineHeight: 1.55 }}>{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
