import React, { useState, useEffect, forwardRef } from "react";
import "./Radio.css";
import { hexToRGB } from "../../../util/function/hexToRGB";

export interface RadioProps {
  ref?: React.Ref<HTMLInputElement>;
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

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
    }: RadioProps,
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
            "maze-radio",
            disabled && "maze-radio-disabled",
            `maze-radio--${size}`,
          ].join(" ")}
          style={{ ...cssProperties, ...style }}
        >
          <input
            //   checked={checked}
            type="radio"
            name={name}
            disabled={disabled}
            value={value}
            ref={ref}
            {...props}
            onChange={() => {
              null;
            }}
          />
          <span className="outer">
            <span className="inner"></span>
          </span>
          <span className="maze-radio-label">{label}</span>
        </label>
      </>
    );
  }
);

Radio.defaultProps = {
  // checked: false,
  size: "medium",
  disabled: false,
  color: "#1976d2",
};
