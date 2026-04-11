'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'

// ── viewport config ──────────────────────────────────────────────────────────
const VP = { once: true, margin: '-60px' } as const

// ── data ─────────────────────────────────────────────────────────────────────
const PORTFOLIO = [
  { name: 'Pearl Imperial International', tag: 'B2B Corporate · UAE', url: 'https://pearlimperialintl.com' },
  { name: 'Dept Store', tag: 'E-Commerce · India', url: 'https://deptstore.in' },
  { name: 'Prism India', tag: 'Shopify · India', url: 'https://prismindia.co' },
]

const MISSION = [
  {
    title: 'Mission-Driven',
    desc: "Building something we'd be genuinely proud of — a Kochi agency known for honest work and real outcomes.",
  },
  {
    title: 'Rapid Delivery',
    desc: 'Tight cycles, meticulous quality, and on-time delivery — every time.',
  },
  {
    title: 'True Partnership',
    desc: 'Your growth is our growth. Your success is our reputation.',
  },
  {
    title: 'AI-First Approach',
    desc: 'We embed AI and automation into everything we build — giving your business an unfair competitive edge.',
  },
]

const SERVICES = [
  {
    n: '01',
    title: 'Website Development',
    desc: 'Fast, pixel-perfect websites — corporate sites, landing pages, and web apps built to convert visitors into customers.',
    tags: ['React', 'Next.js', 'WordPress', 'Custom Code'],
  },
  {
    n: '02',
    title: 'AI Automation',
    desc: 'Intelligent workflows, chatbots, lead scoring, and business process automation that eliminates busywork and amplifies output.',
    tags: ['n8n', 'Make', 'OpenAI', 'Zapier'],
  },
  {
    n: '03',
    title: 'E-Commerce Stores',
    desc: 'End-to-end online stores with product catalogs, payment gateways, and inventory management — built to sell.',
    tags: ['Shopify', 'WooCommerce', 'Custom'],
  },
]

const PROCESS = [
  { n: '01', title: 'Discover', desc: 'Deep dive into your business, goals, target audience, and competitive landscape.' },
  { n: '02', title: 'Design', desc: 'Wireframes, mockups, and prototypes — crafted to pixel-perfect standards before a single line of code.' },
  { n: '03', title: 'Develop', desc: 'Clean, scalable code with smooth interactions and flawless performance on every device.' },
  { n: '04', title: 'Deploy', desc: 'Launch, monitor, optimise, and scale — with dedicated ongoing support whenever you need it.' },
]

const FAQS = [
  { q: 'What services does Webbes offer?', a: 'We specialise in Website Development (custom sites, Shopify, WordPress), AI Automation (workflows, chatbots, process automation), and E-Commerce (full online store setup with payments and inventory management).' },
  { q: 'How long does a website project take?', a: 'A landing page: 3–5 days. A full website: 2–4 weeks. Complex e-commerce or AI automation setups: 4–8 weeks. We give you a precise timeline in your first call — no vague estimates.' },
  { q: 'Do you work with clients outside India?', a: 'Absolutely. We actively serve clients across India and the GCC region (UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman). Built for remote collaboration across time zones.' },
  { q: 'What makes Webbes different?', a: 'Every project is handled directly by Qais and Falah — no middlemen, no account managers. AI-first approach, direct communication, fast delivery, and you own everything we build.' },
  { q: 'Do you offer support after launch?', a: 'Yes. Post-launch support covers maintenance, performance monitoring, content updates, and ongoing optimisation to keep your site performing at its best.' },
]

// ── shared section label ──────────────────────────────────────────────────────
function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
      }}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VP}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          width: 28,
          height: 1,
          background: dark ? 'rgba(255,255,255,0.4)' : '#0a0a0a',
          display: 'inline-block',
          flexShrink: 0,
          transformOrigin: 'left',
        }}
      />
      <span
        style={{
          fontSize: '0.68rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(10,10,10,0.45)',
        }}
      >
        {text}
      </span>
    </motion.div>
  )
}

