import { NextRequest, NextResponse } from 'next/server'
import { markInvitePaid } from '@/lib/templates/invites'
import { verifyPayuResponseHash } from '@/lib/templates/payu'

// PayU posts here as both surl (success) and furl (failure) — a hosted-checkout
// redirect, not a webhook, so the only thing standing between this endpoint and
// a forged "payment succeeded" request is the reverse hash below.
export async function POST(req: NextRequest) {
  const origin = new URL(req.url).origin

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.redirect(`${origin}/templates`, 303)
  }

  const get = (k: string) => form.get(k)?.toString() ?? ''
  const fields = {
    status: get('status'),
    txnid: get('txnid'),
    amount: get('amount'),
    productinfo: get('productinfo'),
    firstname: get('firstname'),
    email: get('email'),
    udf1: get('udf1'),
    hash: get('hash'),
    key: get('key'),
  }

  const inviteId = fields.udf1
  if (!inviteId) {
    console.error('[templates/payu/callback] missing udf1 (invite id)', fields.txnid)
    return NextResponse.redirect(`${origin}/templates`, 303)
  }

  if (!verifyPayuResponseHash(fields)) {
    console.error('[templates/payu/callback] hash mismatch', fields.txnid, inviteId)
    return NextResponse.redirect(`${origin}/templates/preview/${inviteId}?payu_error=1`, 303)
  }

  if (fields.status !== 'success') {
    return NextResponse.redirect(`${origin}/templates/preview/${inviteId}?payu_error=1`, 303)
  }

  try {
    await markInvitePaid(inviteId)
  } catch (err) {
    console.error('[templates/payu/callback] failed to mark invite paid', inviteId, err)
    return NextResponse.redirect(`${origin}/templates/preview/${inviteId}?payu_error=1`, 303)
  }

  return NextResponse.redirect(`${origin}/templates/invite/${inviteId}`, 303)
}
