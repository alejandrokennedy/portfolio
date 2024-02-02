'use client'

import { Container, Grid, Skeleton, rem } from '@mantine/core';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import discoSpiral from '../../public/images/discoSpiral.png';
import covidPeople from '../../public/images/covidPeople.png';
import covidRetrospective from '../../public/images/covidRetrospective.png';

export function ProjectGrid() {
  const items = [
    {
      "name": "Covid Tracker",
      "type": "Journalism",
      "url": "https://people.com/health/see-how-the-highly-contagious-coronavirus-spread-across-the-us/",
      "imgUrl": "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "img": covidPeople
    },
    {
      "name": "Covid Retrospective",
      "type": "Journalism",
      "url": "https://undark.org/2022/04/19/covid-19-retrospective/",
      "imgUrl": "https://images.unsplash.com/photo-1584118624012-df056829fbd0?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "img": covidRetrospective
    },
    {
      "name": "Disco Spiral",
      "type": "Art",
      "url": "https://observablehq.com/@alejandrokennedy/disco-spiral",
      "imgUrl": "https://images.unsplash.com/photo-1471009901894-1c05ac30d5fe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "img": discoSpiral
    }
  ]

  return (
    <Container my="md">
        <Grid gutter="md">
          {items.map(item => {
            return (
              <Grid.Col span={{ base: 12, xs: 6, sm: 4 }} key={item.name}>
                {/* <Skeleton height={rem(200)} radius="md" animate={false} /> */}
                <ProjectCard
                  name={item.name}
                  type={item.type}
                  url={item.url}
                  imgUrl={item.imgUrl}
                  img={item.img}
                />
              </Grid.Col>
            )
          })}
        </Grid>
    </Container>
  );
}