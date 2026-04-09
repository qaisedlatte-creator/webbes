'use client'

import React, { useState, useCallback, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ─── Standard shadcn-style Button ────────────────────────────────────────────

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#0a0a0a] text-white shadow hover:bg-neutral-800',
        outline:
          'border border-neutral-200 bg-white shadow-sm hover:bg-neutral-50 hover:text-neutral-900',
        ghost: 'hover:bg-neutral-100 hover:text-neutral-900',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

// ─── Glass Filter (hidden SVG, mount once in the DOM) ─────────────────────────

export function GlassFilter() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="0.4" />
        </filter>
      </defs>
    </svg>
  )
}

// ─── LiquidButton ─────────────────────────────────────────────────────────────

export const liquidbuttonVariants = cva('relative cursor-pointer select-none', {
  variants: {
    size: {
      default: 'px-7 py-3',
      sm: 'px-5 py-2',
      lg: 'px-10 py-4',
    },
  },
  defaultVariants: { size: 'default' },
})

interface LiquidButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidbuttonVariants> {
  children: React.ReactNode
}

export function LiquidButton({ className, size, children, ...props }: LiquidButtonProps) {
  return (
    <>
      <GlassFilter />
      <button
        className={cn(
          liquidbuttonVariants({ size }),
          'relative overflow-hidden rounded-full',
          'bg-[#0a0a0a] text-white text-[13px] font-semibold',
          'shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.06)_inset]',
          'hover:bg-neutral-900 active:scale-[0.97] transition-all duration-150',
          className
        )}
        {...props}
      >
        {/* Liquid glass overlay */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            filter: 'url(#liquid-glass)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    </>
  )
}

// ─── MetalButton ──────────────────────────────────────────────────────────────

type ButtonState = 'idle' | 'hovered' | 'pressed'

const COLOR_VARIANTS = {
  default: {
    bg: 'linear-gradient(180deg, #2e2e2e 0%, #1a1a1a 60%, #0d0d0d 100%)',
    highlightInset: 'rgba(255,255,255,0.10)',
    shadow: '0 1px 0 rgba(255,255,255,0.10) inset, 0 -1px 0 rgba(0,0,0,0.60) inset, 0 0 0 1px rgba(0,0,0,0.70), 0 4px 8px rgba(0,0,0,0.40), 0 8px 20px rgba(0,0,0,0.18)',
    pressedShadow: '0 0 0 rgba(255,255,255,0.04) inset, 0 2px 0 rgba(0,0,0,0.45) inset, 0 0 0 1px rgba(0,0,0,0.70), 0 1px 4px rgba(0,0,0,0.30)',
    color: '#ffffff',
  },
  primary: {
    bg: 'linear-gradient(180deg, #404040 0%, #1a1a1a 50%, #080808 100%)',
    highlightInset: 'rgba(255,255,255,0.14)',
    shadow: '0 1px 0 rgba(255,255,255,0.14) inset, 0 -1px 0 rgba(0,0,0,0.70) inset, 0 0 0 1px rgba(0,0,0,0.85), 0 6px 14px rgba(0,0,0,0.55), 0 14px 28px rgba(0,0,0,0.22)',
    pressedShadow: '0 0 0 rgba(255,255,255,0.06) inset, 0 2px 0 rgba(0,0,0,0.55) inset, 0 0 0 1px rgba(0,0,0,0.85), 0 1px 6px rgba(0,0,0,0.40)',
    color: '#ffffff',
  },
  success: {
    bg: 'linear-gradient(180deg, #2d6a2d 0%, #173d17 55%, #0a200a 100%)',
    highlightInset: 'rgba(120,255,120,0.10)',
    shadow: '0 1px 0 rgba(120,255,120,0.10) inset, 0 -1px 0 rgba(0,0,0,0.55) inset, 0 0 0 1px rgba(0,60,0,0.60), 0 4px 12px rgba(0,80,0,0.35)',
    pressedShadow: '0 0 0 rgba(120,255,120,0.05) inset, 0 2px 0 rgba(0,0,0,0.45) inset, 0 0 0 1px rgba(0,40,0,0.60), 0 1px 4px rgba(0,60,0,0.25)',
    color: '#e8ffe8',
  },
  error: {
    bg: 'linear-gradient(180deg, #6a1a1a 0%, #3a0d0d 55%, #180808 100%)',
    highlightInset: 'rgba(255,120,120,0.10)',
    shadow: '0 1px 0 rgba(255,120,120,0.10) inset, 0 -1px 0 rgba(0,0,0,0.55) inset, 0 0 0 1px rgba(80,0,0,0.60), 0 4px 12px rgba(120,0,0,0.35)',
    pressedShadow: '0 0 0 rgba(255,80,80,0.05) inset, 0 2px 0 rgba(0,0,0,0.45) inset, 0 0 0 1px rgba(60,0,0,0.60), 0 1px 4px rgba(100,0,0,0.25)',
    color: '#ffe8e8',
  },
  gold: {
    bg: 'linear-gradient(180deg, #c9a227 0%, #8b6914 55%, #524009 100%)',
    highlightInset: 'rgba(255,220,80,0.30)',
    shadow: '0 1px 0 rgba(255,220,80,0.30) inset, 0 -1px 0 rgba(0,0,0,0.55) inset, 0 0 0 1px rgba(100,65,0,0.70), 0 4px 12px rgba(180,130,0,0.45)',
    pressedShadow: '0 0 0 rgba(255,200,60,0.15) inset, 0 2px 0 rgba(0,0,0,0.45) inset, 0 0 0 1px rgba(80,50,0,0.70), 0 1px 4px rgba(150,100,0,0.30)',
    color: '#fff8d6',
  },
  bronze: {
    bg: 'linear-gradient(180deg, #a06030 0%, #6b3f18 55%, #3a2008 100%)',
    highlightInset: 'rgba(255,180,80,0.22)',
    shadow: '0 1px 0 rgba(255,180,80,0.22) inset, 0 -1px 0 rgba(0,0,0,0.55) inset, 0 0 0 1px rgba(80,40,0,0.65), 0 4px 12px rgba(140,80,20,0.40)',
    pressedShadow: '0 0 0 rgba(255,160,60,0.10) inset, 0 2px 0 rgba(0,0,0,0.45) inset, 0 0 0 1px rgba(60,30,0,0.65), 0 1px 4px rgba(110,60,10,0.28)',
    color: '#fff3e0',
  },
} as const

type ColorVariant = keyof typeof COLOR_VARIANTS

interface MetalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorVariant
  children: React.ReactNode
}

