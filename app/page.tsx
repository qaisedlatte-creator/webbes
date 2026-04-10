'use client'

// ─── SVG icons ────────────────────────────────────────────────────────────────

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────

const WEB_FEATURES = [
  { title: 'Custom design, zero templates', desc: 'Every pixel built for your brand. Not a Wix clone, not a theme edit — something your competitors don\'t have.' },
  { title: 'Mobile-first, always', desc: 'Over 70% of Kerala\'s web traffic is on mobile. Your site loads fast on 4G, looks sharp on every screen.' },
  { title: 'WhatsApp lead button built in', desc: 'Every page has a direct WhatsApp CTA. Visitors become enquiries in one tap — no forms to fill.' },
  { title: 'Local SEO ready', desc: 'Structured so Google finds you for "[your city] [your service]" searches from day one.' },
  { title: 'Delivered in 10–14 days', desc: 'No month-long delays. You get updates at every stage and a live site within two weeks.' },
]

const AI_FEATURES = [
  { title: 'WhatsApp chatbot — 24/7 replies', desc: 'Your bot answers FAQs, collects the customer\'s name, number and requirement, then pings you instantly. Never miss an enquiry at 2 am.' },
  { title: 'Instagram DM auto-responder', desc: 'Replies to DMs and comment enquiries automatically. Captures leads before they forget they messaged you.' },
  { title: 'Lead follow-up flows', desc: 'Someone enquires but you\'re busy. The bot follows up after 1 hour, then 24 hours — so leads don\'t go cold.' },
  { title: 'Appointment & booking automation', desc: 'Clients pick a time from a link. It lands in your calendar. Zero back-and-forth WhatsApp threads.' },
  { title: 'No tech skills needed from you', desc: 'We build it, test it, and hand it over trained. You run your business; the automation handles the repetitive work.' },
]

const STEPS = [
  { n: '01', title: 'Book a call', desc: '30 minutes. We learn your business, your problems, and exactly what you need. No pitch, no pressure.' },
  { n: '02', title: 'We design & build', desc: 'You get progress updates. Designs for approval before development. No surprises at the end.' },
  { n: '03', title: 'Launch & hand over', desc: 'We go live, train you on how to use everything, and make sure it actually works for your customers.' },
  { n: '04', title: 'We stick around', desc: 'Ongoing support available. Updates, changes, new automations — we\'re a message away, not a ticket queue.' },
]

