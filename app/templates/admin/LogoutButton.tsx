'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await fetch('/api/templates/admin/logout', { method: 'POST' })
        router.refresh()
      }}
      className="text-xs font-semibold text-black/50 hover:text-black"
    >
      Log out
    </button>
  )
}
