import React from "react";
import { Story, Meta } from "@storybook/react";
import { Switch, SwitchProps } from "../../components/Inputs/Switch";

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
} as Meta;

const Template = (args) => {
  return <Switch {...args} />;
};

export const Default: Story<SwitchProps> = Template.bind({});
Default.args = {
  size: "medium",
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
