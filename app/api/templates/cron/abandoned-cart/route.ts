import { NextRequest, NextResponse } from 'next/server'
import { getDraftsDueForReminder, markReminderSent } from '@/lib/templates/invites'
import { sendAbandonedCartReminder, isWhatsAppConfigured } from '@/lib/templates/whatsapp'
import { getVariant } from '@/lib/templates/posterVariants'
import { RELIGIONS } from '@/lib/templates/religion-themes'

export const maxDuration = 60

const REMINDER_MIN_AGE_HOURS = 2
const SITE_ORIGIN = 'https://www.webbes.in'

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return req.headers.get('authorization') === `Bearer ${secret}`
}

// Called every ~30 min by an external scheduler (GitHub Actions) — see
// .github/workflows/abandoned-cart-cron.yml. Vercel's own Cron Jobs are
// limited to once/day on the Hobby plan, too coarse for a 2-3h window.
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const due = await getDraftsDueForReminder(REMINDER_MIN_AGE_HOURS)
  const configured = isWhatsAppConfigured()

  let sent = 0
  const results: Array<{ id: string; ok: boolean; error?: string }> = []

  for (const invite of due) {
    if (!configured || !invite.whatsapp) continue

    const previewUrl = `${SITE_ORIGIN}/templates/preview/${invite.id}`
    const variant = getVariant(invite.templateId)
    const religionLabel = RELIGIONS.find((r) => r.id === invite.religion)?.label ?? invite.religion
    const styleLabel = variant ? `${religionLabel} ${variant.label}` : religionLabel

    const result = await sendAbandonedCartReminder({ toWhatsapp: invite.whatsapp, templateStyleLabel: styleLabel, previewUrl })
    results.push({ id: invite.id, ok: result.ok, error: result.error })
    if (result.ok) {
      await markReminderSent(invite.id)
      sent++
    } else {
      console.error('[templates/cron/abandoned-cart] send failed', invite.id, result.error)
    }
  }

  return NextResponse.json({ due: due.length, sent, whatsappConfigured: configured, results })
}
