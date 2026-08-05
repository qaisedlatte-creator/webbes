'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { stagger, fadeUp } from '@/lib/templates/animations'
import type { ColorPreset } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'

interface Props {
  inviteId: string
  theme: ColorPreset
}

export default function RSVP({ inviteId, theme }: Props) {
  const [guestName, setGuestName] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null)
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState('')
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')

  const submit = async () => {
    if (!guestName.trim() || attending === null) return
    setState('saving')
    try {
      const res = await fetch('/api/templates/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteId, guestName, attending: attending === 'yes', guestCount, message }),
      })
      if (!res.ok) throw new Error()
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <section id="rsvp" className="relative py-10 md:py-16 overflow-hidden">
      <div className="relative z-10 max-w-lg mx-auto px-6 md:px-12">
        <motion.div
          className="p-8 md:p-10 rounded-[18px]"
          style={{ background: withAlpha(theme.cardBg, 0.92), border: `1px solid ${withAlpha(theme.gold, 0.22)}`, boxShadow: `0 8px 40px ${withAlpha(theme.accentDarkest, 0.12)}` }}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.p variants={fadeUp} className="tracking-[0.32em] text-xs uppercase text-center mb-2" style={{ fontFamily: 'var(--invite-label)', color: theme.label, fontWeight: 300 }}>
            RSVP
          </motion.p>
          <motion.h3 variants={fadeUp} className="text-center mb-6" style={{ fontFamily: 'var(--invite-heading)', fontSize: '1.5rem', color: theme.ink }}>
            Will you join us?
          </motion.h3>

          {state === 'done' ? (
            <motion.p variants={fadeUp} className="text-center italic" style={{ fontFamily: 'var(--invite-serif)', color: theme.accent }}>
              Thank you, {guestName}! Your RSVP has been recorded.
            </motion.p>
          ) : (
            <motion.div variants={fadeUp} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ border: `1px solid ${withAlpha(theme.gold, 0.35)}`, background: 'transparent', color: theme.ink }}
              />

              <div className="flex gap-2">
                {(['yes', 'no'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setAttending(v)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    style={
                      attending === v
                        ? { background: theme.accent, color: theme.cardBg }
                        : { background: 'transparent', color: theme.ink, border: `1px solid ${withAlpha(theme.gold, 0.35)}` }
                    }
                  >
                    {v === 'yes' ? 'Joyfully accept' : "Can't make it"}
                  </button>
                ))}
              </div>

              {attending === 'yes' && (
                <div className="flex items-center justify-between">
                  <label className="text-sm" style={{ color: withAlpha(theme.ink, 0.7) }}>Number of guests</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                    className="w-16 px-2 py-1.5 rounded-lg text-sm text-center"
                    style={{ border: `1px solid ${withAlpha(theme.gold, 0.35)}`, background: 'transparent', color: theme.ink }}
                  />
                </div>
              )}

              <textarea
                placeholder="Message for the couple (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-lg text-sm resize-none"
                style={{ border: `1px solid ${withAlpha(theme.gold, 0.35)}`, background: 'transparent', color: theme.ink }}
              />

              {state === 'error' && <p className="text-xs text-center" style={{ color: theme.accent }}>Something went wrong — try again.</p>}

              <button
                onClick={submit}
                disabled={state === 'saving' || !guestName.trim() || attending === null}
                className="w-full py-3 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02] disabled:opacity-40"
                style={{ background: theme.accent, color: theme.cardBg }}
              >
                {state === 'saving' ? 'Sending…' : 'Send RSVP'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
