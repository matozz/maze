import React, { useState } from "react";

import { TextField } from "../components/Inputs/TextField";
import { Grid } from "../components/Layouts/Grid";

export default {
  title: "Inputs/Text Field",
  component: TextField,
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
  return <TextField {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  variant: "filled",
  size: "medium",
  disabled: false,
  label: "TextField",
  color: "#1976d2",
  type: "text",
  multiline: false,
  required: false,
};

export const Basic = () => (
  <Grid spacing={2}>
    <TextField variant="filled" label="Filled" />
    <TextField variant="outlined" label="Outlined" />
  </Grid>
);

export const Sizes = () => (
  <Grid spacing={2}>
    <Grid spacing={2}>
      <TextField variant="filled" size="small" label="SMALL" />
      <TextField variant="filled" size="medium" label="MEDIUM" />
      <TextField variant="filled" size="large" label="LARGE" />
    </Grid>
    <Grid spacing={2}>
      <TextField variant="outlined" size="small" label="SMALL" />
      <TextField variant="outlined" size="medium" label="MEDIUM" />
      <TextField variant="outlined" size="large" label="LARGE" />
    </Grid>
  </Grid>
);

export const Props = () => (
  <Grid spacing={2}>
    <Grid spacing={2}>
      <TextField variant="filled" size="medium" label="Required" required />
      <TextField
        variant="filled"
        label="Disabled"
        defaultValue="Hello World"
        disabled
      />
      <TextField
        variant="filled"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
    </Grid>
    <Grid spacing={2}>
      <TextField variant="outlined" size="medium" label="Required" required />
      <TextField
        variant="outlined"
        label="Disabled"
        defaultValue="Hello World"
        disabled
      />
      <TextField
        variant="outlined"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
    </Grid>
  </Grid>
);

export const Multiline = () => (
  <Grid spacing={4} direction="column">
    <Grid spacing={2}>
      <TextField variant="filled" label="Multiline" multiline rows={2} />
      <TextField
        variant="filled"
        label="Resizable Multiline"
        defaultValue="Hello World"
        multiline
        resize
      />
    </Grid>
    <Grid spacing={2}>
      <TextField variant="outlined" label="Multiline" multiline rows={2} />
      <TextField
        variant="outlined"
        label="Resizable Multiline"
        defaultValue="Hello World"
        multiline
        resize
      />
    </Grid>
  </Grid>
);

export const Colors = () => (
  <Grid spacing={2}>
    <TextField
      variant="filled"
      label="Filled success"
      defaultValue="Success"
      color="#2e7d32"
      focused
    />
    <TextField
      variant="outlined"
      label="Outlined waring"
      defaultValue="Warning"
      color="#ed6c02"
      focused
    />
    <TextField
      variant="outlined"
      label="Outlined error"
      defaultValue="Error"
      color="#d32f2f"
      focused
    />
  </Grid>
);

export const Controlls = () => {
  const [value, setValue] = useState("Hello World");
  return (
    <Grid spacing={2}>
      <TextField
        variant="outlined"
        label="Controlled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <TextField variant="outlined" label="Uncontrolled" defaultValue="foo" />
    </Grid>
  );
};

export const HelperText = (args) => {
  return (
    <Grid spacing={2}>
      <TextField
        variant="outlined"
        label="Name"
        helperText="Please enter your name"
      />
      <TextField variant="outlined" label="Name" helperText=" " />
    </Grid>
  );
};

export const Error = () => {
  return (
    <Grid spacing={2}>
      <TextField
        error
        variant="filled"
        label="Error"
        defaultValue="Hello World"
        helperText="Incorrect entry."
        focused
      />
      <TextField
        error
        variant="outlined"
        label="Error"
        defaultValue="Hello World"
        helperText="Incorrect entry."
        focused
      />
    </Grid>
  );
};
