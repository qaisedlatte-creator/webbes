'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'
import ChatWidget from '@/components/ai-demo/ChatWidget'
import { TEMPLATE_VARIANTS } from '@/lib/templates/posterVariants'
import { BASE_PRICE_INR, LIST_PRICE_INR, formatINR } from '@/lib/templates/pricing'

const VP = { once: true, margin: '-60px' } as const

// ─── Shared label / heading ────────────────────────────────────────────────
function Label({ text, dark = false }: { text: string; dark?: boolean }) {
  const c = dark ? 'rgba(255,255,255,0.32)' : 'rgba(10,10,10,0.32)'
  return (
    <motion.p
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: c, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}
    >
      <span style={{ width: 18, height: 1, background: c, flexShrink: 0, display: 'inline-block' }} />
      {text}
    </motion.p>
  )
}

function Heading({ children, dark = false, delay = 0 }: { children: React.ReactNode; dark?: boolean; delay?: number }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, color: dark ? '#ffffff' : '#0a0a0a', letterSpacing: '-1px', lineHeight: 1.1, margin: 0 }}
    >
      {children}
    </motion.h2>
  )
}

// ─── Data ───────────────────────────────────────────────────────────────────
const AI_FEATURES = [
  { title: 'Instant WhatsApp replies', desc: '24/7, even at 3am — no more losing leads to slow response times.' },
  { title: 'Lead qualification', desc: 'Only the leads worth calling land in your hands.' },
  { title: 'Booking, built in', desc: 'Customers book directly in the chat — no back-and-forth.' },
] as const

const PORTFOLIO_SITES = [
  { name: 'Prism India', url: 'https://prismindia.co', img: '/prism-india.png' },
  { name: 'Al Hilal Print', url: 'https://alhilalprint.com', img: '/al-hilal-og.jpg' },
  { name: 'Pearl Imperial International', url: 'https://pearlimperialintl.com', img: '/pearl-imperial.png' },
] as const

const FAQS = [
  { q: 'What does Webbes actually build?', a: 'AI automation for WhatsApp and business workflows is our primary focus, alongside digital wedding invitation websites and full custom websites/e-commerce stores.' },
  { q: 'How much does an AI automation cost?', a: 'It depends on scope — a simple FAQ-and-booking agent costs less than a full lead-qualification system. Message us on WhatsApp for a straight number after a quick call.' },
  { q: 'Do you work with clients outside India?', a: 'Yes. We actively serve clients across India and the GCC (UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman).' },
  { q: 'What makes Webbes different?', a: 'Every project is handled directly by Qais — no middlemen, no outsourcing. AI-first approach, direct communication, fast delivery. You own everything we build.' },
] as const

