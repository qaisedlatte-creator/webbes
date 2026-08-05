import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { DEFAULT_PRESET_ID } from './religion-themes'
import type { InviteData, InviteRecord, Religion, RsvpResponseRecord } from './types'

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
  status: string
  createdAt: Date
  paidAt: Date | null
  rsvpEnabled: boolean
  songEnabled: boolean
  rsvpDashboardToken: string | null
  previewShareToken: string | null
  previewShareViewedAt: Date | null
}

function toRecord(row: InviteRow): InviteRecord {
  return {
    id: row.id,
    templateId: row.templateId,
    religion: row.religion as Religion,
    data: { ...DEFAULT_INVITE_DATA, ...(row.data as Partial<InviteData>) },
    whatsapp: row.whatsapp,
    status: row.status as 'draft' | 'paid',
    createdAt: row.createdAt.toISOString(),
    paidAt: row.paidAt ? row.paidAt.toISOString() : null,
    rsvpEnabled: row.rsvpEnabled,
    songEnabled: row.songEnabled,
    rsvpDashboardToken: row.rsvpDashboardToken,
    previewShareToken: row.previewShareToken,
    previewShareViewedAt: row.previewShareViewedAt ? row.previewShareViewedAt.toISOString() : null,
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
      rsvpEnabled: input.rsvpEnabled ?? false,
      songEnabled: input.songEnabled ?? false,
    },
  })
  return toRecord(row)
}

export async function markInvitePaid(id: string): Promise<InviteRecord> {
  const invite = await prisma.invite.findUnique({ where: { id } })
  if (!invite) throw new Error('Invite not found')

  const row = await prisma.invite.update({
    where: { id },
    data: {
      status: 'paid',
      paidAt: new Date(),
      // Only invites with RSVP enabled get a dashboard link.
      ...(invite.rsvpEnabled && !invite.rsvpDashboardToken ? { rsvpDashboardToken: crypto.randomBytes(16).toString('hex') } : {}),
    },
  })
  return toRecord(row)
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
