'use client'

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AkLogo } from '../svgs';
import classes from './AppShellMobile.module.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

const links = [
  { link: '/', label: 'Home' },
  // { link: '/test', label: 'Test' },
  { link: '/portfolio', label: 'Portfolio' },
  { link: '/awards', label: 'Awards' },
  { link: '/teaching', label: 'Teaching' },
  { link: '/about', label: 'About' },
  { link: '/contact', label: 'Contact' },
]

export default function MobileNavbar({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure()
  const pathLink = links.find((link) => link.link === usePathname())
  const [active, setActive] = useState(pathLink?.link || '/')

  const items = links.map((link) => (
    <Link key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => setActive(link.link)}
    >
      {link.label}
    </Link>
  ))

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <AkLogo />
            <Group ml="xl" gap={0} visibleFrom="sm">
              {items}
            </Group>
            <ThemeToggle />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {items}
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}