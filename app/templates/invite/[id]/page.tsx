import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getInvite } from '@/lib/templates/invites'
import TemplateRenderer from '@/components/templates/TemplateRenderer'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const invite = await getInvite(id)
  if (!invite) return {}
  return {
    title: `${invite.data.brideName} & ${invite.data.groomName}`,
    robots: { index: false, follow: false },
  }
}

export default async function InvitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invite = await getInvite(id)
  if (!invite) notFound()
  if (invite.status !== 'paid') redirect(`/templates/preview/${id}`)

  return <TemplateRenderer templateId={invite.templateId} religion={invite.religion} data={invite.data} watermark={false} />
}
