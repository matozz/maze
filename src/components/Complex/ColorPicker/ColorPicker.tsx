/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useEffect } from "react";
import styles from "./ColorPicker.module.scss";
import { isValidHex, toHex, toState } from "../../../util/helpers/color.js";
import { ColorPalette, ColorPaletteProps } from "./ColorPalette";
import { AdvancedOptions, ColorAdvanced } from "./ColorAdvanced";
import PlusIcon from "./PlusIcon";

export interface ColorPickerProps {
  width: string | number;
  onColorChange?: Function;
  hex?: string;
  colors?: Array<string>;
  mode: "palette" | "picker" | "advanced";
  paletteStyle?: ColorPaletteProps;
  /**
   * Only need when switch to advancedMode
   */
  advancedOptions?: AdvancedOptions;
}

export const ColorPicker: React.FunctionComponent<ColorPickerProps> = ({
  width,
  onColorChange,
  hex,
  colors,
  mode,
  paletteStyle,
  advancedOptions,
}: ColorPickerProps) => {
  const initColor = colors && colors.length > 0 && !hex ? colors[0] : "";
  const [hexValue, setHexValue] = useState(initColor);
  const [hexShow, setHexShow] = useState(initColor);
  const [addShow, setAddShow] = useState(false);
  const [colorList, setColorList] = useState(colors);

  const handleColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHexValue(e.target.value);
    if (isValidHex(e.target.value)) {
      setHexShow(toHex(e.target.value));
      setAddShow(colorList?.indexOf(toHex(e.target.value)) === -1);
    }
  };

  const handleColorSelect = (target: string) => {
    isValidHex(target) && setHexValue(toHex(target)), setHexShow(toHex(target));
  };

  const handleAddColors = () => {
    setColorList(colorList ? [...colorList, hexShow] : [hexShow]);
    setAddShow(false);
  };

  useEffect(
    () =>
      onColorChange &&
      onColorChange({
        ...toState({ hex: hexShow }, "hex"),
      }),
    [hexShow]
  );

  return (
    <>
      {mode === "advanced" ? (
        <div
          className={`${styles.card} maze-color-picker`}
          style={{ width: width, padding: "10px" }}
        >
          <ColorAdvanced
            colors={colors}
            paletteStyle={paletteStyle}
            {...advancedOptions}
            onColorChange={onColorChange}
          />
        </div>
      ) : (
        <div
          className={`${styles.card} maze-color-picker`}
          style={{ width: width }}
        >
          {mode === "picker" && (
            <div className={styles.head} style={{ background: hexShow }}>
              <div className={styles.label}>{hexShow}</div>
            </div>
          )}

          <div
            className={styles.body}
            style={{ overflow: paletteStyle?.compact ? "hidden" : "initial" }}
          >
            <ColorPalette
              variant={"rounded"}
              size={"medium"}
              colors={colorList}
              onColorSelect={handleColorSelect}
              {...paletteStyle}
            />
            {mode === "picker" && (
              <>
                <input
                  className={styles.input}
                  type="text"
                  value={hexValue}
                  onChange={handleColorInput}
                  onBlur={() => setHexValue(hexShow)}
                />
                <div
                  className={[styles.add, addShow && styles["add-show"]].join(
                    " "
                  )}
                  onClick={handleAddColors}
                >
                  <PlusIcon />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

ColorPicker.defaultProps = {
  width: 170,
  mode: "picker",
};
