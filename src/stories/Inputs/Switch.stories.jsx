import React from "react";

import { Switch } from "../../components/Inputs/Switch";

export default {
  title: "Inputs/Switch",
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: "Switch is used for switching between two opposing states.",
      },
    },
  },
  argTypes: {
    color: { control: "color" },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
      defaultValue: "medium",
    },
    ref: { control: "" },
  },
};

const Template = (args) => {
  return <Switch {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  size: "medium",
  // checked: false,
  disabled: false,
  label: "Switch",
  color: "#1976d2",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Switch",
};

export const Disabled = Template.bind({});
Disabled.args = {
  // checked: true,
  disabled: true,
  label: "Switch",
};
