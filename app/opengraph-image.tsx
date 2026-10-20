// Link-preview image (Open Graph / Twitter) for every page, generated at build time.
// Echoes the hero: translucent pastel blobs behind the name, in Rubik.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Alexander Kennedy: data visualization and full-stack engineering';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// [left, top, width, height, color]: fixed so the image is the same on every build
const blobs: [number, number, number, number, string][] = [
  [690, 40, 120, 210, 'rgb(94, 102, 250)'],
  [840, 120, 90, 90, 'rgb(36, 224, 218)'],
  [960, 30, 150, 120, 'rgb(167, 17, 252)'],
  [1040, 200, 110, 230, 'rgb(103, 213, 19)'],
  [880, 260, 130, 160, 'rgb(250, 170, 60)'],
  [730, 330, 100, 120, 'rgb(240, 90, 150)'],
  [960, 470, 170, 110, 'rgb(13, 94, 236)'],
  [780, 500, 110, 90, 'rgb(55, 248, 125)'],
  [60, 40, 90, 60, 'rgb(147, 9, 170)'],
  [470, 520, 120, 70, 'rgb(5, 175, 243)'],
];

export default async function Image() {
  const fonts = join(process.cwd(), 'assets/fonts');
  const [regular, bold] = await Promise.all([
    readFile(join(fonts, 'Rubik-400.ttf')),
    readFile(join(fonts, 'Rubik-700.ttf')),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 90px',
        backgroundColor: '#ffffff',
        fontFamily: 'Rubik',
        position: 'relative',
      }}
    >
      {blobs.map(([left, top, width, height, color]) => (
        <div
          key={`${left}-${top}`}
          style={{
            position: 'absolute',
            left,
            top,
            width,
            height,
            borderRadius: 26,
            backgroundColor: color,
            opacity: 0.3,
          }}
        />
      ))}
      <div style={{ fontSize: 84, fontWeight: 700, color: '#111111', letterSpacing: -1.5 }}>
        Alexander Kennedy
      </div>
      <div style={{ fontSize: 31, fontWeight: 400, color: '#333333', marginTop: 18 }}>
        Data Visualization · Full-Stack Engineering · Data Storytelling
      </div>
      <div style={{ fontSize: 26, fontWeight: 400, color: '#777777', marginTop: 40 }}>
        alexanderkennedy.io
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Rubik', data: regular, weight: 400, style: 'normal' },
        { name: 'Rubik', data: bold, weight: 700, style: 'normal' },
      ],
    }
  );
}
