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
import { CheckBox, Label, Slider } from "../..";

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
      ...[
        "Button",
        "Switch",
        "Radio",
        "TextField",
        "CheckBox",
        "Slider",
      ].reduce((comps, comp) => {
        comps[comp] = { dark: { color: primaryDark }, light: {} };
        return comps;
      }, {}),
      Dialog: { dark: { backgroundColor: "#383838" } },
      DialogTitle: { dark: { color: "#eaeef3" } },
      DialogContentText: { dark: { color: "rgba(255, 255, 255, 0.7)" } },
    },
  });

  const Item: Story = ({ children, ...props }) => (
    <div className="item" {...props}>
      {children}
    </div>
  );

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
              containerStyle={{
                alignSelf: "flex-start",
                marginTop: 80,
                minWidth: 550,
              }}
            >
              <DialogTitle style={{ padding: 12, paddingTop: 18 }}>
                <TextField
                  label="Search"
                  variant="outlined"
                  placeholder="Search Docs"
                  width="100%"
                  unstyled
                  suffixElement={
                    <Button variant="outlined" style={{ padding: 8 }}>
                      Clear
                    </Button>
                  }
                ></TextField>
              </DialogTitle>
              <DialogContent
                style={{
                  padding: 12,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 40,
                }}
              >
                No Search Results
              </DialogContent>
            </Dialog>
          </>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
