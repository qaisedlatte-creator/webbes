'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'

const VP = { once: true, margin: '-60px' } as const

const FOUNDERS = [
  {
    name: 'Qais',
    role: 'Founder',
    desc: 'I handle the builds — design, development, and making sure everything we ship actually looks and works the way it should. I also do a bit of outreach when Falah lets me.',
    ig: 'https://www.instagram.com/__qaizx__/',
    igLabel: '@__qaizx__',
  },
  {
    name: 'Falah',
    role: 'Co-Founder',
    desc: 'I handle the strategy side — planning, scripting, content, blog writing, and getting Webbes in front of the right people. The brain behind the noise.',
    ig: 'https://www.instagram.com/muhammed_.falahh/',
    igLabel: '@muhammed_.falahh',
  },
]

const VALUES = [
  { title: 'No outsourcing', desc: 'Every project is built by us, not passed to a vendor in another city.' },
  { title: 'Direct access', desc: 'You talk to the people building your product. Always.' },
  { title: 'You own everything', desc: 'Full source code, full access. No lock-in, no contracts.' },
  { title: 'Fast delivery', desc: 'Most websites in 1–3 weeks. We move with urgency because your time matters.' },
]

function FounderCard({
  name, role, desc, ig, igLabel, index,
}: {
  name: string; role: string; desc: string; ig: string; igLabel: string; index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: '1px solid rgba(0,0,0,0.09)',
        padding: '44px 40px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 0,
        transition: 'transform 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: hovered ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.09)',
        background: '#ffffff',
      }}
    >
      {/* Role */}
      <p style={{
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: 'rgba(10,10,10,0.35)',
        marginBottom: 10,
        fontFamily: "'Syne', sans-serif",
      }}>
        {role}
      </p>

      {/* Name */}
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(2rem, 4vw, 2.6rem)',
        color: '#0a0a0a',
        letterSpacing: '-1px',
        lineHeight: 1.05,
        margin: '0 0 20px 0',
      }}>
        {name}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.9rem',
        lineHeight: 1.75,
        color: 'rgba(10,10,10,0.5)',
        margin: '0 0 32px 0',
        flex: 1,
      }}>
        {desc}
      </p>

      {/* Instagram link */}
      <a
        href={ig}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 600,
          fontSize: '0.78rem',
          color: '#0a0a0a',
          textDecoration: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.2)',
          paddingBottom: 2,
          transition: 'opacity 0.2s',
          alignSelf: 'flex-start' as const,
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.45')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
        </svg>
        {igLabel}
      </a>
    </motion.div>
  )
}

export default function TeamPage() {
  return (
    <>
      <HeroCinematic text="The people building your brand." speed={18} />

      {/* Founders */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
          >
            <span style={{ width: 20, height: 1, background: 'rgba(10,10,10,0.3)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase' as const, fontWeight: 700, color: 'rgba(10,10,10,0.35)', fontFamily: "'Syne', sans-serif" }}>
              The Founders
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 14 }}
          >
            Two people.<br />Every project.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
            style={{ fontSize: '0.92rem', color: 'rgba(10,10,10,0.48)', maxWidth: 480, lineHeight: 1.72, marginBottom: 56 }}
          >
            Webbes is Qais and Falah. No team of 40. No account managers.
            When you hire Webbes, you work directly with the people building your product — start to finish.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {FOUNDERS.map((f, i) => (
              <FounderCard key={f.name} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
          >
            <span style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase' as const, fontWeight: 700, color: 'rgba(255,255,255,0.35)', fontFamily: "'Syne', sans-serif" }}>
              How We Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 56 }}
          >
            The way we operate.
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.07 }}
                style={{
                  display: 'flex',
                  gap: 32,
                  alignItems: 'flex-start',
                  padding: '28px 0',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  ...(i === VALUES.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.07)' } : {}),
                }}
              >
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#ffffff', minWidth: 160, flexShrink: 0, margin: 0 }}>
                  {v.title}
                </h4>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.42)', margin: 0 }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#ffffff', padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,64px)', textAlign: 'center' as const, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ maxWidth: 540, margin: '0 auto' }}
        >
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 16 }}>
            Ready to work with us?
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'rgba(10,10,10,0.45)', marginBottom: 36, lineHeight: 1.7 }}>
            Get in touch and we&apos;ll get back to you within 24 hours.
          </p>
          <a
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', background: '#0a0a0a', color: '#ffffff', padding: '14px 36px', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', transition: 'opacity 0.2s', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Start a Project →
          </a>
        </motion.div>
      </section>
    </>
  )
}
