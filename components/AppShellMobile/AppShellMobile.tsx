'use client'

import { AppShell, Box, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { accentBlobColor } from '../accent';
import { useBlobShape } from '../BlobSurface/useBlobShape';
import blobClasses from '../BlobSurface/BlobSurface.module.css';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { AkLogo } from '../svgs';
import classes from './AppShellMobile.module.css';

const links = [
  { link: '/', label: 'Portfolio' },
  // { link: '/portfolio', label: 'Portfolio' },
  { link: '/awards', label: 'Awards' },
  { link: '/writing', label: 'Writing' },
  { link: '/teaching', label: 'Teaching' },
  { link: '/about', label: 'About' },
  { link: '/contact', label: 'Contact' },
  // { link: '/test', label: 'Test' },
]

interface NavLinkProps {
  href: string
  label: string
  active: boolean
  onClick: () => void
}

// Nav button whose hover and active backgrounds take the shape of the hero's blobs
function NavLink({ href, label, active, onClick }: NavLinkProps) {
  const ref = useBlobShape<HTMLAnchorElement>()
  return (
    <Link
      ref={ref}
      href={href}
      className={`${blobClasses.surface} ${classes.link}`}
      data-active={active || undefined}
      onClick={onClick}
    >
      {label}
    </Link>
  )
}

export default function MobileNavbar({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure()
  const pathLink = links.find((link) => link.link === usePathname())
  const [active, setActive] = useState(pathLink?.link || null)

  // The accent is random per page load, so it's applied after hydration rather than rendered
  useEffect(() => {
    document.documentElement.style.setProperty('--ak-accent', accentBlobColor)
  }, [])

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      href={link.link}
      label={link.label}
      active={active === link.link}
      onClick={() => setActive(link.link)}
    />
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
