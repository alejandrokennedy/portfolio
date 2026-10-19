import { Anchor, Text, Box, Stack, rem } from '@mantine/core';
import { IconSun, IconPhone, IconMapPin, IconAt, IconBrandLinkedin } from '@tabler/icons-react';
import { EmailLink } from './EmailLink';
import classes from './ContactIcons.module.css';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: 'Email', description: <EmailLink />, icon: IconAt },
  {
    title: 'LinkedIn',
    description: (
      <Anchor href="https://www.linkedin.com/in/alejandrokennedy" target="_blank" c="inherit">
        linkedin.com/in/alejandrokennedy
      </Anchor>
    ),
    icon: IconBrandLinkedin,
  },
  // { title: 'Phone', description: '+49 (800) 335 35 35', icon: IconPhone },
  // { title: 'Address', description: '844 Morris Park avenue', icon: IconMapPin },
  // { title: 'Working hours', description: '8 a.m. – 11 p.m.', icon: IconSun },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />);
  return <Stack>{items}</Stack>;
}