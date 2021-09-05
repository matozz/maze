import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { calculateOffset } from "../../../util/helpers/tooltip";
import styles from "./Tooltip.module.scss";

export interface TooltipProps {
  children?: React.ReactNode;
  /**
   * the position of the tooltip
   */
  position?: "top" | "bottom" | "left" | "right";
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title?: string | React.ReactNode;
  /**
   * If true, the component is shown.
   */
  open?: boolean;
  /**
   * If true, adds an arrow to the tooltip.
   */
  arrow?: boolean;
  /**
   * Styles applied to the container.
   */
  containerStyle?: React.CSSProperties;
  /**
   * Styles applied to the arrow.
   */
  arrowStyle?: React.CSSProperties;
}

interface PortalProps {
  title?: string | React.ReactNode;
  containerStyle?: React.CSSProperties;
  arrowStyle?: React.CSSProperties;
  anchor: {
    x: number;
    y: number;
    arrowX: number;
    arrowY: number;
  };
}

export const Tooltip: React.FunctionComponent<TooltipProps> = ({
  arrow,
  open,
  title,
  position,
  containerStyle,
  arrowStyle,
  children,
}: TooltipProps) => {
  const [anchor, setAnchor] = useState({ x: 0, y: 0, arrowX: 0, arrowY: 0 });
  const [isOpen, setIsOpen] = useState(open);
  const [isVisible, setIsVisible] = useState(open);
  const portalRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const childElement = React.Children.only(children);

  useEffect(() => {
    if (isOpen && childrenRef.current && portalRef.current) {
      const { offsetX, offsetY, offsetArrowX, offsetArrowY } = calculateOffset(
        position,
        childrenRef.current,
        portalRef.current
      );
      setAnchor({
        x: offsetX,
        y: offsetY,
        arrowX: offsetArrowX,
        arrowY: offsetArrowY,
      });
      setIsVisible(true);
    }
  }, [isOpen]);

  const handlePopupOpen = () => {
    setIsOpen(true);
  };

  const handlePopupClose = () => {
    if (open) return;
    setIsVisible(false);
    setIsOpen(false);
  };

  const Portal = forwardRef(
    (
      { title, anchor, containerStyle, arrowStyle }: PortalProps,
      ref: React.Ref<HTMLDivElement>
    ) => {
      const Container = () => (
        <div
          className={styles.popup}
          style={{
            transform: `translate(${anchor.x}px,${anchor.y}px`,
            visibility: isVisible ? "visible" : "hidden",
          }}
          ref={ref}
        >
          <div
            className={`${styles.tooltip} ${styles["tooltip-" + position]}`}
            style={containerStyle}
          >
            {title}
            {arrow && (
              <span
                className={`${styles.arrow} ${styles["arrow-" + position]}`}
                style={{
                  transform: `translate(${anchor.arrowX}px,${anchor.arrowY}px`,
                  ...arrowStyle,
                }}
              ></span>
            )}
          </div>
        </div>
      );
      return ReactDOM.createPortal(<Container />, document.body);
    }
  );

  Portal.displayName = "Portal";

  return (
    <>
      {React.isValidElement(childElement) &&
        React.cloneElement(childElement, {
          ref: (el: HTMLDivElement) => (childrenRef.current = el),
          onMouseOver: handlePopupOpen,
          onMouseOut: handlePopupClose,
        })}
      {isOpen && (
        <Portal
          title={title}
          ref={portalRef}
          anchor={anchor}
          containerStyle={containerStyle}
          arrowStyle={arrowStyle}
        />
      )}
    </>
  );
};
