import React, { forwardRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./Dialog.module.scss";
import animatedStyles from "../../../animations/Fade.module.scss";
import { useKeyPress } from "../../../util/hooks";
import Draggable, { DraggableProps } from "react-draggable";
import { useMergedThemeProps } from "../../../styles";

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
  draggable?: boolean;
  dragOptions?: Partial<DraggableProps>;
  ref?: React.Ref<HTMLDivElement>;
  backgroundColor?: string;
}

interface PortalProps {
  containerStyle?: React.CSSProperties;
}

const Dialog: React.FunctionComponent<DialogProps> = forwardRef(
  ({ ...oldProps }: DialogProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      open,
      containerStyle,
      children,
      width,
      maxWidth,
      fullWidth,
      fullScreen,
      exitOnEsc,
      backgroundColor,
      draggable,
      dragOptions,
      onClose,
      onBackdropClick,
      theme,
      ...props
    } = useMergedThemeProps({
      name: "Dialog",
      oldProps: oldProps,
    });
    const [isOpen, setIsOpen] = useState(open);

    if (exitOnEsc) {
      useKeyPress("Escape", isOpen, () => {
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

    const Portal = forwardRef((_, ref: React.Ref<HTMLDivElement>) => {
      return (
        <>
          {ReactDOM.createPortal(
            <div className={styles.mask} onClick={onBackdropClick}>
              <Draggable {...dragOptions} disabled={!draggable}>
                <div
                  ref={ref}
                  className={[
                    styles.modal,
                    fullScreen ? styles.fullScreen : "",
                  ].join(" ")}
                  style={{
                    ...containerStyle,
                    maxWidth: fullWidth ? "unset" : maxWidth,
                    width: width,
                    backgroundColor,
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
              </Draggable>
            </div>,
            document.body
          )}
        </>
      );
    });

    Portal.displayName = "Portal";

    return (
      <>
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames={animatedStyles}
          unmountOnExit
        >
          <Portal ref={ref} />
        </CSSTransition>
      </>
    );
  }
);

Dialog.displayName = "Dialog";

export default Dialog;
