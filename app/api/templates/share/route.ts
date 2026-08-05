import { NextRequest, NextResponse } from 'next/server'
import { createPreviewShareLink, getInvite } from '@/lib/templates/invites'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const id = (body as { id?: string }).id
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

  const invite = await getInvite(id)
  if (!invite) return NextResponse.json({ error: 'Invite not found' }, { status: 404 })

  try {
    const token = await createPreviewShareLink(id)
    return NextResponse.json({ token })
  } catch (err) {
    console.error('[templates/share] failed to create link', err)
    return NextResponse.json({ error: 'Could not create share link' }, { status: 500 })
  }
}
