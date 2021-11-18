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
} as Meta;

export const Default: Story<DialogProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        OPEN DIALOG
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          console.log("Dialog Closed");
          setOpen(false);
        }}
        onBackdropClick={() => setOpen(false)}
        exitOnEsc
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>
            DISAGREE
          </Button>
          <Button variant="text" onClick={() => setOpen(false)}>
            AGREE
          </Button>
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
        <Button variant="outlined" onClick={() => setOpen(true)}>
          DJ MAG VOTE 2022
        </Button>
        <Dialog
          open={open}
          onClose={() => console.log("Dialog Closed")}
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
            <Button variant="text" onClick={() => setOpen(false)}>
              CANCEL
            </Button>
            <Button
              variant="text"
              onClick={() => {
                setResult(resRef.current);
                setOpen(false);
              }}
            >
              SUBMIT
            </Button>
          </DialogActions>
        </Dialog>
        <Label>Selection: {result}</Label>
      </Grid>
    </>
  );
};

export const ScrollDialog: Story<DialogProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        SCROLL DIALOG
      </Button>
      <Dialog
        open={open}
        onClose={() => console.log("Dialog Closed")}
        onBackdropClick={() => setOpen(false)}
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>
            DISAGREE
          </Button>
          <Button variant="text" onClick={() => setOpen(false)}>
            AGREE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const FullWidth: Story<DialogProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        OPEN FULL-WIDTH DIALOG
      </Button>
      <Dialog
        open={open}
        onClose={() => console.log("Dialog Closed")}
        onBackdropClick={() => setOpen(false)}
        fullWidth
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>
            DISAGREE
          </Button>
          <Button variant="text" onClick={() => setOpen(false)}>
            AGREE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const FullScreen: Story<DialogProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        OPEN FULL-SCREEN DIALOG
      </Button>
      <Dialog
        open={open}
        onClose={() => console.log("Dialog Closed")}
        onBackdropClick={() => setOpen(false)}
        fullScreen
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>
            DISAGREE
          </Button>
          <Button variant="text" onClick={() => setOpen(false)}>
            AGREE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const Draggable: Story<DialogProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        OPEN DRAGGABLE DIALOG
      </Button>
      <Dialog
        open={open}
        onClose={() => console.log("Dialog Closed")}
        onBackdropClick={() => setOpen(false)}
        draggable
        dragOptions={{
          handle: "#title",
        }}
      >
        <DialogTitle dragFor="title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>
            DISAGREE
          </Button>
          <Button variant="text" onClick={() => setOpen(false)}>
            AGREE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
