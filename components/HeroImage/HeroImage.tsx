import cx from 'clsx';
import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from './HeroImage.module.css';

export function HeroImage() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Data{' '}
          <Text component="span" inherit className={classes.highlight}>
            Visualization and Journalsim
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Maps and charts that sing and dance 🕺💃👯
          </Text>
        </Container>

        <div className={classes.controls}>
          {/* <Button className={classes.control} variant="white" size="lg">
            Get started
          </Button>
          <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
            Live demo
          </Button> */}
        </div>
      </div>
    </div>
  );
}