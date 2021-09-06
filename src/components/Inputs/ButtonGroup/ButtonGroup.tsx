import React from "react";
import "./ButtonGroup.scss";

export interface ButtonGroupProps {
  /**
   * Button variants
   */
  variant?: "text" | "contained" | "outlined";
  /**
   * Direction button group can be displayed
   */
  orientation?: "vertical" | "horizontal";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * The index of the button to be disabled
   */
  disabled?: Array<number>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = ({
  variant,
  orientation,
  size,
  children,
  onClick,
  disabled = [],
  style,
  ...props
}: ButtonGroupProps) => {
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
        return (
          React.isValidElement(button) &&
          React.cloneElement(button, {
            // name: name,
            size: size,
            variant: variant,
            onClick: onClick,
            disabled: Array.isArray(disabled)
              ? disabled.indexOf(index + 1) !== -1
              : null,
            key: index,
            "data-index": index,
          })
        );
      })}
    </div>
  );
};

ButtonGroup.defaultProps = {
  variant: "contained",
  orientation: "horizontal",
  size: "medium",
  disabled: [],
};
