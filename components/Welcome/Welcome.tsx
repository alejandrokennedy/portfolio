import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';
import Link from 'next/link';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Alexander{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Kennedy
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit page.tsx file.
      </Text>
    </>
  );
}
