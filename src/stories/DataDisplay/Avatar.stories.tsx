/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Avatar } from "../../components/DataDisplay/Avatar";
import { Grid } from "../../components/Layouts/Grid";
import Avatar1 from "../assets/avatar/1.jpg";
import Avatar2 from "../assets/avatar/2.jpg";
import Avatar3 from "../assets/avatar/3.jpg";
import FileIcon from "../assets/avatar/FileIcon";
import PhotoIcon from "../assets/avatar/PhotoIcon";

export default {
  title: "Data Display/Avatar",
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          "Avatars are found throughout material design with uses in everything from tables to dialog menus.",
      },
    },
  },
  argTypes: {
    variant: {
      options: ["square", "rounded", "circular"],
      control: { type: "select" },
      defaultValue: "circular",
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
      defaultValue: "medium",
    },
    children: { control: "" },
  },
};

const Template = (args) => {
  return (
    <Grid spacing={2}>
      <Avatar src={Avatar1} {...args} />
      <Avatar src={Avatar2} {...args} />
      <Avatar src={Avatar3} {...args} />
    </Grid>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Sizes = (args) => {
  return (
    <Grid spacing={2}>
      <Avatar size="small" src={Avatar1} />
      <Avatar size="medium" src={Avatar1} />
      <Avatar size="large" src={Avatar1} />
    </Grid>
  );
};

export const IconAvatars = (args) => {
  return (
    <Grid spacing={2}>
      <Avatar>
        <FileIcon />
      </Avatar>
      <Avatar colorful>
        <PhotoIcon />
      </Avatar>
    </Grid>
  );
};

export const LetterAvatars = (args) => {
  return (
    <Grid spacing={2}>
      <Avatar>MJ</Avatar>
      <Avatar colorful>OP</Avatar>
      <Avatar colorful>H</Avatar>
    </Grid>
  );
};

export const Variants = (args) => {
  return (
    <Grid spacing={2}>
      <Avatar variant="circular">MJ</Avatar>
      <Avatar variant="rounded" colorful>
        MJ
      </Avatar>
      <Avatar variant="square" colorful>
        OP
      </Avatar>
    </Grid>
  );
};
