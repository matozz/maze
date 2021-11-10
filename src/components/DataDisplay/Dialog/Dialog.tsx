import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./Dialog.module.scss";
import animatedStyles from "../../../animations/Fade.module.scss";
import { useKeypress } from "../../../util/hooks/useKeyPress";

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
   * Determine the min-width of the dialog.
   */
  width?: string;
  /**
   * Determine the max-width of the dialog.
   */
  maxWidth?: string;
  fullWidth?: boolean;
  fullScreen?: boolean;
  exitOnEsc?: boolean;
}

interface PortalProps {
  containerStyle?: React.CSSProperties;
}

export const Dialog: React.FunctionComponent<DialogProps> = ({
  open,
  containerStyle,
  children,
  width,
  maxWidth,
  fullWidth,
  fullScreen,
  exitOnEsc,
  onClose,
  onBackdropClick,
}: DialogProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const portalRef = useRef<HTMLDivElement>(null);

  if (exitOnEsc) {
    useKeypress("Escape", isOpen, () => {
      onClose();
      setIsOpen(false);
    });
  }

  useEffect(() => {
    setIsOpen(open);
    if (isOpen && !open) {
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
    ({ containerStyle }: PortalProps, ref: React.Ref<HTMLDivElement>) => {
      return (
        <>
          {ReactDOM.createPortal(
            <div className={styles.mask} onClick={onBackdropClick}>
              <div
                className={[
                  styles.modal,
                  fullScreen ? styles.fullScreen : "",
                ].join(" ")}
                style={{
                  ...containerStyle,
                  maxWidth: fullWidth ? "unset" : maxWidth,
                  width: width,
                }}
                onClick={(e) => {
                  e.persist();
                  e.nativeEvent.stopImmediatePropagation();
                  e.stopPropagation();
                }}
                role="dialog"
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
        unmountOnExit
      >
        <Portal ref={portalRef} containerStyle={containerStyle} />
      </CSSTransition>
    </>
  );
};
