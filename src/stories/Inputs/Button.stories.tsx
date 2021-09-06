/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Story, Meta } from "@storybook/react";
import { Button, ButtonProps } from "../../components/Inputs/Button";
import { Grid } from "../../components/Layouts/Grid";

export default {
  title: "Inputs/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Buttons communicate actions that users can take. They are typically placed throughout your UI.",
      },
    },
  },
  argTypes: {
    color: { control: "color" },
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
    ref: { control: "" },
  },
} as Meta;

const Template = (args) => <Button {...args} />;

export const Default: Story<ButtonProps> = Template.bind({});
Default.args = {
  label: "Button",
  disabled: false,
  color: "#1976d2",
};

export const Basic: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="text" label="TEXT" />
    <Button variant="contained" label="CONTAINED" />
    <Button variant="outlined" label="OUTLINED" />
  </Grid>
);

export const Text: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="text" label="TEXT" />
    <Button variant="text" label="DISABLED" disabled />
  </Grid>
);

export const Contained: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="contained" label="CONTAINED" />
    <Button variant="contained" label="DISABLED" disabled />
  </Grid>
);

export const Outlined: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="outlined" label="OUTLINED" />
    <Button variant="outlined" label="DISABLED" disabled />
  </Grid>
);

export const Events: Story<ButtonProps> = (args) => (
  <Button
    variant="contained"
    label="Alert"
    onClick={() => {
      alert("clicked");
    }}
    color="#d32f2f"
  />
);

export const Sizes: Story<ButtonProps> = () => (
  <Grid spacing={3} direction="column">
    <Grid spacing={2}>
      <Button variant="text" size="small" label="SMALL" />
      <Button variant="text" size="medium" label="MEDIUM" />
      <Button variant="text" size="large" label="LARGE" />
    </Grid>
    <Grid spacing={2}>
      <Button variant="contained" size="small" label="SMALL" />
      <Button variant="contained" size="medium" label="MEDIUM" />
      <Button variant="contained" size="large" label="LARGE" />
    </Grid>
    <Grid spacing={2}>
      <Button variant="outlined" size="small" label="SMALL" />
      <Button variant="outlined" size="medium" label="MEDIUM" />
      <Button variant="outlined" size="large" label="LARGE" />
    </Grid>
  </Grid>
);

export const Colors: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="contained" label="Success" color="#2e7d32" />
    <Button variant="contained" label="Warning" color="#ed6c02" />
    <Button variant="contained" label="Alert" color="#d32f2f" />
  </Grid>
);
