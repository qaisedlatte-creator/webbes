import type { Religion } from './types';

export interface GalleryEntry {
  id: string;
  religion: Religion;
  presetId: string;
  names: string;
  tagline: string;
  /** Real screenshot of the reference site's envelope/hero screen. */
  thumbnail: string;
}

export const GALLERY_ENTRIES: GalleryEntry[] = [
  {
    id: 'demo-wedding-invitation-two',
    religion: 'islamic',
    presetId: 'crimson-gold',
    names: 'Rihana & Suhail',
    tagline: 'Envelope reveal, nasheed audio',
    thumbnail: '/gallery/demo-wedding-invitation-two.jpg',
  },
  {
    id: 'demo-fairooz-wedding',
    religion: 'islamic',
    presetId: 'emerald-gold',
    names: 'Sinan & Rifa',
    tagline: 'Monogram seal, nasheed audio',
    thumbnail: '/gallery/demo-fairooz-wedding.jpg',
  },
  {
    id: 'faisal-ayesha-wedding',
    religion: 'islamic',
    presetId: 'ivory-sage',
    names: 'Faisal & Ayesha',
    tagline: 'A Nikah Invitation',
    thumbnail: '/gallery/faisal-ayesha-wedding.jpg',
  },
  {
    id: 'wedding-vardhan-gayathri',
    religion: 'hindu',
    presetId: 'maroon-gold',
    names: 'Vardhan & Gayathri',
    tagline: 'Ganesh motif, Muhurtham timing',
    thumbnail: '/gallery/wedding-vardhan-gayathri.jpg',
  },
  {
    id: 'wedding-arjun-meghana',
    religion: 'christian',
    presetId: 'ivory-gold',
    names: 'Arjun & Meghana',
    tagline: 'Scroll-animated, hymn audio',
    thumbnail: '/gallery/wedding-arjun-meghana.jpg',
  },
];
