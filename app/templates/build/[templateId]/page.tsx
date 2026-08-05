import { getInvite } from '@/lib/templates/invites'
import { DEFAULT_INVITE_DATA } from '@/lib/templates/invites'
import { DEFAULT_PRESET_ID } from '@/lib/templates/religion-themes'
import type { Religion } from '@/lib/templates/types'
import Editor from './Editor'

const VALID_RELIGIONS: Religion[] = ['islamic', 'christian', 'hindu']

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
      return <Editor templateId={invite.templateId} initialId={invite.id} initialReligion={invite.religion} initialData={invite.data} initialWhatsapp={invite.whatsapp} />
    }
  }

  const religion: Religion = VALID_RELIGIONS.includes(sp.religion as Religion) ? (sp.religion as Religion) : 'islamic'

  return (
    <Editor
      templateId={templateId}
      initialId={null}
      initialReligion={religion}
      initialData={{ ...DEFAULT_INVITE_DATA, colorPresetId: DEFAULT_PRESET_ID[religion] }}
      initialWhatsapp={null}
    />
  )
}
