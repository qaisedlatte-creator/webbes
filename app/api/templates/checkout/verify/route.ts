import { NextRequest, NextResponse } from 'next/server'
import { markInvitePaid } from '@/lib/templates/invites'
import { getCashfreeOrderStatus, isCashfreeConfigured } from '@/lib/templates/cashfree'

export async function POST(req: NextRequest) {
  if (!isCashfreeConfigured()) {
    return NextResponse.json({ error: 'Payments are not configured yet' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { id, orderId } = body as { id?: string; orderId?: string }
  if (!id || !orderId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Cashfree's modal checkout doesn't hand back a client-side signature the
  // way Razorpay does — the correct pattern is asking Cashfree directly.
  let status: string
  try {
    status = await getCashfreeOrderStatus(orderId)
  } catch (err) {
    console.error('[templates/checkout/verify] order status fetch failed', orderId, err)
    return NextResponse.json({ error: 'Could not confirm payment' }, { status: 502 })
  }

  if (status !== 'PAID') {
    return NextResponse.json({ error: `Payment not completed (status: ${status})` }, { status: 402 })
  }

  try {
    await markInvitePaid(id)
  } catch (err) {
    console.error('[templates/checkout/verify] failed to mark paid', id, err)
    return NextResponse.json({ error: 'Could not update invite' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
