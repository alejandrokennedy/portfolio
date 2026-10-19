import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { Anchor, Container, List, ListItem, Stack, Text, Title } from '@mantine/core';
import Image, { StaticImageData } from 'next/image';
import dataDialogues2020 from '../../public/images/teaching/dataDialogues2020.jpg';
import dataDialogues2021 from '../../public/images/teaching/dataDialogues2021.jpg';
import classes from './teaching.module.css';

export const metadata = {
  title: 'Teaching & Facilitation',
};

function Figure({ src, alt, caption }: { src: StaticImageData; alt: string; caption: string }) {
  return (
    <figure className={classes.figure}>
      <div className={classes.imageFrame}>
        <Image src={src} alt={alt} fill sizes="(max-width: 48em) 100vw, 400px" />
      </div>
      <figcaption className={classes.caption}>{caption}</figcaption>
    </figure>
  );
}

const Teaching = () => {
  return (
    <AppShellMobile>
      <Container size={800} my="md">
        <Title order={1}>Teaching & Facilitation</Title>
        <Text className={classes.paragraph} mt="sm" mb="xl">
          Alexander Kennedy brings a background in dialogue, facilitation, and education to his data
          work, helping people not just read data, but discuss it, question it, contextualize it,
          and use it responsibly.
        </Text>

        <Stack gap="xl">
          <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>
              Data Dialogues
            </Title>

            <Stack gap="md" mt="md">
              {/*<Text className={classes.paragraph}>
                Data Dialogues is part of Alexander’s work at C&EN, fostering data-first editorial
                and analytical practices that meet people where they are.
              </Text>*/}
              <Text className={classes.paragraph}>
                Much of our information consumption occurs alone in front of a screen. Data
                Dialogues is an event format that combines the age-old power of group discussion
                with the unprecedented expository power of modern data systems and data
                visualizations. The result is a collaborative conversation that humanizes the data
                representations in question and fosters a deeper understanding of our relationship
                with data and with each other.
              </Text>
              <Text className={classes.paragraph}>
                The series began at Data Through Design (DxD), an annual exhibition celebrating
                tangible, multimedia expressions of New York City’s Open Data, which Alexander
                co-organized and co-curated from 2019 to 2021. The first Data Dialogues, held in the
                2020 exhibition, used exercises like “Where Do I Stand,” in which participants form
                human graphs that serve as springboards for conversation, and “Data Drama,” in which
                small groups critique works and report back through non-verbal performance. In 2021
                it moved to Zoom, combining performance and discussion.
              </Text>
              <Text>
                Data Dialogues continues as part of Alexander's role at C&EN, where he fosters
                data-first editorial and analytical practices that meet people where they are.
              </Text>
            </Stack>

            <div className={classes.figures}>
              <Figure
                src={dataDialogues2020}
                alt="Participants standing among the artworks in the DxD 2020 gallery during Data Dialogues"
                caption="Data Dialogues in the DxD 2020 exhibition. Photo: Charles Lavoie for Data Through Design"
              />
              <Figure
                src={dataDialogues2021}
                alt="A singer performing in a home studio on a Zoom call, with participants in thumbnails above"
                caption="Data Dialogues 2021: an opera performance by Rose Hegele based on sound complaints during the NYC quarantine, part of Snoweria Zhang’s Big Apple Recipes"
              />
            </div>

            <Stack gap={4} mt="md">
              <Anchor href="https://datathroughdesign.com/2020" target="_blank" fz="sm">
                DxD 2020
              </Anchor>
              <Anchor href="https://datathroughdesign.com/2021-1" target="_blank" fz="sm">
                DxD 2021
              </Anchor>
            </Stack>
          </section>

          <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>
              Data Visualization with D3
            </Title>
            <Text className={classes.meta}>Impact Labs · Dec 2019 – Jan 2020</Text>

            <Text className={classes.paragraph} mt="md">
              Taught D3.js fundamentals to the Impact Labs 2020 fellows, a cohort of social
              change-oriented engineers. Impact Labs is a nonprofit that provides greater access to
              opportunities at the intersection of technology and social good.
            </Text>

            <Anchor
              href="https://www.impactlabs.io/"
              target="_blank"
              fz="sm"
              mt="md"
              display="block"
            >
              Impact Labs
            </Anchor>
          </section>

          <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>
              Also
            </Title>
            <List className={classes.paragraph} spacing="xs" mt="md">
              <ListItem>
                Wrote step-by-step exercises guiding students through capturing and editing
                geographic data for{' '}
                <Anchor href="/writing">The Global Positioning System and GIS</Anchor>.
              </ListItem>
              <ListItem>
                Moderated panel discussions about data visualization and data art for BetaNYC's{' '}
                <Anchor href="https://schoolofdata.nyc/">NYC School of Data</Anchor>.
              </ListItem>
              <ListItem>
                Alumnus of Simon Fraser University’s{' '}
                <Anchor href="https://www.sfu.ca/dialogue/what-we-do/dialogue-at-sfu/semester-in-dialogue.html">
                  Semester in Dialogue
                </Anchor>
                .
              </ListItem>
            </List>
          </section>
        </Stack>
      </Container>
    </AppShellMobile>
  );
};

export default Teaching;
