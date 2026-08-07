import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/templates/dashboard/'],
    },
    sitemap: 'https://www.webbes.in/sitemap.xml',
    host: 'https://www.webbes.in',
  }
}
