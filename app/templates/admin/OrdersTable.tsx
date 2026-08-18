'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { InviteRecord } from '@/lib/templates/types'
import { styleLabel, displayOrderNumber } from '@/lib/templates/display'
import DeleteOrderButton from './DeleteOrderButton'

const SITE_ORIGIN = 'https://www.webbes.in'

function formatRelative(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function formatINR(paise: number): string {
  return `₹${Math.round(paise / 100).toLocaleString('en-IN')}`
}

type Filter = 'all' | 'paid' | 'pending'

export default function OrdersTable({ orders }: { orders: InviteRecord[] }) {
  const router = useRouter()
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'all') return orders
    return orders.filter((o) => (filter === 'paid' ? o.status === 'paid' : o.status !== 'paid'))
  }, [orders, filter])

  const paidCount = orders.filter((o) => o.status === 'paid').length
  const pendingCount = orders.length - paidCount

  const changeFilter = (f: Filter) => {
    setFilter(f)
    setSelected(new Set())
  }

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const allVisibleSelected = filtered.length > 0 && filtered.every((o) => selected.has(o.id))
  const toggleAllVisible = () => {
    setSelected((prev) => {
      if (allVisibleSelected) {
        const next = new Set(prev)
        filtered.forEach((o) => next.delete(o.id))
        return next
      }
      const next = new Set(prev)
      filtered.forEach((o) => next.add(o.id))
      return next
    })
  }

  const handleDeleteSelected = async () => {
    setDeleting(true)
    setError(null)
    try {
      const res = await fetch('/api/templates/admin/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selected) }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.error || 'Failed to delete')
      }
      setSelected(new Set())
      setConfirming(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {([
            ['all', `All (${orders.length})`],
            ['paid', `Paid (${paidCount})`],
            ['pending', `Pending (${pendingCount})`],
          ] as [Filter, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => changeFilter(key)}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors"
              style={
                filter === key
                  ? { background: '#2563EB', color: '#fff' }
                  : { background: '#fff', color: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,0,0,0.1)' }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {selected.size > 0 && (
          <button
            onClick={() => setConfirming(true)}
            className="text-xs font-semibold px-3.5 py-1.5 rounded-full text-red-700 border border-red-200 hover:bg-red-50"
          >
            Delete selected ({selected.size})
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-black/40 text-center py-16 bg-white rounded-xl border border-black/8">No orders in this view.</p>
      ) : (
        <div className="bg-white rounded-xl border border-black/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/8 text-left text-xs text-black/40 uppercase tracking-wide">
                  <th className="px-5 py-3 font-semibold w-8">
                    <input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} className="w-4 h-4" aria-label="Select all visible orders" />
                  </th>
                  <th className="px-5 py-3 font-semibold">Order #</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Style</th>
                  <th className="px-5 py-3 font-semibold">Couple / details</th>
                  <th className="px-5 py-3 font-semibold">WhatsApp</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((invite) => {
                  const isPaid = invite.status === 'paid'
                  const label = styleLabel(invite.religion, invite.templateId)
                  const previewUrl = `${SITE_ORIGIN}/templates/preview/${invite.id}`
                  return (
                    <tr key={invite.id} className="border-b border-black/5 last:border-b-0 align-top">
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selected.has(invite.id)}
                          onChange={() => toggleOne(invite.id)}
                          className="w-4 h-4"
                          aria-label={`Select order ${displayOrderNumber(invite)}`}
                        />
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-black/60 whitespace-nowrap">{displayOrderNumber(invite)}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={isPaid ? { background: '#DCFCE7', color: '#166534' } : { background: '#FEF3C7', color: '#92400E' }}
                        >
                          {isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-black whitespace-nowrap font-medium">
                        {invite.amountPaidPaise != null ? formatINR(invite.amountPaidPaise) : '—'}
                      </td>
                      <td className="px-5 py-4 text-black/70 whitespace-nowrap">{label}</td>
                      <td className="px-5 py-4 text-black/70">
                        <p className="font-medium text-black">
                          {invite.data.brideName || '—'} &amp; {invite.data.groomName || '—'}
                        </p>
                        <p className="text-xs text-black/40 mt-0.5">
                          {invite.data.date || 'No date'} · {invite.data.venue || 'No venue'}
                          {invite.data.venueCity ? `, ${invite.data.venueCity}` : ''}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-black/70 whitespace-nowrap">{invite.whatsapp || '—'}</td>
                      <td className="px-5 py-4 text-black/70 whitespace-nowrap">
                        {isPaid && invite.paidAt ? `Paid ${formatRelative(invite.paidAt)}` : formatRelative(invite.updatedAt)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-black/40 hover:text-black underline">
                            View
                          </a>
                          <DeleteOrderButton id={invite.id} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="w-full max-w-sm bg-white rounded-xl border border-black/8 p-6">
            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-lg font-bold text-black mb-2">
              Delete {selected.size} order{selected.size === 1 ? '' : 's'}?
            </h2>
            <p className="text-sm text-black/50 mb-4">This permanently deletes the selected orders and their RSVPs. It cannot be undone.</p>
            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setConfirming(false)
                  setError(null)
                }}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-black/60 border border-black/10 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSelected}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
                style={{ background: '#DC2626' }}
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
