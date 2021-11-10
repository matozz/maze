import React, { useCallback, useRef, useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Dialog, DialogProps } from "../../components/DataDisplay/Dialog";
import { DialogTitle } from "../../components/DataDisplay/DialogTitle";
import { DialogContent } from "../../components/DataDisplay/DialogContent";
import { DialogContentText } from "../../components/DataDisplay/DialogContentText";
import { DialogActions } from "../../components/DataDisplay/DialogActions";
import { Button } from "../../components/Inputs/Button";
import { Grid } from "../../components/Layouts/Grid";
import { RadioGroup } from "../../components/Inputs/RadioGroup";
import { Radio } from "../../components/Inputs/Radio";
import { Label } from "../../components/DataDisplay/Label";

export default {
  title: "Data Display/Dialog",
  component: Dialog,
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

export const Default: Story<DialogProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        label="OPEN DIALOG"
        variant="outlined"
        onClick={() => setOpen(true)}
      />
      <Dialog
        open={open}
        onClose={() => console.log("Dialog Closed")}
        onBackdropClick={() => setOpen(false)}
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            label="DISAGREE"
            variant="text"
            onClick={() => setOpen(false)}
          />
          <Button label="AGREE" variant="text" onClick={() => setOpen(false)} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export const ConfirmDialog: Story<DialogProps> = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  const resRef = useRef();

  const handleSelect = useCallback((e) => {
    resRef.current = e.target.value;
  }, []);

  return (
    <>
      <Grid spacing={2}>
        <Button
          label="DJ MAG VOTE 2022"
          variant="outlined"
          onClick={() => setOpen(true)}
        />
        <Dialog
          open={open}
          onClose={() => console.log("Dialog Closed")}
          onBackdropClick={() => setOpen(false)}
          width="350px"
        >
          <DialogTitle>{"Best DJ in the world"}</DialogTitle>
          <DialogContent dividers>
            <RadioGroup
              name="dj"
              size="medium"
              orientation="vertical"
              spacing={15}
              onChange={handleSelect}
            >
              <Radio value="Martin Garrix" label="Martin Garrix" />
              <Radio value="Mike Williams" label="Mike Williams" />
              <Radio value="Brooks" label="Brooks" />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button
              label="CANCEL"
              variant="text"
              onClick={() => setOpen(false)}
            />
            <Button
              label="SUBMIT"
              variant="text"
              onClick={() => {
                setResult(resRef.current);
                setOpen(false);
              }}
            />
          </DialogActions>
        </Dialog>
        <Label>Selection: {result}</Label>
      </Grid>
    </>
  );
};
