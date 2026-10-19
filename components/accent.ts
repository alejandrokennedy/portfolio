// One accent color per page load, shared by the hero (as one of its blobs) and the active nav
// button. It's drawn the same way as the other blobs (a random RGB color at 30% opacity), but only
// accepted if it's a blue, purple, or green, saturated enough not to read as gray or brown, and
// legible behind the nav text in both color schemes.

export const BLOB_OPACITY = 0.3;

type Rgb = [number, number, number];

// Page backgrounds the blobs sit on (white, and the theme's dark-7)
const LIGHT_BG: Rgb = [255, 255, 255];
const DARK_BG: Rgb = [22, 22, 22];
// Text on the active nav button in each scheme
export const ACCENT_TEXT_LIGHT = '#1a1a1a';
export const ACCENT_TEXT_DARK = '#e6e6e6';
const LIGHT_TEXT: Rgb = [26, 26, 26];
const DARK_TEXT: Rgb = [230, 230, 230];
const MIN_CONTRAST = 4.5;

function hsl([r, g, b]: Rgb) {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return { h: (h * 60 + 360) % 360, s, l };
}

// WCAG relative luminance and contrast ratio
function luminance(rgb: Rgb) {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: Rgb, b: Rgb) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const composite = (color: Rgb, bg: Rgb) =>
  color.map((c, i) => c * BLOB_OPACITY + bg[i] * (1 - BLOB_OPACITY)) as Rgb;

function isAccent(color: Rgb) {
  const { h, s, l } = hsl(color);
  return (
    h >= 90 &&
    h <= 300 &&
    s >= 0.5 &&
    l >= 0.35 &&
    l <= 0.7 &&
    contrast(composite(color, LIGHT_BG), LIGHT_TEXT) >= MIN_CONTRAST &&
    contrast(composite(color, DARK_BG), DARK_TEXT) >= MIN_CONTRAST
  );
}

const randVal = () => Math.round(Math.random() * 255);

function pickAccent(): Rgb {
  for (let i = 0; i < 1000; i += 1) {
    const color: Rgb = [randVal(), randVal(), randVal()];
    if (isAccent(color)) return color;
  }
  return [90, 110, 230];
}

const [r, g, b] = pickAccent();

/** Opaque accent color, for drawing as a blob at BLOB_OPACITY */
export const accentColor = `rgb(${r}, ${g}, ${b})`;

/** The accent as it appears in the hero: translucent over the page background */
export const accentBlobColor = `rgba(${r}, ${g}, ${b}, ${BLOB_OPACITY})`;
