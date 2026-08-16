'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'
import ChatWidget from '@/components/ai-demo/ChatWidget'
import { AI_AUTOMATION_FAQS } from '@/lib/ai-demo/faqs'

const VP = { once: true, margin: '-60px' } as const

function Label({ text }: { text: string }) {
  const c = 'rgba(255,255,255,0.35)'
  return (
    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: c, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 18, height: 1, background: c, display: 'inline-block' }} />
      {text}
    </p>
  )
}

const FEATURES = [
  { title: 'Instant WhatsApp replies', desc: 'Every message answered in seconds, 24/7 — even at 3am, even on holidays.' },
  { title: 'Lead qualification', desc: 'Your agent asks the right questions and hands you only the leads worth calling.' },
  { title: 'Booking & scheduling', desc: 'Customers book appointments or viewings directly in the chat — no back-and-forth.' },
  { title: 'Human handoff', desc: "When a conversation needs a real person, it's routed to you with full context — nothing lost." },
  { title: 'Works in your language', desc: 'Malayalam, Hindi, English, Arabic — your customers talk to it however they naturally would.' },
  { title: 'Built on your business', desc: 'Trained on your actual services, pricing, and policies — not a generic script.' },
] as const

const STEPS = [
  { n: '01', title: 'Tell us your business', body: 'A short call — how customers reach you now, where the delays happen, what a good lead looks like.' },
  { n: '02', title: 'We build & train it', body: 'Your AI agent is built around your real services, pricing, and FAQs — not a generic template.' },
  { n: '03', title: 'You review & approve', body: 'You test it yourself before anyone else does. Nothing goes live until you\'re happy with every reply.' },
  { n: '04', title: 'It goes live', body: 'Connected to your WhatsApp Business number, answering instantly — while you sleep, while you\'re with a customer, always.' },
] as const

const FAQS = AI_AUTOMATION_FAQS

export default function AIAutomationClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* HERO — pain point first */}
      <HeroCinematic text="You message a business on WhatsApp. Nobody replies for six hours." speed={22}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <p style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.55)', maxWidth: 560, lineHeight: 1.6 }}>
            I build the AI agent that replies instantly instead — qualifies the lead, books the appointment, and hands off to you only when it actually matters.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="#demo"
              className="glass-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#0a0a0a', background: 'rgba(255,255,255,0.95)', border: '1.5px solid rgba(255,255,255,0.85)', borderRadius: 100, padding: '13px 30px', textDecoration: 'none' }}
            >
              Try the live demo ↓
            </a>
            <a
              href="https://wa.me/918075959157"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.85rem', color: '#fff', background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '13px 28px', textDecoration: 'none' }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </HeroCinematic>

      {/* LIVE DEMO */}
      <section id="demo" style={{ background: '#0a0a0a', padding: 'clamp(64px,8vw,110px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <Label text="Live Demo — Try It Yourself" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 14 }}
          >
            This isn&apos;t a mockup. It&apos;s a real agent, running right now.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.4)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}
          >
            Pick a persona and message it like you would a real business at 1am. It's the same technology behind the agents I build for clients.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}>
            <ChatWidget />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: '#fff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.45 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.32)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 18, height: 1, background: 'rgba(10,10,10,0.32)', display: 'inline-block' }} />
            What you get
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-1px', marginBottom: 48 }}>
            An agent that actually runs your front door.
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
                className="rounded-2xl p-6 border border-black/8" style={{ background: '#faf9f6' }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.02rem', fontWeight: 700, color: '#0a0a0a', marginBottom: 10 }}>{f.title}</p>
                <p style={{ fontSize: '13.5px', color: 'rgba(10,10,10,0.55)', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="How it works" />
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 48 }}>
            From first call to live in your business.
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 700, color: 'rgba(255,255,255,0.12)' }}>{s.n}</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginTop: 4 }}>{s.title}</p>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginTop: 8 }}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING — honest, no invented numbers */}
      <section style={{ background: '#fff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <Label text="Pricing" />
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-1px', marginBottom: 16 }}>
            Priced to what your business actually needs.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.45, delay: 0.1 }}
            style={{ fontSize: '0.92rem', color: 'rgba(10,10,10,0.5)', lineHeight: 1.75, marginBottom: 32 }}>
            A simple FAQ-and-booking agent and a full lead-qualification system cost very differently — so instead of a one-size price list, I'll give you a straight number after a short call about your business. No obligation, no hard sell.
          </motion.p>
          <a
            href="https://wa.me/918075959157"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#fff', background: 'linear-gradient(135deg, #2563EB, #1d4ed8)', borderRadius: 100, padding: '13px 32px', textDecoration: 'none' }}
          >
            Get a quote on WhatsApp →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: '#0a0a0a', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Label text="FAQ" />
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 40 }}>
            Common questions.
          </motion.h2>
          {FAQS.map((f, i) => (
            <motion.div key={f.q} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', ...(i === FAQS.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.08)' } : {}) }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'none', border: 'none', textAlign: 'left', color: '#fff', fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.93rem', gap: 16, lineHeight: 1.4, cursor: 'pointer' }}>
                {f.q}
                <span style={{ fontSize: '1.2rem', fontWeight: 300, color: 'rgba(255,255,255,0.35)', flexShrink: 0, transition: 'transform 0.25s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              <div style={{ maxHeight: openFaq === i ? '400px' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'max-height 0.4s ease, opacity 0.3s ease' }}>
                <p style={{ paddingBottom: 20, fontSize: '0.88rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.48)' }}>{f.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#fff', padding: 'clamp(72px,10vw,120px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }} style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-1px', marginBottom: 16 }}>
            Stop losing leads to slow replies.
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'rgba(10,10,10,0.5)', lineHeight: 1.7, marginBottom: 32 }}>
            Tell me about your business and I&apos;ll show you exactly what an automation for it would look like.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="glass-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#fff', background: '#0a0a0a', borderRadius: 100, padding: '13px 30px', textDecoration: 'none' }}>
              Start a project →
            </Link>
            <a href="https://wa.me/918075959157" target="_blank" rel="noopener noreferrer" className="glass-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.85rem', color: '#0a0a0a', border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: 100, padding: '13px 28px', textDecoration: 'none' }}>
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </>
  )
}
