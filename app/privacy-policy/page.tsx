import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Webbes',
  description: 'Privacy policy for Webbes — how we collect, use, and protect your personal information on webbes.in.',
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

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: '#ffffff' }}>
      <section className="px-6 pt-40 pb-16 md:pt-48 md:pb-20 text-center" style={{ background: '#f7f5f0' }}>
        <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold mb-3">Policies</p>
        <h1 style={{ fontFamily: "'Syne', sans-serif" }} className="text-3xl md:text-4xl font-bold text-black">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-black/40">Last updated: August 2026</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16 md:py-20">
        <Section title="Introduction">
          <p>
            This Privacy Policy describes how Webbes ("we," "us," "our") collects, uses, and protects your personal
            information when you use webbes.in ("Platform"). By using our Platform, you agree to this Privacy Policy
            and our Terms of Use.
          </p>
        </Section>

        <Section title="Information We Collect">
          <p>When you use our invitation builder and make a purchase, we collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name, email, and WhatsApp/phone number</li>
            <li>
              Wedding details you enter (names, date, venue) and any photos you upload for your invitation
            </li>
            <li>
              Payment is processed securely by our payment partner (Cashfree); we do not store your card, UPI, or
              bank details ourselves
            </li>
          </ul>
        </Section>

        <Section title="How We Use Your Information">
          <p>We use this information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Build and deliver your personalized invitation</li>
            <li>Send your invitation link and payment confirmation via WhatsApp/email</li>
            <li>Respond to support requests</li>
            <li>Improve our product and prevent fraud</li>
          </ul>
        </Section>

        <Section title="Sharing Your Information">
          <p>
            We share payment details only with our payment processor (Cashfree) to complete your transaction, and
            only as required to comply with the law. We do not sell your personal information to third parties.
          </p>
        </Section>

        <Section title="Data Storage and Security">
          <p>
            Your data is stored securely and only for as long as needed to provide the service and meet legal
            requirements. We take reasonable measures to protect your information but cannot guarantee complete
            security of data transmitted over the internet.
          </p>
        </Section>

        <Section title="International Customers">
          <p>
            While Webbes is based in India, we welcome customers from outside India, including the GCC region,
            purchasing invitations for weddings held in India.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>
            You can request access to, correction of, or deletion of your personal data by contacting us using the
            details below. We may retain certain information where required by law.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Continued use of the Platform after changes means
            you accept the updated policy.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            For any privacy-related questions or requests, contact us at:{' '}
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
