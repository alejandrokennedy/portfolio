import { HeroSvg } from '@/components/HeroSvg/HeroSvg';
import AppShellMobile from '../components/AppShellMobile/AppShellMobile';
import { ProjectGrid } from '@/components/ProjectGrid/ProjectGrid';

export default function HomePage() {
  return (
    <AppShellMobile>
      <HeroSvg />
      <ProjectGrid/>
    </AppShellMobile>
  )
}