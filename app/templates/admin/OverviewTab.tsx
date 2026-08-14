'use client'

import { useEffect, useState } from 'react'
import type { AddonStats, BestSeller, FunnelStats, RevenueStats } from '@/lib/templates/invites'

interface StatsResponse {
  range: { key: string; from: string; to: string }
  revenue: RevenueStats
  bestSellers: BestSeller[]
  funnel: FunnelStats
  addons: AddonStats
  recommendations: string[]
}

const RANGE_OPTIONS: { key: string; label: string }[] = [
  { key: '1d', label: 'Today' },
  { key: '7d', label: '7 days' },
  { key: '30d', label: '1 month' },
  { key: '90d', label: '3 months' },
  { key: '1y', label: '1 year' },
  { key: 'custom', label: 'Custom' },
]

function formatINR(paise: number): string {
  return `₹${Math.round(paise / 100).toLocaleString('en-IN')}`
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export default function OverviewTab() {
  const [rangeKey, setRangeKey] = useState('7d')
  const [customFrom, setCustomFrom] = useState(todayISO())
  const [customTo, setCustomTo] = useState(todayISO())
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (rangeKey === 'custom' && (!customFrom || !customTo)) return

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const params = new URLSearchParams({ range: rangeKey })
    if (rangeKey === 'custom') {
      params.set('from', customFrom)
      params.set('to', customTo)
    }

    fetch(`/api/templates/admin/stats?${params.toString()}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load stats')
        return res.json()
      })
      .then((json) => setStats(json))
      .catch((err) => {
        if (err.name !== 'AbortError') setError('Could not load stats')
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [rangeKey, customFrom, customTo])

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {RANGE_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setRangeKey(opt.key)}
            className="text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors"
            style={
              rangeKey === opt.key
                ? { background: '#2563EB', color: '#fff' }
                : { background: '#fff', color: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,0,0,0.1)' }
            }
          >
            {opt.label}
          </button>
        ))}
        {rangeKey === 'custom' && (
          <div className="flex items-center gap-2 ml-1">
            <input
              type="date"
              value={customFrom}
              max={customTo}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-black/10 bg-white"
            />
            <span className="text-xs text-black/30">to</span>
            <input
              type="date"
              value={customTo}
              min={customFrom}
              max={todayISO()}
              onChange={(e) => setCustomTo(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-black/10 bg-white"
            />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {!stats ? (
        <p className="text-sm text-black/40 py-8">{loading ? 'Loading…' : 'No data'}</p>
      ) : (
        <div style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 150ms' }}>
          {/* Revenue cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-black/8 p-5">
              <p className="text-xs uppercase tracking-wide text-black/40 font-semibold mb-1.5">Revenue</p>
              <p style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl font-bold text-black">
                {formatINR(stats.revenue.totalPaise)}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-black/8 p-5">
              <p className="text-xs uppercase tracking-wide text-black/40 font-semibold mb-1.5">Orders</p>
              <p style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl font-bold text-black">
                {stats.revenue.orderCount}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-black/8 p-5">
              <p className="text-xs uppercase tracking-wide text-black/40 font-semibold mb-1.5">Avg. order value</p>
              <p style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl font-bold text-black">
                {stats.revenue.orderCount ? formatINR(stats.revenue.avgOrderPaise) : '—'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Funnel */}
            <div className="bg-white rounded-xl border border-black/8 p-5">
              <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-sm font-bold text-black mb-4">
                Where people get stuck
              </h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Style selected', count: stats.funnel.styleSelected, color: '#94a3b8' },
                  { label: 'Contact captured', count: stats.funnel.contactCaptured, color: '#2563EB' },
                  { label: 'Customized', count: stats.funnel.customized, color: '#D4AF37' },
                  { label: 'Paid', count: stats.funnel.paid, color: '#166534' },
                ].map((stage) => {
                  const pct = stats.funnel.styleSelected ? Math.round((stage.count / stats.funnel.styleSelected) * 100) : 0
                  return (
                    <div key={stage.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-black/60">{stage.label}</span>
                        <span className="font-semibold text-black">
                          {stage.count} <span className="text-black/35 font-normal">({pct}%)</span>
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: stage.color }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {stats.funnel.byStyle.length > 0 && (
                <div className="mt-5 pt-4 border-t border-black/5">
                  <p className="text-xs text-black/40 mb-2.5">By style</p>
                  <div className="space-y-1.5">
                    {stats.funnel.byStyle.slice(0, 6).map((s) => {
                      const convPct = s.styleSelected ? Math.round((s.paid / s.styleSelected) * 100) : 0
                      return (
                        <div key={s.key} className="flex items-center justify-between text-xs">
                          <span className="text-black/60 truncate pr-2">{s.label}</span>
                          <span className="text-black/40 whitespace-nowrap">
                            {s.styleSelected} selected · {s.paid} paid ({convPct}%)
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Best sellers */}
            <div className="bg-white rounded-xl border border-black/8 p-5">
              <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-sm font-bold text-black mb-4">
                Best sellers
              </h3>
              {stats.bestSellers.length === 0 ? (
                <p className="text-xs text-black/40">No paid orders in this period.</p>
              ) : (
                <div className="space-y-3">
                  {stats.bestSellers.slice(0, 6).map((s, i) => {
                    const maxOrders = stats.bestSellers[0].orders
                    const pct = maxOrders ? Math.round((s.orders / maxOrders) * 100) : 0
                    return (
                      <div key={s.key}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-black/70 truncate pr-2">
                            {i === 0 && '🏆 '}
                            {s.label}
                          </span>
                          <span className="font-semibold text-black whitespace-nowrap">
                            {s.orders} order{s.orders === 1 ? '' : 's'} · {formatINR(s.revenuePaise)}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#D4AF37' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl border border-black/8 p-5">
            <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-sm font-bold text-black mb-4">
              How to improve
            </h3>
            <ul className="space-y-2.5">
              {stats.recommendations.map((tip, i) => (
                <li key={i} className="text-xs text-black/65 leading-relaxed flex gap-2">
                  <span className="text-black/25">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
