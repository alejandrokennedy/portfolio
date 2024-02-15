import { HeroSvg } from '@/components/HeroSvg/HeroSvg';
import AppShellMobile from '../components/AppShellMobile/AppShellMobile';
import { HeroImage } from '@/components/HeroImage/HeroImage';

export default function HomePage() {
  return (
    <AppShellMobile>
      <HeroSvg />
      <HeroImage />
    </AppShellMobile>
  )
}