import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { Container, Text, Title } from '@mantine/core';
import Image from 'next/image';
import choroBubbleGif from '../../public/images/choroBubbleGif.gif';

export const metadata = { title: 'Choropleth to Bubble Map Transition' };

const ChoroBubble = () => {
  return (
    <AppShellMobile>
      <Container size={800} my="md">
        <Title order={1}>Choropleth to Bubble Map Transition</Title>
        <Text fz="md" lh={1.65} mt="sm" mb="xl">
          This animation demonstrates how choropleth maps can exaggerate values for
          sparsely-populated regions that also occupy a large proportion of land (e.g. large
          counties in Nevada). The bubble map, by contrast, provides a more accurate representation
          of the distribution of values.
        </Text>
        <Image
          alt="Animated US county map transitioning from a choropleth to a bubble map"
          src={choroBubbleGif}
          unoptimized
          style={{ width: '100%', height: 'auto' }}
        />
      </Container>
    </AppShellMobile>
  );
};

export default ChoroBubble;
