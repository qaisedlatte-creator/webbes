'use client'

import { usePathname } from 'next/navigation'

// The builder/preview/final invite pages render full-bleed with their own
// fonts/colors — hide the main site Nav/Footer there. The /templates gallery
// itself keeps the normal site chrome so it doesn't feel like a bolted-on app.
const CHROMELESS_PREFIXES = ['/templates/build', '/templates/preview', '/templates/invite', '/templates/demo', '/templates/share']

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname && CHROMELESS_PREFIXES.some((p) => pathname.startsWith(p))) return null
  return <>{children}</>
}
