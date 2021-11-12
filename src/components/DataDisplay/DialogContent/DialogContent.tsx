import React from "react";
import styles from "./DialogContent.module.scss";

interface DialogContentProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Display the top and bottom dividers.
   */
  dividers?: boolean;
}

export const DialogContent = ({
  children,
  dividers = false,
  ...props
}: DialogContentProps) => {
  return (
    <div
      className={`maze-dialog-content ${
        dividers ? "maze-dialog-dividers" : ""
      } ${styles.content}`}
      {...props}
    >
      {children}
    </div>
  );
};
