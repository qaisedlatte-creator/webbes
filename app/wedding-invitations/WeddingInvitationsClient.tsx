'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TEMPLATE_VARIANTS } from '@/lib/templates/posterVariants'
import { RELIGIONS } from '@/lib/templates/religion-themes'
import { BASE_PRICE_INR, LIST_PRICE_INR, RSVP_ADDON_PRICE_INR, SONG_ADDON_PRICE_INR, formatINR } from '@/lib/templates/pricing'

const VP = { once: true, margin: '-60px' } as const

const FEATURES = [
  { title: 'Map navigation', desc: 'Guests get one-tap directions straight to your venue.' },
  { title: 'Live RSVP tracking', desc: 'See who\'s coming from a private dashboard — optional add-on.' },
  { title: 'Countdown timer', desc: 'Builds anticipation with a live countdown to the big day.' },
  { title: 'Religion-authentic themes', desc: 'Colors, script, and blessings matched to Nikah, Vivaha, or Wedding traditions.' },
  { title: 'One shareable link', desc: 'Works anywhere WhatsApp does — no app, no download for guests.' },
  { title: 'Custom song', desc: 'Swap in your own track instead of the default — optional add-on.' },
] as const

function Label({ text, dark = true }: { text: string; dark?: boolean }) {
  const c = dark ? 'rgba(255,255,255,0.55)' : 'rgba(58,13,10,0.5)'
  return (
    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: c, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 18, height: 1, background: c, display: 'inline-block' }} />
      {text}
    </p>
  )
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 2 }}
      animate={{ opacity: 1, y: [0, -10, 0], rotate: 2 }}
      transition={{ opacity: { duration: 0.7, ease: 'easeOut' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 } }}
      className="relative mx-auto"
      style={{ width: 'clamp(240px, 72vw, 320px)', aspectRatio: '390 / 844' }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: 34, border: '7px solid #1a0806', background: '#1a0806', boxShadow: '0 24px 60px rgba(0,0,0,0.45)' }}
      >
        <iframe
          src="/templates/demo/muslim-red?skip=1"
          title="Live wedding invitation preview"
          tabIndex={-1}
          aria-hidden="true"
          className="w-full h-full"
          style={{ border: 0, pointerEvents: 'none' }}
        />
      </div>
    </motion.div>
  )
}

export default function WeddingInvitationsClient() {
  const showcaseVariants = TEMPLATE_VARIANTS.filter((v) => v.kind === 'poster').slice(0, 6)

  return (
    <>
      {/* HERO — warm, celebratory */}
      <section
        className="relative px-6 pt-40 pb-24 md:pt-48 md:pb-32"
        style={{ background: 'linear-gradient(160deg, #3A0D0A 0%, #5C1610 55%, #7A2413 100%)' }}
      >
        <div className="max-w-5xl mx-auto grid gap-10 md:gap-14 md:grid-cols-2 items-center">
          <div className="order-1 md:order-2">
            <HeroPreview />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="order-2 md:order-1 text-center md:text-left"
          >
            <Label text="Webbes Wedding Invitations" />
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.1rem, 5vw, 3.2rem)', fontWeight: 700, color: '#FFF6EA', letterSpacing: '-1px', lineHeight: 1.1 }}>
              You know those printed wedding cards everyone throws away?
            </h1>
            <p className="mt-6 mx-auto md:mx-0 max-w-md" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '1.02rem', color: 'rgba(255,246,234,0.75)', lineHeight: 1.7 }}>
              I make the same thing, but animated and digital — a wedding invitation website every guest opens on WhatsApp, keeps, and actually looks at more than once.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(255,255,255,0.1)', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '0.9rem', color: '#FFF6EA' }}>
              Starting at <strong>{formatINR(BASE_PRICE_INR)}</strong>
              <span style={{ color: 'rgba(255,246,234,0.5)', textDecoration: 'line-through' }}>{formatINR(LIST_PRICE_INR)}</span>
            </p>
            <div className="mt-8">
              <Link
                href="/templates"
                className="inline-block px-8 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02]"
                style={{ fontFamily: "'Syne', sans-serif", background: '#FFF6EA', color: '#3A0D0A' }}
              >
                Browse templates & build yours →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEMPLATE SHOWCASE */}
      <section style={{ background: '#FFFBF3', padding: 'clamp(64px,8vw,110px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="Pick your style" dark={false} />
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#3A0D0A', letterSpacing: '-1px', marginBottom: 10 }}>
            {RELIGIONS.length} traditions, {TEMPLATE_VARIANTS.length} styles — or upload your own photo.
          </motion.h2>
          <p style={{ fontSize: '0.92rem', color: 'rgba(58,13,10,0.55)', maxWidth: 500, marginBottom: 40 }}>
            Every template is fully live in the editor before you pay a rupee.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseVariants.map((v, i) => (
              <motion.div key={v.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}>
                <Link href={`/templates/demo/${v.id}`} target="_blank" className="group block rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: 'rgba(58,13,10,0.1)', background: '#fff' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '9 / 16' }}>
                    <Image src={v.thumbnail} alt={v.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#3A0D0A' }}>{v.label}</p>
                    <p style={{ fontSize: '12.5px', color: 'rgba(58,13,10,0.5)', marginTop: 2, textTransform: 'capitalize' }}>{v.religion}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/templates" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ fontFamily: "'Syne', sans-serif", color: '#7A2413' }}>
              See all styles on webbes.in/templates →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: '#3A0D0A', padding: 'clamp(64px,8vw,110px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="What's included" />
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#FFF6EA', letterSpacing: '-1px', marginBottom: 44 }}>
            Everything a proper invitation needs.
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
                className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.02rem', fontWeight: 700, color: '#FFF6EA', marginBottom: 8 }}>{f.title}</p>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,246,234,0.55)', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ background: '#FFFBF3', padding: 'clamp(64px,8vw,110px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <Label text="Pricing" dark={false} />
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#3A0D0A', letterSpacing: '-1px', marginBottom: 24 }}>
            Simple, one-time pricing.
          </motion.h2>
          <div className="rounded-2xl p-8 mb-6" style={{ background: '#fff', border: '1px solid rgba(58,13,10,0.1)' }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.4rem', fontWeight: 700, color: '#7A2413' }}>
              {formatINR(BASE_PRICE_INR)} <span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'rgba(58,13,10,0.4)', textDecoration: 'line-through' }}>{formatINR(LIST_PRICE_INR)}</span>
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(58,13,10,0.55)', marginTop: 8 }}>per invitation, one-time — no subscription</p>
            <div className="mt-6 pt-6 text-left" style={{ borderTop: '1px solid rgba(58,13,10,0.08)' }}>
              <p style={{ fontSize: '0.85rem', color: 'rgba(58,13,10,0.6)', marginBottom: 8 }}>+ {formatINR(RSVP_ADDON_PRICE_INR)} — RSVP tracking add-on</p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(58,13,10,0.6)' }}>+ {formatINR(SONG_ADDON_PRICE_INR)} — custom song add-on</p>
            </div>
          </div>
          <Link href="/templates" className="inline-block px-8 py-3.5 rounded-full text-sm font-semibold" style={{ fontFamily: "'Syne', sans-serif", background: '#7A2413', color: '#FFF6EA' }}>
            Start building your invitation →
          </Link>
        </div>
      </section>
    </>
  )
}
