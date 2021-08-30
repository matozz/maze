import { toState } from "../../../../util/helpers/color.js";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ColorPalette, ColorPaletteProps } from "../ColorPalette";
import ColorSlider from "../common/Slider/Slider";
import Checkboard from "../common/Checkboard/Checkboard";
import Saturation from "../common/Saturation/Saturation";

import styles from "./ColorAdvanced.module.scss";
import { HSL, HSV, RGB } from "../typed-color.js";
import { isValidHex, toHex } from "../../../../util/helpers/color.js";
import { debounce } from "../../../../util/func/lodash.js";

export interface AdvancedOptions {
  palette?: boolean;
  input?: boolean;
  slider?: boolean;
}
export interface ColorAdvancedProps extends AdvancedOptions {
  onColorChange?: Function;
  colors?: Array<string>;
  paletteStyle?: ColorPaletteProps;
}

export interface ColorFieldsProps {
  rgb: RGB;
  hsl: HSL;
  hex: string;
  onColorStateChange: (change: object) => void;
}

export const ColorAdvanced: FunctionComponent<
  ColorAdvancedProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  onColorChange,
  colors,
  palette,
  paletteStyle,
  input,
  slider,
  ...props
}: ColorAdvancedProps) => {
  const initColor = colors && colors.length > 0 ? colors[0] : "red";
  const [colorState, setColorState] = useState(
    toState(initColor && { init: initColor }, "init")
  );

  useEffect(() => {
    colorCb(colorState);
  }, [colorState]);

  const colorCb = useCallback(
    debounce((colorState: object) => {
      onColorChange &&
        onColorChange({
          ...colorState,
        });
    }, 500),
    []
  );

  const onColorStateChange = (change: any) => {
    setColorState(
      toState({ [change.source]: change[change.source] }, change.source)
    );
  };

  const handleColorSelect = (target: string) => {
    setColorState(toState({ hex: target }, "hex"));
  };

  const ColorFields: FunctionComponent<
    ColorFieldsProps & React.HTMLAttributes<HTMLDivElement>
  > = ({ rgb, hsl, hex, onColorStateChange }: ColorFieldsProps) => {
    const [inputValue, setInputValue] = useState({ hex: hex, rgb: rgb });

    const handleRGBChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      source: string
    ) => {
      const value = ~~e.target.value;
      setInputValue({
        ...inputValue,
        rgb: {
          ...inputValue.rgb,
          [source]: source == "a" ? value / 100 : value,
        },
      });
      if (source === "a" && value >= 0 && value <= 100)
        onColorStateChange({
          rgb: { ...rgb, a: value / 100 },
          source: "rgb",
        });
      else if (value >= 0 && value <= 255)
        onColorStateChange({
          rgb: { ...rgb, [source]: value },
          source: "rgb",
        });
    };

    const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue({ ...inputValue, hex: e.target.value });
      if (isValidHex(e.target.value)) {
        onColorStateChange({ hex: toHex(e.target.value), source: "hex" });
      }
    };

    const handleReset = () => {
      setInputValue({ hex, rgb });
    };

    return (
      <>
        <div className={[styles.fields, "flexbox-fix"].join(" ")}>
          <div className={styles.single} style={{ flex: 2 }}>
            <input
              className={styles.input}
              type="text"
              name="hex"
              value={inputValue.hex}
              onChange={handleHexInput}
              onBlur={handleReset}
            />
            <label className={styles.label} htmlFor="hex">
              Hex
            </label>
          </div>
          <div className={styles.single}>
            <input
              className={styles.input}
              type="text"
              name="r"
              value={inputValue.rgb.r}
              onChange={(e) => handleRGBChange(e, "r")}
              onBlur={handleReset}
            />
            <label className={styles.label} htmlFor="r">
              R
            </label>
          </div>
          <div className={styles.single}>
            <input
              className={styles.input}
              type="text"
              name="g"
              value={inputValue.rgb.g}
              onChange={(e) => handleRGBChange(e, "g")}
              onBlur={handleReset}
            />
            <label className={styles.label} htmlFor="g">
              G
            </label>
          </div>
          <div className={styles.single}>
            <input
              className={styles.input}
              type="text"
              name="b"
              value={inputValue.rgb.b}
              onChange={(e) => handleRGBChange(e, "b")}
              onBlur={handleReset}
            />
            <label className={styles.label} htmlFor="b">
              B
            </label>
          </div>
          <div className={styles.single}>
            <input
              className={styles.input}
              type="text"
              name="a"
              value={Math.round(inputValue.rgb.a * 100)}
              onChange={(e) => handleRGBChange(e, "a")}
              onBlur={handleReset}
            />
            <label className={styles.label} htmlFor="a">
              A
            </label>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={styles.saturation}>
        <Saturation
          className={styles.Saturation}
          hsl={colorState.hsl}
          hsv={colorState.hsv}
          onChange={onColorStateChange}
        />
      </div>
      {slider && (
        <div className={[styles.controls, "flexbox-fix"].join(" ")}>
          <div className={styles.sliders}>
            <div className={styles.hue}>
              <ColorSlider
                mode={"hue"}
                size={"small"}
                hsl={colorState.hsl}
                direction={"horizontal"}
                onChange={onColorStateChange}
              />
            </div>
            <div className={styles.alpha}>
              <ColorSlider
                mode={"alpha"}
                size={"small"}
                hsl={colorState.hsl}
                direction={"horizontal"}
                onChange={onColorStateChange}
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
      )}
      {input && (
        <ColorFields
          rgb={colorState.rgb}
          hsl={colorState.hsl}
          hex={colorState.hex}
          onColorStateChange={onColorStateChange}
        />
      )}
      {palette && (
        <div className={styles.palette}>
          <ColorPalette
            variant={"rounded"}
            size={"medium"}
            colors={colors}
            onColorSelect={handleColorSelect}
            {...palette}
          />
        </div>
      )}
    </>
  );
};

ColorAdvanced.defaultProps = {
  input: true,
  palette: true,
  slider: true,
};
