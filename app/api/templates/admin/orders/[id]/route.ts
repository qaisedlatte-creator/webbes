import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthed } from '@/lib/templates/admin-auth'
import { deleteInvite } from '@/lib/templates/invites'

// Deletes exactly one invite/order by id — the admin dashboard's per-row
// delete button. Scoped to a single id in the URL; there is no bulk variant.
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const deleted = await deleteInvite(id)
  if (!deleted) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  return NextResponse.json({ ok: true })
}
