import React, { FunctionComponent, useState } from "react";
import styles from "./ColorPalette.module.scss";

export interface ColorPaletteProps {
  onColorSelect?: any;
  colors?: Array<string>;
  variant: "rounded" | "circular" | "square";
  size: "small" | "medium" | "large";
  compact?: boolean;
  hoverEffect?: "scale" | "shadow";
}

export const ColorPalette: FunctionComponent<
  ColorPaletteProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  onColorSelect,
  colors,
  size,
  variant,
  compact,
  hoverEffect,
  ...props
}: ColorPaletteProps) => {
  const handleSelectColor = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }
    if (e.target.id === "block") onColorSelect(e.target.dataset.color);
  };

  return (
    <div
      className={compact ? styles["palette-compact"] : styles.palette}
      onClick={handleSelectColor}
    >
      {React.Children.map(colors, (color, index) => (
        <div
          id={"block"}
          data-color={color}
          className={[
            compact && styles["block-compact"],
            hoverEffect == "shadow" && styles["block-shadow"],
            styles.block,
            styles[`block-${size}`],
            styles[`block-${variant}`],
          ].join(" ")}
          title={color}
          style={{ background: color, color: color }}
        />
      ))}
      <div style={{ flex: 1 }} />
    </div>
  );
};

ColorPalette.defaultProps = {
  size: "medium",
  variant: "rounded",
};
