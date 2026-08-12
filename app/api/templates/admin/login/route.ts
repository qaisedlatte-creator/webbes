import { NextRequest, NextResponse } from 'next/server'
import { checkAdminPassword, getSessionToken, ADMIN_COOKIE_NAME } from '@/lib/templates/admin-auth'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const password = (body as { password?: string }).password
  if (typeof password !== 'string' || !checkAdminPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = getSessionToken()
  if (!token) return NextResponse.json({ error: 'Admin login is not configured' }, { status: 503 })

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return res
}
