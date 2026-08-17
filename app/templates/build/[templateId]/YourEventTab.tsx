'use client'

import type { ColorPreset } from '@/lib/templates/types'
import type { InviteData } from '@/lib/templates/types'

interface Props {
  data: InviteData
  update: (patch: Partial<InviteData>) => void
  presets: ColorPreset[]
  showColorTheme: boolean
  eventLabelPlaceholder: string
}

const inputClass = 'w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#2563EB]'

export default function YourEventTab({ data, update, presets, showColorTheme, eventLabelPlaceholder }: Props) {
  return (
    <div className="space-y-8">
      {/* Names */}
      <section>
        <h2 className="text-sm font-semibold text-black/80 mb-3">Names</h2>
        <div className="space-y-3">
          <input type="text" placeholder="Bride's name" value={data.brideName} onChange={(e) => update({ brideName: e.target.value })} className={inputClass} />
          <input type="text" placeholder="Groom's name" value={data.groomName} onChange={(e) => update({ groomName: e.target.value })} className={inputClass} />
          <div className="grid grid-cols-2 gap-2">
            {(['brideFirst', 'groomFirst'] as const).map((v) => (
              <button
                key={v}
                onClick={() => update({ nameOrder: v })}
                className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                  data.nameOrder === v ? 'border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]' : 'border-black/10 text-black/60 hover:border-black/20'
                }`}
              >
                {v === 'brideFirst' ? "Bride's name first" : "Groom's name first"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ceremony type */}
      <section>
        <h2 className="text-sm font-semibold text-black/80 mb-1">Ceremony type</h2>
        <p className="text-xs text-black/40 mb-3">Shown as the badge on your invite — leave blank to use the default for this style.</p>
        <input type="text" placeholder={eventLabelPlaceholder} value={data.eventLabel} onChange={(e) => update({ eventLabel: e.target.value })} className={inputClass} />
      </section>

      {/* Parents' names */}
      <section>
        <h2 className="text-sm font-semibold text-black/80 mb-1">Parents' names</h2>
        <p className="text-xs text-black/40 mb-3">Optional — shown as "Daughter/Son of ..." on the invite.</p>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Bride's parents, e.g. Mr. & Mrs. Kumar"
            value={data.brideParents}
            onChange={(e) => update({ brideParents: e.target.value })}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Groom's parents, e.g. Mr. & Mrs. Nair"
            value={data.groomParents}
            onChange={(e) => update({ groomParents: e.target.value })}
            className={inputClass}
          />
        </div>
      </section>

      {/* Date & time */}
      <section>
        <h2 className="text-sm font-semibold text-black/80 mb-3">Event date &amp; time</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-black/45 mb-1 block">Date</label>
            <input type="date" value={data.date} onChange={(e) => update({ date: e.target.value })} className={inputClass} />
          </div>
          <input type="text" placeholder="Time, e.g. 4:00 PM – 7:00 PM" value={data.time} onChange={(e) => update({ time: e.target.value })} className={inputClass} />
          <div>
            <label className="text-xs text-black/45 mb-1 block">End date (optional — multi-day events)</label>
            <input type="date" value={data.endDate} onChange={(e) => update({ endDate: e.target.value })} className={inputClass} />
          </div>
        </div>
      </section>

      {/* Venue */}
      <section>
        <h2 className="text-sm font-semibold text-black/80 mb-3">Venue</h2>
        <div className="space-y-3">
          <input type="text" placeholder="Venue name" value={data.venue} onChange={(e) => update({ venue: e.target.value })} className={inputClass} />
          <input
            type="text"
            placeholder="Venue address (optional)"
            value={data.venueAddress}
            onChange={(e) => update({ venueAddress: e.target.value })}
            className={inputClass}
          />
          <input type="text" placeholder="City" value={data.venueCity} onChange={(e) => update({ venueCity: e.target.value })} className={inputClass} />
          <input
            type="url"
            placeholder="Paste Google Maps link (optional)"
            value={data.mapsUrl}
            onChange={(e) => update({ mapsUrl: e.target.value })}
            className={inputClass}
          />
          <p className="text-xs text-black/35 -mt-1">Leave blank and we'll build a map link from the venue + city instead.</p>
        </div>
      </section>

      {/* Color theme — only the flexible envelope template has this */}
      {showColorTheme && (
        <section>
          <h2 className="text-sm font-semibold text-black/80 mb-3">Color theme</h2>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => update({ colorPresetId: p.id })}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-colors ${
                  data.colorPresetId === p.id ? 'border-[#2563EB]' : 'border-black/10 hover:border-black/20'
                }`}
              >
                <span className="w-6 h-6 rounded-full shrink-0" style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.gold})` }} />
                <span className="text-xs font-medium text-black/70">{p.name}</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
