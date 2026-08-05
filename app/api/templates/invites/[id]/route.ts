import { NextRequest, NextResponse } from 'next/server'
import { getInvite } from '@/lib/templates/invites'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invite = await getInvite(id)
  if (!invite) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ invite })
}
