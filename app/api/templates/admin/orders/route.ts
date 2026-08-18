import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthed } from '@/lib/templates/admin-auth'
import { deleteInvites } from '@/lib/templates/invites'

const MAX_IDS = 200

// Deletes exactly the invite ids the admin explicitly selected in the Orders
// tab — never "all" implicitly. See ./[id]/route.ts for the single-row variant.
export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const ids = (body as { ids?: unknown }).ids
  if (!Array.isArray(ids) || ids.length === 0 || !ids.every((v) => typeof v === 'string')) {
    return NextResponse.json({ error: 'ids must be a non-empty array of strings' }, { status: 400 })
  }
  if (ids.length > MAX_IDS) {
    return NextResponse.json({ error: `Select at most ${MAX_IDS} at a time` }, { status: 400 })
  }

  const deleted = await deleteInvites(ids)
  return NextResponse.json({ ok: true, deleted })
}
