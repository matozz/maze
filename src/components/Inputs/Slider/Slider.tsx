/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.scss";
import { useDrag } from "../../../util/hooks";
import * as slider from "../../../util/helpers/slider";
import { useMergedThemeProps } from "../../../styles";
import { Tooltip } from "../../../components/DataDisplay/Tooltip";

type Theme<T> = {
  light?: T;
  dark?: T;
};

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
  markStyle?: Theme<React.CSSProperties>;
  labelPosition?: "top" | "bottom" | "left" | "right";
  defaultValue?: number;
  value?: number;
  label?: boolean | string;
  size?: "small" | "medium" | "large";
  // orientation?: "vertical" | "horizontal";
  marks?: boolean;
  onChange?: (value: number) => void;
}

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  width,
  onChange,
  size = "medium",
  ...oldProps
}: SliderProps) => {
  const sliderRef = useRef(null);

  const {
    color,
    value,
    marks,
    label,
    disabled,
    sliderStyle,
    thumbStyle,
    trackStyle,
    railStyle,
    labelPosition = "top",
    markStyle = {
      light: { backgroundColor: "white" },
      dark: { backgroundColor: "rgb(18, 18, 18)" },
    },
    theme,
    ...props
  } = useMergedThemeProps({
    name: "Slider",
    oldProps: oldProps,
    defaultProps: { color: "#1976d2" },
  });

  const { handleDragStart, change, isDrag } = useDrag(
    slider.calculateChange(sliderRef.current, step, min, max)
  );
  const [sliderValue, setSliderValue] = useState(
    defaultValue < min || defaultValue > max ? 0 : defaultValue - min || value
  );
  const itemNumber = Array.from(Array(Math.floor((max - min) / step)));

  useEffect(() => {
    if ((max - min) % step !== 0) {
      console.error(
        "Step must be greater than 0 and can be(Max - Min) integer!"
      );
    }
  }, []);

  useEffect(() => {
    if (Object.keys(change).length != 0) {
      setSliderValue(change.value);
      onChange && onChange(change.value + min);
    }
  }, [change.value]);

  return (
    <>
      <span
        className={`${styles.root} ${disabled ? styles["root-disabled"] : ""} ${
          styles[`root-${size}`]
        } ${styles[`root-${theme}`]}`}
        ref={sliderRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{ width: width, color: color, ...sliderStyle }}
      >
        <span className={styles.rail} style={railStyle}></span>
        <span
          className={styles.track}
          style={{
            width: `${(sliderValue / (max - min)) * 100}%`,
            ...trackStyle,
          }}
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
                  left: `${(100 / itemNumber.length) * i}%`,
                  backgroundColor:
                    sliderValue && sliderValue > step * i
                      ? i !== 0
                        ? theme === "dark"
                          ? markStyle.dark.backgroundColor
                          : markStyle.light.backgroundColor
                        : "transparent"
                      : "currentcolor",
                }}
              />
            );
          })}
        {label ? (
          <Tooltip
            title={typeof label === "boolean" ? sliderValue + min : label}
            update={sliderValue}
            position={labelPosition}
            arrow
            open={isDrag}
          >
            <span
              className={styles.thumb}
              style={{
                left: `${(sliderValue / (max - min)) * 100}%`,
                ...thumbStyle,
              }}
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
          </Tooltip>
        ) : (
          <span
            className={styles.thumb}
            style={{
              left: `${(sliderValue / (max - min)) * 100}%`,
              ...thumbStyle,
            }}
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
        )}
      </span>
    </>
  );
};

Slider.defaultProps = {
  width: 160,
  value: 0,
  onChange: () => {},
};
