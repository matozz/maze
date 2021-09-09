/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useImperativeHandle, useState } from "react";
import { FormControl } from "../FormControl";
import "./Form.scss";
import { FormRef } from "./FormRef";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  ref?: React.Ref<HTMLFormElement>;
  layout?: "horizontal" | "vertical" | "inline";
  validated?: boolean;
  children: React.ReactNode;
  initialValues?: any;
  onFinish?: ({ value }) => void;
}

interface ControlChangeProps {
  name: string;
  type: string;
  value: string;
  valid: boolean;
}

export const FormContext = React.createContext(null);

const Form = React.forwardRef<FormRef, FormProps>(
  (
    {
      layout,
      validated,
      children,
      initialValues,
      onFinish,
      ...props
    }: FormProps,
    ref
  ) => {
    const [formValue, setFormValue] = useState(initialValues ?? {});
    const [formTouch, setFormTouch] = useState({});
    const [formValid, setFormValid] = useState({});
    const preValid = {}; // temporary solution for setting the valid status at once

    const handleControlChange = ({
      name,
      type,
      value,
      valid,
    }: ControlChangeProps) => {
      preValid[name] = valid;
      type === "value" &&
        setFormValue(() => {
          return {
            ...formValue,
            [name]: value,
          };
        });
      type === "touch" &&
        setFormTouch({
          ...formTouch,
          [name]: true,
        });
      type === "valid" &&
        setFormValid({
          ...formValid,
          ...preValid,
        });
    };

    const handleControlSubmit = () => {
      if (onFinish) {
        if (Object.values(formValid).indexOf(false) === -1) {
          onFinish(formValue);
        } else {
          const names = Object.keys(formValid),
            preTouch = {};
          for (const name of names) {
            preTouch[name] = true;
          }
          setFormTouch({
            ...formTouch,
            ...preTouch,
          });
        }
      }
    };

    useImperativeHandle(ref, () => ({
      clearFields: () => {
        setFormValue({});
      },
      resetFields: () => {
        setFormValue(initialValues ?? {});
      },
      getFieldValue: (fieldName) => {
        return formValue[fieldName] ? formValue[fieldName] : "";
      },
      setFieldValue: (fieldName, value) => {
        setFormValue({ ...formValue, [fieldName]: value });
      },
    }));

    return (
      <FormContext.Provider
        value={{
          value: { ...formValue },
          touch: { ...formTouch },
          valid: { ...formValid },
          config: { layout, validated },
          handler: {
            handleControlChange,
            handleControlSubmit,
          },
        }}
      >
        <form
          {...props}
          className={`maze-form maze-form--${layout}`}
          onSubmit={(e) => e.preventDefault()}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = "Form";

Form.defaultProps = {
  layout: "horizontal",
};

export default Object.assign(Form, {
  Control: FormControl,
});
