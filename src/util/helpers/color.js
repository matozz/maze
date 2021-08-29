import tinycolor from "tinycolor2";

export const isValidHex = (hex) => {
  if (hex === "transparent") {
    return true;
  }
  // disable hex4 and hex8
  const lh = String(hex).charAt(0) === "#" ? 1 : 0;
  return (
    hex.length !== 4 + lh && hex.length < 7 + lh && tinycolor(hex).isValid()
  );
};

export const toHex = (string) => {
  return tinycolor(string).toHexString().toUpperCase();
};

export const toState = (data, source) => {
  const color = tinycolor(data[source]);
  const hsl = color.toHsl();
  const hsv = color.toHsv();
  const rgb = color.toRgb();
  const hex = color.toHex();
  const transparent = hex === "000000" && rgb.a === 0;

  return {
    hsl,
    hex: transparent ? "transparent" : `#${hex}`,
    rgb,
    hsv,
    source: source,
  };
};
