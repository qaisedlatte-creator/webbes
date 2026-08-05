import type { Metadata } from 'next'
import { consumeShareToken } from '@/lib/templates/invites'
import TemplateRenderer from '@/components/templates/TemplateRenderer'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function SharePreviewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const invite = await consumeShareToken(token)

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center" style={{ background: '#f7f5f0' }}>
        <div>
          <p className="text-lg font-semibold text-black/70">This preview link isn't valid.</p>
          <p className="text-sm text-black/40 mt-2">It may have already been used, or the link is incorrect.</p>
        </div>
      </div>
    )
  }

  // Strip the core photo for stock-poster templates the same way the normal
  // preview does — this link is view-once, not a way around that gate.
  const sanitizedData = invite.templateId === 'custom' ? invite.data : { ...invite.data, photoUrl: null }

  return <TemplateRenderer templateId={invite.templateId} religion={invite.religion} data={sanitizedData} watermark />
}
