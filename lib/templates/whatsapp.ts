// WhatsApp Cloud API (Meta) sender for abandoned-cart reminders.
//
// WhatsApp's platform rules leave no compliant way to send a business-
// initiated message (i.e. outside a 24h window since the customer last
// messaged us) except through the official WhatsApp Business Platform with
// a pre-approved message template — there's no "quick" unofficial route
// that doesn't risk the sending number being banned. So this module talks
// to the real Graph API and simply no-ops until it's configured; see
// isWhatsAppConfigured(). Until then, the admin page is the fallback.
//
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages

const GRAPH_VERSION = 'v21.0'

export function isWhatsAppConfigured(): boolean {
  return Boolean(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_TEMPLATE_NAME)
}

export interface SendReminderInput {
  /** Raw number as the customer typed it — normalized to E.164 (assumes India/+91 when 10 digits, matching the editor's +91 placeholder). */
  toWhatsapp: string
  templateStyleLabel: string
  previewUrl: string
}

export interface SendReminderResult {
  ok: boolean
  error?: string
}

export function normalizeToE164(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `91${digits}`
  if (digits.length > 10) return digits
  return null
}

/**
 * Sends the approved "abandoned_cart_reminder" template message. The template
 * body registered with Meta must read exactly:
 *   "Hey! Your {{1}} wedding invitation is ready to preview — complete it
 *   here: {{2}}. Let us know if you have questions!"
 * with {{1}} = templateStyleLabel and {{2}} = previewUrl.
 */
export async function sendAbandonedCartReminder(input: SendReminderInput): Promise<SendReminderResult> {
  if (!isWhatsAppConfigured()) return { ok: false, error: 'WhatsApp is not configured' }

  const to = normalizeToE164(input.toWhatsapp)
  if (!to) return { ok: false, error: 'Invalid phone number' }

  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const token = process.env.WHATSAPP_ACCESS_TOKEN
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME
  const languageCode = process.env.WHATSAPP_TEMPLATE_LANG || 'en'

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: languageCode },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: input.templateStyleLabel },
                { type: 'text', text: input.previewUrl },
              ],
            },
          ],
        },
      }),
    })

    if (!res.ok) {
      const json = await res.json().catch(() => null)
      return { ok: false, error: json?.error?.message || `WhatsApp send failed (${res.status})` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'WhatsApp send failed' }
  }
}

/** Same copy the approved template sends — used for the admin page's manual wa.me fallback link. */
export function reminderMessageText(templateStyleLabel: string, previewUrl: string): string {
  return `Hey! Your ${templateStyleLabel} wedding invitation is ready to preview — complete it here: ${previewUrl}. Let us know if you have questions!`
}
