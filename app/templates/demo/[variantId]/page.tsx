import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getVariant, TEMPLATE_VARIANTS } from '@/lib/templates/posterVariants'
import TemplateRenderer from '@/components/templates/TemplateRenderer'
import { DEFAULT_INVITE_DATA } from '@/lib/templates/invites'
import type { InviteData } from '@/lib/templates/types'

export function generateStaticParams() {
  return TEMPLATE_VARIANTS.map((v) => ({ variantId: v.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ variantId: string }> }): Promise<Metadata> {
  const { variantId } = await params
  const variant = getVariant(variantId)
  return { title: variant ? `${variant.label} — Demo` : 'Demo', robots: { index: false, follow: false } }
}

export default async function DemoPage({
  params,
  searchParams,
}: {
  params: Promise<{ variantId: string }>
  searchParams: Promise<{ skip?: string }>
}) {
  const { variantId } = await params
  const { skip } = await searchParams
  const variant = getVariant(variantId)
  if (!variant) notFound()

  const data: InviteData = {
    ...DEFAULT_INVITE_DATA,
    brideName: variant.demo.brideName,
    groomName: variant.demo.groomName,
    date: variant.demo.date,
    time: variant.demo.time,
    venue: variant.demo.venue,
    venueCity: variant.demo.venueCity,
    colorPresetId: variant.kind === 'envelope' ? variant.colorPresetId : '',
  }

  // `?skip=1` jumps straight past the sealed-envelope intro (which looks
  // near-identical across templates — same gradient/envelope shape, just
  // recolored) so storefront previews immediately show each template's
  // actual distinguishing background/layout instead of a generic screen.
  return <TemplateRenderer templateId={variant.id} religion={variant.religion} data={data} watermark={false} skipReveal={skip === '1'} />
}
