'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const el = ref.current
    if (!el) return

    document.body.classList.add('has-custom-cursor')

    let tx = -40, ty = -40
    let x = -40, y = -40
    let raf: number
    let visible = false

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!visible) {
        visible = true
        el.style.opacity = '1'
      }
    }

    // Pointer events don't cross into an <iframe>'s own document, so plain
    // window mousemove tracking freezes the dot the instant the cursor
    // enters one (e.g. the phone-frame template preview). Hide the dot and
    // let the iframe's own cursor show instead, then resume on re-entry.
    const onOverIframe = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.tagName === 'IFRAME') {
        visible = false
        el.style.opacity = '0'
      }
    }

    const tick = () => {
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      el.style.transform = `translate(${x - 5}px, ${y - 5}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOverIframe, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOverIframe)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        background: '#ffffff',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'difference',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    />
  )
}
