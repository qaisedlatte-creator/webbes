import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthed } from '@/lib/templates/admin-auth'
import {
  getAbandonedDrafts,
  getAddonStats,
  getBestSellers,
  getFunnelStats,
  getRevenueStats,
  type AddonStats,
  type BestSeller,
  type FunnelStats,
  type RevenueStats,
} from '@/lib/templates/invites'

const RANGE_DAYS: Record<string, number> = { '1d': 1, '7d': 7, '30d': 30, '90d': 90, '1y': 365 }

function resolveRange(searchParams: URLSearchParams): { from: Date; to: Date; key: string } | null {
  const key = searchParams.get('range') || '7d'

  if (key === 'custom') {
    const fromRaw = searchParams.get('from')
    const toRaw = searchParams.get('to')
    if (!fromRaw || !toRaw) return null
    const from = new Date(fromRaw)
    const to = new Date(toRaw)
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return null
    // Make the "to" date inclusive of its full day when it arrives as a bare yyyy-mm-dd.
    if (!toRaw.includes('T')) to.setHours(23, 59, 59, 999)
    return { from, to, key }
  }

  const days = RANGE_DAYS[key]
  if (!days) return null
  const to = new Date()
  const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000)
  return { from, to, key }
}

function buildRecommendations(input: {
  revenue: RevenueStats
  funnel: FunnelStats
  bestSellers: BestSeller[]
  addons: AddonStats
  abandonedCount: number
}): string[] {
  const { revenue, funnel, bestSellers, addons, abandonedCount } = input
  const tips: string[] = []

  if (funnel.started === 0) {
    tips.push('No new drafts started in this period — traffic to /templates is the bottleneck right now, not the funnel itself.')
    return tips
  }

  const captureRate = funnel.addedWhatsapp / funnel.started
  const conversionFromWhatsapp = funnel.addedWhatsapp ? funnel.paid / funnel.addedWhatsapp : 0
  const overallConversion = funnel.paid / funnel.started

  if (captureRate < 0.5) {
    tips.push(
      `Only ${Math.round(captureRate * 100)}% of people who start a draft enter a WhatsApp number — that's the biggest leak. Consider nudging with a reason ("so we can save your draft") rather than just a bare field.`
    )
  }

  if (funnel.addedWhatsapp > 0 && conversionFromWhatsapp < 0.3) {
    tips.push(
      `Of the ${funnel.addedWhatsapp} people who gave a WhatsApp number, only ${funnel.paid} paid (${Math.round(conversionFromWhatsapp * 100)}%). ${abandonedCount} draft${abandonedCount === 1 ? ' is' : 's are'} currently sitting as abandoned carts — that's recoverable revenue via the Abandoned Carts tab.`
    )
  }

  const lowPerformers = funnel.byStyle.filter((s) => s.started >= 3 && s.started / funnel.started >= 0.05 && s.paid / s.started < overallConversion * 0.5)
  if (lowPerformers.length > 0) {
    tips.push(
      `${lowPerformers.map((s) => s.label).join(', ')} convert${lowPerformers.length === 1 ? 's' : ''} well below average — worth checking if that preview looks off, the price feels high for the style, or the demo content doesn't land.`
    )
  }

  if (bestSellers.length > 0) {
    const top = bestSellers[0]
    tips.push(`${top.label} is the best seller (${top.orders} order${top.orders === 1 ? '' : 's'}) — feature it higher in the gallery and in ads.`)
  }

  if (addons.paidCount > 0) {
    if (addons.rsvpAttachRate < 0.2) {
      tips.push(`Only ${Math.round(addons.rsvpAttachRate * 100)}% of buyers add the RSVP add-on — that's ₹500 of margin per order left on the table if it's pitched better in the editor.`)
    }
    if (addons.songAttachRate < 0.2) {
      tips.push(`Custom song add-on attach rate is ${Math.round(addons.songAttachRate * 100)}% — a quick "hear the difference" preview in the editor might lift this.`)
    }
  }

  if (revenue.orderCount === 0) {
    tips.push('Zero paid orders this period despite drafts being started — worth personally walking through checkout end-to-end to check for a broken step.')
  }

  if (tips.length === 0) {
    tips.push('Funnel looks healthy for this period — no obvious leak to prioritize.')
  }

  return tips
}

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const range = resolveRange(req.nextUrl.searchParams)
  if (!range) return NextResponse.json({ error: 'Invalid range' }, { status: 400 })

  const [revenue, bestSellers, funnel, addons, abandoned] = await Promise.all([
    getRevenueStats(range.from, range.to),
    getBestSellers(range.from, range.to),
    getFunnelStats(range.from, range.to),
    getAddonStats(range.from, range.to),
    getAbandonedDrafts(),
  ])

  const recommendations = buildRecommendations({ revenue, funnel, bestSellers, addons, abandonedCount: abandoned.length })

  return NextResponse.json({
    range: { key: range.key, from: range.from.toISOString(), to: range.to.toISOString() },
    revenue,
    bestSellers,
    funnel,
    addons,
    recommendations,
  })
}