// ─── Page ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const weddingVariants = TEMPLATE_VARIANTS.filter((v) => v.kind === 'poster').slice(0, 3)

  return (
    <>
      {/* HERO — AI automation pain point, opens the page */}
      <HeroCinematic text="You message a business on WhatsApp. Nobody replies for six hours." speed={22}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <p style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.55)', maxWidth: 560, lineHeight: 1.6, textAlign: 'center' }}>
            I build the AI agent that replies instantly instead. Webbes — AI automation, wedding invitations, and websites. Kochi, India.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#ai-demo" className="glass-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#0a0a0a', background: 'rgba(255,255,255,0.95)', border: '1.5px solid rgba(255,255,255,0.85)', borderRadius: 100, padding: '13px 30px', textDecoration: 'none' }}>
              Try the live demo ↓
            </a>
          </div>
        </div>
      </HeroCinematic>

      {/* ── AI AUTOMATION — primary focus, most real estate ─────────────────── */}
      <section id="ai-demo" style={{ background: '#0a0a0a', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="AI Automation" dark />
          <Heading dark delay={0.05}>The agent that never lets<br />a lead go quiet.</Heading>
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.45, delay: 0.1 }}
            style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.4)', maxWidth: 460, lineHeight: 1.7, marginTop: 16, marginBottom: 40 }}>
            Try it right now — pick a persona and message it exactly like a real customer would.
          </motion.p>

          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, delay: 0.1 }}>
              <ChatWidget />
            </motion.div>

            <div>
              {AI_FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.45, delay: i * 0.08 }}
                  style={{ padding: '22px 0', borderTop: '1px solid rgba(255,255,255,0.08)', ...(i === AI_FEATURES.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.08)' } : {}) }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.02rem', color: '#fff', marginBottom: 6 }}>{f.title}</p>
                  <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.6 }}>{f.desc}</p>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.35, delay: 0.3 }} style={{ marginTop: 28 }}>
                <Link href="/ai-automation" className="glass-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#fff', background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100, padding: '13px 28px', textDecoration: 'none' }}>
                  See pricing & how it works →
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WEDDING INVITATIONS — secondary, links to /templates ────────────── */}
      <section style={{ background: 'linear-gradient(160deg, #3A0D0A 0%, #5C1610 60%, #7A2413 100%)', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="Wedding Invitations" dark />
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, delay: 0.05 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 700, color: '#FFF6EA', letterSpacing: '-1px' }}>
            Printed cards get thrown away.<br />This gets shared on WhatsApp.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.45, delay: 0.1 }}
            style={{ fontSize: '0.92rem', color: 'rgba(255,246,234,0.65)', maxWidth: 460, lineHeight: 1.7, marginTop: 16, marginBottom: 40 }}>
            Animated wedding invitation websites for Islamic, Hindu, and Christian weddings — starting at {formatINR(BASE_PRICE_INR)}{' '}
            <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>{formatINR(LIST_PRICE_INR)}</span>.
          </motion.p>

          <div className="grid gap-5 sm:grid-cols-3 mb-10">
            {weddingVariants.map((v, i) => (
              <motion.a
                key={v.id}
                href="https://webbes.in/templates"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group block rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={v.thumbnail} alt={v.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </motion.a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/wedding-invitations" className="glass-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#3A0D0A', background: '#FFF6EA', borderRadius: 100, padding: '13px 30px', textDecoration: 'none' }}>
              Explore wedding invitations →
            </Link>
            <a href="https://webbes.in/templates" className="glass-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.85rem', color: '#FFF6EA', border: '1.5px solid rgba(255,246,234,0.3)', borderRadius: 100, padding: '13px 28px', textDecoration: 'none' }}>
              Browse templates
            </a>
          </div>
        </div>
      </section>

      {/* ── WEBSITES — smallest, portfolio strip ─────────────────────────────── */}
      <section style={{ background: '#fff', padding: 'clamp(56px,7vw,90px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
            <div>
              <Label text="Websites" />
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.5px' }}>
                Full websites & e-commerce, when you need one.
              </h2>
            </div>
            <Link href="/portfolio" className="text-sm font-semibold" style={{ fontFamily: "'Syne', sans-serif", color: '#2563EB' }}>
              See all sites →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {PORTFOLIO_SITES.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group block rounded-xl overflow-hidden border border-black/8"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image src={s.img} alt={s.name} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.85rem', fontWeight: 700, color: '#0a0a0a', padding: '10px 12px' }}>{s.name}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="FAQ" />
          <Heading delay={0.05}>Common questions.</Heading>
          <div style={{ maxWidth: 760, marginTop: 48 }}>
            {FAQS.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.06 }}
                style={{ borderTop: '1px solid rgba(0,0,0,0.08)', ...(i === FAQS.length - 1 ? { borderBottom: '1px solid rgba(0,0,0,0.08)' } : {}) }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'none', border: 'none', textAlign: 'left', color: '#0a0a0a', fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.93rem', gap: 16, lineHeight: 1.4, cursor: 'pointer' }}>
                  {f.q}
                  <span style={{ fontSize: '1.2rem', fontWeight: 300, color: 'rgba(10,10,10,0.32)', flexShrink: 0, transition: 'transform 0.25s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? '400px' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'max-height 0.4s ease, opacity 0.3s ease' }}>
                  <p style={{ paddingBottom: 20, fontSize: '0.88rem', lineHeight: 1.72, color: 'rgba(10,10,10,0.48)' }}>{f.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: '#0a0a0a', padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <Label text="Get In Touch" dark />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-1.5px', lineHeight: 1.0, marginBottom: 18, marginTop: 0 }}>
            Ready to build?
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.72, marginBottom: 32 }}>
            Tell us about your project and we&apos;ll get back within 24 hours. No sales pitch — just straight talk.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="glass-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: '#0a0a0a', background: 'rgba(255,255,255,0.95)', border: '1.5px solid rgba(255,255,255,0.85)', borderRadius: 100, padding: '13px 32px', textDecoration: 'none' }}>
              Start a Project →
            </Link>
            <a href="https://wa.me/919149681874" target="_blank" rel="noopener noreferrer" className="glass-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1.5px solid rgba(255,255,255,0.15)', color: '#ffffff', padding: '13px 28px', fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.88rem', background: 'rgba(255,255,255,0.07)', borderRadius: 100, textDecoration: 'none' }}>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
