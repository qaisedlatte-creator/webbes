import type { ColorPreset, Religion, ReligionTerminology } from './types';

export const RELIGIONS: { id: Religion; label: string }[] = [
  { id: 'islamic', label: 'Islamic' },
  { id: 'christian', label: 'Christian' },
  { id: 'hindu', label: 'Hindu' },
];

export const RELIGION_PRESETS: Record<Religion, ColorPreset[]> = {
  islamic: [
    {
      id: 'emerald-gold',
      name: 'Emerald & Gold',
      ink: '#0B2A1D',
      accent: '#0F5132',
      accentDeep: '#0A3B24',
      accentDarkest: '#062718',
      gold: '#B8902A',
      goldBright: '#D4AF37',
      label: '#6E7B1E',
      cardBg: '#FFF8EA',
      bodyBg: '#EDF1E4',
      pageBgStops: ['#DCE9DA', '#F1F4E9', '#E3EEDB', '#D6E4D0'],
      petalPrimary: '#1E7A46',
      petalSecondary: '#12502E',
    },
    {
      id: 'crimson-gold',
      name: 'Crimson & Gold',
      ink: '#3D0A0A',
      accent: '#8B1A1A',
      accentDeep: '#5C0E0E',
      accentDarkest: '#2D0505',
      gold: '#B8902A',
      goldBright: '#D4AF37',
      label: '#8B6F1E',
      cardBg: '#FFF6EA',
      bodyBg: '#F5E6D3',
      pageBgStops: ['#F0D8BC', '#FAF0E4', '#F5E6CC', '#EDD6B4'],
      petalPrimary: '#EE1A1A',
      petalSecondary: '#CC1111',
    },
    {
      id: 'ivory-sage',
      name: 'Ivory & Sage',
      ink: '#243527',
      accent: '#4A6B4E',
      accentDeep: '#33502F',
      accentDarkest: '#20331E',
      gold: '#C9A84C',
      goldBright: '#E3C878',
      label: '#7A8B4E',
      cardBg: '#FBFAF3',
      bodyBg: '#F1EFE2',
      pageBgStops: ['#E9EBDC', '#F7F6EC', '#EFF0DF', '#E4E6D2'],
      petalPrimary: '#8AA669',
      petalSecondary: '#5C7A45',
    },
  ],
  christian: [
    {
      id: 'ivory-gold',
      name: 'Ivory & Gold',
      ink: '#3A342A',
      accent: '#A88232',
      accentDeep: '#7A5E22',
      accentDarkest: '#4E3B15',
      gold: '#C9A84C',
      goldBright: '#E9CE84',
      label: '#8B6F1E',
      cardBg: '#FFFDF6',
      bodyBg: '#F7F2E8',
      pageBgStops: ['#F4EEDD', '#FFFBF2', '#F7F1E2', '#EFE6CF'],
      petalPrimary: '#E9CE84',
      petalSecondary: '#C9A84C',
    },
    {
      id: 'blush-gold',
      name: 'Blush & Gold',
      ink: '#3E2A2E',
      accent: '#B96B7C',
      accentDeep: '#8C4A58',
      accentDarkest: '#5E2E38',
      gold: '#C9A84C',
      goldBright: '#E9CE84',
      label: '#A5707E',
      cardBg: '#FFF7F6',
      bodyBg: '#FAEBE7',
      pageBgStops: ['#F6DEDA', '#FDF2EF', '#F8E4E0', '#F1D6D0'],
      petalPrimary: '#E8A9B5',
      petalSecondary: '#C97C8C',
    },
    {
      id: 'sage-cream',
      name: 'Sage & Cream',
      ink: '#2E3630',
      accent: '#6E8A72',
      accentDeep: '#4E6B52',
      accentDarkest: '#324434',
      gold: '#C2B078',
      goldBright: '#DFCE96',
      label: '#7C8B6E',
      cardBg: '#FBFBF4',
      bodyBg: '#F0F1E6',
      pageBgStops: ['#E6EBDD', '#F6F7EE', '#EDF0E1', '#E1E6D2'],
      petalPrimary: '#A9C3A0',
      petalSecondary: '#7CA072',
    },
  ],
  hindu: [
    {
      id: 'maroon-gold',
      name: 'Maroon & Gold',
      ink: '#3D0A0A',
      accent: '#8B1A1A',
      accentDeep: '#5C0E0E',
      accentDarkest: '#2D0505',
      gold: '#D4AF37',
      goldBright: '#F0D060',
      label: '#8B6F1E',
      cardBg: '#FFF6EA',
      bodyBg: '#F7E4D3',
      pageBgStops: ['#F3D6B0', '#FBEEDB', '#F7E2C0', '#EFD1A4'],
      petalPrimary: '#E8811A',
      petalSecondary: '#B85410',
    },
    {
      id: 'royal-red',
      name: 'Royal Red & Gold',
      ink: '#380707',
      accent: '#A31B1B',
      accentDeep: '#6E0F0F',
      accentDarkest: '#420707',
      gold: '#C9A84C',
      goldBright: '#F0D060',
      label: '#8B6F1E',
      cardBg: '#FFF7EC',
      bodyBg: '#F6E2CE',
      pageBgStops: ['#F2CFA9', '#FAEBD6', '#F6DFBB', '#EECC9C'],
      petalPrimary: '#D4212A',
      petalSecondary: '#970F16',
    },
    {
      id: 'saffron-gold',
      name: 'Saffron & Gold',
      ink: '#3D2408',
      accent: '#C1631B',
      accentDeep: '#8E4611',
      accentDarkest: '#5C2C08',
      gold: '#D4AF37',
      goldBright: '#F4D874',
      label: '#8B6F1E',
      cardBg: '#FFF8EC',
      bodyBg: '#FBEBD3',
      pageBgStops: ['#F6DCAC', '#FDF2DE', '#FAE7C1', '#F3D69E'],
      petalPrimary: '#F0932B',
      petalSecondary: '#C1631B',
    },
  ],
};

