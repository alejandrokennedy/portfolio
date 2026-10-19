'use client';

import { ActionIcon, Group, MantineColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import blobClasses from '../BlobSurface/BlobSurface.module.css';
import { useBlobShape } from '../BlobSurface/useBlobShape';
import classes from './ThemeToggle.module.css';

const schemes: { value: MantineColorScheme; label: string; icon: typeof IconSun }[] = [
  { value: 'auto', label: 'System', icon: IconDeviceDesktop },
  { value: 'light', label: 'Light', icon: IconSun },
  { value: 'dark', label: 'Dark', icon: IconMoon },
];

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const blobRef = useBlobShape<HTMLButtonElement>();

  // The saved scheme lives in localStorage, so the server can't know which icon or label to
  // render. Wait until mounted to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const index = Math.max(
    schemes.findIndex((s) => s.value === colorScheme),
    0
  );
  const current = schemes[index];
  const next = schemes[(index + 1) % schemes.length];
  const Icon = current.icon;

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(next.value)}
        variant="default"
        size="xl"
        ref={blobRef}
        className={`${blobClasses.surface} ${classes.toggle}`}
        aria-label={mounted ? `Theme: ${current.label}. Switch to ${next.label}` : 'Theme'}
        title={mounted ? `Theme: ${current.label}` : undefined}
      >
        {mounted && <Icon className={classes.icon} stroke={1.5} />}
      </ActionIcon>
    </Group>
  );
}