export function MetalButton({
  variant = 'default',
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  ...props
}: MetalButtonProps) {
  const [state, setState] = useState<ButtonState>('idle')
  const colors = COLOR_VARIANTS[variant]

  const handlers = {
    onMouseEnter: useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setState('hovered')
      onMouseEnter?.(e)
    }, [onMouseEnter]),
    onMouseLeave: useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setState('idle')
      onMouseLeave?.(e)
    }, [onMouseLeave]),
    onMouseDown: useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setState('pressed')
      onMouseDown?.(e)
    }, [onMouseDown]),
    onMouseUp: useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setState('hovered')
      onMouseUp?.(e)
    }, [onMouseUp]),
    onTouchStart: useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
      setState('pressed')
      onTouchStart?.(e)
    }, [onTouchStart]),
    onTouchEnd: useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
      setState('idle')
      onTouchEnd?.(e)
    }, [onTouchEnd]),
  }

  const isPressed = state === 'pressed'

  return (
    <button
      style={{
        background: colors.bg,
        color: colors.color,
        boxShadow: isPressed ? colors.pressedShadow : colors.shadow,
        transform: isPressed ? 'scale(0.97) translateY(1px)' : state === 'hovered' ? 'scale(1.02) translateY(-1px)' : 'scale(1) translateY(0)',
      }}
      className={cn(
        'relative cursor-pointer select-none overflow-hidden',
        'px-8 py-3.5 rounded-full text-[13px] font-semibold tracking-wide',
        'transition-all duration-[120ms] ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        className
      )}
      {...handlers}
      {...props}
    >
      {/* Top highlight */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${colors.highlightInset}, transparent)` }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
}
