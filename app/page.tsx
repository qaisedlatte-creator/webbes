'use client'

import { useState } from 'react'
import { BeforeAfterSlider } from '@/components/ui/before-after-slider'

const N = '#2D3A4A'
const N70 = 'rgba(45,58,74,0.70)'
const N45 = 'rgba(45,58,74,0.45)'
const N20 = 'rgba(45,58,74,0.20)'
const N10 = 'rgba(45,58,74,0.10)'
const N06 = 'rgba(45,58,74,0.06)'
const BORDER = 'rgba(45,58,74,0.13)'
const BORDER_STRONG = 'rgba(45,58,74,0.24)'
const BG = '#ECEAE3'
const BG_CARD = '#E8E5DD'

const TICKER_ITEMS = ['Website Development', 'AI Automation', 'Shopify Stores', 'E-Commerce', 'Digital Marketing', 'UI/UX Design']

const SERVICES = [
  { n: '01', icon: '⚡', title: 'AI Automation', desc: 'Intelligent workflows, chatbots, lead scoring, and business process automation that eliminates busywork and amplifies output.', tags: ['n8n', 'Make', 'OpenAI', 'Zapier'] },
  { n: '02', icon: '🖥️', title: 'Website Development', desc: 'Fast, pixel-perfect websites — corporate sites, landing pages, and web apps built to convert visitors into customers.', tags: ['React', 'Next.js', 'Custom Code'] },
  { n: '03', icon: '🛒', title: 'E-Commerce Stores', desc: 'End-to-end online stores with product catalogs, payment gateways, and inventory management — built to sell.', tags: ['Shopify', 'WooCommerce', 'Custom'] },
]

const PROCESS = [
  { n: '1', title: 'Discover', desc: 'Deep dive into your business, goals, target audience, and competitive landscape.' },
  { n: '2', title: 'Design', desc: 'Wireframes, mockups, and prototypes — crafted to pixel-perfect standards before a single line of code.' },
  { n: '3', title: 'Develop', desc: 'Clean, scalable code with smooth interactions and flawless performance on every device.' },
  { n: '4', title: 'Deploy & Grow', desc: 'Launch, monitor, optimise, and scale — with dedicated ongoing support whenever you need it.' },
]

const TECH = ['React', 'Next.js', 'Shopify', 'WordPress', 'n8n', 'Make (Integromat)', 'OpenAI API', 'Figma', 'Google Ads', 'Meta Ads Manager', 'Webflow', 'Node.js']

const WHY = [
  { icon: '🛠️', title: 'We Actually Build It', desc: 'No outsourcing, no generic templates. Every project is custom-built hands-on. Real craftsmanship, not recycled designs.' },
  { icon: '⚡', title: '1–3 Week Delivery', desc: 'Most websites delivered in 1–3 weeks. We respond within hours, not days. You always know exactly where your project stands.' },
  { icon: '🔓', title: 'You Own Everything', desc: 'Full source code, full access, zero lock-in. If we\'re not delivering value, you can walk — no contracts, no strings.' },
]

