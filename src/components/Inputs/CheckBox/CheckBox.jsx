import React, { useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import "./checkBox.css";
import { hexToRGB } from "../../../util/hexToRGB";

export const CheckBox = forwardRef(
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
    },
    ref
  ) => {
    const [cssProperties, setCssProperties] = useState({});
    useEffect(() => {
      setCssProperties({ "--maze-main-theme": hexToRGB(color) });
      return () => {};
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
          <input type="checkbox" ref={ref} disabled={disabled} />
          <span>{label}</span>
        </label>
      </>
    );
  }
);

CheckBox.propTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /**
   * What background color to use
   */
  color: PropTypes.string,
  // checked: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

CheckBox.defaultProps = {
  // checked: false,
  size: "medium",
  disabled: false,
  label: "",
  color: "#1976d2",
};
