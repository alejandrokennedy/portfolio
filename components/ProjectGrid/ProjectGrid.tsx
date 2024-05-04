'use client'

import { Container, Grid } from '@mantine/core';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import discoSpiral from '../../public/images/discoSpiral.png';
import covidPeople from '../../public/images/covidPeople.png';
import covidRetrospective from '../../public/images/covidRetrospective.png';
import dams from '../../public/images/dams.png';
import investopediaTerms2022 from '../../public/images/investopediaTerms2022.png';
import animationTemplateCanvas from '../../public/images/animationTemplateCanvas.png';
import scaleExplorer from '../../public/images/scaleExplorer.png';
import tidyTreeEditable from '../../public/images/tidyTreeEditable.png';

export function ProjectGrid() {
  const items = [
    {
      "name": "Dams: A Toxic Calamity",
      "type": "Journalism",
      "url": "https://undark.org/2021/06/01/below-dozens-of-aging-dams-a-potential-toxic-calamity/",
      "img": dams
    },
    {
      "name": "Covid Retrospective",
      "type": "Journalism",
      "url": "https://undark.org/2022/04/19/covid-19-retrospective/",
      "img": covidRetrospective
    },
    {
      "name": "Disco Spiral",
      "type": "Art",
      "url": "https://observablehq.com/@alejandrokennedy/disco-spiral",
      "img": discoSpiral
    },
    {
      "name": "Covid Tracker",
      "type": "Journalism",
      "url": "/peopleCovid",
      "img": covidPeople
    },
    {
      "name": "Investopedia Terms 2022",
      "type": "Journalism",
      "url": "https://www.investopedia.com/2022-top-terms-of-the-year-6835881",
      "img": investopediaTerms2022
    },
    {
      "name": "Animation Template",
      "type": "Art",
      "url": "https://observablehq.com/@alejandrokennedy/animation-template-canvas",
      "img": animationTemplateCanvas
    },
    {
      "name": "Editable Tidy Tree",
      "type": "POC",
      "url": "https://observablehq.com/@alejandrokennedy/collapsible-tree-editable-nodes",
      "img": tidyTreeEditable
    },
    {
      "name": "Scale Explorer",
      "type": "Art",
      "url": "https://observablehq.com/@alejandrokennedy/scale-explorer-2-2",
      "img": scaleExplorer
    },
  ]

  return (
    <Container my="md">
        <Grid gutter="md">
          {items.map(item => {
            return (
              <Grid.Col span={{ base: 12, xs: 6, sm: 4 }} key={item.name}>
                <ProjectCard
                  name={item.name}
                  type={item.type}
                  url={item.url}
                  img={item.img}
                />
              </Grid.Col>
            )
          })}
        </Grid>
    </Container>
  );
}