'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'
import { BeforeAfterSlider } from '@/components/ui/before-after-slider'

const VP = { once: true, margin: '-60px' } as const

// ─── Section label ────────────────────────────────────────────────────────────
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

// ─── Section heading ──────────────────────────────────────────────────────────
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
        borderRadius: 4,
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

// ─── Glass pill tag ────────────────────────────────────────────────────────────
function GlassPill({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      style={{
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: dark ? 'rgba(255,255,255,0.72)' : 'rgba(10,10,10,0.55)',
        fontWeight: 600,
        background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.1)'}`,
        borderRadius: 100,
        padding: '3px 10px',
        whiteSpace: 'nowrap' as const,
      }}
    >
      {children}
    </span>
  )
}

// ─── Portfolio card — editorial, glass hover ───────────────────────────────────
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
          aspectRatio: '4/3',
          background: '#111',
        }}
      >
        {/* Image */}
        {!imgErr ? (
          <img
            src={img}
            alt={name}
            onError={() => setImgErr(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: on ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1rem, 2.5vw, 1.6rem)', color: 'rgba(255,255,255,0.12)', letterSpacing: '-0.5px', textAlign: 'center', padding: '0 20px' }}>
              {name}
            </span>
          </div>
        )}

        {/* Permanent subtle gradient at base */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)', pointerEvents: 'none' }} />

        {/* Glass nameplate — slides up on hover */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '36px 20px 20px',
            backdropFilter: on ? 'blur(14px)' : 'blur(0px)',
            WebkitBackdropFilter: on ? 'blur(14px)' : 'blur(0px)',
            background: on ? 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 60%, transparent 100%)' : 'transparent',
            transform: on ? 'translateY(0)' : 'translateY(6px)',
            opacity: on ? 1 : 0.85,
            transition: 'transform 0.28s ease-out, opacity 0.28s ease-out, backdrop-filter 0.28s ease-out, background 0.28s ease-out',
          }}
        >
          {/* Tags */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
              marginBottom: 10,
              opacity: on ? 1 : 0,
              transform: on ? 'none' : 'translateY(5px)',
              transition: 'opacity 0.22s ease, transform 0.22s ease',
            }}
          >
            {tags.map(t => <GlassPill key={t}>{t}</GlassPill>)}
          </div>
          {/* Client name */}
          <p style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)',
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.2px',
          }}>
            {name}
          </p>
        </div>
      </div>
    </motion.a>
  )
}

// ─── Showcase marquee — top 3 clients, continuous scroll ──────────────────────
const SHOWCASE = [
  {
    name: 'Hotel Grand Blue Star',
    desc: 'Coastal luxury redefined for Mangalore.',
    url: 'https://hotelgrandbluestar.com',
    img: '/grand-blue-star-og.jpg',
  },
  {
    name: 'Pearl Imperial International',
    desc: 'B2B commodity trading, built for the GCC.',
    url: 'https://pearlimperialintl.com',
    img: '/pearl-imperial-og.jpg',
  },
  {
    name: 'Prism India',
    desc: 'Precision-built gymwear for the Indian athlete.',
    url: 'https://prismindia.co',
    img: '/prism-india.png',
  },
]

function ShowcaseMarquee() {
  const items = [...SHOWCASE, ...SHOWCASE, ...SHOWCASE]

  return (
    <div className="marquee-fade" style={{ overflow: 'hidden', margin: '0 calc(-1 * clamp(20px,5vw,64px))' }}>
      <div
        style={{
          display: 'flex',
          gap: 20,
          width: 'max-content',
          animation: 'marquee-scroll 42s linear infinite',
          padding: '4px 24px 20px',
        }}
      >
        {items.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              width: 'clamp(460px, 38vw, 600px)',
              height: 300,
              borderRadius: 24,
              overflow: 'hidden',
              textDecoration: 'none',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#111',
            }}
          >
            {/* Image panel */}
            <div style={{ width: '56%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <img
                src={s.img}
                alt={s.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Info panel */}
            <div
              style={{
                flex: 1,
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.045)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Star badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#F0C040', fontSize: '0.72rem', letterSpacing: 1 }}>★★★★★</span>
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontWeight: 600 }}>Featured</span>
              </div>

              {/* Bottom content */}
              <div>
                <p style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontWeight: 600, marginBottom: 8 }}>
                  Client Work
                </p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(0.92rem, 1.5vw, 1.1rem)', color: '#ffffff', letterSpacing: '-0.3px', marginBottom: 6, lineHeight: 1.2 }}>
                  {s.name}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          </a>
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
          className="glass-btn"
          style={{
            background: 'rgba(255,255,255,0.95)',
            color: '#0a0a0a',
            border: '1.5px solid rgba(255,255,255,0.8)',
            padding: '13px 32px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '0.88rem',
            borderRadius: 100,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
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
          className="glass-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            border: '1.5px solid rgba(255,255,255,0.14)',
            color: '#ffffff',
            padding: '13px 28px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: '0.88rem',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 100,
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
        >
          Chat on WhatsApp
        </a>
      </div>
    </form>
  )
}