const PORTFOLIO = [
  { name: 'Pearl Imperial International', tag: 'B2B Corporate · UAE', url: 'https://pearlimperialintl.com' },
  { name: 'Dept Store', tag: 'E-Commerce · India', url: 'https://deptstore.in' },
  { name: 'Prism India', tag: 'Shopify · India', url: 'https://prismindia.co' },
] as const

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#070d1a] min-h-screen flex flex-col justify-between px-6 md:px-12 pt-36 pb-16">
        <p className="text-[11px] tracking-[0.25em] text-[#4a5568] uppercase">
          Kochi · Kerala · GCC
        </p>

        <div className="flex-1 flex flex-col justify-center py-16">
          <div className="inline-flex items-center gap-2 bg-[#f97316]/10 border border-[#f97316]/20 rounded-full px-4 py-1.5 mb-8 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
            <span className="text-[#f97316] text-[11px] tracking-widest uppercase font-medium">Websites + AI Automation</span>
          </div>

          <h1 className="text-[clamp(48px,9vw,110px)] font-extrabold text-white leading-[0.95] tracking-tight font-jakarta max-w-4xl">
            Your business,<br />
            <span className="text-[#f97316]">actually</span> online.
          </h1>

          <p className="text-[#8892a4] text-[17px] max-w-[480px] leading-relaxed mt-8">
            We build websites that convert visitors into leads, and AI automations that
            follow up while you sleep. Based in Kochi, serving Kerala and the Gulf.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#f97316] text-white text-[13px] font-bold tracking-wide px-7 py-3.5 rounded-full hover:bg-[#ea6c0a] transition-colors duration-150"
          >
            Book a Call
          </a>
          <a
            href="https://wa.me/919149681874"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#1e2d40] text-[#8892a4] text-[13px] font-semibold tracking-wide px-6 py-3.5 rounded-full hover:border-[#f97316] hover:text-white transition-colors duration-150"
          >
            <WaIcon />
            Chat on WhatsApp
          </a>
          <a
            href="https://instagram.com/webbes.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#1e2d40] text-[#8892a4] text-[13px] font-semibold tracking-wide px-6 py-3.5 rounded-full hover:border-[#f97316] hover:text-white transition-colors duration-150"
          >
            <IgIcon />
            DM on Instagram
          </a>
        </div>
      </section>

      {/* ── WHAT WE DO — intro ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-neutral-100 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-6">Two services. One team.</p>
          <p className="text-[#0a0a0a] text-3xl md:text-4xl font-bold font-jakarta leading-snug max-w-3xl">
            Most agencies do one or the other. We do both — and wire them together so your website feeds your automation and your automation feeds your sales.
          </p>
        </div>
      </section>

      {/* ── WEBSITES ─────────────────────────────────────────────────────── */}
      <section className="bg-[#f9f7f4] border-b border-neutral-200 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-[#f97316] text-[11px] tracking-[0.25em] uppercase font-semibold">Service 01</span>
              <h2 className="text-[#0a0a0a] text-4xl md:text-5xl font-extrabold tracking-tight font-jakarta mt-2">
                Websites
              </h2>
            </div>
            <p className="text-neutral-500 text-[15px] max-w-sm leading-relaxed">
              Custom-built sites that turn visitors into WhatsApp enquiries.
              No page builders. No recycled templates.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid md:grid-cols-2 gap-px bg-neutral-200">
            {WEB_FEATURES.map((f) => (
              <div key={f.title} className="bg-[#f9f7f4] p-8">
                <div className="w-1 h-5 bg-[#f97316] rounded-full mb-4" />
                <p className="text-[#0a0a0a] font-semibold text-[15px] mb-2">{f.title}</p>
                <p className="text-neutral-500 text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Who it's for */}
          <div className="mt-10 bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <p className="text-[11px] tracking-widest text-neutral-400 uppercase mb-2">Who it&apos;s for</p>
              <p className="text-[#0a0a0a] font-bold text-lg font-jakarta">Kerala businesses who look invisible online</p>
            </div>
            <div className="md:w-2/3 text-neutral-500 text-[14px] leading-relaxed">
              Restaurants, clinics, salons, law firms, real estate agencies, logistics companies, retailers — any business where customers Google you before they call.
              If your current site looks like it was made in 2012, or you&apos;re running on a WhatsApp profile photo, we fix that.
            </div>
          </div>
        </div>
      </section>

      {/* ── AI AUTOMATION ────────────────────────────────────────────────── */}
      <section className="bg-[#070d1a] border-b border-[#111c2d] py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-[#f97316] text-[11px] tracking-[0.25em] uppercase font-semibold">Service 02</span>
              <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight font-jakarta mt-2">
                AI Automation
              </h2>
            </div>
            <p className="text-[#8892a4] text-[15px] max-w-sm leading-relaxed">
              WhatsApp bots, lead capture, follow-ups, and booking flows — running 24/7 so you don&apos;t have to.
            </p>
          </div>

          {/* Feature list */}
          <div className="flex flex-col divide-y divide-[#111c2d]">
            {AI_FEATURES.map((f, i) => (
              <div key={f.title} className="py-7 flex items-start gap-6">
                <span className="text-[#f97316]/50 text-[11px] font-mono tabular-nums pt-0.5 min-w-[24px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <p className="text-white font-semibold text-[16px]">{f.title}</p>
                  <p className="text-[#8892a4] text-[14px] leading-relaxed md:max-w-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reality check */}
          <div className="mt-10 bg-[#0d1525] border border-[#1e2d40] rounded-2xl p-8">
            <p className="text-[11px] tracking-widest text-[#4a5568] uppercase mb-3">The real reason businesses need this</p>
            <p className="text-white text-[17px] leading-relaxed font-jakarta font-medium max-w-2xl">
              A customer messages you at 9 pm on a Friday. You see it Monday. They&apos;ve already gone to a competitor.
              Automation closes that gap — every time, automatically.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-neutral-100 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-16">How it works</p>

          <div className="grid md:grid-cols-4 gap-px bg-neutral-100">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-white p-8">
                <p className="text-[#f97316] text-[11px] font-mono mb-6">{s.n}</p>
                <p className="text-[#0a0a0a] font-semibold text-[16px] mb-3 font-jakarta">{s.title}</p>
                <p className="text-neutral-400 text-[13px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE WORK ────────────────────────────────────────────────────── */}
      <section className="bg-[#f9f7f4] border-b border-neutral-200 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-16">Live work</p>

          <div className="flex flex-col">
            {PORTFOLIO.map((p, i) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'group flex items-center justify-between py-7 border-t border-neutral-200',
                  'hover:pl-2 transition-all duration-200',
                  i === PORTFOLIO.length - 1 ? 'border-b' : '',
                ].join(' ')}
              >
                <div>
                  <p className="text-[#0a0a0a] text-xl md:text-2xl font-medium group-hover:text-[#f97316] transition-colors duration-150 font-jakarta">
                    {p.name}
                  </p>
                  <p className="text-neutral-400 text-xs mt-1">{p.tag}</p>
                </div>
                <span className="text-neutral-300 group-hover:text-[#f97316] transition-colors duration-150 text-xl">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#070d1a] py-32 px-6 text-center">
        <p className="text-[11px] tracking-[0.25em] text-[#4a5568] uppercase mb-8">Ready to start?</p>
        <h2 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight font-jakarta">
          Let&apos;s build something<br />that actually works.
        </h2>
        <p className="text-[#8892a4] text-[16px] max-w-md mx-auto leading-relaxed mb-12">
          Book a free 30-minute call. We&apos;ll tell you exactly what your business needs and what it&apos;ll cost. No fluff.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#f97316] text-white text-[13px] font-bold tracking-wide px-8 py-4 rounded-full hover:bg-[#ea6c0a] transition-colors duration-150"
          >
            Book a Free Call
          </a>
          <a
            href="https://wa.me/919149681874"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#1e2d40] text-[#8892a4] text-[13px] font-semibold tracking-wide px-7 py-4 rounded-full hover:border-[#f97316] hover:text-white transition-colors duration-150"
          >
            <WaIcon />
            WhatsApp Us
          </a>
          <a
            href="https://instagram.com/webbes.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#1e2d40] text-[#8892a4] text-[13px] font-semibold tracking-wide px-7 py-4 rounded-full hover:border-[#f97316] hover:text-white transition-colors duration-150"
          >
            <IgIcon />
            DM on Instagram
          </a>
        </div>
      </section>

    </main>
  )
}
