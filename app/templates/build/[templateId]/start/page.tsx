import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getVariant } from '@/lib/templates/posterVariants'
import { RELIGIONS } from '@/lib/templates/religion-themes'
import { logStyleView } from '@/lib/templates/invites'
import type { Religion } from '@/lib/templates/types'
import StartCapture from './StartCapture'

const VALID_RELIGIONS: Religion[] = ['islamic', 'christian', 'hindu']

export const metadata: Metadata = { title: "Let's build your invitation — Webbes" }

export default async function StartPage({
  params,
  searchParams,
}: {
  params: Promise<{ templateId: string }>
  searchParams: Promise<{ religion?: string }>
}) {
  const { templateId } = await params
  const sp = await searchParams

  const variant = getVariant(templateId)

  let religion: Religion
  // Envelope variants have a specific starting color preset (matching their
  // thumbnail) — preserved here so the builder opens on the right theme,
  // same as the old direct-to-builder flow used to set it.
  let initialColorPresetId = ''

  if (variant) {
    religion = variant.religion
    if (variant.kind === 'envelope') initialColorPresetId = variant.colorPresetId
  } else if (templateId === 'custom') {
    religion = VALID_RELIGIONS.includes(sp.religion as Religion) ? (sp.religion as Religion) : 'islamic'
  } else {
    notFound()
  }

  // "Style Selected" funnel stage — logged before any Invite row exists.
  await logStyleView(religion, templateId)

  const religionLabel = RELIGIONS.find((r) => r.id === religion)?.label ?? religion

  return <StartCapture templateId={templateId} religion={religion} religionLabel={religionLabel} initialColorPresetId={initialColorPresetId} />
}
