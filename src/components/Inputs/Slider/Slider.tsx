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
  orientation?: "vertical" | "horizontal";
  onChange?: (value: number) => void;
}

export const Slider = ({
  width,
  color,
  value,
  onChange,
  sliderStyle,
  thumbStyle,
  trackStyle,
  railStyle,
}: SliderProps) => {
  const sliderRef = useRef(null);
  const { handleDragStart, change } = useDrag(
    slider.calculateChange(sliderRef.current, 1)
  );
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    if (Object.keys(change).length != 0) {
      setSliderValue(change.value);
      onChange && onChange(change.value);
    }
  }, [change.value]);

  return (
    <>
      <span
        className={styles.root}
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
        <span
          className={styles.thumb}
          style={{ left: `${sliderValue}%`, ...thumbStyle }}
        >
          <input
            type="range"
            min="0"
            max="100"
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
