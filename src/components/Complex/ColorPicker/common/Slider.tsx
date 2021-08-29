import React, { FunctionComponent, useRef } from "react";
import styles from "./Slider.module.scss";
import * as hue from "../../../../util/helpers/hue.js";
import * as alp from "../../../../util/helpers/alpha.js";
import Checkboard from "./Checkboard";

type HSL = {
  h: number;
  s: number;
  l: number;
  a: number;
};

export interface ColorSliderProps {
  onColorSelect?: any;
  colors?: string | number;
  mode: "hue" | "alpha";
  size: "small" | "medium" | "large";
  hsl: HSL;
  direction: "vertical" | "horizontal";
  onChange?: (
    change: object | null,
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void;
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
  const silderRef = useRef<HTMLDivElement>(null);
  const handleChange = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const change =
      mode === "hue"
        ? hue.calculateChange(e, direction, hsl, silderRef.current)
        : alp.calculateChange(e, direction, hsl, hsl.a, silderRef.current);
    change && typeof onChange === "function" && onChange(change, e);
  };
  // const handleSelectColor = (e: React.SyntheticEvent<EventTarget>) => {
  //   if (!(e.target instanceof HTMLDivElement)) {
  //     return;
  //   }
  //   if (e.target.id === "block") onColorSelect(e.target.dataset.color);
  // };

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
            ref={silderRef}
            onMouseDown={handleChange}
            // onMous={handleChange}

            onTouchMove={handleChange}
            onTouchStart={handleChange}
          >
            {mode === "hue" ? (
              <div
                className={styles.pointer}
                style={{ left: `${(hsl.h * 100) / 360}%` }}
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
