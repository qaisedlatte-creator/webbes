import Link from 'next/link'

const SERVICES_LINKS = [
  { label: 'Website Development', href: '/services' },
  { label: 'AI Automation', href: '/ai-automation' },
  { label: 'E-Commerce & Shopify', href: '/services' },
  { label: 'Digital Marketing', href: '/services' },
  { label: 'Web Design Kerala', href: '/web-design-kerala' },
]

const COMPANY_LINKS = [
  { label: 'About Webbes', href: '/#about' },
  { label: 'Our Process', href: '/#process' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Meet the Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t bg-[#1D2125]" style={{ borderColor:'rgba(240,237,232,0.08)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-[15px] tracking-tight text-[#0a0a0a] mb-4" aria-label="Webbes — Home">
            <svg className="w-[26px] h-[26px]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="16" fill="none">
                <rect x="24" y="24" width="152" height="152" rx="32" />
                <line x1="100" y1="176" x2="100" y2="60" />
                <line x1="100" y1="120" x2="176" y2="120" />
              </g>
              <circle cx="62" cy="60" r="14" fill="currentColor" />
            </svg>
            webbes
          </Link>
          <p className="text-[#F0EDE8]/40 text-[13px] leading-relaxed">
            Web design &amp; AI automation agency in Kochi, India. Serving businesses across India and the GCC.
          </p>
        </div>

        {/* Services */}
        <div>
          <h5 className="text-[10px] tracking-[0.2em] text-[#F0EDE8]/40 uppercase mb-5 font-semibold">Services</h5>
          {SERVICES_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-[#F0EDE8]/50 text-[13px] mb-2.5 hover:text-[#F0EDE8] transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Company */}
        <div>
          <h5 className="text-[10px] tracking-[0.2em] text-[#F0EDE8]/40 uppercase mb-5 font-semibold">Company</h5>
          {COMPANY_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-[#F0EDE8]/50 text-[13px] mb-2.5 hover:text-[#F0EDE8] transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Connect */}
        <div>
          <h5 className="text-[10px] tracking-[0.2em] text-[#F0EDE8]/40 uppercase mb-5 font-semibold">Connect</h5>
          <a href="https://instagram.com/webbes.in" target="_blank" rel="noopener noreferrer" className="block text-[#F0EDE8]/50 text-[13px] mb-2.5 hover:text-[#F0EDE8] transition-colors duration-150">Instagram</a>
          <a href="mailto:webbes.in@gmail.com" className="block text-[#F0EDE8]/50 text-[13px] mb-2.5 hover:text-[#F0EDE8] transition-colors duration-150">Email Us</a>
          <a href="https://wa.me/919149681874" target="_blank" rel="noopener noreferrer" className="block text-[#F0EDE8]/50 text-[13px] mb-2.5 hover:text-[#F0EDE8] transition-colors duration-150">WhatsApp</a>
        </div>
      </div>

      <div className="border-t" style={{ borderColor:'rgba(240,237,232,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-[#F0EDE8]/40">&#169; 2026 Webbes. All rights reserved. | Web Design Agency, Kochi, India</p>
          <p className="text-[11px] text-[#F0EDE8]/40">Crafted with care in India &#127470;&#127475;</p>
        </div>
      </div>
    </footer>
  )
}
