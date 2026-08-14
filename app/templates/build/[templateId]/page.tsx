import { notFound, redirect } from 'next/navigation'
import { getInvite } from '@/lib/templates/invites'
import { getVariant } from '@/lib/templates/posterVariants'
import Editor from './Editor'

export default async function BuildPage({
  params,
  searchParams,
}: {
  params: Promise<{ templateId: string }>
  searchParams: Promise<{ id?: string; religion?: string }>
}) {
  const { templateId } = await params
  const sp = await searchParams

  if (sp.id) {
    const invite = await getInvite(sp.id)
    if (invite) {
      return (
        <Editor
          templateId={invite.templateId}
          initialId={invite.id}
          initialReligion={invite.religion}
          initialData={invite.data}
          initialRsvpEnabled={invite.rsvpEnabled}
          initialSongEnabled={invite.songEnabled}
        />
      )
    }
  }

  // No valid invite id — a fresh visit to the builder that skipped the
  // quick-capture screen (direct link, bookmark, back button). Send them
  // there first; it creates the draft (with WhatsApp) and redirects back
  // here with ?id=.
  const variant = getVariant(templateId)
  if (variant) redirect(`/templates/build/${templateId}/start`)
  if (templateId === 'custom') {
    const qs = sp.religion ? `?religion=${encodeURIComponent(sp.religion)}` : ''
    redirect(`/templates/build/custom/start${qs}`)
  }

  notFound()
}
