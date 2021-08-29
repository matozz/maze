import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  ColorPicker,
  ColorPickerProps,
} from "../../components/Complex/ColorPicker";
import { Grid } from "../../components/Layouts/Grid";

export default {
  title: "Complex/Color Picker",
  component: ColorPicker,
} as Meta;

const colors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
];

const Template: Story<ColorPickerProps> = (args) => <ColorPicker {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  colors: [
    "#F47373",
    "#D9E3F0",
    "#697689",
    "#37D67A",
    "#555555",
    "#DCE775",
    "#FF8A65",
  ],
};

export const Picker = () => {
  const handleColorChange = (color: any) => {
    console.log(color.hex);
  };

  const colors = [
    "#F47373",
    "#D9E3F0",
    "#697689",
    "#37D67A",
    "#555555",
    "#DCE775",
    "#FF8A65",
  ];

  return (
    <ColorPicker
      mode={"picker"}
      width={170}
      colors={colors}
      onColorChange={handleColorChange}
    />
  );
};

export const Advanced = () => {
  const handleColorChange = (color: any) => {
    console.log(color.hex);
  };

  return (
    <ColorPicker
      width={214}
      mode={"advanced"}
      colors={colors}
      onColorChange={handleColorChange}
    />
  );
};

export const Palette = () => {
  const handleColorChange = (color: any) => {
    console.log(color.hex);
  };

  return (
    <Grid spacing={6} alignItems={"flex-start"}>
      <ColorPicker
        colors={colors}
        onColorChange={handleColorChange}
        mode={"palette"}
        palette={{ size: "large", variant: "rounded" }}
        width={200}
      />
      <ColorPicker
        colors={colors}
        onColorChange={handleColorChange}
        mode={"palette"}
        width={162}
        palette={{
          size: "large",
          variant: "circular",
        }}
      />
      <ColorPicker
        colors={colors}
        onColorChange={handleColorChange}
        mode={"palette"}
        width={188}
        palette={{
          size: "large",
          compact: true,
          variant: "square",
          hoverEffect: "shadow",
        }}
      />
    </Grid>
  );
};
