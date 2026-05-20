'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'
import { BeforeAfterSlider } from '@/components/ui/before-after-slider'

const VP = { once: true, margin: '-60px' } as const

// ─── Shared label ─────────────────────────────────────────────────────────────
function Label({ text, dark = false }: { text: string; dark?: boolean }) {
  const c = dark ? 'rgba(255,255,255,0.32)' : 'rgba(10,10,10,0.32)'
  return (
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
        color: c,
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{ width: 18, height: 1, background: c, flexShrink: 0, display: 'inline-block' }} />
      {text}
    </motion.p>
  )
}

// ─── Shared heading ───────────────────────────────────────────────────────────
function Heading({ children, dark = false, delay = 0 }: { children: React.ReactNode; dark?: boolean; delay?: number }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
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

// ─── Glass pill ───────────────────────────────────────────────────────────────
function Pill({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      style={{
        fontSize: '0.6rem',
        letterSpacing: '0.13em',
        textTransform: 'uppercase',
        color: dark ? 'rgba(255,255,255,0.75)' : 'rgba(10,10,10,0.55)',
        fontWeight: 600,
        background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'}`,
        borderRadius: 100,
        padding: '4px 12px',
        display: 'inline-block',
        whiteSpace: 'nowrap' as const,
      }}
    >
      {children}
    </span>
  )
}

// ─── Case study data ──────────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    n: '01',
    name: 'Pearl Imperial International',
    url: 'https://pearlimperialintl.com',
    img: '/pearl-imperial.png',
    tags: ['B2B', 'Branding', 'Web Design'],
    industry: 'B2B Commodities · Dubai, UAE',
    built: 'Full-scale B2B trade website for a Dubai-based nuts & spices exporter. Credibility-first design with detailed product catalogues, company credentials, and direct inquiry flows built for GCC procurement buyers.',
    impact: 'Gave the business a digital anchor that works 24/7 — opening conversations with Gulf buyers that previously required cold calls. The site now pre-qualifies leads before first contact.',
  },
  {
    n: '02',
    name: 'Hotel Grand Blue Star',
    url: 'https://hotelgrandbluestar.com',
    img: '/grand-blue-star-og.jpg',
    tags: ['Hospitality', 'Web Design'],
    industry: 'Luxury Hotel · Mangalore, India',
    built: 'Complete rebuild from zero — a destination-quality website for a coastal hotel with no prior digital presence. Cormorant Garamond typography, ambient video backgrounds, room browsing, and a friction-free direct inquiry flow.',
    impact: 'Transformed a property with zero digital presence into a bookable destination online. Direct inquiry traffic went from zero to consistent inbound within weeks of launch.',
  },
  {
    n: '03',
    name: 'Hearthy India',
    url: 'https://hearthy.in',
    img: '/hearthy-og.jpg',
    tags: ['E-commerce', 'Branding'],
    industry: 'Health Foods · Kochi, India',
    built: 'Shopify storefront and brand identity for a D2C dry fruits and health food brand. Custom theme with clean product architecture, a warm brand palette, and photography direction built around natural credibility.',
    impact: 'Launched to consistent D2C sales. Mobile-first design outperforms category benchmarks. Brand aesthetic resonates with health-conscious urban buyers across Kerala.',
  },
  {
    n: '04',
    name: 'Prism India',
    url: 'https://prismindia.co',
    img: '/prism-india.png',
    tags: ['E-commerce', 'Shopify', 'CRO'],
    industry: 'Activewear · India',
    built: 'End-to-end Shopify build for a gymwear label entering the Indian fitness market. Custom theme, full product system, COD + UPI + Razorpay integration, and speed-optimised for India\'s mobile-first shoppers.',
    impact: 'Live in under 3 weeks. Sub-2s load on 4G. 80%+ of customers shop on mobile — the site was built for exactly that from day one.',
  },
  {
    n: '05',
    name: 'Al Hilal Print',
    url: 'https://alhilalprint.com',
    img: '/al-hilal-og.jpg',
    tags: ['Branding', 'Print', 'Web Design'],
    industry: 'Print & Branding · UAE',
    built: 'Full Next.js website for a UAE print and branding services company — service architecture with a detailed gallery, structured inquiry system, and SEO content targeting Dubai\'s B2B print buyer segment.',
    impact: 'Positioned Al Hilal as a premium print partner in a competitive market. Organic search visibility grew in key service categories within 60 days of launch.',
  },
]

