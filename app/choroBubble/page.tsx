"use client"

import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { Center, Container, Space, Text, Title } from '@mantine/core';
import Image from 'next/image';
import choroBubble from '../../public/images/choroBubble.gif';
// import choroBubble from '../../public/images/covidPeople.png';

const ChoroBubble = () => {
  return (
    <AppShellMobile>
      <Container>
        <Space h="lg" />
        <Center>
          <Title>Choropleth to Bubble Map Transition</Title>
        </Center>
        <Space h="lg" />
        <Center>
          <Text>This animation demonstrates how choropleth maps can exagerate values for sparsely-populated regions that also occupy a large proportion of land (e.g. large counties in Nevada). The bubble map, by contrast, provides a more accurate representation of the distribution of values.</Text>
        </Center>
        <Space h="lg" />
        <Center>
          <Image alt='Choropleth to bubble map transition' src={choroBubble}></Image>
        </Center>
        {/* <Grid>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            1s
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            2nd
        </Grid.Col>
        </Grid> */}
      </Container>
    </AppShellMobile>
  )
}

export default ChoroBubble