import React, { FunctionComponent } from "react";
import styles from "./Checkboard.module.scss";

const Checkboard: FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = () => {
  return <div className={styles.checkboard} />;
};

export default Checkboard;
