import React from "react";
import styles from "./DialogTitle.module.scss";

interface DialogTitleProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  dragFor?: string;
}

export const DialogTitle = ({ children, dragFor }: DialogTitleProps) => {
  return (
    <h2
      className={`maze-dialog-title ${styles.title}`}
      id={dragFor}
      style={{ cursor: dragFor ? "move" : "auto" }}
    >
      {children}
    </h2>
  );
};
