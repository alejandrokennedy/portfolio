import { Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
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
          // src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          // src="https://www.typeinvestigations.org/wp-content/uploads/2020/06/asja_awards-prize_winning_article.png"
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
            {/* <IconAt stroke={1.5} size="1rem" className={classes.icon} /> */}
            <Text fz="xs" c="dimmed">
              {org}
            </Text>
          </Group>

          {/* <Group wrap="nowrap" gap={10} mt={5}>
            <Text fz="xs" c="dimmed">
              Something else???
            </Text>
          </Group> */}
        </div>
      </Group>
    </div>
  );
}