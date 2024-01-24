import { Welcome } from '@/components/Welcome/Welcome';
import AppShellMobile from '../components/AppShellMobile/AppShellMobile';

export default function HomePage() {
  return (
    <AppShellMobile>
      <div>HOME</div>
      <Welcome />
    </AppShellMobile>
  )
}