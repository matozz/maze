import React from "react";
import styles from "./DialogActions.module.scss";

interface DialogActionsProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

export const DialogActions = ({ children, ...props }: DialogActionsProps) => {
  return (
    <div className={`maze-dialog-actions ${styles.actions}`} {...props}>
      {children}
    </div>
  );
};
