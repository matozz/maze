import React, { forwardRef, useContext, useEffect } from "react";
import { FormContext } from "../Form";

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

export interface FormControlProps
  extends React.HTMLAttributes<FormControlElement> {
  // size?: 'sm' | 'lg';
  // plaintext?: boolean;
  // readOnly?: boolean;
  disabled?: boolean;
  name?: string;
  label?: string;
  value?: string | number;
  type?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  children: React.ReactNode;
  validator?: (value: string) => boolean;
  helperText?: string;
}

export const FormControl: React.FunctionComponent<FormControlProps> =
  forwardRef<FormControlElement, FormControlProps>(
    ({ name, validator, helperText, children }: FormControlProps, ref) => {
      const formContext = useContext(FormContext);

      const fieldValue = formContext?.value[name] ?? "";
      const fieldTouch = formContext.touch[name];
      const fieldValid = formContext.valid[name];

      useEffect(() => {
        if (name) {
          formContext.handler.handleControlChange({
            name: name,
            type: "valid",
            valid: validator ? validator(fieldValue) : -1,
          });
        }
      }, [fieldValue, fieldTouch, fieldValid]);

      if (React.isValidElement(children)) {
        return children.props.type !== "submit"
          ? React.cloneElement(children, {
              name: name,
              value: fieldValue ? fieldValue : "",
              error: fieldTouch && !fieldValid,
              helperText: fieldTouch && !fieldValid && helperText,
              ref: ref,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                formContext.handler.handleControlChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: "value",
                }),
              onFocus: (e: React.FocusEvent<HTMLInputElement>) =>
                formContext.handler.handleControlChange({
                  name: e.target.name,
                  type: "touch",
                  value: true,
                }),
            })
          : React.cloneElement(children, {
              onClick: formContext.handler.handleControlSubmit,
            });
      }
    }
  );

FormControl.displayName = "FormControl";
