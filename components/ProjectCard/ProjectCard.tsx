import { Card, Text } from '@mantine/core';
import Image, { StaticImageData } from 'next/image';
import classes from './ProjectCard.module.css';

interface ProjectCardProps {
  name: string;
  type: string;
  url: string; 
  img: StaticImageData;
  /** Load immediately rather than lazily, for cards visible on first paint */
  eager?: boolean;
}

export function ProjectCard(props: ProjectCardProps) {
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
      {/* next/image serves a resized WebP/AVIF instead of the full-size PNG, and lazy-loads
          cards below the fold. Anchored top-left, like the CSS background it replaced. */}
      <div className={classes.image}>
        <Image
          src={props.img}
          alt=""
          fill
          sizes="(max-width: 36em) 100vw, (max-width: 48em) 50vw, 330px"
          loading={props.eager ? 'eager' : 'lazy'}
          fetchPriority={props.eager ? 'high' : undefined}
          style={{ objectFit: 'cover', objectPosition: 'left top' }}
        />
      </div>
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