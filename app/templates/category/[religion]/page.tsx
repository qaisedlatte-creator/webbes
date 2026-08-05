import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RELIGIONS } from '@/lib/templates/religion-themes'
import { getVariantsByReligion } from '@/lib/templates/posterVariants'
import type { Religion } from '@/lib/templates/types'
import CategoryClient from './CategoryClient'

const VALID: Religion[] = ['islamic', 'christian', 'hindu']

export async function generateMetadata({ params }: { params: Promise<{ religion: string }> }): Promise<Metadata> {
  const { religion } = await params
  const label = RELIGIONS.find((r) => r.id === religion)?.label ?? religion
  return {
    title: `${label} Wedding Invitation Templates — Webbes`,
    robots: { index: true, follow: true },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ religion: string }> }) {
  const { religion } = await params
  if (!VALID.includes(religion as Religion)) notFound()

  const r = religion as Religion
  const variants = getVariantsByReligion(r)
  const label = RELIGIONS.find((x) => x.id === r)?.label ?? r

  return <CategoryClient religion={r} label={label} variants={variants} />
}
