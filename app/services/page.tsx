'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'

const VP = { once: true, margin: '-60px' } as const

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'web-dev',
    label: 'Website Development',
    num: '01',
    heading: 'Website Development',
    desc: 'Custom websites built to perform. We handle everything from design to launch — fast, clean, and built to convert.',
    expertise: [
      'Custom design & development',
      'Mobile-first builds',
      'Speed optimization',
      'CMS integration',
      'Ongoing maintenance',
      'Landing pages & funnels',
    ],
    media: { type: 'img' as const, src: '/services-web-dev.jpg' },
  },
  {
    id: 'growth',
    label: 'Growth Marketing',
    num: '02',
    heading: 'Growth Marketing',
    desc: 'We build and run marketing systems that bring in real customers — not just traffic. Paid ads, email flows, and conversion strategy that compounds over time.',
    expertise: [
      'Paid social & search ads',
      'Email & SMS campaigns',
      'Conversion rate optimization',
      'Funnel strategy',
      'Analytics & reporting',
      'A/B testing',
    ],
    media: { type: 'img' as const, src: '/services-growth.jpg' },
  },
  {
    id: 'automation',
    label: 'Automation',
    num: '03',
    heading: 'Automation',
    desc: 'We connect your tools and build workflows that cut repetitive work — so your team can focus on what actually moves the needle.',
    expertise: [
      'Business process automation',
      'CRM & tool integrations',
      'Lead routing & nurturing',
      'Document & data processing',
      'Custom internal tools',
      'Reporting dashboards',
    ],
    media: { type: 'img' as const, src: '/services-automation.jpg' },
  },
  {
    id: 'seo',
    label: 'SEO & AEO',
    num: '04',
    heading: 'SEO & AEO',
    desc: "We get your business found — on Google and on AI search engines like ChatGPT and Perplexity. Most agencies ignore AEO. We don't.",
    expertise: [
      'Technical SEO audits',
      'On-page optimization',
      'AI search optimization (AEO)',
      'Content strategy',
      'Link building',
      'Local SEO',
    ],
    media: { type: 'video' as const, src: '/services-seo.mp4' },
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    num: '05',
    heading: 'E-Commerce',
    desc: 'From store setup to scaling — we build e-commerce experiences that actually sell. Shopify, WooCommerce, or fully custom.',
    expertise: [
      'Shopify store builds',
      'Product page optimization',
      'Checkout optimization',
      'Inventory & app integration',
      'Store speed & performance',
      'Platform migration',
    ],
    media: { type: 'img' as const, src: '/services-web-dev.jpg' },
  },
]

