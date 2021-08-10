import React, { useEffect, useRef } from "react";

import { CheckBox } from "../components/Inputs/CheckBox";

export default {
  title: "Inputs/CheckBox",
  component: CheckBox,
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
  return <CheckBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  size: "medium",
  // checked: false,
  disabled: false,
  label: "CheckBox",
  color: "#1976d2",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "CheckBox",
};

export const Disabled = Template.bind({});
Disabled.args = {
  // checked: true,
  disabled: true,
  label: "CheckBox",
};

export const Indeterminate = () => {
  const ref = useRef();
  useEffect(() => {
    ref.current.indeterminate = true;
  }, []);
  return <CheckBox label="Indeterminate" ref={ref} />;
};
