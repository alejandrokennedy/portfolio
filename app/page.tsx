import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { HeaderSimple } from '@/components/HeaderSimple/HeaderSimple';

export default function HomePage() {
  return (
    <>
      <HeaderSimple />
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
