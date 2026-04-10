'use client'

import { useRef, useState, useEffect, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode
  children: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.75, 0.95] : [1.04, 1]
  )
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    // Tall scroll container — height determines how long the animation plays
    <div
      ref={containerRef}
      className="relative flex flex-col items-center"
      style={{ height: 'clamp(700px, 140vh, 1100px)' }}
    >
      {/* Title — rendered ABOVE the card with higher z-index */}
      <motion.div
        style={{ y: translate }}
        className="relative z-20 text-center px-6 pt-28 pb-10 w-full"
      >
        {titleComponent}
      </motion.div>

      {/* Card — perspective wrapper sits below the title */}
      <div
        className="relative z-10 w-full px-4"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            transformOrigin: '50% 0%',
            boxShadow:
              '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
          }}
          className="max-w-5xl mx-auto border-4 border-[#6C6C6C] rounded-[30px] bg-[#222222] overflow-hidden"
        >
          <div
            className="overflow-hidden rounded-[26px]"
            style={{ height: 'clamp(260px, 42vw, 520px)' }}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
