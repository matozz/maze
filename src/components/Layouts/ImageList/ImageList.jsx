import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./imageList.css";

const ImageItem = ({ animated, rowHeight, children }) => {
  const [rotate, setRotate] = useState({ rotateX: 0, rotateY: 0 });
  const [scale, setScale] = useState(1);
  const [exiting, setExiting] = useState(false);
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (exiting) return;
    const cardWidth = itemRef.current.offsetWidth;
    const cardHeight = itemRef.current.offsetHeight;
    const rect = itemRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - cardWidth / 2;
    const mouseY = e.clientY - rect.top - cardHeight / 2;
    const rotateX = ((25 * mouseY) / (cardHeight / 2)).toFixed(2);
    const rotateY = (-(25 * mouseX) / (cardWidth / 2)).toFixed(2);
    setRotate({ rotateX, rotateY });
    setScale(0.92);
  };

  const handleMouseLeave = () => {
    setExiting(true);
    setRotate({ rotateX: 0, rotateY: 0 });
    setScale(1);
    const timer = setTimeout(() => {
      setExiting(false);
      clearTimeout(timer);
    }, 300);
  };

  return (
    <div
      className="maze-imageitem"
      style={{
        height: rowHeight,
        transform: `perspective(1000px) rotateX(${rotate.rotateX}deg) rotateY(${rotate.rotateY}deg) scale(${scale})`,
      }}
      onMouseMove={animated ? handleMouseMove : null}
      onMouseLeave={animated ? handleMouseLeave : null}
      ref={itemRef}
    >
      {children}
    </div>
  );
};

/**
 * @type React.ForwardRefRenderFunction<HTMLDivElement, ImageListPropTypes>
 */
export const ImageList = ({
  animated,
  columns,
  spacing,
  rowHeight,
  variant,
  sx,
  children,
  style,
  ...props
}) => {
  return (
    <>
      <div
        className={["maze-imagelist"].join(" ")}
        style={{
          ...style,
          width: sx && sx.width,
          height: sx && sx.height,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${spacing}px`,
        }}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          return (
            <ImageItem
              key={child.props.src}
              rowHeight={rowHeight}
              animated={animated}
            >
              {child}
            </ImageItem>
          );
        })}
      </div>
    </>
  );
};

const ImageListPropTypes = {
  /**
   * The animation when hover on the image.
   */
  animated: PropTypes.bool,
  /**
   * The number of columns.
   */
  columns: PropTypes.number,
  /**
   * The height of one row in px.
   */
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(["auto"])]),
  /**
   * Defines the space between the type items in px.
   */
  spacing: PropTypes.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(["masonry", "quilted", "standard", "woven"]),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  style: PropTypes.object,
};

ImageList.propTypes = ImageListPropTypes;

ImageList.defaultProps = {
  animated: true,
  columns: 3,
  spacing: 4,
  variant: "standard",
};
