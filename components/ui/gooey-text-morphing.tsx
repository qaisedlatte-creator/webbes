'use client'

import { useEffect, useRef, useId } from 'react'
import { cn } from '@/lib/utils'

interface GooeyTextProps {
  texts: string[]
  morphTime?: number
  cooldownTime?: number
  className?: string
  textClassName?: string
}

export function GooeyText({
  texts,
  morphTime = 1.2,
  cooldownTime = 0.4,
  className,
  textClassName,
}: GooeyTextProps) {
  const uid = useId().replace(/:/g, '')
  const filterId = `gooey-threshold-${uid}`

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)
  const indexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(cooldownTime)
  const lastTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!text1Ref.current || !text2Ref.current) return

    // Initialise
    text1Ref.current.textContent = texts[0]
    text2Ref.current.textContent = texts[1 % texts.length]
    text1Ref.current.style.opacity = '1'
    text2Ref.current.style.opacity = '0'
    text1Ref.current.style.filter = ''
    text2Ref.current.style.filter = ''

    function setMorph(fraction: number) {
      const t1 = text1Ref.current
      const t2 = text2Ref.current
      if (!t1 || !t2) return

      // t2 fades in
      const blur2 = Math.max(8 / fraction - 8, 0)
      t2.style.filter = `blur(${Math.min(blur2, 100)}px)`
      t2.style.opacity = String(Math.pow(fraction, 0.4))

      // t1 fades out
      const inv = 1 - fraction
      const blur1 = Math.max(8 / inv - 8, 0)
      t1.style.filter = `blur(${Math.min(blur1, 100)}px)`
      t1.style.opacity = String(Math.pow(inv, 0.4))
    }

    function doMorph(dt: number) {
      morphRef.current += dt
      let fraction = morphRef.current / morphTime

      if (fraction >= 1) {
        fraction = 1
        cooldownRef.current = cooldownTime
        // Snap: make t2 the new t1 content
        if (text1Ref.current && text2Ref.current) {
          indexRef.current++
          text1Ref.current.textContent = texts[indexRef.current % texts.length]
          text2Ref.current.textContent = texts[(indexRef.current + 1) % texts.length]
          text1Ref.current.style.filter = ''
          text1Ref.current.style.opacity = '1'
          text2Ref.current.style.filter = ''
          text2Ref.current.style.opacity = '0'
        }
        morphRef.current = 0
        return
      }
      setMorph(fraction)
    }

    function animate(ts: number) {
      rafRef.current = requestAnimationFrame(animate)
      const dt = lastTimeRef.current === null ? 0 : (ts - lastTimeRef.current) / 1000
      lastTimeRef.current = ts

      if (cooldownRef.current > 0) {
        cooldownRef.current -= dt
        return
      }
      doMorph(dt)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [texts, morphTime, cooldownTime])

  return (
    <div className={cn('relative w-full', className)}>
      {/* Hidden SVG filter — high-contrast alpha matrix creates gooey merge */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      {/* Text container — filter applied here so both spans merge visually */}
      <div
        style={{ filter: `url(#${filterId})` }}
        className="relative h-20 flex items-center justify-center"
      >
        <span
          ref={text1Ref}
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'font-extrabold text-[clamp(2.4rem,7vw,5rem)] leading-none tracking-tight',
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'font-extrabold text-[clamp(2.4rem,7vw,5rem)] leading-none tracking-tight',
            textClassName
          )}
        />
      </div>
    </div>
  )
}
