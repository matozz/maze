import React from "react";
import { useMergedThemeProps } from "../../../styles";
import styles from "./DialogContentText.module.scss";

interface DialogContentTextProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

export const DialogContentText = ({
  children,
  ...oldProps
}: DialogContentTextProps) => {
  const { color, theme, ...props } = useMergedThemeProps({
    name: "DialogContentText",
    oldProps: oldProps,
  });
  return (
    <p
      className={`maze-dialog-content-text ${styles.text}`}
      style={{ color: color }}
      {...props}
    >
      {children}
    </p>
  );
};
