import React from "react";

import { ButtonGroup } from "../components/Inputs/ButtonGroup";
import { Button } from "../components/Inputs/Button";

export default {
  title: "Inputs/Button Group",
  component: ButtonGroup,
  subcomponents: { Button },
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
};

const Template = (args) => {
  return (
    <ButtonGroup {...args}>
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" />
    </ButtonGroup>
  );
};

export const Default = Template.bind({});
Default.args = {
  orientation: "horizontal",
};

export const Variants = (args) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 16,
    }}
  >
    <ButtonGroup variant="text">
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" />
    </ButtonGroup>
    <ButtonGroup variant="contained">
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" />
    </ButtonGroup>
    <ButtonGroup variant="outlined">
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" />
    </ButtonGroup>
  </div>
);

export const Sizes = (args) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 16,
    }}
  >
    <ButtonGroup size="small">
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" />
    </ButtonGroup>
    <ButtonGroup size="medium">
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" />
    </ButtonGroup>
    <ButtonGroup size="large">
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" />
    </ButtonGroup>
  </div>
);

export const Orientation = (args) => (
  <div
    style={{
      display: "flex",
      gap: 16,
    }}
  >
    <ButtonGroup variant="text" orientation="vertical">
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" />
    </ButtonGroup>
    <ButtonGroup variant="contained" orientation="vertical">
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" />
    </ButtonGroup>
    <ButtonGroup variant="outlined" orientation="vertical">
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" />
    </ButtonGroup>
  </div>
);

export const Colors = (args) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 16,
    }}
  >
    <ButtonGroup size="small">
      <Button label="Accept" color="#2e7d32" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Reject" color="#d32f2f" />
    </ButtonGroup>
    <ButtonGroup size="medium" variant="text">
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
      <Button label="Four" color="#ed6c02" />
    </ButtonGroup>
  </div>
);

export const Disabled = () => {
  const disabled1 = [2, 4],
    disabled2 = [1],
    disabled3 = [3, 4];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <ButtonGroup variant="text" disabled={disabled1}>
        <Button label="One" />
        <Button label="Two" />
        <Button label="Three" />
        <Button label="Four" />
      </ButtonGroup>
      <ButtonGroup variant="contained" disabled={disabled2}>
        <Button label="One" />
        <Button label="Two" />
        <Button label="Three" />
        <Button label="Four" />
      </ButtonGroup>
      <ButtonGroup variant="outlined" disabled={disabled3}>
        <Button label="One" />
        <Button label="Two" />
        <Button label="Three" />
        <Button label="Four" />
      </ButtonGroup>
    </div>
  );
};
