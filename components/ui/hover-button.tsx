'use client'

import { useRef, useState, useCallback, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CircleState {
  id: number
  x: number
  y: number
  phase: 'in' | 'hold' | 'out' | 'dead'
  startTime: number
}

interface HoverButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  circleStart?: string
  circleEnd?: string
}

let circleIdCounter = 0

export function HoverButton({
  children,
  className,
  circleStart = 'rgba(0,0,0,0.07)',
  circleEnd = 'transparent',
  ...props
}: HoverButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [circles, setCircles] = useState<CircleState[]>([])
  const rafRef = useRef<number>(0)

  // Update circle life phases on each rAF tick
  const tick = useCallback(() => {
    const now = Date.now()
    setCircles((prev) => {
      const next = prev
        .map((c) => {
          const age = now - c.startTime
          // fade in: 0–1000ms, hold: 1000–2200ms, fade out: 1200ms, dead after 2200ms
          let phase: CircleState['phase'] = c.phase
          if (age > 2200) phase = 'dead'
          else if (age > 1000) phase = 'out'
          else phase = 'in'
          return { ...c, phase }
        })
        .filter((c) => c.phase !== 'dead')
      return next
    })
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const startTick = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stopTick = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setCircles([])
  }, [])

  const spawnCircle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = circleIdCounter++
      setCircles((prev) => [
        ...prev.slice(-4), // max 5 live circles
        { id, x, y, phase: 'in', startTime: Date.now() },
      ])
    },
    []
  )

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      startTick()
      spawnCircle(e)
      props.onMouseEnter?.(e)
    },
    [startTick, spawnCircle, props]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      spawnCircle(e)
      props.onMouseMove?.(e)
    },
    [spawnCircle, props]
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      stopTick()
      props.onMouseLeave?.(e)
    },
    [stopTick, props]
  )

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          '--circle-start': circleStart,
          '--circle-end': circleEnd,
        } as React.CSSProperties
      }
      className={cn(
        'relative overflow-hidden cursor-pointer select-none',
        'px-7 py-3 rounded-full text-[13px] font-semibold text-[#0a0a0a]',
        // Glassmorphism base
        'bg-white/80 backdrop-blur-lg',
        'border border-neutral-200',
        'shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.05),0_1px_4px_rgba(0,0,0,0.08)]',
        'hover:border-neutral-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.07),0_2px_10px_rgba(0,0,0,0.10)]',
        'active:scale-[0.97] transition-[border-color,box-shadow,transform] duration-150',
        className
      )}
      {...props}
    >
      {/* Rendered tracking circles */}
      {circles.map((c) => {
        const age = Date.now() - c.startTime
        let opacity = 0
        if (c.phase === 'in') opacity = Math.min(age / 1000, 1)
        else if (c.phase === 'out') opacity = Math.max(1 - (age - 1000) / 1200, 0)

        return (
          <span
            key={c.id}
            aria-hidden="true"
            className="absolute rounded-full pointer-events-none"
            style={{
              left: c.x - 40,
              top: c.y - 40,
              width: 80,
              height: 80,
              opacity,
              background: `radial-gradient(circle, var(--circle-start) 0%, var(--circle-end) 70%)`,
              transition: 'opacity 80ms linear',
            }}
          />
        )
      })}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
