'use client'

import InviteTemplate from './template-01/InviteTemplate'
import { getVariant, accentToColorPreset } from '@/lib/templates/posterVariants'
import { getPreset, DEFAULT_PRESET_ID } from '@/lib/templates/religion-themes'
import type { InviteData, Religion } from '@/lib/templates/types'

interface Props {
  templateId: string
  religion: Religion
  data: InviteData
  watermark?: boolean
  skipReveal?: boolean
  rsvpEnabled?: boolean
  inviteId?: string
}

export default function TemplateRenderer({ templateId, religion, data, watermark = false, skipReveal = false, rsvpEnabled = false, inviteId }: Props) {
  const variant = getVariant(templateId)

  // Fixed-background poster variants: same multi-section envelope experience
  // as the flexible template, just with a locked background photo + palette.
  if (variant?.kind === 'poster') {
    const theme = accentToColorPreset(variant.accent, variant.id, variant.label)
    return (
      <InviteTemplate
        religion={religion}
        data={data}
        watermark={watermark}
        skipReveal={skipReveal}
        themeOverride={theme}
        forcedBackground={variant.backgroundImage}
        rsvpEnabled={rsvpEnabled}
        inviteId={inviteId}
      />
    )
  }

  // Custom: the customer's own uploaded photo is the background; palette
  // falls back to that religion's default envelope preset.
  if (templateId === 'custom') {
    const theme = getPreset(religion, DEFAULT_PRESET_ID[religion])
    return (
      <InviteTemplate
        religion={religion}
        data={data}
        watermark={watermark}
        skipReveal={skipReveal}
        themeOverride={theme}
        forcedBackground={data.photoUrl ?? undefined}
        rsvpEnabled={rsvpEnabled}
        inviteId={inviteId}
      />
    )
  }

  return <InviteTemplate religion={religion} data={data} watermark={watermark} skipReveal={skipReveal} rsvpEnabled={rsvpEnabled} inviteId={inviteId} />
}
