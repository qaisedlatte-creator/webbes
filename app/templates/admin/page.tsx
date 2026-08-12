import type { Metadata } from 'next'
import { isAdminAuthed, isAdminConfigured } from '@/lib/templates/admin-auth'
import { getAbandonedDrafts } from '@/lib/templates/invites'
import { isWhatsAppConfigured } from '@/lib/templates/whatsapp'
import AdminLogin from './AdminLogin'
import AdminTable from './AdminTable'

export const metadata: Metadata = { title: 'Admin — Webbes', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const configured = isAdminConfigured()
  const authed = configured && (await isAdminAuthed())

  if (!authed) return <AdminLogin configured={configured} />

  const drafts = await getAbandonedDrafts()
  return <AdminTable drafts={drafts} whatsappConfigured={isWhatsAppConfigured()} />
}
