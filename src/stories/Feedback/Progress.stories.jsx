import React, { useState } from "react";

import { Progress } from "../../components/Feedback/Progress";
import { Button } from "../../components/Inputs/Button";

export default {
  title: "Feedback/Progress",
  component: Progress,
  argTypes: {
    active: {
      description: "Control the popup open state.",
      control: " ",
      type: { name: "string", required: false },
      defaultValue: false,
    },
    clickToClose: {
      description: "Control progress can be closed by clicking the mask.",
      control: " ",
      type: { name: "string", required: false },
      defaultValue: false,
    },
    children: { control: "" },
  },
};

const Template = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Progress active={loading} handleMaskClick={setLoading} />
      <Button
        label={loading ? "Hide Loading" : "Show Loading"}
        onClick={() => setLoading(!loading)}
      ></Button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
