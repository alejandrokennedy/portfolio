"use client"

import { useState } from 'react';
import { Container, Group } from '@mantine/core';
import classes from './HeaderSimple.module.css';
// import Image from 'next/image';
import Link from 'next/link';
import { AkLogo } from '../svgs';

const links = [
  { link: '/test', label: 'Test' },
  { link: '/about', label: 'About' },
  { link: '/portfolio', label: 'Portfolio' },
  { link: '/awards', label: 'Awards' },
  { link: '/teaching', label: 'Teaching' },
  { link: '/contact', label: 'Contact' },
  // { link: '/community', label: 'Community' },
];

export function HeaderSimple() {
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.link)
      }}
    >
      {link.label}
    </a>
  ))

  console.log(items)

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Link href="/">
          <AkLogo />
        </Link>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
      </Container>
    </header>
  )
}