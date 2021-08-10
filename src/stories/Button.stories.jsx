import React from "react";

import { Button } from "../components/Inputs/Button";

export default {
  title: "Inputs/Button",
  component: Button,
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
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Button",
  disabled: false,
  color: "#1976d2",
};

export const Basic = (args) => (
  <div style={{ display: "flex", gap: 20 }}>
    <Button variant="text" label="TEXT" />
    <Button variant="contained" label="CONTAINED" />
    <Button variant="outlined" label="OUTLINED" />
  </div>
);

export const Text = (args) => (
  <div style={{ display: "flex", gap: 20 }}>
    <Button variant="text" label="TEXT" />
    <Button variant="text" label="DISABLED" disabled />
  </div>
);

export const Contained = (args) => (
  <div style={{ display: "flex", gap: 20 }}>
    <Button variant="contained" label="CONTAINED" />
    <Button variant="contained" label="DISABLED" disabled />
  </div>
);

export const Outlined = (args) => (
  <div style={{ display: "flex", gap: 20 }}>
    <Button variant="outlined" label="OUTLINED" />
    <Button variant="outlined" label="DISABLED" disabled />
  </div>
);

export const Events = (args) => (
  <Button
    variant="contained"
    label="Alert"
    onClick={() => {
      alert("clicked");
    }}
    color="#d32f2f"
  />
);

export const Sizes = () => (
  <div style={{ display: "grid", gridGap: 20 }}>
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Button variant="text" size="small" label="SMALL" />
      <Button variant="text" size="medium" label="MEDIUM" />
      <Button variant="text" size="large" label="LARGE" />
    </div>
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Button variant="contained" size="small" label="SMALL" />
      <Button variant="contained" size="medium" label="MEDIUM" />
      <Button variant="contained" size="large" label="LARGE" />
    </div>
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Button variant="outlined" size="small" label="SMALL" />
      <Button variant="outlined" size="medium" label="MEDIUM" />
      <Button variant="outlined" size="large" label="LARGE" />
    </div>
  </div>
);

export const Colors = (args) => (
  <div style={{ display: "flex", gap: 20 }}>
    <Button variant="contained" label="Success" color="#2e7d32" />
    <Button variant="contained" label="Warning" color="#ed6c02" />
    <Button variant="contained" label="Alert" color="#d32f2f" />
  </div>
);
