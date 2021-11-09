import React from "react";
import styles from "./DialogTitle.module.scss";

interface DialogTitleProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

export const DialogTitle = ({ children }: DialogTitleProps) => {
  return <h2 className={`maze-dialog-title ${styles.title}`}>{children}</h2>;
};
