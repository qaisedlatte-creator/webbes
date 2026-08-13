import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthed } from '@/lib/templates/admin-auth'
import { clearAllInvites } from '@/lib/templates/invites'

// Wipes every Invite row (and cascades to RsvpResponse) — a "clear all test data"
// button for the admin dashboard while this product is pre-launch. Requires the
// literal confirmation phrase in the body as a second guard against a stray click.
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const confirm = (body as { confirm?: string }).confirm
  if (confirm !== 'DELETE') {
    return NextResponse.json({ error: 'Confirmation phrase did not match' }, { status: 400 })
  }

  const count = await clearAllInvites()
  return NextResponse.json({ ok: true, deleted: count })
}
