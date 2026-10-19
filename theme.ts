'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  // Body text uses Mantine's default system font stack; Rubik is for headings only
  headings: { fontFamily: 'var(--font-rubik), sans-serif' },
  colors: {
    // Mantine's default dark palette with the background shades (4-9) pushed darker.
    // dark-7 is the page background, dark-6 raised surfaces, dark-4 borders.
    dark: [
      '#C9C9C9',
      '#b8b8b8',
      '#828282',
      '#696969',
      '#383838',
      '#2c2c2c',
      '#222222',
      '#161616',
      '#111111',
      '#0a0a0a',
    ],
  },
});
