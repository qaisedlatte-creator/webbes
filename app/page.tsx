'use client'

import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { GooeyText } from '@/components/ui/gooey-text-morphing'
import { HoverButton } from '@/components/ui/hover-button'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { MetalButton } from '@/components/ui/liquid-glass-button'
import { BeforeAfterSlider } from '@/components/ui/before-after-slider'

const SERVICES = [
  {
    num: '01',
    title: 'Websites',
    sub: 'Fast, custom, built to convert visitors into WhatsApp leads. No templates.',
  },
  {
    num: '02',
    title: 'AI Automation',
    sub: 'Chatbots, lead capture bots, WhatsApp flows. Running 24/7 while you sleep.',
  },
  {
    num: '03',
    title: 'E-Commerce',
    sub: 'Shopify and custom stores built to sell. Product pages, payments, inventory.',
  },
]

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
]

export default function HomePage() {
  return (
    <div className="bg-white text-[#0a0a0a] overflow-x-hidden">

      {/* ── SECTION 1: HERO ──────────────────────────────────────────────── */}
      <section className="bg-white">
        <ContainerScroll
          titleComponent={
            <>
              <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-5">
                Kochi · Kerala · GCC
              </p>
              <h1 className="text-[clamp(52px,9vw,108px)] font-extrabold text-[#0a0a0a] leading-[1.0] tracking-tight mb-6">
                Stop killing<br />your brand.
              </h1>
              <p className="text-neutral-400 text-[17px] max-w-[420px] mx-auto leading-relaxed">
                Websites and AI automations for Kerala businesses
                that are done being invisible.
              </p>
            </>
          }
        >
          {/* Dark card inside ContainerScroll */}
          <div className="h-full w-full bg-[#0d0d0d] rounded-2xl p-6 md:p-8 flex flex-col gap-5 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <div className="flex-1 h-5 bg-[#1a1a1a] rounded-md ml-3 flex items-center px-3">
                <span className="text-[10px] text-[#444] font-mono">webbes.in</span>
              </div>
            </div>

            {/* Before / After columns */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-[#444] tracking-[0.15em] uppercase">Before</span>
                <div className="bg-[#111] rounded-xl p-4 flex flex-col gap-3 h-full">
                  <div className="h-1.5 bg-[#1e1e1e] rounded w-3/5" />
                  <div className="h-1.5 bg-[#181818] rounded w-full" />
                  <div className="h-1.5 bg-[#181818] rounded w-4/5" />
                  <div className="h-1.5 bg-[#181818] rounded w-2/3" />
                  <div className="mt-auto h-7 bg-[#1a1a1a] rounded-lg w-2/5" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-[#2d5a2d] tracking-[0.15em] uppercase">After Webbes</span>
                <div className="bg-[#0a120a] border border-[#1a2e1a] rounded-xl p-4 flex flex-col gap-3 h-full">
                  <div className="h-1.5 bg-[#1a3a1a] rounded w-3/5" />
                  <div className="h-1.5 bg-[#162816] rounded w-full" />
                  <div className="h-1.5 bg-[#162816] rounded w-4/5" />
                  <div className="h-1.5 bg-[#162816] rounded w-2/3" />
                  <div className="mt-auto h-7 bg-[#1e3e1e] rounded-lg w-2/5" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#161616] flex items-center justify-between">
              <p className="text-[10px] text-[#333]">Web design · AI automation · Kochi</p>
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a2d]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a2d] opacity-50" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a2d] opacity-20" />
              </div>
            </div>
          </div>
        </ContainerScroll>

        {/* CTA buttons below the scroll card */}
        <div className="flex gap-4 justify-center pb-20 px-6">
          <LiquidButton onClick={() => { window.location.href = '/contact' }}>
            Start a Project
          </LiquidButton>
          <HoverButton onClick={() => { window.location.href = '/team' }}>
            See Our Work
          </HoverButton>
        </div>
      </section>

      {/* ── SECTION 2: MORPHING STATEMENT ─────────────────────────────────── */}
      <section className="py-32 px-6 text-center border-t border-neutral-100 bg-white">
        <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-10">
          What we build
        </p>
        <div className="h-20 flex items-center justify-center mb-10">
          <GooeyText
            texts={['Websites', 'AI Chatbots', 'E-Commerce', 'Automations', 'Real Results']}
            morphTime={1.2}
            cooldownTime={0.4}
            textClassName="text-[#0a0a0a] font-extrabold"
            className="w-full"
          />
        </div>
        <p className="text-neutral-400 text-[15px] max-w-xs mx-auto leading-relaxed">
          For local businesses in Kerala and the Gulf who are done being invisible online.
        </p>
      </section>

      {/* ── SECTION 3: BEFORE / AFTER CASE STUDY ─────────────────────────── */}
      <section className="border-t border-neutral-100 py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-4">
              Real work · Kerala real estate
            </p>
            <h2 className="text-[#0a0a0a] text-3xl md:text-4xl font-bold tracking-tight mb-3">
              This is what we fix.
            </h2>
            <p className="text-neutral-400 text-[15px] max-w-lg leading-relaxed">
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

          <p className="text-[11px] text-neutral-300">
            * Demo build for a Kozhikode real estate client. Live deployment pending sign-off.
          </p>
        </div>
      </section>

      {/* ── SECTION 4: SERVICES ───────────────────────────────────────────── */}
      <section className="border-t border-neutral-100 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="py-16">
            <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase">
              What we do
            </p>
          </div>
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className={[
                'flex items-start gap-12 py-10 border-t border-neutral-100',
                'hover:bg-neutral-50 transition-colors px-4 -mx-4 cursor-default',
                i === SERVICES.length - 1 ? 'border-b' : '',
              ].join(' ')}
            >
              <p className="text-[11px] text-neutral-300 font-mono pt-1 min-w-[24px]">{s.num}</p>
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <p className="text-[#0a0a0a] text-2xl md:text-3xl font-semibold tracking-tight">
                  {s.title}
                </p>
                <p className="text-neutral-400 text-[14px] max-w-xs leading-relaxed">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: LIVE PORTFOLIO ─────────────────────────────────────── */}
      <section className="border-t border-neutral-100 py-24 px-6 bg-white">
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
                  <p className="text-[#0a0a0a] text-xl md:text-2xl font-medium group-hover:text-neutral-500 transition-colors">
                    {p.name}
                  </p>
                  <p className="text-neutral-400 text-xs mt-1">{p.tag}</p>
                </div>
                <span className="text-neutral-200 group-hover:text-neutral-600 transition-colors text-xl">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FINAL CTA ──────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-32 px-6 text-center">
        <p className="text-[11px] tracking-[0.25em] text-neutral-600 uppercase mb-8">
          Ready?
        </p>
        <h2 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-12 leading-tight">
          Let&apos;s fix your<br />online presence.
        </h2>
        <MetalButton
          variant="primary"
          onClick={() => { window.location.href = '/contact' }}
        >
          Talk to Webbes
        </MetalButton>
      </section>

    </div>
  )
}
