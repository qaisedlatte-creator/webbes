import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { DEFAULT_PRESET_ID } from './religion-themes'
import { styleLabel } from './display'
import type { InviteData, InviteRecord, Religion, RsvpResponseRecord } from './types'

export { styleLabel, displayOrderNumber } from './display'

export const DEFAULT_INVITE_DATA: InviteData = {
  groomName: '',
  brideName: '',
  date: '2026-12-12',
  time: '4:00 PM – 7:00 PM',
  venue: '',
  venueCity: '',
  colorPresetId: '',
  photoUrl: null,
  audioUrl: null,
  mapsUrl: '',
  showPetals: true,
  eventLabel: '',
  heroSubtitle: '',
  closingLine: '',
  footerBlessing: '',
  nameOrder: 'brideFirst',
  showCountdown: true,
  showWeddingDetails: true,
  showLocation: true,
  showFooter: true,
  rsvpStyle: 'frosted',
}

interface InviteRow {
  id: string
  templateId: string
  religion: string
  data: unknown
  whatsapp: string | null
  contactName: string | null
  status: string
  createdAt: Date
  updatedAt: Date
  paidAt: Date | null
  orderId: string | null
  amountPaidPaise: number | null
  rsvpEnabled: boolean
  songEnabled: boolean
  rsvpDashboardToken: string | null
  previewShareToken: string | null
  previewShareViewedAt: Date | null
  reminderSentAt: Date | null
}

function toRecord(row: InviteRow): InviteRecord {
  return {
    id: row.id,
    templateId: row.templateId,
    religion: row.religion as Religion,
    data: { ...DEFAULT_INVITE_DATA, ...(row.data as Partial<InviteData>) },
    whatsapp: row.whatsapp,
    contactName: row.contactName,
    status: row.status as 'draft' | 'paid',
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    paidAt: row.paidAt ? row.paidAt.toISOString() : null,
    orderId: row.orderId,
    amountPaidPaise: row.amountPaidPaise,
    rsvpEnabled: row.rsvpEnabled,
    songEnabled: row.songEnabled,
    rsvpDashboardToken: row.rsvpDashboardToken,
    previewShareToken: row.previewShareToken,
    previewShareViewedAt: row.previewShareViewedAt ? row.previewShareViewedAt.toISOString() : null,
    reminderSentAt: row.reminderSentAt ? row.reminderSentAt.toISOString() : null,
  }
}

export async function getInvite(id: string): Promise<InviteRecord | null> {
  const row = await prisma.invite.findUnique({ where: { id } })
  return row ? toRecord(row) : null
}

export async function upsertInvite(input: {
  id?: string
  templateId?: string
  religion: Religion
  data: Partial<InviteData>
  whatsapp?: string | null
  contactName?: string | null
  rsvpEnabled?: boolean
  songEnabled?: boolean
}): Promise<InviteRecord> {
  const religion = input.religion
  const presetId = input.data.colorPresetId || DEFAULT_PRESET_ID[religion]
  const data: InviteData = { ...DEFAULT_INVITE_DATA, ...input.data, colorPresetId: presetId }

  if (input.id) {
    const row = await prisma.invite.update({
      where: { id: input.id },
      data: {
        religion,
        data: data as object,
        ...(input.whatsapp !== undefined ? { whatsapp: input.whatsapp } : {}),
        ...(input.contactName !== undefined ? { contactName: input.contactName } : {}),
        ...(input.rsvpEnabled !== undefined ? { rsvpEnabled: input.rsvpEnabled } : {}),
        ...(input.songEnabled !== undefined ? { songEnabled: input.songEnabled } : {}),
      },
    })
    return toRecord(row)
  }

  const row = await prisma.invite.create({
    data: {
      templateId: input.templateId || 'template-01',
      religion,
      data: data as object,
      whatsapp: input.whatsapp ?? null,
      contactName: input.contactName ?? null,
      rsvpEnabled: input.rsvpEnabled ?? false,
      songEnabled: input.songEnabled ?? false,
    },
  })
  return toRecord(row)
}

/** Logs a render of the quick-capture screen — the "Style Selected" funnel stage, before any Invite row exists. */
export async function logStyleView(religion: Religion, templateId: string): Promise<void> {
  await prisma.styleView.create({ data: { religion, templateId } })
}

export interface MarkPaidResult {
  invite: InviteRecord
  /** True if this invite was already 'paid' before this call — the webhook and the client-side verify call can both race to confirm the same payment; callers use this to fire the Purchase conversion event exactly once. */
  alreadyPaid: boolean
}

