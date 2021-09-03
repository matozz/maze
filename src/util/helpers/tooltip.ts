export const calculateOffset = (
  position: "bottom" | "top" | "left" | "right" | undefined,
  children: HTMLDivElement,
  portal: HTMLDivElement
) => {
  const node = children;
  const dimensions = node.getBoundingClientRect();
  let offsetX = 0,
    offsetY = 0,
    offsetArrowX = 0,
    offsetArrowY = 0;

  if (position === "bottom") {
    offsetX = dimensions.left + dimensions.width / 2 - portal.offsetWidth / 2;
    offsetY = dimensions.bottom;
    offsetArrowX = portal.offsetWidth / 2 - 6;
  } else if (position === "top") {
    offsetX = dimensions.left + dimensions.width / 2 - portal.offsetWidth / 2;
    offsetY = dimensions.top - portal.offsetHeight;
    offsetArrowX = portal.offsetWidth / 2 - 6;
    offsetArrowY = portal.offsetHeight - 14;
  } else if (position === "left") {
    offsetX = dimensions.left - portal.offsetWidth;
    offsetY = dimensions.top + dimensions.height / 2 - portal.offsetHeight / 2;
    offsetArrowX = portal.offsetWidth - 14;
    offsetArrowY = portal.offsetHeight / 2 - 6;
  } else if (position === "right") {
    offsetX = dimensions.right;
    offsetY = dimensions.top + dimensions.height / 2 - portal.offsetHeight / 2;
    offsetArrowY = portal.offsetHeight / 2 - 6;
  }
  offsetX += window.scrollX;
  offsetY += window.scrollY;

  return { offsetX, offsetY, offsetArrowX, offsetArrowY };
};
