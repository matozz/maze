import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import "./grid.css";

export const Grid = ({
  columns,
  columnSpacing,
  direction,
  rowSpacing,
  spacing,
  wrap,
  sm,
  md,
  lg,
  justifyContent,
  alignItems,
  children,
  style,
  ...props
}) => {
  let count = 0;
  return (
    <>
      <div
        className={["maze-grid"].join(" ")}
        style={{
          flex: lg,
          gap:
            spacing !== 0 && !columnSpacing && !rowSpacing
              ? `${(spacing / 2) * 10}px ${spacing * 10}px`
              : `${(rowSpacing / 2) * 10}px ${columnSpacing * 10}px`,
          flexDirection: direction,
          flexWrap: wrap,
          justifyContent: justifyContent,
          alignItems: alignItems,
          ...style,
        }}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (child.type === Grid) {
            count += child.props.lg;
            console.log(count);
            if (count > columns) {
              count = child.props.lg;
              return [
                <hr
                  className="maze-grid-divider"
                  style={{ display: wrap === "nowrap" && "none" }}
                />,
                child,
              ];
            }
          }
          return child;
        })}
      </div>
    </>
  );
};

Grid.propTypes = {
  /**
   * The number of columns.
   */
  columns: PropTypes.number,
  /**
   * Defines the horizontal space between the type item components.
   */
  columnSpacing: PropTypes.number,
  /**
   * Defines the flex-direction style property. It is applied for all screen sizes.
   */
  direction: PropTypes.string,
  /**
   * Defines the vertical space between the type item components.
   */
  rowSpacing: PropTypes.number,
  /**
   * Defines the space between the type item components.
   */
  spacing: PropTypes.number,
  /**
   * Defines the flex-wrap style property. It's applied for all screen sizes.
   */
  wrap: PropTypes.oneOf(["nowrap", "wrap-reverse", "wrap"]),
  sm: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["auto"]),
    PropTypes.bool,
  ]),
  md: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["auto"]),
    PropTypes.bool,
  ]),
  lg: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["auto"]),
    PropTypes.bool,
  ]),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  style: PropTypes.object,
};

Grid.defaultProps = {
  columns: 12,
  direction: "row",
  lg: false,
  md: false,
  sm: false,
  spacing: 0,
  // rowSpacing: 0,
  // columnSpacing: 0,
  wrap: "wrap",
};
