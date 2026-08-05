export type Religion = 'islamic' | 'christian' | 'hindu';

export interface ColorPreset {
  id: string;
  name: string;
  /** Darkest text color (headings, names). */
  ink: string;
  /** Primary accent — numbers, active states, buttons. */
  accent: string;
  /** Mid gradient stop for accent gradients. */
  accentDeep: string;
  /** Deepest gradient stop for accent gradients. */
  accentDarkest: string;
  /** Muted gold used for hairlines, dots, icon strokes. */
  gold: string;
  /** Bright gold used for gradient highlights (play button, shimmer). */
  goldBright: string;
  /** Olive-gold used for small uppercase labels. */
  label: string;
  /** Base color for the frosted card background (alpha applied at use site). */
  cardBg: string;
  /** Page body background behind the invite. */
  bodyBg: string;
  /** Four-stop background gradient for the cover/loading screen. */
  pageBgStops: [string, string, string, string];
  /** Petal accent colors (decorative fall animation). */
  petalPrimary: string;
  petalSecondary: string;
}

export interface ReligionTerminology {
  /** Short label used in the hero badge and section headline, e.g. "Nikah". */
  eventLabel: string;
  /** e.g. "A Nikah Invitation" shown on the cover screen. */
  invitationLabel: string;
  /** Sentence under the badge, before the couple's names. */
  heroSubtitle: string;
  /** Closing blessing line shown after the date/time reveal. */
  closingLine: string;
  /** Devotional line shown in the footer, in the religion's traditional script. */
  footerBlessing: string;
}

export interface InviteData {
  groomName: string;
  brideName: string;
  /** ISO date string, e.g. "2026-12-12". */
  date: string;
  /** Free-text time range, e.g. "4:00 PM – 7:00 PM". */
  time: string;
  venue: string;
  venueCity: string;
  colorPresetId: string;
  photoUrl: string | null;
  /** Paid add-on (+₹59) — customer's own uploaded track, replaces the default religion music. */
  audioUrl: string | null;
  /** Pasted Google Maps link — takes priority over the auto-generated venue+city search. */
  mapsUrl: string;
  /** Decorative falling-petal animation, on by default. */
  showPetals: boolean;
  /** Overridable copy — falls back to the religion's default when blank. */
  eventLabel: string;
  heroSubtitle: string;
  closingLine: string;
  footerBlessing: string;
}

export interface RsvpResponseRecord {
  id: string;
  guestName: string;
  attending: boolean;
  guestCount: number;
  message: string | null;
  createdAt: string;
}

export interface InviteRecord {
  id: string;
  templateId: string;
  religion: Religion;
  data: InviteData;
  whatsapp: string | null;
  status: 'draft' | 'paid';
  createdAt: string;
  paidAt: string | null;
  rsvpEnabled: boolean;
  songEnabled: boolean;
  rsvpDashboardToken: string | null;
  previewShareToken: string | null;
  previewShareViewedAt: string | null;
}
