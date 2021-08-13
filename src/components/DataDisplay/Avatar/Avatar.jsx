import React, { useState } from "react";
import PropTypes from "prop-types";
import "./avatar.css";
import ErrorIcon from "./ErrorIcon";

const colors = [
  "#ff5722",
  "#2486ff",
  "#673ab7",
  "#fd7e97",
  "#4caf50",
  "#ef1760",
  "#ff9c47",
  "#00b7af",
];

/**
 * Avatars are found throughout material design with uses in everything from tables to dialog menus.
 */

export const Avatar = ({
  variant,
  size,
  src,
  alt,
  children,
  style,
  colorful,
  loadingImg,
  errorImg,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isFlag, setIsFlag] = useState(false);
  const [isError, setIsError] = useState(false);
  const mode =
    variant === "square"
      ? "maze-avatar--square"
      : variant === "rounded"
      ? "maze-avatar--rounded"
      : "maze-avatar--circular";

  const handleOnLoad = () => {
    if (isFlag) return;
    const imgDom = new Image();
    imgDom.src = src;
    imgDom.onload = function () {
      setIsFlag(true);
      setImgSrc(src);
    };
  };

  const handleOnError = () => {
    setIsFlag(true);
    setIsError(true);
  };

  function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

  return (
    <div
      className={[
        "maze-avatar",
        `maze-avatar--${size}`,
        mode,
        isError && "maze-avatar--error",
      ].join(" ")}
      style={{ ...style, backgroundColor: colorful && choose(colors) }}
      {...props}
    >
      {children ? (
        <>
          {typeof children === "string" ? children.substring(0, 2) : children}
        </>
      ) : !isError ? (
        <img
          src={imgSrc}
          alt={alt}
          onLoad={handleOnLoad}
          onError={handleOnError}
        />
      ) : (
        <ErrorIcon />
      )}
    </div>
  );
};

Avatar.propTypes = {
  /**
   * Avatar variants
   */
  variant: PropTypes.oneOf(["square", "rounded", "circular"]),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  colorful: PropTypes.bool,
  /**
   * The src attribute for the img element.
   */
  src: PropTypes.string,
  alt: PropTypes.string,

  loadingImg: PropTypes.string,
  errorImg: PropTypes.string,
  /**
   * Used to render icon or text elements inside the Avatar if src is not set.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Avatar.defaultProps = {
  variant: "circular",
  size: "medium",
  variant: "circular",
  colorful: false,
};
