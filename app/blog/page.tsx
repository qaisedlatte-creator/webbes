import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog/posts'

export const metadata: Metadata = {
  title: 'Blog — AI Automation & Business Growth | Webbes',
  description: 'Practical, no-jargon guides on AI automation, WhatsApp business automation, and growing a business in Kerala and the GCC.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.webbes.in/blog' },
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <section style={{ background: '#0a0a0a', padding: 'clamp(130px,15vw,180px) clamp(20px,5vw,64px) clamp(80px,10vw,120px)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
          Webbes Blog
        </p>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 48 }}>
          AI automation & business growth.
        </h1>

        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl p-6 border transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.02)' }}
            >
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: 8, letterSpacing: '0.05em' }}>
                {formatDate(post.date)} · {post.readMinutes} min read
              </p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>
                {post.title}
              </h2>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
