import React from "react";
import PropTypes from "prop-types";
import "./radioGroup.css";

/**
 * @type React.ForwardRefRenderFunction<HTMLDivElement, RadioGroupPropTypes>
 */
export const RadioGroup = ({
  orientation,
  onChange,
  name,
  size,
  label,
  disabled = [],
  children,
  ...props
}) => {
  const direction =
    orientation === "horizontal"
      ? "maze-radio-group--horizontal"
      : "maze-radio-group--vertical";
  return (
    <>
      <div className="maze-radio-group-lable">{label}</div>
      <div
        className={[
          "maze-radio-group",
          `maze-radio-group--${size}`,
          direction,
        ].join(" ")}
        {...props}
        onChange={onChange}
      >
        {React.Children.map(children, (radio, index) => {
          return React.cloneElement(radio, {
            name: name,
            size: size,
            disabled: Array.isArray(disabled)
              ? disabled.indexOf(index + 1) !== -1
              : null,
            key: index,
          });
        })}
      </div>
    </>
  );
};

const RadioGroupPropTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  /**
   * Direction radio group can be displayed
   */
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Callback fired when a radio button is selected.
   */
  /**
   * The index of the button to be disabled
   */
  disabled: PropTypes.array,
  onChange: PropTypes.func,
};

RadioGroup.propTypes = RadioGroupPropTypes;

RadioGroup.defaultProps = {
  name: "",
  orientation: "horizontal",
  size: "medium",
  disabled: [],
};