const FAQS = [
  { q: 'What services does Webbes offer?', a: 'We specialise in Website Development (custom sites, Shopify, WordPress), AI Automation (workflows, chatbots, process automation), and E-Commerce (full online store setup with payments and inventory management).' },
  { q: 'How long does a website project take?', a: 'A landing page: 3–5 days. A full website: 2–4 weeks. Complex e-commerce or AI automation setups: 4–8 weeks. We give you a precise timeline in your first call — no vague estimates.' },
  { q: 'Do you work with clients outside India?', a: 'Absolutely. We actively serve clients across India and the GCC region (UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman). We\'re built for remote collaboration across time zones.' },
  { q: 'What makes Webbes different from other agencies?', a: 'Every project is handled directly by Qais and Falah — no middlemen, no account managers. AI-first approach, direct communication, fast delivery, and you own everything we build.' },
  { q: 'Do you offer support after launch?', a: 'Yes. We offer post-launch support covering maintenance, performance monitoring, content updates, and ongoing optimisation to keep your site performing at its best.' },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ background: BG, color: N, minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <header style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,5vw,64px) clamp(72px,9vw,120px)', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, fontSize: '0.78rem', fontWeight: 600, color: N45, letterSpacing: 1 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          Now Accepting New Projects
        </div>
        <h1 style={{ fontFamily: 'var(--font-plus-jakarta)', fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px', color: N, marginBottom: 24 }}>
          Websites. AI.<br />Results.
        </h1>
        <p style={{ fontSize: '1rem', lineHeight: 1.72, color: N70, maxWidth: 520, marginBottom: 32 }}>
          We build websites that bring in customers, AI automations that save real hours, and e-commerce stores that actually sell — for businesses across <strong>India</strong> and the <strong>GCC.</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
          <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: N, color: BG, borderRadius: 8, padding: '13px 26px', fontFamily: 'var(--font-plus-jakarta)', fontWeight: 600, fontSize: '0.88rem', letterSpacing: '-0.1px', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Start a Project
          </a>
          <a href="/services" style={{ display: 'inline-flex', alignItems: 'center', border: `1.5px solid ${N20}`, color: N, borderRadius: 8, padding: '13px 26px', fontFamily: 'var(--font-plus-jakarta)', fontWeight: 600, fontSize: '0.88rem', background: 'transparent', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = N)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = N20)}>
            See Services
          </a>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: '0.8rem', color: N45, alignItems: 'center' }}>
          <span>Based in Kochi, India</span>
          <span style={{ width: 1, height: 12, background: N20, display: 'inline-block' }} />
          <span>Serving India &amp; GCC</span>
          <span style={{ width: 1, height: 12, background: N20, display: 'inline-block' }} />
          <span>15+ Projects Live</span>
        </div>
      </header>

      {/* ── BEFORE / AFTER CASE STUDY ────────────────────────────────────── */}
      <section className="border-t border-neutral-200 py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-4">
              Real work · Kerala real estate
            </p>
            <h2 className="text-[#0a0a0a] text-3xl md:text-4xl font-bold tracking-tight mb-3">
              This is what we fix.
            </h2>
            <p className="text-neutral-500 text-[15px] max-w-lg leading-relaxed">
              A Kozhikode real estate company running on a 2005-era portal —
              ad banners, zero mobile support, no WhatsApp lead capture.
              We rebuilt it from scratch. Drag to compare.
            </p>
          </div>

          <BeforeAfterSlider
            beforeImage="/case-study-before.png"
            afterImage="/case-study-after.png"
            beforeLabel="Before"
            afterLabel="After — Webbes"
            className="mb-4"
          />

          <p className="text-[11px] text-neutral-300">* Demo build.</p>
        </div>
      </section>

      {/* ── LIVE PORTFOLIO ───────────────────────────────────────────────── */}
      <section className="border-t border-neutral-200 py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-16">
            Live work
          </p>
          <div className="flex flex-col">
            {[
              { name: 'Pearl Imperial International', tag: 'B2B Corporate · UAE', url: 'https://pearlimperialintl.com' },
              { name: 'Dept Store', tag: 'E-Commerce · India', url: 'https://deptstore.in' },
              { name: 'Prism India', tag: 'Shopify · India', url: 'https://prismindia.co' },
            ].map((p, i) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between py-7 border-t border-neutral-200 hover:pl-2 transition-all duration-200${i === 2 ? ' border-b' : ''}`}
              >
                <div>
                  <p className="text-[#0a0a0a] text-xl md:text-2xl font-medium group-hover:text-neutral-500 transition-colors">
                    {p.name}
                  </p>
                  <p className="text-neutral-400 text-xs mt-1">{p.tag}</p>
                </div>
                <span className="text-neutral-300 group-hover:text-neutral-600 transition-colors text-xl">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, overflow: 'hidden', padding: '14px 0', background: BG_CARD }} aria-hidden="true">
        <div style={{ display: 'flex', width: 'max-content', animation: 'ticker 22s linear infinite' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 20, paddingRight: 20, fontFamily: 'var(--font-plus-jakarta)', fontWeight: 600, fontSize: '0.82rem', color: N45, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
              {item}
              <span style={{ color: N20 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: 2.5, textTransform: 'uppercase', color: N45, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ width: 20, height: 1.5, background: 'currentColor', display: 'inline-block' }} />
            Who We Are
          </div>
          <h2 style={{ fontFamily: 'var(--font-plus-jakarta)', fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.8px', color: N }}>
            Two founders from Kochi.<br />Every project, personally.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>
          <div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.72, color: N70, marginBottom: 16 }}><strong>Webbes</strong> is built and run by Qais and Falah — two co-founders from Kochi who started this because we got tired of watching good businesses settle for overpriced, underwhelming work from agencies that never actually cared. We handle every project ourselves. No outsourcing, no account managers, no telephone game.</p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.72, color: N70, marginBottom: 16 }}>We work with local businesses across Kerala — from Kochi to Kozhikode — who want a real digital presence without dealing with a big agency. We also work with businesses across India and the GCC who need fast delivery and honest communication.</p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.72, color: N70 }}>Technical depth, direct access to the people doing the work, and results you can measure. That&apos;s what we built Webbes to be.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: '🎯', title: 'Mission-Driven', desc: 'Building something we\'d be genuinely proud of — a Kochi agency known for honest work and real outcomes.' },
              { icon: '⚡', title: 'Rapid Delivery', desc: 'Tight cycles, meticulous quality, and on-time delivery — every time.' },
              { icon: '🤝', title: 'True Partnership', desc: 'Your growth is our growth. Your success is our reputation.' },
              { icon: '🔬', title: 'AI-First Approach', desc: 'We embed AI and automation into everything we build — giving your business an unfair competitive edge.' },
            ].map(v => (
              <div key={v.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{v.icon}</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 700, fontSize: '0.9rem', color: N, marginBottom: 4 }}>{v.title}</h4>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: N70 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS ──────────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: BG_CARD }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,48px) clamp(20px,5vw,64px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          {[
            { num: 'Founded in Kochi', label: 'Kerala, India' },
            { num: 'Websites + AI', label: 'One team, one roof' },
            { num: 'Direct founders', label: 'No middlemen, ever' },
          ].map(m => (
            <div key={m.label} style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 700, fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', letterSpacing: '-0.5px', color: N, marginBottom: 4 }}>{m.num}</div>
              <div style={{ fontSize: '0.8rem', color: N45, fontWeight: 500 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: '0.68rem', letterSpacing: 2.5, textTransform: 'uppercase', color: N45, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 20, height: 1.5, background: 'currentColor', display: 'inline-block' }} />
              What We Do
            </div>
            <h2 style={{ fontFamily: 'var(--font-plus-jakarta)', fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.8px', color: N }}>
              Everything Your<br />Business Needs Online.
            </h2>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.72, color: N70, maxWidth: 380 }}>From intelligent automations to stunning storefronts — we cover every angle of your digital presence.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {SERVICES.map(s => (
            <div key={s.n} style={{ background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '32px 28px', position: 'relative' }}>
              <span style={{ position: 'absolute', top: 20, right: 24, fontSize: '0.72rem', color: N20, fontFamily: 'var(--font-plus-jakarta)', fontWeight: 700 }}>{s.n}</span>
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 700, fontSize: '1.1rem', color: N, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: N70, marginBottom: 20 }}>{s.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {s.tags.map(t => (
                  <span key={t} style={{ fontSize: '0.72rem', color: N45, border: `1px solid ${BORDER}`, borderRadius: 6, padding: '3px 10px', fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontSize: '0.88rem', color: N45, marginBottom: 16 }}>Also: Shopify, WordPress, Digital Marketing, UI/UX Design, SEO &amp; more</p>
          <a href="/services" style={{ display: 'inline-flex', alignItems: 'center', border: `1.5px solid ${N20}`, color: N, borderRadius: 8, padding: '13px 26px', fontFamily: 'var(--font-plus-jakarta)', fontWeight: 600, fontSize: '0.88rem', background: 'transparent' }}>View All Services →</a>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 56px' }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: 2.5, textTransform: 'uppercase', color: N45, fontWeight: 600, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            How We Work
          </div>
          <h2 style={{ fontFamily: 'var(--font-plus-jakarta)', fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.8px', color: N }}>Simple Process.<br />Serious Results.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          {PROCESS.map(p => (
            <div key={p.n} style={{ textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, border: `1.5px solid ${N20}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'var(--font-plus-jakarta)', fontWeight: 700, fontSize: '1rem', color: N }}>{p.n}</div>
              <h4 style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 700, color: N, marginBottom: 8 }}>{p.title}</h4>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: N70 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: 2.5, textTransform: 'uppercase', color: N45, fontWeight: 600, display: 'flex', justifyContent: 'center', marginBottom: 14 }}>Our Toolkit</div>
          <h2 style={{ fontFamily: 'var(--font-plus-jakarta)', fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.8px', color: N }}>Tools We Master.</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {TECH.map(t => (
            <span key={t} style={{ border: `1px solid ${BORDER_STRONG}`, borderRadius: 8, padding: '8px 16px', fontSize: '0.85rem', color: N70, fontWeight: 500, background: BG_CARD }}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── WHY WEBBES ───────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: 2.5, textTransform: 'uppercase', color: N45, fontWeight: 600, display: 'flex', justifyContent: 'center', marginBottom: 14 }}>Why Webbes</div>
          <h2 style={{ fontFamily: 'var(--font-plus-jakarta)', fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.8px', color: N }}>Why Businesses<br />Choose Us.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {WHY.map(w => (
            <div key={w.title} style={{ background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '32px 28px' }}>
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>{w.icon}</div>
              <h4 style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 700, color: N, marginBottom: 10 }}>{w.title}</h4>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: N70 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: 2.5, textTransform: 'uppercase', color: N45, fontWeight: 600, display: 'flex', justifyContent: 'center', marginBottom: 14 }}>FAQ</div>
          <h2 style={{ fontFamily: 'var(--font-plus-jakarta)', fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.8px', color: N }}>Common Questions.</h2>
        </div>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderTop: `1px solid ${BORDER}`, ...(i === FAQS.length - 1 ? { borderBottom: `1px solid ${BORDER}` } : {}) }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: N, fontFamily: 'var(--font-plus-jakarta)', fontWeight: 600, fontSize: '0.95rem', gap: 16 }}
              >
                {f.q}
                <span style={{ fontSize: '1.4rem', fontWeight: 300, color: N45, flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ paddingBottom: 20, fontSize: '0.9rem', lineHeight: 1.7, color: N70 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,48px)', border: `1px solid ${BORDER_STRONG}`, borderRadius: 20, background: BG_CARD }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: 2.5, textTransform: 'uppercase', color: N45, fontWeight: 600, display: 'flex', justifyContent: 'center', marginBottom: 14 }}>Get In Touch</div>
          <h2 style={{ fontFamily: 'var(--font-plus-jakarta)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.8px', color: N, marginBottom: 12 }}>
            Let&apos;s Build Something<br />That Works.
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.72, color: N70, marginBottom: 24 }}>Tell us about your project and we&apos;ll get back within 24 hours. No sales pitch — just straight talk.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: N, color: BG, borderRadius: 8, padding: '13px 26px', fontFamily: 'var(--font-plus-jakarta)', fontWeight: 600, fontSize: '0.88rem' }}>
              Start a Project
            </a>
            <a href="https://wa.me/919149681874" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', border: `1.5px solid ${N20}`, color: N, borderRadius: 8, padding: '13px 26px', fontFamily: 'var(--font-plus-jakarta)', fontWeight: 600, fontSize: '0.88rem', background: 'transparent' }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
