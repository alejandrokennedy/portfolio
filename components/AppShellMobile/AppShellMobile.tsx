'use client'

import { AppShell, Box, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { AkLogo } from '../svgs';
import classes from './AppShellMobile.module.css';

const links = [
  { link: '/', label: 'Home' },
  // { link: '/portfolio', label: 'Portfolio' },
  { link: '/awards', label: 'Awards' },
  // { link: '/teaching', label: 'Teaching' },
  // { link: '/about', label: 'About' },
  { link: '/contact', label: 'Contact' },
  // { link: '/test', label: 'Test' },
]

export default function MobileNavbar({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure()
  const pathLink = links.find((link) => link.link === usePathname())
  const [active, setActive] = useState(pathLink?.link || null)

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
        <Container size={2000}>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group justify="space-between" style={{ flex: 1 }}>
              {/* <Box sx={{ width: 40, height: 40 }}> */}
              <Link href="/" className={classes.logoLink}>
                <Box h='59px' w='59px'>
                  <AkLogo />
                </Box>
              </Link>
              <Group ml="xl" gap={0} visibleFrom="sm">
                {items}
              </Group>
              <ThemeToggle />
            </Group>
          </Group>
        </Container>
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