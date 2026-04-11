'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'
import { BeforeAfterSlider } from '@/components/ui/before-after-slider'

const VP = { once: true, margin: '-60px' } as const

// ─── Section label — wecascon style ─────────────────────────────────────────
function Label({ text, dark = false }: { text: string; dark?: boolean }) {
  const c = dark ? 'rgba(255,255,255,0.35)' : 'rgba(10,10,10,0.35)'
  return (
    <motion.p
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: c,
        marginBottom: 28,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{ display: 'inline-block', width: 20, height: 1, background: c, flexShrink: 0 }} />
      {text}
    </motion.p>
  )
}

// ─── Section heading ─────────────────────────────────────────────────────────
function Heading({
  children,
  dark = false,
  size = 'lg',
  delay = 0,
}: {
  children: React.ReactNode
  dark?: boolean
  size?: 'lg' | 'md'
  delay?: number
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: size === 'lg' ? 'clamp(2rem, 4.5vw, 3.2rem)' : 'clamp(1.5rem, 3vw, 2.2rem)',
        fontWeight: 700,
        color: dark ? '#ffffff' : '#0a0a0a',
        letterSpacing: '-1px',
        lineHeight: 1.1,
        margin: 0,
      }}
    >
      {children}
    </motion.h2>
  )
}

// ─── Mission card ─────────────────────────────────────────────────────────────
function MissionCard({ title, desc, i }: { title: string; desc: string; i: number }) {
  const [on, setOn] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.09 }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        background: '#0a0a0a',
        borderLeft: `2px solid ${on ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.12)'}`,
        padding: '28px 32px',
        transition: 'border-color 0.3s, transform 0.25s',
        transform: on ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: 0 }}>
        {title}
      </h4>
      <div
        style={{
          maxHeight: on ? '160px' : 0,
          overflow: 'hidden',
          opacity: on ? 1 : 0,
          marginTop: on ? 10 : 0,
          transition: 'max-height 0.38s ease, opacity 0.3s ease, margin-top 0.3s ease',
        }}
      >
        <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
      </div>
    </motion.div>
  )
}

// ─── Portfolio card ───────────────────────────────────────────────────────────
function PortfolioCard({
  name,
  tags,
  url,
  img,
  i,
}: {
  name: string
  tags: string[]
  url: string
  img: string
  i: number
}) {
  const [on, setOn] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      {/* Image block */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#111',
          aspectRatio: '4 / 3',
          marginBottom: 16,
        }}
      >
        {!imgErr && (
          <img
            src={img}
            alt={name}
            onError={() => setImgErr(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.5s ease',
              transform: on ? 'scale(1.02)' : 'scale(1)',
            }}
          />
        )}
        {imgErr && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                color: 'rgba(255,255,255,0.15)',
                letterSpacing: '-1px',
                textAlign: 'center',
                padding: '0 20px',
              }}
            >
              {name}
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            opacity: on ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>

      {/* Meta */}
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: '1rem',
          color: '#0a0a0a',
          marginBottom: 6,
          transition: 'opacity 0.2s',
          opacity: on ? 0.55 : 1,
        }}
      >
        {name}
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tags.map(t => (
          <span
            key={t}
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.38)',
              fontWeight: 600,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  )
}

// ─── Founder card ─────────────────────────────────────────────────────────────
function FounderCard({ name, role, line, i }: { name: string; role: string; line: string; i: number }) {
  const [on, setOn] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.12 }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        background: '#f8f8f8',
        border: `1px solid ${on ? 'rgba(0,0,0,0.16)' : 'rgba(0,0,0,0.07)'}`,
        padding: '40px 36px',
        transition: 'transform 0.35s ease, border-color 0.3s',
        transform: on
          ? `rotate(${i % 2 === 0 ? '1.3deg' : '-1.3deg'}) translateY(-5px)`
          : 'none',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          background: '#0a0a0a',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: '1.1rem',
          color: '#fff',
          marginBottom: 20,
          transition: 'transform 0.3s',
          transform: on ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {name[0]}
      </div>
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#0a0a0a',
          letterSpacing: '-0.3px',
          marginBottom: 0,
        }}
      >
        {name}
      </h3>
      <div
        style={{
          maxHeight: on ? '120px' : 0,
          overflow: 'hidden',
          opacity: on ? 1 : 0,
          marginTop: on ? 10 : 0,
          transition: 'max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease',
        }}
      >
        <p
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.4)',
            fontWeight: 600,
            marginBottom: 6,
          }}
        >
          {role}
        </p>
        <p style={{ fontSize: '0.875rem', color: 'rgba(10,10,10,0.55)', lineHeight: 1.6 }}>{line}</p>
      </div>
    </motion.div>
  )
}

