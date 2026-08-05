import { NextRequest, NextResponse } from 'next/server'
import { getInvite, submitRsvp } from '@/lib/templates/invites'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const b = body as { inviteId?: string; guestName?: string; attending?: boolean; guestCount?: number; message?: string }
  if (!b.inviteId || !b.guestName?.trim() || typeof b.attending !== 'boolean') {
    return NextResponse.json({ error: 'inviteId, guestName, and attending are required' }, { status: 400 })
  }

  const invite = await getInvite(b.inviteId)
  if (!invite) return NextResponse.json({ error: 'Invite not found' }, { status: 404 })
  if (!invite.rsvpEnabled) return NextResponse.json({ error: 'RSVP is not enabled for this invite' }, { status: 403 })
  if (invite.status !== 'paid') return NextResponse.json({ error: 'This invite is not live yet' }, { status: 403 })

  try {
    await submitRsvp(b.inviteId, {
      guestName: b.guestName.trim().slice(0, 120),
      attending: b.attending,
      guestCount: Math.max(1, Math.min(10, Number(b.guestCount) || 1)),
      message: b.message?.slice(0, 500),
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[templates/rsvp] submit failed', err)
    return NextResponse.json({ error: 'Could not save RSVP' }, { status: 500 })
  }
}
