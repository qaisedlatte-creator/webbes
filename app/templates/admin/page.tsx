import type { Metadata } from 'next'
import { isAdminAuthed, isAdminConfigured } from '@/lib/templates/admin-auth'
import { getAbandonedDrafts, getAllInvites } from '@/lib/templates/invites'
import { isWhatsAppConfigured } from '@/lib/templates/whatsapp'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export const metadata: Metadata = { title: 'Admin — Webbes', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const configured = isAdminConfigured()
  const authed = configured && (await isAdminAuthed())

  if (!authed) return <AdminLogin configured={configured} />

  const [drafts, orders] = await Promise.all([getAbandonedDrafts(), getAllInvites()])
  return <AdminDashboard drafts={drafts} orders={orders} whatsappConfigured={isWhatsAppConfigured()} />
}
