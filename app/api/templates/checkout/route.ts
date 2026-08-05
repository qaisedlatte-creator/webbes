import { NextRequest, NextResponse } from 'next/server'
import { getInvite } from '@/lib/templates/invites'
import { getRazorpayClient, getTotalPricePaise } from '@/lib/templates/razorpay'

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

  const razorpay = getRazorpayClient()
  if (!razorpay) {
    return NextResponse.json({ error: 'Payments are not configured yet' }, { status: 503 })
  }

  const amount = getTotalPricePaise({ rsvpEnabled: invite.rsvpEnabled, songEnabled: invite.songEnabled })

  try {
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: invite.id,
      notes: { inviteId: invite.id },
    })

    return NextResponse.json({
      orderId: order.id,
      amount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
      name: `${invite.data.brideName} & ${invite.data.groomName}`,
    })
  } catch (err) {
    console.error('[templates/checkout] order create failed', err)
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 500 })
  }
}
