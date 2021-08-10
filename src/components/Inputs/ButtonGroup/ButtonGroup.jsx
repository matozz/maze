import React from "react";
import PropTypes from "prop-types";
import "./buttonGroup.css";
import { Button } from "../Button";

export const ButtonGroup = ({
  variant,
  orientation,
  size,
  children,
  onClick,
  disabled = [],
  style,
  ...props
}) => {
  const direction =
    orientation === "horizontal"
      ? "maze-button-group--horizontal"
      : "maze-button-group--vertical";
  return (
    <div
      className={["maze-button-group", direction].join(" ")}
      style={style}
      {...props}
    >
      {children.map((button, index) => {
        return React.cloneElement(button, {
          name: name,
          size: size,
          variant: variant,
          onClick: onClick,
          disabled: Array.isArray(disabled)
            ? disabled.indexOf(index + 1) !== -1
            : null,
          key: index,
          "data-index": index,
        });
      })}
    </div>
  );
};

ButtonGroup.propTypes = {
  /**
   * Button variants
   */
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
  /**
   * Direction button group can be displayed
   */
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * The index of the button to be disabled
   */
  disabled: PropTypes.array,
  onClick: PropTypes.func,
};

ButtonGroup.defaultProps = {
  variant: "contained",
  orientation: "horizontal",
  size: "medium",
  disabled: [],
};
