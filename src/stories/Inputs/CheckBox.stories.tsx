import React, { useEffect, useRef } from "react";
import { Story, Meta } from "@storybook/react";
import { CheckBox, CheckBoxProps } from "../../components/Inputs/CheckBox";

export default {
  title: "Inputs/CheckBox",
  component: CheckBox,
  parameters: {
    docs: {
      description: {
        component: "Checkbox can be used to switch between two states.",
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
  return <CheckBox {...args} />;
};

export const Default: Story<CheckBoxProps> = Template.bind({});
Default.args = {
  size: "medium",
  // checked: false,
  disabled: false,
  label: "CheckBox",
  color: "#1976d2",
};

export const Small: Story<CheckBoxProps> = Template.bind({});
Small.args = {
  size: "small",
  label: "CheckBox",
};

export const Disabled: Story<CheckBoxProps> = Template.bind({});
Disabled.args = {
  // checked: true,
  disabled: true,
  label: "CheckBox",
};

export const Indeterminate: Story<CheckBoxProps> = () => {
  const ref = useRef<HTMLInputElement>();
  useEffect(() => {
    ref.current.indeterminate = true;
  }, []);
  return <CheckBox label="Indeterminate" ref={ref} />;
};
