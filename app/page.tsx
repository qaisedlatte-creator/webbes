'use client'

import { GooeyText } from '@/components/ui/gooey-text-morphing'

// ─── Section data ─────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: '01',
    title: 'Websites',
    sub: 'Fast, custom, built to convert visitors into WhatsApp leads. No templates. No recycled designs.',
  },
  {
    num: '02',
    title: 'AI Automation',
    sub: 'Chatbots, lead capture bots, WhatsApp flows. Running 24/7 while you sleep.',
  },
  {
    num: '03',
    title: 'E-Commerce',
    sub: 'Shopify and custom stores built to sell. Product pages, payments, inventory — everything.',
  },
] as const

const PORTFOLIO = [
  {
    name: 'Pearl Imperial International',
    tag: 'B2B Corporate · UAE',
    url: 'https://pearlimperialintl.com',
  },
  {
    name: 'Dept Store',
    tag: 'E-Commerce · India',
    url: 'https://deptstore.in',
  },
  {
    name: 'Prism India',
    tag: 'Shopify · India',
    url: 'https://prismindia.co',
  },
] as const

const MORPHING_TEXTS = ['Websites', 'AI Chatbots', 'E-Commerce', 'Automations', 'Real Results']

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="bg-white">

      {/* ── SECTION 1 — HERO ─────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 pt-36 pb-16 border-b border-neutral-100">
        {/* Top label */}
        <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase">
          Kochi · Kerala · GCC
        </p>

        {/* Main headline */}
        <div className="flex-1 flex flex-col justify-center py-16">
          <h1 className="text-[clamp(56px,10vw,120px)] font-extrabold text-[#0a0a0a] leading-[0.95] tracking-tight font-jakarta max-w-4xl">
            Stop killing<br />your brand.
          </h1>
          <p className="text-neutral-400 text-[17px] max-w-[400px] leading-relaxed mt-8">
            Websites and AI automations for Kerala businesses that are done being invisible.
          </p>
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Book a Call — primary */}
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[13px] font-semibold tracking-wide px-6 py-3.5 rounded-full hover:bg-neutral-800 transition-colors duration-150"
          >
            Book a Call
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919149681874"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neutral-200 text-[#0a0a0a] text-[13px] font-semibold tracking-wide px-6 py-3.5 rounded-full hover:border-neutral-400 transition-colors duration-150"
          >
            {/* WhatsApp icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/webbes.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neutral-200 text-[#0a0a0a] text-[13px] font-semibold tracking-wide px-6 py-3.5 rounded-full hover:border-neutral-400 transition-colors duration-150"
          >
            {/* Instagram icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            DM on Instagram
          </a>
        </div>
      </section>

      {/* ── SECTION 2 — MORPHING STATEMENT ──────────────────────────────── */}
      <section className="py-32 px-6 text-center border-b border-neutral-100">
        <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-10">
          What we build
        </p>
        <div className="h-20 flex items-center justify-center mb-10">
          <GooeyText
            texts={MORPHING_TEXTS}
            morphTime={1.2}
            cooldownTime={0.4}
            textClassName="text-[#0a0a0a]"
            className="w-full max-w-2xl mx-auto"
          />
        </div>
        <p className="text-neutral-400 text-[15px] max-w-xs mx-auto leading-relaxed">
          For local businesses in Kerala and the Gulf who are done being invisible online.
        </p>
      </section>

      {/* ── SECTION 3 — SERVICES ─────────────────────────────────────────── */}
      <section className="border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="py-16 flex items-center justify-between">
            <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase">
              What we do
            </p>
          </div>

          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className={[
                'flex items-start gap-12 py-10 border-t border-neutral-100',
                'hover:bg-neutral-50 transition-colors duration-150 px-4 -mx-4 cursor-default',
                i === SERVICES.length - 1 ? 'border-b' : '',
              ].join(' ')}
            >
              <p className="text-[11px] text-neutral-300 font-mono pt-1 min-w-[24px] tabular-nums">
                {s.num}
              </p>
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <p className="text-[#0a0a0a] text-2xl md:text-3xl font-semibold tracking-tight font-jakarta">
                  {s.title}
                </p>
                <p className="text-neutral-400 text-[14px] max-w-xs leading-relaxed">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4 — LIVE WORK ────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-16">
            Live work
          </p>

          <div className="flex flex-col">
            {PORTFOLIO.map((p, i) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'group flex items-center justify-between py-7 border-t border-neutral-100',
                  'hover:pl-2 transition-all duration-200',
                  i === PORTFOLIO.length - 1 ? 'border-b' : '',
                ].join(' ')}
              >
                <div>
                  <p className="text-[#0a0a0a] text-xl md:text-2xl font-medium group-hover:text-neutral-600 transition-colors duration-150 font-jakarta">
                    {p.name}
                  </p>
                  <p className="text-neutral-400 text-xs mt-1">{p.tag}</p>
                </div>
                <span className="text-neutral-200 group-hover:text-neutral-600 transition-colors duration-150 text-xl">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-32 px-6 text-center">
        <p className="text-[11px] tracking-[0.25em] text-neutral-600 uppercase mb-8">
          Ready?
        </p>
        <h2 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-12 leading-tight font-jakarta">
          Let&apos;s fix your<br />online presence.
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] text-[13px] font-semibold tracking-wide px-7 py-3.5 rounded-full hover:bg-neutral-100 transition-colors duration-150"
          >
            Book a Call
          </a>
          <a
            href="https://wa.me/919149681874"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neutral-700 text-white text-[13px] font-semibold tracking-wide px-7 py-3.5 rounded-full hover:border-neutral-400 transition-colors duration-150"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </section>

    </main>
  )
}
