import { Card, Text, useMantineTheme } from '@mantine/core';
import classes from './ProjectCard.module.css';
import { StaticImageData } from 'next/image';

interface ProjectCardProps {
  name: string;
  type: string;
  url: string; 
  img: StaticImageData;
}

export function ProjectCard(props: ProjectCardProps) {
  const theme = useMantineTheme();

  console.log(props.url[0])
  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      href={props.url}
      target={props.url[0] != '/' ? "_blank" : undefined}
    >
      <div
        className={classes.image}
        style={{
          backgroundImage:
            `url(${props.img.src})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            {props.name}
          </Text>
        </div>
      </div>
    </Card>
  );
}