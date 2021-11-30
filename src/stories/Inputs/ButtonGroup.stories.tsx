/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  ButtonGroup,
  ButtonGroupProps,
} from "../../components/Inputs/ButtonGroup";
import { Button } from "../../components/Inputs/Button";
import { Grid } from "../../components/Layouts/Grid";

export default {
  title: "Inputs/Button Group",
  component: ButtonGroup,
  subcomponents: { Button },
  parameters: {
    docs: {
      description: {
        component: "Buttons group allows you to group buttons together.",
      },
    },
  },
  argTypes: {
    variant: {
      options: ["text", "contained", "outlined"],
      control: { type: "select" },
      defaultValue: "contained",
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
      defaultValue: "medium",
    },
  },
} as Meta;

const Template: Story<ButtonGroupProps> = (args) => {
  return (
    <ButtonGroup {...args}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
  );
};

export const Default: Story<ButtonGroupProps> = Template.bind({});
Default.args = {
  orientation: "horizontal",
};

export const Variants: Story<ButtonGroupProps> = (args) => (
  <Grid spacing={3} direction="column">
    <ButtonGroup variant="text">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
    <ButtonGroup variant="contained">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
    <ButtonGroup variant="outlined">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
  </Grid>
);

export const Sizes: Story<ButtonGroupProps> = (args) => (
  <Grid spacing={3} direction="column">
    <ButtonGroup size="small">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
    <ButtonGroup size="medium">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
    <ButtonGroup size="large">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
  </Grid>
);

export const Orientation: Story<ButtonGroupProps> = (args) => (
  <Grid spacing={2}>
    <ButtonGroup variant="text" orientation="vertical">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
    <ButtonGroup variant="contained" orientation="vertical">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
    <ButtonGroup variant="outlined" orientation="vertical">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonGroup>
  </Grid>
);

export const Colors: Story<ButtonGroupProps> = (args) => (
  <Grid spacing={3} direction="column">
    <ButtonGroup size="small">
      <Button color="#2e7d32">Accept</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button color="#d32f2f">Reject</Button>
    </ButtonGroup>
    <ButtonGroup size="medium" variant="text">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button color="#ed6c02">Four</Button>
    </ButtonGroup>
  </Grid>
);

export const Disabled: Story<ButtonGroupProps> = () => {
  const disabled1 = [2, 4],
    disabled2 = [1],
    disabled3 = [3, 4];
  return (
    <Grid spacing={3} direction="column">
      <ButtonGroup variant="text" disabled={disabled1}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
        <Button>Four</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" disabled={disabled2}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
        <Button>Four</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" disabled={disabled3}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
        <Button>Four</Button>
      </ButtonGroup>
    </Grid>
  );
};
