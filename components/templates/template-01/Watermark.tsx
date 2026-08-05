'use client'

import type { ColorPreset } from '@/lib/templates/types'
import { withAlpha } from '@/lib/templates/color'

export default function Watermark({ theme }: { theme: ColorPreset }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wm-pattern" x="0" y="0" width="340" height="210" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
            <text
              x="170"
              y="90"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="34"
              fontWeight="700"
              fill={withAlpha(theme.ink, 0.11)}
              textAnchor="middle"
              dominantBaseline="middle"
              letterSpacing="8"
            >
              PREVIEW
            </text>
            <text
              x="170"
              y="130"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="15"
              fontWeight="600"
              fill={withAlpha(theme.ink, 0.11)}
              textAnchor="middle"
              dominantBaseline="middle"
              letterSpacing="4"
            >
              PAY TO UNLOCK
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wm-pattern)" />
      </svg>
    </div>
  )
}