export const DEFAULT_PRESET_ID: Record<Religion, string> = {
  islamic: 'emerald-gold',
  christian: 'ivory-gold',
  hindu: 'maroon-gold',
};

export const RELIGION_TERMINOLOGY: Record<Religion, ReligionTerminology> = {
  islamic: {
    eventLabel: 'Nikah',
    invitationLabel: 'A Nikah Invitation',
    heroSubtitle: 'Together with our families joyfully invite you to celebrate our Nikah',
    closingLine: 'Jazakallahu Khairan for joining our celebration',
    footerBlessing: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
  },
  christian: {
    eventLabel: 'Wedding',
    invitationLabel: 'A Wedding Invitation',
    heroSubtitle: 'Together with our families joyfully invite you to celebrate our Wedding',
    closingLine: "With God's blessings, we can't wait to celebrate with you",
    footerBlessing: 'And these three remain: faith, hope and love — 1 Corinthians 13:13',
  },
  hindu: {
    eventLabel: 'Vivaha',
    invitationLabel: 'A Vivaha Invitation',
    heroSubtitle: 'Together with our families joyfully invite you to celebrate our Vivaha',
    closingLine: 'With our elders’ blessings, we invite you to celebrate with us',
    footerBlessing: 'शुभम् भवतु — May this union be auspicious and blessed',
  },
};

/** Default background music track per religion, served from /public/music. */
export const RELIGION_MUSIC: Record<Religion, { src: string; label: string }> = {
  islamic: { src: '/music/islamic-nasheed.m4a', label: 'Nasheed' },
  christian: { src: '/music/christian-hymn.mp3', label: 'Hymn' },
  hindu: { src: '/music/hindu-shehnai.mp3', label: 'Shehnai' },
};

/** Shown behind the envelope template whenever the customer hasn't uploaded their own photo yet. */
export const RELIGION_DEFAULT_BACKGROUND: Record<Religion, string> = {
  islamic: '/backgrounds/muslim-usman-aisha.jpg',
  hindu: '/backgrounds/hindu-peacock-arch.jpg',
  christian: '/backgrounds/christian-church.jpg',
};

export function getPreset(religion: Religion, presetId: string): ColorPreset {
  const list = RELIGION_PRESETS[religion];
  return list.find((p) => p.id === presetId) ?? list[0];
}
