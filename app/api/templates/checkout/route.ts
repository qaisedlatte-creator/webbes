import { NextRequest, NextResponse } from 'next/server'
import { getInvite } from '@/lib/templates/invites'
import { createPayuOrder, getTotalPricePaise, isPayuConfigured } from '@/lib/templates/payu'

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
  if (invite.status === 'paid') return NextResponse.json({ error: 'Invite is already paid' }, { status: 409 })

  if (!isPayuConfigured()) {
    return NextResponse.json({ error: 'Payments are not configured yet' }, { status: 503 })
  }

  const amount = getTotalPricePaise({ rsvpEnabled: invite.rsvpEnabled, songEnabled: invite.songEnabled })
  const origin = req.headers.get('origin') || new URL(req.url).origin
  // PayU POSTs the result straight back here on both success and failure —
  // the callback route reads `status` to tell them apart.
  const callbackUrl = `${origin}/api/templates/payu/callback`

  const order = createPayuOrder({
    inviteId: invite.id,
    amountPaise: amount,
    customerName: `${invite.data.brideName} & ${invite.data.groomName}`,
    customerPhone: invite.whatsapp,
    surl: callbackUrl,
    furl: callbackUrl,
  })

  return NextResponse.json({ action: order.action, fields: order.fields, amount, currency: 'INR' })
}
