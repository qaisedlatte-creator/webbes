'use client'

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type HTMLAttributes,
  type ElementType,
} from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export enum Tag {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  p = 'p',
  span = 'span',
  div = 'div',
}

type AnimationState = 'static' | 'vaporizing' | 'fadingIn' | 'waiting'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  size: number
  color: [number, number, number]
}

interface VaporizeTextCycleProps extends HTMLAttributes<HTMLElement> {
  texts: string[]
  tag?: Tag | ElementType
  interval?: number     // ms between cycles
  vaporDuration?: number // ms to vaporize
  fadeInDuration?: number // ms to fade new text in
  waitDuration?: number  // ms to wait static
  fontSize?: string
  fontWeight?: string | number
  color?: string
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const globalDpr = typeof window !== 'undefined' ? window.devicePixelRatio * 1.5 : 2

function parseColor(cssColor: string): [number, number, number] {
  if (cssColor.startsWith('#')) {
    const hex = cssColor.slice(1)
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return [r, g, b]
  }
  const m = cssColor.match(/\d+/g)
  if (m && m.length >= 3) return [+m[0], +m[1], +m[2]]
  return [10, 10, 10]
}

function transformValue(v: number, from: [number, number], to: [number, number]): number {
  const t = (v - from[0]) / (from[1] - from[0])
  return to[0] + t * (to[1] - to[0])
}

function calculateVaporizeSpread(
  index: number,
  total: number,
  canvasWidth: number
): { vx: number; vy: number } {
  const t = index / Math.max(total - 1, 1)
  const vx = transformValue(t, [0, 1], [-0.8, 0.8]) + (Math.random() - 0.5) * 0.5
  const vy = -(Math.random() * 1.2 + 0.3)
  return { vx, vy }
}

function createParticles(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  color: [number, number, number]
): Particle[] {
  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
  const data = imageData.data
  const particles: Particle[] = []

  for (let y = 0; y < canvasHeight; y += 2) {
    for (let x = 0; x < canvasWidth; x += 2) {
      const idx = (y * canvasWidth + x) * 4
      const alpha = data[idx + 3]
      if (alpha > 30) {
        const spread = calculateVaporizeSpread(x, canvasWidth, canvasWidth)
        particles.push({
          x,
          y,
          vx: spread.vx,
          vy: spread.vy,
          alpha: alpha / 255,
          size: Math.random() * 1.5 + 0.5,
          color: [data[idx], data[idx + 1], data[idx + 2]],
        })
      }
    }
  }
  return particles
}

function updateParticles(particles: Particle[], dt: number): Particle[] {
  return particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx * dt * 60,
      y: p.y + p.vy * dt * 60,
      vy: p.vy - 0.01 * dt * 60, // slight upward acceleration
      alpha: p.alpha - 0.012 * dt * 60,
    }))
    .filter((p) => p.alpha > 0.01)
}

function renderParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  particles.forEach((p) => {
    ctx.globalAlpha = p.alpha
    ctx.fillStyle = `rgb(${p.color[0]},${p.color[1]},${p.color[2]})`
    ctx.fillRect(p.x, p.y, p.size, p.size)
  })
  ctx.globalAlpha = 1
}

function resetParticles(): Particle[] {
  return []
}

function useIsInView(ref: React.RefObject<Element | null>): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])

  return inView
}

interface SeoElementProps {
  tag?: Tag | ElementType
  text: string
  className?: string
  style?: React.CSSProperties
}

