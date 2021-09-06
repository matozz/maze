import React from "react";
import "./RadioGroup.scss";

export interface RadioGroupProps {
  label?: string;
  name: string;
  /**
   * Direction radio group can be displayed
   */
  orientation?: "vertical" | "horizontal";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Callback fired when a radio button is selected.
   */
  /**
   * The index of the button to be disabled
   */
  disabled?: Array<number>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = ({
  orientation,
  onChange,
  name,
  size,
  label,
  disabled = [],
  children,
  ...props
}: RadioGroupProps) => {
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
          if (React.isValidElement(radio)) {
            return React.cloneElement(radio, {
              name: name,
              size: size,
              disabled: Array.isArray(disabled)
                ? disabled.indexOf(index + 1) !== -1
                : null,
              key: index,
            });
          }
        })}
      </div>
    </>
  );
};

RadioGroup.defaultProps = {
  name: "",
  orientation: "horizontal",
  size: "medium",
  disabled: [],
};
