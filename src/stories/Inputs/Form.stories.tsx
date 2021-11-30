/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Form, FormProps } from "../../components/Inputs/Form";
import { TextField } from "../../components/Inputs/TextField";
import { Button } from "../../components/Inputs/Button";
import { Label } from "../../components/DataDisplay/Label";
import { Grid } from "../../components/Layouts/Grid";
import { FormRef } from "../../components/Inputs/Form/FormRef";

export default {
  title: "Inputs/Form",
  component: Form,
} as Meta;

export const Basic: Story<FormProps> = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Control name="name">
        <TextField label={"Name"} variant="outlined" size="small" />
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
        <Button type="submit">Submit</Button>
      </Form.Control>
    </Form>
  );
};

export const InitialValues: Story<FormProps> = () => {
  const initialValues = {
    name: "Matoz",
    age: 21,
    address: "NYC",
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <>
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Control name="name">
          <TextField label={"Name"} variant="outlined" size="small" />
        </Form.Control>
        <Form.Control name="age">
          <TextField
            label={"Age"}
            type="number"
            variant="outlined"
            size="small"
          />
        </Form.Control>
        <Form.Control name="address">
          <TextField
            label={"Address"}
            type="text"
            variant="outlined"
            size="small"
          />
        </Form.Control>
        <Form.Control>
          <Button type="submit">Submit</Button>
        </Form.Control>
      </Form>
    </>
  );
};

export const Validation: Story<FormProps> = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Control
          name="name"
          validator={(name: string) => name.length > 0}
          helperText="Name is required"
        >
          <TextField label={"Name"} variant="outlined" size="small" required />
        </Form.Control>
        <Form.Control
          name="password"
          validator={(value: string) => value.length >= 6}
          helperText="Use 6 or more characters"
        >
          <TextField
            label={"Password"}
            type="password"
            variant="outlined"
            size="small"
          />
        </Form.Control>
        <Form.Control>
          <Button type="submit">Submit</Button>
        </Form.Control>
      </Form>
    </>
  );
};

export const Controls: Story<FormProps> = () => {
  const form = useRef<FormRef>();
  const [fieldValue, setFieldValue] = useState("");

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onReset = () => {
    form.current.resetFields();
  };

  const onClear = () => {
    form.current.clearFields();
  };

  const onGetValue = () => {
    setFieldValue(form.current.getFieldValue("name"));
  };

  const onSetValue = () => {
    form.current.setFieldValue("name", "Matoz");
  };

  const initialValues = {
    name: "Lebron James",
    age: 36,
  };

  return (
    <>
      <Grid spacing={4}>
        <Form onFinish={onFinish} ref={form} initialValues={initialValues}>
          <Form.Control
            name="name"
            validator={(name: string) => name.length > 0}
            helperText="Name is required"
          >
            <TextField
              label={"Name"}
              variant="outlined"
              size="small"
              required
            />
          </Form.Control>
          <Form.Control
            name="age"
            validator={(age: string) =>
              /^(([0-9]|[1-9][1-9]|1[0-7][0-9])(\\.[0-9]+)?|180)$/.test(age)
            }
            helperText="invalid age"
          >
            <TextField
              label={"Age"}
              variant="outlined"
              size="small"
              type="number"
              required
            />
          </Form.Control>
          <Form.Control>
            <Button type="submit">Submit</Button>
          </Form.Control>
          <Button onClick={onReset}>Reset</Button>
          <Button onClick={onClear}>Clear</Button>
        </Form>
        <Grid direction="column" spacing={6} style={{ marginTop: 6 }}>
          <Grid spacing={2} alignItems="center">
            <Button onClick={onGetValue} variant="outlined">
              Get Value
            </Button>
            <Label> {`Get value from field "name": ${fieldValue}`}</Label>
          </Grid>
          <Grid spacing={2} alignItems="center">
            <Button onClick={onSetValue} variant="outlined">
              Set Value
            </Button>
            <Label> {`Set "Matoz" to field "name"`}</Label>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
