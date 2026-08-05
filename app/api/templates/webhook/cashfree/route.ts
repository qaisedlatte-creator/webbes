import { NextRequest, NextResponse } from 'next/server'
import { markInvitePaid } from '@/lib/templates/invites'
import { verifyCashfreeWebhookSignature, inviteIdFromOrderId } from '@/lib/templates/cashfree'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-webhook-signature')
  const timestamp = req.headers.get('x-webhook-timestamp')

  if (!signature || !timestamp) {
    return NextResponse.json({ error: 'Missing signature headers' }, { status: 400 })
  }

  if (!verifyCashfreeWebhookSignature(rawBody, timestamp, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (event.type === 'PAYMENT_SUCCESS_WEBHOOK' && event.data?.payment?.payment_status === 'SUCCESS') {
    const orderId: string | undefined = event.data?.order?.order_id
    const inviteId = orderId ? inviteIdFromOrderId(orderId) : null

    if (inviteId) {
      try {
        await markInvitePaid(inviteId)
      } catch (err) {
        console.error('[templates/webhook/cashfree] failed to mark invite paid', inviteId, err)
        return NextResponse.json({ error: 'Could not update invite' }, { status: 500 })
      }
    } else {
      console.error('[templates/webhook/cashfree] could not recover invite id from order', orderId)
    }
  }

  return NextResponse.json({ received: true })
}
