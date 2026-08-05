import { prisma } from '@/lib/prisma'
import { DEFAULT_PRESET_ID } from './religion-themes'
import type { InviteData, InviteRecord, Religion } from './types'

export const DEFAULT_INVITE_DATA: InviteData = {
  groomName: '',
  brideName: '',
  date: '2026-12-12',
  time: '4:00 PM – 7:00 PM',
  venue: '',
  venueCity: '',
  colorPresetId: '',
  photoUrl: null,
}

function toRecord(row: {
  id: string
  templateId: string
  religion: string
  data: unknown
  whatsapp: string | null
  status: string
  createdAt: Date
  paidAt: Date | null
}): InviteRecord {
  return {
    id: row.id,
    templateId: row.templateId,
    religion: row.religion as Religion,
    data: { ...DEFAULT_INVITE_DATA, ...(row.data as Partial<InviteData>) },
    whatsapp: row.whatsapp,
    status: row.status as 'draft' | 'paid',
    createdAt: row.createdAt.toISOString(),
    paidAt: row.paidAt ? row.paidAt.toISOString() : null,
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
    },
  })
  return toRecord(row)
}

export async function markInvitePaid(id: string): Promise<InviteRecord> {
  const row = await prisma.invite.update({
    where: { id },
    data: { status: 'paid', paidAt: new Date() },
  })
  return toRecord(row)
}
