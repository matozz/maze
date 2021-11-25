import React, { useState, useEffect, forwardRef } from "react";
import "./CheckBox.css";
import { hexToRGB } from "../../../util/function/hexToRGB";
import { Label } from "../../DataDisplay/Label";
import { useMergedThemeProps } from "../../../styles";

export interface CheckBoxProps {
  ref?: React.Ref<HTMLLabelElement>;
  /**
   * What background color to use
   */
  color?: string;
  defaultChecked?: boolean;
  name?: string;
  value?: string;
  label?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onChange?: React.MouseEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ ...oldProps }: CheckBoxProps, ref) => {
    const [cssProperties, setCssProperties] = useState({});

    const {
      defaultChecked,
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
      name: "CheckBox",
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
            "maze-checkbox",
            disabled ? "maze-checkbox-disabled" : "",
            `maze-checkbox--${theme}`,
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
            defaultChecked={defaultChecked}
          />

          <span>
            <Label
              style={{
                marginLeft: 11,
                marginTop: 0,
                marginBottom: 0,
                display: "inline",
              }}
            >
              {label}
            </Label>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              className="maze-checkbox-svg"
              focusable="false"
              aria-hidden="true"
              data-testid="CheckBoxIcon"
            >
              <path d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z" />
            </svg>
          </span>
        </label>
      </>
    );
  }
);

CheckBox.defaultProps = {
  size: "medium",
  disabled: false,
  color: "#1976d2",
};
