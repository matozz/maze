import React from "react";
import styles from "./Label.module.scss";

interface LabelProps {
  children: React.ReactNode;
}

export const Label: React.FunctionComponent<LabelProps> = ({
  children,
}: LabelProps) => {
  return <div className={styles.label}>{children}</div>;
};