// ─── PAGE DATA ────────────────────────────────────────────────────────────────
const PORTFOLIO = [
  { name: 'Pearl Imperial International', tags: ['B2B', 'Branding', 'Web Design'], url: 'https://pearlimperialintl.com', img: '/pearl-imperial-og.jpg' },
  { name: 'Hotel Grand Blue Star',       tags: ['Hospitality', 'Web Design'],       url: 'https://hotelgrandbluestar.com', img: '/grand-blue-star-og.jpg' },
  { name: 'Hearthy India',               tags: ['E-commerce', 'Branding'],           url: 'https://hearthy.in',             img: '/hearthy-og.jpg' },
  { name: 'Prism India',                 tags: ['E-commerce', 'Shopify', 'CRO'],     url: 'https://prismindia.co',          img: '/prism-india.png' },
  { name: 'Al Hilal Print',             tags: ['Branding', 'Print'],                url: 'https://alhilalprint.com',       img: '/al-hilal-og.jpg' },
]

const MISSION = [
  { title: 'Mission-Driven', desc: "Building something we'd be genuinely proud of — a Kochi agency known for honest work and real outcomes." },
  { title: 'Rapid Delivery', desc: 'Tight cycles, meticulous quality, and on-time delivery — every time.' },
  { title: 'True Partnership', desc: 'Your growth is our growth. Your success is our reputation.' },
  { title: 'AI-First Approach', desc: "We embed AI and automation into everything we build — giving your business an unfair competitive edge." },
]

const TICKER_ITEMS = [
  'Pearl Imperial International', 'Hotel Grand Blue Star', 'Hearthy India', 'Prism India', 'Al Hilal Print',
  'Pearl Imperial International', 'Hotel Grand Blue Star', 'Hearthy India', 'Prism India', 'Al Hilal Print',
]

const PARTNERS: Array<
  | { name: string; type: 'img'; src: string; h: number }
  | { name: string; type: 'text' }
> = [
  { name: 'Shopify',    type: 'img',  src: '/images/partners/shopify.svg',  h: 26 },
  { name: 'Figma',      type: 'img',  src: '/images/partners/figma.svg',    h: 32 },
  { name: 'Higgsfield', type: 'text' },
  { name: 'GitHub',     type: 'img',  src: '/images/partners/github.svg',   h: 24 },
  { name: 'Vercel',     type: 'img',  src: '/images/partners/vercel.svg',   h: 18 },
]

const SERVICES_LIST = [
  { icon: '◻', title: 'Website Development', desc: 'Custom-built, fast, conversion-focused.' },
  { icon: '◻', title: 'E-Commerce', desc: 'Shopify, WooCommerce, or fully custom.' },
  { icon: '◻', title: 'AI Automation', desc: 'Workflows that eliminate busywork.' },
  { icon: '◻', title: 'SEO & AEO', desc: 'Get found on Google and AI search engines.' },
]

