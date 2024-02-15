import { Avatar, Text, Group } from '@mantine/core';
import classes from './AwardCard.module.css';


interface AwardCardProps {
  title: string;
  year: number;
  org: string;
  imgUrl: string;
  achievement: string;
}

export function AwardCard({ title, year, org, imgUrl, achievement }: AwardCardProps) {
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          src={imgUrl}
          size={94}
          radius="md"
        />
        <div>
          <Text fz="lg" fw={500} className={classes.name}>
            {title}
          </Text>

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