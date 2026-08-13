'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClearAllButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const close = () => {
    setOpen(false)
    setConfirmText('')
    setError(null)
  }

  const handleClear = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/templates/admin/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: confirmText }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.error || 'Failed to clear')
      }
      close()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-semibold px-3.5 py-1.5 rounded-full text-red-700 border border-red-200 hover:bg-red-50"
      >
        Clear all test data
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="w-full max-w-sm bg-white rounded-xl border border-black/8 p-6">
            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-lg font-bold text-black mb-2">
              Delete every draft &amp; order?
            </h2>
            <p className="text-sm text-black/50 mb-4">
              This permanently deletes <strong>all</strong> invites — drafts and paid orders alike — plus their RSVPs. It cannot be undone.
              Type <strong>DELETE</strong> to confirm.
            </p>
            <input
              type="text"
              autoFocus
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm mb-3 focus:outline-none focus:border-red-400"
            />
            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
            <div className="flex gap-2">
              <button onClick={close} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-black/60 border border-black/10">
                Cancel
              </button>
              <button
                onClick={handleClear}
                disabled={confirmText !== 'DELETE' || loading}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
                style={{ background: '#DC2626' }}
              >
                {loading ? 'Deleting…' : 'Delete everything'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
