// Canvas port of HeroSvg, for comparing animation performance.
//
// HeroSvg runs every rect through an SVG filter (Gaussian blur, then an alpha threshold) on
// every frame. Here each blob's thresholded outline is computed analytically (see ../blob.ts)
// and filled as a path, which matches the SVG output without any per-pixel filter work.

'use client';

import { useElementSize } from '@mantine/hooks';
import { easeCubicIn, easeCubicInOut, easeCubicOut, randomUniform } from 'd3';
import { useEffect, useRef } from 'react';
import { accentColor, BLOB_OPACITY } from '../accent';
import { cosineSpacing, forEachOutlinePoint, quarterOutline } from '../blob';
import { createGooeyText } from './gooeyText';
import classes from './HeroCanvas.module.css';

const HEIGHT = 400;
const t = 5500;
const maxW = 85;
const maxH = 150;
const minW = 3;
const minH = 3;
const RECT_COUNT = 25;

// Points per quarter of each blob outline
const SAMPLES = 12;

// Bisection steps when inverting the profile. 14 halvings of a <=83px range is under 0.01px.
const BISECT_STEPS = 14;

const textData = ['Data Visualization', 'Full-Stack Engineering', 'Data Storytelling'];

// Text styling for the gooey effect. Heavier, tighter text merges into fuller blobs when blurred.
const FONT_WEIGHT = 500;
const LETTER_SPACING_EM = -0.02;
const MAX_FONT_SIZE = 100;
// Blur at the blobbiest point, as a fraction of the font size
const MAX_BLUR_EM = 0.1;
// Threshold offset that hides the text entirely (18a - 7 - 11 <= 0 for any alpha)
const MAX_SHIFT = 11;
// Phase boundaries within each cycle: form from blobs, hold sharp, then dissolve
const FORMED = 0.35;
const DISSOLVING = 0.7;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Rect {
  from: Box;
  to: Box;
  color: string;
}

const SPACING = cosineSpacing(SAMPLES);
const us = new Float64Array(SAMPLES + 1);
const vs = new Float64Array(SAMPLES + 1);

// Adds the blob outline for a rect to the current path. Returns false if the blob is invisible.
function traceBlob(ctx: CanvasRenderingContext2D, { x, y, w, h }: Box) {
  if (!quarterOutline(w, h, SPACING, us, vs, BISECT_STEPS)) return false;
  ctx.beginPath();
  forEachOutlinePoint(x + w / 2, y + h / 2, us, vs, (px, py) => ctx.lineTo(px, py));
  ctx.closePath();
  return true;
}

const randVal = () => Math.round(Math.random() * 255);
const randomColor = () => `rgb(${randVal()}, ${randVal()}, ${randVal()})`;

const randomBox = (width: number): Box => ({
  x: randomUniform(0, width - maxW)(),
  y: randomUniform(0, HEIGHT - maxH)(),
  w: randomUniform(minW, maxW)(),
  h: randomUniform(minH, maxH)(),
});

const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);

// Blur and threshold shift (both 0 to 1) for the gooey text. Text rises out of nothing as blobs
// (shift falls while blur is still high), sharpens, holds, then melts and sinks away.
function textEffect(phase: number) {
  if (phase < FORMED) {
    const u = phase / FORMED;
    return { blur: 1 - easeCubicInOut(u), shift: 1 - easeCubicOut(clamp01(u / 0.6)) };
  }
  if (phase < DISSOLVING) return { blur: 0, shift: 0 };
  const v = (phase - DISSOLVING) / (1 - DISSOLVING);
  return { blur: easeCubicInOut(v), shift: easeCubicIn(clamp01((v - 0.4) / 0.6)) };
}

// Fallback when WebGL2 is unavailable: plain fade in and out
function textOpacity(phase: number) {
  if (phase < 0.25) return easeCubicInOut(phase / 0.25);
  if (phase < 0.75) return 1;
  return 1 - easeCubicInOut((phase - 0.75) / 0.25);
}