// ─── Auto carousel ────────────────────────────────────────────────────────────
const SLIDES = [
  {
    name: 'Dept Store',
    tag: 'E-Commerce · India',
    url: 'https://deptstore.in',
    img: '/dept-store.png',
  },
  {
    name: 'Pearl Imperial International',
    tag: 'B2B · Dubai',
    url: 'https://pearlimperialintl.com',
    img: '/pearl-imperial.png',
  },
]

function Carousel() {
  const [active, setActive] = useState(0)
  const [imgErrs, setImgErrs] = useState<boolean[]>(SLIDES.map(() => false))
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = (idx: number) => {
    setActive(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length)
  }

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setActive(a => (a + 1) % SLIDES.length), 4000)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % SLIDES.length), 4000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const s = SLIDES[active]

  return (
    <div style={{ position: 'relative' }}>
      {/* Slide */}
      <div
        style={{
          position: 'relative',
          background: '#111',
          overflow: 'hidden',
          aspectRatio: '16 / 7',
        }}
      >
        {!imgErrs[active] && (
          <img
            key={active}
            src={s.img}
            alt={s.name}
            onError={() => setImgErrs(prev => { const n = [...prev]; n[active] = true; return n })}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              animation: 'fade-in 0.5s ease',
            }}
          />
        )}
        {imgErrs[active] && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 6vw, 4rem)', color: 'rgba(255,255,255,0.08)', letterSpacing: '-2px' }}>
              {s.name}
            </span>
          </div>
        )}
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />

        {/* Bottom text */}
        <div style={{ position: 'absolute', bottom: 28, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: '#fff', letterSpacing: '-0.3px', marginBottom: 4 }}>{s.name}</p>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{s.tag}</p>
          </div>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '0.82rem',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '10px 22px',
              letterSpacing: '0.04em',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
          >
            View Project →
          </a>
        </div>

        {/* Arrow controls */}
        {(['←', '→'] as const).map((arrow, ai) => (
          <button
            key={arrow}
            onClick={() => { go(active + (ai === 0 ? -1 : 1)); reset() }}
            aria-label={ai === 0 ? 'Previous slide' : 'Next slide'}
            style={{
              position: 'absolute',
              top: '50%',
              [ai === 0 ? 'left' : 'right']: 20,
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')}
          >
            {arrow}
          </button>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
        {SLIDES.map((_, di) => (
          <button
            key={di}
            onClick={() => { go(di); reset() }}
            aria-label={`Slide ${di + 1}`}
            style={{
              width: active === di ? 24 : 8,
              height: 8,
              background: active === di ? '#0a0a0a' : 'rgba(0,0,0,0.2)',
              border: 'none',
              borderRadius: 4,
              transition: 'width 0.3s ease, background 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Inline contact form ──────────────────────────────────────────────────────
function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${msg}`
    window.location.href = `mailto:webbes.in@gmail.com?subject=Project Enquiry from ${encodeURIComponent(name)}&body=${body}`
  }

  const field: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    padding: '12px 0',
    fontSize: '0.95rem',
    color: '#ffffff',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        style={field}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.6)')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
      />
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={field}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.6)')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
      />
      <textarea
        placeholder="Tell us about your project..."
        value={msg}
        onChange={e => setMsg(e.target.value)}
        required
        rows={4}
        style={{ ...field, resize: 'vertical' }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.6)')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
      />
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          type="submit"
          style={{
            background: '#ffffff',
            color: '#0a0a0a',
            border: 'none',
            padding: '13px 32px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '0.88rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Start a Project →
        </button>
        <a
          href="https://wa.me/919149681874"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            border: '1.5px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            padding: '13px 28px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: '0.88rem',
            background: 'transparent',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
        >
          Chat on WhatsApp
        </a>
      </div>
    </form>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const PORTFOLIO = [
  { name: 'Pearl Imperial International', tags: ['B2B', 'Dubai'], url: 'https://pearlimperialintl.com', img: '/pearl-imperial.png' },
  { name: 'Dept Store', tags: ['E-Commerce', 'India'], url: 'https://deptstore.in', img: '/dept-store.png' },
  { name: 'Prism India', tags: ['Shopify', 'India'], url: 'https://prismindia.co', img: '/prism-india.png' },
]

const MISSION = [
  { title: 'Mission-Driven', desc: "Building something we'd be genuinely proud of — a Kochi agency known for honest work and real outcomes." },
  { title: 'Rapid Delivery', desc: 'Tight cycles, meticulous quality, and on-time delivery — every time.' },
  { title: 'True Partnership', desc: 'Your growth is our growth. Your success is our reputation.' },
  { title: 'AI-First Approach', desc: "We embed AI and automation into everything we build — giving your business an unfair competitive edge." },
]

const FOUNDERS = [
  { name: 'Qais', role: 'Co-Founder · Strategy & Development', line: 'Builds the systems. Thinks in outcomes.' },
  { name: 'Falah', role: 'Co-Founder · Design & Client Work', line: 'Crafts the interfaces. Owns the detail.' },
]

const TICKER_ITEMS = [
  'Pearl Imperial International',
  'Dept Store',
  'Prism India',
  'Pearl Imperial International',
  'Dept Store',
  'Prism India',
]

const PARTNERS = [
  { name: 'Shopify', src: '/images/partners/shopify.png' },
  { name: 'Figma', src: '/images/partners/figma.png' },
  { name: 'Higgsfield', src: '/images/partners/higgsfield.png' },
  { name: 'GitHub', src: '/images/partners/github.png' },
  { name: 'Vercel', src: '/images/partners/vercel.png' },
]

const SERVICES_LIST = [
  { icon: '◻', title: 'Websites', desc: 'Custom-built, fast, conversion-focused.' },
  { icon: '◻', title: 'E-Commerce', desc: 'Shopify, WooCommerce, or fully custom.' },
  { icon: '◻', title: 'AI Automation', desc: 'Workflows that eliminate busywork.' },
  { icon: '◻', title: 'Branding', desc: 'Identities worth remembering.' },
]

const FAQS = [
  { q: 'What services does Webbes offer?', a: 'Website Development, AI Automation, E-Commerce stores, and Branding. We handle every project ourselves — no outsourcing.' },
  { q: 'How long does a website project take?', a: 'A landing page: 3–5 days. A full website: 2–4 weeks. We give you a precise timeline in your first call.' },
  { q: 'Do you work with clients outside India?', a: 'Yes. We actively serve clients across India and the GCC (UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman).' },
  { q: 'What makes Webbes different?', a: 'Every project is handled directly by Qais and Falah — no middlemen. AI-first approach, direct communication, fast delivery. You own everything we build.' },
  { q: 'Do you offer support after launch?', a: 'Yes. Post-launch support covers maintenance, updates, performance monitoring, and ongoing optimisation.' },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* ── SCROLL 1: HERO ────────────────────────────────────────────────── */}
      <HeroCinematic text="We are Webbes. The digital agency that's going to build your brand.">
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.38)',
            letterSpacing: '0.08em',
          }}
        >
          Web Design · AI Automation · E-Commerce · Kochi, India
        </p>
      </HeroCinematic>

      {/* ── SCROLL 2: WHAT WE DO ──────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="What We Do" />
          <Heading delay={0.05}>Everything your<br />business needs.</Heading>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0',
              marginTop: 56,
            }}
          >
            {SERVICES_LIST.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.09 }}
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.09)',
                  padding: '32px 0 32px 0',
                  ...(i < SERVICES_LIST.length - 1 ? { borderRight: '1px solid rgba(0,0,0,0.09)' } : {}),
                  paddingRight: i < SERVICES_LIST.length - 1 ? 32 : 0,
                  paddingLeft: i > 0 ? 32 : 0,
                }}
              >
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#0a0a0a', marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(10,10,10,0.5)', lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.35 }}
            style={{ marginTop: 40 }}
          >
            <a
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '0.85rem',
                color: '#0a0a0a',
                borderBottom: '1px solid rgba(0,0,0,0.25)',
                paddingBottom: 2,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              All Services →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="Real Work · Kerala Real Estate" />
          <Heading delay={0.05}>This is what we fix.</Heading>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.9rem', color: 'rgba(10,10,10,0.45)', maxWidth: 480, lineHeight: 1.7, marginTop: 16, marginBottom: 48 }}
          >
            A Kozhikode real estate company running on a 2005-era portal. We rebuilt it from scratch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <BeforeAfterSlider
              beforeImage="/case-study-before.png"
              afterImage="/case-study-after.png"
              beforeLabel="BEFORE"
              afterLabel="AFTER — What Webbes will build you"
            />
          </motion.div>

          <p style={{ marginTop: 14, fontSize: '0.75rem', color: 'rgba(10,10,10,0.28)', textAlign: 'center' }}>
            Real project. Real transformation.
          </p>
        </div>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="Live Work" />
          <Heading delay={0.05}>Real Work. Real Results.</Heading>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.9rem', color: 'rgba(10,10,10,0.4)', marginTop: 12, marginBottom: 52 }}
          >
            Our work speaks for itself.
          </motion.p>

          {/* 2-col grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 32,
            }}
          >
            {PORTFOLIO.map((p, i) => (
              <PortfolioCard key={p.name} {...p} i={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: 48 }}
          >
            <a
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#0a0a0a',
                color: '#ffffff',
                padding: '12px 28px',
                borderRadius: 999,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.04em',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              See All Work →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CLIENT TICKER ────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          background: '#ffffff',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          overflow: 'hidden',
          padding: '16px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'ticker 18s linear infinite',
            gap: 0,
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((name, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 20,
                paddingRight: 20,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.45)',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
              <span style={{ color: 'rgba(10,10,10,0.2)' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── PARTNERS ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'clamp(56px,7vw,96px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="Our Partners" />
          <div
            style={{
              display: 'flex',
              gap: 'clamp(32px, 5vw, 72px)',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: 20,
            }}
          >
            {PARTNERS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.06 }}
                style={{ flexShrink: 0, lineHeight: 0 }}
              >
                <img
                  src={p.src}
                  alt={p.name}
                  style={{
                    height: 28,
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'grayscale(100%) opacity(0.6)',
                    mixBlendMode: 'multiply' as const,
                    background: 'transparent',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION CARDS ────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="Who We Are" />
          <Heading delay={0.05}>Two founders from Kochi.<br />Every project, personally.</Heading>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.9rem', color: 'rgba(10,10,10,0.45)', maxWidth: 480, lineHeight: 1.72, marginTop: 16, marginBottom: 52 }}
          >
            We handle every project ourselves. No outsourcing, no account managers, no telephone game.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {MISSION.map((m, i) => <MissionCard key={m.title} title={m.title} desc={m.desc} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="FAQ" />
          <Heading delay={0.05}>Common questions.</Heading>

          <div style={{ maxWidth: 760, marginTop: 52 }}>
            {FAQS.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.06 }}
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.09)',
                  ...(i === FAQS.length - 1 ? { borderBottom: '1px solid rgba(0,0,0,0.09)' } : {}),
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 0',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: '#0a0a0a',
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    gap: 16,
                    lineHeight: 1.4,
                  }}
                >
                  {f.q}
                  <span style={{ fontSize: '1.2rem', fontWeight: 300, color: 'rgba(10,10,10,0.35)', flexShrink: 0, transition: 'transform 0.25s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>
                    +
                  </span>
                </button>
                <div style={{ maxHeight: openFaq === i ? '400px' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'max-height 0.4s ease, opacity 0.3s ease' }}>
                  <p style={{ paddingBottom: 20, fontSize: '0.9rem', lineHeight: 1.72, color: 'rgba(10,10,10,0.5)' }}>{f.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAROUSEL ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(56px,7vw,96px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="Featured Projects" dark />
          <Heading dark delay={0.05}>Up close.</Heading>
          <div style={{ marginTop: 40 }}>
            <Carousel />
          </div>
        </div>
      </section>

      {/* ── SCROLL 3: CONTACT ─────────────────────────────────────────────── */}
      <section id="contact" style={{ background: '#0a0a0a', padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,64px)' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Label text="Get In Touch" dark />
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-1.5px',
                lineHeight: 1.0,
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              Ready<br />to build?
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.72, marginBottom: 28 }}>
              Tell us about your project and we&apos;ll get back within 24 hours. No sales pitch — just straight talk.
            </p>
            <a
              href="mailto:webbes.in@gmail.com"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                color: '#ffffff',
                letterSpacing: '-0.2px',
                borderBottom: '1px solid rgba(255,255,255,0.25)',
                paddingBottom: 2,
                transition: 'border-color 0.2s, opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.6' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              webbes.in@gmail.com
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  )
}
