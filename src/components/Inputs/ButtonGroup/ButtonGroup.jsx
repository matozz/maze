import React from "react";
import PropTypes from "prop-types";
import "./buttonGroup.css";

/**
 * @type React.ForwardRefRenderFunction<HTMLDivElement, ButtonGroupPropTypes>
 */
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
      {React.Children.map(children, (button, index) => {
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

const ButtonGroupPropTypes = {
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

ButtonGroup.propTypes = ButtonGroupPropTypes;

ButtonGroup.defaultProps = {
  variant: "contained",
  orientation: "horizontal",
  size: "medium",
  disabled: [],
};
