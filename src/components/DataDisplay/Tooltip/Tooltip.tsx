import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { calculateOffset } from "../../../util/helpers/tooltip";
import { CSSTransition } from "react-transition-group";
import styles from "./Tooltip.module.scss";
import animatedStyles from "../../../animations/Fade.module.scss";

export interface TooltipProps {
  children?: React.ReactNode;
  /**
   * the position of the tooltip
   */
  position?: "top" | "bottom" | "left" | "right";
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: string | React.ReactNode;
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
  update?: string | number;
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
  update,
  position = "bottom",
  containerStyle,
  arrowStyle,
  children,
}: TooltipProps) => {
  const [anchor, setAnchor] = useState({ x: 0, y: 0, arrowX: 0, arrowY: 0 });
  const [isOpen, setIsOpen] = useState(open);
  const [resize, setResize] = useState(null);
  const [exiting, setExiting] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const childElement = React.Children.only(children);

  useEffect(() => {
    if (exiting) return;
    setIsOpen(open);
  }, [open, exiting]);

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
    }
  }, [isOpen, update, resize]);

  useEffect(() => {
    const handleResize = () => setResize(Symbol("Resize"));
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePopupOpen = () => {
    setIsOpen(true);
  };

  const handlePopupClose = () => {
    if (open) return;
    setIsOpen(false);
  };

  const Portal = forwardRef(
    (
      { title, anchor, containerStyle, arrowStyle }: PortalProps,
      ref: React.Ref<HTMLDivElement>
    ) => {
      return (
        <>
          {ReactDOM.createPortal(
            <div
              className={styles.popup}
              style={{
                transform: `translate(${anchor.x}px,${anchor.y}px`,
                // visibility: isVisible ? "visible" : "hidden",
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
            </div>,
            document.body
          )}
        </>
      );
    }
  );

  Portal.displayName = "Portal";

  return (
    <>
      {React.isValidElement(childElement) &&
        React.cloneElement(childElement, {
          ref: (el: HTMLDivElement) => (childrenRef.current = el),
          onMouseOver: handlePopupOpen,
          onMouseLeave: handlePopupClose,
          onTouchStart: handlePopupOpen,
        })}

      <CSSTransition
        in={isOpen}
        timeout={0}
        classNames={animatedStyles}
        unmountOnExit
        onExit={() => setExiting(true)}
        onExited={() => setExiting(false)}
      >
        <Portal
          title={title}
          ref={portalRef}
          anchor={anchor}
          containerStyle={containerStyle}
          arrowStyle={arrowStyle}
        />
      </CSSTransition>
    </>
  );
};
