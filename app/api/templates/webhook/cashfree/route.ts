import { NextRequest, NextResponse } from 'next/server'
import { getInvite, markInvitePaid } from '@/lib/templates/invites'
import { verifyCashfreeWebhookSignature, inviteIdFromOrderId, getTotalPricePaise } from '@/lib/templates/cashfree'
import { sendPurchaseEvent } from '@/lib/templates/meta-capi'

const SITE_ORIGIN = 'https://www.webbes.in'

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
        const invite = await getInvite(inviteId)
        const amountPaidPaise = invite ? getTotalPricePaise({ rsvpEnabled: invite.rsvpEnabled, songEnabled: invite.songEnabled }) : undefined
        const { invite: paidInvite, alreadyPaid } = await markInvitePaid(inviteId, { orderId, amountPaidPaise })

        // This request comes from Cashfree's servers, not the customer's
        // browser — no useful IP/UA/cookies here, so match quality relies on
        // the hashed WhatsApp number alone. `alreadyPaid` guards against
        // firing Purchase twice if the client-side verify call already did.
        if (!alreadyPaid && paidInvite.amountPaidPaise != null) {
          const result = await sendPurchaseEvent({
            inviteId,
            valueInr: paidInvite.amountPaidPaise / 100,
            eventSourceUrl: `${SITE_ORIGIN}/templates/preview/${inviteId}`,
            whatsapp: paidInvite.whatsapp,
          })
          if (!result.ok) console.error('[templates/webhook/cashfree] Meta CAPI Purchase send failed', inviteId, result.error)
        }
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
