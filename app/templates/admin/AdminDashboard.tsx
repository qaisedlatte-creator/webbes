'use client'

import { useState } from 'react'
import type { InviteRecord } from '@/lib/templates/types'
import LogoutButton from './LogoutButton'
import ClearAllButton from './ClearAllButton'
import OverviewTab from './OverviewTab'
import OrdersTable from './OrdersTable'
import AbandonedCartsTable from './AbandonedCartsTable'

type Tab = 'overview' | 'orders' | 'abandoned'

export default function AdminDashboard({
  drafts,
  orders,
  whatsappConfigured,
}: {
  drafts: InviteRecord[]
  orders: InviteRecord[]
  whatsappConfigured: boolean
}) {
  const [tab, setTab] = useState<Tab>('overview')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'orders', label: `Orders (${orders.length})` },
    { key: 'abandoned', label: `Abandoned carts (${drafts.length})` },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#f7f5f0' }}>
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold mb-2">Webbes Admin</p>
            <h1 style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl font-bold text-black">
              Templates dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ClearAllButton />
            <LogoutButton />
          </div>
        </div>

        <div className="flex items-center gap-1 mb-8 border-b border-black/8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="text-sm font-semibold px-4 py-2.5 -mb-px border-b-2 transition-colors"
              style={
                tab === t.key
                  ? { borderColor: '#2563EB', color: '#2563EB' }
                  : { borderColor: 'transparent', color: 'rgba(0,0,0,0.45)' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && <OverviewTab />}
        {tab === 'orders' && <OrdersTable orders={orders} />}
        {tab === 'abandoned' && <AbandonedCartsTable drafts={drafts} whatsappConfigured={whatsappConfigured} />}
      </div>
    </div>
  )
}
