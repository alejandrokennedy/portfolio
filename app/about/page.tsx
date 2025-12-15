import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { Text } from '@mantine/core';
import classes from './about.module.css';

const About = () => {
  return (
    <AppShellMobile>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Text fw={500} fz="lg" mb={5}>
          Alexander Kennedy is a Software Engineer, Data Visualization Engineer, Data Journalist, and Author specializing in interactive data storytelling for science, environmental, and public health issues. He joined C&EN in August of 2025 as Senior Product Engineer, Frontend and Data Visualization. He is a co-author of the forthcoming book The Global Positioning System and GIS, 4th Edition, published by CRC Press. His data journalism work has been published in People Magazine, Undark Magazine, and Investopedia.

          In 2022 his interactive feature Below Dozens of Aging Dams a Potential Toxic Calamity (co-authored with James Dinneen) was awarded the ASJA Donald Robinson Memorial Award for Investigative Journalism. It was also nominated for ASME's National Magazine Award in the Reporting category, and the NIHCM Foundation’s Digital Media Journalism Award.

          From 2019 to 2021 Alexander co-curated and co-organized Data Through Design (DxD), an annual exhibition celebrating tangible, multimedia expressions of New York City's Open Data. He has led data visualization workshops, including a Data Visualization with D3 workshop at Impact Labs, and has moderated panel discussions about data visualization and data art.

          </Text>
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
    </AppShellMobile>
  )
}

export default About
