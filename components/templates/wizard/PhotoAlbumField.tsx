'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'

const MIN_RECOMMENDED = 4
const MAX_PHOTOS = 10

interface Props {
  enabled: boolean
  photos: string[]
  onToggle: (enabled: boolean) => void
  onChange: (photos: string[]) => void
}

export default function PhotoAlbumField({ enabled, photos, onToggle, onChange }: Props) {
  const [uploading, setUploading] = useState(false)

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const room = MAX_PHOTOS - photos.length
    const toUpload = Array.from(files).slice(0, room)
    if (toUpload.length === 0) return

    setUploading(true)
    try {
      const uploaded: string[] = []
      for (const file of toUpload) {
        const form = new FormData()
        form.append('file', file)
        form.append('kind', 'image')
        const res = await fetch('/api/templates/upload', { method: 'POST', body: form })
        const json = await res.json()
        if (res.ok && json.url) uploaded.push(json.url)
      }
      if (uploaded.length) onChange([...photos, ...uploaded])
    } finally {
      setUploading(false)
    }
  }

  const removeAt = (i: number) => onChange(photos.filter((_, idx) => idx !== i))

  return (
    <section>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-black/80">Photo album</h2>
      </div>
      <p className="text-xs text-black/40 mb-3">A gallery of {MIN_RECOMMENDED}–{MAX_PHOTOS} photos guests can browse on your invite.</p>
      <label className="flex items-center justify-between px-3.5 py-3 rounded-lg border border-black/10 mb-3">
        <span className="text-sm text-black/70">Enable photo album</span>
        <input type="checkbox" checked={enabled} onChange={(e) => onToggle(e.target.checked)} className="w-4 h-4" />
      </label>

      {enabled && (
        <div>
          {photos.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mb-3">
              {photos.map((src, i) => (
                <div key={src + i} className="relative rounded-md overflow-hidden border border-black/10" style={{ aspectRatio: '1 / 1' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeAt(i)}
                    aria-label="Remove photo"
                    className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] leading-none bg-black/60 text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {photos.length < MAX_PHOTOS && (
            <label className="flex flex-col items-center justify-center gap-1.5 h-20 rounded-lg border border-dashed border-black/20 text-sm text-black/40 cursor-pointer hover:border-black/40">
              <Upload size={16} />
              {uploading ? 'Uploading…' : `Add photos (${photos.length}/${MAX_PHOTOS})`}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>
          )}
          {photos.length > 0 && photos.length < MIN_RECOMMENDED && (
            <p className="text-[11px] text-amber-600 mt-2">Add at least {MIN_RECOMMENDED} photos for the best-looking album.</p>
          )}
        </div>
      )}
    </section>
  )
}
