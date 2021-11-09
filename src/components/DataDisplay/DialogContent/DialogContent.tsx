import React from "react";
import styles from "./DialogContent.module.scss";

interface DialogContentProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

export const DialogContent = ({ children }: DialogContentProps) => {
  return (
    <div className={`maze-dialog-content ${styles.content}`}>{children}</div>
  );
};