function SeoElement({ tag: TagName = 'span', text, className, style }: SeoElementProps) {
  const El = TagName as ElementType
  return (
    <El className={className} style={{ ...style, position: 'absolute', opacity: 0, pointerEvents: 'none', userSelect: 'none' }} aria-hidden="false">
      {text}
    </El>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function VaporizeTextCycle({
  texts,
  tag: TagName = Tag.span,
  interval = 3000,
  vaporDuration = 800,
  fadeInDuration = 600,
  waitDuration = 1200,
  fontSize = 'clamp(2rem,5vw,4rem)',
  fontWeight = 700,
  color = '#0a0a0a',
  className,
  style,
  ...rest
}: VaporizeTextCycleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<AnimationState>('static')
  const textIndexRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])
  const fadeOpacityRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)
  const stateStartRef = useRef<number>(0)
  const [displayText, setDisplayText] = useState(texts[0])
  const [canvasDims, setCanvasDims] = useState({ w: 0, h: 0 })
  const inView = useIsInView(wrapperRef)
  const colorRgb = parseColor(color)

  const drawTextToCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, text: string, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color
      ctx.font = `${fontWeight} ${fontSize} var(--font-plus-jakarta, system-ui, sans-serif)`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, w / 2, h / 2)
    },
    [color, fontSize, fontWeight]
  )

  // Set up ResizeObserver
  useEffect(() => {
    if (!wrapperRef.current) return
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const w = Math.round(entry.contentRect.width)
      const h = Math.round(entry.contentRect.height)
      setCanvasDims({ w, h })
    })
    obs.observe(wrapperRef.current)
    return () => obs.disconnect()
  }, [])

  // Main animation loop
  useEffect(() => {
    if (!inView || !canvasRef.current || canvasDims.w === 0) return
    const canvas = canvasRef.current
    const dpr = globalDpr
    canvas.width = canvasDims.w * dpr
    canvas.height = canvasDims.h * dpr
    canvas.style.width = `${canvasDims.w}px`
    canvas.style.height = `${canvasDims.h}px`
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    stateRef.current = 'static'
    stateStartRef.current = performance.now()
    setDisplayText(texts[textIndexRef.current])
    drawTextToCanvas(ctx, texts[textIndexRef.current], canvasDims.w, canvasDims.h)

    function frame(ts: number) {
      rafRef.current = requestAnimationFrame(frame)
      const dt = lastTimeRef.current === null ? 0 : (ts - lastTimeRef.current) / 1000
      lastTimeRef.current = ts
      const elapsed = ts - stateStartRef.current

      const state = stateRef.current
      ctx.clearRect(0, 0, canvasDims.w, canvasDims.h)

      if (state === 'static') {
        // Show text on canvas; wait for interval
        ctx.globalAlpha = 1
        drawTextToCanvas(ctx, texts[textIndexRef.current], canvasDims.w, canvasDims.h)
        if (elapsed > waitDuration) {
          // Start vaporizing: sample pixels → particles
          particlesRef.current = createParticles(ctx, canvasDims.w, canvasDims.h, colorRgb)
          stateRef.current = 'vaporizing'
          stateStartRef.current = ts
        }
      } else if (state === 'vaporizing') {
        // Animate particles
        particlesRef.current = updateParticles(particlesRef.current, dt)
        renderParticles(ctx, particlesRef.current)
        if (elapsed > vaporDuration || particlesRef.current.length === 0) {
          // Advance to next text
          textIndexRef.current = (textIndexRef.current + 1) % texts.length
          setDisplayText(texts[textIndexRef.current])
          particlesRef.current = resetParticles()
          fadeOpacityRef.current = 0
          stateRef.current = 'fadingIn'
          stateStartRef.current = ts
        }
      } else if (state === 'fadingIn') {
        const t = Math.min(elapsed / fadeInDuration, 1)
        ctx.globalAlpha = t
        drawTextToCanvas(ctx, texts[textIndexRef.current], canvasDims.w, canvasDims.h)
        ctx.globalAlpha = 1
        if (t >= 1) {
          stateRef.current = 'waiting'
          stateStartRef.current = ts
        }
      } else if (state === 'waiting') {
        ctx.globalAlpha = 1
        drawTextToCanvas(ctx, texts[textIndexRef.current], canvasDims.w, canvasDims.h)
        if (elapsed > interval - vaporDuration - fadeInDuration - waitDuration) {
          stateRef.current = 'static'
          stateStartRef.current = ts
        }
      }
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(rafRef.current)
      lastTimeRef.current = null
    }
  }, [inView, canvasDims, texts, drawTextToCanvas, colorRgb, vaporDuration, fadeInDuration, waitDuration, interval])

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      {/* SEO-accessible hidden text */}
      <SeoElement tag={TagName} text={displayText} style={{ fontSize, fontWeight: String(fontWeight) }} />
      {/* Canvas for visual rendering */}
      <canvas ref={canvasRef} aria-hidden="true" style={{ display: 'block' }} />
    </div>
  )
}

// Named alias for Component pattern
export const Component = VaporizeTextCycle

export default VaporizeTextCycle
