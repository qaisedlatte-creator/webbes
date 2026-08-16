export interface FAQItem {
  q: string
  a: string
}

// Shared between AIAutomationClient (renders the accordion) and page.tsx
// (renders FAQPage JSON-LD for AEO) so the two never drift out of sync.
export const AI_AUTOMATION_FAQS: FAQItem[] = [
  { q: 'How is this different from a normal chatbot?', a: 'Most WhatsApp "chatbots" are rigid button menus. This is a real AI agent that understands what customers actually type, answers in plain language, and knows when to hand off to you.' },
  { q: 'Can it replace my staff?', a: "No — it replaces the delay, not the person. It handles instant first replies, FAQs, and lead qualification around the clock, but anything that needs judgment, negotiation, or a real relationship still goes to your team. Most businesses use it to free up staff for the higher-value conversations, not to cut headcount." },
  { q: 'What does it cost?', a: 'It depends on how much of your business it needs to handle — a simple FAQ-and-booking agent costs less than a full lead-qualification system. Message us on WhatsApp and we\'ll give you a straight number after a quick call, no obligation.' },
  { q: 'How long does setup take?', a: 'Most automations go live within 1–2 weeks of our first call, depending on how much information we need to gather from you.' },
  { q: 'Will it ever say something wrong to a customer?', a: 'It\'s scoped tightly to your business and reviewed by you before launch. For anything sensitive — pricing exceptions, complaints, anything outside its scope — it hands off to a real person instead of guessing.' },
  { q: 'Do I need any technical setup?', a: 'No. We handle the WhatsApp Business API connection, the automation, and the training. You just review and approve.' },
  { q: 'Can it work alongside my existing staff?', a: 'Yes — that\'s usually the point. It handles the instant first reply and routine questions; your team steps in for anything that needs a real human.' },
]
