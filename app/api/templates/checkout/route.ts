import { NextRequest, NextResponse } from 'next/server'
import { getInvite } from '@/lib/templates/invites'
import { createCashfreeOrder, getTotalPricePaise, isCashfreeConfigured } from '@/lib/templates/cashfree'

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

  if (!isCashfreeConfigured()) {
    return NextResponse.json({ error: 'Payments are not configured yet' }, { status: 503 })
  }

  const amount = getTotalPricePaise({ rsvpEnabled: invite.rsvpEnabled, songEnabled: invite.songEnabled })
  const origin = req.headers.get('origin') || new URL(req.url).origin
  // Only hit when Cashfree falls back to a real redirect instead of resolving
  // the modal's promise (in-app browsers like Instagram/FB that can't host the
  // modal) — Cashfree substitutes {order_id} itself before redirecting here.
  const returnUrl = `${origin}/templates/preview/${invite.id}?cf_order_id={order_id}`

  try {
    const order = await createCashfreeOrder({
      inviteId: invite.id,
      amountPaise: amount,
      customerName: `${invite.data.brideName} & ${invite.data.groomName}`,
      customerPhone: invite.whatsapp,
      returnUrl,
    })
    return NextResponse.json({ orderId: order.orderId, paymentSessionId: order.paymentSessionId, amount, currency: 'INR' })
  } catch (err) {
    console.error('[templates/checkout] Cashfree order creation failed', invite.id, err)
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 502 })
  }
}
