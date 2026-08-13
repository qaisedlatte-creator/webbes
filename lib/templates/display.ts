// Pure, client-safe display helpers — no Prisma import, so client components
// (OrdersTable, AbandonedCartsTable) can use these without pulling `pg` into
// the browser bundle.

import { RELIGIONS } from './religion-themes'
import { getVariant } from './posterVariants'
import type { Religion, InviteRecord } from './types'

export function styleLabel(religion: Religion, templateId: string): string {
  const religionLabel = RELIGIONS.find((r) => r.id === religion)?.label ?? religion
  const variant = getVariant(templateId)
  return variant ? `${religionLabel} · ${variant.label}` : religionLabel
}

/** Human-friendly order number: the real gateway orderId's tail when we have one (inv_<inviteId>_<timestamp>), else derived from the invite id so every row shows something stable. */
export function displayOrderNumber(invite: Pick<InviteRecord, 'id' | 'orderId'>): string {
  if (invite.orderId) {
    const parts = invite.orderId.split('_')
    const tail = parts.length === 3 ? parts[2] : invite.orderId
    return `WB-${tail.slice(-6)}`
  }
  return `WB-${invite.id.slice(-6).toUpperCase()}`
}
