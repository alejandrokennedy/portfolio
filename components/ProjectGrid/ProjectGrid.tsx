'use client'

import { Container, Grid, Skeleton, rem } from '@mantine/core';

export function ProjectGrid() {
  const items = [
    {
      "name": "Covid-19 Tracker",
      "type": "Journalism",
      "url": "https://people.com/health/see-how-the-highly-contagious-coronavirus-spread-across-the-us/",
    },
    {
      "name": "Covid-19 Retrospective",
      "type": "Journalism",
      "url": "https://undark.org/2022/04/19/covid-19-retrospective/",
    },
    {
      "name": "Disco Spiral",
      "type": "Art",
      "url": "https://observablehq.com/@alejandrokennedy/disco-spiral",
    }
  ]

  return (
    <Container my="md">
        <Grid gutter="md">
          {items.map(item => {
            return (
              <Grid.Col span={{ base: 12, xs: 6, sm: 4, xl: 3 }} key={item.name}>
                <Skeleton height={rem(200)} radius="md" animate={false} />
              </Grid.Col>
            )
          })}
        </Grid>
    </Container>
  );
}