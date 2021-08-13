import React from "react";

import { Grid } from "../../components/Layouts/Grid";
import "../../styles.css";

export default {
  title: "Layouts/Grid",
  component: Grid,
  argTypes: {
    children: { control: "" },
  },
};

const Item = ({ children, ...props }) => (
  <div className="item" {...props}>
    {children}
  </div>
);
const Paper = ({ children }) => (
  <div className="item" style={{ width: 100, height: 120 }}>
    {children}
  </div>
);

export const Default = (args) => {
  return (
    <Grid {...args}>
      <Grid lg={8}>
        <Item>lg-8</Item>
      </Grid>
      <Grid lg={4}>
        <Item>lg-4</Item>
      </Grid>
      <Grid lg={4}>
        <Item>lg-4</Item>
      </Grid>
      <Grid lg={8}>
        <Item>lg-8</Item>
      </Grid>
      <Grid lg={3}>
        <Item>lg-3</Item>
      </Grid>
      <Grid lg={5}>
        <Item>lg-5</Item>
      </Grid>
      <Grid lg={4}>
        <Item>lg-4</Item>
      </Grid>
    </Grid>
  );
};
Default.args = {
  spacing: 2,
  columns: 12,
  direction: "row",
  wrap: "wrap",
};

export const Spacing = (args) => {
  return (
    <Grid {...args}>
      <Grid>
        <Paper>Paper1</Paper>
      </Grid>
      <Grid>
        <Paper>Paper2</Paper>
      </Grid>
      <Grid>
        <Paper>Paper3</Paper>
      </Grid>
    </Grid>
  );
};
Spacing.args = {
  spacing: 4,
  justifyContent: "center",
};

export const Columns = (args) => {
  return (
    <Grid {...args}>
      <Grid lg={16}>
        <Item>lg-16</Item>
      </Grid>
      <Grid lg={8}>
        <Item>lg-8</Item>
      </Grid>
      <Grid lg={8}>
        <Item>lg-8</Item>
      </Grid>
    </Grid>
  );
};
Columns.args = {
  spacing: 2,
  columns: 16,
};
