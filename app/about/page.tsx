import React from 'react';
import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { Anchor, Container, Stack, Text, Title } from '@mantine/core';
import classes from './about.module.css';

export const metadata = { title: 'About' };

// External link, opened in a new tab
function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Anchor href={href} target="_blank">
      {children}
    </Anchor>
  );
}

const About = () => {
  return (
    <AppShellMobile>
      <Container size={800} my="md">
        <Title order={1} mb="xl">
          About
        </Title>
        <div className={classes.wrapper}>
          <div className={classes.body}>
            <Stack gap="md">
              <Text className={classes.paragraph}>
                Alexander Kennedy is a Software Engineer, Data Visualization Engineer, Data
                Journalist, and Author specializing in interactive data storytelling for science,
                environmental, and public health issues. He joined{' '}
                <Ext href="https://cen.acs.org/">C&EN</Ext> in August of 2025 as Senior Product
                Engineer, Frontend and Data Visualization. He is a co-author of the book{' '}
                <Anchor href="/writing">
                  <em>The Global Positioning System and GIS</em>, 4th Edition
                </Anchor>
                , published by CRC Press. His data journalism work has been published in{' '}
                <Anchor href="/peopleCovid">People Magazine</Anchor>,{' '}
                <Ext href="https://cen.acs.org/people/nobel-prize/nobel-prize-chemistry-nominations-database/104/web/2026/10">
                  Chemical and Engineering News
                </Ext>
                ,{' '}
                <Ext href="https://undark.org/2022/04/19/covid-19-retrospective/">
                  Undark Magazine
                </Ext>
                , and <Anchor href="/investopedia">Investopedia</Anchor>.
              </Text>
              <Text className={classes.paragraph}>
                In 2022 his interactive feature{' '}
                <Ext href="https://undark.org/2021/06/01/below-dozens-of-aging-dams-a-potential-toxic-calamity/">
                  Below Dozens of Aging Dams a Potential Toxic Calamity
                </Ext>{' '}
                (co-authored with James Dinneen) was awarded the{' '}
                <Ext href="https://www.asja.org/what-we-do/awards/2022-writing-award-winners/">
                  ASJA Donald Robinson Memorial Award for Investigative Journalism
                </Ext>
                . It was also nominated for{' '}
                <Ext href="https://www.asme.media/reporting-2022">
                  ASME’s National Magazine Award in the Reporting category
                </Ext>
                , and the{' '}
                <Ext href="https://nihcm.org/awards/digital-media-award/finalists">
                  NIHCM Foundation’s Digital Media Journalism Award
                </Ext>
                .
              </Text>
              <Text className={classes.paragraph}>
                From 2019 to 2021 Alexander co-curated and co-organized{' '}
                <Ext href="https://datathroughdesign.com/">Data Through Design (DxD)</Ext>, an
                annual exhibition celebrating tangible, multimedia expressions of New York City’s
                Open Data. He has led <Anchor href="/teaching">data visualization workshops</Anchor>
                , including a Data Visualization with D3 workshop at Impact Labs, and has moderated
                panel discussions about data visualization and data art.
              </Text>
            </Stack>
            {/* <Text fz="sm" c="dimmed">
            You will never miss important product updates, latest news and community QA sessions. Our
            newsletter is once a week, every Sunday.
          </Text> */}

            {/* <div className={classes.controls}>
            <TextInput
              placeholder="Your email"
              classNames={{ input: classes.input, root: classes.inputWrapper }}
            />
            <Button className={classes.control}>Subscribe</Button>
          </div> */}
          </div>
          {/* <Image src={image.src} className={classes.image} /> */}
        </div>
      </Container>
    </AppShellMobile>
  );
};

export default About;
