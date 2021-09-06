import React, { useState, useEffect, forwardRef } from "react";
import "./CheckBox.css";
import { hexToRGB } from "../../../util/function/hexToRGB";

export interface CheckBoxProps {
  ref?: React.Ref<HTMLLabelElement>;
  /**
   * What background color to use
   */
  color?: string;
  // checked: PropTypes.bool,
  name?: string;
  value?: string;
  label: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onChange?: React.MouseEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      // checked,
      size,
      disabled,
      name,
      label,
      value,
      onChange,
      color,
      style,
      ...props
    }: CheckBoxProps,
    ref
  ) => {
    const [cssProperties, setCssProperties] = useState({});
    useEffect(() => {
      setCssProperties({ "--maze-main-theme": hexToRGB(color) });
      return () => {
        null;
      };
    }, [color]);
    return (
      <>
        <label
          className={[
            "maze-checkbox",
            disabled && "maze-checkbox-disabled",
            `maze-checkbox--${size}`,
          ].join(" ")}
          style={{ ...cssProperties, ...style }}
          {...props}
        >
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            name={name}
            value={value}
          />
          <span>{label}</span>
        </label>
      </>
    );
  }
);

CheckBox.defaultProps = {
  // checked: false,
  size: "medium",
  disabled: false,
  color: "#1976d2",
};
