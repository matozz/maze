import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Progress.scss";

const _popup = document.createElement("div");

export interface ProgressProps {
  /**
   * Control the popup open state.
   */
  active?: boolean;
  /**
   * The content of the component. Your own spinner
   */
  children?: React.ReactNode;
  clickToClose?: boolean;
  handleMaskClose?: (status: string) => void;
}

/**
 * @type React.ForwardRefRenderFunction<HTMLProgressElement, ProgressPropTypes>
 */
export const Progress: React.FunctionComponent<ProgressProps> = ({
  active,
  handleMaskClose,
  clickToClose,
  children,
  ...props
}: ProgressProps) => {
  _popup.classList.add("maze-progress");
  useEffect(() => {
    document.body.appendChild(_popup);
  }, []);

  useEffect(() => {
    if (!active) {
      handleCloseLoading();
    } else {
      _popup.classList.remove("maze-progress--inactive");
      _popup.classList.add("maze-progress--active");
    }
  }, [active]);

  const handleCloseLoading = () => {
    handleMaskClose && handleMaskClose("closed");
    _popup.classList.remove("maze-progress--active");
    const timer = setTimeout(() => {
      _popup.classList.add("maze-progress--inactive");
      clearTimeout(timer);
    }, 400);
  };

  const Container = () => (
    <>
      <div
        className={"maze-progress-mask"}
        onClick={clickToClose && handleCloseLoading}
      />
      {children ? (
        children
      ) : (
        <progress className={"maze-progress-circular"} {...props} />
      )}
    </>
  );

  return ReactDOM.createPortal(<Container />, _popup);
};

Progress.defaultProps = {
  active: false,
  clickToClose: true,
};
