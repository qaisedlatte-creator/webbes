'use client'

import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { LiquidButton, MetalButton } from '@/components/ui/liquid-glass-button'
import { HoverButton } from '@/components/ui/hover-button'
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
      <section className="bg-white overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-5">
                Kochi · Kerala · GCC
              </p>
              <h1 className="text-[clamp(52px,9vw,108px)] font-extrabold text-[#0a0a0a] leading-[1.0] tracking-tight mb-6 font-jakarta">
                Stop killing<br />your brand.
              </h1>
              <p className="text-neutral-500 text-[17px] max-w-[420px] mx-auto leading-relaxed">
                Websites and AI automations for Kerala businesses that are done being invisible.
              </p>
            </>
          }
        >
          {/* ── Dark card ── */}
          <div className="h-full w-full bg-[#0d0d0d] rounded-2xl p-7 md:p-10 flex flex-col justify-between overflow-hidden">

            {/* Top label */}
            <p className="text-[11px] tracking-[0.2em] text-[#444] uppercase font-medium">What we do for your business</p>

            {/* Main bold points */}
            <div className="flex flex-col gap-5 my-auto py-6">
              <div className="flex items-start gap-4">
                <span className="text-white text-2xl md:text-3xl font-bold leading-none mt-0.5">01</span>
                <div>
                  <p className="text-white text-xl md:text-2xl font-bold leading-tight">We build your website</p>
                  <p className="text-[#555] text-[13px] mt-1">Fast, professional, looks great on mobile and desktop.</p>
                </div>
              </div>
              <div className="w-full h-px bg-[#1a1a1a]" />
              <div className="flex items-start gap-4">
                <span className="text-white text-2xl md:text-3xl font-bold leading-none mt-0.5">02</span>
                <div>
                  <p className="text-white text-xl md:text-2xl font-bold leading-tight">Customers find you on Google</p>
                  <p className="text-[#555] text-[13px] mt-1">We set it up so people searching for your service see you first.</p>
                </div>
              </div>
              <div className="w-full h-px bg-[#1a1a1a]" />
              <div className="flex items-start gap-4">
                <span className="text-white text-2xl md:text-3xl font-bold leading-none mt-0.5">03</span>
                <div>
                  <p className="text-white text-xl md:text-2xl font-bold leading-tight">AI replies to enquiries for you</p>
                  <p className="text-[#555] text-[13px] mt-1">WhatsApp bot answers questions 24/7 — even at night and on holidays.</p>
                </div>
              </div>
            </div>

            {/* Bottom label */}
            <p className="text-[11px] text-[#333]">Webbes · Kochi, Kerala · webbes.in</p>
          </div>
        </ContainerScroll>

        {/* CTAs below the scroll card */}
        <div className="flex gap-3 justify-center mt-8 pb-24 flex-wrap px-4">
          <LiquidButton onClick={() => { window.location.href = '/contact' }}>
            Start a Project
          </LiquidButton>
          <HoverButton onClick={() => { window.location.href = '/team' }}>
            See Our Work
          </HoverButton>
          <a
            href="tel:+919149681874"
            className="inline-flex items-center gap-2 border border-neutral-200 text-[#0a0a0a] text-[13px] font-semibold tracking-wide px-6 py-3 rounded-full hover:border-neutral-400 hover:bg-neutral-50 transition-colors duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5 19.79 19.79 0 01.22 5 2 2 0 012.18 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006 6l1.27-.51a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Call Us
          </a>
          <a
            href="https://wa.me/919149681874"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neutral-200 text-[#0a0a0a] text-[13px] font-semibold tracking-wide px-6 py-3 rounded-full hover:border-neutral-400 hover:bg-neutral-50 transition-colors duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ── SECTION 2 — MORPHING STATEMENT ──────────────────────────────── */}
      <section className="py-32 px-6 text-center border-t border-neutral-100">
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
      <section className="border-t border-neutral-100">
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
      <section className="border-t border-neutral-100 py-24 px-6">
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
        <p className="text-[11px] tracking-[0.25em] text-neutral-600 uppercase mb-8 font-medium">
          Ready to grow?
        </p>
        <h2 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight font-jakarta">
          Let&apos;s build something<br />worth noticing.
        </h2>
        <p className="text-neutral-500 text-[15px] max-w-sm mx-auto leading-relaxed mb-12">
          A 20-minute call is all it takes to figure out if we&apos;re the right fit for you.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] text-[13px] font-bold tracking-wide px-7 py-3.5 rounded-full hover:bg-neutral-100 transition-colors duration-150"
          >
            Start a Project
          </a>
          <a
            href="tel:+919149681874"
            className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-400 text-[13px] font-semibold tracking-wide px-6 py-3.5 rounded-full hover:border-neutral-600 hover:text-white transition-colors duration-150"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5 19.79 19.79 0 01.22 5 2 2 0 012.18 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006 6l1.27-.51a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Call Us
          </a>
          <a
            href="https://wa.me/919149681874"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-400 text-[13px] font-semibold tracking-wide px-6 py-3.5 rounded-full hover:border-neutral-600 hover:text-white transition-colors duration-150"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </section>

    </main>
  )
}
