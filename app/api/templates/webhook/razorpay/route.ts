import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { markInvitePaid } from '@/lib/templates/invites'

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  }

  const rawBody = await req.text()
  const signature = req.headers.get('x-razorpay-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  const signatureBuf = Buffer.from(signature)
  const expectedBuf = Buffer.from(expected)
  const valid =
    signatureBuf.length === expectedBuf.length && crypto.timingSafeEqual(signatureBuf, expectedBuf)

  if (!valid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (event.event === 'payment.captured' || event.event === 'order.paid') {
    const payment = event.payload?.payment?.entity
    const order = event.payload?.order?.entity
    const inviteId: string | undefined = order?.notes?.inviteId ?? payment?.notes?.inviteId ?? order?.receipt

    if (inviteId) {
      try {
        await markInvitePaid(inviteId)
      } catch (err) {
        console.error('[templates/webhook] failed to mark invite paid', inviteId, err)
        return NextResponse.json({ error: 'Could not update invite' }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
