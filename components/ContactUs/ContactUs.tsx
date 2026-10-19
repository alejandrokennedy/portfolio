import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  Container,
} from '@mantine/core';
import { IconBrandLinkedin, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { ContactIconsList } from './ContactIcons';
import classes from './ContactUs.module.css';

const social = [IconBrandLinkedin, IconBrandYoutube, IconBrandInstagram];

export function ContactUs() {
  // const icons = social.map((Icon, index) => (
  //   <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
  //     <Icon size="1.4rem" stroke={1.5} />
  //   </ActionIcon>
  // ));

  return (
    <Container size={800} my="md">
      <Title order={1} mb="xl">
        Contact
      </Title>
      {/* consider removing container if using form */}
      <div className={classes.wrapper}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
          <div>

            <ContactIconsList />

            {/* <Group mt="xl">{icons}</Group> */}
          </div>
          {/* <div className={classes.form}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Textarea
            required
            label="Your message"
            placeholder="I want to order your goods"
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />

          <Group justify="flex-end" mt="md">
            <Button className={classes.control}>Send message</Button>
          </Group>
        </div> */}
        </SimpleGrid>
      </div>
    </Container>
  );
}