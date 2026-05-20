'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const VP = { once: true, margin: '-40px' } as const

// ─── All 5 case studies ───────────────────────────────────────────────────────
const PROJECTS = [
  {
    n: '01',
    name: 'Pearl Imperial International',
    url: 'https://pearlimperialintl.com',
    img: '/pearl-imperial.png',
    tags: ['B2B', 'Branding', 'Web Design'],
    industry: 'B2B Commodities · Dubai, UAE',
    built: 'Full-scale B2B trade website for a Dubai-based nuts & spices exporter. Credibility-first design with detailed product catalogues and direct inquiry flows for GCC procurement buyers.',
    impact: 'Established a digital anchor that opened conversations with Gulf buyers previously unreachable without a credible web address.',
  },
  {
    n: '02',
    name: 'Hotel Grand Blue Star',
    url: 'https://hotelgrandbluestar.com',
    img: '/grand-blue-star-og.jpg',
    tags: ['Hospitality', 'Web Design'],
    industry: 'Luxury Hotel · Mangalore, India',
    built: 'Complete rebuild — destination-quality hotel website with Cormorant Garamond typography, ambient video backgrounds, room browsing, and a friction-free direct inquiry flow.',
    impact: 'Transformed a zero-digital-presence property into a bookable destination. Consistent inbound inquiry traffic within weeks of launch.',
  },
  {
    n: '03',
    name: 'Hearthy India',
    url: 'https://hearthy.in',
    img: '/hearthy-og.jpg',
    tags: ['E-commerce', 'Branding'],
    industry: 'Health Foods · Kochi, India',
    built: 'Shopify storefront and brand identity for a D2C dry fruits brand. Custom theme with warm brand palette and photography direction built around natural credibility.',
    impact: 'Launched to consistent D2C sales. Mobile-first design outperforms category benchmarks. Brand resonates with health-conscious buyers across Kerala.',
  },
  {
    n: '04',
    name: 'Prism India',
    url: 'https://prismindia.co',
    img: '/prism-india.png',
    tags: ['E-commerce', 'Shopify', 'CRO'],
    industry: 'Activewear · India',
    built: 'End-to-end Shopify build for a gymwear label — custom theme, COD + UPI + Razorpay, speed-optimised for India\'s mobile-first shoppers.',
    impact: 'Live in under 3 weeks. Sub-2s load on 4G. 80%+ of customers shop on mobile — built for exactly that from day one.',
  },
  {
    n: '05',
    name: 'Al Hilal Print',
    url: 'https://alhilalprint.com',
    img: '/al-hilal-og.jpg',
    tags: ['Branding', 'Print', 'Web Design'],
    industry: 'Print & Branding · UAE',
    built: 'Full Next.js website with service architecture, detailed gallery, structured inquiry system, and SEO content targeting Dubai\'s B2B print buyer segment.',
    impact: 'Positioned Al Hilal as a premium print partner. Organic search visibility grew in key service categories within 60 days of launch.',
  },
]

// ─── Pill ─────────────────────────────────────────────────────────────────────
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: '0.58rem',
      letterSpacing: '0.13em',
      textTransform: 'uppercase',
      color: 'rgba(10,10,10,0.5)',
      fontWeight: 600,
      background: 'rgba(0,0,0,0.055)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: 100,
      padding: '3px 11px',
      display: 'inline-block',
      whiteSpace: 'nowrap' as const,
    }}>
      {children}
    </span>
  )
}

// ─── WorkCard — used in the bento grid ───────────────────────────────────────
function WorkCard({
  project,
  aspectRatio = '4/3',
  delay = 0,
}: {
  project: (typeof PROJECTS)[0]
  aspectRatio?: string
  delay?: number
}) {
  const [on, setOn] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{ display: 'block', textDecoration: 'none', position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio, background: '#111' }}
    >
      {/* Image */}
      {!imgErr ? (
        <img
          src={project.img}
          alt={project.name}
          onError={() => setImgErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: on ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: 'rgba(255,255,255,0.08)' }}>{project.name}</span>
        </div>
      )}

      {/* Permanent base gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Glass hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.35)',
        backdropFilter: on ? 'blur(4px)' : 'blur(0px)',
        WebkitBackdropFilter: on ? 'blur(4px)' : 'blur(0px)',
        opacity: on ? 1 : 0,
        transition: 'opacity 0.3s ease, backdrop-filter 0.3s ease',
        pointerEvents: 'none',
      }} />

      {/* Number badge */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.22)',
        borderRadius: 100,
        padding: '4px 12px',
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.65rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em' }}>
          {project.n}
        </span>
      </div>

      {/* Bottom content — always visible on dark bg */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 20px 20px' }}>
        {/* Tags */}
        <div style={{
          display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10,
          opacity: on ? 1 : 0,
          transform: on ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontWeight: 600, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100, padding: '3px 10px' }}>
              {t}
            </span>
          ))}
        </div>
        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(0.88rem, 1.5vw, 1.05rem)', color: '#ffffff', margin: 0, letterSpacing: '-0.2px' }}>
          {project.name}
        </p>
        <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.38)', marginTop: 4, letterSpacing: '0.08em' }}>
          {project.industry}
        </p>
      </div>
    </motion.a>
  )
}

