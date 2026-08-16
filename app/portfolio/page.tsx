import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Website Portfolio — Webbes',
  description: 'A few of the websites Webbes has built — e-commerce, hospitality, and B2B, live across India and the GCC.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.webbes.in/portfolio' },
}

const SITES = [
  { name: 'Prism India', url: 'https://prismindia.co', img: '/prism-india.png', industry: 'Activewear e-commerce' },
  { name: 'Al Hilal Print', url: 'https://alhilalprint.com', img: '/al-hilal-og.jpg', industry: 'Print & branding, UAE' },
  { name: 'Pearl Imperial International', url: 'https://pearlimperialintl.com', img: '/pearl-imperial.png', industry: 'B2B trade, Dubai' },
  { name: 'Hotel Grand Blue Star', url: 'https://hotelgrandbluestar.com', img: '/grand-blue-star-og.jpg', industry: 'Luxury hospitality' },
  { name: 'Hearthy India', url: 'https://hearthy.in', img: '/hearthy-og.jpg', industry: 'D2C health foods' },
] as const

export default function PortfolioPage() {
  return (
    <section style={{ background: '#0a0a0a', padding: 'clamp(130px,15vw,180px) clamp(20px,5vw,64px) clamp(80px,10vw,120px)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
          Websites
        </p>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 16 }}>
          A few sites we&apos;ve built.
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.4)', maxWidth: 480, marginBottom: 48, lineHeight: 1.7 }}>
          Full websites and e-commerce stores — owner-built, no outsourcing. Want the full story behind each one?{' '}
          <Link href="/work" style={{ color: '#fff', textDecoration: 'underline' }}>See the case studies →</Link>
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SITES.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl overflow-hidden border transition-all hover:-translate-y-1"
              style={{ borderColor: 'rgba(255,255,255,0.09)', background: '#111' }}
            >
              <div className="relative h-40 overflow-hidden flex items-center justify-center p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.name} className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{s.name}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.industry}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-12 flex gap-3 flex-wrap">
          <Link href="/ai-automation" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full" style={{ fontFamily: "'Syne', sans-serif", background: '#fff', color: '#0a0a0a' }}>
            Need automation, not just a site? →
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full" style={{ fontFamily: "'Syne', sans-serif", border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff' }}>
            Start a project
          </Link>
        </div>
      </div>
    </section>
  )
}
