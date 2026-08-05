/** Adds an alpha channel to a `#rrggbb` hex color, returning an `rgba()` string. */
export function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function toRgb(hex: string) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function toHex(n: number) {
  return Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
}

/** Blends two `#rrggbb` hex colors — t=0 returns a, t=1 returns b. */
export function mix(a: string, b: string, t: number): string {
  const ca = toRgb(a);
  const cb = toRgb(b);
  const r = ca.r + (cb.r - ca.r) * t;
  const g = ca.g + (cb.g - ca.g) * t;
  const bl = ca.b + (cb.b - ca.b) * t;
  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
}
