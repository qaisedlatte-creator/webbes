import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

const IMAGE_MAX_BYTES = 8 * 1024 * 1024
const AUDIO_MAX_BYTES = 15 * 1024 * 1024
const IMAGE_TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }
const AUDIO_TYPES: Record<string, string> = { 'audio/mpeg': 'mp3', 'audio/mp4': 'm4a', 'audio/wav': 'wav', 'audio/x-m4a': 'm4a' }

export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Upload is not configured yet' }, { status: 503 })
  }

  const form = await req.formData()
  const file = form.get('file')
  const kind = form.get('kind') === 'audio' ? 'audio' : 'image'

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const typeMap = kind === 'audio' ? AUDIO_TYPES : IMAGE_TYPES
  const maxBytes = kind === 'audio' ? AUDIO_MAX_BYTES : IMAGE_MAX_BYTES
  const ext = typeMap[file.type]

  if (!ext) {
    return NextResponse.json(
      { error: kind === 'audio' ? 'Only MP3, M4A, or WAV audio files are allowed' : 'Only JPEG, PNG, or WebP images are allowed' },
      { status: 400 },
    )
  }
  if (file.size > maxBytes) {
    return NextResponse.json({ error: `File must be under ${maxBytes / (1024 * 1024)}MB` }, { status: 400 })
  }

  const key = `invites/${kind}/${crypto.randomUUID()}.${ext}`

  const blob = await put(key, file, { access: 'public', contentType: file.type })
  return NextResponse.json({ url: blob.url })
}
