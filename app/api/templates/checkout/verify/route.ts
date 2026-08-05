import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { markInvitePaid } from '@/lib/templates/invites'

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) return NextResponse.json({ error: 'Payments are not configured yet' }, { status: 503 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { id, orderId, paymentId, signature } = body as {
    id?: string
    orderId?: string
    paymentId?: string
    signature?: string
  }
  if (!id || !orderId || !paymentId || !signature) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const expected = crypto.createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex')
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b)

  if (!valid) return NextResponse.json({ error: 'Signature mismatch' }, { status: 401 })

  try {
    await markInvitePaid(id)
  } catch (err) {
    console.error('[templates/checkout/verify] failed to mark paid', id, err)
    return NextResponse.json({ error: 'Could not update invite' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