// ─── Case study row ───────────────────────────────────────────────────────────
function CaseStudyRow({ cs, i }: { cs: (typeof CASE_STUDIES)[0]; i: number }) {
  const [on, setOn] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const flip = i % 2 !== 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      className="cs-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(24px, 4vw, 60px)',
        alignItems: 'center',
        padding: 'clamp(48px, 6vw, 80px) 0',
        borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Image */}
      <div
        className="cs-img"
        style={{
          order: flip ? 2 : 1,
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          aspectRatio: '4/3',
          background: '#1a1a1a',
        }}
      >
        {!imgErr ? (
          <img
            src={cs.img}
            alt={cs.name}
            onError={() => setImgErr(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: on ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: 'rgba(255,255,255,0.08)' }}>{cs.name}</span>
          </div>
        )}
        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)', pointerEvents: 'none' }} />
        {/* Glass number badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.22)',
          borderRadius: 100,
          padding: '4px 14px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em' }}>
            {cs.n}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="cs-content" style={{ order: flip ? 1 : 2 }}>
        {/* Industry label */}
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 700, marginBottom: 14, fontFamily: "'Syne', sans-serif" }}>
          {cs.industry}
        </p>

        {/* Client name */}
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', color: '#ffffff', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: 16 }}>
          {cs.name}
        </h3>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
          {cs.tags.map(t => <Pill key={t}>{t}</Pill>)}
        </div>

        {/* What we built */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', fontWeight: 700, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>
            What we built
          </p>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)' }}>
            {cs.built}
          </p>
        </div>

        {/* Impact — glass card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14,
          padding: '16px 20px',
          marginBottom: 26,
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        }}>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', fontWeight: 700, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>
            Impact
          </p>
          <p style={{ fontSize: '0.86rem', lineHeight: 1.68, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
            {cs.impact}
          </p>
        </div>

        {/* Visit site CTA */}
        <a
          href={cs.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '0.8rem',
            color: '#ffffff',
            background: 'rgba(255,255,255,0.09)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 100,
            padding: '10px 22px',
            textDecoration: 'none',
            transition: 'background 0.22s, border-color 0.22s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}
        >
          Visit Site →
        </a>
      </div>
    </motion.div>
  )
}

// ─── Showcase marquee ─────────────────────────────────────────────────────────
const SHOWCASE = [
  { name: 'Hotel Grand Blue Star', desc: 'Coastal luxury redefined for Mangalore.', url: 'https://hotelgrandbluestar.com', img: '/grand-blue-star-og.jpg' },
  { name: 'Pearl Imperial International', desc: 'B2B commodity trading, built for the GCC.', url: 'https://pearlimperialintl.com', img: '/pearl-imperial.png' },
  { name: 'Prism India', desc: 'Precision-built gymwear for the Indian athlete.', url: 'https://prismindia.co', img: '/prism-india.png' },
]

