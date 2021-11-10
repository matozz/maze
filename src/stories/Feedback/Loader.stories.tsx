import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Loader, LoaderProps } from "../../components/Feedback/Loader";
import { Button } from "../../components/Inputs/Button";

export default {
  title: "Feedback/Loader",
  component: Loader,
  parameters: {
    docs: {
      description: {
        component:
          "Loader indicators commonly known as spinners, express an unspecified wait time or display the length of a process.",
      },
    },
  },
  argTypes: {
    active: {
      description: "Control the popup open state.",
      control: " ",
      type: { name: "string", required: false },
      defaultValue: false,
    },
    clickToClose: {
      description: "Control loader can be closed by clicking the mask.",
      control: " ",
      type: { name: "string", required: false },
      defaultValue: false,
    },
    children: { control: "" },
  },
} as Meta;

const Template: Story<LoaderProps> = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Loader
        open={loading}
        onClose={() => console.log("Loader Closed")}
        onClickMask={() => setLoading(false)}
      />
      <Button
        label={loading ? "Hide Loading" : "Show Loading"}
        onClick={() => setLoading(true)}
      ></Button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
