'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const VP = { once: true, margin: '-60px' } as const

const CATEGORIES = [
  { religion: 'islamic', label: 'Muslim', thumbnail: '/backgrounds/muslim-usman-aisha.jpg', count: 3 },
  { religion: 'hindu', label: 'Hindu', thumbnail: '/backgrounds/hindu-peacock-arch.jpg', count: 3 },
  { religion: 'christian', label: 'Christian', thumbnail: '/backgrounds/christian-church.jpg', count: 3 },
] as const

function Label({ text }: { text: string }) {
  const c = 'rgba(255,255,255,0.4)'
  return (
    <p
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '0.62rem',
        fontWeight: 700,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: c,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <span style={{ width: 18, height: 1, background: c, display: 'inline-block' }} />
      {text}
      <span style={{ width: 18, height: 1, background: c, display: 'inline-block' }} />
    </p>
  )
}

export default function GalleryClient() {
  return (
    <div style={{ background: '#ffffff' }}>
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 md:pt-48 md:pb-32"
        style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #14100d 60%, #1a1210 100%)', minHeight: '58vh' }}
      >
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <Label text="Webbes Invitations" />
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-1px',
              lineHeight: 1.08,
              maxWidth: 720,
              margin: '0 auto',
            }}
          >
            A wedding invitation website, ready in minutes
          </h1>
          <p
            className="mt-6 mx-auto max-w-lg"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}
          >
            Pick your category, choose a style, customize it live, and share a link your guests will love.
          </p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.32)',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ width: 18, height: 1, background: 'rgba(10,10,10,0.32)', display: 'inline-block' }} />
          Pick a category
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.5px', marginBottom: 40 }}
        >
          Three styles inside each — pick your category to see them all.
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.religion}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
            >
              <Link
                href={`/templates/category/${cat.religion}`}
                className="group block rounded-2xl overflow-hidden border border-black/8 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ background: '#fff' }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={cat.thumbnail}
                    alt={`${cat.label} wedding invitation styles`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>{cat.label}</p>
                    <p className="text-[13px] text-white/70 mt-0.5">{cat.count} styles + custom</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
