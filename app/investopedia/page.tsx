import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { Anchor, Container, Text, Title } from '@mantine/core';

export const metadata = { title: 'Investopedia’s Top 10 Terms of 2022' };

const Investopedia = () => {
  return (
    <AppShellMobile>
      <Container size={800} my="md">
        <Title order={1}>Investopedia’s Top 10 Terms of 2022</Title>
        <Text fz="md" lh={1.65} mt="sm" mb="xl">
          This visualization was published on Investopedia.com. The{' '}
          <Anchor
            href="https://www.investopedia.com/2022-top-terms-of-the-year-6835881"
            target="_blank"
          >
            original article on Investopedia.com
          </Anchor>{' '}
          unfortunately no longer sizes the visualization correctly.
        </Text>
        <iframe
          src="https://meredithcorp.github.io/investopedia-terms-viz-2022/"
          title="2022 Investopedia Terms of the Year"
          style={{ display: 'block', width: '100%', height: 450, border: 0 }}
        />
      </Container>
    </AppShellMobile>
  );
};

export default Investopedia;
