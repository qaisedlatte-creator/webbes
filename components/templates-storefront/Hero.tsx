'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BASE_PRICE_INR, LIST_PRICE_INR, formatINR } from '@/lib/templates/pricing'

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

// Real invite, rendered small — same /templates/demo route the phone-frame
// preview uses (with ?skip=1 so it opens straight on the actual template
// instead of the generic sealed-envelope intro), non-interactive for the hero.
// The iframe itself is sized to the frame (no fixed-size + transform-scale
// hack), so it renders at true mobile-viewport proportions and scales
// fluidly with the frame's clamp()-based width.
function MiniPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      animate={{ opacity: 1, y: [0, -10, 0], rotate: -2 }}
      transition={{ opacity: { duration: 0.7, ease: 'easeOut' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 } }}
      className="relative mx-auto"
      style={{ width: 'clamp(240px, 72vw, 360px)', aspectRatio: '390 / 844' }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: 34,
          border: '7px solid #0a0a0a',
          background: '#0a0a0a',
          boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
        }}
      >
        <iframe
          src="/templates/demo/muslim-navy-poster?skip=1"
          title="Live invitation preview"
          tabIndex={-1}
          aria-hidden="true"
          className="w-full h-full"
          style={{ border: 0, pointerEvents: 'none' }}
        />
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      className="relative px-6 pt-40 pb-24 md:pt-48 md:pb-32"
      style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #14100d 60%, #1a1210 100%)' }}
    >
      <div className="max-w-5xl mx-auto grid gap-10 md:gap-14 md:grid-cols-2 items-center">
        <div className="order-1 md:order-2">
          <MiniPreview />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="order-2 md:order-1 text-center md:text-left"
        >
          <Label text="Webbes Invitations" />
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-1px',
              lineHeight: 1.08,
            }}
          >
            A wedding invitation website, ready in minutes
          </h1>
          <p
            className="mt-6 mx-auto md:mx-0 max-w-md"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}
          >
            Pick your style, customize it live, and share a link your guests will love — no app, no download, just WhatsApp.
          </p>
          <p
            className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{ background: 'rgba(255,255,255,0.08)', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '0.9rem', color: '#fff' }}
          >
            Starting at <strong>{formatINR(BASE_PRICE_INR)}</strong>
            <span style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>{formatINR(LIST_PRICE_INR)}</span>
          </p>
          <div className="mt-8">
            <Link
              href="#browse-templates"
              className="inline-block px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #8B1A1A, #5C0E0E)' }}
            >
              Browse templates
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
