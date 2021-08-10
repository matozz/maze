import React, { useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import "./radio.css";
import { hexToRGB } from "../../../util/hexToRGB";

export const Radio = forwardRef(
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
            onChange={() => {}}
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

Radio.propTypes = {
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

Radio.defaultProps = {
  // checked: false,
  size: "medium",
  disabled: false,
  label: "",
  color: "#1976d2",
};
