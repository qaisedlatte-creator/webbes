'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RELIGIONS, RELIGION_PRESETS } from '@/lib/templates/religion-themes'

const VP = { once: true, margin: '-60px' } as const

function Label({ text }: { text: string }) {
  const c = 'rgba(255,255,255,0.4)'
  return (
    <p
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '0.62rem',
        fontWeight: 700,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: c,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <span style={{ width: 18, height: 1, background: c, display: 'inline-block' }} />
      {text}
      <span style={{ width: 18, height: 1, background: c, display: 'inline-block' }} />
    </p>
  )
}

export default function GalleryClient() {
  return (
    <div style={{ background: '#ffffff' }}>
      {/* Hero — dark band, matches the site's convention so Nav reads white-on-dark at top */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 md:pt-48 md:pb-32"
        style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #14100d 60%, #1a1210 100%)', minHeight: '62vh' }}
      >
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <Label text="Webbes Invitations" />
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-1px',
              lineHeight: 1.08,
              maxWidth: 720,
              margin: '0 auto',
            }}
          >
            A wedding invitation website, ready in minutes
          </h1>
          <p
            className="mt-6 mx-auto max-w-lg"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}
          >
            Envelope reveal, countdown, your photo, your venue — customize it live and share a
            link your guests will love.
          </p>
        </motion.div>
      </section>

      {/* Style picker */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.32)',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ width: 18, height: 1, background: 'rgba(10,10,10,0.32)', display: 'inline-block' }} />
          Pick a style
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.5px', marginBottom: 40 }}
        >
          Islamic, Christian, or Hindu — each with its own palette, music, and terminology.
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {RELIGIONS.map((r, i) => {
            const preset = RELIGION_PRESETS[r.id][0]
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              >
                <Link
                  href={`/templates/build/template-01?religion=${r.id}`}
                  className="group block rounded-2xl overflow-hidden border border-black/8 transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: '#fff' }}
                >
                  <div
                    className="h-36 flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${preset.accent}, ${preset.accentDeep})` }}
                  >
                    <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '2.2rem', color: preset.goldBright }}>A &amp; B</span>
                  </div>
                  <div className="p-5 text-left">
                    <p className="text-[11px] uppercase tracking-[0.2em] mb-1 font-semibold" style={{ color: preset.label }}>{r.label}</p>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#0a0a0a' }}>Template One</p>
                    <p className="mt-1 text-[13px] text-black/45">{preset.name} default</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-16">
          <Link
            href="/templates/build/template-01"
            className="glass-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
            style={{ background: '#2563EB' }}
          >
            Start building your invite
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
