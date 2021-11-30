import { Slider, SliderProps } from "../../components/Inputs/Slider";
import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";

import { Grid } from "../../components/Layouts/Grid";
import { Label } from "../../components/DataDisplay/Label";

export default {
  title: "Inputs/Slider",
  component: Slider,
  // parameters: {
  //   docs: {
  //     description: {
  //       component:
  //         "Buttons communicate actions that users can take. They are typically placed throughout your UI.",
  //     },
  //   },
  // },
  // argTypes: {
  //   color: { control: "color" },
  //   variant: {
  //     options: ["text", "contained", "outlined"],
  //     control: { type: "select" },
  //     defaultValue: "contained",
  //   },
  //   size: {
  //     options: ["small", "medium", "large"],
  //     control: { type: "select" },
  //     defaultValue: "medium",
  //   },
  //   ref: { control: "" },
  // },
} as Meta;

const Template: Story<SliderProps> = (args) => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: true,
};

export const ColorSlider = Template.bind({});
ColorSlider.args = {
  color: "white",
  sliderStyle: {
    height: "12px",
    borderRadius: "2px",
  },
  railStyle: {
    opacity: 1,
    background:
      "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
  },
  trackStyle: {
    backgroundColor: "transparent",
    border: "none",
  },
};

export const Controls = () => {
  const [value, setValue] = useState(30);
  return (
    <>
      <Grid direction="column" style={{ margin: 10 }}>
        <Label>Value: {value}</Label>
        <Slider
          value={value}
          onChange={(value) => setValue(value)}
          defaultValue={value}
        />
      </Grid>
    </>
  );
};

export const Marks = () => {
  const [value, setValue] = useState(0);
  return (
    <>
      <Grid direction="column" style={{ margin: 10 }}>
        <Label>Value: {value}</Label>
        <Slider
          value={value}
          onChange={(value) => setValue(value)}
          step={10}
          marks
        />
        <Slider
          value={60}
          onChange={(value) => setValue(value)}
          step={10}
          marks
          disabled
        />
      </Grid>
    </>
  );
};
