import React, { useState } from "react";

import { RadioGroup } from "../../components/Inputs/RadioGroup";
import { Radio } from "../../components/Inputs/Radio";

export default {
  title: "Inputs/Radio Group",
  component: RadioGroup,
  subcomponents: { Radio },
  parameters: {
    docs: {
      description: {
        component:
          "Suitable for choosing from some mutually exclusive options.",
      },
    },
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
      defaultValue: "medium",
    },
  },
};

const Template = (args) => {
  return (
    <RadioGroup {...args}>
      <Radio value="female" label="Female" />
      <Radio value="male" label="Male" />
      <Radio value="other" label="Other" />
    </RadioGroup>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: "gender",
  size: "medium",
  orientation: "horizontal",
  label: "Gender",
};

export const Small = Template.bind({});
Small.args = {
  name: "gender",
  size: "small",
  label: "Gender",
};

export const Vertical = Template.bind({});
Vertical.args = {
  name: "gender",
  size: "medium",
  orientation: "vertical",
  label: "Gender",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: [1, 2],
  label: "Gender",
};
