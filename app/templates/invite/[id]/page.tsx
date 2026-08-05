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

  return (
    <>
      {invite.rsvpEnabled && invite.rsvpDashboardToken && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[300] bg-white/95 text-black/70 text-[11px] px-4 py-2 rounded-full shadow-lg">
          Your RSVP dashboard:{' '}
          <a href={`/templates/dashboard/${invite.rsvpDashboardToken}`} className="font-semibold underline" style={{ color: '#2563EB' }}>
            view responses
          </a>
        </div>
      )}
      <TemplateRenderer templateId={invite.templateId} religion={invite.religion} data={invite.data} watermark={false} rsvpEnabled={invite.rsvpEnabled} inviteId={invite.id} />
    </>
  )
}
