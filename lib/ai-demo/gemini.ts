export interface ChatTurn {
  role: 'user' | 'model'
  text: string
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
const MAX_TURNS = 12
const MAX_MESSAGE_LENGTH = 600

export class GeminiError extends Error {}

/** Calls Gemini's generateContent with a persona system prompt + recent chat history. Thinking is disabled for snappy demo-chat latency. */
export async function generateReply(systemPrompt: string, history: ChatTurn[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new GeminiError('GEMINI_API_KEY is not configured')

  const trimmed = history.slice(-MAX_TURNS).map((turn) => ({
    role: turn.role,
    parts: [{ text: turn.text.slice(0, MAX_MESSAGE_LENGTH) }],
  }))

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: trimmed,
      generationConfig: {
        thinkingConfig: { thinkingBudget: 0 },
        maxOutputTokens: 300,
        temperature: 0.85,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new GeminiError(`Gemini request failed (${res.status}): ${body.slice(0, 300)}`)
  }

  const json = await res.json()
  const text = json?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') ?? ''
  if (!text) {
    const finishReason = json?.candidates?.[0]?.finishReason
    if (finishReason === 'SAFETY') return "Let's keep this on topic — what can I help you with?"
    throw new GeminiError('Gemini returned an empty response')
  }
  return text.trim()
}

export { MAX_MESSAGE_LENGTH, MAX_TURNS }
