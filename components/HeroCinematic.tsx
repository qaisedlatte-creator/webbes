'use client'

import { useState, useEffect } from 'react'

interface Props {
  text: string
  speed?: number          // ms per character — default 18
  children?: React.ReactNode  // fades in after typing completes
}

export default function HeroCinematic({ text, speed = 18, children }: Props) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)
    setShowChildren(false)

    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(id)
        setDone(true)
        setTimeout(() => setShowChildren(true), 500)
      }
    }, speed)

    return () => clearInterval(id)
  }, [text, speed])

  return (
    <section
      style={{
        height: '100vh',
        width: '100%',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(24px, 7vw, 96px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(1.8rem, 4vw, 3.6rem)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.26,
          letterSpacing: '-0.5px',
          maxWidth: 880,
          margin: 0,
        }}
      >
        {displayed}
        {/* Blinking cursor — 0.6s interval, hides once sub-content shows */}
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: 3,
            height: '0.85em',
            background: '#ffffff',
            marginLeft: 6,
            verticalAlign: 'middle',
            borderRadius: 1,
            animation: done && showChildren ? 'none' : 'hero-blink 0.6s step-end infinite',
            opacity: done && showChildren ? 0 : 1,
            transition: 'opacity 0.5s ease',
          }}
        />
      </h1>

      {children && (
        <div
          style={{
            marginTop: 40,
            opacity: showChildren ? 1 : 0,
            transform: showChildren ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            pointerEvents: showChildren ? 'auto' : 'none',
          }}
        >
          {children}
        </div>
      )}
    </section>
  )
}
