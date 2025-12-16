'use client';

import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { Anchor, Center, Container, Grid, Space, Title } from '@mantine/core';

const PeopleCovid = () => {
  return (
    <AppShellMobile>
      <Container size={1500}>
        <Space h="lg" />
        <Center>
          <Title>People Magazine Covid-19 Tracker</Title>
        </Center>
        <Space h="lg" />
        <Space h="lg" />
        <Space h="lg" />
        <Grid>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <div style={{ position: 'sticky', top: '75px' }}>
              This visualization was published in People Magazine during the Covid-19 Pandemic. The
              original article can be viewed{' '}
              <Anchor
                href="https://people.com/health/see-how-the-highly-contagious-coronavirus-spread-across-the-us/"
                underline="hover"
              >
                here
              </Anchor>
              . The People.com page unfortunately no longer loads the visualization.
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <iframe
              src="https://alejandrokennedy.github.io/people-mag-covid/"
              title="People Magazine Covid Tracker"
              style={{ width: '100%', height: 3150 }}
              frameBorder="0"
            />
          </Grid.Col>
        </Grid>
      </Container>
    </AppShellMobile>
  );
};

export default PeopleCovid;
