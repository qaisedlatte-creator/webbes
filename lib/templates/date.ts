const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Parses "YYYY-MM-DD" as a local date (avoids UTC off-by-one from `new Date(str)`). */
export function parseInviteDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y || 2026, (m || 1) - 1, d || 1);
}

export function formatDateParts(iso: string) {
  const date = parseInviteDate(iso);
  return {
    weekday: WEEKDAYS[date.getDay()],
    day: date.getDate(),
    month: MONTHS[date.getMonth()],
    year: date.getFullYear(),
  };
}

/** "Saturday, 12 December 2026" */
export function formatDateLong(iso: string): string {
  const { weekday, day, month, year } = formatDateParts(iso);
  return `${weekday}, ${day} ${month} ${year}`;
}

/** "12 · December · 2026" */
export function formatDateDotted(iso: string): string {
  const { day, month, year } = formatDateParts(iso);
  return `${day} · ${month} · ${year}`;
}
