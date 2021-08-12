import React, { useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import "./textField.css";
import { hexToRGB } from "../../../util/hexToRGB";

export const TextField = forwardRef(
  (
    {
      variant,
      size,
      disabled,
      id,
      label,
      type,
      defaultValue,
      autoComplete,
      onChange,
      color,
      style,
      required,
      rows,
      resize,
      multiline,
      helperText,
      focused,
      ...props
    },
    ref
  ) => {
    const [cssProperties, setCssProperties] = useState({});
    useEffect(() => {
      setCssProperties({ "--maze-main-theme": hexToRGB(color) });
      return () => {};
    }, [color]);

    const mode =
      variant === "filled"
        ? "maze-textfield--filled"
        : "maze-textfield--outlined";

    const focus = focused ? "maze-textfield--focused" : "";

    return (
      <>
        <label
          className={[
            "maze-textfield",
            mode,
            focus,
            `maze-textfield--${size}`,
          ].join(" ")}
          style={{
            ...cssProperties,
            ...style,
            marginBottom: helperText ? "22px" : "0",
          }}
        >
          {!multiline ? (
            <input
              placeholder=" "
              id={id}
              required={required}
              autoComplete={autoComplete}
              disabled={disabled}
              type={type}
              defaultValue={defaultValue}
              ref={ref}
              onChange={onChange}
              {...props}
            />
          ) : (
            <textarea
              placeholder=" "
              id={id}
              required={required}
              autoComplete={autoComplete}
              disabled={disabled}
              defaultValue={defaultValue}
              type={type}
              rows={rows}
              style={{ resize: resize ? "both" : "none" }}
              ref={ref}
              onChange={onChange}
              {...props}
            />
          )}

          <span>
            {label}
            <span style={{ marginLeft: 1.5 }}>{required && "*"}</span>
          </span>
          {helperText && (
            <div className="maze-textfield-helpertext">{helperText}</div>
          )}
        </label>
      </>
    );
  }
);

TextField.propTypes = {
  /**
   * What label color to use
   */
  autoComplete: PropTypes.string,
  color: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  /**
   * The multiline prop transforms the text field into a `<textarea>` element
   */
  multiline: PropTypes.bool,
  /**
   * The rows of the `<textarea>`
   */
  rows: PropTypes.number,
  /**
   * The height of the text field can dynamically resize to matches its content
   */
  resize: PropTypes.bool,
  focused: PropTypes.bool,
  variant: PropTypes.oneOf(["filled", "outlined"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

TextField.defaultProps = {
  variant: "filled",
  size: "medium",
  disabled: false,
  color: "#1976d2",
  label: "",
  type: "text",
  multiline: false,
  required: false,
  rows: 4,
  resize: false,
};
