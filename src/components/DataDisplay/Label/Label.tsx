import React from "react";
import { useMergedThemeProps } from "../../../styles";
import styles from "./Label.module.scss";

interface LabelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Label: React.FunctionComponent<LabelProps> = ({
  children,
  ...oldProps
}: LabelProps) => {
  const { theme, ...props } = useMergedThemeProps({
    name: "Label",
    oldProps: oldProps,
  });

  if (props?.style) {
    props.style.color = theme === "dark" ? "#eaeef3" : "#20262d" ?? "#eaeef3";
  } else {
    props.style = {
      color: theme === "dark" ? "#eaeef3" : "#20262d" ?? "#eaeef3",
    };
  }

  return (
    <div className={styles.label} {...props}>
      {children}
    </div>
  );
};
