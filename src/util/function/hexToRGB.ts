export const hexToRGB = (h: string): string => {
  if (!h) return null;
  let r = 0,
    g = 0,
    b = 0;
  const aRgbHex = h.substring(1).match(/.{1,2}/g);
  (r = parseInt(aRgbHex[0], 16)),
    (g = parseInt(aRgbHex[1], 16)),
    (b = parseInt(aRgbHex[2], 16));

  return `${r}, ${g}, ${b}`;
};
