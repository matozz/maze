import React from "react";
import "./ImageList.scss";
import { ImageItem } from "../ImageItem";

export interface ImageListProps {
  /**
   * The animation when hover on the image.
   */
  animated?: boolean;
  /**
   * The number of columns.
   */
  columns?: number;
  /**
   * The height of one row in px.
   */
  rowHeight?: number | "auto";
  /**
   * Defines the space between the type items in px.
   */
  spacing?: number;
  width?: string | number;
  height?: string | number;
  /**
   * The variant to use.
   */
  variant?: "masonry" | "quilted" | "standard" | "woven";
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  style?: React.CSSProperties;
}

export const ImageList: React.FunctionComponent<ImageListProps> = ({
  animated,
  columns,
  spacing,
  rowHeight,
  variant,
  width,
  height,
  children,
  style,
  ...props
}: ImageListProps) => {
  return (
    <>
      <div
        className={["maze-imagelist"].join(" ")}
        style={{
          ...style,
          width: width,
          height: height,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${spacing}px`,
        }}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <ImageItem
                key={child.props.src}
                rowHeight={rowHeight}
                animated={animated}
              >
                {child}
              </ImageItem>
            );
          }
        })}
      </div>
    </>
  );
};

ImageList.defaultProps = {
  animated: true,
  columns: 3,
  spacing: 4,
  variant: "standard",
};
