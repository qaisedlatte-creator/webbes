import { TEMPLATE_VARIANTS, type TemplateVariant } from '@/lib/templates/posterVariants'
import { RELIGIONS } from '@/lib/templates/religion-themes'
import type { Religion } from '@/lib/templates/types'

export type GridItem =
  | { kind: 'variant'; religion: Religion; variant: TemplateVariant }
  | { kind: 'custom'; religion: Religion; religionLabel: string }

/** Every variant, plus one "upload your own photo" tile per religion — mirrors what CategoryClient shows per-religion. */
export function buildGridItems(): GridItem[] {
  const items: GridItem[] = TEMPLATE_VARIANTS.map((variant) => ({ kind: 'variant', religion: variant.religion, variant }))
  for (const r of RELIGIONS) {
    items.push({ kind: 'custom', religion: r.id, religionLabel: r.label })
  }
  return items
}

export function filterByReligion(items: GridItem[], religion: Religion | 'all'): GridItem[] {
  if (religion === 'all') return items
  return items.filter((item) => item.religion === religion)
}