function ShowcaseMarquee() {
  const items = [...SHOWCASE, ...SHOWCASE, ...SHOWCASE]
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        className="marquee-fade"
        style={{ overflow: 'hidden' }}
      >
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
                width: 'clamp(440px, 36vw, 580px)',
                height: 288,
                borderRadius: 20,
                overflow: 'hidden',
                textDecoration: 'none',
                flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.09)',
                background: '#111',
              }}
            >
              <div style={{ width: '55%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{
                flex: 1,
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#F0C040', fontSize: '0.68rem', letterSpacing: 1 }}>★★★★★</span>
                  <span style={{ fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>Featured</span>
                </div>
                <div>
                  <p style={{ fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 600, marginBottom: 6 }}>Client Work</p>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 1.4vw, 1rem)', color: '#ffffff', letterSpacing: '-0.2px', marginBottom: 5, lineHeight: 1.2 }}>{s.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
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
        background: on ? 'rgba(255,255,255,0.07)' : '#0a0a0a',
        backdropFilter: on ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: on ? 'blur(20px)' : 'none',
        borderLeft: `2px solid ${on ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
        border: on ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
        borderLeftWidth: 2,
        borderLeftColor: on ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)',
        padding: '28px 32px',
        borderRadius: 12,
        transition: 'all 0.3s ease',
        transform: on ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: 0 }}>
        {title}
      </h4>
      <div style={{ maxHeight: on ? '160px' : 0, overflow: 'hidden', opacity: on ? 1 : 0, marginTop: on ? 10 : 0, transition: 'max-height 0.38s ease, opacity 0.3s ease, margin-top 0.3s ease' }}>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
      </div>
    </motion.div>
  )
}

// ─── Contact form ─────────────────────────────────────────────────────────────
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
    borderBottom: '1px solid rgba(255,255,255,0.14)',
    padding: '12px 0',
    fontSize: '0.92rem',
    color: '#ffffff',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required style={field}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.55)')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.14)')} />
      <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required style={field}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.55)')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.14)')} />
      <textarea placeholder="Tell us about your project..." value={msg} onChange={e => setMsg(e.target.value)} required rows={4} style={{ ...field, resize: 'vertical' }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.55)')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.14)')} />
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          type="submit"
          className="glass-btn"
          style={{
            background: 'rgba(255,255,255,0.95)',
            color: '#0a0a0a',
            border: '1.5px solid rgba(255,255,255,0.85)',
            padding: '13px 32px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '0.88rem',
            borderRadius: 100,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            transition: 'opacity 0.2s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
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
            border: '1.5px solid rgba(255,255,255,0.15)',
            color: '#ffffff',
            padding: '13px 28px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: '0.88rem',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 100,
            transition: 'border-color 0.22s, background 0.22s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
        >
          Chat on WhatsApp
        </a>
      </div>
    </form>
  )
}

// ─── Page data ────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'Pearl Imperial International', 'Hotel Grand Blue Star', 'Hearthy India', 'Prism India', 'Al Hilal Print',
  'Pearl Imperial International', 'Hotel Grand Blue Star', 'Hearthy India', 'Prism India', 'Al Hilal Print',
]

const PARTNERS: Array<{ name: string; type: 'img'; src: string; h: number } | { name: string; type: 'text' }> = [
  { name: 'Shopify',    type: 'img',  src: '/images/partners/shopify.svg',  h: 26 },
  { name: 'Figma',      type: 'img',  src: '/images/partners/figma.svg',    h: 32 },
  { name: 'Higgsfield', type: 'text' },
  { name: 'GitHub',     type: 'img',  src: '/images/partners/github.svg',   h: 24 },
  { name: 'Vercel',     type: 'img',  src: '/images/partners/vercel.svg',   h: 18 },
]

const SERVICES_LIST = [
  { title: 'Website Development', desc: 'Custom-built, fast, conversion-focused.' },
  { title: 'E-Commerce', desc: 'Shopify, WooCommerce, or fully custom.' },
  { title: 'AI Automation', desc: 'Workflows that eliminate busywork.' },
  { title: 'SEO & AEO', desc: 'Get found on Google and AI search engines.' },
]

const MISSION = [
  { title: 'Mission-Driven', desc: "Building something we'd be genuinely proud of — a Kochi agency known for honest work and real outcomes." },
  { title: 'Rapid Delivery', desc: 'Tight cycles, meticulous quality, and on-time delivery — every time.' },
  { title: 'True Partnership', desc: 'Your growth is our growth. Your success is our reputation.' },
  { title: 'AI-First Approach', desc: "We embed AI and automation into everything we build — giving your business an unfair competitive edge." },
]

const FAQS = [
  { q: 'What services does Webbes offer?', a: 'Website Development, AI Automation, E-Commerce, and SEO & AEO. We handle every project ourselves — no outsourcing.' },
  { q: 'How long does a website project take?', a: 'A landing page: 3–5 days. A full website: 2–4 weeks. We give you a precise timeline in your first call.' },
  { q: 'Do you work with clients outside India?', a: 'Yes. We actively serve clients across India and the GCC (UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman).' },
  { q: 'What makes Webbes different?', a: 'Every project is handled directly by Qais — no middlemen, no outsourcing. AI-first approach, direct communication, fast delivery. You own everything we build.' },
  { q: 'Do you offer support after launch?', a: 'Yes. Post-launch support covers maintenance, updates, performance monitoring, and ongoing optimisation.' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* HERO */}
      <HeroCinematic text="We are Webbes. The digital agency that's going to build your brand.">
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.08em' }}>
          Web Design · AI Automation · E-Commerce · Kochi, India
        </p>
      </HeroCinematic>

      {/* WHAT WE DO */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="What We Do" />
          <Heading delay={0.05}>Everything your<br />business needs.</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, marginTop: 52 }}>
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
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#0a0a0a', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(10,10,10,0.48)', lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.4, ease: 'easeOut', delay: 0.32 }} style={{ marginTop: 36 }}>
            <a href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem', color: '#0a0a0a', borderBottom: '1px solid rgba(0,0,0,0.22)', paddingBottom: 2, transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              All Services →
            </a>
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO — case studies */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="Our Work" dark />
          <Heading dark delay={0.05}>Five brands.<br />Five transformations.</Heading>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.32)', marginTop: 14, maxWidth: 440, lineHeight: 1.7 }}
          >
            Real projects, real clients, real results — here&apos;s what we built and what changed.
          </motion.p>

          {/* Case study rows */}
          <div style={{ marginTop: 'clamp(48px, 6vw, 80px)' }}>
            {CASE_STUDIES.map((cs, i) => <CaseStudyRow key={cs.n} cs={cs} i={i} />)}
          </div>
        </div>
      </section>

      {/* Responsive case study grid */}
      <style>{`
        @media (max-width: 767px) {
          .cs-row { grid-template-columns: 1fr !important; gap: 28px !important; }
          .cs-img { order: 1 !important; }
          .cs-content { order: 2 !important; }
        }
      `}</style>

      {/* CLIENT TICKER */}
      <div aria-hidden="true" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', padding: '14px 0' }}>
        <div className="ticker-fade" style={{ display: 'flex', width: 'max-content', animation: 'ticker 24s linear infinite', gap: 0 }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((name, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 18, paddingRight: 18, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>
              {name}
              <span style={{ color: 'rgba(255,255,255,0.14)' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* BEFORE / AFTER */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="Real Work · Kerala Real Estate" />
          <Heading delay={0.05}>This is what we fix.</Heading>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.88rem', color: 'rgba(10,10,10,0.42)', maxWidth: 480, lineHeight: 1.72, marginTop: 14, marginBottom: 44 }}
          >
            A Kozhikode real estate company running on a 2005-era portal. We rebuilt it from scratch.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.14 }}>
            <BeforeAfterSlider beforeImage="/case-study-before.png" afterImage="/case-study-after.png" beforeLabel="BEFORE" afterLabel="AFTER — What Webbes will build you" />
          </motion.div>
          <p style={{ marginTop: 12, fontSize: '0.72rem', color: 'rgba(10,10,10,0.24)', textAlign: 'center' }}>Real project. Real transformation.</p>
        </div>
      </section>

      {/* PARTNERS */}
      <section style={{ background: '#fafaf9', padding: 'clamp(44px,5.5vw,72px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(18px,3vw,48px)', flexWrap: 'wrap' }}>
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.3)', margin: 0, whiteSpace: 'nowrap' }}>
                Our Partners
              </p>
            </div>
            <div style={{ width: 1, height: 34, background: 'rgba(0,0,0,0.09)', flexShrink: 0 }} />
            <div style={{ display: 'flex', gap: 'clamp(22px,3.5vw,50px)', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
              {PARTNERS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.06 }}
                  style={{ flexShrink: 0, filter: 'grayscale(100%) opacity(0.4)', transition: 'filter 0.28s ease' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.filter = 'grayscale(0%) opacity(1)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.filter = 'grayscale(100%) opacity(0.4)')}
                >
                  {p.type === 'img' ? (
                    <img src={p.src} alt={p.name} style={{ height: p.h, width: 'auto', display: 'block' }} />
                  ) : (
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#0a0a0a', lineHeight: 1, display: 'block' }}>
                      {p.name}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href="#contact"
              className="glass-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.74rem', color: '#0a0a0a', letterSpacing: '0.04em', padding: '8px 18px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.09)', background: 'rgba(0,0,0,0.025)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', transition: 'border-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.background = 'rgba(0,0,0,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.09)'; e.currentTarget.style.background = 'rgba(0,0,0,0.025)' }}
            >
              Our clients →
            </a>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Label text="Who We Are" />
          <Heading delay={0.05}>Built in Kochi.<br />Every project, personally.</Heading>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.9rem', color: 'rgba(10,10,10,0.44)', maxWidth: 480, lineHeight: 1.72, marginTop: 14, marginBottom: 48 }}
          >
            We handle every project ourselves. No outsourcing, no account managers, no telephone game.
          </motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {MISSION.map((m, i) => <MissionCard key={m.title} {...m} i={i} />)}
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
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'none', border: 'none', textAlign: 'left', color: '#0a0a0a', fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.93rem', gap: 16, lineHeight: 1.4 }}>
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

      {/* SHOWCASE CAROUSEL */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(56px,7vw,96px) 0' }}>
        <div style={{ padding: '0 clamp(20px,5vw,64px)', marginBottom: 36 }}>
          <Label text="Featured Projects" dark />
          <Heading dark delay={0.05}>Work that stands out.</Heading>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.3)', marginTop: 10, maxWidth: 380 }}
          >
            Our top-rated client websites — live, launched, and performing.
          </motion.p>
        </div>
        <ShowcaseMarquee />
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: '#0a0a0a', padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 80, alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <Label text="Get In Touch" dark />
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-1.5px', lineHeight: 1.0, marginBottom: 18, marginTop: 0 }}>
              Ready<br />to build?
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.72, marginBottom: 24 }}>
              Tell us about your project and we&apos;ll get back within 24 hours. No sales pitch — just straight talk.
            </p>
            <a href="mailto:webbes.in@gmail.com" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.22)', paddingBottom: 2, transition: 'opacity 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.55' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
              webbes.in@gmail.com
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}>
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  )
}
