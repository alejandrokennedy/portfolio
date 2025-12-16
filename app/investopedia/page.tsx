'use client';

import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { Anchor, Center, Container, Grid, Space, Title } from '@mantine/core';

const Investopedia = () => {
  return (
    <AppShellMobile>
      <Container size={1500}>
        <Space h="lg" />
        <Center>
          <Title>Investopedia's Top 10 Terms of 2022</Title>
        </Center>
        <Space h="lg" />
        <Space h="lg" />
        <Space h="lg" />
        <Grid>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <div style={{ position: 'sticky', top: '75px' }}>
              This visualization was published on Investopedia.com. The original article can be
              viewed{' '}
              <Anchor
                href="https://www.investopedia.com/2022-top-terms-of-the-year-6835881"
                underline="hover"
              >
                here
              </Anchor>
              . The Investopedia.com page unfortunately no longer correctly sizes the visualization.
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <iframe
              src="https://meredithcorp.github.io/investopedia-terms-viz-2022/"
              title="2022 Investopedia Terms of the Year"
              style={{ width: '100%', height: 450 }}
              frameBorder="0"
            />
          </Grid.Col>
        </Grid>
      </Container>
    </AppShellMobile>
  );
};

export default Investopedia;
