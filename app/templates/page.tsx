import type { Metadata } from 'next'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Wedding Invitation Website Builder — Webbes',
  description:
    'Build your own animated wedding invitation website in minutes. Pick your religion, add your names, date and venue, and get a shareable link.',
  robots: { index: true, follow: true },
}

export default function TemplatesGalleryPage() {
  return <GalleryClient />
}
