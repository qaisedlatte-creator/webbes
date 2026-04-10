'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

// ─── Design tokens ────────────────────────────────────────────────────────────
const N            = '#2D3A4A'
const N70          = 'rgba(45,58,74,0.70)'
const N45          = 'rgba(45,58,74,0.45)'
const N20          = 'rgba(45,58,74,0.20)'
const BORDER       = 'rgba(45,58,74,0.13)'
const BORDER_S     = 'rgba(45,58,74,0.24)'
const BG           = '#ECEAE3'
const BG_CARD      = '#E8E5DD'
const BG_HOVER     = '#E2DFD6'

// ─── Motion variants ──────────────────────────────────────────────────────────
const E: [number,number,number,number] = [0.22, 1, 0.36, 1]   // premium ease-out

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: E } },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.55, ease: E } },
}

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const staggerSlow: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
}

const VIEW = { once: true, margin: '-80px' as const }

// ─── Reusable section header ──────────────────────────────────────────────────
function SectionLabel({ text, center = false }: { text: string; center?: boolean }) {
  return (
    <motion.div variants={fadeIn} style={{
      fontSize: '0.68rem', letterSpacing: 2.5, textTransform: 'uppercase',
      color: N45, fontWeight: 600,
      display: 'flex', alignItems: 'center', justifyContent: center ? 'center' : 'flex-start',
      gap: 10, marginBottom: 14,
    }}>
      {!center && <motion.span
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.5, ease: E }}
        style={{ width: 20, height: 1.5, background: 'currentColor', display: 'inline-block', transformOrigin: 'left' }}
      />}
      {text}
      {center && <motion.span
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.5, ease: E }}
        style={{ width: 20, height: 1.5, background: 'currentColor', display: 'inline-block', transformOrigin: 'left' }}
      />}
    </motion.div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TICKER_ITEMS = ['Website Development','AI Automation','Shopify Stores','E-Commerce','Digital Marketing','UI/UX Design']

const SERVICES = [
  { n:'01', icon:'⚡', title:'AI Automation',        desc:'Intelligent workflows, chatbots, lead scoring, and business process automation that eliminates busywork and amplifies output.',  tags:['n8n','Make','OpenAI','Zapier'] },
  { n:'02', icon:'🖥️', title:'Website Development',  desc:'Fast, pixel-perfect websites — corporate sites, landing pages, and web apps built to convert visitors into customers.',            tags:['React','Next.js','Custom Code'] },
  { n:'03', icon:'🛒', title:'E-Commerce Stores',    desc:'End-to-end online stores with product catalogs, payment gateways, and inventory management — built to sell.',                    tags:['Shopify','WooCommerce','Custom'] },
]

const PROCESS = [
  { n:'1', title:'Discover',       desc:'Deep dive into your business, goals, target audience, and competitive landscape.' },
  { n:'2', title:'Design',         desc:'Wireframes, mockups, and prototypes — crafted to pixel-perfect standards before a single line of code.' },
  { n:'3', title:'Develop',        desc:'Clean, scalable code with smooth interactions and flawless performance on every device.' },
  { n:'4', title:'Deploy & Grow',  desc:'Launch, monitor, optimise, and scale — with dedicated ongoing support whenever you need it.' },
]

const TECH = ['React','Next.js','Shopify','WordPress','n8n','Make (Integromat)','OpenAI API','Figma','Google Ads','Meta Ads Manager','Webflow','Node.js']

const WHY = [
  { icon:'🛠️', title:'We Actually Build It',    desc:"No outsourcing, no generic templates. Every project is custom-built hands-on. Real craftsmanship, not recycled designs." },
  { icon:'⚡',  title:'1–3 Week Delivery',       desc:"Most websites delivered in 1–3 weeks. We respond within hours, not days. You always know exactly where your project stands." },
  { icon:'🔓', title:'You Own Everything',      desc:"Full source code, full access, zero lock-in. If we're not delivering value, you can walk — no contracts, no strings." },
]

