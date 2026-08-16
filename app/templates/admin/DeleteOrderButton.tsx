'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteOrderButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!window.confirm('Delete this order? This cannot be undone.')) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/templates/admin/orders/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.error || 'Failed to delete')
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        onClick={handleDelete}
        disabled={loading}
        aria-label="Delete this order"
        className="text-black/30 hover:text-red-600 disabled:opacity-40 transition-colors"
      >
        <Trash2 size={14} />
      </button>
      {error && <span className="text-[11px] text-red-600">{error}</span>}
    </span>
  )
}
