import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Loader.scss";

const _popup = document.createElement("div");

export interface LoaderProps {
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

export const Loader: React.FunctionComponent<LoaderProps> = ({
  active,
  handleMaskClose,
  clickToClose,
  children,
  ...props
}: LoaderProps) => {
  _popup.classList.add("maze-loader");
  useEffect(() => {
    document.body.appendChild(_popup);
  }, []);

  useEffect(() => {
    if (!active) {
      handleCloseLoading();
    } else {
      _popup.classList.remove("maze-loader--inactive");
      _popup.classList.add("maze-loader--active");
    }
  }, [active]);

  const handleCloseLoading = () => {
    handleMaskClose && handleMaskClose("closed");
    _popup.classList.remove("maze-loader--active");
    const timer = setTimeout(() => {
      _popup.classList.add("maze-loader--inactive");
      clearTimeout(timer);
    }, 400);
  };

  const Container = () => (
    <>
      <div
        className={"maze-loader-mask"}
        onClick={clickToClose && handleCloseLoading}
      />
      {children ? (
        children
      ) : (
        <progress className={"maze-loader-circular"} {...props} />
      )}
    </>
  );

  return ReactDOM.createPortal(<Container />, _popup);
};

Loader.defaultProps = {
  active: false,
  clickToClose: true,
};
