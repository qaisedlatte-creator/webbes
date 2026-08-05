import type { Metadata } from 'next'
import { getInviteByDashboardToken } from '@/lib/templates/invites'

export const metadata: Metadata = { title: 'RSVP Dashboard — Webbes', robots: { index: false, follow: false } }

export default async function RsvpDashboardPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const result = await getInviteByDashboardToken(token)

  if (!result) {
    return (
      <div className="max-w-lg mx-auto px-6 py-32 text-center">
        <p className="text-lg font-semibold text-black/70">Dashboard not found.</p>
        <p className="text-sm text-black/40 mt-2">Check the link your invite gave you after payment.</p>
      </div>
    )
  }

  const { invite, responses } = result
  const attendingCount = responses.filter((r) => r.attending).length
  const totalGuests = responses.filter((r) => r.attending).reduce((sum, r) => sum + r.guestCount, 0)
  const declinedCount = responses.length - attendingCount

  return (
    <div className="min-h-screen" style={{ background: '#f7f5f0' }}>
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold mb-2">RSVP Dashboard</p>
        <h1 style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl md:text-3xl font-bold text-black mb-8">
          {invite.data.brideName} &amp; {invite.data.groomName}
        </h1>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 border border-black/8 text-center">
            <p className="text-2xl font-bold text-black">{attendingCount}</p>
            <p className="text-xs text-black/45 mt-1">Accepted</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-black/8 text-center">
            <p className="text-2xl font-bold text-black">{totalGuests}</p>
            <p className="text-xs text-black/45 mt-1">Total guests</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-black/8 text-center">
            <p className="text-2xl font-bold text-black">{declinedCount}</p>
            <p className="text-xs text-black/45 mt-1">Declined</p>
          </div>
        </div>

        {responses.length === 0 ? (
          <p className="text-sm text-black/40 text-center py-12">No RSVPs yet — they'll show up here as guests respond.</p>
        ) : (
          <div className="bg-white rounded-xl border border-black/8 overflow-hidden">
            {responses.map((r, i) => (
              <div key={r.id} className={`px-5 py-4 flex items-start justify-between gap-4 ${i > 0 ? 'border-t border-black/5' : ''}`}>
                <div>
                  <p className="font-medium text-black text-sm">{r.guestName}</p>
                  {r.message && <p className="text-xs text-black/45 mt-1 italic">"{r.message}"</p>}
                  <p className="text-[11px] text-black/30 mt-1">{new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={r.attending ? { background: '#DCFCE7', color: '#166534' } : { background: '#FEE2E2', color: '#991B1B' }}
                  >
                    {r.attending ? `Joining · ${r.guestCount}` : 'Not joining'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