const COLLAB = [
  {
    num: '01',
    title: 'One-Time Project',
    desc: 'You need something built. We scope it, price it, and deliver it. Clean handoff, no ongoing commitment required.',
    items: ['Clear scope and timeline', 'Fixed price, no surprises', 'Direct founder involvement', 'Full handoff on completion'],
  },
  {
    num: '02',
    title: 'Monthly Partnership',
    desc: 'For brands that need consistent support. We become your embedded team — available, responsive, always moving forward.',
    items: ['Set hours each month', 'Priority response time', 'Direct founder access', 'Monthly strategy calls'],
  },
  {
    num: '03',
    title: 'Equity / Revenue Share',
    desc: "No budget? Strong product? We occasionally take on projects in exchange for a stake in the outcome. Let's talk.",
    items: ['For early-stage founders only', 'We invest time, you share upside', 'Full agency service', 'Long-term partnership mindset'],
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [activeId, setActiveId] = useState('web-dev')
  const [isMobile, setIsMobile] = useState(false)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Intersection observer — updates active service in left nav
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SERVICES.forEach(({ id }) => {
      const el = sectionRefs.current[id]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id]
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <HeroCinematic text="Everything your business needs. Online." speed={18}>
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(0.82rem, 1.5vw, 0.95rem)',
          color: 'rgba(255,255,255,0.4)',
          lineHeight: 1.75,
          maxWidth: 460,
          textAlign: 'center',
          margin: 0,
        }}>
          Websites, automation, growth strategy, and SEO.<br />
          Most clients use a few of these together. We act as your engine.
        </p>
      </HeroCinematic>

      {/* ── MOBILE TAB BAR ─────────────────────────────────────────────────── */}
      {isMobile && (
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch' as never,
          scrollbarWidth: 'none' as never,
        }}>
          <div style={{ display: 'flex', padding: '0 4px', minWidth: 'max-content' }}>
            {SERVICES.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${activeId === s.id ? '#0a0a0a' : 'transparent'}`,
                  padding: '14px 14px',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: activeId === s.id ? 700 : 500,
                  fontSize: '0.75rem',
                  letterSpacing: '0.02em',
                  color: activeId === s.id ? '#0a0a0a' : 'rgba(10,10,10,0.4)',
                  whiteSpace: 'nowrap' as const,
                  transition: 'color 0.2s, border-color 0.2s',
                  cursor: 'pointer',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── SERVICES BODY ──────────────────────────────────────────────────── */}
      <div style={{ background: '#ffffff', display: 'flex', alignItems: 'stretch' }}>

        {/* ─ Sticky left nav (desktop) ─ */}
        {!isMobile && (
          <div style={{
            width: 220,
            flexShrink: 0,
            borderRight: '1px solid rgba(0,0,0,0.08)',
          }}>
            <div style={{
              position: 'sticky',
              top: 80,
              padding: 'clamp(40px,5vw,72px) 32px clamp(40px,5vw,72px) clamp(16px,3vw,48px)',
            }}>
              {/* Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                <span style={{ display: 'inline-block', width: 16, height: 1, background: 'rgba(10,10,10,0.28)', flexShrink: 0 }} />
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.58rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(10,10,10,0.3)',
                }}>
                  All Services
                </span>
              </div>

              {/* Nav items */}
              <nav>
                {SERVICES.map(s => {
                  const active = activeId === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left' as const,
                        padding: '9px 0',
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: active ? 700 : 400,
                        fontSize: '0.88rem',
                        color: active ? '#0a0a0a' : 'rgba(10,10,10,0.35)',
                        letterSpacing: active ? '-0.1px' : '0',
                        transition: 'color 0.25s ease',
                        cursor: 'pointer',
                        lineHeight: 1.35,
                      }}
                    >
                      <span style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: active ? '#0a0a0a' : 'rgba(10,10,10,0.15)',
                        transition: 'background 0.25s ease, transform 0.25s ease',
                        transform: active ? 'scale(1.3)' : 'scale(1)',
                      }} />
                      {s.label}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        )}

        {/* ─ Scrollable service sections ─ */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {SERVICES.map((s, idx) => (
            <div
              key={s.id}
              id={s.id}
              ref={el => { sectionRefs.current[s.id] = el }}
              style={{
                padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,72px)',
                borderBottom: idx < SERVICES.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
              }}
            >
              {/* Number + heading */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <p style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(10,10,10,0.25)',
                  marginBottom: 14,
                }}>
                  {s.num}
                </p>
                <h2 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(1.7rem, 3vw, 2.6rem)',
                  fontWeight: 700,
                  color: '#0a0a0a',
                  letterSpacing: '-1px',
                  lineHeight: 1.1,
                  margin: '0 0 18px 0',
                }}>
                  {s.heading}
                </h2>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.75,
                  color: 'rgba(10,10,10,0.48)',
                  maxWidth: 520,
                  margin: '0 0 40px 0',
                }}>
                  {s.desc}
                </p>
              </motion.div>

              {/* Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
                style={{
                  width: '100%',
                  aspectRatio: '16 / 7',
                  overflow: 'hidden',
                  background: '#111',
                  marginBottom: 44,
                }}
              >
                {s.media.type === 'video' ? (
                  <video
                    src={s.media.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <img
                    src={s.media.src}
                    alt={s.heading}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </motion.div>

              {/* Expertise */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20,
                }}>
                  <span style={{ display: 'inline-block', width: 16, height: 1, background: 'rgba(10,10,10,0.28)', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(10,10,10,0.3)',
                  }}>
                    Expertise Includes
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                }}>
                  {s.expertise.map((item, ei) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={VP}
                      transition={{ duration: 0.3, delay: 0.15 + ei * 0.05 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '14px 0',
                        borderBottom: '1px solid rgba(0,0,0,0.08)',
                        paddingRight: 16,
                      }}
                    >
                      <span style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: '#0a0a0a',
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#0a0a0a',
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW WE WORK ────────────────────────────────────────────────────── */}
      <section style={{
        background: '#ffffff',
        padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)',
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}
          >
            <span style={{ display: 'inline-block', width: 20, height: 1, background: 'rgba(10,10,10,0.3)', flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              color: 'rgba(10,10,10,0.3)',
            }}>
              How We Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-1px',
              lineHeight: 1.15,
              margin: '0 0 60px 0',
              maxWidth: 560,
            }}
          >
            Three ways we can work together — pick what fits.
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            borderTop: '1px solid rgba(0,0,0,0.09)',
          }}>
            {COLLAB.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                style={{
                  padding: '40px 36px 40px 0',
                  paddingLeft: i > 0 ? 36 : 0,
                  borderLeft: i > 0 ? '1px solid rgba(0,0,0,0.09)' : 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.09)',
                }}
              >
                <p style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(10,10,10,0.25)',
                  marginBottom: 16,
                }}>
                  {c.num}
                </p>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#0a0a0a',
                  letterSpacing: '-0.3px',
                  margin: '0 0 12px 0',
                }}>
                  {c.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.72,
                  color: 'rgba(10,10,10,0.48)',
                  margin: '0 0 28px 0',
                }}>
                  {c.desc}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                  {c.items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: '#0a0a0a',
                        flexShrink: 0,
                        marginTop: 7,
                      }} />
                      <span style={{ fontSize: '0.85rem', color: '#0a0a0a', lineHeight: 1.45 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK BANNER ────────────────────────────────────────────────────── */}
      <section style={{
        background: '#0a0a0a',
        padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}
          >
            <span style={{ display: 'inline-block', width: 20, height: 1, background: 'rgba(255,255,255,0.28)', flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.28)',
            }}>
              The Bigger Picture
            </span>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(36px,6vw,88px)',
            alignItems: 'center',
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-1.5px',
                lineHeight: 1.08,
                margin: 0,
              }}
            >
              Your brand deserves more than a freelancer.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
            >
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.42)',
                margin: '0 0 36px 0',
                maxWidth: 420,
              }}>
                Most businesses outgrow one-person shops fast. Webbes gives you a full agency — without the bloated retainer.
              </p>
              <a
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  color: '#0a0a0a',
                  padding: '13px 32px',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  transition: 'opacity 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Start a Project →
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
