import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getPost, getRelatedPosts } from '@/lib/blog/posts'

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Not found — Webbes' }
  return {
    title: `${post.title} — Webbes Blog`,
    description: post.description,
    robots: { index: true, follow: true },
    alternates: { canonical: `https://www.webbes.in/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `https://www.webbes.in/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      siteName: 'Webbes',
      publishedTime: post.date,
    },
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { '@type': 'Organization', name: 'Webbes' },
            publisher: { '@type': 'Organization', name: 'Webbes', logo: { '@type': 'ImageObject', url: 'https://www.webbes.in/favicon.png' } },
            mainEntityOfPage: `https://www.webbes.in/blog/${post.slug}`,
          }),
        }}
      />

      <article style={{ background: '#0a0a0a', padding: 'clamp(130px,15vw,180px) clamp(20px,5vw,64px) clamp(80px,10vw,120px)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Link href="/blog" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            ← All posts
          </Link>

          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: 24, marginBottom: 12, letterSpacing: '0.05em' }}>
            {formatDate(post.date)} · {post.readMinutes} min read
          </p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 36 }}>
            {post.title}
          </h1>

          <div style={{ fontSize: '15.5px', lineHeight: 1.85, color: 'rgba(255,255,255,0.7)' }}>
            {post.intro.map((p, i) => (
              <p key={`intro-${i}`} style={{ marginBottom: 20 }}>
                {p}
              </p>
            ))}

            {post.sections.map((section, si) => (
              <div key={`section-${si}`}>
                {section.heading && (
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: 40, marginBottom: 16, letterSpacing: '-0.3px' }}>
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, pi) => (
                  <p key={`p-${si}-${pi}`} style={{ marginBottom: 20 }}>
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)' }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: 10 }}>
              See it running before you commit to anything.
            </p>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', marginBottom: 20, lineHeight: 1.6 }}>
              Try the live AI automation demo — chat with a real working agent, no signup needed.
            </p>
            <Link
              href="/ai-automation#demo"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full"
              style={{ fontFamily: "'Syne', sans-serif", background: '#2563EB', color: '#fff' }}
            >
              Try the live demo →
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-14 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
                Related reading
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="block rounded-xl p-5 border" style={{ borderColor: 'rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.02)' }}>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.92rem', fontWeight: 700, color: '#fff', lineHeight: 1.35 }}>{r.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
