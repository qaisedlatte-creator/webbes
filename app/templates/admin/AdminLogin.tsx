'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/templates/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.error || 'Incorrect password')
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#f7f5f0' }}>
      <div className="w-full max-w-sm bg-white rounded-xl border border-black/8 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold mb-2">Webbes</p>
        <h1 style={{ fontFamily: "'Syne', sans-serif" }} className="text-xl font-bold text-black mb-6">
          Admin
        </h1>

        {!configured ? (
          <p className="text-sm text-black/50">
            Admin login isn't configured yet — set the <code className="text-xs bg-black/5 px-1 py-0.5 rounded">ADMIN_PASSWORD</code> environment variable.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              autoFocus
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
              style={{ background: '#2563EB' }}
            >
              {loading ? 'Checking…' : 'Enter'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
