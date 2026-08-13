import type { InviteRecord } from '@/lib/templates/types'
import { styleLabel } from '@/lib/templates/display'
import { normalizeToE164, reminderMessageText } from '@/lib/templates/whatsapp'

const SITE_ORIGIN = 'https://www.webbes.in'
const REMINDER_MIN_AGE_HOURS = 2

function formatRelative(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function AbandonedCartsTable({ drafts, whatsappConfigured }: { drafts: InviteRecord[]; whatsappConfigured: boolean }) {
  return (
    <div>
      <p className="text-sm text-black/45 mb-2">
        {drafts.length} draft{drafts.length === 1 ? '' : 's'} with a WhatsApp number, never paid.
      </p>
      <p className="text-xs mb-6" style={{ color: whatsappConfigured ? '#166534' : '#92400E' }}>
        {whatsappConfigured
          ? 'Automated reminders are live — sent once per draft, ~2h+ after their last edit.'
          : 'Automated WhatsApp sending isn’t configured yet — use the "Message on WhatsApp" button below for manual follow-up.'}
      </p>

      {drafts.length === 0 ? (
        <p className="text-sm text-black/40 text-center py-16 bg-white rounded-xl border border-black/8">No abandoned drafts right now.</p>
      ) : (
        <div className="bg-white rounded-xl border border-black/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/8 text-left text-xs text-black/40 uppercase tracking-wide">
                  <th className="px-5 py-3 font-semibold">WhatsApp</th>
                  <th className="px-5 py-3 font-semibold">Style</th>
                  <th className="px-5 py-3 font-semibold">Couple / details</th>
                  <th className="px-5 py-3 font-semibold">Last activity</th>
                  <th className="px-5 py-3 font-semibold">Reminder</th>
                  <th className="px-5 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {drafts.map((invite) => {
                  const previewUrl = `${SITE_ORIGIN}/templates/preview/${invite.id}`
                  const label = styleLabel(invite.religion, invite.templateId)
                  const waNumber = invite.whatsapp ? normalizeToE164(invite.whatsapp) : null
                  const message = reminderMessageText(label, previewUrl)
                  const waLink = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}` : null

                  const hoursSinceUpdate = (Date.now() - new Date(invite.updatedAt).getTime()) / 3_600_000
                  const reminderStatus = invite.reminderSentAt
                    ? { text: `Sent ${formatRelative(invite.reminderSentAt)}`, color: '#166534', bg: '#DCFCE7' }
                    : hoursSinceUpdate >= REMINDER_MIN_AGE_HOURS
                      ? { text: 'Due now', color: '#92400E', bg: '#FEF3C7' }
                      : { text: 'Not due yet', color: '#475569', bg: '#F1F5F9' }

                  const startedDiffers = Math.abs(new Date(invite.createdAt).getTime() - new Date(invite.updatedAt).getTime()) > 60_000

                  return (
                    <tr key={invite.id} className="border-b border-black/5 last:border-b-0 align-top">
                      <td className="px-5 py-4 font-medium text-black whitespace-nowrap">{invite.whatsapp}</td>
                      <td className="px-5 py-4 text-black/70 whitespace-nowrap">{label}</td>
                      <td className="px-5 py-4 text-black/70">
                        <p className="font-medium text-black">
                          {invite.data.brideName || '—'} &amp; {invite.data.groomName || '—'}
                        </p>
                        <p className="text-xs text-black/40 mt-0.5">
                          {invite.data.date || 'No date'} · {invite.data.venue || 'No venue'}
                          {invite.data.venueCity ? `, ${invite.data.venueCity}` : ''}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-black/70 whitespace-nowrap">
                        <p>{formatRelative(invite.updatedAt)}</p>
                        {startedDiffers && <p className="text-xs text-black/35 mt-0.5">Started {formatRelative(invite.createdAt)}</p>}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: reminderStatus.bg, color: reminderStatus.color }}
                        >
                          {reminderStatus.text}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1.5 items-start">
                          {waLink && (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                              style={{ background: '#25D366' }}
                            >
                              Message on WhatsApp
                            </a>
                          )}
                          <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-black/40 hover:text-black underline">
                            View draft
                          </a>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
