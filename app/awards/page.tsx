"use client"

import awards from '../../data/awards.json';

import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { AwardCard } from '@/components/AwardCard/AwardCard';
import { Container, Grid, Stack } from '@mantine/core';
import Image from 'next/image';

const Awards = () => {
  return (
    <AppShellMobile>
      <Container my="md">
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack gap="xl">
              {awards.map(award => (
                <AwardCard
                key={award.title}
                title={award.title}
                year={award.year}
                org={award.org}
                imgUrl={award.imgUrl}
                achievement={award.achievement}
                />
              ))}
              </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }} style={{height: 600, position:'relative'}}>
            <Image
              src="https://media.gettyimages.com/id/1389775311/photo/the-57th-annual-national-magazine-awards.jpg?s=2048x2048&w=gi&k=20&c=6bR7EzrTXFfdhtp8ABv9_Lo8g-Evoi_11NcrDf7tvPk="
              alt="James Dinneen and Alexander Kennedy at the 57th Annual National Magazine Awards"
              // width={500}
              // height={500}
              layout='fill'
              objectFit='contain'
            />
          </Grid.Col>
        </Grid>
      </Container>
    </AppShellMobile>
  )
}

export default Awards