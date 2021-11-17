import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Grid } from "../../components/Layouts/Grid";
import { Switch } from "../../components/Inputs/Switch";
import { Button } from "../../components/Inputs/Button";
import { createTheme, ThemeProvider } from "../../styles";
import { RadioGroup } from "../../components/Inputs/RadioGroup";
import { Radio } from "../../components/Inputs/Radio";
import { Form } from "../../components/Inputs/Form";
import { TextField } from "../../components/Inputs/TextField";
import { Dialog } from "../../components/DataDisplay/Dialog";
import { DialogTitle } from "../../components/DataDisplay/DialogTitle";
import { DialogContent } from "../../components/DataDisplay/DialogContent";
import { DialogContentText } from "../../components/DataDisplay/DialogContentText";
import { DialogActions } from "../../components/DataDisplay/DialogActions";
import { Label } from "../..";

export default {
  title: "Theme (Beta)",
} as Meta;

const Template: Story = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);

  const primaryDark = "#90caf9";

  const theme = createTheme({
    mode: mode,
    components: {
      ...["Button", "Switch", "Radio", "TextField"].reduce((comps, comp) => {
        comps[comp] = { dark: { color: primaryDark }, light: {} };
        return comps;
      }, {}),
      Dialog: { dark: { backgroundColor: "#383838" } },
      DialogTitle: { dark: { color: "#eaeef3" } },
      DialogContentText: { dark: { color: "rgba(255, 255, 255, 0.7)" } },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          spacing={4}
          direction="column"
          alignItems="flex-start"
          style={{
            backgroundColor: mode === "light" ? "white" : "#0A1929",
            padding: 20,
          }}
        >
          <Switch
            label={mode.toUpperCase()}
            onChange={(e) => setMode(e.target.checked ? "dark" : "light")}
          ></Switch>
          <Grid spacing={3} direction="column">
            <Grid spacing={2}>
              <Button variant="text" size="small" label="SMALL" />
              <Button variant="text" size="medium" label="MEDIUM" />
              <Button variant="text" size="large" label="LARGE" />
            </Grid>
            <Grid spacing={2}>
              <Button variant="contained" size="small" label="SMALL" />
              <Button variant="contained" size="medium" label="MEDIUM" />
              <Button variant="contained" size="large" label="LARGE" />
            </Grid>
            <Grid spacing={2}>
              <Button variant="outlined" size="small" label="SMALL" />
              <Button variant="outlined" size="medium" label="MEDIUM" />
              <Button variant="outlined" size="large" label="LARGE" />
            </Grid>
          </Grid>
          <RadioGroup name="gender">
            <Radio value="female" label="Female" />
            <Radio value="male" label="Male" />
            <Radio value="other" label="Other" />
          </RadioGroup>
          <Form
            initialValues={{
              name: "Matoz",
            }}
          >
            <Form.Control name="name">
              <TextField
                label={"Name"}
                variant="outlined"
                size="small"
                required
              />
            </Form.Control>
            <Form.Control name="password">
              <TextField
                label={"Password"}
                type="password"
                variant="outlined"
                size="small"
              />
            </Form.Control>
            <Form.Control>
              <Button label={"Submit"} type="submit" />
            </Form.Control>
          </Form>
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
            <DialogContent dividers>
              <DialogContentText>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running. Let Google help apps determine location. This means
                sending anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                label="DISAGREE"
                variant="text"
                onClick={() => setOpen(false)}
              />
              <Button
                label="AGREE"
                variant="text"
                onClick={() => setOpen(false)}
              />
            </DialogActions>
          </Dialog>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