export function HeroCanvas() {
  const { ref, width } = useElementSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  const widthRef = useRef(0);

  useEffect(() => {
    widthRef.current = width;
  }, [width]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;
    const gooeyText = textCanvasRef.current && createGooeyText(textCanvasRef.current);

    // Live object: picks up theme (color) changes and the web font once it loads
    const style = getComputedStyle(canvas);
    let rects: Rect[] = [];
    let cycle = -1;
    let elapsed = 0;
    let last = performance.now();
    let frame = 0;

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      // Cap the step so returning to a background tab resumes instead of jumping ahead
      const step = Math.min(now - last, 100);
      last = now;

      const w = widthRef.current;
      if (!w) return;
      elapsed += step;

      // Size the backing store in device pixels so it stays sharp on retina displays.
      // Checked every frame so moving the window to a display with a different ratio also works.
      const dpr = window.devicePixelRatio || 1;
      const backingW = Math.round(w * dpr);
      const backingH = Math.round(HEIGHT * dpr);
      if (canvas.width !== backingW || canvas.height !== backingH) {
        canvas.width = backingW;
        canvas.height = backingH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, HEIGHT);

      const currentCycle = Math.floor(elapsed / t);
      if (currentCycle !== cycle) {
        cycle = currentCycle;
        rects =
          rects.length === 0
            ? Array.from({ length: RECT_COUNT }, (_, i) => ({
                from: { ...randomBox(w), w: 0, h: 0 },
                to: randomBox(w),
                // The first blob is the accent color shared with the active nav button
                color: i === 0 ? accentColor : randomColor(),
              }))
            : rects.map((r) => ({ ...r, from: r.to, to: randomBox(w) }));
      }

      const phase = (elapsed - cycle * t) / t;
      const p = easeCubicInOut(phase);

      ctx.globalAlpha = BLOB_OPACITY;
      for (const { from, to, color } of rects) {
        const box = {
          x: lerp(from.x, to.x, p),
          y: lerp(from.y, to.y, p),
          w: lerp(from.w, to.w, p),
          h: lerp(from.h, to.h, p),
        };
        if (traceBlob(ctx, box)) {
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      const text = textData[cycle % textData.length];
      // Shrink to fit if the heavier weight would overflow narrow screens
      const fontAt = (size: number) => `${FONT_WEIGHT} ${size}px ${style.fontFamily}`;
      const spacingAt = (size: number) => `${LETTER_SPACING_EM * size}px`;
      let fontSize = Math.min(MAX_FONT_SIZE, Math.round(w / 10));
      ctx.font = fontAt(fontSize);
      ctx.letterSpacing = spacingAt(fontSize);
      const textWidth = ctx.measureText(text).width;
      if (textWidth > w * 0.94) fontSize = Math.floor((fontSize * w * 0.94) / textWidth);
      const font = fontAt(fontSize);
      const spacing = spacingAt(fontSize);

      if (gooeyText) {
        const { blur, shift } = textEffect(phase);
        gooeyText.render({
          text,
          font,
          letterSpacing: spacing,
          width: w,
          height: HEIGHT,
          dpr,
          color: style.color,
          blur: blur * MAX_BLUR_EM * fontSize,
          shift: shift * MAX_SHIFT,
        });
      } else {
        ctx.globalAlpha = textOpacity(phase);
        ctx.font = font;
        ctx.letterSpacing = spacing;
        ctx.fillStyle = style.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(text, w / 2, HEIGHT / 2);
      }
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      gooeyText?.dispose();
    };
  }, []);

  return (
    <div className={classes.wrapper} ref={ref}>
      <div className={classes.stage}>
        <canvas
          ref={canvasRef}
          className={classes.canvas}
          role="img"
          aria-label={textData.join(', ')}
        />
        <canvas ref={textCanvasRef} className={classes.textCanvas} aria-hidden />
      </div>
    </div>
  );
}
