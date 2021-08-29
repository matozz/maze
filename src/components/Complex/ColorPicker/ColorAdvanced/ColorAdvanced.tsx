import { toState } from "../../../../util/helpers/color.js";
import React, { FunctionComponent, useState } from "react";
import { ColorPalette, ColorPaletteProps } from "../ColorPalette";
import ColorSlider from "../common/Slider";
import Checkboard from "../common/Checkboard";

import styles from "./ColorAdvanced.module.scss";

export interface ColorAdvancedProps {
  onColorSelect?: any;
  colors?: Array<string>;
  palette?: ColorPaletteProps;
}

export const ColorAdvanced: FunctionComponent<
  ColorAdvancedProps & React.HTMLAttributes<HTMLDivElement>
> = ({ onColorSelect, colors, palette, ...props }: ColorAdvancedProps) => {
  const [colorState, setColorState] = useState({
    hsl: { h: 0, s: 1, l: 0.5, a: 1 },
    rgb: { r: 255, g: 0, b: 0, a: 1 },
  });

  const onColorChange = (change: any) => {
    setColorState(toState({ hsl: change.hsl }, change.source));
  };

  const handleColorSelect = (target: string) => {
    setColorState(toState({ hex: target }, "hex"));
  };

  return (
    <>
      <div className={styles.saturation}>
        {/* <Saturation
          className={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
        /> */}
      </div>
      <div className={[styles.controls, "flexbox-fix"].join(" ")}>
        <div className={styles.sliders}>
          <div className={styles.hue}>
            <ColorSlider
              mode={"hue"}
              size={"small"}
              hsl={colorState.hsl}
              direction={"horizontal"}
              onChange={onColorChange}
            />
          </div>
          <div className={styles.alpha}>
            <ColorSlider
              mode={"alpha"}
              size={"small"}
              hsl={colorState.hsl}
              direction={"horizontal"}
              onChange={onColorChange}
            />
          </div>
        </div>
        <div className={styles.color}>
          <Checkboard />
          <div
            className={styles.activeColor}
            style={{
              backgroundColor: `rgba(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b}, ${colorState.rgb.a})`,
            }}
          />
        </div>
      </div>
      {/* <SketchFields
        rgb={rgb}
        hsl={hsl}
        hex={hex}
        onChange={onChange}
        disableAlpha={disableAlpha}
      /> */}
      <div style={{ overflow: "hidden", paddingTop: 8 }}>
        <ColorPalette
          variant={"rounded"}
          size={"medium"}
          colors={colors}
          onColorSelect={handleColorSelect}
          {...palette}
        />
      </div>
    </>
  );
};

ColorAdvanced.defaultProps = {};
