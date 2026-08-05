import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — Webbes',
  description: 'Terms of use for Webbes — web design, AI automation, and the wedding invitation website builder.',
  robots: { index: true, follow: true },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-xl font-bold text-black mb-3">
        {title}
      </h2>
      <div className="text-[15px] leading-relaxed text-black/65 space-y-3">{children}</div>
    </div>
  )
}

export default function TermsPage() {
  return (
    <div style={{ background: '#ffffff' }}>
      <section className="px-6 pt-40 pb-16 md:pt-48 md:pb-20 text-center" style={{ background: '#f7f5f0' }}>
        <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold mb-3">Policies</p>
        <h1 style={{ fontFamily: "'Syne', sans-serif" }} className="text-3xl md:text-4xl font-bold text-black">
          Terms of Use
        </h1>
        <p className="mt-3 text-sm text-black/40">Last updated: August 2026</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16 md:py-20">
        <Section title="Who we are">
          <p>
            Webbes ("we", "us") is a web design and AI automation agency based in Kochi, Kerala, India. These terms
            apply to webbes.in and every service we offer through it, including custom website development,
            e-commerce builds, AI automation, SEO/AEO work, and the self-serve wedding invitation website builder
            at <code>webbes.in/templates</code>.
          </p>
        </Section>

        <Section title="The service">
          <p>
            For the invitation builder specifically: you customize a template with your own names, date, venue,
            photo, and wording; we generate a personalized wedding invitation website for you, delivered as a
            shareable link. For our agency services, scope and deliverables are agreed with you directly before
            work begins.
          </p>
        </Section>

        <Section title="Payment">
          <p>
            For the invitation builder, the price shown at checkout — including any add-ons you've selected, like
            RSVP or a custom song — is the final price charged. Add-ons are optional and only added to your total
            when you turn them on before paying. Payments are processed securely through Razorpay; we don't store
            your card or payment details ourselves.
          </p>
        </Section>

        <Section title="Your content, our template">
          <p>
            You own the names, photo, wording, and other personal details you add to your invitation. We retain
            ownership of the underlying template design, code, and visual system — you're licensed to use it for
            your own invitation, not to resell, redistribute, or reverse-engineer it.
          </p>
        </Section>

        <Section title="Acceptable use">
          <p>
            Don't use the builder to upload content you don't have the rights to, or content that's unlawful,
            harmful, or infringing. We may remove or refuse to serve any invitation that violates this.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            The service is provided "as is." We aren't liable for indirect, incidental, or consequential damages
            arising from your use of the site or the invitation builder, including guest RSVPs, delivery timing
            around your event date, or third-party services (like Razorpay or Vercel) being unavailable. Our total
            liability for any claim is limited to the amount you paid us for the specific order in question.
          </p>
        </Section>

        <Section title="Changes to these terms">
          <p>We may update these terms from time to time. Continued use of the site after an update means you accept the revised terms.</p>
        </Section>

        <Section title="Governing law">
          <p>These terms are governed by the laws of India, and any disputes are subject to the exclusive jurisdiction of the courts in Kochi, Kerala.</p>
        </Section>

        <Section title="Contact us">
          <p>
            Questions about these terms:{' '}
            <a href="mailto:webbes.in@gmail.com" className="underline" style={{ color: '#2563EB' }}>
              webbes.in@gmail.com
            </a>
            .
          </p>
        </Section>
      </section>
    </div>
  )
}
