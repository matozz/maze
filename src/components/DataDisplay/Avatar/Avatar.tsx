import React, { useState } from "react";
import "./Avatar.scss";
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

export interface AvatarProps {
  /**
   * Avatar variants
   */
  variant?: "square" | "rounded" | "circular";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  colorful?: boolean;
  /**
   * The src attribute for the img element.
   */
  src?: string;
  alt?: string;
  loadingImg?: string;
  errorImg?: string;
  style?: React.CSSProperties;
  /**
   * Used to render icon or text elements inside the Avatar if src is not set.
   */
  children?: string | React.ReactNode;
}

const Avatar: React.FunctionComponent<AvatarProps> = ({
  variant,
  size,
  src,
  alt,
  children,
  colorful,
  style,
  // loadingImg,
  errorImg,
  ...props
}: AvatarProps) => {
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

  function choose(choices: string[]) {
    const index = Math.floor(Math.random() * choices.length);
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
          src={errorImg ? errorImg : imgSrc}
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

Avatar.defaultProps = {
  variant: "circular",
  size: "medium",
  colorful: false,
};

export default Avatar;
