import React, { useState, useEffect, forwardRef } from "react";
import "./Button.css";
import { hexToRGB } from "../../../util/function/hexToRGB";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>;
  /**
   * Button variants
   */
  variant?: "text" | "contained" | "outlined";
  /**
   * What background color to use
   */
  color?: string;
  disabled?: boolean;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, disabled, color, size, label, style, ...props }: ButtonProps,
    ref
  ) => {
    const [cssProperties, setCssProperties] = useState({});
    const mode =
      variant === "text"
        ? "maze-button--text"
        : variant === "outlined"
        ? "maze-button--outlined"
        : "maze-button--contained";

    useEffect(() => {
      setCssProperties({ "--maze-main-theme": hexToRGB(color) });
      return () => {
        null;
      };
    }, [color]);
    return (
      <button
        type="button"
        className={["maze-button", `maze-button--${size}`, mode].join(" ")}
        {...props}
        disabled={disabled}
        style={{ ...cssProperties, ...style }}
        ref={ref}
      >
        {label}
      </button>
    );
  }
);

Button.defaultProps = {
  color: "#1976d2",
  variant: "contained",
  size: "medium",
  type: "button",
};
