"use client"

import AppShellMobile from '@/components/AppShellMobile/AppShellMobile'
import { Anchor, Container, Grid } from '@mantine/core';
import React from 'react'

const PeopleCovid = () => {
  return (
    <AppShellMobile>
      <Container size={1500}>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <div style={{position: 'sticky', top: '75px'}}>
              This visualization was published in People Magazine during the Covid-19 Pandemic. The original article can be viewed <Anchor href='https://people.com/health/see-how-the-highly-contagious-coronavirus-spread-across-the-us/' underline="hover">here</Anchor>. It unfortunately no longer loads the visualization.
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <iframe
              src="https://cdn.selectablemedia.com/nnn/covidAnimation6/covAnim.html"
              title="People Magazine Covid Tracker"
              style={{width: '100%', height: 3150}}
              frameBorder="0"
            />
        </Grid.Col>
        </Grid>
      </Container>
    </AppShellMobile>
  )
}

export default PeopleCovid