'use client'

import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'

const VP = { once: true, margin: '-60px' } as const

const SERVICES = [
  {
    n: '01',
    title: 'Website Development',
    desc: 'Fast, pixel-perfect websites built on modern tech. Corporate sites, landing pages, web apps — every one designed to convert visitors into customers. We write the code, own the craft.',
    tags: ['React', 'Next.js', 'WordPress', 'Webflow', 'Custom Code'],
    detail: 'Responsive design · SEO-optimised · Performance-first · Full source ownership',
  },
  {
    n: '02',
    title: 'AI Automation',
    desc: 'Intelligent workflows that cut busywork and amplify output. Lead scoring, AI chatbots, CRM integrations, document processing — everything that used to take hours, automated.',
    tags: ['n8n', 'Make', 'OpenAI API', 'Zapier', 'Custom Agents'],
    detail: 'Business process automation · Lead gen · Customer support bots · Internal tools',
  },
  {
    n: '03',
    title: 'E-Commerce Stores',
    desc: 'End-to-end online stores built to sell. Product catalogs, payment gateways, inventory management, abandoned-cart flows — every piece of a store that actually converts.',
    tags: ['Shopify', 'WooCommerce', 'Custom Build'],
    detail: 'Payment integration · Inventory management · Conversion optimisation · Mobile-first',
  },
  {
    n: '04',
    title: 'Digital Marketing',
    desc: 'SEO, Google Ads, Meta Ads — growth strategies built around measurable ROI. We don\'t guess. We track, iterate, and scale what works.',
    tags: ['Google Ads', 'Meta Ads', 'SEO', 'Analytics'],
    detail: 'Search ads · Social ads · On-page SEO · Keyword strategy · Reporting',
  },
  {
    n: '05',
    title: 'UI/UX Design',
    desc: 'Design that earns trust before a single word is read. Wireframes, prototypes, and pixel-perfect screens that feel intentional — because they are.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
    detail: 'User research · Wireframes · Interactive prototypes · Design-to-dev handoff',
  },
]

function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VP}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ width: 28, height: 1, background: dark ? 'rgba(255,255,255,0.4)' : '#0a0a0a', display: 'inline-block', flexShrink: 0, transformOrigin: 'left' }}
      />
      <span style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' as const, fontWeight: 600, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(10,10,10,0.45)' }}>
        {text}
      </span>
    </motion.div>
  )
}

export default function ServicesPage() {
  return (
    <>
      <HeroCinematic text="Everything your business needs. Online." />

      {/* Services list */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel text="Our Services" />

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 64 }}
          >
            What we build.
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '0 32px',
                  alignItems: 'start',
                  padding: '40px 0',
                  borderTop: '1px solid rgba(0,0,0,0.09)',
                  ...(i === SERVICES.length - 1 ? { borderBottom: '1px solid rgba(0,0,0,0.09)' } : {}),
                }}
              >
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '0.75rem', color: 'rgba(10,10,10,0.2)', letterSpacing: '0.08em', paddingTop: 4 }}>
                  {s.n}
                </span>
                <div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: '#0a0a0a', marginBottom: 10, letterSpacing: '-0.3px' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(10,10,10,0.5)', maxWidth: 560, marginBottom: 16 }}>
                    {s.desc}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(10,10,10,0.35)', fontStyle: 'italic' }}>
                    {s.detail}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginTop: 16 }}>
                    {s.tags.map(t => (
                      <span key={t} style={{ fontSize: '0.68rem', color: 'rgba(10,10,10,0.4)', border: '1px solid rgba(0,0,0,0.12)', padding: '3px 10px', fontWeight: 500 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,64px)', textAlign: 'center' as const }}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ maxWidth: 560, margin: '0 auto' }}
        >
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 16 }}>
            Not sure what you need?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', marginBottom: 36, lineHeight: 1.7 }}>
            Tell us what you&apos;re building and we&apos;ll tell you exactly what it needs.
          </p>
          <a
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', background: '#ffffff', color: '#0a0a0a', padding: '14px 36px', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Let&apos;s Talk →
          </a>
        </motion.div>
      </section>
    </>
  )
}
