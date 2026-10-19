// Geometry of the hero's "gooey" blobs, shared by the hero canvas and the button shapes.
//
// The original SVG blurs each rect with a Gaussian, then thresholds the alpha. A rect blurred by
// a Gaussian has alpha profileX(x) * profileY(y), so the visible blob is the region where that
// product clears the threshold, and its outline can be traced directly without any pixel work.

// Matches the SVG filter: feGaussianBlur stdDeviation 8, then feColorMatrix mapping alpha to
// 18a - 7. The edge sits where 18a - 7 crosses 0.5, i.e. a = 7.5 / 18.
const BLUR = 8;
const THRESHOLD = 7.5 / 18;

// Abramowitz & Stegun 7.1.26, max error 1.5e-7
function erf(x: number) {
  const sign = Math.sign(x);
  const ax = Math.abs(x);
  const k = 1 / (1 + 0.3275911 * ax);
  const poly =
    ((((1.061405429 * k - 1.453152027) * k + 1.421413741) * k - 0.284496736) * k + 0.254829592) * k;
  return sign * (1 - poly * Math.exp(-ax * ax));
}

const gaussianCdf = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2));

// Alpha of a blurred 1D box with the given half-width, at offset u from its center
const profile = (u: number, half: number) =>
  gaussianCdf((u + half) / BLUR) - gaussianCdf((u - half) / BLUR);

// Offset u >= 0 where profile(u, half) = target. profile decreases for u >= 0, so bisect.
function inverseProfile(target: number, half: number, steps: number) {
  let lo = 0;
  let hi = half + 5 * BLUR;
  for (let i = 0; i < steps; i += 1) {
    const mid = (lo + hi) / 2;
    if (profile(mid, half) > target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Cosine spacing keeps samples evenly spread along the outline where it meets the axes */
export const cosineSpacing = (samples: number) =>
  Array.from({ length: samples + 1 }, (_, i) => (1 - Math.cos((Math.PI * i) / samples)) / 2);

/**
 * Fills us/vs with one quarter of the blob outline for a w x h rect, as offsets from its center,
 * running from the horizontal axis (us[0], 0) to the vertical axis (0, vs[last]).
 * Returns false if the rect is too small to produce a visible blob.
 */
export function quarterOutline(
  w: number,
  h: number,
  spacing: number[],
  us: Float64Array,
  vs: Float64Array,
  bisectSteps: number
) {
  const halfW = w / 2;
  const halfH = h / 2;
  // fx is the horizontal profile value; fx * fy = THRESHOLD along the outline
  const lo = THRESHOLD / profile(0, halfH);
  const hi = profile(0, halfW);
  if (lo >= hi) return false;

  for (let i = 0; i < spacing.length; i += 1) {
    const fx = lo + (hi - lo) * spacing[i];
    us[i] = inverseProfile(fx, halfW, bisectSteps);
    vs[i] = inverseProfile(THRESHOLD / fx, halfH, bisectSteps);
  }
  return true;
}

/** Walks the full outline (all four mirrored quarters) around a center point */
export function forEachOutlinePoint(
  cx: number,
  cy: number,
  us: Float64Array,
  vs: Float64Array,
  point: (x: number, y: number) => void
) {
  const last = us.length - 1;
  for (let i = 0; i <= last; i += 1) point(cx + us[i], cy - vs[i]);
  for (let i = last; i >= 0; i -= 1) point(cx - us[i], cy - vs[i]);
  for (let i = 0; i <= last; i += 1) point(cx - us[i], cy + vs[i]);
  for (let i = last; i >= 0; i -= 1) point(cx + us[i], cy + vs[i]);
}

const PATH_SAMPLES = 16;
const pathSpacing = cosineSpacing(PATH_SAMPLES);
const pathCache = new Map<string, string>();

/**
 * SVG path data for a blob that exactly fills a width x height box, for use in
 * `clip-path: path(...)`. The blob comes out slightly smaller than the rect that produces it,
 * so the rect is grown until the visible blob matches the box.
 */
export function blobPath(width: number, height: number) {
  const key = `${width}x${height}`;
  const cached = pathCache.get(key);
  if (cached) return cached;

  const us = new Float64Array(PATH_SAMPLES + 1);
  const vs = new Float64Array(PATH_SAMPLES + 1);
  let w = width;
  let h = height;
  for (let i = 0; i < 12; i += 1) {
    quarterOutline(w, h, pathSpacing, us, vs, 24);
    w += width - 2 * us[0];
    h += height - 2 * vs[PATH_SAMPLES];
  }
  quarterOutline(w, h, pathSpacing, us, vs, 24);

  const points: string[] = [];
  forEachOutlinePoint(width / 2, height / 2, us, vs, (x, y) => {
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  });
  const path = `M${points.join('L')}Z`;
  pathCache.set(key, path);
  return path;
}
