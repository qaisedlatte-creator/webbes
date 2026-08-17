'use client'

import PhotoAlbumField from '@/components/templates/wizard/PhotoAlbumField'
import { RSVP_ADDON_PRICE_INR, SONG_ADDON_PRICE_INR, formatINR } from '@/lib/templates/pricing'
import type { InviteData } from '@/lib/templates/types'

interface Props {
  data: InviteData
  update: (patch: Partial<InviteData>) => void
  kind: 'poster' | 'envelope' | 'custom'
  heroSubtitlePlaceholder: string
  closingLinePlaceholder: string
  footerBlessingPlaceholder: string
  uploading: boolean
  uploadingSong: boolean
  onUploadPhoto: (file: File) => void
  onUploadSong: (file: File) => void
  rsvpEnabled: boolean
  setRsvpEnabled: (v: boolean) => void
  songEnabled: boolean
  setSongEnabled: (v: boolean) => void
}

const inputClass = 'w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]'

export default function StoryPhotosTab({
  data,
  update,
  kind,
  heroSubtitlePlaceholder,
  closingLinePlaceholder,
  footerBlessingPlaceholder,
  uploading,
  uploadingSong,
  onUploadPhoto,
  onUploadSong,
  rsvpEnabled,
  setRsvpEnabled,
  songEnabled,
  setSongEnabled,
}: Props) {
  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <section>
        <h2 className="text-sm font-semibold text-black/80 mb-1">Welcome message</h2>
        <p className="text-xs text-black/40 mb-3">The line guests see right under your names — leave blank for this style's default.</p>
        <textarea
          placeholder={heroSubtitlePlaceholder}
          value={data.heroSubtitle}
          onChange={(e) => update({ heroSubtitle: e.target.value })}
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </section>

      {/* Cover photo */}
      <section>
        <h2 className="text-sm font-semibold text-black/80 mb-1">Cover photo</h2>
        {kind === 'custom' && !data.photoUrl && <p className="text-xs text-black/40 mb-3">Upload your own background photo to build this invite on top of.</p>}
        {kind === 'envelope' && <p className="text-xs text-black/40 mb-3">Optional ambient photo behind your invite.</p>}
        {data.photoUrl ? (
          <div className="relative rounded-lg overflow-hidden border border-black/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.photoUrl} alt="" className="w-full h-40 object-cover" />
            <button onClick={() => update({ photoUrl: null })} className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
              Remove
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center h-24 rounded-lg border border-dashed border-black/20 text-sm text-black/40 cursor-pointer hover:border-black/40">
            {uploading ? 'Uploading…' : 'Click to upload a photo'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) onUploadPhoto(f)
              }}
            />
          </label>
        )}
      </section>

      {/* Photo album */}
      <PhotoAlbumField
        enabled={data.photoAlbumEnabled}
        photos={data.photoAlbum}
        onToggle={(v) => update({ photoAlbumEnabled: v })}
        onChange={(photos) => update({ photoAlbum: photos })}
      />

      {/* RSVP add-on */}
      <section>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-black/80">RSVP + guest dashboard</h2>
          <span className="text-xs font-semibold" style={{ color: '#2563EB' }}>+{formatINR(RSVP_ADDON_PRICE_INR)}</span>
        </div>
        <p className="text-xs text-black/40 mb-3">Guests can RSVP right on the invite. You get a private dashboard link to see who's coming.</p>
        <label className="flex items-center justify-between px-3.5 py-3 rounded-lg border border-black/10 mb-3">
          <span className="text-sm text-black/70">Enable RSVP</span>
          <input type="checkbox" checked={rsvpEnabled} onChange={(e) => setRsvpEnabled(e.target.checked)} className="w-4 h-4" />
        </label>
        {rsvpEnabled && (
          <div>
            <label className="text-xs text-black/45 mb-1.5 block">RSVP card style</label>
            <div className="grid grid-cols-3 gap-2">
              {(['frosted', 'outline', 'solid'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => update({ rsvpStyle: s })}
                  className={`py-2 rounded-lg text-xs font-medium border capitalize transition-colors ${
                    data.rsvpStyle === s ? 'border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]' : 'border-black/10 text-black/60 hover:border-black/20'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Story wording */}
      <section>
        <h2 className="text-sm font-semibold text-black/80 mb-1">Your story</h2>
        <p className="text-xs text-black/40 mb-3">The closing lines guests read after the date reveal and in the footer.</p>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-black/45 mb-1 block">Closing line</label>
            <input type="text" placeholder={closingLinePlaceholder} value={data.closingLine} onChange={(e) => update({ closingLine: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-black/45 mb-1 block">Footer blessing</label>
            <textarea
              placeholder={footerBlessingPlaceholder}
              value={data.footerBlessing}
              onChange={(e) => update({ footerBlessing: e.target.value })}
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </section>

      {/* Effects */}
      <section>
        <h2 className="text-sm font-semibold text-black/80 mb-3">Effects</h2>
        <label className="flex items-center justify-between px-3.5 py-3 rounded-lg border border-black/10">
          <span className="text-sm text-black/70">Falling petals</span>
          <input type="checkbox" checked={data.showPetals} onChange={(e) => update({ showPetals: e.target.checked })} className="w-4 h-4" />
        </label>
      </section>

      {/* Music add-on */}
      <section>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-black/80">Your own song</h2>
          <span className="text-xs font-semibold" style={{ color: '#2563EB' }}>+{formatINR(SONG_ADDON_PRICE_INR)}</span>
        </div>
        <label className="flex items-center justify-between px-3.5 py-3 rounded-lg border border-black/10 mb-3">
          <span className="text-sm text-black/70">Use a custom track instead of the default</span>
          <input type="checkbox" checked={songEnabled} onChange={(e) => setSongEnabled(e.target.checked)} className="w-4 h-4" />
        </label>
        {songEnabled &&
          (data.audioUrl ? (
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-black/10">
              <span className="text-xs text-black/60 truncate">Song uploaded</span>
              <button onClick={() => update({ audioUrl: null })} className="text-xs text-black/40 hover:text-black">
                Remove
              </button>
            </div>
          ) : (
            <label className="flex items-center justify-center h-16 rounded-lg border border-dashed border-black/20 text-sm text-black/40 cursor-pointer hover:border-black/40">
              {uploadingSong ? 'Uploading…' : 'Click to upload MP3 / M4A / WAV'}
              <input
                type="file"
                accept="audio/mpeg,audio/mp4,audio/wav,audio/x-m4a"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) onUploadSong(f)
                }}
              />
            </label>
          ))}
      </section>

      {/* Sections — advanced visibility toggles */}
      <section>
        <h2 className="text-sm font-semibold text-black/80 mb-1">Sections</h2>
        <p className="text-xs text-black/40 mb-3">Turn off anything you don't need on your invite.</p>
        <div className="space-y-2">
          {(
            [
              ['showWeddingDetails', 'Date & time reveal card'],
              ['showCountdown', 'Countdown'],
              ['showLocation', 'Venue & map'],
              ['showFooter', 'Closing blessing footer'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between px-3.5 py-3 rounded-lg border border-black/10">
              <span className="text-sm text-black/70">{label}</span>
              <input type="checkbox" checked={data[key]} onChange={(e) => update({ [key]: e.target.checked })} className="w-4 h-4" />
            </label>
          ))}
        </div>
      </section>
    </div>
  )
}