// ─── Expandable detail panel ──────────────────────────────────────────────────
function DetailRow({ project, i }: { project: (typeof PROJECTS)[0]; i: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
      style={{ borderTop: '1px solid rgba(0,0,0,0.08)', ...(i === PROJECTS.length - 1 ? { borderBottom: '1px solid rgba(0,0,0,0.08)' } : {}) }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 20, padding: '22px 0', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.6rem', color: 'rgba(10,10,10,0.2)', letterSpacing: '0.06em', flexShrink: 0, width: 24 }}>
          {project.n}
        </span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(0.92rem, 1.5vw, 1.1rem)', color: '#0a0a0a', flex: 1, letterSpacing: '-0.2px' }}>
          {project.name}
        </span>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {project.tags.map(t => <Pill key={t}>{t}</Pill>)}
        </div>
        <span style={{ fontSize: '1.1rem', fontWeight: 300, color: 'rgba(10,10,10,0.3)', flexShrink: 0, marginLeft: 12, transition: 'transform 0.25s', transform: open ? 'rotate(45deg)' : 'none' }}>
          +
        </span>
      </button>

      {/* Expandable detail */}
      <div style={{ maxHeight: open ? '600px' : 0, overflow: 'hidden', opacity: open ? 1 : 0, transition: 'max-height 0.45s ease, opacity 0.35s ease' }}>
        <div style={{ paddingBottom: 28, paddingLeft: 44, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(20px, 4vw, 48px)' }}>
          <div>
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.28)', fontWeight: 700, marginBottom: 10, fontFamily: "'Syne', sans-serif" }}>
              What we built
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.72, color: 'rgba(10,10,10,0.54)' }}>
              {project.built}
            </p>
          </div>
          <div>
            <div style={{ background: 'rgba(0,0,0,0.03)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: '16px 18px', marginBottom: 18 }}>
              <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.28)', fontWeight: 700, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>
                Impact
              </p>
              <p style={{ fontSize: '0.86rem', lineHeight: 1.65, color: 'rgba(10,10,10,0.62)', margin: 0 }}>
                {project.impact}
              </p>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.78rem', color: '#0a0a0a', background: 'rgba(0,0,0,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 100, padding: '9px 20px', textDecoration: 'none', transition: 'background 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)' }}
            >
              Visit Site →
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WorkPage() {
  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .work-bento-top { grid-template-columns: 1fr !important; }
          .work-bento-bottom { grid-template-columns: 1fr !important; }
          .detail-expand-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1023px) and (min-width: 768px) {
          .work-bento-bottom { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: '#ffffff', padding: 'clamp(120px,14vw,180px) clamp(20px,5vw,64px) clamp(64px,8vw,100px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
          >
            <span style={{ width: 18, height: 1, background: 'rgba(10,10,10,0.3)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(10,10,10,0.35)', fontFamily: "'Syne', sans-serif" }}>
              Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-2px', lineHeight: 1.0, margin: 0, marginBottom: 20 }}
          >
            Work.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.14 }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}
          >
            <p style={{ fontSize: '0.95rem', color: 'rgba(10,10,10,0.44)', lineHeight: 1.72, maxWidth: 420, margin: 0 }}>
              Five brands built from scratch. Every line of code, every design decision — made directly by Webbes.
            </p>
            <div style={{ display: 'flex', gap: 'clamp(24px, 4vw, 48px)', flexShrink: 0 }}>
              {[['5', 'Projects'], ['3', 'Countries'], ['100%', 'Owner-built']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#0a0a0a', letterSpacing: '-0.5px', lineHeight: 1, marginBottom: 3 }}>{n}</p>
                  <p style={{ fontSize: '0.62rem', color: 'rgba(10,10,10,0.32)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento grid */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(32px,4vw,56px) clamp(20px,5vw,64px) clamp(64px,8vw,100px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Top row: 2 featured cards */}
          <div
            className="work-bento-top"
            style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 16, marginBottom: 16 }}
          >
            <WorkCard project={PROJECTS[0]} aspectRatio="4/3" delay={0} />
            <WorkCard project={PROJECTS[1]} aspectRatio="4/3" delay={0.08} />
          </div>

          {/* Bottom row: 3 equal cards */}
          <div
            className="work-bento-bottom"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          >
            <WorkCard project={PROJECTS[2]} aspectRatio="1/1" delay={0.1} />
            <WorkCard project={PROJECTS[3]} aspectRatio="1/1" delay={0.16} />
            <WorkCard project={PROJECTS[4]} aspectRatio="1/1" delay={0.22} />
          </div>

        </div>
      </section>

      {/* Expandable case study list */}
      <section style={{ background: '#ffffff', padding: 'clamp(64px,8vw,110px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}
          >
            <span style={{ width: 18, height: 1, background: 'rgba(10,10,10,0.3)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(10,10,10,0.35)', fontFamily: "'Syne', sans-serif" }}>
              Case Studies
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 8 }}
          >
            The full story.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.88rem', color: 'rgba(10,10,10,0.4)', marginBottom: 48, maxWidth: 420, lineHeight: 1.7 }}
          >
            Tap any project to expand the full case study — what we built, what changed, what it delivered.
          </motion.p>

          <div className="detail-list">
            {PROJECTS.map((p, i) => <DetailRow key={p.n} project={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ maxWidth: 560, margin: '0 auto' }}
        >
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontWeight: 700, marginBottom: 18 }}>
            Your brand is next
          </p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: 16 }}>
            Ready to be<br />on this list?
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, marginBottom: 36 }}>
            Let&apos;s build something worth showing.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              className="glass-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#0a0a0a', background: 'rgba(255,255,255,0.95)', border: '1.5px solid rgba(255,255,255,0.85)', borderRadius: 100, padding: '13px 32px', textDecoration: 'none', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(0,0,0,0.25)', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Start a Project →
            </Link>
            <a
              href="https://wa.me/919149681874"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.85rem', color: '#ffffff', background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '13px 28px', textDecoration: 'none', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', transition: 'border-color 0.22s, background 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </>
  )
}
