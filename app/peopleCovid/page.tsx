import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { Anchor, Container, Text, Title } from '@mantine/core';

export const metadata = { title: 'People Magazine Covid-19 Tracker' };

const PeopleCovid = () => {
  return (
    <AppShellMobile>
      <Container size={800} my="md">
        <Title order={1}>People Magazine Covid-19 Tracker</Title>
        <Text fz="md" lh={1.65} mt="sm" mb="xl">
          This visualization was published in People Magazine during the Covid-19 pandemic. The{' '}
          <Anchor
            href="https://people.com/health/see-how-the-highly-contagious-coronavirus-spread-across-the-us/"
            target="_blank"
          >
            original article on People.com
          </Anchor>{' '}
          unfortunately no longer loads the visualization.
        </Text>
        <iframe
          src="https://alejandrokennedy.github.io/people-mag-covid/"
          title="People Magazine Covid Tracker"
          style={{ display: 'block', width: '100%', height: 3150, border: 0 }}
        />
      </Container>
    </AppShellMobile>
  );
};

export default PeopleCovid;