// ── mission card ──────────────────────────────────────────────────────────────
function MissionCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0a0a0a',
        borderLeft: `2px solid ${hovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.12)'}`,
        padding: '28px 32px',
        transition: 'border-color 0.35s ease, transform 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <h4
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: '1.05rem',
          color: '#ffffff',
          marginBottom: 0,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h4>

      {/* Description — max-height reveal */}
      <div
        style={{
          maxHeight: hovered ? '180px' : 0,
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          marginTop: hovered ? 12 : 0,
          transition: 'max-height 0.4s ease, opacity 0.35s ease, margin-top 0.35s ease',
        }}
      >
        <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  )
}

// ── portfolio card ────────────────────────────────────────────────────────────
function PortfolioCard({ name, tag, url, index }: { name: string; tag: string; url: string; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.07)',
        padding: '48px 40px',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        borderColor: hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
      }}
    >
      {/* Background number */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 16,
          right: 28,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: '5rem',
          color: 'rgba(255,255,255,0.03)',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        0{index + 1}
      </span>

      {/* Tag */}
      <span
        style={{
          display: 'inline-block',
          fontSize: '0.68rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          fontWeight: 600,
          marginBottom: 14,
        }}
      >
        {tag}
      </span>

      {/* Project name */}
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
          color: '#ffffff',
          lineHeight: 1.2,
          letterSpacing: '-0.3px',
          transition: 'color 0.3s ease',
        }}
      >
        {name}
      </h3>

      {/* Hover overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.88)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#ffffff',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '14px 32px',
            letterSpacing: '0.02em',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
          }}
        >
          View Live →
        </a>
      </div>
    </motion.div>
  )
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <HeroCinematic text="We are Webbes. The digital agency that's going to build your brand.">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 999,
              padding: '9px 18px',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: "'Syne', sans-serif",
              letterSpacing: '0.03em',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            Kochi, India
          </span>
          <a
            href="mailto:webbes.in@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 999,
              padding: '9px 18px',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: "'Syne', sans-serif",
              letterSpacing: '0.03em',
              textDecoration: 'none',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
            webbes.in@gmail.com
          </a>
        </div>
      </HeroCinematic>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel text="Real Work · Kerala Real Estate" />

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-1px',
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            This is what we fix.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.95rem', color: 'rgba(10,10,10,0.55)', maxWidth: 500, lineHeight: 1.7, marginBottom: 48 }}
          >
            A Kozhikode real estate company running on a 2005-era portal — ad banners, zero mobile support,
            no WhatsApp lead capture. We rebuilt it from scratch.
          </motion.p>

          {/* Static side-by-side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {/* Before */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src="/case-study-before.png"
                alt="Before — old website design"
                style={{ width: '100%', display: 'block', filter: 'grayscale(30%)' }}
              />
              <div style={{
                position: 'absolute',
                top: 14,
                left: 14,
                background: 'rgba(180,40,40,0.85)',
                backdropFilter: 'blur(4px)',
                borderRadius: 999,
                padding: '6px 14px',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                Before — What you probably have now
              </div>
            </div>

            {/* After */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src="/case-study-after.png"
                alt="After — rebuilt by Webbes"
                style={{ width: '100%', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                top: 14,
                left: 14,
                background: 'rgba(10,10,10,0.88)',
                backdropFilter: 'blur(4px)',
                borderRadius: 999,
                padding: '6px 14px',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                After — What Webbes will build you
              </div>
            </div>
          </motion.div>

          <p style={{ marginTop: 16, fontSize: '0.78rem', color: 'rgba(10,10,10,0.3)', textAlign: 'center' }}>
            Real project. Real transformation.
          </p>
        </div>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────────────────────── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel text="Live Work" dark />

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-1px',
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            Real Work. Real Results.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', marginBottom: 56 }}
          >
            Our work speaks for itself.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {PORTFOLIO.map((p, i) => (
              <PortfolioCard key={p.name} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION CARDS ────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel text="Who We Are" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ marginBottom: 48 }}
          >
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 700,
                color: '#0a0a0a',
                letterSpacing: '-1px',
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              Two founders from Kochi.<br />Every project, personally.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(10,10,10,0.55)', maxWidth: 560, lineHeight: 1.7 }}>
              Webbes is built and run by Qais and Falah — two co-founders who started this because we got tired
              of watching good businesses settle for overpriced, underwhelming work from agencies that never actually cared.
              We handle every project ourselves. No outsourcing, no account managers.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
          >
            {MISSION.map((m, i) => (
              <MissionCard key={m.title} title={m.title} desc={m.desc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel text="What We Do" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 56 }}
          >
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 700,
                color: '#0a0a0a',
                letterSpacing: '-1px',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Everything Your<br />Business Needs Online.
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(10,10,10,0.5)', maxWidth: 340, lineHeight: 1.7, margin: 0 }}>
              From intelligent automations to stunning storefronts — we cover every angle of your digital presence.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{
                  background: '#f8f8f8',
                  border: '1px solid rgba(0,0,0,0.07)',
                  padding: '36px 32px',
                  position: 'relative',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)')}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 24,
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    color: 'rgba(10,10,10,0.15)',
                  }}
                >
                  {s.n}
                </span>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#0a0a0a',
                    marginBottom: 12,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(10,10,10,0.55)', marginBottom: 20 }}>
                  {s.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.tags.map(t => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.7rem',
                        color: 'rgba(10,10,10,0.45)',
                        border: '1px solid rgba(0,0,0,0.12)',
                        padding: '3px 10px',
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: 40 }}
          >
            <a
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1.5px solid rgba(0,0,0,0.18)',
                color: '#0a0a0a',
                padding: '13px 28px',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: '0.88rem',
                background: 'transparent',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a0a0a' }}
            >
              View All Services →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section id="process" style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel text="How We Work" />

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-1px',
              lineHeight: 1.1,
              marginBottom: 56,
            }}
          >
            Simple Process.<br />Serious Results.
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    color: 'rgba(10,10,10,0.2)',
                    marginBottom: 16,
                  }}
                >
                  {p.n}
                </div>
                <div style={{ width: 32, height: 1, background: '#0a0a0a', marginBottom: 16 }} />
                <h4
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: '#0a0a0a',
                    marginBottom: 10,
                  }}
                >
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(10,10,10,0.5)' }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel text="FAQ" />

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-1px',
              lineHeight: 1.1,
              marginBottom: 56,
            }}
          >
            Common Questions.
          </motion.h2>

          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {FAQS.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.07 }}
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
                    padding: '22px 0',
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
                  <span
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 300,
                      color: 'rgba(10,10,10,0.4)',
                      flexShrink: 0,
                      transition: 'transform 0.25s ease',
                      transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: openFaq === i ? '400px' : 0,
                    overflow: 'hidden',
                    opacity: openFaq === i ? 1 : 0,
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  }}
                >
                  <p style={{ paddingBottom: 22, fontSize: '0.9rem', lineHeight: 1.72, color: 'rgba(10,10,10,0.55)' }}>
                    {f.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ maxWidth: 640, margin: '0 auto' }}
        >
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Let&apos;s build something<br />that works.
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', marginBottom: 36, lineHeight: 1.7 }}>
            Tell us about your project and we&apos;ll get back within 24 hours.<br />No sales pitch — just straight talk.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#ffffff',
                color: '#0a0a0a',
                padding: '14px 32px',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '0.88rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Start a Project
            </a>
            <a
              href="https://wa.me/919149681874"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1.5px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                padding: '14px 32px',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: '0.88rem',
                background: 'transparent',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>
    </>
  )
}
