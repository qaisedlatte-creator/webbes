'use client'

import InviteTemplate from './template-01/InviteTemplate'
import PosterTemplate from './poster-01/PosterTemplate'
import { getVariant } from '@/lib/templates/posterVariants'
import type { InviteData, Religion } from '@/lib/templates/types'

interface Props {
  templateId: string
  religion: Religion
  data: InviteData
  watermark?: boolean
  skipReveal?: boolean
}

export default function TemplateRenderer({ templateId, religion, data, watermark = false, skipReveal = false }: Props) {
  const variant = getVariant(templateId)

  if (variant?.kind === 'poster') {
    return <PosterTemplate religion={religion} data={data} backgroundImage={variant.backgroundImage} accent={variant.accent} watermark={watermark} />
  }

  if (templateId === 'custom' && data.photoUrl) {
    return (
      <PosterTemplate
        religion={religion}
        data={data}
        backgroundImage={data.photoUrl}
        accent={{ ink: '#2a2420', accent: '#8B1A1A', gold: '#C9A84C', cardBg: '#FFF8EC' }}
        watermark={watermark}
      />
    )
  }

  return <InviteTemplate religion={religion} data={data} watermark={watermark} skipReveal={skipReveal} />
}
