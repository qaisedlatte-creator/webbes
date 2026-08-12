import crypto from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE_NAME = 'webbes_admin_session'

/** Deterministic session token derived from ADMIN_PASSWORD — no server-side session storage needed, and it auto-invalidates whenever the password changes. */
function expectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return null
  return crypto.createHmac('sha256', password).update('webbes-templates-admin').digest('hex')
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD)
}

export function checkAdminPassword(password: string): boolean {
  const real = process.env.ADMIN_PASSWORD
  if (!real) return false
  const a = Buffer.from(password)
  const b = Buffer.from(real)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export function getSessionToken(): string | null {
  return expectedToken()
}

export async function isAdminAuthed(): Promise<boolean> {
  const expected = expectedToken()
  if (!expected) return false
  const store = await cookies()
  const token = store.get(ADMIN_COOKIE_NAME)?.value
  if (!token) return false
  const a = Buffer.from(token)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}