const FAQS = [
  { q:'What services does Webbes offer?',               a:"We specialise in Website Development (custom sites, Shopify, WordPress), AI Automation (workflows, chatbots, process automation), and E-Commerce (full online store setup with payments and inventory management)." },
  { q:'How long does a website project take?',          a:"A landing page: 3–5 days. A full website: 2–4 weeks. Complex e-commerce or AI automation setups: 4–8 weeks. We give you a precise timeline in your first call — no vague estimates." },
  { q:'Do you work with clients outside India?',        a:"Absolutely. We actively serve clients across India and the GCC region (UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman). We're built for remote collaboration across time zones." },
  { q:'What makes Webbes different from other agencies?', a:"Every project is handled directly by Qais and Falah — no middlemen, no account managers. AI-first approach, direct communication, fast delivery, and you own everything we build." },
  { q:'Do you offer support after launch?',             a:"Yes. We offer post-launch support covering maintenance, performance monitoring, content updates, and ongoing optimisation to keep your site performing at its best." },
]

const VALUES = [
  { icon:'🎯', title:'Mission-Driven',     desc:"Building something we'd be genuinely proud of — a Kochi agency known for honest work and real outcomes." },
  { icon:'⚡',  title:'Rapid Delivery',    desc:"Tight cycles, meticulous quality, and on-time delivery — every time." },
  { icon:'🤝', title:'True Partnership',  desc:"Your growth is our growth. Your success is our reputation." },
  { icon:'🔬', title:'AI-First Approach', desc:"We embed AI and automation into everything we build — giving your business an unfair competitive edge." },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ background: BG, color: N, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <motion.header
        variants={stagger} initial="hidden" animate="show"
        style={{ padding: 'clamp(110px,13vw,170px) clamp(20px,5vw,64px) clamp(72px,9vw,120px)', maxWidth: 1200, margin: '0 auto' }}
      >
        {/* Eyebrow */}
        <motion.div variants={fadeIn} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:32, fontSize:'0.78rem', fontWeight:600, color:N45, letterSpacing:1 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block', animation:'pulse-dot 2s ease-in-out infinite' }} />
          Now Accepting New Projects
        </motion.div>

        {/* Headline — each line reveals independently */}
        <div style={{ overflow:'hidden', marginBottom:8 }}>
          <motion.h1
            variants={fadeUp}
            style={{ fontFamily:'var(--font-plus-jakarta)', fontSize:'clamp(3rem,7.5vw,6rem)', fontWeight:800, lineHeight:1.04, letterSpacing:'-2.5px', color:N, margin:0 }}
          >
            Websites. AI.
          </motion.h1>
        </div>
        <div style={{ overflow:'hidden', marginBottom:32 }}>
          <motion.h1
            variants={fadeUp}
            style={{ fontFamily:'var(--font-plus-jakarta)', fontSize:'clamp(3rem,7.5vw,6rem)', fontWeight:800, lineHeight:1.04, letterSpacing:'-2.5px', color:N, margin:0 }}
          >
            Results.
          </motion.h1>
        </div>

        <motion.p variants={fadeUp} style={{ fontSize:'1.05rem', lineHeight:1.75, color:N70, maxWidth:520, marginBottom:36 }}>
          We build websites that bring in customers, AI automations that save real hours, and e-commerce stores that actually sell — for businesses across <strong>India</strong> and the <strong>GCC.</strong>
        </motion.p>

        {/* Buttons */}
        <motion.div variants={fadeUp} style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:44 }}>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.025, boxShadow:`0 8px 32px ${N20}` }}
            whileTap={{ scale: 0.97 }}
            transition={{ type:'spring', stiffness:400, damping:24 }}
            style={{ display:'inline-flex', alignItems:'center', background:N, color:BG, borderRadius:10, padding:'14px 28px', fontFamily:'var(--font-plus-jakarta)', fontWeight:700, fontSize:'0.9rem', letterSpacing:'-0.1px', cursor:'pointer' }}
          >
            Start a Project
          </motion.a>
          <motion.a
            href="/services"
            whileHover={{ scale: 1.025, borderColor: N }}
            whileTap={{ scale: 0.97 }}
            transition={{ type:'spring', stiffness:400, damping:24 }}
            style={{ display:'inline-flex', alignItems:'center', border:`1.5px solid ${N20}`, color:N, borderRadius:10, padding:'14px 28px', fontFamily:'var(--font-plus-jakarta)', fontWeight:600, fontSize:'0.9rem', background:'transparent', cursor:'pointer' }}
          >
            See Services
          </motion.a>
        </motion.div>

        <motion.div variants={fadeIn} style={{ display:'flex', gap:24, flexWrap:'wrap', fontSize:'0.8rem', color:N45, alignItems:'center' }}>
          <span>Based in Kochi, India</span>
          <span style={{ width:1, height:12, background:N20, display:'inline-block' }} />
          <span>Serving India &amp; GCC</span>
          <span style={{ width:1, height:12, background:N20, display:'inline-block' }} />
          <span>15+ Projects Live</span>
        </motion.div>
      </motion.header>

      {/* ── TICKER ───────────────────────────────────────────────────────── */}
      <div style={{ borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, overflow:'hidden', padding:'14px 0', background:BG_CARD }} className="ticker-fade" aria-hidden="true">
        <div style={{ display:'flex', width:'max-content', animation:'ticker 28s linear infinite' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:20, paddingRight:20, fontFamily:'var(--font-plus-jakarta)', fontWeight:600, fontSize:'0.8rem', color:N45, whiteSpace:'nowrap' }}>
              {item}
              <span style={{ color:N20 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <motion.section
        variants={stagger} initial="hidden" whileInView="show" viewport={VIEW}
        style={{ padding:'clamp(80px,9vw,130px) clamp(20px,5vw,64px)', maxWidth:1200, margin:'0 auto' }}
      >
        <motion.div variants={fadeUp} style={{ marginBottom:52 }}>
          <SectionLabel text="Who We Are" />
          <h2 style={{ fontFamily:'var(--font-plus-jakarta)', fontSize:'clamp(1.9rem,4vw,3rem)', fontWeight:700, lineHeight:1.12, letterSpacing:'-0.8px', color:N }}>
            Two founders from Kochi.<br />Every project, personally.
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:56 }}>
          <motion.div variants={fadeUp}>
            <p style={{ fontSize:'1rem', lineHeight:1.8, color:N70, marginBottom:18 }}><strong>Webbes</strong> is built and run by Qais and Falah — two co-founders from Kochi who started this because we got tired of watching good businesses settle for overpriced, underwhelming work from agencies that never actually cared. We handle every project ourselves. No outsourcing, no account managers, no telephone game.</p>
            <p style={{ fontSize:'1rem', lineHeight:1.8, color:N70, marginBottom:18 }}>We work with local businesses across Kerala — from Kochi to Kozhikode — who want a real digital presence without dealing with a big agency. We also work with businesses across India and the GCC who need fast delivery and honest communication.</p>
            <p style={{ fontSize:'1rem', lineHeight:1.8, color:N70 }}>Technical depth, direct access to the people doing the work, and results you can measure. That&apos;s what we built Webbes to be.</p>
          </motion.div>

          <motion.div variants={stagger} style={{ display:'flex', flexDirection:'column', gap:28 }}>
            {VALUES.map(v => (
              <motion.div key={v.title} variants={fadeUp} style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
                <span style={{ fontSize:'1.3rem', flexShrink:0, marginTop:2 }}>{v.icon}</span>
                <div>
                  <h4 style={{ fontFamily:'var(--font-plus-jakarta)', fontWeight:700, fontSize:'0.92rem', color:N, marginBottom:5 }}>{v.title}</h4>
                  <p style={{ fontSize:'0.87rem', lineHeight:1.65, color:N70 }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── METRICS ──────────────────────────────────────────────────────── */}
      <motion.div
        initial="hidden" whileInView="show" variants={stagger} viewport={VIEW}
        style={{ borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, background:BG_CARD }}
      >
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'clamp(36px,5vw,56px) clamp(20px,5vw,64px)', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:32 }}>
          {[
            { num:'Founded in Kochi', label:'Kerala, India' },
            { num:'Websites + AI',    label:'One team, one roof' },
            { num:'Direct founders',  label:'No middlemen, ever' },
          ].map(m => (
            <motion.div key={m.label} variants={fadeUp} style={{ textAlign:'center', padding:'16px 0' }}>
              <div style={{ fontFamily:'var(--font-plus-jakarta)', fontWeight:700, fontSize:'clamp(1.1rem,2.5vw,1.4rem)', letterSpacing:'-0.5px', color:N, marginBottom:5 }}>{m.num}</div>
              <div style={{ fontSize:'0.8rem', color:N45, fontWeight:500 }}>{m.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <motion.section
        variants={stagger} initial="hidden" whileInView="show" viewport={VIEW}
        style={{ padding:'clamp(80px,9vw,130px) clamp(20px,5vw,64px)', maxWidth:1200, margin:'0 auto' }}
      >
        <motion.div variants={fadeUp} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24, marginBottom:52 }}>
          <div>
            <SectionLabel text="What We Do" />
            <h2 style={{ fontFamily:'var(--font-plus-jakarta)', fontSize:'clamp(1.9rem,4vw,3rem)', fontWeight:700, lineHeight:1.12, letterSpacing:'-0.8px', color:N }}>
              Everything Your<br />Business Needs Online.
            </h2>
          </div>
          <p style={{ fontSize:'0.97rem', lineHeight:1.75, color:N70, maxWidth:360 }}>From intelligent automations to stunning storefronts — we cover every angle of your digital presence.</p>
        </motion.div>

        <motion.div variants={stagger} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
          {SERVICES.map(s => (
            <motion.div
              key={s.n} variants={fadeUp}
              whileHover={{ y:-6, boxShadow:`0 16px 48px rgba(45,58,74,0.10)`, background:BG_HOVER }}
              transition={{ type:'spring', stiffness:300, damping:22 }}
              style={{ background:BG_CARD, border:`1px solid ${BORDER}`, borderRadius:20, padding:'32px 28px', position:'relative', cursor:'default' }}
            >
              <span style={{ position:'absolute', top:20, right:24, fontSize:'0.72rem', color:N20, fontFamily:'var(--font-plus-jakarta)', fontWeight:700 }}>{s.n}</span>
              <div style={{ fontSize:'2.2rem', marginBottom:18 }}>{s.icon}</div>
              <h3 style={{ fontFamily:'var(--font-plus-jakarta)', fontWeight:700, fontSize:'1.1rem', color:N, marginBottom:10 }}>{s.title}</h3>
              <p style={{ fontSize:'0.88rem', lineHeight:1.7, color:N70, marginBottom:20 }}>{s.desc}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {s.tags.map(t => (
                  <span key={t} style={{ fontSize:'0.72rem', color:N45, border:`1px solid ${BORDER}`, borderRadius:6, padding:'3px 10px', fontWeight:500 }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} style={{ textAlign:'center', marginTop:44 }}>
          <p style={{ fontSize:'0.88rem', color:N45, marginBottom:18 }}>Also: Shopify, WordPress, Digital Marketing, UI/UX Design, SEO &amp; more</p>
          <motion.a
            href="/services"
            whileHover={{ scale:1.025, borderColor:N }}
            whileTap={{ scale:0.97 }}
            transition={{ type:'spring', stiffness:400, damping:24 }}
            style={{ display:'inline-flex', alignItems:'center', border:`1.5px solid ${BORDER_S}`, color:N, borderRadius:10, padding:'13px 26px', fontFamily:'var(--font-plus-jakarta)', fontWeight:600, fontSize:'0.88rem', cursor:'pointer' }}
          >
            View All Services →
          </motion.a>
        </motion.div>
      </motion.section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <motion.section
        variants={stagger} initial="hidden" whileInView="show" viewport={VIEW}
        style={{ padding:'clamp(80px,9vw,130px) clamp(20px,5vw,64px)', maxWidth:1200, margin:'0 auto', borderTop:`1px solid ${BORDER}` }}
      >
        <motion.div variants={fadeUp} style={{ textAlign:'center', maxWidth:560, margin:'0 auto 56px' }}>
          <SectionLabel text="How We Work" center />
          <h2 style={{ fontFamily:'var(--font-plus-jakarta)', fontSize:'clamp(1.9rem,4vw,3rem)', fontWeight:700, lineHeight:1.12, letterSpacing:'-0.8px', color:N }}>Simple Process.<br />Serious Results.</h2>
        </motion.div>
        <motion.div variants={stagger} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:36 }}>
          {PROCESS.map(p => (
            <motion.div key={p.n} variants={fadeUp} style={{ textAlign:'center' }}>
              <motion.div
                whileHover={{ scale:1.08 }}
                transition={{ type:'spring', stiffness:400, damping:20 }}
                style={{ width:48, height:48, border:`1.5px solid ${N20}`, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px', fontFamily:'var(--font-plus-jakarta)', fontWeight:700, fontSize:'1rem', color:N }}
              >
                {p.n}
              </motion.div>
              <h4 style={{ fontFamily:'var(--font-plus-jakarta)', fontWeight:700, color:N, marginBottom:8, fontSize:'0.95rem' }}>{p.title}</h4>
              <p style={{ fontSize:'0.86rem', lineHeight:1.68, color:N70 }}>{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <motion.section
        variants={stagger} initial="hidden" whileInView="show" viewport={VIEW}
        style={{ padding:'clamp(80px,9vw,130px) clamp(20px,5vw,64px)', maxWidth:1200, margin:'0 auto', borderTop:`1px solid ${BORDER}` }}
      >
        <motion.div variants={fadeUp} style={{ textAlign:'center', maxWidth:560, margin:'0 auto 48px' }}>
          <SectionLabel text="Our Toolkit" center />
          <h2 style={{ fontFamily:'var(--font-plus-jakarta)', fontSize:'clamp(1.9rem,4vw,3rem)', fontWeight:700, lineHeight:1.12, letterSpacing:'-0.8px', color:N }}>Tools We Master.</h2>
        </motion.div>
        <motion.div variants={staggerSlow} style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center' }}>
          {TECH.map(t => (
            <motion.span
              key={t} variants={fadeIn}
              whileHover={{ scale:1.05, background:N, color:BG, borderColor:N }}
              transition={{ type:'spring', stiffness:400, damping:20 }}
              style={{ border:`1px solid ${BORDER_S}`, borderRadius:8, padding:'9px 18px', fontSize:'0.85rem', color:N70, fontWeight:500, background:BG_CARD, cursor:'default', display:'inline-block' }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      {/* ── WHY WEBBES ───────────────────────────────────────────────────── */}
      <motion.section
        variants={stagger} initial="hidden" whileInView="show" viewport={VIEW}
        style={{ padding:'clamp(80px,9vw,130px) clamp(20px,5vw,64px)', maxWidth:1200, margin:'0 auto', borderTop:`1px solid ${BORDER}` }}
      >
        <motion.div variants={fadeUp} style={{ textAlign:'center', maxWidth:560, margin:'0 auto 52px' }}>
          <SectionLabel text="Why Webbes" center />
          <h2 style={{ fontFamily:'var(--font-plus-jakarta)', fontSize:'clamp(1.9rem,4vw,3rem)', fontWeight:700, lineHeight:1.12, letterSpacing:'-0.8px', color:N }}>Why Businesses<br />Choose Us.</h2>
        </motion.div>
        <motion.div variants={stagger} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:20 }}>
          {WHY.map(w => (
            <motion.div
              key={w.title} variants={fadeUp}
              whileHover={{ y:-6, boxShadow:`0 16px 48px rgba(45,58,74,0.10)`, background:BG_HOVER }}
              transition={{ type:'spring', stiffness:300, damping:22 }}
              style={{ background:BG_CARD, border:`1px solid ${BORDER}`, borderRadius:20, padding:'36px 28px', cursor:'default' }}
            >
              <div style={{ fontSize:'2.2rem', marginBottom:18 }}>{w.icon}</div>
              <h4 style={{ fontFamily:'var(--font-plus-jakarta)', fontWeight:700, color:N, marginBottom:10, fontSize:'1rem' }}>{w.title}</h4>
              <p style={{ fontSize:'0.88rem', lineHeight:1.7, color:N70 }}>{w.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <motion.section
        variants={stagger} initial="hidden" whileInView="show" viewport={VIEW}
        style={{ padding:'clamp(80px,9vw,130px) clamp(20px,5vw,64px)', maxWidth:1200, margin:'0 auto', borderTop:`1px solid ${BORDER}` }}
      >
        <motion.div variants={fadeUp} style={{ textAlign:'center', maxWidth:560, margin:'0 auto 52px' }}>
          <SectionLabel text="FAQ" center />
          <h2 style={{ fontFamily:'var(--font-plus-jakarta)', fontSize:'clamp(1.9rem,4vw,3rem)', fontWeight:700, lineHeight:1.12, letterSpacing:'-0.8px', color:N }}>Common Questions.</h2>
        </motion.div>
        <motion.div variants={stagger} style={{ maxWidth:720, margin:'0 auto' }}>
          {FAQS.map((f, i) => (
            <motion.div key={i} variants={fadeUp} style={{ borderTop:`1px solid ${BORDER}`, ...(i===FAQS.length-1?{borderBottom:`1px solid ${BORDER}`}:{}) }}>
              <button
                onClick={() => setOpenFaq(openFaq===i ? null : i)}
                style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'22px 0', background:'none', border:'none', cursor:'pointer', textAlign:'left', color:N, fontFamily:'var(--font-plus-jakarta)', fontWeight:600, fontSize:'0.97rem', gap:16 }}
              >
                {f.q}
                <motion.span
                  animate={{ rotate: openFaq===i ? 45 : 0 }}
                  transition={{ duration:0.25, ease:E }}
                  style={{ fontSize:'1.5rem', fontWeight:300, color:N45, flexShrink:0, display:'inline-block' }}
                >+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openFaq===i && (
                  <motion.div
                    key="answer"
                    initial={{ height:0, opacity:0 }}
                    animate={{ height:'auto', opacity:1 }}
                    exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.32, ease:E }}
                    style={{ overflow:'hidden' }}
                  >
                    <p style={{ paddingBottom:24, fontSize:'0.93rem', lineHeight:1.75, color:N70 }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── CONTACT CTA ──────────────────────────────────────────────────── */}
      <motion.section
        variants={stagger} initial="hidden" whileInView="show" viewport={VIEW}
        style={{ padding:'clamp(80px,9vw,130px) clamp(20px,5vw,64px)', maxWidth:1200, margin:'0 auto', borderTop:`1px solid ${BORDER}` }}
      >
        <motion.div
          variants={fadeUp}
          style={{ textAlign:'center', maxWidth:600, margin:'0 auto', padding:'clamp(48px,7vw,80px) clamp(24px,5vw,56px)', border:`1px solid ${BORDER_S}`, borderRadius:24, background:BG_CARD }}
        >
          <SectionLabel text="Get In Touch" center />
          <h2 style={{ fontFamily:'var(--font-plus-jakarta)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:700, lineHeight:1.12, letterSpacing:'-0.8px', color:N, marginBottom:14 }}>
            Let&apos;s Build Something<br />That Works.
          </h2>
          <p style={{ fontSize:'0.97rem', lineHeight:1.75, color:N70, marginBottom:28 }}>Tell us about your project and we&apos;ll get back within 24 hours. No sales pitch — just straight talk.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <motion.a
              href="/contact"
              whileHover={{ scale:1.03, boxShadow:`0 8px 32px ${N20}` }}
              whileTap={{ scale:0.97 }}
              transition={{ type:'spring', stiffness:400, damping:22 }}
              style={{ display:'inline-flex', alignItems:'center', background:N, color:BG, borderRadius:10, padding:'14px 28px', fontFamily:'var(--font-plus-jakarta)', fontWeight:700, fontSize:'0.9rem', cursor:'pointer' }}
            >
              Start a Project
            </motion.a>
            <motion.a
              href="https://wa.me/919149681874" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.03, borderColor:N }}
              whileTap={{ scale:0.97 }}
              transition={{ type:'spring', stiffness:400, damping:22 }}
              style={{ display:'inline-flex', alignItems:'center', border:`1.5px solid ${N20}`, color:N, borderRadius:10, padding:'14px 28px', fontFamily:'var(--font-plus-jakarta)', fontWeight:600, fontSize:'0.9rem', background:'transparent', cursor:'pointer' }}
            >
              WhatsApp Us
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

    </div>
  )
}
