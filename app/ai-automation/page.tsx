import type { Metadata } from 'next'
import AIAutomationClient from './AIAutomationClient'

export const metadata: Metadata = {
  title: 'AI Automation Agency in Kerala — WhatsApp Bots & Business Automation | Webbes',
  description:
    'Webbes builds AI automation for Kerala and GCC businesses — instant WhatsApp replies, lead qualification, and booking systems that work 24/7. Try a live demo.',
  keywords: [
    'AI automation agency Kerala',
    'WhatsApp AI chatbot Kerala',
    'business automation Kochi',
    'AI automation agency for SMBs',
    'WhatsApp business automation India',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.webbes.in/ai-automation' },
  openGraph: {
    type: 'website',
    url: 'https://www.webbes.in/ai-automation',
    title: 'AI Automation Agency in Kerala | Webbes',
    description: 'Instant WhatsApp replies, lead qualification, and 24/7 booking automation for Kerala and GCC businesses. Try the live demo.',
    siteName: 'Webbes',
  },
}

export default function AIAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'AI Business Automation',
            provider: { '@type': 'LocalBusiness', name: 'Webbes', url: 'https://www.webbes.in' },
            areaServed: [
              { '@type': 'Country', name: 'India' },
              { '@type': 'Country', name: 'United Arab Emirates' },
            ],
            description:
              'AI-powered WhatsApp automation, lead qualification, and 24/7 booking systems for small and medium businesses in Kerala and the GCC.',
          }),
        }}
      />
      <AIAutomationClient />
    </>
  )
}
