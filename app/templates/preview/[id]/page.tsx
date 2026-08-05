import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getInvite } from '@/lib/templates/invites'
import { getInvitePricePaise } from '@/lib/templates/razorpay'
import PreviewClient from './PreviewClient'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invite = await getInvite(id)
  if (!invite) notFound()
  if (invite.status === 'paid') redirect(`/templates/invite/${id}`)

  // Strip the final photo URL server-side until paid — inspecting the page
  // source must not reveal the asset either, not just the visible watermark.
  const sanitizedData = { ...invite.data, photoUrl: null }

  return (
    <PreviewClient
      id={invite.id}
      religion={invite.religion}
      data={sanitizedData}
      pricePaise={getInvitePricePaise()}
    />
  )
}
