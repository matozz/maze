import React from "react";
import { Story, Meta } from "@storybook/react";
import { Tooltip, TooltipProps } from "../../components/DataDisplay/Tooltip";
import { Button } from "../../components/Inputs/Button";
import { Grid } from "../../components/Layouts/Grid";

export default {
  title: "Data Display/Tooltip",
  component: Tooltip,
  // parameters: {
  //   docs: {
  //     description: {
  //       component: "Quickly and easily create layouts with the flexible grid.",
  //     },
  //   },
  // },
  // argTypes: {
  //   children: { control: "" },
  // },
} as Meta;

export const Default: Story<TooltipProps> = (args) => {
  return (
    <Tooltip {...args} title="Text">
      <Button label="Text" variant="text" />
    </Tooltip>
  );
};
Default.args = {
  position: "bottom",
};

export const Positions: Story<TooltipProps> = () => {
  return (
    <Grid alignItems={"center"} direction={"column"} spacing={4}>
      <Tooltip title="Top" position="top">
        <Button label="Top" variant="text" />
      </Tooltip>
      <Grid spacing={6}>
        <Tooltip title="Left" position="left">
          <Button label="Left" variant="text" />
        </Tooltip>
        <Tooltip title="Right" position="right">
          <Button label="Right" variant="text" />
        </Tooltip>
      </Grid>
      <Tooltip title="Bottom" position="bottom">
        <Button label="Bottom" variant="text" />
      </Tooltip>
    </Grid>
  );
};

export const Arrows: Story<TooltipProps> = () => {
  return (
    <Grid alignItems={"center"} direction={"column"} spacing={4}>
      <Tooltip title="Top" position="top" arrow>
        <Button label="Top" variant="text" />
      </Tooltip>
      <Grid spacing={6}>
        <Tooltip title="Left" position="left" arrow>
          <Button label="Left" variant="text" />
        </Tooltip>
        <Tooltip title="Right" position="right" arrow>
          <Button label="Right" variant="text" />
        </Tooltip>
      </Grid>
      <Tooltip title="Bottom" position="bottom" arrow>
        <Button label="Bottom" variant="text" />
      </Tooltip>
    </Grid>
  );
};

export const CustomContents: Story<TooltipProps> = (args) => {
  return (
    <Tooltip
      {...args}
      title={
        <div>
          Tooltip with HTML
          <br />
          <em>{"And here's"}</em> <b>{"some"}</b> <u>{"amazing content"}</u>.{" "}
          {"It's very engaging. Right?"}
        </div>
      }
      containerStyle={{
        background: "#f5f5f5",
        color: "black",
        border: "#dbdbdb 1px solid",
        padding: 10,
        fontSize: 14,
        width: 220,
      }}
      arrowStyle={{
        color: "#dbdbdb",
      }}
      position="right"
      arrow
    >
      <Button label="HTML" variant="text" />
    </Tooltip>
  );
};
