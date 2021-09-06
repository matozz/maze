import React, { useState, useEffect, forwardRef } from "react";
import "./Switch.scss";
import { hexToRGB } from "../../../util/function/hexToRGB";

export interface SwitchProps {
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
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
    }: SwitchProps,
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
            "maze-switch",
            disabled && "maze-switch-disabled",
            `maze-switch--${size}`,
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

Switch.defaultProps = {
  // checked: false,
  size: "medium",
  disabled: false,
  color: "#1976d2",
};
