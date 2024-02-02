// import { Card, Text, Badge, Button, Group } from '@mantine/core';

// interface ProjectCardProps {
//   name: string;
//   type: string;
//   url: string; 
// }

// export function ProjectCard(props: ProjectCardProps) {
//   return (
//     <Card shadow="sm" p="lg">
//       {/* <Text fontSize={500} size="lg" mb={5}> */}
//       <Text size="lg" mb={5}>
//         {props.name}
//       </Text>

//       <Badge variant="outline">{props.type}</Badge>

//       <Button variant="light" color="blue" fullWidth mt="md" component="a" href={props.url}>
//         View Project
//       </Button>
//     </Card>
//   );
// }

import { IconEye, IconMessageCircle } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme } from '@mantine/core';
import classes from './ProjectCard.module.css';
import { StaticImageData } from 'next/image';

interface ProjectCardProps {
  name: string;
  type: string;
  url: string; 
  imgUrl: string; 
  img: StaticImageData;
}

export function ProjectCard(props: ProjectCardProps) {
  const theme = useMantineTheme();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      href={props.url}
      target="_blank"
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

          {/* <Group justify="space-between" gap="xs">
            <Text size="sm" className={classes.author}>
              {props.name}
            </Text>

            <Group gap="lg">
              <Center>
                <IconEye
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText}>
                  7847
                </Text>
              </Center>
              <Center>
                <IconMessageCircle
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText}>
                  5
                </Text>
              </Center>
            </Group>
          </Group> */}
        </div>
      </div>
    </Card>
  );
}