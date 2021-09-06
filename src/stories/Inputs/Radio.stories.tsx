import React from "react";
import { Story, Meta } from "@storybook/react";
import { Radio, RadioProps } from "../../components/Inputs/Radio";

export default {
  title: "Inputs/Radio",
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: "Single selection among multiple options.",
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

const Template: Story<RadioProps> = (args) => {
  return <Radio {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  size: "medium",
  // checked: false,
  disabled: false,
  label: "Radio",
  color: "#1976d2",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Radio",
};

export const Disabled = Template.bind({});
Disabled.args = {
  // checked: true,
  disabled: true,
  label: "Radio",
};
