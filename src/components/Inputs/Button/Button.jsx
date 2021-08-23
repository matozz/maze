import React, { useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import "./button.css";
import { hexToRGB } from "../../../util/hexToRGB";

/**
 * @type React.ForwardRefRenderFunction<HTMLButtonElement, ButtonPropTypes>
 */
export const Button = forwardRef(
  ({ variant, disabled, color, size, label, style, ...props }, ref) => {
    const [cssProperties, setCssProperties] = useState({});
    const mode =
      variant === "text"
        ? "maze-button--text"
        : variant === "outlined"
        ? "maze-button--outlined"
        : "maze-button--contained";

    useEffect(() => {
      setCssProperties({ "--maze-main-theme": hexToRGB(color) });
      return () => {};
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

const ButtonPropTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /**
   * Button variants
   */
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
  /**
   * What background color to use
   */
  color: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};
Button.propTypes = ButtonPropTypes;

Button.defaultProps = {
  color: "#1976d2",
  variant: "contained",
  size: "medium",
  onClick: undefined,
};
