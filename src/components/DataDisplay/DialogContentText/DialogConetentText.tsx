import React from "react";
import styles from "./DialogContentText.module.scss";

interface DialogContentTextProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

export const DialogContentText = ({
  children,
  ...props
}: DialogContentTextProps) => {
  return (
    <p className={`maze-dialog-content-text ${styles.text}`} {...props}>
      {children}
    </p>
  );
};