export async function markInvitePaid(id: string, payment?: { orderId?: string; amountPaidPaise?: number }): Promise<MarkPaidResult> {
  const invite = await prisma.invite.findUnique({ where: { id } })
  if (!invite) throw new Error('Invite not found')

  // Atomic conditional transition (status must not already be 'paid') so the
  // webhook and the client-side verify call, if they race, can't both "win".
  const { count } = await prisma.invite.updateMany({
    where: { id, status: { not: 'paid' } },
    data: {
      status: 'paid',
      paidAt: new Date(),
      ...(payment?.orderId ? { orderId: payment.orderId } : {}),
      ...(payment?.amountPaidPaise !== undefined ? { amountPaidPaise: payment.amountPaidPaise } : {}),
      // Only invites with RSVP enabled get a dashboard link.
      ...(invite.rsvpEnabled && !invite.rsvpDashboardToken ? { rsvpDashboardToken: crypto.randomBytes(16).toString('hex') } : {}),
    },
  })

  const row = await prisma.invite.findUniqueOrThrow({ where: { id } })
  return { invite: toRecord(row), alreadyPaid: count === 0 }
}

export async function createPreviewShareLink(id: string): Promise<string> {
  const token = crypto.randomBytes(16).toString('hex')
  await prisma.invite.update({ where: { id }, data: { previewShareToken: token, previewShareViewedAt: null } })
  return token
}

export async function consumeShareToken(token: string): Promise<InviteRecord | null> {
  const row = await prisma.invite.findUnique({ where: { previewShareToken: token } })
  if (!row) return null
  if (!row.previewShareViewedAt) {
    await prisma.invite.update({ where: { id: row.id }, data: { previewShareViewedAt: new Date() } })
  }
  return toRecord(row)
}

export async function submitRsvp(inviteId: string, input: { guestName: string; attending: boolean; guestCount: number; message?: string }) {
  return prisma.rsvpResponse.create({
    data: {
      inviteId,
      guestName: input.guestName,
      attending: input.attending,
      guestCount: input.guestCount,
      message: input.message || null,
    },
  })
}

/** Drafts a customer started (WhatsApp captured) but never paid for — the abandoned-cart admin list. */
export async function getAbandonedDrafts(): Promise<InviteRecord[]> {
  const rows = await prisma.invite.findMany({
    where: { status: 'draft', whatsapp: { not: null } },
    orderBy: { updatedAt: 'desc' },
  })
  return rows.filter((r) => r.whatsapp && r.whatsapp.trim().length > 0).map(toRecord)
}

/** Abandoned drafts old enough to remind, and not reminded yet — used by the cron endpoint. */
export async function getDraftsDueForReminder(minAgeHours: number): Promise<InviteRecord[]> {
  const threshold = new Date(Date.now() - minAgeHours * 60 * 60 * 1000)
  const rows = await prisma.invite.findMany({
    where: {
      status: 'draft',
      whatsapp: { not: null },
      reminderSentAt: null,
      updatedAt: { lte: threshold },
    },
  })
  return rows.filter((r) => r.whatsapp && r.whatsapp.trim().length > 0).map(toRecord)
}

export async function markReminderSent(id: string): Promise<void> {
  await prisma.invite.update({ where: { id }, data: { reminderSentAt: new Date() } })
}

/** Every invite regardless of status — the full Orders table (Shopify-style: order #, payment status, amount, customer). */
export async function getAllInvites(): Promise<InviteRecord[]> {
  const rows = await prisma.invite.findMany({ orderBy: { updatedAt: 'desc' } })
  return rows.map(toRecord)
}

export interface RevenueStats {
  totalPaise: number
  orderCount: number
  avgOrderPaise: number
}

/** Revenue realized (payment completed) within [from, to]. */
export async function getRevenueStats(from: Date, to: Date): Promise<RevenueStats> {
  const rows = await prisma.invite.findMany({
    where: { status: 'paid', paidAt: { gte: from, lte: to } },
    select: { amountPaidPaise: true },
  })
  const totalPaise = rows.reduce((sum, r) => sum + (r.amountPaidPaise ?? 0), 0)
  const orderCount = rows.length
  return { totalPaise, orderCount, avgOrderPaise: orderCount ? Math.round(totalPaise / orderCount) : 0 }
}

export interface BestSeller {
  key: string
  label: string
  orders: number
  revenuePaise: number
}

