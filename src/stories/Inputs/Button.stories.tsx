/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Story, Meta } from "@storybook/react";
import { Button, ButtonProps } from "../../components/Inputs/Button";
import { Grid } from "../../components/Layouts/Grid";
import { MdDelete } from "react-icons/md";

export default {
  title: "Inputs/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Buttons communicate actions that users can take. They are typically placed throughout your UI.",
      },
    },
  },
  argTypes: {
    color: { control: "color" },
    variant: {
      options: ["text", "contained", "outlined"],
      control: { type: "select" },
      defaultValue: "contained",
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
      defaultValue: "medium",
    },
    ref: { control: "" },
  },
} as Meta;

const Template = (args) => <Button {...args}>Button</Button>;

export const Default: Story<ButtonProps> = Template.bind({});
Default.args = {
  disabled: false,
  color: "#1976d2",
};

export const Basic: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="text">TEXT</Button>
    <Button variant="contained">CONTAINED</Button>
    <Button variant="outlined">OUTLINED</Button>
  </Grid>
);

export const Text: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="text">TEXT</Button>
    <Button variant="text" disabled>
      DISABLED
    </Button>
  </Grid>
);

export const Contained: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="contained">CONTAINED</Button>
    <Button variant="contained" disabled>
      DISABLED
    </Button>
  </Grid>
);

export const Outlined: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="outlined">OUTLINED</Button>
    <Button variant="outlined" disabled>
      DISABLED
    </Button>
  </Grid>
);

export const Events: Story<ButtonProps> = (args) => (
  <Button
    variant="contained"
    onClick={() => {
      alert("clicked");
    }}
    color="#d32f2f"
  >
    Alert
  </Button>
);

export const Sizes: Story<ButtonProps> = () => (
  <Grid spacing={3} direction="column">
    <Grid spacing={2}>
      <Button variant="text" size="small">
        SMALL
      </Button>
      <Button variant="text" size="medium">
        MEDIUM
      </Button>
      <Button variant="text" size="large">
        LARGE
      </Button>
    </Grid>
    <Grid spacing={2}>
      <Button variant="contained" size="small">
        SMALL
      </Button>
      <Button variant="contained" size="medium">
        MEDIUM
      </Button>
      <Button variant="contained" size="large">
        LARGE
      </Button>
    </Grid>
    <Grid spacing={2}>
      <Button variant="outlined" size="small">
        SMALL
      </Button>
      <Button variant="outlined" size="medium">
        MEDIUM
      </Button>
      <Button variant="outlined" size="large">
        LARGE
      </Button>
    </Grid>
  </Grid>
);

export const Colors: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="contained" color="#2e7d32">
      Success
    </Button>
    <Button variant="contained" color="#ed6c02">
      Warning
    </Button>
    <Button variant="contained" color="#d32f2f">
      Alert
    </Button>
  </Grid>
);

export const IconButton: Story<ButtonProps> = (args) => (
  <Grid spacing={2}>
    <Button variant="contained" icon preventElevation>
      <MdDelete />
    </Button>
    <Button variant="text" icon>
      <MdDelete />
    </Button>
  </Grid>
);
