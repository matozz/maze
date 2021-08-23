import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import "./progress.css";

const _popup = document.createElement("div");

/**
 * @type React.ForwardRefRenderFunction<HTMLProgressElement, ProgressPropTypes>
 */
export const Progress = ({
  active,
  handleMaskClick,
  clickToClose,
  children,
  ...props
}) => {
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
    handleMaskClick && handleMaskClick(false);
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

const ProgressPropTypes = {
  /**
   * Control the popup open state.
   */
  active: PropTypes.bool,
  /**
   * The content of the component. Your own spinner
   */
  children: PropTypes.node,
  clickToClose: PropTypes.bool,
};

Progress.propTypes = ProgressPropTypes;

Progress.defaultProps = {
  active: false,
  clickToClose: true,
};