/** Which template style sells best, by paid orders in [from, to]. */
export async function getBestSellers(from: Date, to: Date): Promise<BestSeller[]> {
  const rows = await prisma.invite.findMany({
    where: { status: 'paid', paidAt: { gte: from, lte: to } },
    select: { religion: true, templateId: true, amountPaidPaise: true },
  })
  const byKey = new Map<string, BestSeller>()
  for (const r of rows) {
    const key = `${r.religion}:${r.templateId}`
    const existing = byKey.get(key)
    if (existing) {
      existing.orders += 1
      existing.revenuePaise += r.amountPaidPaise ?? 0
    } else {
      byKey.set(key, { key, label: styleLabel(r.religion as Religion, r.templateId), orders: 1, revenuePaise: r.amountPaidPaise ?? 0 })
    }
  }
  return [...byKey.values()].sort((a, b) => b.orders - a.orders)
}

export interface FunnelBreakdown {
  key: string
  label: string
  styleSelected: number
  contactCaptured: number
  customized: number
  paid: number
}

export interface FunnelStats {
  styleSelected: number
  contactCaptured: number
  customized: number
  paid: number
  byStyle: FunnelBreakdown[]
}

/** A customer has actually started customizing once they've named the couple — the first thing the builder asks for after the quick-capture step. */
function hasCustomized(data: unknown): boolean {
  const d = data as Partial<InviteData> | null | undefined
  return Boolean(d && ((d.brideName && d.brideName.trim().length > 0) || (d.groomName && d.groomName.trim().length > 0)))
}

/** Where visitors drop off in [from, to] — picking a style, giving contact info on the quick-capture screen, actually customizing the invite, then paying — overall and per template style. */
export async function getFunnelStats(from: Date, to: Date): Promise<FunnelStats> {
  const [views, invites] = await Promise.all([
    prisma.styleView.findMany({ where: { createdAt: { gte: from, lte: to } }, select: { religion: true, templateId: true } }),
    prisma.invite.findMany({ where: { createdAt: { gte: from, lte: to } }, select: { religion: true, templateId: true, data: true, status: true } }),
  ])

  const byKey = new Map<string, FunnelBreakdown>()
  const getEntry = (religion: string, templateId: string) => {
    const key = `${religion}:${templateId}`
    let entry = byKey.get(key)
    if (!entry) {
      entry = { key, label: styleLabel(religion as Religion, templateId), styleSelected: 0, contactCaptured: 0, customized: 0, paid: 0 }
      byKey.set(key, entry)
    }
    return entry
  }

  let styleSelected = 0
  for (const v of views) {
    styleSelected++
    getEntry(v.religion, v.templateId).styleSelected++
  }

  let contactCaptured = 0
  let customized = 0
  let paid = 0
  for (const inv of invites) {
    // Every Invite row now implies the quick-capture step was completed —
    // a WhatsApp number is required to create one — so this is the
    // "Contact Captured" stage.
    contactCaptured++
    const entry = getEntry(inv.religion, inv.templateId)
    entry.contactCaptured++

    if (hasCustomized(inv.data)) {
      customized++
      entry.customized++
    }
    if (inv.status === 'paid') {
      paid++
      entry.paid++
    }
  }

  return { styleSelected, contactCaptured, customized, paid, byStyle: [...byKey.values()].sort((a, b) => b.styleSelected - a.styleSelected) }
}

export interface AddonStats {
  paidCount: number
  rsvpAttachRate: number
  songAttachRate: number
}

/** Add-on attach rate among paid orders in [from, to] — how many buyers took the RSVP / custom-song upsells. */
export async function getAddonStats(from: Date, to: Date): Promise<AddonStats> {
  const rows = await prisma.invite.findMany({
    where: { status: 'paid', paidAt: { gte: from, lte: to } },
    select: { rsvpEnabled: true, songEnabled: true },
  })
  const paidCount = rows.length
  const rsvpCount = rows.filter((r) => r.rsvpEnabled).length
  const songCount = rows.filter((r) => r.songEnabled).length
  return {
    paidCount,
    rsvpAttachRate: paidCount ? rsvpCount / paidCount : 0,
    songAttachRate: paidCount ? songCount / paidCount : 0,
  }
}

/** Wipes every invite (and cascades to its RSVPs) — the admin "Clear All Test Data" button. */
export async function clearAllInvites(): Promise<number> {
  const result = await prisma.invite.deleteMany({})
  return result.count
}

export async function getInviteByDashboardToken(token: string): Promise<{ invite: InviteRecord; responses: RsvpResponseRecord[] } | null> {
  const row = await prisma.invite.findUnique({ where: { rsvpDashboardToken: token }, include: { rsvps: { orderBy: { createdAt: 'desc' } } } })
  if (!row) return null
  return {
    invite: toRecord(row),
    responses: row.rsvps.map((r) => ({
      id: r.id,
      guestName: r.guestName,
      attending: r.attending,
      guestCount: r.guestCount,
      message: r.message,
      createdAt: r.createdAt.toISOString(),
    })),
  }
}
