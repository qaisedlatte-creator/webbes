import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — Webbes',
  description: 'Refund and cancellation policy for the Webbes wedding invitation website builder.',
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

export default function RefundPolicyPage() {
  return (
    <div style={{ background: '#ffffff' }}>
      <section className="px-6 pt-40 pb-16 md:pt-48 md:pb-20 text-center" style={{ background: '#f7f5f0' }}>
        <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold mb-3">Policies</p>
        <h1 style={{ fontFamily: "'Syne', sans-serif" }} className="text-3xl md:text-4xl font-bold text-black">
          Refund &amp; Cancellation Policy
        </h1>
        <p className="mt-3 text-sm text-black/40">Last updated: August 2026</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16 md:py-20">
        <Section title="What you're buying">
          <p>
            The Webbes wedding invitation builder (at <code>webbes.in/templates</code>) is a made-to-order digital
            product: a personalized wedding invitation website built to the names, dates, venue, photo, and other
            details you enter, on the style you choose. It is not a physical good and there is nothing to ship.
          </p>
        </Section>

        <Section title="Before you pay">
          <p>
            You can build and preview your invitation for free, with a watermark, for as long as you like before
            paying. Nothing is charged until you complete checkout, so please review your names, date, venue, and
            spelling carefully in the preview before you pay.
          </p>
        </Section>

        <Section title="After you pay">
          <p>
            Payment unlocks your invitation immediately — your customization work has already been done by you in
            the builder, and your final link is generated automatically the moment payment is confirmed. Because
            the product is delivered instantly and is built entirely to your own specifications, <strong>completed
            orders are non-refundable</strong> once payment succeeds and the invitation link is unlocked.
          </p>
          <p>
            If your payment succeeded but you did not receive your invitation link (for example, a technical error
            during checkout), contact us with your payment reference and we'll resolve it or issue a refund for
            that specific failure — this is the one situation refunds apply to.
          </p>
        </Section>

        <Section title="Cancelling before you pay">
          <p>
            Since nothing is charged until checkout, you can simply stop editing and close the tab — there's nothing
            to cancel. If you started a draft and want it removed, or have any other question before paying, email
            or WhatsApp us using the details below and we'll take care of it.
          </p>
        </Section>

        <Section title="Delivery timeline">
          <p>
            Delivery is instant. As soon as your payment is confirmed, you're redirected straight to your live
            invitation link on the same page — there's no waiting period or manual handoff.
          </p>
        </Section>

        <Section title="Contact us">
          <p>
            For payment issues, questions, or anything not covered above, reach us at{' '}
            <a href="mailto:webbes.in@gmail.com" className="underline" style={{ color: '#2563EB' }}>
              webbes.in@gmail.com
            </a>{' '}
            or on{' '}
            <a href="https://wa.me/919149681874" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#2563EB' }}>
              WhatsApp
            </a>
            .
          </p>
        </Section>
      </section>
    </div>
  )
}
