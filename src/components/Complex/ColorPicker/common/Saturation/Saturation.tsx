import React, { FunctionComponent, useRef, useState } from "react";
import * as saturation from "../../../../../util/helpers/saturation.js";
import styles from "./Saturation.module.scss";
import { HSL, HSV } from "../../typed-color";

export interface SaturationProps {
  hsl: HSL;
  hsv: HSV;
  onChange?: (
    change: object | null,
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void;
}

const Saturation: FunctionComponent<
  SaturationProps & React.HTMLAttributes<HTMLDivElement>
> = ({ hsl, hsv, onChange }: SaturationProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const saturationRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    mousedown?: boolean
  ) => {
    setIsMouseDown(mousedown != false ? true : false);
    const change = saturation.calculateChange(e, hsl, saturationRef.current);
    change && typeof onChange === "function" && onChange(change, e);
  };
  return (
    <div
      className={styles.color}
      style={{ background: `hsl(${hsl.h},100%, 50%)` }}
      ref={saturationRef}
      onMouseDown={(e) => !isMouseDown && handleChange(e, true)}
      onMouseUp={(e) => handleChange(e, false)}
      onMouseLeave={(e) => isMouseDown && handleChange(e, false)}
      onMouseMove={isMouseDown ? handleChange : undefined}
      onTouchMove={handleChange}
      onTouchStart={handleChange}
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
