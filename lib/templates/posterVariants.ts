import type { Religion } from './types';

export interface PosterAccent {
  ink: string;
  accent: string;
  gold: string;
  cardBg: string;
}

export interface PosterVariant {
  id: string;
  kind: 'poster';
  religion: Religion;
  label: string;
  /** Background image path — fixed asset, or null when kind is used for the custom flow. */
  backgroundImage: string;
  thumbnail: string;
  accent: PosterAccent;
  demo: { brideName: string; groomName: string; date: string; time: string; venue: string; venueCity: string };
}

export interface EnvelopeVariant {
  id: string;
  kind: 'envelope';
  religion: Religion;
  label: string;
  colorPresetId: string;
  thumbnail: string;
  demo: { brideName: string; groomName: string; date: string; time: string; venue: string; venueCity: string };
}

export type TemplateVariant = PosterVariant | EnvelopeVariant;

export const TEMPLATE_VARIANTS: TemplateVariant[] = [
  // ── Muslim ──────────────────────────────────────────────────────────
  {
    id: 'muslim-blue',
    kind: 'envelope',
    religion: 'islamic',
    label: 'Sinan & Rifa style',
    colorPresetId: 'emerald-gold',
    thumbnail: '/gallery/demo-fairooz-wedding.jpg',
    demo: { brideName: 'Rifa', groomName: 'Sinan', date: '2026-11-22', time: '5:00 PM – 8:00 PM', venue: 'Crescent Banquet Hall', venueCity: 'Kozhikode, Kerala' },
  },
  {
    id: 'muslim-red',
    kind: 'envelope',
    religion: 'islamic',
    label: 'Rihana & Suhail style',
    colorPresetId: 'crimson-gold',
    thumbnail: '/gallery/demo-wedding-invitation-two.jpg',
    demo: { brideName: 'Rihana', groomName: 'Suhail', date: '2026-12-12', time: '4:00 PM – 7:00 PM', venue: 'Al Fajr Convention Centre', venueCity: 'Kondotty, Kerala' },
  },
  {
    id: 'muslim-navy-poster',
    kind: 'poster',
    religion: 'islamic',
    label: 'Usman & Aisha style',
    backgroundImage: '/backgrounds/muslim-usman-aisha.jpg',
    thumbnail: '/backgrounds/muslim-usman-aisha.jpg',
    accent: { ink: '#1c2438', accent: '#0d1b2e', gold: '#c9a24a', cardBg: '#faf6ec' },
    demo: { brideName: 'Aisha', groomName: 'Usman', date: '2026-05-25', time: '5:00 PM', venue: 'The Grand Hall', venueCity: 'New York, USA' },
  },

  // ── Hindu ───────────────────────────────────────────────────────────
  {
    id: 'hindu-ganesh',
    kind: 'envelope',
    religion: 'hindu',
    label: 'Vardhan & Gayathri style',
    colorPresetId: 'maroon-gold',
    thumbnail: '/gallery/wedding-vardhan-gayathri.jpg',
    demo: { brideName: 'Gayathri Devi', groomName: 'Vardhan', date: '2026-09-05', time: '11:00 AM (Muhurtham)', venue: 'Sri Kalyana Mandapam', venueCity: 'Chennai, Tamil Nadu' },
  },
  {
    id: 'hindu-peacock-poster',
    kind: 'poster',
    religion: 'hindu',
    label: 'Peacock Arch style',
    backgroundImage: '/backgrounds/hindu-peacock-arch.jpg',
    thumbnail: '/backgrounds/hindu-peacock-arch.jpg',
    accent: { ink: '#3a0d16', accent: '#8b1e3f', gold: '#c9a24a', cardBg: '#fbf3e4' },
    demo: { brideName: 'Priya', groomName: 'Arjun', date: '2026-03-03', time: '11:00 AM (Muhurtham)', venue: 'Renuka Mangal Karyalay', venueCity: 'Pargaon, Pune' },
  },
  {
    id: 'hindu-navnath-kaveri-poster',
    kind: 'poster',
    religion: 'hindu',
    label: 'Navnath & Kaveri style',
    backgroundImage: '/backgrounds/hindu-navnath-kaveri.jpg',
    thumbnail: '/backgrounds/hindu-navnath-kaveri.jpg',
    accent: { ink: '#4a2c30', accent: '#8a5a5f', gold: '#c9a24a', cardBg: '#faf3ef' },
    demo: { brideName: 'Kaveri', groomName: 'Navnath', date: '2026-04-28', time: '2:45 PM', venue: 'Renuka Mangal Karyalay', venueCity: 'Daund, Pune' },
  },

  // ── Christian ───────────────────────────────────────────────────────
  {
    id: 'christian-envelope',
    kind: 'envelope',
    religion: 'christian',
    label: 'Arjun & Meghana style',
    colorPresetId: 'ivory-gold',
    thumbnail: '/gallery/wedding-arjun-meghana.jpg',
    demo: { brideName: 'Meghana', groomName: 'Arjun', date: '2026-05-23', time: '4:00 PM', venue: 'St. Thomas Church', venueCity: 'Bengaluru, Karnataka' },
  },
  {
    id: 'christian-church-poster',
    kind: 'poster',
    religion: 'christian',
    label: "Nathaniel & Elizabeth style",
    backgroundImage: '/backgrounds/christian-church.jpg',
    thumbnail: '/backgrounds/christian-church.jpg',
    accent: { ink: '#2c3524', accent: '#5b6f4f', gold: '#c9a24a', cardBg: '#fbfaf3' },
    demo: { brideName: 'Elizabeth', groomName: 'Nathaniel', date: '2026-05-24', time: '4:00 PM', venue: "St. Andrew's Church", venueCity: 'Bangalore, Karnataka' },
  },
  {
    id: 'christian-chandelier-poster',
    kind: 'poster',
    religion: 'christian',
    label: 'Garden Arch style',
    backgroundImage: '/backgrounds/christian-chandelier-arch.jpg',
    thumbnail: '/backgrounds/christian-chandelier-arch.jpg',
    accent: { ink: '#2f3a2a', accent: '#7c8c6e', gold: '#e8dcc0', cardBg: '#fbfbf5' },
    demo: { brideName: 'Sophia', groomName: 'Daniel', date: '2026-06-07', time: '6:00 PM', venue: 'The Ivy Garden Hall', venueCity: 'Bangalore, Karnataka' },
  },
];

export function getVariantsByReligion(religion: Religion): TemplateVariant[] {
  return TEMPLATE_VARIANTS.filter((v) => v.religion === religion);
}

export function getVariant(id: string): TemplateVariant | undefined {
  return TEMPLATE_VARIANTS.find((v) => v.id === id);
}
