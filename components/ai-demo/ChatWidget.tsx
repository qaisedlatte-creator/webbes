'use client'

import { useEffect, useRef, useState } from 'react'
import { GraduationCap, Home, Stethoscope, type LucideIcon } from 'lucide-react'
import { PERSONAS, type DemoPersona } from '@/lib/ai-demo/personas'

const PERSONA_ICONS: Record<string, LucideIcon> = {
  'study-abroad': GraduationCap,
  rentals: Home,
  clinic: Stethoscope,
}

interface Message {
  role: 'user' | 'model'
  text: string
  at: number
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3.5 py-2.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-black/30"
          style={{ animation: `ai-demo-bounce 1.1s ease-in-out ${i * 0.15}s infinite` }}
        />
      ))}
    </div>
  )
}

function PersonaPicker({ onPick }: { onPick: (p: DemoPersona) => void }) {
  return (
    <div className="p-6 md:p-8">
      <p className="text-white/40 text-[11px] uppercase tracking-[0.18em] font-semibold mb-1">Try it yourself</p>
      <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-white text-xl font-bold mb-2">
        Pick who you&apos;re messaging
      </h3>
      <p className="text-white/45 text-[13px] mb-6 leading-relaxed">
        This is a real, working AI agent — the same kind we build for clients. Chat with it exactly like a customer would on WhatsApp.
      </p>
      <div className="grid gap-3">
        {PERSONAS.map((p) => {
          const Icon = PERSONA_ICONS[p.id]
          return (
            <button
              key={p.id}
              onClick={() => onPick(p)}
              className="flex items-center gap-3.5 text-left p-4 rounded-2xl border transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
            >
              <span className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white" style={{ background: p.accent }}>
                <Icon size={20} strokeWidth={2} />
              </span>
              <span>
                <span className="block text-white font-semibold text-[14px]">{p.niche}</span>
                <span className="block text-white/40 text-[12.5px] mt-0.5">{p.tagline}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [persona, setPersona] = useState<DemoPersona | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  const pickPersona = (p: DemoPersona) => {
    setPersona(p)
    setMessages([{ role: 'model', text: p.welcomeMessage, at: Date.now() }])
    setError(null)
  }

  const switchPersona = () => {
    setPersona(null)
    setMessages([])
    setInput('')
    setError(null)
  }

  const send = async (text: string) => {
    if (!persona || !text.trim() || sending) return
    const next: Message[] = [...messages, { role: 'user', text: text.trim(), at: Date.now() }]
    setMessages(next)
    setInput('')
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/ai-demo/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personaId: persona.id, messages: next.map((m) => ({ role: m.role, text: m.text })) }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Something went wrong')
      setMessages((cur) => [...cur, { role: 'model', text: json.reply, at: Date.now() }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong — please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div
      className="w-full max-w-md mx-auto rounded-[28px] overflow-hidden flex flex-col"
      style={{ background: '#111315', border: '1px solid rgba(255,255,255,0.1)', height: 560, boxShadow: '0 30px 80px rgba(0,0,0,0.45)' }}
    >
      <style>{`
        @keyframes ai-demo-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-4px); opacity: 1; } }
      `}</style>

      {!persona ? (
        <PersonaPicker onPick={pickPersona} />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ background: '#1a1d20', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={switchPersona} aria-label="Switch persona" className="text-white/40 hover:text-white text-lg leading-none px-1">
              ‹
            </button>
            <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: persona.accent }}>
              {(() => {
                const Icon = PERSONA_ICONS[persona.id]
                return <Icon size={15} strokeWidth={2} />
              })()}
            </span>
            <div className="min-w-0">
              <p className="text-white text-[13.5px] font-semibold truncate">{persona.agentName}</p>
              <p className="text-white/35 text-[11px] truncate">{persona.niche}</p>
            </div>
            <span className="ml-auto text-[10px] font-semibold px-2 py-1 rounded-full text-white/70" style={{ background: 'rgba(255,255,255,0.08)' }}>
              live demo
            </span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-4 space-y-2.5" style={{ background: '#0d0f10' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[80%]">
                  <div
                    className="px-3.5 py-2.5 text-[13.5px] leading-snug"
                    style={
                      m.role === 'user'
                        ? { background: persona.accent, color: '#fff', borderRadius: '16px 16px 4px 16px' }
                        : { background: '#22262a', color: 'rgba(255,255,255,0.9)', borderRadius: '16px 16px 16px 4px' }
                    }
                  >
                    {m.text}
                  </div>
                  <p className={`text-[10px] text-white/25 mt-1 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>{formatTime(m.at)}</p>
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div style={{ background: '#22262a', borderRadius: '16px 16px 16px 4px' }}>
                  <TypingDots />
                </div>
              </div>
            )}
            {error && <p className="text-red-400 text-[12px] text-center py-2">{error}</p>}

            {messages.length === 1 && !sending && (
              <div className="flex flex-wrap gap-2 pt-2">
                {persona.quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-[12px] text-white/70 px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 px-3 py-3 shrink-0"
            style={{ background: '#1a1d20', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              maxLength={500}
              className="flex-1 bg-transparent text-white text-[13.5px] placeholder-white/30 outline-none px-3 py-2 rounded-full"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white disabled:opacity-40"
              style={{ background: persona.accent }}
              aria-label="Send message"
            >
              ➤
            </button>
          </form>
        </>
      )}
    </div>
  )
}
