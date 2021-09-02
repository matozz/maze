import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from "./Slider.module.scss";
import * as hue from "../../../../../util/helpers/hue.js";
import * as alp from "../../../../../util/helpers/alpha.js";
import Checkboard from "../Checkboard/Checkboard";
import { useDrag } from "../../../../../util/hooks/useDrag";
import { HSL } from "../../typed-color";

export interface ColorSliderProps {
  onColorSelect?: any;
  colors?: string | number;
  mode: "hue" | "alpha";
  size: "small" | "medium" | "large";
  hsl: HSL;
  direction: "vertical" | "horizontal";
  onChange?: (change: object | null) => void;
}

const ColorSlider: FunctionComponent<
  ColorSliderProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  onColorSelect,
  colors,
  size,
  mode,
  hsl,
  direction,
  onChange,
  ...props
}: ColorSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const { handleDragStart, change } = useDrag(
    mode === "hue"
      ? hue.calculateChange(direction, hsl, sliderRef.current)
      : alp.calculateChange(direction, hsl, hsl.a, sliderRef.current)
  );

  useEffect(() => {
    console.log(change);
    if (Object.keys(change).length != 0) {
      change && typeof onChange === "function" && onChange(change);
    }
  }, [change]);

  return (
    <>
      <div className={styles.wrapper}>
        {mode === "alpha" && <Checkboard />}

        <div
          className={styles[`${mode}-${direction}`]}
          style={{
            background:
              mode === "alpha"
                ? `linear-gradient(to right, hsla(${hsl.h},${hsl.s * 100}%,${
                    hsl.l * 100
                  }%, 0) 0%,
           hsla(${hsl.h},${hsl.s * 100}%,${hsl.l * 100}%, 1) 100%)`
                : "",
          }}
        >
          <div
            className={[styles.container].join(" ")}
            ref={sliderRef}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            {mode === "hue" ? (
              <div
                className={styles.pointer}
                style={{ left: `${(hsl.h * 100) / 359.9}%` }}
              >
                <div className={styles.slider} />
              </div>
            ) : (
              <div
                className={styles.pointer}
                style={{ left: `${hsl.a * 100}%` }}
              >
                <div className={styles.slider} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

ColorSlider.defaultProps = {
  direction: "horizontal",
};

export default ColorSlider;
