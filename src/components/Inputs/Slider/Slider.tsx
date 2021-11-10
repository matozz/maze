/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.scss";
import { useDrag } from "../../../util/hooks/useDrag";
import * as slider from "../../../util/helpers/slider";

export interface SliderProps {
  color?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  width?: string | number;
  sliderStyle?: React.CSSProperties;
  thumbStyle?: React.CSSProperties;
  railStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties;
  value?: number;
  size?: "small" | "medium" | "large";
  // orientation?: "vertical" | "horizontal";
  marks?: boolean;
  onChange?: (value: number) => void;
}

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  width,
  color,
  value,
  marks,
  disabled,
  onChange,
  sliderStyle,
  thumbStyle,
  trackStyle,
  railStyle,
  size = "medium",
}: SliderProps) => {
  const sliderRef = useRef(null);
  const { handleDragStart, change } = useDrag(
    slider.calculateChange(sliderRef.current, step)
  );
  const [sliderValue, setSliderValue] = useState(value);
  const itemNumber = Array.from(Array(Math.floor((max - min) / step)));

  useEffect(() => {
    if (Object.keys(change).length != 0) {
      setSliderValue(change.value);
      onChange && onChange(change.value);
    }
  }, [change.value]);

  return (
    <>
      <span
        className={`${styles.root} ${disabled ? styles["root-disabled"] : ""} ${
          styles[`root-${size}`]
        }`}
        ref={sliderRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{ width: width, color: color, ...sliderStyle }}
      >
        <span className={styles.rail} style={railStyle}></span>
        <span
          className={styles.track}
          style={{ width: `${sliderValue}%`, ...trackStyle }}
        ></span>
        {marks &&
          step &&
          itemNumber.map((e, i) => {
            return (
              <div
                key={i}
                data-index={i}
                className={styles.mark}
                style={{
                  left: `${step * i}%`,
                  backgroundColor:
                    value && value > step * i ? "white" : "currentcolor",
                }}
              />
            );
          })}
        <span
          className={styles.thumb}
          style={{ left: `${sliderValue}%`, ...thumbStyle }}
        >
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={sliderValue}
            onChange={() => {}}
          />
        </span>
      </span>
    </>
  );
};

Slider.defaultProps = {
  width: 160,
  value: 0,
  onChange: () => {},
};
