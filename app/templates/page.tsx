import Link from 'next/link'
import type { Metadata } from 'next'
import { RELIGIONS, RELIGION_PRESETS } from '@/lib/templates/religion-themes'

export const metadata: Metadata = {
  title: 'Wedding Invitation Website Builder — Webbes',
  description:
    'Build your own animated wedding invitation website in minutes. Pick your religion, add your names, date and venue, and get a shareable link.',
  robots: { index: true, follow: true },
}

export default function TemplatesGalleryPage() {
  return (
    <div style={{ fontFamily: 'var(--invite-label)', background: '#F7F2E8', minHeight: '100vh', color: '#2A2320' }}>
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="tracking-[0.32em] text-xs uppercase mb-5" style={{ color: '#8B6F1E', fontWeight: 300 }}>
          Webbes Invitations
        </p>
        <h1 style={{ fontFamily: 'var(--invite-heading)', fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', color: '#3D2A1A', lineHeight: 1.1 }}>
          A beautiful wedding invitation website, ready in minutes
        </h1>
        <p className="mt-6 mx-auto max-w-xl" style={{ fontFamily: 'var(--invite-serif)', fontSize: '1.1rem', color: 'rgba(42,35,32,0.7)' }}>
          Envelope reveal, countdown, your photo, your venue — customize it live and share a link
          your guests will love. Islamic, Christian, and Hindu styles available.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {RELIGIONS.map((r) => {
            const preset = RELIGION_PRESETS[r.id][0]
            return (
              <Link
                key={r.id}
                href={`/templates/build/template-01?religion=${r.id}`}
                className="group block rounded-2xl overflow-hidden border transition-transform hover:-translate-y-1"
                style={{ borderColor: 'rgba(139,111,30,0.2)', background: preset.cardBg }}
              >
                <div
                  className="h-28 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${preset.accent}, ${preset.accentDeep})` }}
                >
                  <span style={{ fontFamily: 'var(--invite-script)', fontSize: '2rem', color: preset.goldBright }}>A &amp; B</span>
                </div>
                <div className="p-5 text-left">
                  <p className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: preset.label, fontWeight: 500 }}>{r.label}</p>
                  <p style={{ fontFamily: 'var(--invite-heading)', fontSize: '1.2rem', color: preset.ink }}>Template One</p>
                </div>
              </Link>
            )
          })}
        </div>

        <Link
          href="/templates/build/template-01"
          className="inline-flex items-center gap-2 mt-14 px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
          style={{ background: '#8B1A1A' }}
        >
          Start building your invite
        </Link>
      </div>
    </div>
  )
}
