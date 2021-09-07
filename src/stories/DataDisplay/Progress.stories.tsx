import React, { useEffect, useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Progress, ProgressProps } from "../../components/DataDisplay/Progress";
import { Grid } from "../../components/Layouts/Grid";
import Plugin from "../assets/plugin.svg";

export default {
  title: "Data Display/Progress",
  component: Progress,
  argTypes: {
    strokeColor: { control: "color" },
    textColor: { control: "color" },
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Default: Story<ProgressProps> = (args) => {
  return <Progress {...args} />;
};
Default.args = {
  percentage: 75,
  width: 120,
  type: "circle",
  strokeColor: "#1976d2",
  textColor: "#47484b",
  backgroundColor: "#cfcfcf3b",
  strokeWidth: 8,
  showBackground: true,
};

export const Animated: Story<ProgressProps> = () => {
  const [percent, setPercent] = useState(0);
  let i = 0;

  useEffect(() => {
    let timer = null;
    const progress = () => {
      i += Math.floor(Math.random() * 5);
      if (i >= 100) {
        i = 100;
        const delay = setTimeout(() => {
          i = 0;
          clearInterval(timer);
          clearTimeout(delay);
          timer = setInterval(progress, 250);
        }, 1000);
      }

      setPercent(() => i);
    };
    timer = setInterval(progress, 250);
    return () => clearInterval(timer);
  }, []);

  return (
    <Grid direction="column" spacing={8}>
      <Progress percentage={percent} />
      <Progress percentage={percent} type="line" width={160} />
    </Grid>
  );
};

export const Status: Story<ProgressProps> = () => (
  <Grid spacing={4}>
    <Grid lg={12} spacing={4}>
      <Progress percentage={25} status="error" />
      <Progress percentage={75} status="warning" />
      <Progress percentage={100} status="success" />
    </Grid>
    <Grid lg={12} spacing={4} direction="column">
      <Progress percentage={25} status="error" type="line" width={240} />
      <Progress percentage={75} status="warning" type="line" width={240} />
      <Progress percentage={100} status="success" type="line" width={240} />
    </Grid>
  </Grid>
);

export const CustomLabel: Story<ProgressProps> = () => (
  <Grid spacing={4}>
    <Progress
      percentage={10}
      status="error"
      label={
        <div style={{ color: "#d32f2f", textAlign: "center" }}>
          Upload Failed
          <div style={{ fontSize: 12 }}>(Limit size: 5MB)</div>
        </div>
      }
      width={140}
    />
    <Progress
      percentage={45}
      strokeColor="#3c80c3"
      label={<img src={Plugin} width="40px" />}
    />
    <Progress
      percentage={100}
      status="success"
      label={
        <div style={{ color: "#2e7d32", textAlign: "center" }}>Success</div>
      }
      width={110}
    />
  </Grid>
);
