// Layered Mantine styles, so the site's own CSS always takes precedence over Mantine's defaults
import '@mantine/core/styles.layer.css';
import './globals.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Rubik } from 'next/font/google';
import { theme } from '../theme';

const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' });

export const metadata = {
  title: { default: "Alexander Kennedy", template: "%s | Alexander Kennedy" },
  description: "Alexander Kennedy's portfolio",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" className={rubik.variable} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">{children}</MantineProvider>
      </body>
    </html>
  );
}
