'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'

const VP = { once: true, margin: '-60px' } as const

const FOUNDERS = [
  {
    name: 'Qais',
    role: 'Co-Founder · Strategy & Development',
    line: 'Builds the systems. Thinks in outcomes.',
  },
  {
    name: 'Falah',
    role: 'Co-Founder · Design & Client Work',
    line: 'Crafts the interfaces. Owns the detail.',
  },
]

const VALUES = [
  { title: 'No outsourcing', desc: 'Every project is built by us, not passed to a vendor in another city.' },
  { title: 'Direct access', desc: 'You talk to the people building your product. Always.' },
  { title: 'You own everything', desc: 'Full source code, full access. No lock-in, no contracts.' },
  { title: 'Fast delivery', desc: 'Most websites in 1–3 weeks. We move with urgency because your time matters.' },
]

function FounderCard({ name, role, line, index }: { name: string; role: string; line: string; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#f8f8f8',
        border: '1px solid rgba(0,0,0,0.07)',
        padding: '48px 40px',
        transition: 'transform 0.35s ease, border-color 0.3s ease, background 0.3s ease',
        transform: hovered ? `rotate(${index % 2 === 0 ? '1.2deg' : '-1.2deg'}) translateY(-6px)` : 'none',
        borderColor: hovered ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.07)',
      }}
    >
      {/* Avatar placeholder */}
      <div
        style={{
          width: 56,
          height: 56,
          background: '#0a0a0a',
          borderRadius: '50%',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: '1.2rem',
          color: '#ffffff',
          transition: 'transform 0.35s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        {name[0]}
      </div>

      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: '1.6rem',
          color: '#0a0a0a',
          letterSpacing: '-0.5px',
          marginBottom: 6,
        }}
      >
        {name}
      </h3>

      <p
        style={{
          fontSize: '0.78rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(10,10,10,0.4)',
          fontWeight: 600,
          marginBottom: 0,
          transition: 'opacity 0.3s ease, max-height 0.3s ease',
          maxHeight: hovered ? '60px' : 0,
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
        }}
      >
        {role}
      </p>

      <div
        style={{
          marginTop: hovered ? 16 : 0,
          maxHeight: hovered ? '80px' : 0,
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          transition: 'max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease',
        }}
      >
        <p style={{ fontSize: '0.88rem', color: 'rgba(10,10,10,0.55)', lineHeight: 1.6 }}>
          {line}
        </p>
      </div>
    </motion.div>
  )
}

export default function TeamPage() {
  return (
    <>
      <HeroCinematic text="The people building your brand." />

      {/* Founders */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
          >
            <span style={{ width: 28, height: 1, background: '#0a0a0a', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(10,10,10,0.45)' }}>
              The Founders
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 16 }}
          >
            Two people.<br />Every project.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            style={{ fontSize: '0.95rem', color: 'rgba(10,10,10,0.5)', maxWidth: 500, lineHeight: 1.7, marginBottom: 56 }}
          >
            Webbes is Qais and Falah. No team of 40. No account managers.
            When you hire Webbes, you work directly with the people building your product — start to finish.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 0 }}>
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
            <span style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.4)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
              How We Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 56 }}
          >
            The way we operate.
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.08 }}
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
                <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#ffffff', padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,64px)', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ maxWidth: 540, margin: '0 auto' }}
        >
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 16 }}>
            Ready to work with us?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(10,10,10,0.45)', marginBottom: 36, lineHeight: 1.7 }}>
            Get in touch and we&apos;ll get back to you within 24 hours.
          </p>
          <a
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', background: '#0a0a0a', color: '#ffffff', padding: '14px 36px', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', transition: 'opacity 0.2s' }}
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
