import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import * as saturation from "../../../../../util/helpers/saturation.js";
import styles from "./Saturation.module.scss";
import { HSL, HSV } from "../../typed-color";
import { useDrag } from "../../../../../util/hooks/useDrag";

export interface SaturationProps {
  hsl: HSL;
  hsv: HSV;
  onChange: (
    change: object | null
    // e: MouseEvent | TouchEvent | React.TouchEvent | React.MouseEvent
  ) => void;
}

const Saturation: FunctionComponent<
  SaturationProps & React.HTMLAttributes<HTMLDivElement>
> = ({ hsl, hsv, onChange }: SaturationProps) => {
  const saturationRef = useRef<HTMLDivElement>(null);
  const { handleDragStart, change } = useDrag(
    saturation.calculateChange(hsl, saturationRef.current)
  );

  useEffect(() => {
    if (Object.keys(change).length != 0)
      typeof onChange === "function" && onChange(change);
  }, [change]);

  return (
    <div
      className={styles.color}
      style={{ background: `hsl(${hsl.h},100%, 50%)` }}
      ref={saturationRef}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <div className={[styles.white, styles["white-saturation"]].join(" ")}>
        <div className={[styles.black, styles["black-saturation"]].join(" ")} />
        <div
          className={styles.pointer}
          style={{ top: `${-(hsv.v * 100) + 100}%`, left: `${hsv.s * 100}%` }}
        >
          <div className={styles.circle} />
        </div>
      </div>
    </div>
  );
};

Saturation.defaultProps = {};

export default Saturation;
