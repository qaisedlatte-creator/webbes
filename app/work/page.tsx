'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const VP = { once: true, margin: '-40px' } as const

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    n: '01',
    name: 'Pearl Imperial International',
    url: 'https://pearlimperialintl.com',
    img: '/pearl-imperial.png',
    tags: ['B2B', 'Branding', 'Web Design'],
    industry: 'B2B Commodities · Dubai, UAE',
    built: 'Full-scale B2B trade website for a Dubai-based nuts & spices exporter. Credibility-first design with detailed product catalogues, company credentials, and direct inquiry flows built specifically for GCC procurement buyers.',
    impact: 'Established a 24/7 digital presence that opened buyer conversations previously done entirely over cold calls. The site now pre-qualifies leads before first contact — the client\'s words, not ours.',
  },
  {
    n: '02',
    name: 'Hotel Grand Blue Star',
    url: 'https://hotelgrandbluestar.com',
    img: '/grand-blue-star-og.jpg',
    tags: ['Hospitality', 'Web Design'],
    industry: 'Luxury Hotel · Mangalore, India',
    built: 'Complete rebuild from zero — a destination-quality website for a coastal hotel that had no prior digital presence. Cormorant Garamond typography, ambient video backgrounds, room-by-room browsing, and a friction-free direct inquiry flow optimised for mobile.',
    impact: 'Transformed a property with no digital footprint into a bookable destination online. Direct room inquiry traffic went from zero to consistent inbound within weeks of launch.',
  },
  {
    n: '03',
    name: 'Hearthy India',
    url: 'https://hearthy.in',
    img: '/hearthy-og.jpg',
    tags: ['E-commerce', 'Branding'],
    industry: 'Health Foods · Kochi, India',
    built: 'Shopify storefront and brand identity for a D2C dry fruits and health food brand with a physical store in Kochi. Custom theme, clean product architecture, photography direction, and a brand palette built around warmth and natural credibility.',
    impact: 'Launched to consistent D2C sales. Mobile-first design outperforms category benchmarks. The brand aesthetic — gold, warmth, abundance — resonates with health-conscious buyers across Kerala and beyond.',
  },
  {
    n: '04',
    name: 'Prism India',
    url: 'https://prismindia.co',
    img: '/prism-india.png',
    tags: ['E-commerce', 'Shopify', 'CRO'],
    industry: 'Activewear · India',
    built: 'End-to-end Shopify build for a precision gymwear label entering the Indian fitness market. Custom theme, full product system, COD + UPI + Razorpay integration, and every page speed-optimised for India\'s mobile-first shoppers.',
    impact: 'Live in under 3 weeks. Sub-2s load times on 4G. 80%+ of customers shop on mobile — the site was built for exactly that from day one. Repeat purchase rate climbing month-on-month.',
  },
  {
    n: '05',
    name: 'Al Hilal Print',
    url: 'https://alhilalprint.com',
    img: '/al-hilal-og.jpg',
    tags: ['Branding', 'Print', 'Web Design'],
    industry: 'Print & Branding · UAE',
    built: 'Full Next.js website for a UAE print and branding services company. Service-led architecture with a detailed gallery, structured inquiry system, and SEO-structured content targeting Dubai\'s B2B print buyer segment.',
    impact: 'Positioned Al Hilal as a premium print partner in a competitive market. Organic search visibility grew in key service categories within 60 days of launch.',
  },
]

// ─── Bento card — overview grid ───────────────────────────────────────────────
function BentoCard({
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio, background: '#161616', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {!imgErr ? (
        <img
          src={project.img}
          alt={project.name}
          onError={() => setImgErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: on ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: 'rgba(255,255,255,0.06)' }}>{project.name}</span>
        </div>
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)', pointerEvents: 'none' }} />
      {/* Hover glass sheen */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)', backdropFilter: on ? 'blur(2px)' : 'blur(0px)', WebkitBackdropFilter: on ? 'blur(2px)' : 'blur(0px)', opacity: on ? 1 : 0, transition: 'opacity 0.3s, backdrop-filter 0.3s', pointerEvents: 'none' }} />
      {/* Number badge */}
      <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '4px 13px' }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.65rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em' }}>{project.n}</span>
      </div>
      {/* Bottom meta */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 18px 16px' }}>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8, opacity: on ? 1 : 0, transform: on ? 'translateY(0)' : 'translateY(5px)', transition: 'opacity 0.25s, transform 0.25s' }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontWeight: 600, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100, padding: '3px 9px' }}>
              {t}
            </span>
          ))}
        </div>
        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 1.4vw, 1rem)', color: '#ffffff', margin: 0, letterSpacing: '-0.2px' }}>{project.name}</p>
        <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{project.industry}</p>
      </div>
    </motion.div>
  )
}

