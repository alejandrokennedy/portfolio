import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { Container, Text, Title } from '@mantine/core';

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
        {/* A looping video instead of the original 52 MB GIF: same animation, about 1 MB */}
        <video
          autoPlay
          muted
          loop
          playsInline
          width={750}
          height={434}
          poster="/images/choroBubblePoster.jpg"
          aria-label="Animated US county map transitioning from a choropleth to a bubble map"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        >
          <source src="/videos/choroBubble.webm" type="video/webm" />
          <source src="/videos/choroBubble.mp4" type="video/mp4" />
        </video>
      </Container>
    </AppShellMobile>
  );
};

export default ChoroBubble;
