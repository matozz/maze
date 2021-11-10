import React from "react";
import "./RadioGroup.scss";

export interface RadioGroupProps {
  ref?: React.Ref<HTMLDivElement>;
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
   * The space between the radio buttons
   */
  spacing?: number;
  /**
   * The index of the button to be disabled
   */
  disabled?: Array<number>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = React.memo(
  ({
    orientation,
    onChange,
    name,
    size,
    label,
    disabled = [],
    children,
    spacing = 10,
    ...props
  }: RadioGroupProps) => {
    const direction =
      orientation === "horizontal"
        ? "maze-radio-group--horizontal"
        : "maze-radio-group--vertical";
    return (
      <>
        {label && <div className="maze-radio-group-lable">{label}</div>}

        <div
          className={[
            "maze-radio-group",
            `maze-radio-group--${size}`,
            direction,
          ].join(" ")}
          {...props}
          style={{ gap: spacing + "px" }}
          onChange={onChange}
          // ref={ref}
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
  }
);

RadioGroup.displayName = "RadioGroup";

RadioGroup.defaultProps = {
  name: "",
  orientation: "horizontal",
  size: "medium",
  disabled: [],
};
