'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import HeroCinematic from '@/components/HeroCinematic'

const VP = { once: true, margin: '-60px' } as const

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`
    window.location.href = `mailto:webbes.in@gmail.com?subject=Project Enquiry from ${encodeURIComponent(name)}&body=${body}`
  }

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.15)',
    padding: '14px 0',
    fontSize: '0.95rem',
    color: '#0a0a0a',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  } as const

  return (
    <>
      <HeroCinematic text="Let's build something real." />

      <section style={{ background: '#ffffff', padding: 'clamp(72px,9vw,120px) clamp(20px,5vw,64px)' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 28, height: 1, background: '#0a0a0a', display: 'inline-block' }} />
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' as const, fontWeight: 600, color: 'rgba(10,10,10,0.45)' }}>
                Get In Touch
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                fontWeight: 700,
                color: '#0a0a0a',
                letterSpacing: '-1px',
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Tell us what<br />you&apos;re building.
            </h2>

            <p
              style={{
                fontSize: '0.95rem',
                color: 'rgba(10,10,10,0.5)',
                lineHeight: 1.72,
                marginBottom: 48,
                maxWidth: 380,
              }}
            >
              We respond within 24 hours. No sales pitch, no runaround — just
              two founders who want to understand your project and tell you
              exactly what it would take to build it right.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 24 }}>
              {[
                {
                  label: 'Email',
                  value: 'webbes.in@gmail.com',
                  href: 'mailto:webbes.in@gmail.com',
                },
                {
                  label: 'WhatsApp',
                  value: '+91 91496 81874',
                  href: 'https://wa.me/919149681874',
                },
                {
                  label: 'Instagram',
                  value: '@webbes.in',
                  href: 'https://instagram.com/webbes.in',
                },
                {
                  label: 'Location',
                  value: 'Kochi, Kerala, India',
                  href: null,
                },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase' as const,
                      fontWeight: 600,
                      color: 'rgba(10,10,10,0.3)',
                      minWidth: 80,
                      flexShrink: 0,
                    }}
                  >
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{
                        fontSize: '0.95rem',
                        color: '#0a0a0a',
                        fontWeight: 500,
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.95rem', color: '#0a0a0a', fontWeight: 500 }}>
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' as const, gap: 32 }}>
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, fontWeight: 600, color: 'rgba(10,10,10,0.35)', marginBottom: 8 }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = '#0a0a0a')}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)')}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, fontWeight: 600, color: 'rgba(10,10,10,0.35)', marginBottom: 8 }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = '#0a0a0a')}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)')}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, fontWeight: 600, color: 'rgba(10,10,10,0.35)', marginBottom: 8 }}
                >
                  Project Details
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us about your project — what you need, your timeline, your budget range."
                  required
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical' as const }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = '#0a0a0a')}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)')}
                />
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
                <button
                  type="submit"
                  style={{
                    background: '#0a0a0a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 36px',
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    transition: 'opacity 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Send Message →
                </button>

                <a
                  href="https://wa.me/919149681874"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    border: '1.5px solid rgba(0,0,0,0.15)',
                    color: '#0a0a0a',
                    padding: '14px 28px',
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    background: 'transparent',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#0a0a0a')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)')}
                >
                  WhatsApp Instead
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}
