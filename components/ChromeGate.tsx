'use client'

import { usePathname } from 'next/navigation'

/**
 * The /templates invite builder renders full-bleed, chrome-less pages with
 * their own fonts/colors — hide the main site Nav/Footer there instead of
 * forking the root layout.
 */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/templates')) return null
  return <>{children}</>
}
