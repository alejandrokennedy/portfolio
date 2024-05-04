import { HeroSvg } from '@/components/HeroSvg/HeroSvg';
import { ProjectGrid } from '@/components/ProjectGrid/ProjectGrid';
import { Space } from '@mantine/core';
import AppShellMobile from '../components/AppShellMobile/AppShellMobile';

export default function HomePage() {
  return (
    <AppShellMobile>
      <Space h='lg'></Space>
      <HeroSvg />
      <Space></Space>
      <ProjectGrid/>
    </AppShellMobile>
  )
}