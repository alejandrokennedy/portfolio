import { Anchor, Avatar, Text, Group } from '@mantine/core';
import classes from './AwardCard.module.css';

interface AwardCardProps {
  title: string;
  year: number;
  org: string;
  url: string;
  imgUrl: string;
  achievement: string;
}

export function AwardCard({ title, year, org, url, imgUrl, achievement }: AwardCardProps) {
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src={imgUrl} alt={`${org} award`} size={94} radius="md" />
        <div>
          {/* Links to the organization's page listing this award */}
          <Anchor href={url} target="_blank" c="inherit" underline="hover">
            <Text fz="lg" fw={500} className={classes.name}>
              {title}
            </Text>
          </Anchor>

          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {`${year} ${achievement}`}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <Text fz="xs" c="dimmed">
              {org}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
