import React from "react";
import { useMergedThemeProps } from "../../../styles";
import styles from "./DialogTitle.module.scss";

interface DialogTitleProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  dragFor?: string;
}

export const DialogTitle = ({
  children,
  dragFor,
  ...oldProps
}: DialogTitleProps) => {
  const { color, theme, ...props } = useMergedThemeProps({
    name: "DialogTitle",
    oldProps: oldProps,
  });
  return (
    <h2
      className={`maze-dialog-title ${styles.title}`}
      id={dragFor}
      style={{ cursor: dragFor ? "move" : "auto", color: color }}
    >
      {children}
    </h2>
  );
};
