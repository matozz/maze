import React from "react";
import styles from "./Grid.module.scss";

export interface GridProps {
  /**
   * The number of columns.
   */
  columns?: number;
  /**
   * Defines the horizontal space between the type item components.
   */
  columnSpacing?: number;
  /**
   * Defines the flex-direction style property. It is applied for all screen sizes.
   */
  direction?: React.CSSProperties["flexDirection"];
  /**
   * Defines the vertical space between the type item components.
   */
  rowSpacing?: number;
  /**
   * Defines the space between the type item components.
   */
  spacing?: number;
  /**
   * Defines the flex-wrap style property. It's applied for all screen sizes.
   */
  wrap?: "nowrap" | "wrap-reverse" | "wrap";
  sm?: number | "auto";
  md?: number | "auto";
  lg?: number | "auto";
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  style?: React.CSSProperties;
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
}

export const Grid: React.FunctionComponent<GridProps> = ({
  columns = 12,
  columnSpacing,
  direction = "row",
  rowSpacing,
  spacing,
  wrap = "wrap",
  sm,
  md,
  lg,
  justifyContent,
  alignItems,
  children,
  style,
  ...props
}: GridProps) => {
  let count = 0;
  const gapSpacing = spacing
    ? `${(spacing / 2) * 10}px ${spacing * 10}px`
    : (columnSpacing || rowSpacing) &&
      `${(rowSpacing ? rowSpacing : 0 / 2) * 10}px ${
        (columnSpacing ? columnSpacing : 0 / 2) * 10
      }px`;
  return (
    <>
      <div
        className={styles.grid}
        style={{
          flex: lg,
          gap: gapSpacing,
          flexDirection: direction,
          flexWrap: wrap,
          justifyContent: justifyContent,
          alignItems: alignItems,
          ...style,
        }}
        {...props}
      >
        {React.Children.map(children, (child: any, index) => {
          if (child) {
            if (child.type === Grid) {
              count += child.props.lg;
              if (count > columns) {
                count = child.props.lg;
                return [
                  <hr
                    key={index}
                    className={styles.divider}
                    style={{ display: wrap === "nowrap" ? "none" : "block" }}
                  />,
                  child,
                ];
              }
            }
          }
          return child;
        })}
      </div>
    </>
  );
};

Grid.defaultProps = {
  columns: 12,
  direction: "row",
  // lg: false,
  // md: false,
  // sm: false,
  spacing: 0,
  // rowSpacing: 0,
  // columnSpacing: 0,
  wrap: "wrap",
};
