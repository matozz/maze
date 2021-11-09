import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./Dialog.module.scss";
import animatedStyles from "./Animated.module.scss";

export interface DialogProps {
  children?: React.ReactNode;
  /**
   * If true, the dialog is shown.
   */
  open?: boolean;
  /**
   * Styles applied to the container.
   */
  containerStyle?: React.CSSProperties;
  /**
   * onClose callback
   */
  onClose?: () => void;
  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick?: () => void;
  /**
   * Determine the max-width of the dialog.
   */
  maxWidth?: string;
}

interface PortalProps {
  containerStyle?: React.CSSProperties;
  maxWidth?: string;
}

export const Dialog: React.FunctionComponent<DialogProps> = ({
  open,
  containerStyle,
  children,
  maxWidth,
  onClose,
  onBackdropClick,
}: DialogProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(open);
    if (!open) {
      onClose();
    }
  }, [open]);

  // const handlePopupOpen = () => {
  //   setIsOpen(true);
  // };

  // const handlePopupClose = () => {
  //   if (open) {
  //     setIsOpen(false);
  //   }
  // };

  const Portal = forwardRef(
    (
      { containerStyle, maxWidth }: PortalProps,
      ref: React.Ref<HTMLDivElement>
    ) => {
      return (
        <>
          {ReactDOM.createPortal(
            <div className={styles.mask} onClick={onBackdropClick}>
              <div
                className={styles.modal}
                style={{ ...containerStyle, maxWidth: maxWidth }}
                onClick={(e) => {
                  e.persist();
                  e.nativeEvent.stopImmediatePropagation();
                  e.stopPropagation();
                }}
              >
                {children}
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
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames={animatedStyles}
        maxWidth={maxWidth}
        unmountOnExit
      >
        <Portal ref={portalRef} containerStyle={containerStyle} />
      </CSSTransition>
    </>
  );
};
