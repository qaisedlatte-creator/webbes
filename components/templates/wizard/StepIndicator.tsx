'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'

export type WizardStep = 'template' | 'customize' | 'preview' | 'publish'

const STEPS: { key: WizardStep; label: string }[] = [
  { key: 'template', label: 'Template' },
  { key: 'customize', label: 'Customize' },
  { key: 'preview', label: 'Preview' },
  { key: 'publish', label: 'Publish' },
]

const ORDER: WizardStep[] = ['template', 'customize', 'preview', 'publish']

interface Props {
  current: WizardStep
  /** Href for a completed step's label to be clickable (e.g. back to the build page). Steps without an href just aren't links. */
  hrefs?: Partial<Record<WizardStep, string>>
}

export default function StepIndicator({ current, hrefs = {} }: Props) {
  const currentIdx = ORDER.indexOf(current)

  return (
    <nav aria-label="Invitation setup progress" className="w-full border-b border-black/8 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 flex items-center">
        {STEPS.map((step, i) => {
          const isDone = i < currentIdx
          const isCurrent = i === currentIdx
          const href = isDone ? hrefs[step.key] : undefined

          const content = (
            <span className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors"
                style={
                  isCurrent
                    ? { background: '#2563EB', color: '#fff' }
                    : isDone
                      ? { background: '#DCFCE7', color: '#166534' }
                      : { background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.35)' }
                }
              >
                {isDone ? <Check size={11} strokeWidth={3} /> : i + 1}
              </span>
              <span
                className="text-[12px] font-semibold whitespace-nowrap hidden sm:inline"
                style={{ color: isCurrent ? '#0a0a0a' : isDone ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.35)' }}
              >
                {step.label}
              </span>
            </span>
          )

          return (
            <div key={step.key} className="flex items-center flex-1 last:flex-none">
              {href ? (
                <Link href={href} className="flex items-center">
                  {content}
                </Link>
              ) : (
                content
              )}
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px mx-2 md:mx-3"
                  style={{ background: i < currentIdx ? '#86EFAC' : 'rgba(0,0,0,0.1)' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
