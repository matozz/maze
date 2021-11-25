import React, { useState, useEffect, forwardRef } from "react";
import "./Radio.css";
import { hexToRGB } from "../../../util/function/hexToRGB";
import { Label } from "../../DataDisplay/Label";
import { useMergedThemeProps } from "../../../styles";

export interface RadioProps {
  checked?: boolean;
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
  ({ ...oldProps }: RadioProps, ref) => {
    const [cssProperties, setCssProperties] = useState({});

    const {
      checked,
      size,
      disabled,
      name,
      label,
      value,
      onChange,
      color,
      style,
      theme,
      ...props
    } = useMergedThemeProps({
      name: "Radio",
      oldProps: oldProps,
      defaultProps: { color: "#1976d2" },
    });

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
            checked={checked}
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
          <Label style={{ marginLeft: 11, marginTop: 0, marginBottom: 0 }}>
            {label}
          </Label>
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