// ─── Inline case study row — full story, same dark section ───────────────────
function CaseStudyRow({ project, i }: { project: (typeof PROJECTS)[0]; i: number }) {
  const [on, setOn] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const flip = i % 2 !== 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      className="work-cs-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(24px, 4vw, 56px)',
        alignItems: 'center',
        padding: 'clamp(48px, 6vw, 80px) 0',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Image */}
      <div
        className="work-cs-img"
        style={{ order: flip ? 2 : 1, position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '4/3', background: '#161616', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {!imgErr ? (
          <img
            src={project.img}
            alt={project.name}
            onError={() => setImgErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: on ? 'scale(1.03)' : 'scale(1)', transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: 'rgba(255,255,255,0.06)' }}>{project.name}</span>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)', pointerEvents: 'none' }} />
        {/* Glass number badge */}
        <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 100, padding: '4px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em' }}>{project.n}</span>
        </div>
      </div>

      {/* Full story content */}
      <div className="work-cs-content" style={{ order: flip ? 1 : 2 }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 700, marginBottom: 14, fontFamily: "'Syne', sans-serif" }}>
          {project.industry}
        </p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.3rem, 2.2vw, 1.85rem)', color: '#ffffff', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: 16 }}>
          {project.name}
        </h2>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: '0.6rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', fontWeight: 600, background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100, padding: '4px 12px' }}>
              {t}
            </span>
          ))}
        </div>

        {/* What we built */}
        <div style={{ marginBottom: 22 }}>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontWeight: 700, marginBottom: 10, fontFamily: "'Syne', sans-serif" }}>
            What we built
          </p>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.5)' }}>
            {project.built}
          </p>
        </div>

        {/* Impact — glass card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.11)',
          borderRadius: 14,
          padding: '16px 20px',
          marginBottom: 26,
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        }}>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontWeight: 700, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>
            Impact
          </p>
          <p style={{ fontSize: '0.87rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.62)', margin: 0 }}>
            {project.impact}
          </p>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-btn"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.8rem', color: '#ffffff', background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100, padding: '10px 22px', textDecoration: 'none', transition: 'background 0.22s, border-color 0.22s', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}
        >
          Visit Site →
        </a>
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
          .work-bento-top  { grid-template-columns: 1fr !important; }
          .work-bento-bot  { grid-template-columns: 1fr !important; }
          .work-cs-row     { grid-template-columns: 1fr !important; gap: 24px !important; }
          .work-cs-img     { order: 1 !important; }
          .work-cs-content { order: 2 !important; }
        }
        @media (max-width: 1023px) and (min-width: 768px) {
          .work-bento-bot { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* ── HERO (dark — consistent with rest of page) ─────────────────────── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(130px,15vw,190px) clamp(20px,5vw,64px) clamp(56px,7vw,88px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
          >
            <span style={{ width: 18, height: 1, background: 'rgba(255,255,255,0.28)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.32)', fontFamily: "'Syne', sans-serif" }}>
              Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-3px', lineHeight: 1.0, margin: '0 0 20px' }}
          >
            Work.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.14 }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}
          >
            <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, maxWidth: 420, margin: 0 }}>
              Five brands built from scratch. Every line of code, every design decision — made directly by Webbes.
            </p>
            <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 48px)', flexShrink: 0 }}>
              {[['5', 'Projects'], ['3', 'Countries'], ['100%', 'Owner-built']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#ffffff', letterSpacing: '-0.5px', lineHeight: 1, marginBottom: 4 }}>{n}</p>
                  <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENTO + FULL STORIES — all one dark section ───────────────────── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,64px) clamp(80px,10vw,130px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Bento grid overview */}
          <div
            className="work-bento-top"
            style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 14, marginBottom: 14 }}
          >
            <BentoCard project={PROJECTS[0]} aspectRatio="4/3" delay={0} />
            <BentoCard project={PROJECTS[1]} aspectRatio="4/3" delay={0.07} />
          </div>
          <div
            className="work-bento-bot"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 0 }}
          >
            <BentoCard project={PROJECTS[2]} aspectRatio="1/1" delay={0.1} />
            <BentoCard project={PROJECTS[3]} aspectRatio="1/1" delay={0.15} />
            <BentoCard project={PROJECTS[4]} aspectRatio="1/1" delay={0.2} />
          </div>

          {/* Section divider — no background change, just spacing + rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={VP}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ margin: 'clamp(60px,8vw,100px) 0 0', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 'clamp(48px,6vw,72px)', transformOrigin: 'left' }}
          >
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
              style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <span style={{ width: 18, height: 1, background: 'rgba(255,255,255,0.28)', display: 'inline-block' }} />
              The Full Story
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#ffffff', letterSpacing: '-1px', lineHeight: 1.1, margin: 0 }}
            >
              What we built,<br />and what changed.
            </motion.h2>
          </motion.div>

          {/* Inline case studies — no section break, same dark background */}
          <div>
            {PROJECTS.map((p, i) => <CaseStudyRow key={p.n} project={p} i={i} />)}
          </div>

        </div>
      </section>

      {/* ── CTA — same dark ───────────────────────────────────────────────── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(64px,8vw,110px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ maxWidth: 520, margin: '0 auto' }}
        >
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 700, marginBottom: 18 }}>
            Your brand is next
          </p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: 14 }}>
            Ready to be<br />on this list?
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.33)', lineHeight: 1.7, marginBottom: 32 }}>
            Let&apos;s build something worth showing.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              className="glass-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#0a0a0a', background: 'rgba(255,255,255,0.95)', border: '1.5px solid rgba(255,255,255,0.85)', borderRadius: 100, padding: '13px 32px', textDecoration: 'none', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', transition: 'opacity 0.2s' }}
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
