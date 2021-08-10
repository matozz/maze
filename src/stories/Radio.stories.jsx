import React from "react";

import { Radio } from "../components/Inputs/Radio";

export default {
  title: "Inputs/Radio",
  component: Radio,
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
