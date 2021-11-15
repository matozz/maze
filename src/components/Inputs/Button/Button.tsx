import React, { useState, useEffect, forwardRef } from "react";
import "./Button.css";
import { hexToRGB } from "../../../util/function/hexToRGB";
import { createTheme, useTheme } from "../../../styles";
import { useMergedThemeProps } from "../../../styles";

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
  ({ ...oldProps }: ButtonProps, ref) => {
    const [cssProperties, setCssProperties] = useState({});

    const { variant, disabled, color, size, label, style, theme, ...props } =
      useMergedThemeProps({ name: "Button", oldProps: oldProps });

    const mode =
      variant === "text"
        ? "maze-button--text"
        : variant === "outlined"
        ? "maze-button--outlined"
        : "maze-button--contained";

    useEffect(() => {
      setCssProperties({
        "--maze-main-theme": hexToRGB(color),
      });
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
        style={{
          ...cssProperties,
          ...style,
          color: theme == "dark" ? "rgba(0, 0, 0, 0.87)" : "white",
        }}
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
