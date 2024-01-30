import { Title, Text, Container, Overlay } from '@mantine/core';
import classes from './HeroImage.module.css';

export function HeroImage() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Data{' '}
          <Text component="span" inherit className={classes.highlight}>
            Visualization, Journalism, Art, and Storytelling
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Charts and Maps that sing and dance 🕺💃👯
          </Text>
        </Container>
      </div>
    </div>
  );
}