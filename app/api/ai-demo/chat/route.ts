import { NextRequest, NextResponse } from 'next/server'
import { getPersona } from '@/lib/ai-demo/personas'
import { generateReply, GeminiError, MAX_MESSAGE_LENGTH, MAX_TURNS, type ChatTurn } from '@/lib/ai-demo/gemini'

export const runtime = 'nodejs'

interface ChatRequestBody {
  personaId?: string
  messages?: ChatTurn[]
}

// Powers the "try it yourself" persona demo on /ai-automation. Stateless —
// the client sends its own running transcript each turn, nothing is stored
// server-side. Deliberately isolated from everything under /api/templates.
export async function POST(req: NextRequest) {
  let body: ChatRequestBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const persona = getPersona(body.personaId || '')
  if (!persona) return NextResponse.json({ error: 'Unknown persona' }, { status: 400 })

  const messages = Array.isArray(body.messages) ? body.messages : []
  if (messages.length === 0) return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
  if (messages.length > MAX_TURNS * 2) return NextResponse.json({ error: 'Conversation too long for the demo' }, { status: 400 })

  for (const m of messages) {
    if ((m.role !== 'user' && m.role !== 'model') || typeof m.text !== 'string' || m.text.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: 'Malformed message in history' }, { status: 400 })
    }
  }

  try {
    const reply = await generateReply(persona.systemPrompt, messages)
    return NextResponse.json({ reply })
  } catch (err) {
    if (err instanceof GeminiError) {
      return NextResponse.json({ error: 'The demo is briefly unavailable — please try again in a moment.' }, { status: 502 })
    }
    throw err
  }
}
