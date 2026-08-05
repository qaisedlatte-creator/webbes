import { NextRequest, NextResponse } from 'next/server'
import { upsertInvite } from '@/lib/templates/invites'
import type { InviteData, Religion } from '@/lib/templates/types'

const VALID_RELIGIONS: Religion[] = ['islamic', 'christian', 'hindu']
const DATA_FIELDS: (keyof InviteData)[] = [
  'groomName', 'brideName', 'date', 'time', 'venue', 'venueCity', 'colorPresetId', 'photoUrl',
  'audioUrl', 'mapsUrl', 'showPetals', 'eventLabel', 'heroSubtitle', 'closingLine', 'footerBlessing',
  'nameOrder', 'showCountdown', 'showWeddingDetails', 'showLocation', 'showFooter', 'rsvpStyle',
]

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const b = body as Record<string, unknown>
  const religion = b.religion as Religion
  if (!VALID_RELIGIONS.includes(religion)) {
    return NextResponse.json({ error: 'religion must be one of islamic, christian, hindu' }, { status: 400 })
  }

  const rawData = (b.data ?? {}) as Record<string, unknown>
  const data: Partial<InviteData> = {}
  for (const key of DATA_FIELDS) {
    if (rawData[key] !== undefined) (data as Record<string, unknown>)[key] = rawData[key]
  }

  try {
    const invite = await upsertInvite({
      id: typeof b.id === 'string' ? b.id : undefined,
      templateId: typeof b.templateId === 'string' ? b.templateId : undefined,
      religion,
      data,
      whatsapp: typeof b.whatsapp === 'string' ? b.whatsapp : undefined,
      rsvpEnabled: typeof b.rsvpEnabled === 'boolean' ? b.rsvpEnabled : undefined,
      songEnabled: typeof b.songEnabled === 'boolean' ? b.songEnabled : undefined,
    })
    return NextResponse.json({ id: invite.id, status: invite.status })
  } catch (err) {
    console.error('[templates/invites] upsert failed', err)
    return NextResponse.json({ error: 'Could not save draft' }, { status: 500 })
  }
}
