import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog/posts'

const BASE = 'https://www.webbes.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/ai-automation`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/wedding-invitations`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/templates`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/portfolio`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/work`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/services`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/team`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/terms`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/refund-policy`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
