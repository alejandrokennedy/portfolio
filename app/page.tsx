import { HeroCanvas } from '@/components/HeroCanvas/HeroCanvas';
import { ProjectGrid } from '@/components/ProjectGrid/ProjectGrid';
import { Container, Space } from '@mantine/core';
import AppShellMobile from '../components/AppShellMobile/AppShellMobile';

export default function HomePage() {
  return (
    <AppShellMobile>
      <Space h='lg'></Space>
      <Container size={1500}>
        <HeroCanvas />
      </Container>
      <Space></Space>
      <ProjectGrid/>
    </AppShellMobile>
  )
}