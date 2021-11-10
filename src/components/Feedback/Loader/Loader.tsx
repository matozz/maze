import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import animatedStyles from "../../../animations/Fade.module.scss";
import "./Loader.scss";

export interface LoaderProps {
  /**
   * Control the popup open state.
   */
  open?: boolean;
  /**
   * onClose callback
   */
  onClose?: () => void;
  /**
   * The content of the component. Your own spinner
   */
  children?: React.ReactNode;
  onClickMask?: () => void;
}

export const Loader: React.FunctionComponent<LoaderProps> = ({
  open,
  onClickMask,
  children,
  onClose,
  ...props
}: LoaderProps) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
    if (isOpen && !open) {
      onClose();
    }
  }, [open]);

  const Container = () => (
    <>
      <div className={"maze-loader"} onClick={onClickMask}>
        {children ? (
          children
        ) : (
          <progress className={"maze-loader-circular"} {...props} />
        )}
      </div>
    </>
  );

  const Portal = () => {
    return <>{ReactDOM.createPortal(<Container />, document.body)}</>;
  };

  Portal.displayName = "Portal";

  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames={animatedStyles}
        unmountOnExit
      >
        <Portal />
      </CSSTransition>
    </>
  );
};

Loader.defaultProps = {
  open: false,
};
