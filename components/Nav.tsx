'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NAV_LINKS = ['Services', 'Blog', 'Team', 'Contact'] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16',
          'bg-white/95 backdrop-blur-md transition-all duration-300',
          scrolled && 'shadow-[0_1px_0_rgba(0,0,0,0.06)]'
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-[15px] tracking-tight text-[#0a0a0a]" aria-label="Webbes — Home">
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

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="text-[13px] text-neutral-500 hover:text-[#0a0a0a] transition-colors duration-150"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://instagram.com/webbes.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Webbes on Instagram"
            className="text-neutral-400 hover:text-[#0a0a0a] transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <Link
            href="/contact"
            className="text-[12px] font-semibold bg-[#0a0a0a] text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors duration-150"
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobileMenu"
        >
          <span className={cn('block h-[1.5px] w-5 bg-[#0a0a0a] transition-all duration-200 origin-center', mobileOpen && 'rotate-45 translate-y-[6.5px]')} />
          <span className={cn('block h-[1.5px] w-5 bg-[#0a0a0a] transition-all duration-200', mobileOpen && 'opacity-0')} />
          <span className={cn('block h-[1.5px] w-5 bg-[#0a0a0a] transition-all duration-200 origin-center', mobileOpen && '-rotate-45 -translate-y-[6.5px]')} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobileMenu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8 gap-6 transition-opacity duration-200',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {NAV_LINKS.map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="text-3xl font-semibold text-[#0a0a0a] tracking-tight hover:text-neutral-500 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {item}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mt-4 inline-flex justify-center text-[13px] font-semibold bg-[#0a0a0a] text-white px-6 py-3 rounded-full w-fit hover:bg-neutral-800 transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          Get Started
        </Link>
      </div>
    </>
  )
}
