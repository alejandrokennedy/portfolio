'use client';

import { Container, Grid } from '@mantine/core';
import animationTemplateCanvas from '../../public/images/animationTemplateCanvas.png';
import cenAustraliaTrials from '../../public/images/cenAustraliaTrials.png';
import cenCancerAlley from '../../public/images/cenCancerAlley.png';
import cenNobelDatabase from '../../public/images/cenNobelDatabase.png';
import choroBubbleThumbnail from '../../public/images/choroBubbleThumbnail.png';
import covidPeople from '../../public/images/covidPeople.png';
import covidRetrospective from '../../public/images/covidRetrospective.png';
import dams from '../../public/images/dams.png';
import discoSpiral from '../../public/images/discoSpiral.png';
import investopediaTerms2022 from '../../public/images/investopediaTerms2022.png';
import scaleExplorer from '../../public/images/scaleExplorer.png';
import tidyTreeEditable from '../../public/images/tidyTreeEditable.png';
import { ProjectCard } from '../ProjectCard/ProjectCard';

export function ProjectGrid() {
  const items = [
    {
      name: 'How to Win the Chem Nobel',
      type: 'Journalism',
      url: 'https://cen.acs.org/people/nobel-prize/nobel-prize-chemistry-nominations-database/104/web/2026/10',
      img: cenNobelDatabase,
    },
    {
      name: 'Dams: A Toxic Calamity',
      type: 'Journalism',
      url: 'https://undark.org/2021/06/01/below-dozens-of-aging-dams-a-potential-toxic-calamity/',
      img: dams,
    },
    {
      name: 'Covid Retrospective',
      type: 'Journalism',
      url: 'https://undark.org/2022/04/19/covid-19-retrospective/',
      img: covidRetrospective,
    },
    {
      name: 'Cancer Alley Air Monitoring',
      type: 'Journalism',
      url: 'https://cen.acs.org/environment/pollution/community-air-monitoring-cancer-alley/104/web/2026/04',
      img: cenCancerAlley,
    },
    {
      name: 'Covid Tracker',
      type: 'Journalism',
      url: '/peopleCovid',
      img: covidPeople,
    },
    {
      name: 'Clinical Trials in Australia',
      type: 'Journalism',
      url: 'https://cen.acs.org/pharmaceuticals/drug-development/australia-clinical-drug-trial-fda-trialblazer/104/web/2026/08',
      img: cenAustraliaTrials,
    },
    {
      name: 'Animation Template',
      type: 'Art',
      url: 'https://observablehq.com/@alejandrokennedy/animation-template-canvas',
      img: animationTemplateCanvas,
    },
    {
      name: 'Disco Spiral',
      type: 'Art',
      url: 'https://observablehq.com/@alejandrokennedy/disco-spiral',
      img: discoSpiral,
    },
    {
      name: 'Investopedia Terms 2022',
      type: 'Journalism',
      url: '/investopedia',
      // "url": "https://www.investopedia.com/2022-top-terms-of-the-year-6835881",
      img: investopediaTerms2022,
    },
    {
      name: 'Editable Tidy Tree',
      type: 'POC',
      url: 'https://observablehq.com/@alejandrokennedy/collapsible-tree-editable-nodes',
      img: tidyTreeEditable,
    },
    {
      name: 'Scale Explorer',
      type: 'Art',
      url: 'https://observablehq.com/@alejandrokennedy/scale-explorer-2-2',
      img: scaleExplorer,
    },
    {
      name: 'Choropleth → Bubble Map',
      type: 'POC',
      url: '/choroBubble',
      img: choroBubbleThumbnail,
    },
  ];

  return (
    <Container my="md">
      <Grid gutter="md">
        {items.map((item) => {
          return (
            <Grid.Col span={{ base: 12, xs: 6, sm: 4 }} key={item.name}>
              <ProjectCard name={item.name} type={item.type} url={item.url} img={item.img} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
}
