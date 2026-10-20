import { HeroCanvas } from '@/components/HeroCanvas/HeroCanvas';
import { ProjectGrid } from '@/components/ProjectGrid/ProjectGrid';
import { Anchor, Container, Group, Space, Text, Title } from '@mantine/core';
import AppShellMobile from '../components/AppShellMobile/AppShellMobile';
import classes from './page.module.css';

export default function HomePage() {
  return (
    <AppShellMobile>
      <Space h="lg" />
      <Container size={1500}>
        <HeroCanvas />
      </Container>

      {/* Who this is, for first-time visitors (the hero text is drawn on a canvas) */}
      <Container mb="md" className={classes.intro}>
        <Title order={1} className={classes.name}>
          Alexander Kennedy
        </Title>
        <Text className={classes.description}>
          Software engineer, data visualization engineer, data journalist, and author specializing
          in custom analytics and interactive data storytelling. Currently Senior Product Engineer, Front-End
          and Data Visualization at C&EN.
        </Text>
        <Group gap="lg" mt="sm" justify="center">
          <Anchor href="/about">About</Anchor>
          <Anchor href="/Alexander_Kennedy_Resume.pdf" target="_blank">
            Resume
          </Anchor>
          <Anchor href="/contact">Contact</Anchor>
        </Group>
      </Container>

      <ProjectGrid />
    </AppShellMobile>
  );
}