const FAQS = [
  { q: 'What services does Webbes offer?', a: 'Website Development, AI Automation, E-Commerce, and SEO & AEO. We handle every project ourselves — no outsourcing.' },
  { q: 'How long does a website project take?', a: 'A landing page: 3–5 days. A full website: 2–4 weeks. We give you a precise timeline in your first call.' },
  { q: 'Do you work with clients outside India?', a: 'Yes. We actively serve clients across India and the GCC (UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman).' },
  { q: 'What makes Webbes different?', a: 'Every project is handled directly by Qais and Falah — no middlemen. AI-first approach, direct communication, fast delivery. You own everything we build.' },
  { q: 'Do you offer support after launch?', a: 'Yes. Post-launch support covers maintenance, updates, performance monitoring, and ongoing optimisation.' },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
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

      {/* ── WHAT WE DO ────────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="What We Do" />
          <Heading delay={0.05}>Everything your<br />business needs.</Heading>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 0,
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
                  padding: '32px 0',
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

      {/* ── BEFORE / AFTER ────────────────────────────────────────────────── */}
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

      {/* ── PORTFOLIO ─────────────────────────────────────────────────────── */}
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

          {/* 3-col editorial grid */}
          <div
            className="portfolio-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}
          >
            {/* First row: 3 cards */}
            {PORTFOLIO.slice(0, 3).map((p, i) => (
              <PortfolioCard key={p.name} {...p} i={i} />
            ))}
            {/* Second row: 2 cards, centered */}
            <div
              className="portfolio-row2"
              style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, maxWidth: 'calc(66.666% + 10px)' }}
            >
              {PORTFOLIO.slice(3).map((p, i) => (
                <PortfolioCard key={p.name} {...p} i={i + 3} />
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 767px) {
              .portfolio-grid { grid-template-columns: 1fr !important; }
              .portfolio-row2 { grid-template-columns: 1fr !important; max-width: 100% !important; }
            }
            @media (max-width: 1023px) and (min-width: 768px) {
              .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
              .portfolio-row2 { grid-template-columns: repeat(2, 1fr) !important; max-width: 100% !important; }
            }
          `}</style>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: 48 }}
          >
            <a
              href="/services"
              className="glass-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(10,10,10,0.92)',
                color: '#ffffff',
                padding: '12px 28px',
                borderRadius: 100,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.04em',
                border: '1.5px solid rgba(10,10,10,0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
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

      {/* ── CLIENT TICKER ─────────────────────────────────────────────────── */}
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
          className="ticker-fade"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'ticker 24s linear infinite',
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

      {/* ── PARTNERS ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#fafaf9', padding: 'clamp(44px,5.5vw,72px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Label + logos row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px,3.5vw,52px)', flexWrap: 'wrap' }}>
            {/* OUR PARTNERS label */}
            <div style={{ flexShrink: 0 }}>
              <p style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.58rem',
                fontWeight: 700,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.32)',
                margin: 0,
                whiteSpace: 'nowrap',
              }}>
                Our Partners
              </p>
            </div>

            {/* Vertical separator */}
            <div style={{ width: 1, height: 36, background: 'rgba(0,0,0,0.1)', flexShrink: 0 }} />

            {/* Logos */}
            <div style={{ display: 'flex', gap: 'clamp(24px,3.5vw,52px)', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
              {PARTNERS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.06 }}
                  style={{
                    flexShrink: 0,
                    filter: 'grayscale(100%) opacity(0.42)',
                    transition: 'filter 0.28s ease',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.filter = 'grayscale(0%) opacity(1)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.filter = 'grayscale(100%) opacity(0.42)')}
                >
                  {p.type === 'img' ? (
                    <img src={p.src} alt={p.name} style={{ height: p.h, width: 'auto', display: 'block' }} />
                  ) : (
                    <span style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase' as const,
                      color: '#0a0a0a',
                      lineHeight: 1,
                      display: 'block',
                    }}>
                      {p.name}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Separator + CTA */}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href="#contact"
              className="glass-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '0.76rem',
                color: '#0a0a0a',
                letterSpacing: '0.04em',
                padding: '8px 18px',
                borderRadius: 100,
                border: '1.5px solid rgba(0,0,0,0.1)',
                background: 'rgba(0,0,0,0.03)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.22)'; e.currentTarget.style.background = 'rgba(0,0,0,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; e.currentTarget.style.background = 'rgba(0,0,0,0.03)' }}
            >
              Our clients →
            </a>
          </div>
        </div>
      </section>

      {/* ── MISSION CARDS ─────────────────────────────────────────────────── */}
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

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
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

      {/* ── SHOWCASE CAROUSEL — top 3 clients ─────────────────────────────── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(56px,7vw,96px) 0' }}>
        <div style={{ padding: '0 clamp(20px,5vw,64px)', marginBottom: 40 }}>
          <Label text="Featured Projects" dark />
          <Heading dark delay={0.05}>Work that stands out.</Heading>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.35)', marginTop: 12, maxWidth: 400 }}
          >
            Our top-rated client websites — live, launched, and performing.
          </motion.p>
        </div>
        <ShowcaseMarquee />
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
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
