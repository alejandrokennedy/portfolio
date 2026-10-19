import { Anchor, Flex, Image, List, Text } from '@mantine/core';
import classes from './BookCard.module.css';

interface BookCardProps {
  title: string;
  edition: string;
  authors: string;
  publisher: string;
  year: number;
  url: string;
  imgUrl: string;
  description?: string[];
  features?: string[];
  conclusion?: string;
}

export function BookCard({
  title,
  edition,
  authors,
  publisher,
  year,
  url,
  imgUrl,
  description,
  features,
  conclusion,
}: BookCardProps) {
  return (
    <Flex direction={{ base: 'column', xs: 'row' }} align="flex-start" gap="lg">
      <Anchor href={url} target="_blank" className={classes.cover}>
        <Image src={imgUrl} alt={`Cover of ${title}`} w={180} h={270} radius="sm" />
      </Anchor>
      <div>
        <Anchor href={url} target="_blank" c="inherit" underline="hover">
          <Text fz="xl" fw={500} className={classes.name}>
            {title}
          </Text>
        </Anchor>

        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          {`${year} ${edition}`}
        </Text>

        <Text fz="sm" mt="xs">
          {authors}
        </Text>

        <Text fz="xs" c="dimmed" mt={3}>
          {publisher}
        </Text>

        {description?.map((paragraph) => (
          <Text fz="sm" mt="md" key={paragraph}>
            {paragraph}
          </Text>
        ))}

        {features && (
          <>
            <Text fz="sm" fw={700} mt="md">
              Features:
            </Text>
            <List fz="sm" spacing={4} mt={4} pr="md">
              {features.map((feature) => (
                <List.Item key={feature}>{feature}</List.Item>
              ))}
            </List>
          </>
        )}

        {conclusion && (
          <Text fz="sm" mt="md">
            {conclusion}
          </Text>
        )}
      </div>
    </Flex>
  );
}
