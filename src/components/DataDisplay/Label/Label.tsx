import React from "react";
import styles from "./Label.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Label = ({ children }: Props) => {
  return <div className={styles.label}>{children}</div>;
};
