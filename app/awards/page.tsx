'use client';

import awards from '../../data/awards.json';

import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { AwardCard } from '@/components/AwardCard/AwardCard';
import { Container, Grid, Stack, Title } from '@mantine/core';
import Image from 'next/image';
import nationalMagazineAwards2022 from '../../public/images/awards/nationalMagazineAwards2022.jpg';

const Awards = () => {
  return (
    <AppShellMobile>
      <Container size={800} my="md">
        <Title order={1} mb="xl">
          Awards
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xl">
              {awards.map((award) => (
                <AwardCard
                  key={award.title}
                  title={award.title}
                  year={award.year}
                  org={award.org}
                  url={award.url}
                  imgUrl={award.imgUrl}
                  achievement={award.achievement}
                />
              ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }} style={{ height: 600, position: 'relative' }}>
            <Image
              src={nationalMagazineAwards2022}
              alt="James Dinneen and Alexander Kennedy at the 57th Annual National Magazine Awards"
              fill
              sizes="(max-width: 48em) 100vw, 400px"
              style={{ objectFit: 'contain', objectPosition: 'top' }}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </AppShellMobile>
  );
};

export default Awards;
