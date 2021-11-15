import React, { useState, useEffect, forwardRef } from "react";
import "./TextField.css";
import { hexToRGB } from "../../../util/function/hexToRGB";
import { useMergedThemeProps } from "../../../styles";

type InputControlElement = HTMLInputElement | HTMLTextAreaElement;
export interface TextFieldProps {
  /**
   * What label color to use
   */
  autoComplete?: string;
  color?: string;
  defaultValue?: string;
  type?: string;
  label: string;
  width?: string | number | "auto";
  required?: boolean;

  /**
   * The rows of the `<textarea>`
   */
  rows?: number;
  /**
   * The multiline prop transforms the text field into a `<textarea>` element
   */
  multiline?: boolean;
  /**
   * The height of the text field can dynamically resize to matches its content
   */
  resize?: boolean;
  focused?: boolean;
  variant?: "filled" | "outlined";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  error?: boolean;
  onChange?: React.ChangeEventHandler<InputControlElement>;
  ref?: React.Ref<HTMLInputElement> & React.Ref<HTMLTextAreaElement>;
  helperText?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
  value?: string | number;
}

export const TextField = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  TextFieldProps
>(({ ...oldProps }: TextFieldProps, ref) => {
  const [cssProperties, setCssProperties] = useState({});
  const {
    variant,
    size,
    disabled,
    id,
    label,
    type,
    defaultValue,
    autoComplete,
    onChange,
    value,
    color,
    style,
    required,
    rows,
    resize,
    width,
    multiline,
    helperText,
    focused,
    error,
    name,
    theme,
    ...props
  } = useMergedThemeProps({ name: "TextField", oldProps: oldProps });

  const errorColor = "#d32f2f";
  useEffect(() => {
    setCssProperties({
      "--maze-main-theme": hexToRGB(error ? errorColor : color),
      "--maze-onsurface-rgb": theme === "dark" ? "255, 255, 255" : "0, 0, 0",
    });
    return () => {
      null;
    };
  }, [color, error, theme]);

  const mode =
    variant === "filled"
      ? "maze-textfield--filled"
      : "maze-textfield--outlined";

  const focus = focused ? "maze-textfield--focused" : "";
  const err = error ? "maze-textfield--error" : "";

  return (
    <>
      <label
        className={[
          "maze-textfield",
          mode,
          focus,
          err,
          `maze-textfield--${size}`,
        ].join(" ")}
        style={{
          ...cssProperties,
          ...style,
          marginBottom: helperText ? "22px" : "0",
          width: width,
        }}
      >
        {!multiline ? (
          <input
            placeholder=" "
            id={id}
            name={name}
            required={required}
            autoComplete={autoComplete}
            disabled={disabled}
            type={type}
            defaultValue={defaultValue}
            ref={ref}
            value={value}
            onChange={onChange}
            {...props}
          />
        ) : (
          <textarea
            placeholder=" "
            id={id}
            name={name}
            required={required}
            autoComplete={autoComplete}
            disabled={disabled}
            defaultValue={defaultValue}
            rows={rows}
            style={{ resize: resize ? "both" : "none" }}
            ref={ref}
            value={value}
            onChange={onChange}
            {...props}
          />
        )}

        <span>
          {label}
          <span style={{ marginLeft: 1.5 }}>{required && "*"}</span>
        </span>
        {helperText && (
          <div
            className="maze-textfield-helpertext"
            style={{ color: error && errorColor }}
          >
            {helperText}
          </div>
        )}
      </label>
    </>
  );
});

TextField.defaultProps = {
  variant: "filled",
  width: "auto",
  size: "medium",
  disabled: false,
  color: "#1976d2",
  label: "",
  type: "text",
  multiline: false,
  required: false,
  rows: 4,
  resize: false,
  error: false,
};
